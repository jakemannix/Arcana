import Mathlib.Analysis.Normed.Operator.Basic
import Mathlib.Tactic.NormNum

namespace Mathematics.FunctionalAnalysis

variable {E F : Type*} [NormedAddCommGroup E] [NormedSpace ℝ E]
  [NormedAddCommGroup F] [NormedSpace ℝ F]

/- Enchantment contributes linearity; Necromancy contributes a norm and
continuity. A continuous linear map carries both pieces of structure. -/
def scalingOperator (a : ℝ) : E →L[ℝ] E := a • ContinuousLinearMap.id ℝ E

theorem scalingOperator_apply (a : ℝ) (x : E) : scalingOperator a x = a • x := rfl

theorem scalingOperator_add (a : ℝ) (x y : E) :
    scalingOperator a (x + y) = scalingOperator a x + scalingOperator a y :=
  (scalingOperator a).map_add x y

/- The operator norm is a uniform amplification bound. Linearity turns an
output difference into the image of an input difference before we apply it. -/
theorem operator_error_bound (f : E →L[ℝ] F) (x y : E) :
    ‖f x - f y‖ ≤ ‖f‖ * ‖x - y‖ := by
  calc ‖f x - f y‖ = ‖f (x - y)‖ := congrArg norm (f.map_sub x y).symm
    _ ≤ ‖f‖ * ‖x - y‖ := f.le_opNorm (x - y)

theorem scalingOperator_norm_apply (a : ℝ) (x : E) :
    ‖scalingOperator a x‖ = |a| * ‖x‖ := by
  exact norm_smul a x

/- On a nontrivial space the identity has norm one, so the bound for scalar
scaling is sharp. The nontriviality hypothesis rules out the zero space. -/
theorem scalingOperator_norm [Nontrivial E] (a : ℝ) :
    ‖(scalingOperator a : E →L[ℝ] E)‖ = |a| := by
  simp [scalingOperator, norm_smul, ContinuousLinearMap.norm_id]

/- Compose two bounded maps and their amplification bounds multiply.
This is the analytic counterpart of composing algebraic homomorphisms. -/
theorem operator_comp_bound (f : E →L[ℝ] F) (g : F →L[ℝ] E) :
    ‖g.comp f‖ ≤ ‖g‖ * ‖f‖ := g.opNorm_comp_le f

theorem halfScaling_error (x y : E) :
    ‖scalingOperator (1 / 2 : ℝ) x - scalingOperator (1 / 2 : ℝ) y‖ =
      (1 / 2 : ℝ) * ‖x - y‖ := by
  calc ‖scalingOperator (1 / 2 : ℝ) x - scalingOperator (1 / 2 : ℝ) y‖ =
      ‖scalingOperator (1 / 2 : ℝ) (x - y)‖ :=
        congrArg norm ((scalingOperator (1 / 2 : ℝ)).map_sub x y).symm
    _ = (1 / 2 : ℝ) * ‖x - y‖ := by rw [scalingOperator_norm_apply]; norm_num

end Mathematics.FunctionalAnalysis
