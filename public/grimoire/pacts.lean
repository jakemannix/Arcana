import Arcane.Cantrips
import Mathlib.Algebra.Group.Subgroup.Ker

namespace Arcane.Enchantment

variable {G H K : Type*} [Group G] [Group H] [Group K]

def chainedPact (f : G →* H) (g : H →* K) : G →* K := g.comp f

theorem pact_preserves_product (f : G →* H) (x y : G) :
    f (x * y) = f x * f y := f.map_mul x y

theorem pact_preserves_unity (f : G →* H) : f 1 = 1 := by
  have twice : f 1 * f 1 = f 1 * 1 :=
    calc f 1 * f 1 = f (1 * 1) := (pact_preserves_product f 1 1).symm
      _ = f 1 := congrArg f (mul_one 1)
      _ = f 1 * 1 := (mul_one (f 1)).symm
  exact mul_left_cancel twice

theorem pact_preserves_inverse (f : G →* H) (x : G) :
    f x⁻¹ = (f x)⁻¹ := by
  have undone : f x⁻¹ * f x = 1 :=
    calc f x⁻¹ * f x = f (x⁻¹ * x) := (pact_preserves_product f x⁻¹ x).symm
      _ = f 1 := congrArg f (inv_mul_cancel x)
      _ = 1 := pact_preserves_unity f
  exact eq_inv_of_mul_eq_one_left undone

theorem faithful_pacts_compose (f : G →* H) (g : H →* K)
    (hf : Function.Injective f) (hg : Function.Injective g) :
    Function.Injective (chainedPact f g) :=
  Arcane.Cantrips.faithful_thread (f := f) (g := g) hf hg

theorem silence_of_chain (f : G →* H) (g : H →* K) (x : G) :
    x ∈ (chainedPact f g).ker ↔ f x ∈ g.ker :=
  calc x ∈ (chainedPact f g).ker ↔ chainedPact f g x = 1 := MonoidHom.mem_ker
    _ ↔ g (f x) = 1 := Iff.rfl
    _ ↔ f x ∈ g.ker := MonoidHom.mem_ker.symm

end Arcane.Enchantment
