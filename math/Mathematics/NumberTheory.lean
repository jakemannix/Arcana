import Mathlib.FieldTheory.Finite.Basic
import Mathlib.Tactic

namespace Mathematics.NumberTheory

/- Congruence records equal remainders after division by a modulus.
Reducing first keeps calculations small while addition and multiplication survive. -/
theorem congruence_preserves_square_add_one {n a b : ℕ} (h : a ≡ b [MOD n]) :
    a ^ 2 + 1 ≡ b ^ 2 + 1 [MOD n] :=
  (h.pow 2).add_right 1

theorem remainder_of_seventeen_squared : (17 ^ 2 + 1) % 5 = 0 := by
  have h_reduced : 17 ≡ 2 [MOD 5] := by decide
  have h_polynomial := congruence_preserves_square_add_one h_reduced
  have h_zero : 17 ^ 2 + 1 ≡ 0 [MOD 5] := h_polynomial.trans (by decide)
  exact h_zero

/- A prime dividing a product must divide a factor. Applying that fact to a square
exposes why primality is stronger than just being a positive modulus. -/
theorem prime_divides_square {p a : ℕ} (hp : p.Prime) (h : p ∣ a ^ 2) : p ∣ a := by
  rw [pow_two] at h
  rcases hp.dvd_mul.mp h with h_left | h_right
  · exact h_left
  · exact h_right

theorem composite_modulus_breaks_prime_rule :
    4 ∣ 2 * 2 ∧ ¬4 ∣ 2 := by decide

/- Fermat's little theorem connects arithmetic to the finite group of nonzero
residues modulo a prime. Mathlib proves this general theorem; we apply it below. -/
theorem fermat_little_theorem {p a : ℕ} (hp : p.Prime) (h_coprime : a.Coprime p) :
    a ^ (p - 1) ≡ 1 [MOD p] :=
  Nat.ModEq.pow_card_sub_one_eq_one hp h_coprime

/- Since 100 = 6 * 16 + 4, Fermat reduces the exponent before the remainder is read.
The proof never has to expand the huge integer 2^100. -/
theorem two_pow_hundred_mod_seven : 2 ^ 100 % 7 = 2 := by
  have h_fermat : 2 ^ 6 ≡ 1 [MOD 7] :=
    fermat_little_theorem (by decide) (by decide)
  have h_blocks : (2 ^ 6) ^ 16 ≡ 1 [MOD 7] := by
    simpa using h_fermat.pow 16
  have h_reduced : 2 ^ 100 ≡ 2 ^ 4 [MOD 7] := by
    calc
      2 ^ 100 = (2 ^ 6) ^ 16 * 2 ^ 4 := by rw [← pow_mul, ← pow_add]
      _ ≡ 1 * 2 ^ 4 [MOD 7] := h_blocks.mul_right _
      _ = 2 ^ 4 := one_mul _
  have h_two : 2 ^ 100 ≡ 2 [MOD 7] := h_reduced.trans (by decide)
  exact h_two

/- Modular arithmetic also has a carrier: ZMod p is a field when p is prime.
Inside that field the same return law is an ordinary equality. -/
theorem nonzero_residue_returns {p : ℕ} [Fact p.Prime] (a : ZMod p) (ha : a ≠ 0) :
    a ^ (p - 1) = 1 :=
  ZMod.pow_card_sub_one_eq_one ha

theorem inverse_of_three_mod_seven : (3 : ZMod 7)⁻¹ = 5 := by
  let : Fact (Nat.Prime 7) := ⟨by decide⟩
  apply inv_eq_of_mul_eq_one_left
  decide

/- Removing Fermat's coprimality hypothesis is false: a multiple of the prime
has zero residue, and positive powers keep that zero. -/
theorem fermat_needs_coprimality : ¬(7 ^ 6 ≡ 1 [MOD 7]) := by decide

end Mathematics.NumberTheory
