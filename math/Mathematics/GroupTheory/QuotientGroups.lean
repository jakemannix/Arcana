import Mathematics.GroupTheory.Homomorphisms
import Mathlib.GroupTheory.QuotientGroup.Basic

namespace Mathematics.GroupTheory

variable {G H : Type*} [Group G] [Group H]

/- Equivalent representatives must produce the same output.
The kernel containment makes their difference invisible to the map. -/
theorem map_eq_of_inv_mul_mem (N : Subgroup G) (f : G →* H) (hN : N ≤ f.ker)
    {x y : G} (hxy : x⁻¹ * y ∈ N) : f x = f y := by
  have h_map_eq_one : f (x⁻¹ * y) = 1 := hN hxy
  calc f x = f x * 1 := (mul_one (f x)).symm
    _ = f x * f (x⁻¹ * y) := congrArg (fun t => f x * t) h_map_eq_one.symm
    _ = f (x * (x⁻¹ * y)) := (hom_map_mul f x (x⁻¹ * y)).symm
    _ = f y := congrArg f (mul_inv_cancel_left x y)

/- Normality makes the quotient a group. Kernel containment makes this map
well defined on its cosets; mathlib packages both requirements into the lift. -/
def quotientLift (N : Subgroup G) [N.Normal] (f : G →* H)
    (hN : N ≤ f.ker) : G ⧸ N →* H :=
  QuotientGroup.lift N f hN

/- To calculate with the descended map, choose a representative and apply
the original map. This formula follows directly from the construction. -/
theorem quotientLift_mk (N : Subgroup G) [N.Normal]
    (f : G →* H) (hN : N ≤ f.ker) (x : G) :
    quotientLift N f hN (QuotientGroup.mk x) = f x := rfl

/- Every coset has a representative. Two descended maps agreeing on all
representatives therefore agree everywhere; there is no further choice to make. -/
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
