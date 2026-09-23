import { test } from 'node:test';
import assert from 'node:assert/strict';
import { expand, LEAN_ABBREVIATIONS as lean, SPELL_ABBREVIATIONS as spell } from '../src/glyphs';
import { Key, fromSpell } from '../src/translator';

test('an unambiguous shortcut expands as soon as it is complete', () => {
  assert.deepEqual(expand('spell ✨Keep\\s', 'p', spell), { from: 2, insert: '✨' });
  assert.deepEqual(expand('mark\\da', 'g', spell), { from: 3, insert: '†' });
  assert.deepEqual(expand('x\\-', '1', lean), { from: 2, insert: '⁻¹' });
});

test('a shortcut that a longer one extends waits for space or Tab', () => {
  assert.equal(expand('\\', ':', spell), null);
  assert.deepEqual(expand('\\:', ' ', spell), { from: 2, insert: '⟡ ' });
  assert.deepEqual(expand('\\:', '\t', spell), { from: 2, insert: '⟡' });
  assert.deepEqual(expand('\\:', '=', spell), { from: 2, insert: '⇰' });
  assert.deepEqual(expand('\\:', 'x', spell), { from: 2, insert: '⟡x' });
});

test('text without a shortcut is left alone', () => {
  assert.equal(expand('mark', ' ', spell), null);
  assert.equal(expand('"\\n', '"', lean), null);
  assert.equal(expand('\\zzz', ' ', spell), null);
});

test('every spell shortcut produces text that decodes to Lean', () => {
  const key = new Key();
  for (const glyph of Object.values(spell)) assert.equal(typeof fromSpell(glyph, key), 'string');
  assert.equal(fromSpell(spell['(']! + spell[':=']! + spell['-1']!, key), '(:=⁻¹');
});

test('carrier shortcuts insert complete rune code points', () => {
  assert.deepEqual(expand('\\moo', 'n', spell), { from: 4, insert: '🌒' });
  assert.deepEqual(expand('\\ank', 'h', spell), { from: 4, insert: '☥' });
  assert.deepEqual(expand('\\run', 'e', spell), { from: 4, insert: 'ᛰ' });
});
