---
type: component
files: [src/translator.ts, src/tables.json, src/grimoire.key.json, src/Schools.lean, src/Schools.spell, tests/translator.test.ts]
last_updated: 2026-09-23
tags: [doctrack/type/component, doctrack/status/active, doctrack/audience/claude]
---
# Translator

`tokenize(source, spell?)` preserves tokens including whitespace, nested comments, strings, raw strings, Unicode names and literal glyph escapes. `Key` owns global and declaration-scoped mappings, optional namespace-prefix mappings, inverses, lexicon allocation, and JSON serialization. Dictionary objects have null prototypes so names such as `constructor` are ordinary identifiers.

`toSpell(source, key)` first reserves readable quoted names, then maps token categories. Quoted reservations are persisted; subsequent names cannot consume them. Names next to another identifier retain quotation to avoid merging. `fromSpell(source, key)` reverses the mapping; unknown spell names become Lean quoted identifiers. Scope tracking follows the original toy's declaration heuristic, not Lean elaboration. Custom notation is not guaranteed.

Arcana namespace components and standalone projection dots use `☿` (Mercury), so `Function.Bijective` becomes `Rite☿Perfect`. The Arcana lexer accepts both Mercury and legacy dots. Quoted names, decimals, comments, strings, and multi-dot operators retain their literal punctuation; literal Lean Mercury symbols are escaped. All nine generated folios were decoded and recompiled after this syntax change.

A sparkle name (`✨Word✨word✨`) or material-component name (`jade✨cube`, `pinch✨of✨sulfur`) is one identifier component: the spell lexer reads it as a unit, and `Key` accepts it as a legal spell word. The lexicon holds these names directly, so the translator does not split or join words itself. `⁻¹` maps to the `†` symbol. Literal Lean `✨` and `†` characters are escaped with `⟄`. The spell editor highlights both forms in gold.

`KeyData.namespaces` maps dotted Lean namespace prefixes to Mercury-separated spell prefixes. `Key.name` and `Key.leanName` choose the longest matching prefix and translate any remaining components using the existing global/scoped tables. For example, `Mathematics.GroupTheory` maps to `Arcana☿Enchantment`, but `Mathlib.GroupTheory` keeps its component-wise translation. Aliases reserve their components before quoted-name/automatic allocation; invalid paths, duplicate aliases, and aliases conflicting with existing global/scoped decoding are rejected. Old keys omit this optional map and keep their previous behavior. See [[../decisions/mathematical-names]] and [[../features/graduate-grimoire]].

Compatibility tests decode the unchanged original Schools.spell fixture and round-trip its new encoding. Additional tests cover namespace chains and projections, literal punctuation, serialized keys, quoted collisions, scoped names, prototype names, strings, comments, glyph escapes, incomplete input, and invalid keys. Consumed by [[features/editor]]. Rationale: [[decisions/browser-translation]].

Carrier rune syntax is a finite alphabet exported as `CARRIER_RUNES` and `RUNE_PATTERN`, shared with editor highlighting. Rune components include punctuation and non-BMP emoji (`ᛰ`, `☥`, `🌒`) as well as Unicode letters. Word alternatives precede single-rune alternatives so ordinary identifiers such as `ᚨsuffix` stay intact. Literal non-identifier Lean runes are escaped before decoding; literal Unicode-letter identifiers follow the existing reversible name allocation. The current lexicon overrides historical structure words with the Veyr family while default tables remain compatible with older saved keys. See [[../decisions/arcana-vocabulary]].
