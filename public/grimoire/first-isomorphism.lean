import Arcane.Enchantment.Descent

namespace Arcane.Enchantment

variable {G H : Type*} [Group G] [Group H]

theorem silence_within_image (f : G →* H) : f.ker ≤ f.rangeRestrict.ker := by
  intro x hx
  have quiet : f x = 1 := hx
  show f.rangeRestrict x = 1
  exact Subtype.ext quiet

def imagePact (f : G →* H) : G ⧸ f.ker →* f.range :=
  descendedPact f.ker f.rangeRestrict (silence_within_image f)

theorem image_on_representative (f : G →* H) (x : G) :
    (imagePact f (QuotientGroup.mk x) : H) = f x := rfl

theorem image_is_faithful (f : G →* H) : Function.Injective (imagePact f) := by
  intro p q same
  obtain ⟨x, rfl⟩ := QuotientGroup.mk_surjective p
  obtain ⟨y, rfl⟩ := QuotientGroup.mk_surjective q
  have echoes : f x = f y :=
    calc f x = (imagePact f (QuotientGroup.mk x) : H) := (image_on_representative f x).symm
      _ = (imagePact f (QuotientGroup.mk y) : H) := congrArg Subtype.val same
      _ = f y := image_on_representative f y
  have hushed : f (x⁻¹ * y) = 1 :=
    calc f (x⁻¹ * y) = f x⁻¹ * f y := pact_preserves_product f x⁻¹ y
      _ = (f x)⁻¹ * f y := congrArg (fun t => t * f y) (pact_preserves_inverse f x)
      _ = (f y)⁻¹ * f y := congrArg (fun t => t⁻¹ * f y) echoes
      _ = 1 := inv_mul_cancel (f y)
  exact QuotientGroup.eq.mpr hushed

theorem image_is_reaching (f : G →* H) : Function.Surjective (imagePact f) := by
  intro target
  obtain ⟨x, hx⟩ := MonoidHom.mem_range.mp target.property
  refine ⟨QuotientGroup.mk x, ?_⟩
  apply Subtype.ext
  calc (imagePact f (QuotientGroup.mk x) : H) = f x := image_on_representative f x
    _ = target := hx

noncomputable def unveiledImage (f : G →* H) : G ⧸ f.ker ≃* f.range :=
  MulEquiv.ofBijective (imagePact f) ⟨image_is_faithful f, image_is_reaching f⟩

theorem unveiling_on_representative (f : G →* H) (x : G) :
    (unveiledImage f (QuotientGroup.mk x) : H) = f x := rfl

theorem unveiling_is_bijective (f : G →* H) :
    Function.Bijective (unveiledImage f) :=
  ⟨image_is_faithful f, image_is_reaching f⟩

noncomputable def unveiledCodomain (f : G →* H) (hf : Function.Surjective f) :
    G ⧸ f.ker ≃* H :=
  (unveiledImage f).trans
    ((MulEquiv.subgroupCongr (MonoidHom.range_eq_top.mpr hf)).trans Subgroup.topEquiv)

end Arcane.Enchantment
