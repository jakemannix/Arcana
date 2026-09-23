import Mathlib.GroupTheory.Perm.Fin
import Mathlib.GroupTheory.OrderOfElement

namespace Mathematics.GroupTheory

/- Think of the three labels as vertices of an equilateral triangle.
Every vertex permutation is a geometric symmetry of that triangle;
the formal model here computes the permutations, not plane geometry. -/
abbrev symmetricGroupThree := Equiv.Perm (Fin 3)

/- Each swap is a mirror fixing the remaining vertex.
Products of permutations apply the rightmost swap first. -/
def transposition01 : symmetricGroupThree := Equiv.swap 0 1

def transposition12 : symmetricGroupThree := Equiv.swap 1 2

theorem card_symmetricGroupThree : Fintype.card symmetricGroupThree = 6 := by decide

theorem transposition01_mul_self : transposition01 * transposition01 = 1 :=
  Equiv.swap_mul_self 0 1

/- To disprove equality of two permutations, one input with different outputs
is enough. Follow the first labeled vertex through both compositions. -/
theorem transpositions_not_commute : transposition01 * transposition12 ≠ transposition12 * transposition01 := by
  intro h_eq
  have h_eval_left : (transposition01 * transposition12) 0 = 1 := by decide
  have h_eval_right : (transposition12 * transposition01) 0 = 2 := by decide
  have h_one_eq_two : (1 : Fin 3) = 2 :=
    calc (1 : Fin 3) = (transposition01 * transposition12) 0 := h_eval_left.symm
      _ = (transposition12 * transposition01) 0 := congrArg (fun σ => σ 0) h_eq
      _ = 2 := h_eval_right
  exact absurd h_one_eq_two (by decide)

/- These two mirrors compose to a rotation. The next statements trace
its vertex cycle and prove its exact period. -/
def triangleRotation : symmetricGroupThree := transposition01 * transposition12

theorem triangleRotation_vertices :
    triangleRotation 0 = 1 ∧ triangleRotation 1 = 2 ∧ triangleRotation 2 = 0 := by decide

theorem triangleRotation_pow_three : triangleRotation ^ 3 = 1 := by decide

theorem orderOf_triangleRotation : orderOf triangleRotation = 3 :=
  orderOf_eq_prime triangleRotation_pow_three (by decide)

/- Every symmetry is a rotation or a reflected rotation.
The finite exponent range and decide check all possibilities in this model. -/
theorem triangle_symmetries : ∀ σ : symmetricGroupThree, ∃ k : Fin 3,
    σ = triangleRotation ^ k.val ∨ σ = transposition01 * triangleRotation ^ k.val := by decide

end Mathematics.GroupTheory
