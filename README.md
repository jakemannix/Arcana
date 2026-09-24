# Arcana · The Graduate Grimoire

A browser grimoire of **real mathematics**, presented in Arcana. Twenty-nine folios span six schools and shared Cantrips: group theory, category theory and homology, complex analysis, affine algebraic geometry, probability, statistics, number theory, and real and functional analysis. Every definition and theorem is compiled against pinned proof libraries; its translated `.spell` source is decoded and compiled again.

[Read the complete grimoire](grimoire/README.md) · [Proof dependency audit](public/grimoire/axioms.txt)

[Open Arcana](https://blog.yetanotheruseless.com/Arcana/) · [Structure vocabulary](grimoire/VOCABULARY.md)

## Read and experiment

The browser opens on the first isomorphism theorem. Use the contents to explore generated subgroups, homomorphisms, kernels and normality, quotient descent and uniqueness, Lagrange's theorem, simple groups of prime order, orbit–stabilizer, Cayley's theorem, the symmetries of the equilateral triangle and regular pentagram, cyclic and Klein groups, square symmetries, Hamilton’s quaternion group, and a complete classification of groups of order eight.

Each folio includes its mathematical meaning, hypotheses, proof idea, prerequisites, vocabulary, and upstream proof-library references pinned to the exact commit. Arcana source and ordinary Lean are editable side by side. Spell bodies start folded: click **reveal enchantment**, the gutter, or **Reveal** to open them with a brief glimmer. **Veil** folds them again. Reduced-motion preferences disable the effects.

The page opens in **Magic** mode. Use the top-level **Magic / Side by side / Mathematics** switch to change the whole reading view. Magic hides mathematical exposition, references, and the Lean pane. Visible characters tumble into a jumble and reform as the new view over 2.1 seconds; reduced-motion preferences make the switch immediate. Both editors retain their text, undo history, and folds.

School headings expand to show their lessons and subschools. Selecting a prerequisite opens its school automatically. Every folio includes a guided tutorial: motivation, four steps through its argument, and an experiment with a hideable hint. Open **Read the tutorial** to expand the walkthrough. Shared teaching comments are identical in Lean and Arcana. **Hide notes** conceals them in both editors; individual **read note** buttons reveal selected comments. Magic mode hides all teaching comments, and your note preference returns when you leave it. Hiding notes never removes them from copies, saved bundles, or checked source.

Original folios show **Lean checked** only while their source exactly matches a verified original and the translation round-trips. Editing changes that status to **draft proof unchecked**. The browser does not run Lean; a successful translation does not prove an edited theorem. Standard Lean axioms (`propext`, `Classical.choice`, and `Quot.sound`) may occur; `sorry`, custom axioms, and native evaluation shortcuts are not used.

Arcana namespaces and field access use Mercury's **☿** glyph: `Rite☿Perfect` translates to `Function.Bijective`. Spell namespaces and field access require Mercury. Chained tuple projections use Mercury too: `x.2.1` has two field separators, while the literal `2.1` keeps its decimal point. Decimal points and literal text retain their original punctuation.

Numeric literals use digit-by-digit kanji in Arcana: `0123456789` → `〇壱弐参四五六七八九`. The digits 1–3 use the formal forms 壱 弐 参 from contracts and banknotes, because the plain 一 二 三 read as a dash, `=` and `≡`. Thus `24` becomes `弐四`, `007` becomes `〇〇七`, and `3.1400` becomes `参.壱四〇〇`. This is a positional digit encoding rather than Japanese tens/hundreds notation. It preserves the spelling of every literal, including large integers, decimal places, scientific notation, and base prefixes (`0x10` → `〇x壱〇`). The Lean pane keeps ordinary numerals. Type `\0` through `\9` to insert kanji digits; raw Arabic numeric literals in the spell pane prompt you to use these shortcuts. Strings, characters, comments, and quoted identifiers retain their contents.

Quoted Lean identifiers (`«…»`) remain literal, with their quotation intact, so names such as `«bestow»` cannot be mistaken for Arcana keywords.

Multi-word Arcana names are joined with sparkles: `✨Preserve✨the✨Binding✨` translates to `hom_map_mul`. A group inverse is a dagger, so `jade✨cube†` means `x⁻¹`. Literal ✨ and † characters in Lean source are escaped, so translation stays exact.

Lean declarations and modules use mathematical names: `Mathematics.GroupTheory` is the namespace behind `Arcana☿Enchantment`, and `smul_eq_smul_iff_mem_stabilizer` is the theorem behind `✨Same✨Place✨Same✨Veil✨`. These are the actual compiled sources. The saved key's optional `namespaces` map translates full namespace prefixes independently of individual words, so `Mathlib.GroupTheory` retains its own translation.

Variables become material components on the spell side: `x` is `jade✨cube`, `y` is `silver✨bell`, and `f` is `copper✨wire`. These lowercase names are single identifiers, joined by interior sparkles. Their mathematical types and hypotheses are unchanged. The folio glossary includes the ingredients and their Lean names. Curate names in `grimoire/lexicon.json`; verification generates the catalog key, downloadable `public/grimoire/arcana.key.json`, and each saved bundle.

Carriers use cryptic runes: `G` → `ᛰ`, `H` → `☥`, and `X` → `🌒`. A rune names a type, while the accompanying structure supplies its laws. The shared family is **Veyr** (Group), **Veyrath** (Ring), **Veyrion** (Field), **Bound Veyr** (Module), and **Bound Veyrath** (Algebra). “Harmonic” marks commutativity; “Chanted” distinguishes additive group notation. See the [vocabulary and inheritance guide](grimoire/VOCABULARY.md) for the precise relationships and future semiring generalizations. The spell namespace is `sanctum Arcana`; the mathematical namespace remains `Mathematics`.

Type `\rune`, `\ankh`, `\moon`, or `\othala` for `ᛰ`, `☥`, `🌒`, or `ᛟ`. Saved bundles use the `arcana/v1` format. Only the current syntax and format are supported.

To type glyphs, use a backslash and a short name, then a space or Tab, as in Lean's own editors. In the spell pane, `\sp` gives ✨ and `\dag` gives †; a backslash before any Lean symbol gives its spell glyph, so `\:` gives ⟡ and `\(` gives ⟪. The Lean pane uses Lean's shortcuts, such as `\to` and `\-1`. The "How to read this" panel lists the common ones.

Drafts survive switching folios and importing files within a tab. Use **Return to personal draft** to return to an imported document. Saved drafts with paused translation reopen with both texts intact and remain unchecked. Download a grimoire JSON bundle to retain both texts and the name key; reloads lose unsaved drafts. **Open file** accepts those bundles, `.lean`, or `.spell` (using the current key). Original source downloads are provided per folio. CodeMirror's search, undo, redo, indentation, and folding shortcuts are available. Escape followed by Tab leaves an editor.

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

Lean is pinned by `math/lean-toolchain` to **v4.33.1**. Mathlib is locked to **0df444a360eaa60ab8c11dca51a86af692955474** in `math/lake-manifest.json`. The verifier checks the dependency checkout, compiles the original project, translates every folio using one curated lexicon, reloads the serialized key, checks byte-for-byte decoding, and independently compiles the decoded modules with their own import path. It then inspects every exported declaration with `#print axioms` and allows only the three standard axioms listed above.

The **Eightfold Way** proves that every group of order eight is isomorphic to C₈, C₄ × C₂, C₂³, D₄, or Q₈, and proves all ten pairwise non-isomorphism claims. Its finite computations count involutions as 1, 3, 7, 5, and 1; commutativity separates the remaining C₈/Q₈ pair. Exhaustiveness uses [lixiang90 and the P3Group contributors’ classification of groups of order p³](https://github.com/lixiang90/p3group/blob/822647a71aedace398cb886eb9a6b7993096e53b/P3Group/Classification.lean), pinned at **822647a71aedace398cb886eb9a6b7993096e53b**. The source files carry Apache 2.0 notices. It builds unmodified with our Lean/mathlib version. The verifier checks both library revisions and clean source trees; the transitive axiom audit covers the imported classification proof. The catalog records the dependency revisions and hashes of the manifest, Lake configuration, and verifier itself.

Only after all checks pass does it generate the browser catalog, `.lean`/`.spell` downloads, bundles, key, audit, and readable book. `npm test` detects stale source, vocabulary, and metadata; validates all translations and prerequisite links; and tests folding boundaries and the edited-proof status. The tests cover quoted identifiers, saved-key round trips, namespace glyph handling, and sparkle names.

## Structure

- `math/Mathematics/Functions.lean`: reusable function composition, injectivity, surjectivity, and equivalence lemmas. The Homomorphisms module actually imports and uses these.
- `math/Mathematics/GroupTheory/*.lean`: sixteen substantive group-theory folios.
- `math/Mathematics/CategoryTheory/ForgetfulAdjoints.lean`: the first Transmutation folio, on the left and right adjoints of forgetful functors.
- `math/Mathematics/CategoryTheory/Yoneda.lean`: the covariant Yoneda lemma built by hand, checked against mathlib, with two representing objects as examples.
- `grimoire/schools.json`: school and subschool navigation, with magical and mathematical labels.
- `grimoire/chapters.json`: explanations, four-step tutorials, prerequisite graph, subschool assignments, and proof-library source references.
- `grimoire/lexicon.json`: curated Arcana names for mathematical constructs and library lemmas.
- `scripts/verify-grimoire.ts`: reproducible build, translation, and proof audit.
- `src/grimoire.generated.json`: verified browser catalog and evidence hashes; do not edit manually.
- `src/translator.ts`: DOM-independent reversible token translator.
- `src/catalog.ts`: catalog types and conservative verification-status predicate.
- `src/main.ts`: book navigation, CodeMirror editing, draft retention, and import/export.
- `src/magic.ts`: proof-body folding, reveal glimmers, and finite-lived sparkle effects.
- `public/grimoire/`: downloadable sources, shared key, bundles, and axiom report.

Arcana is a reversible presentation language, not a separate proof kernel. Its tokenizer supports these verified sources, not all possible Lean syntax extensions.

## The new paths

- **Transmutation · Chains & echoes:** build an actual Mathlib chain complex, prove boundaries are cycles, and show chain maps preserve both. Compute a rational example’s homology as ℚ, connect that quotient to Mathlib’s H₁, and check induced-map identity and composition laws.
- **Illusion:** compute with i, conjugation, and modulus, then prove complex derivatives for z² and exp(z²). The scalar field is ℂ, so these are complex derivatives.
- **Phantasms:** pass between polynomial equations and affine complex zero loci. Prove their order-reversing correspondence, identify a point’s vanishing ideal as an evaluation kernel, and compute the two-axis locus xy = 0. This connects Illusion’s complex coordinates with Transmutation’s structural correspondences.
- **Divination · Augury:** a fair-die probability mass function, event probabilities, integral expectation, and an independent pair of dice.
- **Divination · Scrying:** mean, empirical variance, translation laws, second moments, and least-squares minimization, with exact data calculations. The tutorial distinguishes descriptive variance from corrected sample variance and statistical inference.
- **Divination · Arithmancy:** congruences, prime divisibility, Fermat’s little theorem, efficient modular powers, and field inverses, with counterexamples showing why hypotheses matter.
- **Necromancy:** geometric convergence, its epsilon-N meaning, positivity without reaching the limit, derivatives, and continuity. **Bound echoes** joins Enchantment’s linear algebra to norms and continuous linear maps, deriving amplification and error bounds.

These are introductory foundations. The chain complex is an algebraic example, not a construction of singular homology from spaces; Phantasms covers classical affine sets, not schemes. Necromancy stays with real analysis and elementary operator estimates, without PDE claims.
