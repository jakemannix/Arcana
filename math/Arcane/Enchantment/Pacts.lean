import Arcane.Cantrips
import Mathlib.Algebra.Group.Subgroup.Ker

namespace Arcane.Enchantment

variable {G H K : Type*} [Group G] [Group H] [Group K]

def chainedPact (f : G →* H) (g : H →* K) : G →* K := g.comp f

theorem pact_preserves_product (f : G →* H) (x y : G) :
    f (x * y) = f x * f y := f.map_mul x y

theorem pact_preserves_inverse (f : G →* H) (x : G) :
    f x⁻¹ = (f x)⁻¹ := f.map_inv x

theorem faithful_pacts_compose (f : G →* H) (g : H →* K)
    (hf : Function.Injective f) (hg : Function.Injective g) :
    Function.Injective (chainedPact f g) :=
  Arcane.Cantrips.faithful_thread (f := f) (g := g) hf hg

theorem silence_of_chain (f : G →* H) (g : H →* K) (x : G) :
    x ∈ (chainedPact f g).ker ↔ f x ∈ g.ker := Iff.rfl

end Arcane.Enchantment
