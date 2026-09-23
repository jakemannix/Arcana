# Arcana: carriers, structures, and bindings

A carrier rune is a variable naming a type. It makes no claim about that type's laws. For example, `ᛰ` is the grimoire's name for `G`, `☥` for `H`, and `🌒` for `X`. In a group-action lesson, `X` is a type of points, not a Lean `Set G` (a collection of elements inside a specified type). Element variables remain material components, such as `jade✨cube : 🌒`.

## The Veyr family

| Lean structure | Spoken name | Spell identifier | Relationship |
|---|---|---|---|
| `Group G` | Veyr | `Veyr` | One associative operation, identity, and inverses |
| `CommGroup G` | Harmonic Veyr | `✨Harmonic✨Veyr✨` | A Veyr whose operation commutes |
| `AddGroup G` | Chanted Veyr | `✨Chanted✨Veyr✨` | The additive notation for the group laws |
| `AddCommGroup G` | Harmonic Chanted Veyr | `✨Harmonic✨Chanted✨Veyr✨` | A commutative additive group |
| `Ring R` | Veyrath | `Veyrath` | A commutative additive group, plus associative unital multiplication distributing over addition |
| `CommRing R` | Harmonic Veyrath | `✨Harmonic✨Veyrath✨` | A Veyrath whose multiplication also commutes |
| `Field F` | Veyrion | `Veyrion` | A nontrivial commutative ring with multiplicative inverses for nonzero elements |
| `Module R M` | Bound Veyr | `✨Bound✨Veyr✨` | A compatible action of scalars from `R` on `M`; over a ring, the module's addition has group structure |
| `Algebra R A` | Bound Veyrath | `✨Bound✨Veyrath✨` | A compatible scalar action together with multiplication; over a commutative ring, an algebra is both a ring and a module |

“Harmonic” expresses commutativity of the named operation. “Chanted” distinguishes additive notation; it does not add a new mathematical law. “Bound” always marks an external scalar action, not containment. “Inner” marks a substructure, as in `✨Inner✨Veyr✨` (Subgroup) and `✨Inner✨Bound✨Veyr✨` (Submodule).

```text
⟮Veyr ᛰ⟯                         -- Group G
⟮Veyrath ᚱ⟯                      -- Ring R
⟮✨Bound✨Veyr✨ ᚱ ᛗ⟯              -- Module R M
⟮Veyrion ᚠ⟯                      -- Field F
⟮✨Bound✨Veyrath✨ ᚠ ᚫ⟯           -- Algebra F A
```

In each binding, the first rune supplies scalars and the second receives their action. The names expose the relationship while the Lean pane remains the exact mathematical statement.

A ring is a group **under addition**; its whole carrier need not be a group under multiplication. A field's nonzero elements form a multiplicative group. Algebras can be over commutative rings, not only fields. Lean's `Module` and `Algebra` also admit semiring generalizations; their explicit hypotheses govern those cases, and the names must never be used to infer extra group or inverse laws. This vocabulary prepares those future lessons without claiming they are already implemented.

## Runes and saved keys

The curated key assigns distinct runes to `G H K X R S F M A E V N U B` and `α β γ δ`. A carrier can have several structures simultaneously without changing its rune. Runes are recognized as identifier components, including in namespace paths and projections; literal runes in Lean strings and comments remain literal.

Use `\rune` → `ᛰ`, `\ankh` → `☥`, `\moon` → `🌒`, and `\othala` → `ᛟ` in the spell editor. The folio glossary pairs every used rune with its Lean name.

The source namespace `Mathematics` becomes `Arcana`, so group theory opens with `sanctum Arcana☿Enchantment`. Current `arcana/v1` bundles carry their vocabulary key so renamed identifiers decode exactly.

## Bestowals, Disenchantments, and the two hands

An `instance` reads `bestow`: it bestows a structure on a carrier, and every later spell may use that structure without asking. A `class` is an `order`: a kind of structure that Lean finds by itself.

| Lean | Spell | Meaning |
|---|---|---|
| `forget C` | `Disenchantment` | Forget all structure; keep the carrier |
| `forget₂ C D` | `✨Lesser✨Disenchantment✨` | Forget part of the structure, such as a Veyr's inverses |
| `FreeMonoid S` | `✨Primordial✨Choir✨` | The freest choir on seeds `S`; the left hand of Disenchantment |
| `Units M` | `Reversibles` | The members of a choir that can be undone; the right hand of the lesser Disenchantment from Veyrs to Choirs |
| `Function.End X` | `Rite☿Court` | All transmutations of `X`; pacts into a court are actions |
| `MonCat`, `GrpCat` | `Choirs`, `Veyrs` | The category of all choirs, of all Veyrs |
| `⊣` | `☍` | "is the left hand of" (an adjunction) |

The full Disenchantment from Choirs to carriers has a left hand but no right hand: a right hand would need it to preserve coproducts, and it does not.


## Numerals

Spell numbers use kanji digits in place-value order: `0 1 2 3 4 5 6 7 8 9` becomes `〇 一 二 三 四 五 六 七 八 九`. For example, the six permutations of three sigils use `六` and `三`, while `24` is `二四`. We use digit substitution, not additive Japanese forms such as `二十四`, so every source character can return exactly. Type a backslash before a digit to insert it. Literal text and quoted names keep their contents.
