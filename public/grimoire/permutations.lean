import Mathlib.GroupTheory.Perm.Fin
import Mathlib.GroupTheory.OrderOfElement

namespace Arcane.Enchantment

abbrev triangleSymmetries := Equiv.Perm (Fin 3)

def firstSwap : triangleSymmetries := Equiv.swap 0 1

def secondSwap : triangleSymmetries := Equiv.swap 1 2

theorem six_symmetries : Fintype.card triangleSymmetries = 6 := by decide

theorem swap_twice : firstSwap * firstSwap = 1 := by decide

theorem swaps_do_not_commute : firstSwap * secondSwap ≠ secondSwap * firstSwap := by decide

end Arcane.Enchantment
