import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EditorState } from '@codemirror/state';
import { history, undo } from '@codemirror/commands';
import { commentRanges, commentDisplay, commentVisibility, tutorialComments } from '../src/comments';
import { proofFoldRange } from '../src/magic';
import { Key, toSpell, fromSpell, tokenize } from '../src/translator';

const source = '/- A shared note with 🌒 and /- a nested explanation -/. -/\n' +
  'def text := r#"/- literal -/ -- also literal"#\n' +
  'def «not--a-comment» := "-- still a string" -- actual note\n';

test('hideable notes follow lexical comments, preserving literal text and UTF-16 offsets', () => {
  const state = EditorState.create({ doc: source });
  const ranges = commentRanges(state);
  assert.equal(ranges.length, 2);
  assert.equal(state.sliceDoc(ranges[0].from, ranges[0].to), source.split('\n')[0] + '\n');
  assert.equal(state.sliceDoc(ranges[1].from, ranges[1].to), '-- actual note');
  assert.equal(ranges[0].block, true);
  assert.equal(ranges[1].block, false);
  const key = new Key(), spell = toSpell(source, key);
  assert.deepEqual(tokenize(spell, true).filter(t => t.kind === 'comment'),
    tokenize(source).filter(t => t.kind === 'comment'));
  assert.equal(fromSpell(spell, key), source);
});

test('comment visibility changes decorations, never source, selection, or undo history', () => {
  let state = EditorState.create({ doc: source, selection: { anchor: source.length },
    extensions: [history(), tutorialComments()] });
  state = state.update({ changes: { from: state.doc.length, insert: '\n' } }).state;
  const doc = state.doc.toString(), selection = state.selection;
  state = state.update({ effects: commentVisibility.of({ visible: false, allowReveal: true }) }).state;
  assert.equal(state.field(commentDisplay).decorations.size, 2);
  assert.equal(state.doc.toString(), doc);
  assert.deepEqual(state.selection, selection);
  state = state.update({ effects: commentVisibility.of({ visible: false, allowReveal: false }) }).state;
  state.field(commentDisplay).decorations.between(0, state.doc.length, (_from, _to, decoration) => {
    assert.equal(decoration.spec.widget, undefined);
  });
  assert.ok(undo({ state, dispatch: transaction => { state = transaction.state; } }));
  assert.equal(state.doc.toString(), source);
  state = state.update({ effects: commentVisibility.of({ visible: true, allowReveal: true }) }).state;
  assert.equal(state.field(commentDisplay).decorations.size, 0);
});

test('proof folding ignores apparent declarations and assignments in comments and strings', () => {
  const doc = 'theorem first (x : Nat := 1)\n    /- := is not the proof. -/\n    : x = x := by\n  rfl\n\n' +
    '/- Explain the NEXT theorem.\ntheorem imaginary := nothing\n-/\ntheorem second : True := by\n  trivial\n';
  const key = new Key();
  for (const source of [doc, toSpell(doc, key)]) {
    const state = EditorState.create({ doc: source }), range = proofFoldRange(state, 0)!;
    assert.ok(range);
    assert.doesNotMatch(state.sliceDoc(range.from, range.to), /NEXT|imaginary/);
    assert.match(state.sliceDoc(0, range.from), /: x = x :=$|⟡ .* ⇰$/);
    const commentLine = state.doc.line(8);
    assert.equal(proofFoldRange(state, commentLine.from), null);
  }
});


test('literal-only multiline bodies remain foldable', () => {
  for (const source of ['def message : String :=\n  "hello"\n', 'def value : Nat :=\n  «x»\n']) {
    const state = EditorState.create({ doc: source }), range = proofFoldRange(state, 0)!;
    assert.ok(range);
    assert.equal(state.sliceDoc(range.from, range.to), source.slice(source.indexOf(':=') + 2).trimEnd());
  }
});
