import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Key, fromSpell, toSpell } from '../src/translator';

test('nested namespace aliases cannot steal names emitted through a shorter alias', () => {
  assert.throws(() => new Key({
    global: { X: 'Door' }, scoped: {},
    namespaces: { 'A.B': 'Book☿Gate', 'C.D': 'Book☿Gate☿Door' },
  }), /Ambiguous namespace/);
  assert.throws(() => new Key({
    global: {}, scoped: { demo: { X: 'Door' } },
    namespaces: { 'A.B': 'Book☿Gate', 'C.D': 'Book☿Gate☿Door' },
  }), /Ambiguous namespace/);
});

test('compatible nested namespace aliases survive a saved-key round trip', () => {
  const key = new Key({
    global: { C: 'Door', x: 'jade✨cube' }, scoped: {},
    namespaces: { 'A.B': 'Book☿Gate', 'A.B.C': 'Book☿Gate☿Door' },
  });
  const source = '#check A.B.x\n#check A.B.C.x\n#check A.B.C\n';
  const spell = toSpell(source, key);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
});

test('declaration keywords cannot be renamed by user keys and break scope detection', () => {
  assert.throws(() => new Key({ global: { theorem: 'Oath' }, scoped: {} }), /declaration/);
  assert.throws(() => new Key({ global: {}, scoped: { demo: { theorem: 'Oath' } } }), /declaration/);
});

test('a declaration name is global so its local scope can be found while decoding', () => {
  assert.throws(() => new Key({ global: {}, scoped: { demo: { demo: 'Fireball', h: 'ward' } } }), /declaration/);
  const key = new Key({ global: { demo: 'Fireball' }, scoped: { demo: { h: 'ward' } } });
  const source = 'theorem demo (h : True) : True := h\n';
  assert.equal(fromSpell(toSpell(source, key), new Key(key.data())), source);
});

test('spell names cannot start with literal operators that the lexer reads before names', () => {
  for (const name of ['Σ', 'Π', 'Σfire', 'Πortal']) {
    assert.throws(() => new Key({ global: { Foo: name }, scoped: {} }), /reserved/);
    assert.throws(() => new Key({ global: {}, scoped: { demo: { Foo: name } } }), /Invalid name/);
    assert.throws(() => new Key({ global: {}, scoped: {}, namespaces: { 'A.B': 'Book☿' + name } }), /Invalid namespace/);
  }
});
