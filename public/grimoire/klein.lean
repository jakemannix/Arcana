import Mathlib.Data.ZMod.Basic
import Mathlib.Algebra.Group.TypeTags.Finite
import Mathlib.Algebra.Group.Equiv.Defs

namespace Mathematics.GroupTheory

/- Compare a four-place dial with two independent on/off toggles.
Equal cardinality alone does not determine a group’s multiplication. -/
abbrev cyclicFour := Multiplicative (ZMod 4)

abbrev kleinFour := Multiplicative (ZMod 2 × ZMod 2)

def cyclicFourStep : cyclicFour := Multiplicative.ofAdd 1

/- These two elements toggle different coordinates.
Their product toggles both, with each coordinate computed modulo two. -/
def kleinFirst : kleinFour := Multiplicative.ofAdd (1, 0)

def kleinSecond : kleinFour := Multiplicative.ofAdd (0, 1)

theorem card_cyclicFour : Fintype.card cyclicFour = 4 := by decide

theorem card_kleinFour : Fintype.card kleinFour = 4 := by decide

theorem kleinFirst_mul_second : kleinFirst * kleinSecond = Multiplicative.ofAdd (1, 1) := by
  decide

theorem klein_commutes : ∀ x y : kleinFour, x * y = y * x := by decide

/- Every toggle combination undoes itself. The cyclic generator, by contrast,
does not return after two steps; the next statements expose that difference. -/
theorem klein_sq_eq_one : ∀ x : kleinFour, x ^ 2 = 1 := by decide

theorem cyclicFourStep_sq_ne_one : cyclicFourStep ^ 2 ≠ 1 := by decide

theorem cyclicFourStep_pow_four : cyclicFourStep ^ 4 = 1 := by decide

/- An isomorphism preserves squares and the identity. If one existed here,
it would send the cyclic generator’s square and the identity to the same output.
Injectivity would force them to have been equal, contradicting the computation. -/
theorem cyclicFour_not_iso_kleinFour : ¬Nonempty (cyclicFour ≃* kleinFour) := by
  intro h_iso
  rcases h_iso with ⟨e⟩
  have h_same_image : e (cyclicFourStep ^ 2) = e 1 :=
    calc e (cyclicFourStep ^ 2) = (e cyclicFourStep) ^ 2 := map_pow e _ _
      _ = 1 := klein_sq_eq_one (e cyclicFourStep)
      _ = e 1 := e.map_one.symm
  have h_return : cyclicFourStep ^ 2 = 1 := e.injective h_same_image
  exact cyclicFourStep_sq_ne_one h_return

end Mathematics.GroupTheory
