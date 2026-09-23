import Arcane.Enchantment.Lagrange
import Mathlib.GroupTheory.Index
import Mathlib.GroupTheory.Subgroup.Simple
import Mathlib.Algebra.Group.Subgroup.Finite

namespace Arcane.Enchantment

variable {G : Type*} [Group G]

def unbreakableCoven (G : Type*) [Group G] : Prop :=
  Nontrivial G ∧ ∀ N : Subgroup G, N.Normal → N = ⊥ ∨ N = ⊤

theorem unbreakable_iff_simple : unbreakableCoven G ↔ IsSimpleGroup G := by
  constructor
  · intro unbroken
    obtain ⟨plural, sealed⟩ := unbroken
    exact { toNontrivial := plural, eq_bot_or_eq_top_of_normal := sealed }
  · intro simple
    exact ⟨simple.toNontrivial, simple.eq_bot_or_eq_top_of_normal⟩

theorem no_hidden_circles {p : ℕ} (hp : p.Prime) (hG : Nat.card G = p)
    (H : Subgroup G) : H = ⊥ ∨ H = ⊤ := by
  have counted : Nat.card G ≠ 0 :=
    calc Nat.card G = p := hG
      _ ≠ 0 := hp.ne_zero
  have bounded : Finite G := Nat.finite_of_card_ne_zero counted
  have measured : Nat.card H ∣ p :=
    calc Nat.card H ∣ Nat.card G := circle_divides_coven H
      _ = p := hG
  rcases hp.eq_one_or_self_of_dvd (Nat.card H) measured with lonely | whole
  · left
    exact Subgroup.card_eq_one.mp lonely
  · right
    have filled : Nat.card H = Nat.card G :=
      calc Nat.card H = p := whole
        _ = Nat.card G := hG.symm
    exact (Subgroup.card_eq_iff_eq_top H).mp filled

theorem prime_coven_is_unbreakable {p : ℕ} (hp : p.Prime) (hG : Nat.card G = p) :
    unbreakableCoven G := by
  have counted : Nat.card G ≠ 0 :=
    calc Nat.card G = p := hG
      _ ≠ 0 := hp.ne_zero
  have bounded : Finite G := Nat.finite_of_card_ne_zero counted
  have many : 1 < Nat.card G :=
    calc 1 < p := hp.one_lt
      _ = Nat.card G := hG.symm
  have plural : Nontrivial G := Finite.one_lt_card_iff_nontrivial.mp many
  refine ⟨plural, ?_⟩
  intro N hN
  exact no_hidden_circles hp hG N

theorem prime_coven_is_simple {p : ℕ} (hp : p.Prime) (hG : Nat.card G = p) :
    IsSimpleGroup G :=
  unbreakable_iff_simple.mp (prime_coven_is_unbreakable hp hG)

end Arcane.Enchantment
