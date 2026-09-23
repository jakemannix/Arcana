import Mathlib.GroupTheory.QuotientGroup.Basic

namespace Arcane.Enchantment

variable {G H : Type*} [Group G] [Group H]

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
  induction q using Quotient.inductionOn with
  | h x => exact hg x

end Arcane.Enchantment
