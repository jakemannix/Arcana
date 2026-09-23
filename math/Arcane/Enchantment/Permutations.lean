import Mathlib.GroupTheory.Perm.Fin
import Mathlib.GroupTheory.OrderOfElement

namespace Arcane.Enchantment

abbrev triangleSymmetries := Equiv.Perm (Fin 3)

def firstSwap : triangleSymmetries := Equiv.swap 0 1

def secondSwap : triangleSymmetries := Equiv.swap 1 2

theorem six_symmetries : Fintype.card triangleSymmetries = 6 := by decide

theorem swap_twice : firstSwap * firstSwap = 1 :=
  Equiv.swap_mul_self 0 1

theorem swaps_do_not_commute : firstSwap * secondSwap ≠ secondSwap * firstSwap := by
  intro same
  have leftward : (firstSwap * secondSwap) 0 = 1 := by decide
  have rightward : (secondSwap * firstSwap) 0 = 2 := by decide
  have clash : (1 : Fin 3) = 2 :=
    calc (1 : Fin 3) = (firstSwap * secondSwap) 0 := leftward.symm
      _ = (secondSwap * firstSwap) 0 := congrArg (fun σ => σ 0) same
      _ = 2 := rightward
  exact absurd clash (by decide)

end Arcane.Enchantment
