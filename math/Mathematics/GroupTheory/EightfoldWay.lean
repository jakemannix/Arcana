import Mathematics.GroupTheory.HamiltonQuaternions
import P3Group.Classification

namespace Mathematics.GroupTheory

abbrev cyclicEight := Multiplicative (ZMod 8)

abbrev fourTimesTwo := Multiplicative (ZMod 4) × Multiplicative (ZMod 2)

abbrev threeToggles := Multiplicative (ZMod 2) × Multiplicative (ZMod 2) × Multiplicative (ZMod 2)

def cyclicEightStep : cyclicEight := Multiplicative.ofAdd 1

theorem cyclicEight_generated : ∀ x : cyclicEight,
    ∃ k : Fin 8, x = cyclicEightStep ^ k.val := by decide

theorem cyclicEightStep_no_early_return : ∀ k : Fin 8,
    0 < k.val → cyclicEightStep ^ k.val ≠ 1 := by decide

theorem fourTimesTwo_fourth_powers : ∀ x : fourTimesTwo, x ^ 4 = 1 := by decide

theorem threeToggles_sq_eq_one : ∀ x : threeToggles, x ^ 2 = 1 := by decide

theorem eightfold_cardinalities :
    Fintype.card cyclicEight = 8 ∧ Fintype.card fourTimesTwo = 8 ∧
    Fintype.card threeToggles = 8 ∧ Fintype.card squareSymmetries = 8 ∧
    Fintype.card quaternionEight = 8 := by
  exact ⟨by decide, by decide, by decide, card_squareSymmetries, card_quaternionEight⟩

noncomputable def involutionCount (G : Type*) [Group G] : ℕ :=
  Nat.card {x : G // x ^ 2 = 1 ∧ x ≠ 1}

theorem involutionCount_eq_of_iso {G H : Type*} [Group G] [Group H]
    (e : G ≃* H) : involutionCount G = involutionCount H := by
  apply Nat.card_congr
  apply Equiv.subtypeEquiv e.toEquiv
  intro x
  constructor
  · intro ⟨h_square, h_nonidentity⟩
    constructor
    · calc e x ^ 2 = e (x ^ 2) := (map_pow e x 2).symm
        _ = e 1 := congrArg e h_square
        _ = 1 := e.map_one
    · intro h_image
      apply h_nonidentity
      apply e.injective
      exact h_image.trans e.map_one.symm
  · intro ⟨h_square, h_nonidentity⟩
    constructor
    · apply e.injective
      calc e (x ^ 2) = e x ^ 2 := map_pow e x 2
        _ = 1 := h_square
        _ = e 1 := e.map_one.symm
    · intro h_identity
      apply h_nonidentity
      exact (congrArg e h_identity).trans e.map_one

theorem eightfold_involution_counts :
    involutionCount cyclicEight = 1 ∧ involutionCount fourTimesTwo = 3 ∧
    involutionCount threeToggles = 7 ∧ involutionCount squareSymmetries = 5 ∧
    involutionCount quaternionEight = 1 := by
  unfold involutionCount
  simp only [Nat.card_eq_fintype_card]
  exact ⟨by decide, by decide, by decide, card_square_involutions, card_quaternion_involutions⟩

theorem not_iso_of_involutionCount_ne {G H : Type*} [Group G] [Group H]
    (h_counts : involutionCount G ≠ involutionCount H) : ¬ Nonempty (G ≃* H) := by
  rintro ⟨e⟩
  exact h_counts (involutionCount_eq_of_iso e)

theorem cyclicEight_not_iso_quaternionEight : ¬ Nonempty (cyclicEight ≃* quaternionEight) := by
  rintro ⟨e⟩
  apply quaternion_not_commute
  calc quaternionI * quaternionJ = e (e.symm quaternionI * e.symm quaternionJ) := by simp
    _ = e (e.symm quaternionJ * e.symm quaternionI) := congrArg e (mul_comm _ _)
    _ = quaternionJ * quaternionI := by simp

theorem eightfold_pairwise_nonisomorphic :
    ¬ Nonempty (cyclicEight ≃* fourTimesTwo) ∧
    ¬ Nonempty (cyclicEight ≃* threeToggles) ∧
    ¬ Nonempty (cyclicEight ≃* squareSymmetries) ∧
    ¬ Nonempty (cyclicEight ≃* quaternionEight) ∧
    ¬ Nonempty (fourTimesTwo ≃* threeToggles) ∧
    ¬ Nonempty (fourTimesTwo ≃* squareSymmetries) ∧
    ¬ Nonempty (fourTimesTwo ≃* quaternionEight) ∧
    ¬ Nonempty (threeToggles ≃* squareSymmetries) ∧
    ¬ Nonempty (threeToggles ≃* quaternionEight) ∧
    ¬ Nonempty (squareSymmetries ≃* quaternionEight) := by
  obtain ⟨h_cyclic, h_product, h_toggles, h_square, h_quaternion⟩ := eightfold_involution_counts
  refine ⟨?_, ?_, ?_, cyclicEight_not_iso_quaternionEight, ?_, ?_, ?_, ?_, ?_, ?_⟩
  all_goals
    apply not_iso_of_involutionCount_ne
    simp only [h_cyclic, h_product, h_toggles, h_square, h_quaternion]
    decide

theorem order_eight_classification (G : Type*) [Group G] (h_card : Nat.card G = 8) :
    Nonempty (G ≃* cyclicEight) ∨ Nonempty (G ≃* fourTimesTwo) ∨
    Nonempty (G ≃* threeToggles) ∨ Nonempty (G ≃* squareSymmetries) ∨
    Nonempty (G ≃* quaternionEight) := by
  have : Fact (Nat.Prime 2) := ⟨by decide⟩
  have : Finite G := Nat.finite_of_card_ne_zero (by rw [h_card]; decide)
  let : Fintype G := Fintype.ofFinite G
  have h_cube : Nat.card G = 2 ^ 3 := h_card.trans (by decide)
  rcases P3Group.classification 2 G h_cube with
    h_cyclic | h_product | h_toggles | h_odd | h_odd | h_square | h_quaternion
  · exact Or.inl h_cyclic
  · exact Or.inr (Or.inl h_product)
  · exact Or.inr (Or.inr (Or.inl h_toggles))
  · exact (h_odd.1 rfl).elim
  · exact (h_odd.1 rfl).elim
  · exact Or.inr (Or.inr (Or.inr (Or.inl h_square.2)))
  · exact Or.inr (Or.inr (Or.inr (Or.inr h_quaternion.2)))

end Mathematics.GroupTheory
