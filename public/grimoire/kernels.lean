import Mathlib.Algebra.Group.Subgroup.Ker

namespace Arcane.Enchantment

variable {G H : Type*} [Group G] [Group H]

def silence (f : G →* H) : Subgroup G := f.ker

theorem silence_iff (f : G →* H) (x : G) :
    x ∈ silence f ↔ f x = 1 := MonoidHom.mem_ker

theorem silence_survives_conjugation (f : G →* H) {x : G}
    (hx : x ∈ silence f) (g : G) : g * x * g⁻¹ ∈ silence f := by
  change f (g * x * g⁻¹) = 1
  have hx' : f x = 1 := hx
  simp [hx']

theorem silence_is_normal (f : G →* H) : (silence f).Normal := by
  change f.ker.Normal
  infer_instance

theorem faithful_iff_silence_trivial (f : G →* H) :
    Function.Injective f ↔ silence f = ⊥ := f.ker_eq_bot_iff.symm

end Arcane.Enchantment
