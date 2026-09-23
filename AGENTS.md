# Arcana: intent and working notes

## What we are making

Arcana lets someone read and write real Lean mathematics as a magical grimoire. Definitions become rituals, theorems become spells, proofs become their inner workings, and mathematical subjects give substance to schools of magic. The fun comes from discovering that the spell actually means something precise and works.

The core experience is a browser-based, side-by-side editor: Arcana on the left, ordinary Lean on the right, with reversible editing in either direction. A reader should be able to enjoy the magical language, inspect its mathematical meaning, and explore how the proof works. Preserve both the playful atmosphere and the ability to understand the mathematics.

The longer-term ambition is substantial graduate mathematics across multiple schools, drawing on mathlib: algebra, analysis, topology, geometry, and related subjects. The user explicitly chose an intermediate step of developing **one school deeply enough to judge the experience**. The current school is **Enchantment / group theory**. Continue from that scope; expansion into other schools should follow the user's direction.

## What makes a good addition

- Give a school a coherent mathematical progression. Enchantment currently develops subgroups, homomorphisms, kernels, quotients, the first isomorphism theorem, Lagrange, simple groups of prime order, orbit–stabilizer, Cayley's theorem, and a concrete permutation example.
- Include mathematical meaning, hypotheses, proof ideas, prerequisites, and precise library references alongside the magical presentation. Substantial examples should reward opening their proofs.
- Extract shared foundations into **Cantrips** when multiple spells or schools need them. Make these useful imported lemmas and constructions; existing Pacts already uses the shared function-composition cantrips.
- Choose memorable, consistent magical names for mathematical concepts. Keep the shared vocabulary and serialized translation key coherent across folios.
- Get the functionality working, then polish the delight. The user specifically likes sparkles, glimmers, and IDE-style folding that reveals a spell's inner body.

## Mathematical and translation guarantees

Lean and mathlib provide the proof checking. Arcana is a reversible presentation language. A successful translation round trip means the text survived conversion; it does not establish that an edited proof is valid.

- Preserve the distinction between checked original folios and unchecked drafts. The static browser currently does not run Lean. Editing a checked example must never retain an unsupported proof-check claim.
- Shipped folios must compile as Lean, decode byte-for-byte from their Arcana representation using the saved key, and compile again from that decoded source.
- Keep the existing axiom audit: only `propext`, `Classical.choice`, and `Quot.sound` are allowed. Do not use `sorry`, `admit`, custom axioms, or native evaluation shortcuts to make a lesson appear verified.
- State hypotheses and mathematical caveats accurately. For example, `Nat.card` is zero on infinite types, and orbit/coset correspondence need not be a group isomorphism.
- Preserve strings, comments, quoted identifiers, whitespace, and literal glyphs through translation. Namespace conversion belongs in the lexer/translator.
- Arcana namespaces and field access use Mercury, **`☿`**: `Rite☿Perfect` corresponds to `Function.Bijective`. Use Mercury exclusively for spell namespaces and field access. Decimal points and punctuation inside literal text retain their meaning.
- Multi-word Arcana names use sparkles, **`✨Preserve✨the✨Binding✨`**, not TitleCase: capitalized words for spells, rituals, and namespaces; lowercase words for library functions; small words such as "the" and "of" in lower case. Frequent local hypothesis names stay single words (`sigilward`). The group inverse `⁻¹` is written as a dagger, `†`. Named theorems carry their discoverer's name, as in `✨Lagrange's✨Measure✨of✨the✨Veyr✨` or `✨Noether's✨Unveiling✨of✨the✨Image✨`; the lesson text says who they were. Words about prime numbers build on `Indivisible` (`Nat.Prime`) and `primal` (`primalward`). The user wants the Arcana side to avoid looking mathematical or programmatic, so keep `:`, `/`, `{`, `}` and similar symbols replaced.
- Spell numeric literals use digit-by-digit kanji (`0123456789` → `〇一二三四五六七八九`), preserving leading zeros, decimal places, base prefixes, and exponent spelling without numeric evaluation. Number lexing and editor highlighting share the same patterns. Reserve numeral-leading spell names so namespace components cannot absorb numeric projections; leave strings, comments, and quoted identifiers literal.
- Preserve quoted Lean identifiers verbatim, including the `«…»` delimiters, in both panes. Never strip their quotation or reserve their contents as unquoted spell names.
- Keep the translation key with exported drafts; it carries the information needed to reverse renamed identifiers.
- Keep actual Lean namespaces, declarations, and proof locals mathematical. The book lives in `Mathematics.Functions` and `Mathematics.GroupTheory`; `grimoire/lexicon.json` holds the spell-side names. Its optional `namespaces` map translates full prefixes, so the Enchantment alias does not rename `Mathlib.GroupTheory`.
- Shared teaching comments are now requested: preserve exactly the same comment text in Lean and Arcana. They are display-hideable without changing either document. Keep actual mathematical declarations and proofs fixed when editing explanations.
- Spell-side term variables use lowercase material components with interior sparkles (`x` → `jade✨cube`, `y` → `silver✨bell`, `f` → `copper✨wire`). These are single identifiers; keep framed sparkles for spell titles. Include ingredients in generated glossaries. Regenerate the live catalog and downloadable key through verification.
- Carrier variables use cryptic runes (`G` → `ᛰ`, `H` → `☥`, `X` → `🌒`); their structures, not their rune, supply mathematical laws. Use the Veyr family: Group → Veyr, Ring → Veyrath, Field → Veyrion, Module → Bound Veyr, Algebra → Bound Veyrath. “Bound” marks scalar action, “Harmonic” commutativity, and “Chanted” additive group notation. See `grimoire/VOCABULARY.md` for precise inheritance and semiring caveats. Keep the current structure vocabulary in the saved lexicon; do not duplicate it with alternate defaults in `src/tables.json`.
- `instance` reads `bestow`: an instance bestows a structure on a carrier so every later spell can use it. `class` stays `order`.
- Forgetful functors are Disenchantments: `forget` (to the bare carrier) is `Disenchantment`, and `forget₂` (to a weaker structure, such as Veyr → Choir) is `✨Lesser✨Disenchantment✨`. Free objects are Primordials (left adjoints); endomorphism objects are Courts (`Function.End`), and pacts into a court are actions. Categories take the plural of their structure (`MonCat` → `Choirs`), and `⊣` reads `☍`. Category symbols have glyphs: `⟶` → `⟿`, `⥤` → `⤳`, `≫` → `⨾`, `𝟙` → `◎`. Natural transformations are Accords; a functor's `map` already reads `enchant`. Objects of a category are carriers and take runes (`C` → `ᚳ`, `Y` → `ᛇ`, `Z` → `ᛜ`); natural transformations are terms and take material components (`η` → `silver✨thread`). Category theory lives in the Transmutation school (`Mathematics.CategoryTheory` → `Arcana☿Transmutation`).
- The product and repository are Arcana. `Mathematics` translates to `Arcana`; the school namespace is `Arcana☿Enchantment`. Preserve mathematical Lean names.

