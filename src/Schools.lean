namespace Abjuration

theorem «Shield» (a b : Nat) (h : a ≠ b) : a < b ∨ b < a :=
  Nat.lt_or_gt_of_ne h

end Abjuration

namespace Conjuration

theorem «Plane Shift» (f : α → β) (g : β → γ) (h : γ → δ) :
    h ∘ (g ∘ f) = (h ∘ g) ∘ f := rfl

end Conjuration

namespace Divination

theorem «Augury» : 7 ∣ 343 := by decide

theorem «Detect Thoughts» (n : Nat) : n % 2 = 0 ∨ n % 2 = 1 := by omega

end Divination

namespace Enchantment

theorem «Command» (a b : Nat) (h₁ : a ≤ b) (h₂ : b ≤ a) : a = b :=
  Nat.le_antisymm h₁ h₂

end Enchantment

namespace Evocation

theorem «Scorching Ray» (n : Nat) : n + 1 ≤ 2 ^ n := by
  induction n with
  | zero => decide
  | succ k ih => rw [Nat.pow_succ] ; omega

end Evocation

namespace Necromancy

noncomputable def «Speak with Dead» (h : ∃ n : Nat , 0 < n) : Nat :=
  Classical.choose h

theorem «The Dead Answer» (h : ∃ n : Nat , 0 < n) : 0 < «Speak with Dead» h :=
  Classical.choose_spec h

end Necromancy

namespace Transmutation

def turn : α × α × α → α × α × α
  | (a , b , c) => (b , c , a)

theorem «Alter Self» (t : α × α × α) : turn (turn (turn t)) = t :=
  match t with
  | (_ , _ , _) => rfl

end Transmutation
