import Mathlib.Algebra.Order.BigOperators.Expect
import Mathlib.Tactic

namespace Mathematics.Statistics

open scoped BigOperators

variable {ι : Type*} [Fintype ι] [Nonempty ι]

/- An index denotes an observation, so equal observed values are still counted twice.
The nonempty hypothesis rules out the empty dataset convention of Finset.expect. -/
noncomputable def sampleMean (x : ι → ℝ) : ℝ := Finset.univ.expect x

/- This descriptive variance divides by the number of observations, not by n - 1.
It is the variance of the empirical distribution that weights every index equally. -/
noncomputable def empiricalVariance (x : ι → ℝ) : ℝ :=
  sampleMean (fun i => (x i - sampleMean x) ^ 2)

theorem sampleMean_shift (x : ι → ℝ) (c : ℝ) :
    sampleMean (fun i => x i + c) = sampleMean x + c := by
  simp [sampleMean, Finset.expect_add_distrib]

theorem sampleMean_centered (x : ι → ℝ) :
    sampleMean (fun i => x i - sampleMean x) = 0 := by
  simp [sampleMean, Finset.expect_sub_distrib]

omit [Nonempty ι] in
theorem empiricalVariance_nonneg (x : ι → ℝ) : 0 ≤ empiricalVariance x := by
  exact Finset.expect_nonneg (fun i _ => sq_nonneg (x i - sampleMean x))

/- Expanding the square turns spread into mean-square minus square-mean.
Linearity of a finite average lets each algebraic term move outside the sum. -/
theorem empiricalVariance_eq_second_moment (x : ι → ℝ) :
    empiricalVariance x = sampleMean (fun i => x i ^ 2) - sampleMean x ^ 2 := by
  unfold empiricalVariance sampleMean
  simp_rw [sub_sq, Finset.expect_add_distrib, Finset.expect_sub_distrib,
    ← Finset.expect_mul, ← Finset.mul_expect]
  simp
  ring

/- A common shift changes location, but every centered observation stays the same. -/
theorem empiricalVariance_shift (x : ι → ℝ) (c : ℝ) :
    empiricalVariance (fun i => x i + c) = empiricalVariance x := by
  unfold empiricalVariance
  rw [sampleMean_shift]
  congr 1
  funext i
  congr 1
  ring

/- The average squared distance to any proposed center splits into spread
and a nonnegative penalty for moving away from the sample mean. -/
theorem mean_squared_distance (x : ι → ℝ) (c : ℝ) :
    sampleMean (fun i => (x i - c) ^ 2) =
      empiricalVariance x + (sampleMean x - c) ^ 2 := by
  rw [empiricalVariance_eq_second_moment]
  unfold sampleMean
  simp_rw [sub_sq, Finset.expect_add_distrib, Finset.expect_sub_distrib,
    ← Finset.expect_mul, ← Finset.mul_expect]
  simp
  ring

theorem sampleMean_minimizes_squared_distance (x : ι → ℝ) (c : ℝ) :
    empiricalVariance x ≤ sampleMean (fun i => (x i - c) ^ 2) := by
  rw [mean_squared_distance]
  exact le_add_of_nonneg_right (sq_nonneg _)

/- The four observations have mean 3 and squared deviations 4, 1, 0, 9.
The calculation is exact over the reals, not rounded floating-point arithmetic. -/
def observations : Fin 4 → ℝ := ![1, 2, 3, 6]

theorem observations_mean : sampleMean observations = 3 := by
  norm_num [sampleMean, Finset.expect_eq_sum_div_card, observations, Fin.sum_univ_succ]

theorem observations_variance : empiricalVariance observations = 7 / 2 := by
  rw [empiricalVariance, observations_mean]
  norm_num [sampleMean, Finset.expect_eq_sum_div_card, observations, Fin.sum_univ_succ]

/- Dividing the same sum of squared deviations by n - 1 gives the usual
corrected sample variance. Calling it unbiased needs an i.i.d. sampling model
and finite second moments; this calculation does not assume or prove that model. -/
theorem observations_corrected_variance :
    (∑ i, (observations i - sampleMean observations) ^ 2) / (4 - 1) = (14 / 3 : ℝ) := by
  rw [observations_mean]
  norm_num [observations, Fin.sum_univ_succ]

end Mathematics.Statistics
