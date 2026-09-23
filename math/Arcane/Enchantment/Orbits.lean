import Arcane.Enchantment.Lagrange
import Mathlib.GroupTheory.GroupAction.Quotient

namespace Arcane.Enchantment

variable {G X : Type*} [Group G] [MulAction G X]

theorem same_place_same_veil (x : X) (g k : G) :
    g • x = k • x ↔ g⁻¹ * k ∈ MulAction.stabilizer G x := by
  rw [MulAction.mem_stabilizer_iff]
  constructor
  · intro meet
    calc (g⁻¹ * k) • x = g⁻¹ • k • x := mul_smul g⁻¹ k x
      _ = g⁻¹ • g • x := congrArg (fun p => g⁻¹ • p) meet.symm
      _ = x := inv_smul_smul g x
  · intro still
    calc g • x = g • (g⁻¹ * k) • x := congrArg (fun p => g • p) still.symm
      _ = g • g⁻¹ • k • x := congrArg (fun p => g • p) (mul_smul g⁻¹ k x)
      _ = k • x := smul_inv_smul g (k • x)

noncomputable def orbitPortal (x : X) :
    MulAction.orbit G x ≃ G ⧸ MulAction.stabilizer G x :=
  MulAction.orbitEquivQuotientStabilizer G x

theorem portal_returns_action (x : X) (g : G) :
    ((orbitPortal x).symm (QuotientGroup.mk g) : X) = g • x := rfl

theorem orbit_counts_cosets (x : X) :
    Nat.card (MulAction.orbit G x) = Nat.card (G ⧸ MulAction.stabilizer G x) :=
  Nat.card_congr (orbitPortal x)

theorem orbit_times_stabilizer (x : X) :
    Nat.card (MulAction.orbit G x) * Nat.card (MulAction.stabilizer G x) =
      Nat.card G :=
  calc Nat.card (MulAction.orbit G x) * Nat.card (MulAction.stabilizer G x)
        = Nat.card (G ⧸ MulAction.stabilizer G x) * Nat.card (MulAction.stabilizer G x) :=
          congrArg (fun n => n * Nat.card (MulAction.stabilizer G x)) (orbit_counts_cosets x)
    _ = Nat.card G := (count_the_cosets (MulAction.stabilizer G x)).symm

end Arcane.Enchantment
