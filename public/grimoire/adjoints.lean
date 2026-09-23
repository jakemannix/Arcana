import Mathlib.Algebra.FreeMonoid.Basic
import Mathlib.Algebra.Group.End
import Mathlib.Algebra.Category.MonCat.Adjunctions
import Mathlib.Algebra.Category.Grp.Adjunctions

open CategoryTheory

universe u

namespace Mathematics.CategoryTheory

section FreeMonoid

variable {S M : Type*} [Monoid M]

/- A function on letters extends to a homomorphism on words by multiplication.
The one-letter calculation records its prescribed generator values. -/
def freeLift (f : S → M) : FreeMonoid S →* M := FreeMonoid.lift f

theorem freeLift_of (f : S → M) (s : S) : freeLift f (FreeMonoid.of s) = f s := rfl

/- A homomorphism’s generator values determine its value on every word.
Induct on the word: handle the empty word, then a first letter followed
by a shorter word. -/
theorem freeLift_unique (f : S → M) (φ : FreeMonoid S →* M)
    (h_generators : ∀ s, φ (FreeMonoid.of s) = f s) : φ = freeLift f := by
  apply MonoidHom.ext
  intro w
  induction w using FreeMonoid.inductionOn' with
  | one =>
    calc φ 1 = 1 := φ.map_one
      _ = freeLift f 1 := (freeLift f).map_one.symm
  | of_mul s w h_word =>
    calc φ (FreeMonoid.of s * w) = φ (FreeMonoid.of s) * φ w := φ.map_mul _ _
      _ = f s * φ w := congrArg (fun t => t * φ w) (h_generators s)
      _ = f s * freeLift f w := congrArg (fun t => f s * t) h_word
      _ = freeLift f (FreeMonoid.of s) * freeLift f w :=
          congrArg (fun t => t * freeLift f w) (freeLift_of f s).symm
      _ = freeLift f (FreeMonoid.of s * w) := ((freeLift f).map_mul _ _).symm

/- Mathlib packages the generator-to-word correspondence as an adjunction.
The free construction is left adjoint to forgetting the monoid structure. -/
def freeForgetAdjunction : MonCat.free.{u} ⊣ forget MonCat.{u} := MonCat.adj

end FreeMonoid

section Units

variable {G M : Type*} [Group G] [Monoid M]

/- The image of a group element has an inverse even in a target monoid:
use the image of its source inverse. Store both inverse equations explicitly. -/
def unitsLift (f : G →* M) : G →* Units M where
  toFun g :=
    { val := f g
      inv := f g⁻¹
      val_inv :=
        calc f g * f g⁻¹ = f (g * g⁻¹) := (f.map_mul g g⁻¹).symm
          _ = f 1 := congrArg f (mul_inv_cancel g)
          _ = 1 := f.map_one
      inv_val :=
        calc f g⁻¹ * f g = f (g⁻¹ * g) := (f.map_mul g⁻¹ g).symm
          _ = f 1 := congrArg f (inv_mul_cancel g)
          _ = 1 := f.map_one }
  map_one' := Units.ext f.map_one
  map_mul' g k := Units.ext (f.map_mul g k)

theorem unitsLift_val (f : G →* M) (g : G) : (unitsLift f g : M) = f g := rfl

/- A unit is determined by its underlying value, since an inverse is unique.
Thus equality of all underlying values already determines this lifted homomorphism. -/
theorem unitsLift_unique (f : G →* M) (ψ : G →* Units M)
    (h_values : ∀ g, (ψ g : M) = f g) : ψ = unitsLift f :=
  MonoidHom.ext fun g => Units.ext (h_values g)

/- Here the direction reverses: units are right adjoint to forgetting
from groups to monoids. The final equivalence connects invertible endofunctions
with the permutations used in Cayley’s theorem. -/
def forgetUnitsAdjunction : forget₂ GrpCat.{u} MonCat.{u} ⊣ MonCat.units.{u} :=
  GrpCat.forget₂MonAdj

def permEquivUnitsEnd (X : Type*) : Equiv.Perm X ≃* Units (Function.End X) :=
  Equiv.Perm.equivUnitsEnd

end Units

end Mathematics.CategoryTheory
