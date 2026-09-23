import Mathlib.CategoryTheory.Yoneda
import Mathlib.Algebra.FreeMonoid.Basic
import Mathlib.Algebra.Group.Nat.Hom
import Mathlib.Data.Int.Cast.Lemmas

open CategoryTheory Opposite

universe v u

namespace Mathematics.CategoryTheory

section Yoneda

variable {C : Type u} [Category.{v} C] {X : C} {F : C ⥤ Type v}

def transformationToElement (η : coyoneda.obj (op X) ⟶ F) : F.obj X :=
  η.app X (𝟙 X)

def elementToTransformation (x : F.obj X) : coyoneda.obj (op X) ⟶ F where
  app Y := ↾fun g => F.map g x
  naturality Y Z f := by
    ext g
    exact F.map_comp_apply g f x

theorem elementToTransformation_app (x : F.obj X) {Y : C} (g : X ⟶ Y) :
    (elementToTransformation x).app Y g = F.map g x := rfl

theorem transformation_determined_by_identity (η : coyoneda.obj (op X) ⟶ F)
    {Y : C} (g : X ⟶ Y) : η.app Y g = F.map g (transformationToElement η) :=
  calc η.app Y g = η.app Y (𝟙 X ≫ g) := congrArg (η.app Y) (Category.id_comp g).symm
    _ = η.app Y ((coyoneda.obj (op X)).map g (𝟙 X)) := rfl
    _ = F.map g (η.app X (𝟙 X)) := NatTrans.naturality_apply η g (𝟙 X)

theorem elementToTransformation_transformationToElement (η : coyoneda.obj (op X) ⟶ F) :
    elementToTransformation (transformationToElement η) = η := by
  ext Y g
  exact (transformation_determined_by_identity η g).symm

theorem transformationToElement_elementToTransformation (x : F.obj X) :
    transformationToElement (elementToTransformation x) = x :=
  calc transformationToElement (elementToTransformation x) = F.map (𝟙 X) x := rfl
    _ = x := F.map_id_apply X x

def yonedaEquivByHand : (coyoneda.obj (op X) ⟶ F) ≃ F.obj X where
  toFun := transformationToElement
  invFun := elementToTransformation
  left_inv := elementToTransformation_transformationToElement
  right_inv := transformationToElement_elementToTransformation

theorem yonedaEquivByHand_eq_coyonedaEquiv :
    (yonedaEquivByHand : (coyoneda.obj (op X) ⟶ F) ≃ F.obj X) = coyonedaEquiv := by
  ext η
  rfl

end Yoneda

section Representing

variable (M : Type*) [Monoid M] (G : Type*) [Group G]

def freeMonoidOnOneGenerator : (FreeMonoid Unit →* M) ≃ M :=
  FreeMonoid.lift.symm.trans (Equiv.funUnique Unit M)

theorem freeMonoidOnOneGenerator_apply (φ : FreeMonoid Unit →* M) :
    freeMonoidOnOneGenerator M φ = φ (FreeMonoid.of ()) := rfl

def integersRepresentGroup : (Multiplicative ℤ →* G) ≃ G :=
  (zpowersHom G).symm

theorem integersRepresentGroup_apply (φ : Multiplicative ℤ →* G) :
    integersRepresentGroup G φ = φ (Multiplicative.ofAdd 1) := rfl

end Representing

end Mathematics.CategoryTheory
