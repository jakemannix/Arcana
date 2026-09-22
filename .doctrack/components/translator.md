---
type: component
files: [src/translator.ts, src/tables.json, src/grimoire.key.json, src/Schools.lean, src/Schools.spell, tests/translator.test.ts]
last_updated: 2026-09-22
tags: [doctrack/type/component, doctrack/status/active, doctrack/audience/claude]
---
# Translator

`tokenize(source, spell?)` preserves tokens including whitespace, nested comments, strings, raw strings, Unicode names and literal glyph escapes. `Key` owns global and declaration-scoped mappings, inverses, lexicon allocation, and JSON serialization. Dictionary objects have null prototypes so names such as `constructor` are ordinary identifiers.

`toSpell(source, key)` first reserves readable quoted names, then maps token categories. Quoted reservations are persisted; subsequent names cannot consume them. Names next to another identifier retain quotation to avoid merging. `fromSpell(source, key)` reverses the mapping; unknown spell names become Lean quoted identifiers. Scope tracking follows the original toy's declaration heuristic, not Lean elaboration. Custom notation is not guaranteed.

Golden tests match original Schools.spell. Additional tests cover serialized keys, quoted collisions, scoped names, prototype names, strings, comments, glyph escapes, incomplete input, and invalid keys. Consumed by [[features/editor]]. Rationale: [[decisions/browser-translation]].
