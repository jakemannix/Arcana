---
type: component
files: [src/translator.ts, src/tables.json, src/grimoire.key.json, src/Schools.lean, src/Schools.spell, tests/translator.test.ts]
last_updated: 2026-09-23
tags: [doctrack/type/component, doctrack/status/active, doctrack/audience/claude]
---
# Translator

`tokenize(source, spell?)` preserves tokens including whitespace, nested comments, strings, raw strings, Unicode names and literal glyph escapes. `Key` owns global and declaration-scoped mappings, inverses, lexicon allocation, and JSON serialization. Dictionary objects have null prototypes so names such as `constructor` are ordinary identifiers.

`toSpell(source, key)` first reserves readable quoted names, then maps token categories. Quoted reservations are persisted; subsequent names cannot consume them. Names next to another identifier retain quotation to avoid merging. `fromSpell(source, key)` reverses the mapping; unknown spell names become Lean quoted identifiers. Scope tracking follows the original toy's declaration heuristic, not Lean elaboration. Custom notation is not guaranteed.

Arcane namespace components and standalone projection dots use `☿` (Mercury), so `Function.Bijective` becomes `Rite☿Perfect`. The Arcane lexer accepts both Mercury and legacy dots. Quoted names, decimals, comments, strings, and multi-dot operators retain their literal punctuation; literal Lean Mercury symbols are escaped. All nine generated folios were decoded and recompiled after this syntax change.

Compatibility tests decode the unchanged original Schools.spell fixture and round-trip its new encoding. Additional tests cover namespace chains and projections, literal punctuation, serialized keys, quoted collisions, scoped names, prototype names, strings, comments, glyph escapes, incomplete input, and invalid keys. Consumed by [[features/editor]]. Rationale: [[decisions/browser-translation]].
