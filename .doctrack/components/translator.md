---
type: component
files: [src/translator.ts, src/tables.json, grimoire/lexicon.json, tests/translator.test.ts]
last_updated: 2026-09-23
tags: [doctrack/type/component, doctrack/status/active, doctrack/audience/claude]
---
# Translator

`tokenize(source, spell?)` preserves whitespace, nested comments, strings, raw strings, Unicode names, quoted identifiers, and literal glyph escapes. `Key` owns global and declaration-scoped mappings, optional namespace-prefix mappings, inverses, name allocation, and JSON serialization. Dictionary objects have null prototypes so names such as `constructor` are ordinary identifiers.

`toSpell(source, key)` translates token categories. Quoted identifiers retain their `«…»` delimiters and contents verbatim, including in qualified names and beside other tokens. They never reserve unquoted names or enter the automatic vocabulary. This prevents quoted keywords such as `«bestow»` from becoming declarations, keeps ordinary spaces distinct from nonbreaking spaces, and makes saving/reloading the key safe. `fromSpell(source, key)` reverses the mapping; unknown spell names become Lean quoted identifiers. Scope tracking uses a declaration heuristic rather than Lean elaboration. Custom notation is not guaranteed.

Arcana namespace components and standalone projection dots use `☿` (Mercury), so `Function.Bijective` becomes `Rite☿Perfect`. A single raw dot outside literals or decimal numbers is rejected in spell text. Quoted names, decimals, comments, strings, and multi-dot operators retain their punctuation; literal Lean Mercury symbols are escaped.

Numeric literals use the bijective digit map in `tables.nums`: `0123456789` → `〇一二三四五六七八九`. Replacement operates on literal strings, never JavaScript numbers, so leading zeros, decimal precision, exponent case/signs, base prefixes, and arbitrarily large integers survive. `LEAN_NUMBER` and `SPELL_NUMBER` are shared by tokenization and editor highlighting. Spell identifier components cannot start with a numeral glyph; key validation enforces the same rule so numeric projections such as `x.1` decode correctly. Literal Japanese Lean identifiers follow normal identifier translation; quoted names and text stay literal. `\0` through `\9` insert the digits, and unencoded Arabic numeric literals in spell input produce a helpful error. Tests cover all values from 0 through 1024, large literals, bases, decimals, exponents, projections, and numeral/name collisions.

A sparkle name (`✨Word✨word✨`) or material-component name (`jade✨cube`, `pinch✨of✨sulfur`) is one identifier component. The lexicon holds these names directly. `⁻¹` maps to `†`; literal Lean `✨` and `†` are escaped with `⟄`. The spell editor highlights both name forms in gold.

`KeyData.namespaces` maps dotted Lean namespace prefixes to Mercury-separated spell prefixes. `Key.name` and `Key.leanName` choose the longest matching prefix and translate remaining components through the global/scoped tables. For example, `Mathematics.GroupTheory` maps to `Arcana☿Enchantment`, while `Mathlib.GroupTheory` keeps component-wise translation. Aliases reserve their components against automatic allocation; invalid paths, duplicate aliases, and aliases conflicting with existing global/scoped decoding are rejected. See [[../decisions/mathematical-names]] and [[../features/graduate-grimoire]].

Carrier rune syntax is a finite alphabet exported as `CARRIER_RUNES` and `RUNE_PATTERN`, shared with editor highlighting. Rune components include punctuation and non-BMP emoji (`ᛰ`, `☥`, `🌒`) as well as Unicode letters. Word alternatives precede single-rune alternatives so identifiers such as `ᚨsuffix` stay intact. Literal non-identifier Lean runes are escaped; Unicode-letter identifiers follow reversible name allocation. The Veyr structure vocabulary lives only in the curated lexicon, without alternate built-in names. See [[../decisions/arcana-vocabulary]].

Only current Arcana syntax and `arcana/v1` bundles are supported. There are no retired keyword aliases, dotted spell namespaces, nonbreaking-space name encoding, Python implementation, or toy-school fixtures. The user explicitly removed backward compatibility requirements.

Tests cover quoted forms of every built-in keyword and curated name, key serialization, qualified and adjacent quoted identifiers, scoped names, strings, comments, literal glyphs, incomplete input, and invalid keys. The generated book supplies end-to-end source/spell fixtures. Consumed by [[../features/editor]]; rationale in [[../decisions/browser-translation]].


Adversarial key review rejects declaration-keyword remapping, local aliases for a declaration's own name, nested namespace aliases that capture a shorter namespace plus a renamed suffix, and spell names beginning with literal operators (such as Σ/Π) that tokenization would split. Compatible nested namespace mappings still work. These are current-key validation requirements, not backward compatibility paths; `tests/adversarial.test.ts` records the counterexamples.
