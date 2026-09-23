import Mathlib.Data.ZMod.Basic
import Mathlib.Algebra.Group.TypeTags.Finite
import Mathlib.GroupTheory.OrderOfElement

namespace Mathematics.GroupTheory

/- This type tag writes modular addition as multiplication.
The group identity is residue zero, and powers mean repeated addition. -/
abbrev cyclicSix := Multiplicative (ZMod 6)

def cyclicSixStep : cyclicSix := Multiplicative.ofAdd 1

theorem card_cyclicSix : Fintype.card cyclicSix = 6 := by decide

theorem cyclicSixStep_pow_six : cyclicSixStep ^ 6 = 1 := by decide

/- A single forward step visits every position of the six-place dial.
The bounded exponent is a witness for how many steps reach each element. -/
theorem cyclicSix_generated : ∀ x : cyclicSix, ∃ k : Fin 6, x = cyclicSixStep ^ k.val := by
  decide

/- Returning after a full turn is only half the order proof.
We must also rule out every smaller positive return time. -/
theorem orderOf_cyclicSixStep : orderOf cyclicSixStep = 6 := by
  apply (orderOf_eq_iff (by decide : 0 < 6)).mpr
  constructor
  · exact cyclicSixStep_pow_six
  · intro n h_bound h_positive
    have h_no_early_return : ∀ k : Fin 6, 0 < k.val → cyclicSixStep ^ k.val ≠ 1 := by decide
    exact h_no_early_return ⟨n, h_bound⟩ h_positive

/- Use the general power-order formula, substitute the known generator order,
then compute the greatest common divisor. The next example follows the same pattern. -/
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

/- First add the exponents using a general power law.
Only the final reduction uses the finite dial’s wraparound. -/
theorem cyclicSix_wraparound : cyclicSixStep ^ 4 * cyclicSixStep ^ 5 = cyclicSixStep ^ 3 :=
  calc cyclicSixStep ^ 4 * cyclicSixStep ^ 5 = cyclicSixStep ^ (4 + 5) := (pow_add _ _ _).symm
    _ = cyclicSixStep ^ 3 := by decide

theorem cyclicSix_inverse : cyclicSixStep⁻¹ = cyclicSixStep ^ 5 := by decide

end Mathematics.GroupTheory
