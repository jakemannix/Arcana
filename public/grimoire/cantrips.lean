import Mathlib.Logic.Function.Basic
import Mathlib.Logic.Equiv.Defs

namespace Arcane.Cantrips

variable {α β γ : Type*}

def thread (f : α → β) (g : β → γ) : α → γ := g ∘ f

theorem thread_apply (f : α → β) (g : β → γ) (x : α) :
    thread f g x = g (f x) := rfl

theorem faithful_thread {f : α → β} {g : β → γ}
    (hf : Function.Injective f) (hg : Function.Injective g) :
    Function.Injective (thread f g) := hg.comp hf

theorem reaching_thread {f : α → β} {g : β → γ}
    (hf : Function.Surjective f) (hg : Function.Surjective g) :
    Function.Surjective (thread f g) := hg.comp hf

theorem mirror_return (e : α ≃ β) (x : α) : e.symm (e x) = x :=
  e.symm_apply_apply x

end Arcane.Cantrips
