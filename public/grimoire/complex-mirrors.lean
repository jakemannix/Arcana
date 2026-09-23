import Mathlib.Analysis.Complex.Norm
import Mathlib.Tactic

namespace Mathematics.ComplexAnalysis

open Complex ComplexConjugate

/- The imaginary unit is an ordinary field element with one unusual square.
Multiplication by it rotates the real and imaginary coordinates a quarter turn. -/
theorem imaginaryUnit_sq : I ^ 2 = (-1 : ℂ) := Complex.I_sq

theorem quarterTurn_coordinates (z : ℂ) :
    (I * z).re = -z.im ∧ (I * z).im = z.re := by
  constructor <;> simp

theorem four_quarterTurns (z : ℂ) : I * (I * (I * (I * z))) = z := by
  calc I * (I * (I * (I * z))) = (I * I) * (I * I) * z := by ring
    _ = z := by rw [Complex.I_mul_I]; ring

/- Conjugation fixes the real coordinate and negates the imaginary one.
It is an involution, so looking into this mirror twice restores the input. -/
theorem conjugate_twice (z : ℂ) : conj (conj z) = z := by simp

/- The squared modulus is real and nonnegative. Multiplying a complex number
by its conjugate gives that squared modulus, embedded back into the complex field. -/
theorem conjugate_product (z : ℂ) : z * conj z = (normSq z : ℂ) :=
  Complex.mul_conj z

theorem modulus_squared_coordinates (z : ℂ) : ‖z‖ ^ 2 = z.re ^ 2 + z.im ^ 2 := by
  rw [Complex.sq_norm, Complex.normSq_apply]
  ring

/- This exact computation uses field algebra, not a floating-point approximation. -/
theorem one_plus_imaginary_sq : (1 + I) ^ 2 = (2 : ℂ) * I := by
  calc (1 + I) ^ 2 = 1 + 2 * I + I ^ 2 := by ring
    _ = 2 * I := by rw [Complex.I_sq]; ring

theorem modulus_three_four : ‖(3 : ℂ) + 4 * I‖ = 5 := by
  have h_square : ‖(3 : ℂ) + 4 * I‖ ^ 2 = 25 := by
    rw [modulus_squared_coordinates]
    norm_num
  have h_nonnegative := norm_nonneg ((3 : ℂ) + 4 * I)
  nlinarith

end Mathematics.ComplexAnalysis
