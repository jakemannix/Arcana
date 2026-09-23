import Mathlib.GroupTheory.SpecificGroups.Dihedral

namespace Mathematics.GroupTheory

abbrev pentagramSymmetries := DihedralGroup 5

def starRotation : pentagramSymmetries := DihedralGroup.r 1

def starReflection : pentagramSymmetries := DihedralGroup.sr 0

def starAdjacent (x y : ZMod 5) : Prop := y = x + 2 ∨ y = x - 2

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

theorem starAction_mul : ∀ g h : pentagramSymmetries, ∀ x : ZMod 5,
    starAction (g * h) x = starAction g (starAction h x) := by decide

theorem starAction_faithful : ∀ g h : pentagramSymmetries,
    (∀ x : ZMod 5, starAction g x = starAction h x) → g = h := by decide

theorem starAction_preserves_edges : ∀ g : pentagramSymmetries, ∀ x y : ZMod 5,
    starAdjacent (starAction g x) (starAction g y) ↔ starAdjacent x y := by
  unfold starAdjacent
  decide

theorem star_edge_and_diagonal : starAdjacent 0 2 ∧ ¬starAdjacent 0 1 := by
  unfold starAdjacent
  decide

theorem star_normal_forms : ∀ g : pentagramSymmetries, ∃ k : Fin 5,
    g = starRotation ^ k.val ∨ g = starReflection * starRotation ^ k.val := by decide

end Mathematics.GroupTheory
