import Arcane.Enchantment.Pacts
import Mathlib.GroupTheory.QuotientGroup.Basic

namespace Arcane.Enchantment

variable {G H : Type*} [Group G] [Group H]

theorem veil_hides_difference (N : Subgroup G) (f : G →* H) (hN : N ≤ f.ker)
    {x y : G} (hxy : x⁻¹ * y ∈ N) : f x = f y := by
  have quiet : f (x⁻¹ * y) = 1 := hN hxy
  calc f x = f x * 1 := (mul_one (f x)).symm
    _ = f x * f (x⁻¹ * y) := congrArg (fun t => f x * t) quiet.symm
    _ = f (x * (x⁻¹ * y)) := (pact_preserves_product f x (x⁻¹ * y)).symm
    _ = f y := congrArg f (mul_inv_cancel_left x y)

def descendedPact (N : Subgroup G) [N.Normal] (f : G →* H)
    (hN : N ≤ f.ker) : G ⧸ N →* H :=
  QuotientGroup.lift N f hN

theorem descent_on_representative (N : Subgroup G) [N.Normal]
    (f : G →* H) (hN : N ≤ f.ker) (x : G) :
    descendedPact N f hN (QuotientGroup.mk x) = f x := rfl

theorem descent_is_unique (N : Subgroup G) [N.Normal]
    (f : G →* H) (hN : N ≤ f.ker) (g : G ⧸ N →* H)
    (hg : ∀ x : G, g (QuotientGroup.mk x) = f x) :
    g = descendedPact N f hN := by
  apply MonoidHom.ext
  intro q
  obtain ⟨x, rfl⟩ := QuotientGroup.mk_surjective q
  calc g (QuotientGroup.mk x) = f x := hg x
    _ = descendedPact N f hN (QuotientGroup.mk x) :=
        (descent_on_representative N f hN x).symm

end Arcane.Enchantment
