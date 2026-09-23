import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Key, WORDS, toSpell, fromSpell, tokenize } from '../src/translator';
import lexicon from '../grimoire/lexicon.json';
test('Mercury joins namespaces and projections', () => {
  const key = new Key({ global: { Bijective: 'Perfect', f: 'warp' }, scoped: {} });
  const source = 'Function.Bijective (f).Bijective .Bijective';
  const spell = 'Rite☿Perfect ⟪warp⟫☿Perfect ☿Perfect';
  assert.equal(toSpell(source, key), spell);
  assert.equal(fromSpell(spell, key), source);
  assert.throws(() => fromSpell('Rite.Perfect', key), /Use ☿/);
  assert.throws(() => fromSpell('Rite☿Perfect.Perfect', key), /Use ☿/);
});

test('namespace glyph leaves quoted text, decimal points and ellipses intact', () => {
  const key = new Key({ global: { Foo: 'Astral' }, scoped: {} });
  const source = `Foo.«some.name☿inside» 3.14 .. ... "Foo.bar☿" '☿' -- Foo.bar☿\n/- Foo.bar☿ -/`;
  const spell = `Astral☿«some.name☿inside» 三.一四 .. ... "Foo.bar☿" '☿' -- Foo.bar☿\n/- Foo.bar☿ -/`;
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
  const key = new Key(lexicon), source = 'theorem demo (x : Nat) : x = x := rfl\ndef newName := 3\n';
  const spell = toSpell(source, key);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
});

test('mathematical namespaces have contextual spell names without renaming mathlib modules', () => {
  const key = new Key({
    global: { Mathematics: 'Arcana', GroupTheory: '✨Veyr✨Lore✨',
      GroupActions: 'Orbits', smul_eq_smul_iff_mem_stabilizer: '✨Same✨Place✨Same✨Veil✨' },
    scoped: {}, namespaces: { 'Mathematics.GroupTheory': 'Arcana☿Enchantment' },
  });
  const source = 'import Mathematics.GroupTheory.GroupActions\nimport Mathlib.GroupTheory.GroupAction.Quotient\n' +
    'namespace Mathematics.GroupTheory\n#check Mathematics.GroupTheory.smul_eq_smul_iff_mem_stabilizer\n' +
    'end Mathematics.GroupTheory\n';
  const spell = toSpell(source, key);
  assert.match(spell, /Arcana☿Enchantment☿Orbits/);
  assert.match(spell, /Arcana☿Enchantment☿✨Same✨Place✨Same✨Veil✨/);
  assert.match(spell, /☿✨Veyr✨Lore✨☿/);
  const reloaded = new Key(JSON.parse(JSON.stringify(key.data())));
  assert.equal(fromSpell(spell, reloaded), source);
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
  assert.equal(toSpell('IsSimpleGroup', key), '✨Simple✨Veyr✨');
  assert.equal(toSpell('Nat.Prime', key), 'Tally☿Indivisible');
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
  const key = new Key(lexicon), spell = toSpell(source, key);
  assert.equal(tokenize(source).map(t => t.text).join(''), source);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
});

test('quoted names stay literal over consecutive edits', () => {
  const key = new Key();
  toSpell('def «ember» := 0\n', key);
  const source = 'def «ember» := 0\ndef x := 1\n';
  assert.equal(fromSpell(toSpell(source, key), new Key(key.data())), source);
});

test('quoted identifiers cannot collide with keywords, vocabulary, or automatic names', () => {
  const names = new Set(['initiate', 'ember', 'Plane Shift', 'jade✨cube', 'ᛰ', '🌒', 'some.name☿inside',
    'non\u00a0breaking space', ...Object.keys(WORDS), ...Object.values(WORDS),
    ...Object.keys(lexicon.global), ...Object.values(lexicon.global)]);
  const key = new Key(lexicon);
  for (const name of names) {
    const quoted = `«${name}»`;
    const source = `def ${quoted} := 1\n#check ${quoted}\n#check Foo.${quoted}\n#check ${quoted}.bar\n`;
    const spell = toSpell(source, key);
    assert.equal(spell.split(quoted).length, 5, name);
    assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source, name);
    assert.ok(!Object.hasOwn(key.data().global, quoted), name);
  }
});

