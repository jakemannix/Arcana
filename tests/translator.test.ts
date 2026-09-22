import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Key, toSpell, fromSpell, tokenize } from '../src/translator';
import grimoire from '../src/grimoire.key.json';
const fixture = (name: string) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('matches the original Python-generated school spell and decodes it exactly', () => {
  const key = new Key(grimoire), source = fixture('Schools.lean'), spell = fixture('Schools.spell');
  assert.equal(toSpell(source, key), spell);
  assert.equal(fromSpell(spell, key), source);
});

test('round trip survives saving and reopening the name key', () => {
  const key = new Key(grimoire), source = fixture('Schools.lean') + '\ndef newName := 3\n';
  const spell = toSpell(source, key);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
});

for (const [label, source] of Object.entries({
  'quoted name before an automatic name': 'def «ember» := 0\ndef x := 1\n',
  'quoted name after an automatic name': 'def x := 0\ndef «ember» := 1\n',
  'quotation and source keywords': 'def «spell» := 0\ndef «theorem» := 1\n',
  'neighboring quoted names': '#check «Foo»bar\n',
  'nested comments and exact whitespace': '/- outer /- inner -/ done -/\r\n\tdef x := 0 -- spell\r\n',
  'strings and characters': 'def text := "theorem \\"spell\\""\ndef char := \'a\'\n',
  'raw strings with matching delimiters': 'def s := r##"theorem " spell #"##\n',
  'Unicode names and scoped variables': 'theorem «Plane Shift» (f : α → β) (g : β → γ) (h : γ → δ) : h ∘ (g ∘ f) = (h ∘ g) ∘ f := rfl\n',
  'literal spell glyphs': '#check ⟄ ⟡ ⊘ ▢\n',
  'numbers': 'def a := 10\ndef b := 0xff\ndef c := 3.14\n',
  'qualified quoted names': '#check Foo.«some.name»\n',
  'JavaScript prototype property names': 'def constructor := 0\ndef toString := 1\ndef __proto__ := 2\n',
  'incomplete string': 'def s := "theorem',
  'incomplete comment': '/- theorem',
})) test(label, () => {
  const key = new Key(grimoire), spell = toSpell(source, key);
  assert.equal(tokenize(source).map(t => t.text).join(''), source);
  assert.equal(fromSpell(spell, key), source);
});

test('quoted-name reservations remain safe over consecutive edits', () => {
  const key = new Key();
  toSpell('def «ember» := 0\n', key);
  const source = 'def «ember» := 0\ndef x := 1\n';
  assert.equal(fromSpell(toSpell(source, key), key), source);
});

test('new spell names become quoted Lean identifiers', () => {
  assert.equal(fromSpell('spell Fireball ⟡ Tally ⇰ ⊘', new Key()), 'theorem «Fireball» : Nat := 0');
});

test('rejects ambiguous keys', () => {
  assert.throws(() => new Key({ global: { a: 'ember', b: 'ember' }, scoped: {} }), /same spell word/);
  assert.throws(() => new Key({ global: { a: 'spell' }, scoped: {} }), /reserved/);
});
