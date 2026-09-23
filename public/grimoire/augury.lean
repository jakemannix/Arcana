import Mathlib.Probability.ProbabilityMassFunction.Integrals
import Mathlib.Tactic

namespace Mathematics.Probability

open scoped BigOperators ENNReal
open MeasureTheory

/- A probability mass function stores nonnegative weights whose total is one.
The six indices are 0 through 5; the displayed die faces are one greater. -/
noncomputable def fairDie : PMF (Fin 6) :=
  PMF.ofFintype (fun _ => 1 / 6) (by
    norm_num
    exact ENNReal.mul_inv_cancel (by norm_num) (by finiteness))

theorem fairDie_mass (i : Fin 6) : fairDie i = 1 / 6 := rfl

theorem fairDie_total : ∑ i, fairDie i = 1 := by
  simpa only [tsum_fintype] using fairDie.tsum_coe

/- The outcome indices 1, 3, 5 correspond to faces 2, 4, 6.
An event is a set of outcomes, and its probability adds their masses. -/
theorem fairDie_even_faces :
    fairDie.toMeasure ({1, 3, 5} : Finset (Fin 6)) = 1 / 2 := by
  rw [PMF.toMeasure_apply_finset]
  change (1 / 6 : ℝ≥0∞) + (1 / 6 + (1 / 6 + 0)) = 1 / 2
  apply (ENNReal.toReal_eq_toReal_iff' (by finiteness) (by finiteness)).mp
  norm_num [ENNReal.toReal_add]

/- A random variable assigns a real payoff to every outcome.
Expectation weights those payoffs by their probabilities; it need not be an outcome. -/
def dieFace (i : Fin 6) : ℝ := i.val + 1

theorem fairDie_expected_face : ∫ i, dieFace i ∂fairDie.toMeasure = 7 / 2 := by
  rw [PMF.integral_eq_sum]
  norm_num [fairDie_mass, dieFace, Fin.sum_univ_succ]

/- Resampling from the same distribution inside bind makes the two draws independent.
Keeping both indices, rather than just their sum, records the full joint outcome. -/
noncomputable def independentDice : PMF (Fin 6 × Fin 6) :=
  fairDie.bind (fun i => fairDie.map (fun j => (i, j)))

theorem independentDice_mass (i j : Fin 6) : independentDice (i, j) = 1 / 36 := by
  simp [independentDice, PMF.bind_apply, PMF.map_apply, tsum_fintype, fairDie_mass, ite_and]
  apply (ENNReal.toReal_eq_toReal_iff' (by finiteness) (by finiteness)).mp
  norm_num

/- Singleton events expose the same mass as the probability mass function.
Multiplication of 1/6 by 1/6 is justified by our independent joint construction. -/
theorem independentDice_double_six :
    independentDice.toMeasure ({(5, 5)} : Set (Fin 6 × Fin 6)) = 1 / 36 := by
  rw [PMF.toMeasure_apply_singleton _ _ (measurableSet_singleton _)]
  exact independentDice_mass 5 5

end Mathematics.Probability
