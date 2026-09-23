import Mathlib.GroupTheory.GroupAction.Quotient
import Mathlib.GroupTheory.Coset.Card

namespace Arcane.Enchantment

variable {G X : Type*} [Group G] [MulAction G X]

noncomputable def orbitPortal (x : X) :
    MulAction.orbit G x ≃ G ⧸ MulAction.stabilizer G x :=
  MulAction.orbitEquivQuotientStabilizer G x

theorem portal_returns_action (x : X) (g : G) :
    ((orbitPortal x).symm (QuotientGroup.mk g) : X) = g • x := rfl

theorem orbit_times_stabilizer (x : X) :
    Nat.card (MulAction.orbit G x) * Nat.card (MulAction.stabilizer G x) =
      Nat.card G := by
  rw [← Nat.card_prod]
  exact Nat.card_congr (MulAction.orbitProdStabilizerEquivGroup G x)

end Arcane.Enchantment
