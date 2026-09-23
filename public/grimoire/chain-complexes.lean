import Mathlib.Algebra.Homology.ShortComplex.ModuleCat
import Mathlib.Algebra.Homology.ShortComplex.HomologicalComplex
import Mathlib.Data.Rat.Cast.Defs

open CategoryTheory

namespace Mathematics.AlgebraicTopology

noncomputable section

/- A chain complex is a row of modules with arrows lowering degree.
Two consecutive differentials compose to zero. We begin in positive
degree so that both neighboring degrees exist in a natural-number complex. -/
def cycleSubmodule {R : Type*} [Ring R]
    (C : ChainComplex (ModuleCat R) ℕ) (n : ℕ) : Submodule R (C.X (n + 1)) :=
  LinearMap.ker (C.d (n + 1) n).hom

def boundarySubmodule {R : Type*} [Ring R]
    (C : ChainComplex (ModuleCat R) ℕ) (n : ℕ) : Submodule R (C.X (n + 1)) :=
  LinearMap.range (C.d (n + 2) (n + 1)).hom

/- A boundary has a witness one degree higher. Apply the next differential
to that witness's image, then use the defining square-zero law. -/
theorem boundaries_are_cycles {R : Type*} [Ring R]
    (C : ChainComplex (ModuleCat R) ℕ) (n : ℕ) :
    boundarySubmodule C n ≤ cycleSubmodule C n := by
  intro x hx
  obtain ⟨y, rfl⟩ := hx
  change (C.d (n + 1) n) ((C.d (n + 2) (n + 1)) y) = 0
  have h_zero := C.d_comp_d (n + 2) (n + 1) n
  exact congrArg (fun f => f y) h_zero

/- Chain maps commute with differentials. A closed chain therefore stays
closed after transport; this is the first requirement for a map on homology. -/
theorem chainMap_preserves_cycles {R : Type*} [Ring R]
    {C D : ChainComplex (ModuleCat R) ℕ} (f : C ⟶ D) (n : ℕ)
    (x : C.X (n + 1)) (hx : x ∈ cycleSubmodule C n) :
    f.f (n + 1) x ∈ cycleSubmodule D n := by
  change (C.d (n + 1) n) x = 0 at hx
  change (D.d (n + 1) n) (f.f (n + 1) x) = 0
  calc
    _ = f.f n ((C.d (n + 1) n) x) :=
      congrArg (fun g => g x) (f.comm (n + 1) n)
    _ = f.f n 0 := congrArg (f.f n) hx
    _ = 0 := map_zero _

theorem chainMap_preserves_boundaries {R : Type*} [Ring R]
    {C D : ChainComplex (ModuleCat R) ℕ} (f : C ⟶ D) (n : ℕ)
    (x : C.X (n + 1)) (hx : x ∈ boundarySubmodule C n) :
    f.f (n + 1) x ∈ boundarySubmodule D n := by
  obtain ⟨y, rfl⟩ := hx
  refine ⟨f.f (n + 2) y, ?_⟩
  exact congrArg (fun g => g y) (f.comm (n + 2) (n + 1))

/- Our worked complex has three rational coordinates in every degree.
The differential sends (a,b,c) to (b,0,0): it erases the third coordinate
and moves the second into the first. Its next application is zero. -/
def tripleDifferential : (ℚ × ℚ × ℚ) →ₗ[ℚ] (ℚ × ℚ × ℚ) where
  toFun x := (x.2.1, 0, 0)
  map_add' x y := by simp
  map_smul' a x := by simp

theorem tripleDifferential_square (x : ℚ × ℚ × ℚ) :
    tripleDifferential (tripleDifferential x) = 0 := rfl

def tripleComplex : ChainComplex (ModuleCat ℚ) ℕ :=
  ChainComplex.of (fun _ => ModuleCat.of ℚ (ℚ × ℚ × ℚ))
    (fun _ => ModuleCat.ofHom tripleDifferential) (by
      intro n
      apply ModuleCat.hom_ext
      apply LinearMap.ext
      intro x
      exact tripleDifferential_square x)

theorem tripleComplex_d (n : ℕ) :
    tripleComplex.d (n + 1) n = ModuleCat.ofHom tripleDifferential :=
by
  simp [tripleComplex, ChainComplex.of_d]

/- Cycles have zero second coordinate. Boundaries have both the second
and third coordinates zero. The surviving third coordinate is the clue
for the next folio's homology calculation. -/
theorem triple_cycle_iff (n : ℕ) (x : ℚ × ℚ × ℚ) :
    x ∈ cycleSubmodule tripleComplex n ↔ x.2.1 = 0 := by
  change tripleComplex.d (n + 1) n x = 0 ↔ _
  rw [tripleComplex_d]
  change (x.2.1, (0 : ℚ), (0 : ℚ)) = 0 ↔ _
  simp

theorem triple_boundary_iff (n : ℕ) (x : ℚ × ℚ × ℚ) :
    x ∈ boundarySubmodule tripleComplex n ↔ x.2.1 = 0 ∧ x.2.2 = 0 := by
  change (∃ y, tripleComplex.d (n + 2) (n + 1) y = x) ↔ _
  rw [show n + 2 = (n + 1) + 1 by omega, tripleComplex_d]
  constructor
  · rintro ⟨y, rfl⟩
    exact ⟨rfl, rfl⟩
  · intro hx
    refine ⟨(0, x.1, 0), ?_⟩
    change (x.1, (0 : ℚ), (0 : ℚ)) = x
    rcases x with ⟨a, b, c⟩
    simp_all

end

end Mathematics.AlgebraicTopology
