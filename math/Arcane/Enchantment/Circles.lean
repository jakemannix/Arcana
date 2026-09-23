import Mathlib.Algebra.Group.Subgroup.Basic

namespace Arcane.Enchantment

variable {G : Type*} [Group G]

def generatedCircle (s : Set G) : Subgroup G := Subgroup.closure s

theorem circle_contains_seed (s : Set G) : s ⊆ generatedCircle s :=
  Subgroup.subset_closure

theorem circle_is_least (s : Set G) (H : Subgroup G) :
    generatedCircle s ≤ H ↔ s ⊆ H := Subgroup.closure_le H

theorem circle_closed_under_division (H : Subgroup G) {x y : G}
    (hx : x ∈ H) (hy : y ∈ H) : x * y⁻¹ ∈ H :=
  H.mul_mem hx (H.inv_mem hy)

theorem circle_of_circle (H : Subgroup G) : generatedCircle (H : Set G) = H :=
  Subgroup.closure_eq H

end Arcane.Enchantment
