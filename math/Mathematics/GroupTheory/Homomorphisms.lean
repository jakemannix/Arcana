import Mathematics.Functions
import Mathlib.Algebra.Group.Subgroup.Ker

namespace Mathematics.GroupTheory

variable {G H K : Type*} [Group G] [Group H] [Group K]

def composeHom (f : G →* H) (g : H →* K) : G →* K := g.comp f

theorem hom_map_mul (f : G →* H) (x y : G) :
    f (x * y) = f x * f y := f.map_mul x y

theorem hom_map_one (f : G →* H) : f 1 = 1 := by
  have h_idempotent : f 1 * f 1 = f 1 * 1 :=
    calc f 1 * f 1 = f (1 * 1) := (hom_map_mul f 1 1).symm
      _ = f 1 := congrArg f (mul_one 1)
      _ = f 1 * 1 := (mul_one (f 1)).symm
  exact mul_left_cancel h_idempotent

theorem hom_map_inv (f : G →* H) (x : G) :
    f x⁻¹ = (f x)⁻¹ := by
  have h_mul_eq_one : f x⁻¹ * f x = 1 :=
    calc f x⁻¹ * f x = f (x⁻¹ * x) := (hom_map_mul f x⁻¹ x).symm
      _ = f 1 := congrArg f (inv_mul_cancel x)
      _ = 1 := hom_map_one f
  exact eq_inv_of_mul_eq_one_left h_mul_eq_one

theorem injective_composeHom (f : G →* H) (g : H →* K)
    (hf : Function.Injective f) (hg : Function.Injective g) :
    Function.Injective (composeHom f g) :=
  Mathematics.Functions.injective_compose (f := f) (g := g) hf hg

theorem mem_ker_composeHom (f : G →* H) (g : H →* K) (x : G) :
    x ∈ (composeHom f g).ker ↔ f x ∈ g.ker :=
  calc x ∈ (composeHom f g).ker ↔ composeHom f g x = 1 := MonoidHom.mem_ker
    _ ↔ g (f x) = 1 := Iff.rfl
    _ ↔ f x ∈ g.ker := MonoidHom.mem_ker.symm

end Mathematics.GroupTheory
