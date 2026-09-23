import Mathlib.GroupTheory.Coset.Card
import Mathlib.GroupTheory.OrderOfElement
import Mathlib.Data.ZMod.QuotientGroup

namespace Mathematics.GroupTheory

variable {G : Type*} [Group G]

/- Count an element by its coset and its position within that coset.
No normality is needed to count the coset set. The finite interpretation is
the familiar one; Nat.card uses zero for infinite types. -/
theorem card_eq_card_quotient_mul_subgroup (H : Subgroup G) :
    Nat.card G = Nat.card (G ⧸ H) * Nat.card H :=
  calc Nat.card G = Nat.card ((G ⧸ H) × H) :=
        Nat.card_congr Subgroup.groupEquivQuotientProdSubgroup
    _ = Nat.card (G ⧸ H) * Nat.card H := Nat.card_prod (G ⧸ H) H

/- Divisibility asks for a multiplication witness.
The number of cosets supplies it, after commuting the two natural-number factors. -/
theorem card_subgroup_dvd_group (H : Subgroup G) :
    Nat.card H ∣ Nat.card G := by
  refine ⟨Nat.card (G ⧸ H), ?_⟩
  calc Nat.card G = Nat.card (G ⧸ H) * Nat.card H := card_eq_card_quotient_mul_subgroup H
    _ = Nat.card H * Nat.card (G ⧸ H) := Nat.mul_comm (Nat.card (G ⧸ H)) (Nat.card H)

/- Apply subgroup counting to the integer powers of a single element.
The cardinality of that cyclic subgroup is the element order. -/
theorem orderOf_dvd_card_group (x : G) : orderOf x ∣ Nat.card G :=
  calc orderOf x = Nat.card (Subgroup.zpowers x) := (Nat.card_zpowers x).symm
    _ ∣ Nat.card G := card_subgroup_dvd_group (Subgroup.zpowers x)

/- Open the divisibility witness and group the exponent into full periods.
Each period returns to the identity, so any number of periods does too. -/
theorem pow_card_group_eq_one (x : G) : x ^ Nat.card G = 1 := by
  obtain ⟨k, hk⟩ := orderOf_dvd_card_group x
  calc x ^ Nat.card G = x ^ (orderOf x * k) := congrArg (fun n => x ^ n) hk
    _ = (x ^ orderOf x) ^ k := pow_mul x (orderOf x) k
    _ = 1 ^ k := congrArg (fun t => t ^ k) (pow_orderOf_eq_one x)
    _ = 1 := one_pow k

end Mathematics.GroupTheory
