import Mathlib.GroupTheory.QuotientGroup.Basic

namespace Arcane.Enchantment

variable {G H : Type*} [Group G] [Group H]

noncomputable def unveiledImage (f : G →* H) : G ⧸ f.ker ≃* f.range :=
  QuotientGroup.quotientKerEquivRange f

theorem unveiling_on_representative (f : G →* H) (x : G) :
    (unveiledImage f (QuotientGroup.mk x) : H) = f x := rfl

theorem unveiling_is_bijective (f : G →* H) :
    Function.Bijective (unveiledImage f) := (unveiledImage f).bijective

noncomputable def unveiledCodomain (f : G →* H) (hf : Function.Surjective f) :
    G ⧸ f.ker ≃* H := QuotientGroup.quotientKerEquivOfSurjective f hf

end Arcane.Enchantment
