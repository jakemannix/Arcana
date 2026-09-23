import Mathematics.AlgebraicTopology.ChainComplexes
import Mathlib.LinearAlgebra.Isomorphisms

open CategoryTheory

namespace Mathematics.AlgebraicTopology

noncomputable section

/- Homology remembers closed chains but forgets those which are boundaries.
First restrict the incoming differential to the kernel of the outgoing
one. Only then is its range a submodule of the right space to quotient. -/
abbrev tripleCycles := LinearMap.ker tripleDifferential

def tripleBoundaryIntoCycles : (ℚ × ℚ × ℚ) →ₗ[ℚ] tripleCycles :=
  tripleDifferential.codRestrict tripleCycles tripleDifferential_square

abbrev tripleHomology := tripleCycles ⧸ LinearMap.range tripleBoundaryIntoCycles

/- A homology class is zero exactly when the cycle came from the preceding
degree. This statement makes the meaning of the quotient explicit. -/
theorem triple_class_eq_zero (x : tripleCycles) :
    (Submodule.Quotient.mk x : tripleHomology) = 0 ↔
      ∃ y, tripleBoundaryIntoCycles y = x :=
  Submodule.Quotient.mk_eq_zero (LinearMap.range tripleBoundaryIntoCycles)

/- The third coordinate survives. For a cycle, the second coordinate is
already zero; forgetting the first coordinate should remove exactly the
boundaries, and no more. The next proof checks both directions. -/
def survivingCoordinate : tripleCycles →ₗ[ℚ] ℚ where
  toFun x := x.val.2.2
  map_add' _ _ := rfl
  map_smul' _ _ := rfl

theorem survivingCoordinate_kernel :
    LinearMap.ker survivingCoordinate = LinearMap.range tripleBoundaryIntoCycles := by
  ext x
  constructor
  · intro hx
    have h_second : x.val.2.1 = 0 :=
      congrArg (fun y : ℚ × ℚ × ℚ => y.1) x.property
    have h_third : x.val.2.2 = 0 := hx
    refine ⟨(0, x.val.1, 0), ?_⟩
    apply Subtype.ext
    change (x.val.1, (0 : ℚ), (0 : ℚ)) = x.val
    rcases x with ⟨⟨a, b, c⟩, hx_cycle⟩
    simp_all
  · rintro ⟨y, rfl⟩
    rfl

theorem survivingCoordinate_surjective : Function.Surjective survivingCoordinate := by
  intro c
  exact ⟨⟨(0, 0, c), rfl⟩, rfl⟩

/- The linear first isomorphism theorem finishes the computation:
cycles modulo boundaries are linearly equivalent to one copy of ℚ.
Its representative formula lets us compute actual homology classes. -/
def tripleHomologyEquiv : tripleHomology ≃ₗ[ℚ] ℚ :=
  (Submodule.quotEquivOfEq _ _ survivingCoordinate_kernel.symm).trans
    (survivingCoordinate.quotKerEquivOfSurjective survivingCoordinate_surjective)

theorem tripleHomologyEquiv_apply (x : tripleCycles) :
    tripleHomologyEquiv (Submodule.Quotient.mk x) = x.val.2.2 := by
  exact survivingCoordinate.quotKerEquivOfSurjective_apply_mk
    survivingCoordinate_surjective x

theorem triple_classes_equal_iff (x y : tripleCycles) :
    (Submodule.Quotient.mk x : tripleHomology) = Submodule.Quotient.mk y ↔
      x.val.2.2 = y.val.2.2 := by
  constructor
  · intro h_equal
    exact congrArg tripleHomologyEquiv h_equal
  · intro h_equal
    apply tripleHomologyEquiv.injective
    exact h_equal

/- These cycles differ by the boundary of (0,3,0), so they give the same
class. Changing the last coordinate would instead change the class. -/
theorem concrete_classes_equal :
    (Submodule.Quotient.mk (⟨(3, 0, 7), rfl⟩ : tripleCycles) : tripleHomology) =
      Submodule.Quotient.mk (⟨(0, 0, 7), rfl⟩ : tripleCycles) :=
  (triple_classes_equal_iff _ _).mpr rfl

def survivingCycle : tripleCycles := ⟨(0, 0, 1), rfl⟩

theorem surviving_class_nonzero :
    (Submodule.Quotient.mk survivingCycle : tripleHomology) ≠ 0 := by
  intro h_zero
  have h_image := congrArg tripleHomologyEquiv h_zero
  rw [tripleHomologyEquiv_apply, map_zero] at h_image
  exact one_ne_zero h_image

/- This is the same homology that mathlib attaches to a chain complex,
not merely a separately defined quotient. A three-term window is enough
to compute the middle degree; the library identifies it with ker/im. -/
def tripleWindow : ShortComplex (ModuleCat ℚ) :=
  ShortComplex.moduleCatMk tripleDifferential tripleDifferential (by
    apply LinearMap.ext
    intro x
    exact tripleDifferential_square x)

def tripleWindowHomologyIso : tripleWindow.homology ≅ ModuleCat.of ℚ tripleHomology :=
  tripleWindow.moduleCatHomologyIso

def tripleWindowIso : tripleComplex.sc' 2 1 0 ≅ tripleWindow :=
  ShortComplex.isoMk (Iso.refl _) (Iso.refl _) (Iso.refl _)
    (by
      apply ModuleCat.hom_ext
      apply LinearMap.ext
      intro x
      change tripleDifferential x = tripleComplex.d 2 1 x
      rw [tripleComplex_d 1]
      rfl)
    (by
      apply ModuleCat.hom_ext
      apply LinearMap.ext
      intro x
      change tripleDifferential x = tripleComplex.d 1 0 x
      rw [tripleComplex_d 0]
      rfl)

def tripleComplexHomologyIso : tripleComplex.homology 1 ≅ ModuleCat.of ℚ ℚ :=
  (tripleComplex.homologyIsoSc' 2 1 0 ((ComplexShape.down ℕ).prev_eq' rfl) ((ComplexShape.down ℕ).next_eq' rfl)) ≪≫
    ShortComplex.homologyMapIso tripleWindowIso ≪≫
    tripleWindowHomologyIso ≪≫ tripleHomologyEquiv.toModuleIso

/- Transport on homology respects both identity and composition.
The preceding folio explained why: chain maps preserve closed chains
and boundaries, so they descend consistently to equivalence classes. -/
def inducedHomologyMap {R : Type*} [Ring R]
    {C D : ChainComplex (ModuleCat R) ℕ} (f : C ⟶ D) (n : ℕ) :
    C.homology n ⟶ D.homology n :=
  HomologicalComplex.homologyMap f n

theorem inducedHomologyMap_identity {R : Type*} [Ring R]
    (C : ChainComplex (ModuleCat R) ℕ) (n : ℕ) :
    inducedHomologyMap (𝟙 C) n = 𝟙 (C.homology n) :=
  HomologicalComplex.homologyMap_id C n

theorem inducedHomologyMap_composition {R : Type*} [Ring R]
    {C D E : ChainComplex (ModuleCat R) ℕ} (f : C ⟶ D) (g : D ⟶ E) (n : ℕ) :
    inducedHomologyMap (f ≫ g) n = inducedHomologyMap f n ≫ inducedHomologyMap g n :=
  HomologicalComplex.homologyMap_comp f g n

end

end Mathematics.AlgebraicTopology
