import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Key, toSpell, fromSpell, tokenize } from '../src/translator';
import grimoire from '../src/grimoire.key.json';
import lexicon from '../grimoire/lexicon.json';
const fixture = (name: string) => readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');

test('decodes the original Python-generated school spell and re-encodes it losslessly', () => {
  const key = new Key(grimoire), source = fixture('Schools.lean'), spell = fixture('Schools.spell');
  assert.equal(fromSpell(spell, key), source);
  assert.equal(fromSpell(toSpell(source, key), key), source);
});

test('Mercury joins namespaces and projections, with legacy dots still accepted', () => {
  const key = new Key({ global: { Bijective: 'Perfect', f: 'warp' }, scoped: {} });
  const source = 'Function.Bijective (f).Bijective .Bijective';
  const spell = 'Rite☿Perfect ⟪warp⟫☿Perfect ☿Perfect';
  assert.equal(toSpell(source, key), spell);
  assert.equal(fromSpell(spell, key), source);
  assert.equal(fromSpell('Rite.Perfect ⟪warp⟫.Perfect .Perfect', key), source);
  assert.equal(fromSpell('Rite☿Perfect.Perfect', key), 'Function.Bijective.Bijective');
});

test('namespace glyph leaves quoted text, decimal points and ellipses intact', () => {
  const key = new Key({ global: { Foo: 'Astral' }, scoped: {} });
  const source = `Foo.«some.name☿inside» 3.14 .. ... "Foo.bar☿" '☿' -- Foo.bar☿\n/- Foo.bar☿ -/`;
  const spell = `Astral☿«some.name☿inside» 3.14 .. ... "Foo.bar☿" '☿' -- Foo.bar☿\n/- Foo.bar☿ -/`;
  assert.equal(toSpell(source, key), spell);
  assert.equal(fromSpell(spell, key), source);
  assert.equal(fromSpell(toSpell('Foo☿Foo ⟄☿', key), key), 'Foo☿Foo ⟄☿');
});

test('sparkle names and the inverse dagger translate both ways', () => {
  const key = new Key({ global: { map_inv: '✨Carry✨the✨Reversal✨', x: 'mark', f: 'warp' }, scoped: {} });
  const source = 'MonoidHom.map_inv f x : f x⁻¹ = (f x)⁻¹';
  const spell = 'Herald☿✨Carry✨the✨Reversal✨ warp mark ⟡ warp mark† ≣ ⟪warp mark⟫†';
  assert.equal(toSpell(source, key), spell);
  assert.equal(fromSpell(spell, key), source);
  const literal = 'def a := "✨†" -- ✨\n#check ✨ †';
  assert.equal(fromSpell(toSpell(literal, key), key), literal);
  assert.throws(() => new Key({ global: { x: '✨Broken✨sparkle' }, scoped: {} }));
});

test('round trip survives saving and reopening the name key', () => {
  const key = new Key(grimoire), source = fixture('Schools.lean') + '\ndef newName := 3\n';
  const spell = toSpell(source, key);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
});

test('mathematical namespaces have contextual spell names without renaming mathlib modules', () => {
  const key = new Key({
    global: { Mathematics: 'Arcanum', GroupTheory: '✨Coven✨Lore✨',
      GroupActions: 'Orbits', smul_eq_smul_iff_mem_stabilizer: '✨Same✨Place✨Same✨Veil✨' },
    scoped: {}, namespaces: { 'Mathematics.GroupTheory': 'Arcanum☿Enchantment' },
  });
  const source = 'import Mathematics.GroupTheory.GroupActions\nimport Mathlib.GroupTheory.GroupAction.Quotient\n' +
    'namespace Mathematics.GroupTheory\n#check Mathematics.GroupTheory.smul_eq_smul_iff_mem_stabilizer\n' +
    'end Mathematics.GroupTheory\n';
  const spell = toSpell(source, key);
  assert.match(spell, /Arcanum☿Enchantment☿Orbits/);
  assert.match(spell, /Arcanum☿Enchantment☿✨Same✨Place✨Same✨Veil✨/);
  assert.match(spell, /☿✨Coven✨Lore✨☿/);
  const reloaded = new Key(JSON.parse(JSON.stringify(key.data())));
  assert.equal(fromSpell(spell, reloaded), source);
  assert.equal(fromSpell(spell.replaceAll('☿', '.'), reloaded), source);
  const extended = source + '\n#check Mathematics.«Enchantment»\n#check Enchantment\n';
  assert.equal(fromSpell(toSpell(extended, key), new Key(key.data())), extended);
});

