import Mathlib.Algebra.Group.Subgroup.Basic

namespace Arcane.Enchantment

variable {G : Type*} [Group G]

def generatedCircle (s : Set G) : Subgroup G := Subgroup.closure s

theorem circle_contains_seed (s : Set G) : s ⊆ generatedCircle s := by
  intro x hx
  show x ∈ Subgroup.closure s
  rw [Subgroup.mem_closure]
  intro K hK
  exact hK hx

theorem circle_is_least (s : Set G) (H : Subgroup G) :
    generatedCircle s ≤ H ↔ s ⊆ H := by
  constructor
  · intro within x hx
    have gathered : x ∈ generatedCircle s := circle_contains_seed s hx
    exact within gathered
  · intro seeded x hx
    have everywhere : ∀ K : Subgroup G, s ⊆ K → x ∈ K := Subgroup.mem_closure.mp hx
    exact everywhere H seeded

theorem circle_closed_under_division (H : Subgroup G) {x y : G}
    (hx : x ∈ H) (hy : y ∈ H) : x * y⁻¹ ∈ H := by
  have reversed : y⁻¹ ∈ H := H.inv_mem hy
  exact H.mul_mem hx reversed

theorem circle_of_circle (H : Subgroup G) : generatedCircle (H : Set G) = H := by
  apply le_antisymm
  · have seeded : (H : Set G) ⊆ H := fun x hx => hx
    exact (circle_is_least (H : Set G) H).mpr seeded
  · intro x hx
    exact circle_contains_seed (H : Set G) hx

end Arcane.Enchantment
