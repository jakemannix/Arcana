import Mathematics.GroupTheory.Lagrange
import Mathlib.GroupTheory.Index
import Mathlib.GroupTheory.Subgroup.Simple
import Mathlib.Algebra.Group.Subgroup.Finite

namespace Mathematics.GroupTheory

variable {G : Type*} [Group G]

/- Simple means nontrivial with no proper nontrivial normal subgroup.
The next theorem identifies this explicit description with the library structure. -/
def isSimpleGroupProperty (G : Type*) [Group G] : Prop :=
  Nontrivial G ∧ ∀ N : Subgroup G, N.Normal → N = ⊥ ∨ N = ⊤

theorem isSimpleGroupProperty_iff : isSimpleGroupProperty G ↔ IsSimpleGroup G := by
  constructor
  · intro h_simple_property
    obtain ⟨h_nontrivial, h_normal_subgroups⟩ := h_simple_property
    exact { toNontrivial := h_nontrivial, eq_bot_or_eq_top_of_normal := h_normal_subgroups }
  · intro h_simple
    exact ⟨h_simple.toNontrivial, h_simple.eq_bot_or_eq_top_of_normal⟩

/- Lagrange makes the subgroup cardinality a divisor of a prime.
Only the identity subgroup and the entire group can have the resulting sizes.
This argument is stronger than needed: the subgroup need not be normal. -/
theorem subgroup_eq_bot_or_top_of_prime_card {p : ℕ} (hp : p.Prime) (hG : Nat.card G = p)
    (H : Subgroup G) : H = ⊥ ∨ H = ⊤ := by
  have h_card_ne_zero : Nat.card G ≠ 0 :=
    calc Nat.card G = p := hG
      _ ≠ 0 := hp.ne_zero
  have h_finite : Finite G := Nat.finite_of_card_ne_zero h_card_ne_zero
  have h_card_dvd : Nat.card H ∣ p :=
    calc Nat.card H ∣ Nat.card G := card_subgroup_dvd_group H
      _ = p := hG
  rcases hp.eq_one_or_self_of_dvd (Nat.card H) h_card_dvd with h_card_one | h_card_prime
  · left
    exact Subgroup.card_eq_one.mp h_card_one
  · right
    have h_card_eq : Nat.card H = Nat.card G :=
      calc Nat.card H = p := h_card_prime
        _ = Nat.card G := hG.symm
    exact (Subgroup.card_eq_iff_eq_top H).mp h_card_eq

/- There are two obligations: the group has more than one element,
and every normal subgroup is trivial or total. Primality and the preceding
subgroup theorem supply them separately. -/
theorem isSimpleGroupProperty_of_prime_card {p : ℕ} (hp : p.Prime) (hG : Nat.card G = p) :
    isSimpleGroupProperty G := by
  have h_card_ne_zero : Nat.card G ≠ 0 :=
    calc Nat.card G = p := hG
      _ ≠ 0 := hp.ne_zero
  have h_finite : Finite G := Nat.finite_of_card_ne_zero h_card_ne_zero
  have h_one_lt_card : 1 < Nat.card G :=
    calc 1 < p := hp.one_lt
      _ = Nat.card G := hG.symm
  have h_nontrivial : Nontrivial G := Finite.one_lt_card_iff_nontrivial.mp h_one_lt_card
  refine ⟨h_nontrivial, ?_⟩
  intro N hN
  exact subgroup_eq_bot_or_top_of_prime_card hp hG N

/- Convert the explicit property into mathlib’s bundled simplicity statement.
No new group-theoretic argument is needed at this last step. -/
theorem isSimpleGroup_of_prime_card {p : ℕ} (hp : p.Prime) (hG : Nat.card G = p) :
    IsSimpleGroup G :=
  isSimpleGroupProperty_iff.mp (isSimpleGroupProperty_of_prime_card hp hG)

end Mathematics.GroupTheory
