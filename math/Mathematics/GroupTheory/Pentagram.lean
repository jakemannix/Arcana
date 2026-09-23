import Mathlib.GroupTheory.SpecificGroups.Dihedral

namespace Mathematics.GroupTheory

/- Use the standard dihedral model for a regular pentagram.
Only its five outer tips are labeled; crossings are not additional vertices. -/
abbrev pentagramSymmetries := DihedralGroup 5

def starRotation : pentagramSymmetries := DihedralGroup.r 1

def starReflection : pentagramSymmetries := DihedralGroup.sr 0

/- Join every second tip around the surrounding pentagon.
The plus-or-minus alternatives make this an undirected star edge relation. -/
def starAdjacent (x y : ZMod 5) : Prop := y = x + 2 ∨ y = x - 2

/- Rotations add a residue; reflected rotations reverse it and shift.
The sign convention matches multiplication in the dihedral model. -/
def starAction (g : pentagramSymmetries) (x : ZMod 5) : ZMod 5 :=
  match g with
  | DihedralGroup.r i => x + i
  | DihedralGroup.sr i => -x - i

theorem card_pentagramSymmetries : Fintype.card pentagramSymmetries = 10 :=
  calc Fintype.card pentagramSymmetries = 2 * 5 := DihedralGroup.card
    _ = 10 := by decide

theorem starRotation_pow_five : starRotation ^ 5 = 1 := DihedralGroup.r_one_pow_n

theorem orderOf_starRotation : orderOf starRotation = 5 := DihedralGroup.orderOf_r_one

theorem orderOf_starReflection : orderOf starReflection = 2 := DihedralGroup.orderOf_sr 0

theorem star_conjugation : starReflection * starRotation * starReflection = starRotation⁻¹ :=
  calc starReflection * starRotation * starReflection = DihedralGroup.r 4 := by decide
    _ = starRotation⁻¹ := by decide

theorem starAction_one : ∀ x : ZMod 5, starAction 1 x = x := by decide

/- The action law checks composition in the correct order:
the rightmost group element acts first. -/
theorem starAction_mul : ∀ g h : pentagramSymmetries, ∀ x : ZMod 5,
    starAction (g * h) x = starAction g (starAction h x) := by decide

/- Faithful means no two different group elements move every tip identically.
The next theorem separately checks that each move preserves the star’s edges. -/
theorem starAction_faithful : ∀ g h : pentagramSymmetries,
    (∀ x : ZMod 5, starAction g x = starAction h x) → g = h := by decide

theorem starAction_preserves_edges : ∀ g : pentagramSymmetries, ∀ x y : ZMod 5,
    starAdjacent (starAction g x) (starAction g y) ↔ starAdjacent x y := by
  unfold starAdjacent
  decide

/- This small check distinguishes an edge of the star from a side of
the surrounding pentagon. Both predicates use the same explicit adjacency rule. -/
theorem star_edge_and_diagonal : starAdjacent 0 2 ∧ ¬starAdjacent 0 1 := by
  unfold starAdjacent
  decide

theorem star_normal_forms : ∀ g : pentagramSymmetries, ∃ k : Fin 5,
    g = starRotation ^ k.val ∨ g = starReflection * starRotation ^ k.val := by decide

end Mathematics.GroupTheory
