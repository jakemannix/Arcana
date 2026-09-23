import Mathlib.Logic.Function.Basic
import Mathlib.Logic.Equiv.Defs

namespace Arcane.Cantrips

variable {α β γ : Type*}

def thread (f : α → β) (g : β → γ) : α → γ := fun x => g (f x)

theorem thread_apply (f : α → β) (g : β → γ) (x : α) :
    thread f g x = g (f x) := rfl

theorem faithful_thread {f : α → β} {g : β → γ}
    (hf : Function.Injective f) (hg : Function.Injective g) :
    Function.Injective (thread f g) := by
  intro x y same
  have outer : g (f x) = g (f y) :=
    calc g (f x) = thread f g x := (thread_apply f g x).symm
      _ = thread f g y := same
      _ = g (f y) := thread_apply f g y
  have inner : f x = f y := hg outer
  exact hf inner

theorem reaching_thread {f : α → β} {g : β → γ}
    (hf : Function.Surjective f) (hg : Function.Surjective g) :
    Function.Surjective (thread f g) := by
  intro z
  obtain ⟨y, hy⟩ := hg z
  obtain ⟨x, hx⟩ := hf y
  refine ⟨x, ?_⟩
  calc thread f g x = g (f x) := thread_apply f g x
    _ = g y := congrArg g hx
    _ = z := hy

theorem mirror_return (e : α ≃ β) (x : α) : e.symm (e x) = x :=
  e.left_inv x

theorem mirror_depart (e : α ≃ β) (y : β) : e (e.symm y) = y :=
  e.right_inv y

end Arcane.Cantrips
