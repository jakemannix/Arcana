import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDraft, serializeDraft } from '../src/drafts';
import { Key, fromSpell } from '../src/translator';
import { folios, grimoireKey, isCheckedSource } from '../src/catalog';

test('save and reopen retain both documents when translation is paused or mismatched', () => {
  const original = folios[0]!;
  for (const spell of [original.spell + '1', original.spell + '\n', '']) {
    const draft = { lean: original.lean, spell, key: new Key(grimoireKey).data() };
    const reopened = parseDraft(serializeDraft(draft));
    assert.deepEqual(reopened, draft);
    assert.equal(isCheckedSource(reopened.lean, reopened.spell, reopened.lean, undefined), false);
  }
  assert.throws(() => fromSpell(parseDraft(serializeDraft({ lean: original.lean,
    spell: original.spell + '1', key: grimoireKey })).spell, new Key(grimoireKey)), /numeral|digit|number/i);
});

test('invalid bundles and ambiguous keys fail before any editor state is replaced', () => {
  for (const text of ['null', '{}', '{not json}', JSON.stringify({ format: 'arcana/v1', lean: 42, spell: '', key: grimoireKey })]) {
    assert.throws(() => parseDraft(text));
  }
  const key = { global: { X: 'Door' }, scoped: {}, namespaces: { 'A.B': 'Book☿Gate', 'C.D': 'Book☿Gate☿Door' } };
  assert.throws(() => parseDraft(serializeDraft({ lean: 'A.B.X', spell: 'Book☿Gate☿Door', key })), /Ambiguous namespace/);
});
