import Mathlib.RingTheory.Nullstellensatz
import Mathlib.Data.Complex.Basic
import Mathlib.Tactic

noncomputable section

namespace Mathematics.AlgebraicGeometry

/- A point of affine complex space assigns a complex number to each coordinate.
An ideal collects equations and all their polynomial consequences. -/
def affineZeroLocus {α : Type*} (J : Ideal (MvPolynomial α ℂ)) : Set (α → ℂ) :=
  MvPolynomial.zeroLocus ℂ J

def equationsVanishingOn {α : Type*} (V : Set (α → ℂ)) : Ideal (MvPolynomial α ℂ) :=
  MvPolynomial.vanishingIdeal ℂ V

/- More equations can only remove solutions. Read the inclusion backwards:
J is contained in K, while the solution set of K is contained in that of J. -/
theorem affineZeroLocus_antitone {α : Type*} {J K : Ideal (MvPolynomial α ℂ)}
    (h_equations : J ≤ K) : affineZeroLocus K ⊆ affineZeroLocus J := by
  intro x hx p hp
  exact hx p (h_equations hp)

/- The same statement can be read from either side: each point solves every
equation, or each equation vanishes at every point. This is a Galois connection. -/
theorem solutions_equations_correspondence {α : Type*} (J : Ideal (MvPolynomial α ℂ))
    (V : Set (α → ℂ)) : V ⊆ affineZeroLocus J ↔ J ≤ equationsVanishingOn V := by
  constructor
  · intro h_solutions p hp x hx
    exact h_solutions hx p hp
  · intro h_vanishing x hx p hp
    exact h_vanishing hp x hx

/- Evaluation at a point preserves addition and multiplication. Its kernel
is exactly the ideal of equations vanishing at that point. -/
theorem equations_at_point_eq_kernel {α : Type*} (x : α → ℂ) :
    equationsVanishingOn {x} = RingHom.ker (MvPolynomial.aeval x).toRingHom := by
  ext p
  simp [equationsVanishingOn, RingHom.mem_ker]

/- In two coordinates, the equation xy = 0 describes the union of the axes.
Fin 2 names the coordinates; each coordinate itself can be any complex number. -/
def coordinateCross : MvPolynomial (Fin 2) ℂ :=
  MvPolynomial.X 0 * MvPolynomial.X 1

def coordinateCrossIdeal : Ideal (MvPolynomial (Fin 2) ℂ) :=
  Ideal.span {coordinateCross}

theorem mem_coordinateCross_zeroLocus (x : Fin 2 → ℂ) :
    x ∈ affineZeroLocus coordinateCrossIdeal ↔ x 0 = 0 ∨ x 1 = 0 := by
  rw [affineZeroLocus, coordinateCrossIdeal, MvPolynomial.zeroLocus_span]
  simp [coordinateCross, mul_eq_zero]

/- The point (i, 0) lies on the horizontal complex axis. The point (i, 1)
lies on neither axis. These are exact complex-coordinate computations. -/
theorem imaginary_point_on_cross :
    (![Complex.I, 0] : Fin 2 → ℂ) ∈ affineZeroLocus coordinateCrossIdeal := by
  rw [mem_coordinateCross_zeroLocus]
  exact Or.inr rfl

theorem imaginary_point_off_cross :
    (![Complex.I, 1] : Fin 2 → ℂ) ∉ affineZeroLocus coordinateCrossIdeal := by
  rw [mem_coordinateCross_zeroLocus]
  simp

/- Squaring an equation changes its multiplicity, but not its zero set over
the complex field. A bare set of solutions forgets this extra algebraic data. -/
theorem coordinateCross_square_same_zeroLocus :
    affineZeroLocus (Ideal.span {coordinateCross ^ 2}) =
      affineZeroLocus coordinateCrossIdeal := by
  ext x
  rw [affineZeroLocus, MvPolynomial.zeroLocus_span, mem_coordinateCross_zeroLocus]
  simp [coordinateCross, mul_eq_zero]

end Mathematics.AlgebraicGeometry
