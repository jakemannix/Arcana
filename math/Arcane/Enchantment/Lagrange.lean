import Mathlib.GroupTheory.Coset.Card
import Mathlib.GroupTheory.OrderOfElement

namespace Arcane.Enchantment

variable {G : Type*} [Group G]

theorem count_the_cosets (H : Subgroup G) :
    Nat.card G = Nat.card (G ⧸ H) * Nat.card H :=
  H.card_eq_card_quotient_mul_card_subgroup

theorem circle_divides_coven (H : Subgroup G) :
    Nat.card H ∣ Nat.card G := H.card_subgroup_dvd_card

theorem period_divides_coven (x : G) : orderOf x ∣ Nat.card G :=
  orderOf_dvd_natCard x

theorem full_cycle_returns (x : G) : x ^ Nat.card G = 1 :=
  pow_card_eq_one'

end Arcane.Enchantment
