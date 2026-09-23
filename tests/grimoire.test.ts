import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { EditorState } from '@codemirror/state';
import { proofFoldRange } from '../src/magic';
import { Key, toSpell, fromSpell } from '../src/translator';
import { folios, provenance, grimoireKey, isCheckedSource } from '../src/catalog';

const file = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const hash = (source: string) => createHash('sha256').update(source).digest('hex');

test('verification evidence covers current source, vocabulary, and metadata', () => {
  assert.equal(provenance.translatorHash, hash(file('src/translator.ts')));
  assert.equal(provenance.tablesHash, hash(file('src/tables.json')));
  assert.equal(provenance.metadataHash, hash(file('grimoire/chapters.json')));
  assert.equal(provenance.lexiconHash, hash(file('grimoire/lexicon.json')));
  assert.equal(provenance.verification.declarationCount, 84);
  assert.deepEqual(new Set(folios.map(f => f.school)), new Set(['Cantrips', 'Enchantment', 'Transmutation']));
  assert.equal(folios.length, 13);
});

test('checked folios use mathematical Lean names and expose reversible material components', () => {
  assert.deepEqual(grimoireKey.auto, []);
  for (const folio of folios) {
    assert.match(folio.lean, /^namespace Mathematics\.(?:Functions|GroupTheory|CategoryTheory)$/m);
    assert.doesNotMatch(folio.lean, /Arcane\.|same_place_same_veil|pact_preserves|unveiledImage/);
    assert.ok(folio.declarations.every(name => name.startsWith('Mathematics.')));
    const bundle = JSON.parse(file('public/grimoire/' + folio.id + '.json'));
    assert.equal(fromSpell(bundle.spell, new Key(bundle.key)), folio.lean);
  }
  const orbits = folios.find(f => f.id === 'orbits')!;
  assert.match(orbits.lean, /theorem smul_eq_smul_iff_mem_stabilizer \(x : X\)/);
  assert.match(orbits.spell, /spell ✨Same✨Place✨Same✨Veil✨ ⟪jade✨cube/);
  assert.ok(orbits.glossary.some(term => term.lean === 'x' && term.arcane === 'jade✨cube'));
  assert.ok(orbits.glossary.some(term => term.lean === 'Mathematics.GroupTheory' && term.arcane === 'Arcana☿Enchantment'));
  assert.ok(orbits.glossary.some(term => term.lean === 'G' && term.arcane === 'ᛰ'));
  assert.ok(orbits.glossary.some(term => term.lean === 'X' && term.arcane === '🌒'));
  assert.ok(orbits.glossary.some(term => term.lean === 'Group' && term.arcane === 'Veyr'));
  const subgroups = folios.find(f => f.id === 'circles')!;
  assert.ok(!subgroups.glossary.some(term => term.lean === 'GroupTheory'));
  const key = new Key(JSON.parse(file('public/grimoire/arcana.key.json')));
  assert.equal(fromSpell('jade✨cube silver✨bell', key), 'x y');
});

for (const folio of folios) test(`${folio.id}: exact translation, current checked source, valid prerequisites, and foldable bodies`, () => {
  assert.equal(file('math/' + folio.file), folio.lean);
  assert.equal(hash(folio.lean), folio.sourceHash);
  assert.equal(hash(folio.spell), folio.spellHash);
  const key = new Key(grimoireKey);
  assert.equal(toSpell(folio.lean, key), folio.spell);
  assert.equal(fromSpell(folio.spell, new Key(JSON.parse(JSON.stringify(key.data())))), folio.lean);
  assert.equal(file('public/grimoire/' + folio.id + '.spell'), folio.spell);
  assert.equal(file('public/grimoire/' + folio.id + '.lean'), folio.lean);
  for (const prerequisite of folio.prerequisites) assert.ok(folios.some(f => f.id === prerequisite));
  for (const source of [folio.lean, folio.spell]) {
    const state = EditorState.create({ doc: source });
    let folded = 0;
    for (let number = 1; number <= state.doc.lines; number++) {
      const line = state.doc.line(number), range = proofFoldRange(state, line.from);
      if (!range) continue;
      folded++;
      const hidden = state.sliceDoc(range.from, range.to);
      assert.ok(hidden.trim().length > 0);
      assert.ok(/:=|⇰/.test(state.sliceDoc(Math.max(range.from - 2, 0), range.from)));
      assert.doesNotMatch(hidden, /^(?:theorem|spell|end|seal|namespace|sanctum) /m);
    }
    assert.equal(folded, folio.declarations.length);
  }
});

test('editing a true checked source never inherits its checked status', () => {
  const entry = folios.find(f => f.id === 'permutations')!;
  assert.equal(isCheckedSource(entry.lean, entry.spell, entry.lean, entry), true);
  const falseClaim = entry.lean.replace('= 6 :=', '= 7 :=');
  const spell = toSpell(falseClaim, new Key(grimoireKey));
  assert.equal(fromSpell(spell, new Key(grimoireKey)), falseClaim);
  assert.equal(isCheckedSource(falseClaim, spell, falseClaim, entry), false);
  assert.equal(isCheckedSource(entry.lean, entry.spell, 'wrong', entry), false);
  assert.equal(isCheckedSource(entry.lean, entry.spell, entry.lean), false);
});

test('folding retains multiline hypotheses and the theorem statement', () => {
  const state = EditorState.create({ doc: 'theorem test (x : Nat)\n    (h : x = 1) : x = 1 := by\n  exact h\n\ntheorem next : True := trivial\n' });
  const range = proofFoldRange(state, 0)!;
  assert.equal(state.sliceDoc(range.from, range.to), ' by\n  exact h');
  assert.match(state.sliceDoc(0, range.from), /\(h : x = 1\) : x = 1 :=$/);
});
