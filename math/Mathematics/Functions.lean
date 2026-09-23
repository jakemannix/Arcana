import Mathlib.Logic.Function.Basic
import Mathlib.Logic.Equiv.Defs

namespace Mathematics.Functions

variable {α β γ : Type*}

def composeFunctions (f : α → β) (g : β → γ) : α → γ := fun x => g (f x)

theorem compose_apply (f : α → β) (g : β → γ) (x : α) :
    composeFunctions f g x = g (f x) := rfl

theorem injective_compose {f : α → β} {g : β → γ}
    (hf : Function.Injective f) (hg : Function.Injective g) :
    Function.Injective (composeFunctions f g) := by
  intro x y h_eq
  have h_comp_eq : g (f x) = g (f y) :=
    calc g (f x) = composeFunctions f g x := (compose_apply f g x).symm
      _ = composeFunctions f g y := h_eq
      _ = g (f y) := compose_apply f g y
  have h_image_eq : f x = f y := hg h_comp_eq
  exact hf h_image_eq

theorem surjective_compose {f : α → β} {g : β → γ}
    (hf : Function.Surjective f) (hg : Function.Surjective g) :
    Function.Surjective (composeFunctions f g) := by
  intro z
  obtain ⟨y, hy⟩ := hg z
  obtain ⟨x, hx⟩ := hf y
  refine ⟨x, ?_⟩
  calc composeFunctions f g x = g (f x) := compose_apply f g x
    _ = g y := congrArg g hx
    _ = z := hy

theorem equiv_symm_apply (e : α ≃ β) (x : α) : e.symm (e x) = x :=
  e.left_inv x

theorem equiv_apply_symm (e : α ≃ β) (y : β) : e (e.symm y) = y :=
  e.right_inv y

end Mathematics.Functions
