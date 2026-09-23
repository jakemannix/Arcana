import Mathlib.GroupTheory.SpecificGroups.Dihedral

namespace Mathematics.GroupTheory

abbrev squareSymmetries := DihedralGroup 4

def squareRotation : squareSymmetries := DihedralGroup.r 1

def squareReflection : squareSymmetries := DihedralGroup.sr 0

theorem card_squareSymmetries : Fintype.card squareSymmetries = 8 :=
  calc Fintype.card squareSymmetries = 2 * 4 := DihedralGroup.card
    _ = 8 := by decide

theorem squareRotation_pow_four : squareRotation ^ 4 = 1 :=
  DihedralGroup.r_one_pow_n

theorem squareReflection_sq : squareReflection ^ 2 = 1 :=
  calc squareReflection ^ 2 = squareReflection * squareReflection := pow_two _
    _ = 1 := DihedralGroup.sr_mul_self 0

theorem orderOf_squareRotation : orderOf squareRotation = 4 :=
  DihedralGroup.orderOf_r_one

theorem orderOf_squareReflection : orderOf squareReflection = 2 :=
  DihedralGroup.orderOf_sr 0

theorem square_conjugation : squareReflection * squareRotation * squareReflection = squareRotation⁻¹ :=
  calc squareReflection * squareRotation * squareReflection =
        DihedralGroup.sr 1 * squareReflection := by decide
    _ = DihedralGroup.r 3 := by decide
    _ = squareRotation⁻¹ := by decide

theorem square_not_commute : squareRotation * squareReflection ≠ squareReflection * squareRotation := by
  intro h_commute
  have h_distinct : (DihedralGroup.sr 3 : squareSymmetries) ≠ DihedralGroup.sr 1 := by decide
  apply h_distinct
  calc DihedralGroup.sr 3 = squareRotation * squareReflection := by decide
    _ = squareReflection * squareRotation := h_commute
    _ = DihedralGroup.sr 1 := by decide

theorem square_normal_forms : ∀ x : squareSymmetries, ∃ k : Fin 4,
    x = squareRotation ^ k.val ∨ x = squareReflection * squareRotation ^ k.val := by decide

theorem square_reflection_product :
    squareReflection * (squareReflection * squareRotation) = squareRotation :=
  calc squareReflection * (squareReflection * squareRotation) =
        (squareReflection * squareReflection) * squareRotation := (mul_assoc _ _ _).symm
    _ = 1 * squareRotation := congrArg (fun x => x * squareRotation) (DihedralGroup.sr_mul_self 0)
    _ = squareRotation := one_mul _

end Mathematics.GroupTheory
