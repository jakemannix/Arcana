import Mathematics.GroupTheory.Homomorphisms
import Mathlib.GroupTheory.QuotientGroup.Basic

namespace Mathematics.GroupTheory

variable {G H : Type*} [Group G] [Group H]

theorem map_eq_of_inv_mul_mem (N : Subgroup G) (f : G →* H) (hN : N ≤ f.ker)
    {x y : G} (hxy : x⁻¹ * y ∈ N) : f x = f y := by
  have h_map_eq_one : f (x⁻¹ * y) = 1 := hN hxy
  calc f x = f x * 1 := (mul_one (f x)).symm
    _ = f x * f (x⁻¹ * y) := congrArg (fun t => f x * t) h_map_eq_one.symm
    _ = f (x * (x⁻¹ * y)) := (hom_map_mul f x (x⁻¹ * y)).symm
    _ = f y := congrArg f (mul_inv_cancel_left x y)

def quotientLift (N : Subgroup G) [N.Normal] (f : G →* H)
    (hN : N ≤ f.ker) : G ⧸ N →* H :=
  QuotientGroup.lift N f hN

theorem quotientLift_mk (N : Subgroup G) [N.Normal]
    (f : G →* H) (hN : N ≤ f.ker) (x : G) :
    quotientLift N f hN (QuotientGroup.mk x) = f x := rfl

theorem quotientLift_unique (N : Subgroup G) [N.Normal]
    (f : G →* H) (hN : N ≤ f.ker) (g : G ⧸ N →* H)
    (hg : ∀ x : G, g (QuotientGroup.mk x) = f x) :
    g = quotientLift N f hN := by
  apply MonoidHom.ext
  intro q
  obtain ⟨x, rfl⟩ := QuotientGroup.mk_surjective q
  calc g (QuotientGroup.mk x) = f x := hg x
    _ = quotientLift N f hN (QuotientGroup.mk x) :=
        (quotientLift_mk N f hN x).symm

end Mathematics.GroupTheory