## Interaction and visual character

Keep the grimoire welcoming and readable. Magic should help a reader explore the proof. Folding hides the body while retaining the complete statement and hypotheses. Reveal effects should be brief, respect reduced-motion preferences, and preserve keyboard access.

The page starts in Magic mode. The top-level reading selector offers Magic, Side by side, and Mathematics. Magic hides mathematical exposition, references, the Lean pane, and shared teaching comments; other modes restore the reader's comment preference. Switching modes must preserve both editor instances, documents, undo histories, folds, and synchronization. Character transmutation effects must be bounded, interruptible, and disabled for reduced motion. Folio and personal drafts survive navigation within a tab; a reload loses unsaved work, so avoid unnecessarily refreshing a user's active editor.

## Where to work and how to verify

This repository's root is the Arcana browser project. TypeScript is the sole translator implementation. The user explicitly removed the Python prototype and all backward compatibility requirements. Use the current `arcana/v1` bundle format; do not add retired syntax, aliases, fixtures, or migration paths.

- Read `README.md` and the relevant `.doctrack/` notes before changing a subsystem. Update those notes when behavior or architecture changes.
- Mathematical sources: `math/Mathematics/`; lesson explanations and vocabulary: `grimoire/chapters.json` and `grimoire/lexicon.json`.
- Translation: `src/translator.ts`; verification status: `src/catalog.ts`; editor: `src/main.ts`; folding/effects: `src/magic.ts`; styling: `src/style.css`.
- Use `npm ci` to install dependencies, `npm run dev` for the editor, `npm test` for regressions, and `npm run build` for TypeScript checking and the static bundle.
- After changing formal sources, translation, vocabulary, or lesson metadata, run `npm run grimoire:verify`, then the tests and build. The verifier regenerates `src/grimoire.generated.json`, `public/grimoire/`, and `grimoire/README.md`; do not hand-edit those outputs.
- Run direct `lake` commands from `math/`, where the pinned Lean toolchain and mathlib manifest live. See `README.md` for initial mathlib setup. Ordinary frontend builds use the checked-in catalog and need no Lean installation.
- Match verification effort to the change. Documentation-only changes need a content/diff review rather than rebuilding the mathematics.

GitHub is `jakemannix/Arcana` (the remote may be named `github` or `origin`). The repository is private; the site is public, by the user's choice.

- Every push to `main` redeploys the public site to GitHub Pages through `.github/workflows/deploy.yml`, which runs `npm ci`, `npm test`, and `npm run build`, then publishes `dist/`. A failed test stops the deploy. The workflow can also run by hand (`workflow_dispatch`).
- The user wants work merged quickly: open a PR, verify it, and merge it when checks pass.
- The build must work under a subfolder (`/Arcana/`). Keep Vite's `base: './'` and use relative paths, never a leading `/`, for links to `public/` files such as `grimoire/axioms.txt`.
- The Pages deploy does not run Lean. Run `npm run grimoire:verify` locally and commit its outputs before merging formal changes; the tests reject stale outputs.
- `.openai/hosting.json` configures an additional private Sites copy at `https://arcana.jakemannix.chatgpt.site`, updated separately from GitHub merges. GitHub Pages is the public site at `https://blog.yetanotheruseless.com/Arcana/`. Preserve each site's existing audience unless the user asks to change it.
