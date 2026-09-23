import Mathlib.GroupTheory.Coset.Card
import Mathlib.GroupTheory.OrderOfElement
import Mathlib.Data.ZMod.QuotientGroup

namespace Arcane.Enchantment

variable {G : Type*} [Group G]

theorem count_the_cosets (H : Subgroup G) :
    Nat.card G = Nat.card (G ⧸ H) * Nat.card H :=
  calc Nat.card G = Nat.card ((G ⧸ H) × H) :=
        Nat.card_congr Subgroup.groupEquivQuotientProdSubgroup
    _ = Nat.card (G ⧸ H) * Nat.card H := Nat.card_prod (G ⧸ H) H

theorem circle_divides_coven (H : Subgroup G) :
    Nat.card H ∣ Nat.card G := by
  refine ⟨Nat.card (G ⧸ H), ?_⟩
  calc Nat.card G = Nat.card (G ⧸ H) * Nat.card H := count_the_cosets H
    _ = Nat.card H * Nat.card (G ⧸ H) := Nat.mul_comm (Nat.card (G ⧸ H)) (Nat.card H)

theorem period_divides_coven (x : G) : orderOf x ∣ Nat.card G :=
  calc orderOf x = Nat.card (Subgroup.zpowers x) := (Nat.card_zpowers x).symm
    _ ∣ Nat.card G := circle_divides_coven (Subgroup.zpowers x)

theorem full_cycle_returns (x : G) : x ^ Nat.card G = 1 := by
  obtain ⟨k, hk⟩ := period_divides_coven x
  calc x ^ Nat.card G = x ^ (orderOf x * k) := congrArg (fun n => x ^ n) hk
    _ = (x ^ orderOf x) ^ k := pow_mul x (orderOf x) k
    _ = 1 ^ k := congrArg (fun t => t ^ k) (pow_orderOf_eq_one x)
    _ = 1 := one_pow k

end Arcane.Enchantment
