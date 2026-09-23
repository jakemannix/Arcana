import Mathlib.Algebra.Group.Subgroup.Basic

namespace Mathematics.GroupTheory

variable {G : Type*} [Group G]

/- Start with arbitrary seeds. Their generated subgroup adds everything required
by the identity, multiplication, and inverse laws, and nothing beyond that. -/
def generatedSubgroup (s : Set G) : Subgroup G := Subgroup.closure s

/- A seed belongs to every subgroup containing all the seeds.
The universal membership test turns that observation into membership in the closure. -/
theorem subset_generatedSubgroup (s : Set G) : s ⊆ generatedSubgroup s := by
  intro x hx
  show x ∈ Subgroup.closure s
  rw [Subgroup.mem_closure]
  intro K hK
  exact hK hx

/- This is the useful universal property: containing every generated element
is equivalent to containing the original seeds. Prove each implication separately. -/
theorem generatedSubgroup_le_iff (s : Set G) (H : Subgroup G) :
    generatedSubgroup s ≤ H ↔ s ⊆ H := by
  constructor
  · intro h_le x hx
    have h_mem_closure : x ∈ generatedSubgroup s := subset_generatedSubgroup s hx
    exact h_le h_mem_closure
  · intro h_subset x hx
    have h_universal : ∀ K : Subgroup G, s ⊆ K → x ∈ K := Subgroup.mem_closure.mp hx
    exact h_universal H h_subset

/- Subgroup membership survives taking an inverse and then multiplying.
No commutativity assumption is involved. -/
theorem mul_inv_mem_subgroup (H : Subgroup G) {x y : G}
    (hx : x ∈ H) (hy : y ∈ H) : x * y⁻¹ ∈ H := by
  have h_inv_mem : y⁻¹ ∈ H := H.inv_mem hy
  exact H.mul_mem hx h_inv_mem

/- Generating from an existing subgroup adds no new elements.
Antisymmetry reduces equality to containment in both directions. -/
theorem generatedSubgroup_eq_self (H : Subgroup G) : generatedSubgroup (H : Set G) = H := by
  apply le_antisymm
  · have h_subset : (H : Set G) ⊆ H := fun x hx => hx
    exact (generatedSubgroup_le_iff (H : Set G) H).mpr h_subset
  · intro x hx
    exact subset_generatedSubgroup (H : Set G) hx

end Mathematics.GroupTheory