test('quotes distinguish names with identical visible contents', () => {
  const key = new Key({ global: { f: 'jade✨cube' }, scoped: { '«bestow»': { h: 'ward' } } });
  const source = 'theorem «bestow» (h : True) : True := h\n' +
    '#check f\n#check «f»\n#check «jade✨cube»\n#check «Foo»bar\n#check «Foo»«bar»\n' +
    '#check «with spaces»\n#check «with\u00a0spaces»\n';
  const spell = toSpell(source, key);
  assert.match(spell, /spell «bestow» ⟪ward/);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
});

test('new spell names become quoted Lean identifiers', () => {
  assert.equal(fromSpell('spell Fireball ⟡ Tally ⇰ 〇', new Key()), 'theorem «Fireball» : Nat := 0');
});

test('rejects ambiguous keys', () => {
  assert.throws(() => new Key({ global: { a: 'ember', b: 'ember' }, scoped: {} }), /same spell word/);
  assert.throws(() => new Key({ global: { a: 'spell' }, scoped: {} }), /reserved/);
});

test('instances read as bestow', () => {
  const key = new Key({ global: { M: 'ᛗ' }, scoped: {} });
  assert.equal(toSpell('instance : Monoid M', key), 'bestow ⟡ Choir ᛗ');
  assert.equal(fromSpell('bestow ⟡ Choir ᛗ', key), 'instance : Monoid M');
  assert.equal(fromSpell('initiate', key), '«initiate»');
});

test('kanji digits encode whole numeric literals without changing their spelling', () => {
  const examples = new Map([
    ['0 1 2 3 4 5 6 7 8 9', '〇 一 二 三 四 五 六 七 八 九'],
    ['12 24 60 120 0012', '一二 二四 六〇 一二〇 〇〇一二'],
    ['-3 +4 3.1400 1e-20 2E+03', '⧿三 ⧾四 三.一四〇〇 一e-二〇 二E+〇三'],
    ['0xff 0X0Af 0b00101 0B10 0o007 0O17', '〇xff 〇X〇Af 〇b〇〇一〇一 〇B一〇 〇o〇〇七 〇O一七'],
    ['900719925474099312345678901234567890', '九〇〇七一九九二五四七四〇九九三一二三四五六七八九〇一二三四五六七八九〇'],
  ]);
  for (const [source, spell] of examples) {
    const key = new Key();
    assert.equal(toSpell(source, key), spell);
    const reloaded = new Key(JSON.parse(JSON.stringify(key.data())));
    assert.equal(fromSpell(spell, reloaded), source);
    assert.equal(toSpell(fromSpell(spell, reloaded), reloaded), spell);
    assert.doesNotMatch(spell, /[0-9]/);
  }
  for (let n = 0; n <= 1024; n++) {
    const key = new Key(), source = String(n), spell = toSpell(source, key);
    assert.equal(fromSpell(spell, new Key(key.data())), source);
    assert.equal(tokenize(spell, true).length, 1);
    assert.equal(tokenize(spell, true)[0].kind, 'num');
  }
});

test('kanji numerals stay distinct from identifiers, projections, and literal text', () => {
  const key = new Key(lexicon);
  const source = '#check (x, y).1\n#check x.2\n#check x.1.2\n#check 1..3\n' +
    '#check 一\n#check 〇\n#check 数三\n#check «三»\n#check «123»\n' +
    '#check "012 三"\n#check r#"123"#\n#check \'3\'\n-- 123 三\n/- 456 六 -/\n';
  const spell = toSpell(source, key);
  assert.match(spell, /☿一/);
  assert.match(spell, /一\.\.三/);
  assert.match(spell, /«123»/);
  assert.match(spell, /"012 三"/);
  assert.match(spell, /-- 123 三/);
  assert.equal(fromSpell(spell, new Key(JSON.parse(JSON.stringify(key.data())))), source);
  assert.throws(() => new Key({ global: { a: '三' }, scoped: {} }), /reserved/);
  assert.throws(() => new Key({ global: {}, scoped: { demo: { a: '一thing' } } }), /Invalid name/);
  assert.throws(() => new Key({ global: {}, scoped: {}, namespaces: { 'Math.Group': 'Book☿二' } }), /Invalid namespace/);
  assert.throws(() => fromSpell('123', new Key()), /kanji digits/);
});
