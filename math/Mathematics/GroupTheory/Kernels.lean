import Mathematics.GroupTheory.Homomorphisms

namespace Mathematics.GroupTheory

variable {G H : Type*} [Group G] [Group H]

/- The kernel collects exactly the inputs sent to the identity.
The next equivalence switches between subgroup membership and that equation. -/
def homKernel (f : G →* H) : Subgroup G := f.ker

theorem mem_homKernel_iff (f : G →* H) (x : G) :
    x ∈ homKernel f ↔ f x = 1 := MonoidHom.mem_ker

/- Push the map through this conjugate. The middle image becomes the identity,
and the two surrounding images cancel. This is the calculation behind normality. -/
theorem conjugate_mem_homKernel (f : G →* H) {x : G}
    (hx : x ∈ homKernel f) (g : G) : g * x * g⁻¹ ∈ homKernel f := by
  have h_map_eq_one : f x = 1 := (mem_homKernel_iff f x).mp hx
  have h_product_map_eq_one : f (g * x * g⁻¹) = 1 :=
    calc f (g * x * g⁻¹) = f (g * x) * f g⁻¹ := hom_map_mul f (g * x) g⁻¹
      _ = f g * f x * f g⁻¹ :=
          congrArg (fun t => t * f g⁻¹) (hom_map_mul f g x)
      _ = f g * 1 * f g⁻¹ := congrArg (fun t => f g * t * f g⁻¹) h_map_eq_one
      _ = f g * f g⁻¹ := congrArg (fun t => t * f g⁻¹) (mul_one (f g))
      _ = f g * (f g)⁻¹ := congrArg (fun t => f g * t) (hom_map_inv f g)
      _ = 1 := mul_inv_cancel (f g)
  exact (mem_homKernel_iff f (g * x * g⁻¹)).mpr h_product_map_eq_one

/- Normality asks for closure under every conjugation.
Package the preceding calculation as that structural property. -/
theorem homKernel_normal (f : G →* H) : (homKernel f).Normal := by
  constructor
  intro x hx g
  exact conjugate_mem_homKernel f hx g

/- A trivial kernel means only the identity maps to the identity.
For the converse implication, equal images make the product with an inverse
land in the kernel, forcing the original inputs to coincide. -/
theorem injective_iff_homKernel_eq_bot (f : G →* H) :
    Function.Injective f ↔ homKernel f = ⊥ := by
  rw [Subgroup.eq_bot_iff_forall]
  constructor
  · intro h_injective x hx
    have h_images_eq : f x = f 1 :=
      calc f x = 1 := (mem_homKernel_iff f x).mp hx
        _ = f 1 := (hom_map_one f).symm
    exact h_injective h_images_eq
  · intro h_kernel_trivial x y h_eq
    have h_product_map_eq_one : f (x * y⁻¹) = 1 :=
      calc f (x * y⁻¹) = f x * f y⁻¹ := hom_map_mul f x y⁻¹
        _ = f y * f y⁻¹ := congrArg (fun t => t * f y⁻¹) h_eq
        _ = f (y * y⁻¹) := (hom_map_mul f y y⁻¹).symm
        _ = f 1 := congrArg f (mul_inv_cancel y)
        _ = 1 := hom_map_one f
    have h_div_eq_one : x * y⁻¹ = 1 := h_kernel_trivial (x * y⁻¹) ((mem_homKernel_iff f (x * y⁻¹)).mpr h_product_map_eq_one)
    exact mul_inv_eq_one.mp h_div_eq_one

end Mathematics.GroupTheory
