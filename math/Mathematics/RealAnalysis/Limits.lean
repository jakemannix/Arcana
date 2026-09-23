import Mathlib.Analysis.SpecificLimits.Basic
import Mathlib.Analysis.Calculus.Deriv.Pow
import Mathlib.Tactic.NormNum

open Filter
open scoped Topology

namespace Mathematics.RealAnalysis

/- A fading sequence keeps a fixed proportion of its previous value.
The real number a is the initial amplitude; r is the retained proportion. -/
def geometricDecay (a r : ℝ) (n : ℕ) : ℝ := a * r ^ n

theorem geometricDecay_initial (a r : ℝ) : geometricDecay a r 0 = a := by
  simp [geometricDecay]

theorem geometricDecay_step (a r : ℝ) (n : ℕ) :
    geometricDecay a r (n + 1) = geometricDecay a r n * r := by
  calc geometricDecay a r (n + 1) = a * (r ^ n * r) := by rw [geometricDecay, pow_succ]
    _ = geometricDecay a r n * r := (mul_assoc a (r ^ n) r).symm

/- atTop means arbitrarily late indices; nhds 0 means arbitrarily small
neighborhoods of zero. Multiplication by a fixed amplitude preserves this limit. -/
theorem geometricDecay_tendsto (a : ℝ) {r : ℝ} (h_nonneg : 0 ≤ r) (h_lt : r < 1) :
    Tendsto (geometricDecay a r) atTop (𝓝 0) := by
  have h_power : Tendsto (fun n : ℕ => r ^ n) atTop (𝓝 0) :=
    tendsto_pow_atTop_nhds_zero_of_lt_one h_nonneg h_lt
  change Tendsto (fun n : ℕ => a * r ^ n) atTop (𝓝 0)
  simpa only [mul_zero] using h_power.const_mul a

/- This is the same limit unpacked into the epsilon-N language of analysis.
Every positive tolerance eventually contains all remaining terms. -/
theorem geometricDecay_eventually_small (a : ℝ) {r : ℝ}
    (h_nonneg : 0 ≤ r) (h_lt : r < 1) (ε : ℝ) (hε : 0 < ε) :
    ∃ N : ℕ, ∀ n ≥ N, |geometricDecay a r n| < ε := by
  have h_limit := geometricDecay_tendsto a h_nonneg h_lt
  simpa [Real.dist_eq] using (Metric.tendsto_atTop.mp h_limit) ε hε

theorem halfDecay_tendsto :
    Tendsto (geometricDecay 1 (1 / 2)) atTop (𝓝 0) := by
  apply geometricDecay_tendsto
  · norm_num
  · norm_num

/- A limit need not be reached at a finite time: positive amplitudes and
positive ratios give positive terms, even while those terms approach zero. -/
theorem geometricDecay_positive {a r : ℝ} (ha : 0 < a) (hr : 0 < r) (n : ℕ) :
    0 < geometricDecay a r n := mul_pos ha (pow_pos hr n)

/- Derivatives record local change as a linear approximation. The power rule
proves the derivative of squaring at every real point, including zero. -/
theorem hasDerivAt_square (x : ℝ) : HasDerivAt (fun y : ℝ => y ^ 2) (2 * x) x := by
  simpa using (hasDerivAt_id' x).fun_pow 2

theorem continuousAt_square (x : ℝ) : ContinuousAt (fun y : ℝ => y ^ 2) x :=
  (hasDerivAt_square x).continuousAt

end Mathematics.RealAnalysis
