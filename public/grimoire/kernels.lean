import Arcane.Enchantment.Pacts

namespace Arcane.Enchantment

variable {G H : Type*} [Group G] [Group H]

def silence (f : G →* H) : Subgroup G := f.ker

theorem silence_iff (f : G →* H) (x : G) :
    x ∈ silence f ↔ f x = 1 := MonoidHom.mem_ker

theorem silence_survives_conjugation (f : G →* H) {x : G}
    (hx : x ∈ silence f) (g : G) : g * x * g⁻¹ ∈ silence f := by
  have quiet : f x = 1 := (silence_iff f x).mp hx
  have hushed : f (g * x * g⁻¹) = 1 :=
    calc f (g * x * g⁻¹) = f (g * x) * f g⁻¹ := pact_preserves_product f (g * x) g⁻¹
      _ = f g * f x * f g⁻¹ :=
          congrArg (fun t => t * f g⁻¹) (pact_preserves_product f g x)
      _ = f g * 1 * f g⁻¹ := congrArg (fun t => f g * t * f g⁻¹) quiet
      _ = f g * f g⁻¹ := congrArg (fun t => t * f g⁻¹) (mul_one (f g))
      _ = f g * (f g)⁻¹ := congrArg (fun t => f g * t) (pact_preserves_inverse f g)
      _ = 1 := mul_inv_cancel (f g)
  exact (silence_iff f (g * x * g⁻¹)).mpr hushed

theorem silence_is_normal (f : G →* H) : (silence f).Normal := by
  constructor
  intro x hx g
  exact silence_survives_conjugation f hx g

theorem faithful_iff_silence_trivial (f : G →* H) :
    Function.Injective f ↔ silence f = ⊥ := by
  rw [Subgroup.eq_bot_iff_forall]
  constructor
  · intro faithful x hx
    have echoes : f x = f 1 :=
      calc f x = 1 := (silence_iff f x).mp hx
        _ = f 1 := (pact_preserves_unity f).symm
    exact faithful echoes
  · intro hollow x y same
    have hushed : f (x * y⁻¹) = 1 :=
      calc f (x * y⁻¹) = f x * f y⁻¹ := pact_preserves_product f x y⁻¹
        _ = f y * f y⁻¹ := congrArg (fun t => t * f y⁻¹) same
        _ = f (y * y⁻¹) := (pact_preserves_product f y y⁻¹).symm
        _ = f 1 := congrArg f (mul_inv_cancel y)
        _ = 1 := pact_preserves_unity f
    have vanished : x * y⁻¹ = 1 := hollow (x * y⁻¹) ((silence_iff f (x * y⁻¹)).mpr hushed)
    exact mul_inv_eq_one.mp vanished

end Arcane.Enchantment
