import Mathematics.GroupTheory.QuotientGroups

namespace Mathematics.GroupTheory

variable {G H : Type*} [Group G] [Group H]

/- Restricting the codomain to the image does not change any output value.
In particular, every kernel element still maps to the identity. -/
theorem ker_le_ker_rangeRestrict (f : G →* H) : f.ker ≤ f.rangeRestrict.ker := by
  intro x hx
  have h_map_eq_one : f x = 1 := hx
  show f.rangeRestrict x = 1
  exact Subtype.ext h_map_eq_one

/- The quotient lift now lands in the image, where every element is known
to have come from the original map. -/
def quotientToRange (f : G →* H) : G ⧸ f.ker →* f.range :=
  quotientLift f.ker f.rangeRestrict (ker_le_ker_rangeRestrict f)

theorem quotientToRange_mk (f : G →* H) (x : G) :
    (quotientToRange f (QuotientGroup.mk x) : H) = f x := rfl

/- Choose representatives of two cosets with equal images. Their difference
maps to the identity, so it belongs to the kernel and identifies the two cosets. -/
theorem quotientToRange_injective (f : G →* H) : Function.Injective (quotientToRange f) := by
  intro p q h_eq
  obtain ⟨x, rfl⟩ := QuotientGroup.mk_surjective p
  obtain ⟨y, rfl⟩ := QuotientGroup.mk_surjective q
  have h_images_eq : f x = f y :=
    calc f x = (quotientToRange f (QuotientGroup.mk x) : H) := (quotientToRange_mk f x).symm
      _ = (quotientToRange f (QuotientGroup.mk y) : H) := congrArg Subtype.val h_eq
      _ = f y := quotientToRange_mk f y
  have h_product_map_eq_one : f (x⁻¹ * y) = 1 :=
    calc f (x⁻¹ * y) = f x⁻¹ * f y := hom_map_mul f x⁻¹ y
      _ = (f x)⁻¹ * f y := congrArg (fun t => t * f y) (hom_map_inv f x)
      _ = (f y)⁻¹ * f y := congrArg (fun t => t⁻¹ * f y) h_images_eq
      _ = 1 := inv_mul_cancel (f y)
  exact QuotientGroup.eq.mpr h_product_map_eq_one

/- An image element carries a witness for its origin.
The coset of that witness is a preimage for the descended map. -/
theorem quotientToRange_surjective (f : G →* H) : Function.Surjective (quotientToRange f) := by
  intro imageElement
  obtain ⟨x, hx⟩ := MonoidHom.mem_range.mp imageElement.property
  refine ⟨QuotientGroup.mk x, ?_⟩
  apply Subtype.ext
  calc (quotientToRange f (QuotientGroup.mk x) : H) = f x := quotientToRange_mk f x
    _ = imageElement := hx

/- The hard work is already done: a homomorphism that is injective and
surjective can be packaged as a group isomorphism. -/
noncomputable def quotientKernelEquivRange (f : G →* H) : G ⧸ f.ker ≃* f.range :=
  MulEquiv.ofBijective (quotientToRange f) ⟨quotientToRange_injective f, quotientToRange_surjective f⟩

theorem quotientKernelEquivRange_mk (f : G →* H) (x : G) :
    (quotientKernelEquivRange f (QuotientGroup.mk x) : H) = f x := rfl

theorem quotientKernelEquivRange_bijective (f : G →* H) :
    Function.Bijective (quotientKernelEquivRange f) :=
  ⟨quotientToRange_injective f, quotientToRange_surjective f⟩

/- Surjectivity of the original map makes its image the whole codomain.
Only this final strengthening requires that extra hypothesis. -/
noncomputable def quotientKernelEquivCodomain (f : G →* H) (hf : Function.Surjective f) :
    G ⧸ f.ker ≃* H :=
  (quotientKernelEquivRange f).trans
    ((MulEquiv.subgroupCongr (MonoidHom.range_eq_top.mpr hf)).trans Subgroup.topEquiv)

end Mathematics.GroupTheory
