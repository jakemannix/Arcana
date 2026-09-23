# Arcana · The Enchantment Grimoire

A browser grimoire of **real group theory**, presented in Arcana. Ten Enchantment lessons and two Transmutation lessons share a foundational cantrip folio. The 84 definitions and theorems are compiled against a pinned mathlib release; their translated `.spell` sources are decoded and compiled again.

[Read the complete grimoire](grimoire/README.md) · [Proof dependency audit](public/grimoire/axioms.txt)

[Open Arcana](https://blog.yetanotheruseless.com/Arcana/) · [Structure vocabulary](grimoire/VOCABULARY.md)

## Read and experiment

The browser opens on the first isomorphism theorem. Use the contents to explore generated subgroups, homomorphisms, kernels and normality, quotient descent and uniqueness, Lagrange's theorem, simple groups of prime order, orbit–stabilizer, Cayley's theorem, and the concrete permutation group S₃.

Each folio includes its mathematical meaning, hypotheses, proof idea, prerequisites, vocabulary, and upstream mathlib references pinned to the exact commit. Arcana source and ordinary Lean are editable side by side. Spell bodies start folded: click **reveal enchantment**, the gutter, or **Reveal** to open them with a brief glimmer. **Veil** folds them again. Reduced-motion preferences disable the effects.

Original folios show **Lean checked** only while their source exactly matches a verified original and the translation round-trips. Editing changes that status to **draft proof unchecked**. The browser does not run Lean; a successful translation does not prove an edited theorem. Standard Lean axioms (`propext`, `Classical.choice`, and `Quot.sound`) may occur; `sorry`, custom axioms, and native evaluation shortcuts are not used.

Arcana namespaces and field access use Mercury's **☿** glyph: `Rite☿Perfect` translates to `Function.Bijective`. Spell namespaces and field access require Mercury. Decimal points and literal text retain their original punctuation.

Quoted Lean identifiers (`«…»`) remain literal, with their quotation intact, so names such as `«bestow»` cannot be mistaken for Arcana keywords.

Multi-word Arcana names are joined with sparkles: `✨Preserve✨the✨Binding✨` translates to `hom_map_mul`. A group inverse is a dagger, so `jade✨cube†` means `x⁻¹`. Literal ✨ and † characters in Lean source are escaped, so translation stays exact.

Lean declarations and modules use mathematical names: `Mathematics.GroupTheory` is the namespace behind `Arcana☿Enchantment`, and `smul_eq_smul_iff_mem_stabilizer` is the theorem behind `✨Same✨Place✨Same✨Veil✨`. These are the actual compiled sources. The saved key's optional `namespaces` map translates full namespace prefixes independently of individual words, so `Mathlib.GroupTheory` retains its own translation.

Variables become material components on the spell side: `x` is `jade✨cube`, `y` is `silver✨bell`, and `f` is `copper✨wire`. These lowercase names are single identifiers, joined by interior sparkles. Their mathematical types and hypotheses are unchanged. The folio glossary includes the ingredients and their Lean names. Curate names in `grimoire/lexicon.json`; verification generates the catalog key, downloadable `public/grimoire/arcana.key.json`, and each saved bundle.

Carriers use cryptic runes: `G` → `ᛰ`, `H` → `☥`, and `X` → `🌒`. A rune names a type, while the accompanying structure supplies its laws. The shared family is **Veyr** (Group), **Veyrath** (Ring), **Veyrion** (Field), **Bound Veyr** (Module), and **Bound Veyrath** (Algebra). “Harmonic” marks commutativity; “Chanted” distinguishes additive group notation. See the [vocabulary and inheritance guide](grimoire/VOCABULARY.md) for the precise relationships and future semiring generalizations. The spell namespace is `sanctum Arcana`; the mathematical namespace remains `Mathematics`.

Type `\rune`, `\ankh`, `\moon`, or `\othala` for `ᛰ`, `☥`, `🌒`, or `ᛟ`. Saved bundles use the `arcana/v1` format. Only the current syntax and format are supported.

To type glyphs, use a backslash and a short name, then a space or Tab, as in Lean's own editors. In the spell pane, `\sp` gives ✨ and `\dag` gives †; a backslash before any Lean symbol gives its spell glyph, so `\:` gives ⟡ and `\(` gives ⟪. The Lean pane uses Lean's shortcuts, such as `\to` and `\-1`. The "How to read this" panel lists the common ones.

Drafts survive switching folios within a tab. Download a grimoire JSON bundle to retain both texts and the name key; reloads lose unsaved drafts. **Open file** accepts those bundles, `.lean`, or `.spell` (using the current key). Original source downloads are provided per folio. CodeMirror's search, undo, redo, indentation, and folding shortcuts are available. Escape followed by Tab leaves an editor.

## Run the browser locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open Vite's printed URL. `npm run build` creates static assets in `dist/`; `npm run preview` serves the result. Every push to `main` runs the tests, builds, and publishes the site to GitHub Pages (`.github/workflows/deploy.yml`). No backend or API key is needed. Google Fonts have local font fallbacks.

## Reproduce the mathematics

Install [elan](https://github.com/leanprover/elan) first, then:

```sh
cd math
lake update
lake exe cache get
cd ..
npm run grimoire:verify
npm test
npm run build
```

Lean is pinned by `math/lean-toolchain` to **v4.33.1**. Mathlib is locked to **0df444a360eaa60ab8c11dca51a86af692955474** in `math/lake-manifest.json`. The verifier checks the dependency checkout, compiles the original project, translates every folio using one curated lexicon, reloads the serialized key, checks byte-for-byte decoding, and independently compiles the decoded modules with their own import path. It then inspects all 84 declarations with `#print axioms` and allows only the three standard axioms listed above.

Only after all checks pass does it generate the browser catalog, `.lean`/`.spell` downloads, bundles, key, audit, and readable book. `npm test` detects stale source, vocabulary, and metadata; validates all translations and prerequisite links; and tests folding boundaries and the edited-proof status. The tests cover quoted identifiers, saved-key round trips, namespace glyph handling, and sparkle names.

## Structure

- `math/Mathematics/Functions.lean`: reusable function composition, injectivity, surjectivity, and equivalence lemmas. The Homomorphisms module actually imports and uses these.
- `math/Mathematics/GroupTheory/*.lean`: ten substantive group-theory folios.
- `math/Mathematics/CategoryTheory/ForgetfulAdjoints.lean`: the first Transmutation folio, on the left and right adjoints of forgetful functors.
- `math/Mathematics/CategoryTheory/Yoneda.lean`: the covariant Yoneda lemma built by hand, checked against mathlib, with two representing objects as examples.
- `grimoire/chapters.json`: explanations, prerequisite graph, and mathlib source references.
- `grimoire/lexicon.json`: curated Arcana names for mathematical constructs and library lemmas.
- `scripts/verify-grimoire.ts`: reproducible build, translation, and proof audit.
- `src/grimoire.generated.json`: verified browser catalog and evidence hashes; do not edit manually.
- `src/translator.ts`: DOM-independent reversible token translator.
- `src/catalog.ts`: catalog types and conservative verification-status predicate.
- `src/main.ts`: book navigation, CodeMirror editing, draft retention, and import/export.
- `src/magic.ts`: proof-body folding, reveal glimmers, and finite-lived sparkle effects.
- `public/grimoire/`: downloadable sources, shared key, bundles, and axiom report.

Arcana is a reversible presentation language, not a separate proof kernel. Its tokenizer supports these verified sources, not all possible Lean syntax extensions.

Further schools remain future work.
