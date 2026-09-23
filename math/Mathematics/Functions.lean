import Mathlib.Logic.Function.Basic
import Mathlib.Logic.Equiv.Defs

namespace Mathematics.Functions

variable {α β γ : Type*}

/- Follow the types: first send an input through f, then send its output through g.
The matching middle type makes this composition possible. -/
def composeFunctions (f : α → β) (g : β → γ) : α → γ := fun x => g (f x)

theorem compose_apply (f : α → β) (g : β → γ) (x : α) :
    composeFunctions f g x = g (f x) := rfl

/- Injectivity lets us remove a function from an equality of its outputs.
Here we remove the outer function first, then the inner one. -/
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

/- To reach a target, work backwards through the two surjectivity hypotheses.
Each supplies a preimage and an equation that the final calculation checks. -/
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

/- An equivalence stores an inverse and both round-trip laws.
These last two statements expose those laws without reconstructing the inverse. -/
theorem equiv_symm_apply (e : α ≃ β) (x : α) : e.symm (e x) = x :=
  e.left_inv x

theorem equiv_apply_symm (e : α ≃ β) (y : β) : e (e.symm y) = y :=
  e.right_inv y

end Mathematics.Functions
