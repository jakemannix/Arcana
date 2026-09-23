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

The source namespace `Mathematics` becomes `Arcana`, so group theory opens with `sanctum Arcana☿Enchantment`. Saved bundles carry their own vocabulary: older bundles keep their previous carrier and structure names and decode exactly with their saved key.
