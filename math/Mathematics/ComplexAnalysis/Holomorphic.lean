import Mathlib.Analysis.SpecialFunctions.ExpDeriv
import Mathlib.Analysis.Calculus.Deriv.Pow
import Mathlib.Tactic

noncomputable section

namespace Mathematics.ComplexAnalysis

/- The scalar field in HasDerivAt matters: every variable here lies in ℂ,
so this is a complex derivative, controlling approach from every direction. -/
def complexSquare (z : ℂ) : ℂ := z ^ 2

theorem complexSquare_hasDerivAt (z : ℂ) :
    HasDerivAt complexSquare (2 * z) z := by
  change HasDerivAt (fun w : ℂ => w ^ 2) (2 * z) z
  simpa using (hasDerivAt_id' z).fun_pow 2

/- A complex derivative at every point makes the function entire, hence
holomorphic on every open subset of the complex plane. -/
theorem complexSquare_differentiable : Differentiable ℂ complexSquare := by
  intro z
  exact (complexSquare_hasDerivAt z).differentiableAt

theorem complexSquare_deriv (z : ℂ) : deriv complexSquare z = 2 * z :=
  (complexSquare_hasDerivAt z).deriv

/- The derivative of the complex exponential is a library theorem. The chain
rule combines it with the polynomial derivative proved above. -/
def exponentialOfSquare (z : ℂ) : ℂ := Complex.exp (complexSquare z)

theorem exponentialOfSquare_hasDerivAt (z : ℂ) :
    HasDerivAt exponentialOfSquare (Complex.exp (z ^ 2) * (2 * z)) z := by
  exact (Complex.hasDerivAt_exp (complexSquare z)).comp z (complexSquare_hasDerivAt z)

theorem exponentialOfSquare_differentiable : Differentiable ℂ exponentialOfSquare := by
  intro z
  exact (exponentialOfSquare_hasDerivAt z).differentiableAt

/- Evaluate a derivative only after obtaining its HasDerivAt certificate.
At the imaginary unit, z squared is negative one, so the exponential is exp(-1). -/
theorem exponentialOfSquare_deriv_at_imaginary :
    deriv exponentialOfSquare Complex.I = Complex.exp (-1) * (2 * Complex.I) := by
  rw [(exponentialOfSquare_hasDerivAt Complex.I).deriv, Complex.I_sq]

end Mathematics.ComplexAnalysis
