import Mathlib.Data.ZMod.Basic
import Mathlib.Algebra.Group.TypeTags.Finite
import Mathlib.GroupTheory.OrderOfElement

namespace Mathematics.GroupTheory

abbrev cyclicSix := Multiplicative (ZMod 6)

def cyclicSixStep : cyclicSix := Multiplicative.ofAdd 1

theorem card_cyclicSix : Fintype.card cyclicSix = 6 := by decide

theorem cyclicSixStep_pow_six : cyclicSixStep ^ 6 = 1 := by decide

theorem cyclicSix_generated : ∀ x : cyclicSix, ∃ k : Fin 6, x = cyclicSixStep ^ k.val := by
  decide

theorem orderOf_cyclicSixStep : orderOf cyclicSixStep = 6 := by
  apply (orderOf_eq_iff (by decide : 0 < 6)).mpr
  constructor
  · exact cyclicSixStep_pow_six
  · intro n h_bound h_positive
    have h_no_early_return : ∀ k : Fin 6, 0 < k.val → cyclicSixStep ^ k.val ≠ 1 := by decide
    exact h_no_early_return ⟨n, h_bound⟩ h_positive

theorem orderOf_cyclicSixStep_sq : orderOf (cyclicSixStep ^ 2) = 3 :=
  calc orderOf (cyclicSixStep ^ 2) = orderOf cyclicSixStep / Nat.gcd (orderOf cyclicSixStep) 2 :=
        orderOf_pow cyclicSixStep
    _ = 6 / Nat.gcd 6 2 := congrArg (fun n => n / Nat.gcd n 2) orderOf_cyclicSixStep
    _ = 3 := by decide

theorem orderOf_cyclicSixStep_cube : orderOf (cyclicSixStep ^ 3) = 2 :=
  calc orderOf (cyclicSixStep ^ 3) = orderOf cyclicSixStep / Nat.gcd (orderOf cyclicSixStep) 3 :=
        orderOf_pow cyclicSixStep
    _ = 6 / Nat.gcd 6 3 := congrArg (fun n => n / Nat.gcd n 3) orderOf_cyclicSixStep
    _ = 2 := by decide

theorem cyclicSix_wraparound : cyclicSixStep ^ 4 * cyclicSixStep ^ 5 = cyclicSixStep ^ 3 :=
  calc cyclicSixStep ^ 4 * cyclicSixStep ^ 5 = cyclicSixStep ^ (4 + 5) := (pow_add _ _ _).symm
    _ = cyclicSixStep ^ 3 := by decide

theorem cyclicSix_inverse : cyclicSixStep⁻¹ = cyclicSixStep ^ 5 := by decide

end Mathematics.GroupTheory
