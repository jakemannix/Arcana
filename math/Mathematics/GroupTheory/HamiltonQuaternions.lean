import Mathematics.GroupTheory.DihedralComputations
import Mathlib.GroupTheory.SpecificGroups.Quaternion

namespace Mathematics.GroupTheory

/- This finite group models the eight signed quaternion units, not the whole
infinite quaternion algebra. The model parameter gives four times as many elements. -/
abbrev quaternionEight := QuaternionGroup 2

def quaternionI : quaternionEight := QuaternionGroup.a 1

def quaternionJ : quaternionEight := QuaternionGroup.xa 0

def quaternionK : quaternionEight := quaternionI * quaternionJ

/- The quaternion sign is represented by a central group element.
Multiplying by this element plays the role of negation. -/
def quaternionMinusOne : quaternionEight := QuaternionGroup.a 2

theorem card_quaternionEight : Fintype.card quaternionEight = 8 :=
  calc Fintype.card quaternionEight = 4 * 2 := QuaternionGroup.card
    _ = 8 := by decide

/- The three imaginary units all square to the same minus-one element.
These are direct finite computations checked by Lean’s kernel. -/
theorem quaternion_i_sq : quaternionI ^ 2 = quaternionMinusOne := by decide

theorem quaternion_j_sq : quaternionJ ^ 2 = quaternionMinusOne := by decide

theorem quaternion_k_sq : quaternionK ^ 2 = quaternionMinusOne := by decide

theorem quaternion_ij : quaternionI * quaternionJ = quaternionK := rfl

theorem quaternion_ji : quaternionJ * quaternionI = quaternionMinusOne * quaternionK := by decide

/- Since the first two units multiply to the third, their triple product
is the third unit’s square. Reuse the earlier computation to identify it. -/
theorem quaternion_ijk : quaternionI * quaternionJ * quaternionK = quaternionMinusOne :=
  calc quaternionI * quaternionJ * quaternionK = quaternionK * quaternionK := rfl
    _ = quaternionK ^ 2 := (pow_two _).symm
    _ = quaternionMinusOne := quaternion_k_sq

/- Reversing the first two units changes the sign of their product.
The explicit distinction between these two outputs proves noncommutativity. -/
theorem quaternion_not_commute : quaternionI * quaternionJ ≠ quaternionJ * quaternionI := by
  intro h_commute
  have h_distinct : quaternionK ≠ quaternionMinusOne * quaternionK := by decide
  apply h_distinct
  calc quaternionK = quaternionI * quaternionJ := quaternion_ij.symm
    _ = quaternionJ * quaternionI := h_commute
    _ = quaternionMinusOne * quaternionK := quaternion_ji

theorem quaternion_minus_one_central : ∀ q : quaternionEight,
    quaternionMinusOne * q = q * quaternionMinusOne := by decide

theorem quaternion_fourth_powers : ∀ q : quaternionEight, q ^ 4 = 1 := by decide

/- An involution is a nonidentity element whose square is the identity.
Only minus-one qualifies here. The square’s symmetry group has five,
which will become a way to distinguish the groups up to isomorphism. -/
theorem quaternion_unique_involution : ∀ q : quaternionEight,
    (q ^ 2 = 1 ∧ q ≠ 1) ↔ q = quaternionMinusOne := by decide

theorem card_quaternion_involutions :
    Fintype.card {q : quaternionEight // q ^ 2 = 1 ∧ q ≠ 1} = 1 := by decide

theorem card_square_involutions :
    Fintype.card {x : squareSymmetries // x ^ 2 = 1 ∧ x ≠ 1} = 5 := by decide

end Mathematics.GroupTheory
