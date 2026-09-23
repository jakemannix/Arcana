import Mathematics.GroupTheory.Kernels
import Mathematics.GroupTheory.GroupActions
import Mathlib.Algebra.Group.Action.End

namespace Mathematics.GroupTheory

variable {G X : Type*} [Group G] [MulAction G X]

/- Each group element acts as an endofunction. A product acts by the right-hand
element first, then the left-hand one, matching function composition. -/
def actionToEnd : G →* Function.End X where
  toFun g := fun x => g • x
  map_one' := funext fun x => one_smul G x
  map_mul' g k := funext fun x => mul_smul g k x

theorem actionToEnd_apply (g : G) (x : X) : actionToEnd g x = g • x := rfl

/- The inverse group element undoes the action, so each action map is
a permutation. Store both cancellation laws with that inverse function. -/
def actionToPerm : G →* Equiv.Perm X where
  toFun g :=
    { toFun := fun x => g • x
      invFun := fun x => g⁻¹ • x
      left_inv := fun x => inv_smul_smul g x
      right_inv := fun x => smul_inv_smul g x }
  map_one' := Equiv.ext fun x => one_smul G x
  map_mul' g k := Equiv.ext fun x => mul_smul g k x

theorem actionToPerm_apply (g : G) (x : X) : actionToPerm g x = g • x := rfl

/- For the self-action by left multiplication, inspect the identity element.
A move that fixes every input fixes the identity, which forces the move itself
to be the identity. Thus this action has trivial kernel. -/
theorem homKernel_actionToPerm_self : homKernel (actionToPerm : G →* Equiv.Perm G) = ⊥ := by
  rw [Subgroup.eq_bot_iff_forall]
  intro g hg
  have h_moves_nothing : actionToPerm g = 1 := (mem_homKernel_iff actionToPerm g).mp hg
  calc g = g * 1 := (mul_one g).symm
    _ = actionToPerm g 1 := (smul_eq_mul g 1).symm
    _ = (1 : Equiv.Perm G) 1 := congrArg (fun σ : Equiv.Perm G => σ 1) h_moves_nothing
    _ = 1 := rfl

/- The kernel criterion from Circle of silence converts this calculation
into injectivity of the permutation representation. -/
theorem actionToPerm_self_injective :
    Function.Injective (actionToPerm : G →* Equiv.Perm G) :=
  (injective_iff_homKernel_eq_bot actionToPerm).mpr homKernel_actionToPerm_self

/- An injective homomorphism identifies its source with its image subgroup.
The following formula confirms that the represented action is left multiplication. -/
noncomputable def cayleyEquiv : G ≃* (actionToPerm : G →* Equiv.Perm G).range :=
  MonoidHom.ofInjective actionToPerm_self_injective

theorem cayleyEquiv_apply (g x : G) : (cayleyEquiv g : Equiv.Perm G) x = g * x := rfl

end Mathematics.GroupTheory
