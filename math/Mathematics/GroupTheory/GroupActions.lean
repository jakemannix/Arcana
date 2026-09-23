import Mathematics.GroupTheory.Lagrange
import Mathlib.GroupTheory.GroupAction.Quotient

namespace Mathematics.GroupTheory

variable {G X : Type*} [Group G] [MulAction G X]

theorem smul_eq_smul_iff_mem_stabilizer (x : X) (g k : G) :
    g • x = k • x ↔ g⁻¹ * k ∈ MulAction.stabilizer G x := by
  rw [MulAction.mem_stabilizer_iff]
  constructor
  · intro h_smul_eq
    calc (g⁻¹ * k) • x = g⁻¹ • k • x := mul_smul g⁻¹ k x
      _ = g⁻¹ • g • x := congrArg (fun p => g⁻¹ • p) h_smul_eq.symm
      _ = x := inv_smul_smul g x
  · intro h_stabilizer
    calc g • x = g • (g⁻¹ * k) • x := congrArg (fun p => g • p) h_stabilizer.symm
      _ = g • g⁻¹ • k • x := congrArg (fun p => g • p) (mul_smul g⁻¹ k x)
      _ = k • x := smul_inv_smul g (k • x)

noncomputable def orbitQuotientEquiv (x : X) :
    MulAction.orbit G x ≃ G ⧸ MulAction.stabilizer G x :=
  MulAction.orbitEquivQuotientStabilizer G x

theorem orbitQuotientEquiv_symm_mk (x : X) (g : G) :
    ((orbitQuotientEquiv x).symm (QuotientGroup.mk g) : X) = g • x := rfl

theorem card_orbit_eq_card_quotient (x : X) :
    Nat.card (MulAction.orbit G x) = Nat.card (G ⧸ MulAction.stabilizer G x) :=
  Nat.card_congr (orbitQuotientEquiv x)

theorem card_orbit_mul_card_stabilizer (x : X) :
    Nat.card (MulAction.orbit G x) * Nat.card (MulAction.stabilizer G x) =
      Nat.card G :=
  calc Nat.card (MulAction.orbit G x) * Nat.card (MulAction.stabilizer G x)
        = Nat.card (G ⧸ MulAction.stabilizer G x) * Nat.card (MulAction.stabilizer G x) :=
          congrArg (fun n => n * Nat.card (MulAction.stabilizer G x)) (card_orbit_eq_card_quotient x)
    _ = Nat.card G := (card_eq_card_quotient_mul_subgroup (MulAction.stabilizer G x)).symm

end Mathematics.GroupTheory