test('material components are single identifiers, including scoped names and field access', () => {
  const key = new Key({ global: { x: 'jade✨cube', y: 'silver✨bell', h: 'ward', demo: '✨Test✨Spell✨' },
    scoped: { demo: { h: 'pinch✨of✨salt' } } });
  const source = 'theorem demo (x y : Nat) (h : x = y) : y = x := h.symm\n';
  const spell = toSpell(source, key);
  assert.match(spell, /jade✨cube silver✨bell/);
  assert.match(spell, /pinch✨of✨salt☿/);
  assert.equal(tokenize('jade✨cube☿silver✨bell', true).length, 1);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
  assert.equal(fromSpell('jade✨cube', new Key()), '«jade✨cube»');
  const literals = '#check x✨y\n#check «jade✨cube»\n"jade✨cube" -- silver✨bell\n';
  assert.equal(fromSpell(toSpell(literals, key), key), literals);
});

test('namespace mappings reject invalid paths and ambiguous spell aliases', () => {
  assert.throws(() => new Key({ global: {}, scoped: {}, namespaces: {
    'Math.Groups': 'Book☿Bindings', 'Math.Rings': 'Book☿Bindings',
  } }), /same spell namespace/);
  assert.throws(() => new Key({ global: {}, scoped: {}, namespaces: { 'Math.Groups': 'Book☿spell' } }), /Invalid namespace/);
  assert.throws(() => new Key({ global: { Math: 'Book', Rings: 'Bindings' }, scoped: {},
    namespaces: { 'Math.Groups': 'Book☿Bindings' } }), /Ambiguous namespace/);
});

test('carrier runes are identifiers in binders, actions, namespaces and projections', () => {
  const key = new Key(lexicon);
  const source = 'variable {G H X : Type*} [Group G] [Group H] [MulAction G X]\n' +
    '#check G.foo\n#check (H).foo\n#check X.foo\n';
  const spell = toSpell(source, key);
  assert.match(spell, /⧼ᛰ ☥ 🌒 ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯/);
  assert.equal(tokenize('🌒☿foo', true).length, 1);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
  assert.equal(fromSpell('🌒', new Key()), '«🌒»');
  const literals = '#check ᛰ ☥ 🌒 ᚨ ᚨsuffix\n#check «🌒»\n"ᛰ ☥ 🌒" -- 🌒\n/- ☥ -/';
  assert.equal(fromSpell(toSpell(literals, key), new Key(key.data())), literals);
  const letterKey = new Key({ global: { foo: 'ᚨsuffix' }, scoped: {} });
  assert.equal(fromSpell(toSpell('foo', letterKey), letterKey), 'foo');
});

test('the Veyr family distinguishes structures and preserves scalar-action arguments', () => {
  const key = new Key(lexicon);
  const source = '[Group G] [CommGroup H] [AddGroup X] [AddCommGroup M]\n' +
    '[Ring R] [CommRing S] [Field F] [Module R M] [Algebra F A]';
  const spell = toSpell(source, key);
  assert.match(spell, /⟮Veyrath ᚱ⟯/);
  assert.match(spell, /⟮Veyrion ᚠ⟯/);
  assert.match(spell, /⟮✨Bound✨Veyr✨ ᚱ ᛗ⟯/);
  assert.match(spell, /⟮✨Bound✨Veyrath✨ ᚠ ᚫ⟯/);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
  assert.deepEqual(key.data().auto, []);
});

test('older carrier names, structure names, and namespaces retain their saved-key meaning', () => {
  const key = new Key({ global: { G: 'coven', X: 'realm', Mathematics: 'Arcanum' }, scoped: {},
    namespaces: { 'Mathematics.GroupTheory': 'Arcanum☿Enchantment' } });
  const source = 'namespace Mathematics.GroupTheory\nvariable {G X : Type*} [Group G]\nend Mathematics.GroupTheory';
  const spell = 'sanctum Arcanum☿Enchantment\nfamiliar ⧼coven realm ⟡ Essence⊛⧽ ⟮Coven coven⟯\nseal Arcanum☿Enchantment';
  assert.equal(fromSpell(spell, key), source);
  assert.equal(toSpell(source, key), spell);
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
