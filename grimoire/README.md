# Arcana · The grimoire

28 lessons across Enchantment (algebra), Transmutation (categories & topology), Illusion (complex analysis), Phantasms (algebraic geometry), Divination (chance, data & integers), Necromancy (analysis), with shared cantrips. All 280 declarations compile against Lean/mathlib v4.33.1, with the pinned P3Group classification library for the Eightfold Way. Every Arcana source decodes exactly and is compiled again. Browser edits are not checked by Lean.

## Threads & mirrors

*Functions, composition, and equivalence*

A common language for all schools: weave functions together, preserve injectivity and surjectivity, and undo an equivalence.

**Mathematical meaning.** If f and g are injective, g ∘ f is injective. If they are surjective, their composition is surjective. An equivalence carries an inverse, so e⁻¹(e(x)) = x and e(e⁻¹(y)) = y.

**Hypotheses.** Arbitrary types α, β, γ. Injectivity and surjectivity are separate hypotheses, not automatic properties of a function.

**Proof idea.** Each proof takes the definitions apart by hand. For injectivity, peel off g and then f from g(f(x)) = g(f(y)). For surjectivity, walk backwards: find y with g(y) = z, then x with f(x) = y, and check the chain with a calc. An equivalence stores both of its inverse laws. Enchantment's Chain of Pacts imports and uses injective_compose.

**A guided reading.** Start here if proof syntax is new. A function is a rule taking an input to an output; these small proofs teach how to follow that rule through a calculation. No group theory is needed, and the same moves will recur throughout the grimoire.

1. **Read the types as a route** The notation f : α → β says that f starts in α and lands in β. With g : β → γ, the matching middle type lets us form g(f(x)). composeFunctions names that route. Its application theorem uses rfl because both sides become the same expression after expanding the definition.

2. **Undo equal outputs** Injective means that equal outputs force equal inputs. Begin the composition proof with g(f(x)) = g(f(y)). The hypothesis for g removes the outer layer, giving f(x) = f(y); the hypothesis for f then gives x = y. Each have line names an intermediate fact for the next step.

3. **Build a preimage backwards** Surjective means every target has a preimage. To reach z in γ, first obtain y in β with g(y) = z, then x in α with f(x) = y. The pair ⟨x, proof⟩ supplies both the proposed preimage and the evidence. congrArg transports an equality through a function.

4. **Keep both inverse laws** An equivalence α ≃ β contains a function, an inverse, and proofs that both round trips return to the starting point. The final two theorems read those proofs from the structure. Later, ≃* will add preservation of multiplication to this reversible correspondence.

**Try it yourself.** Trace the injectivity proof from its last line backwards. Which intermediate equality would be missing if only f were known to be injective?

<details><summary>A hint</summary>

You need to remove g before you can use the hypothesis about f. Editing the browser creates a draft; translation preserves the text but does not check a new proof.

</details>

```text
beckon ✨Grand✨Archive✨☿Reason☿Rite☿Foundations
beckon ✨Grand✨Archive✨☿Reason☿Portal☿Names

sanctum Arcana☿Cantrips

familiar ⧼ᚨ ᛒ ᚷ ⟡ Essence⊛⧽

/- Follow the types: first send an input through f, then send its output through g.
The matching middle type makes this composition possible. -/
ritual Weave ⟪copper✨wire ⟡ ᚨ ↝ ᛒ⟫ ⟪silk✨cord ⟡ ᛒ ↝ ᚷ⟫ ⟡ ᚨ ↝ ᚷ ⇰ conjure jade✨cube ⇉ silk✨cord ⟪copper✨wire jade✨cube⟫

spell ✨Thread✨Unfolds✨ ⟪copper✨wire ⟡ ᚨ ↝ ᛒ⟫ ⟪silk✨cord ⟡ ᛒ ↝ ᚷ⟫ ⟪jade✨cube ⟡ ᚨ⟫ ⟡
    Weave copper✨wire silk✨cord jade✨cube ≣ silk✨cord ⟪copper✨wire jade✨cube⟫ ⇰ mirror

/- Injectivity lets us remove a function from an equality of its outputs.
Here we remove the outer function first, then the inner one. -/
spell ✨Faithful✨Weaving✨ ⧼copper✨wire ⟡ ᚨ ↝ ᛒ⧽ ⧼silk✨cord ⟡ ᛒ ↝ ᚷ⧽
    ⟪faith ⟡ Rite☿Faithful copper✨wire⟫ ⟪echoward ⟡ Rite☿Faithful silk✨cord⟫ ⟡
    Rite☿Faithful ⟪Weave copper✨wire silk✨cord⟫ ⇰ cast
  summon jade✨cube silver✨bell twinned
  bind ✨outer✨weave✨ ⟡ silk✨cord ⟪copper✨wire jade✨cube⟫ ≣ silk✨cord ⟪copper✨wire silver✨bell⟫ ⇰
    litany silk✨cord ⟪copper✨wire jade✨cube⟫ ≣ Weave copper✨wire silk✨cord jade✨cube ⇰ ⟪✨Thread✨Unfolds✨ copper✨wire silk✨cord jade✨cube⟫☿reflect
      ▢ ≣ Weave copper✨wire silk✨cord silver✨bell ⇰ twinned
      ▢ ≣ silk✨cord ⟪copper✨wire silver✨bell⟫ ⇰ ✨Thread✨Unfolds✨ copper✨wire silk✨cord silver✨bell
  bind ✨inner✨weave✨ ⟡ copper✨wire jade✨cube ≣ copper✨wire silver✨bell ⇰ echoward ✨outer✨weave✨
  missile faith ✨inner✨weave✨

/- To reach a target, work backwards through the two surjectivity hypotheses.
Each supplies a preimage and an equation that the final calculation checks. -/
spell ✨Reaching✨Weaving✨ ⧼copper✨wire ⟡ ᚨ ↝ ᛒ⧽ ⧼silk✨cord ⟡ ᛒ ↝ ᚷ⧽
    ⟪faith ⟡ Rite☿Reaching copper✨wire⟫ ⟪echoward ⟡ Rite☿Reaching silk✨cord⟫ ⟡
    Rite☿Reaching ⟪Weave copper✨wire silk✨cord⟫ ⇰ cast
  summon amber✨rod
  wrest ⦉silver✨bell᛫ runeward⦊ ⇰ echoward amber✨rod
  wrest ⦉jade✨cube᛫ sigilward⦊ ⇰ faith silver✨bell
  hone ⦉jade✨cube᛫ ?▢⦊
  litany Weave copper✨wire silk✨cord jade✨cube ≣ silk✨cord ⟪copper✨wire jade✨cube⟫ ⇰ ✨Thread✨Unfolds✨ copper✨wire silk✨cord jade✨cube
    ▢ ≣ silk✨cord silver✨bell ⇰ sympathy silk✨cord sigilward
    ▢ ≣ amber✨rod ⇰ runeward

/- An equivalence stores an inverse and both round-trip laws.
These last two statements expose those laws without reconstructing the inverse. -/
spell ✨Mirror✨Return✨ ⟪obsidian✨mirror ⟡ ᚨ ≃ ᛒ⟫ ⟪jade✨cube ⟡ ᚨ⟫ ⟡ obsidian✨mirror☿reflect ⟪obsidian✨mirror jade✨cube⟫ ≣ jade✨cube ⇰
  obsidian✨mirror☿✨Return✨Path✨ jade✨cube

spell ✨Mirror✨Depart✨ ⟪obsidian✨mirror ⟡ ᚨ ≃ ᛒ⟫ ⟪silver✨bell ⟡ ᛒ⟫ ⟡ obsidian✨mirror ⟪obsidian✨mirror☿reflect silver✨bell⟫ ≣ silver✨bell ⇰
  obsidian✨mirror☿✨Departure✨Path✨ silver✨bell

seal Arcana☿Cantrips
```

[Lean source](../math/Mathematics/Functions.lean) · [Arcana source](../public/grimoire/cantrips.spell)

[Function.Injective.comp](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Logic/Function/Basic.lean) · [Equiv.symm_apply_apply](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Logic/Equiv/Defs.lean#L252)

## Bind a circle

*Generated subgroups and their universal property*

Choose the seeds of an enchantment. The smallest subgroup containing them closes the circle under multiplication and inverses.

**Mathematical meaning.** ⟨S⟩ is the subgroup generated by S. It contains S, and ⟨S⟩ ≤ H exactly when S ⊆ H. For x,y ∈ H, xy⁻¹ ∈ H. Generating from an existing subgroup returns that subgroup.

**Hypotheses.** G is a group; S is any set of group elements; H is a subgroup. Neither commutativity nor finiteness is assumed.

**Proof idea.** Membership in the generated subgroup means membership in every subgroup that contains the seeds. From that one criterion, each seed lies in the circle, and any subgroup containing the seeds contains the whole circle. Closure under xy⁻¹ combines the inverse law and the product law. Generating from H returns H by antisymmetry: each side lies inside the other.

**A guided reading.** A subgroup is a collection of elements that can perform the same group operations without leaving the collection. After the function cantrips, this lesson shows how to specify a construction by what it must contain, instead of listing its elements.

1. **Separate seeds from a subgroup** A set S can be an arbitrary collection of seeds. A subgroup must also contain the identity, products, and inverses. generatedSubgroup is the smallest subgroup containing S. The ambient group may be infinite or noncommutative; neither restriction is needed for the construction.

2. **Read the universal membership test** Subgroup.mem_closure says that an element belongs to the generated subgroup exactly when it belongs to every subgroup containing the seeds. To show that a seed belongs, choose any such subgroup K: its assumption S ⊆ K already puts the seed there. This is the first theorem’s entire argument.

3. **Reduce a large inclusion to small data** The equivalence generatedSubgroup S ≤ H ↔ S ⊆ H is the useful rule. For subgroups, ≤ means containment. To put every generated element in H, it suffices to put the seeds there. The reverse direction follows because each seed already lies in the generated subgroup.

4. **Recognize when closure adds nothing** The product-with-inverse theorem combines two stored subgroup laws. The final proof then generates from all of H and shows that nothing new appears: prove containment in each direction and use le_antisymm. This pattern of proving equality through two inclusions will recur for kernels and images.

**Try it yourself.** In generatedSubgroup_le_iff, identify the direction used to prove that generating from a subgroup gives no extra elements.

<details><summary>A hint</summary>

The .mpr projection uses the right-to-left implication. Try folding the calculation and restating the two containments in words before reopening it.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿✨Inner✨Veyr✨☿Foundations

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯

/- Start with arbitrary seeds. Their generated subgroup adds everything required
by the identity, multiplication, and inverse laws, and nothing beyond that. -/
ritual ✨Bound✨Circle✨ ⟪pouch✨of✨sand ⟡ Host ᛰ⟫ ⟡ ✨Inner✨Veyr✨ ᛰ ⇰ ✨Inner✨Veyr✨☿encircle pouch✨of✨sand

/- A seed belongs to every subgroup containing all the seeds.
The universal membership test turns that observation into membership in the closure. -/
spell ✨Gather✨the✨Seeds✨ ⟪pouch✨of✨sand ⟡ Host ᛰ⟫ ⟡ pouch✨of✨sand ⊆ ✨Bound✨Circle✨ pouch✨of✨sand ⇰ cast
  summon jade✨cube sigilward
  proclaim jade✨cube ∈ ✨Inner✨Veyr✨☿encircle pouch✨of✨sand
  transmute ⟮✨Inner✨Veyr✨☿✨Encirclement✨Criterion✨⟯
  summon ᛟ hedgeward
  missile hedgeward sigilward

/- This is the useful universal property: containing every generated element
is equivalent to containing the original seeds. Prove each implication separately. -/
spell ✨Smallest✨Circle✨ ⟪pouch✨of✨sand ⟡ Host ᛰ⟫ ⟪☥ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟡
    ✨Bound✨Circle✨ pouch✨of✨sand ⋜ ☥ ↭ pouch✨of✨sand ⊆ ☥ ⇰ cast
  fabricate
  ❖ summon enclosed jade✨cube sigilward
    bind gathered ⟡ jade✨cube ∈ ✨Bound✨Circle✨ pouch✨of✨sand ⇰ ✨Gather✨the✨Seeds✨ pouch✨of✨sand sigilward
    missile enclosed gathered
  ❖ summon sown jade✨cube sigilward
    bind ✨every✨circle✨ ⟡ ⟁ ᛟ ⟡ ✨Inner✨Veyr✨ ᛰ᛫ pouch✨of✨sand ⊆ ᛟ ↝ jade✨cube ∈ ᛟ ⇰ ✨Inner✨Veyr✨☿✨Encirclement✨Criterion✨☿onward sigilward
    missile ✨every✨circle✨ ☥ sown

/- Subgroup membership survives taking an inverse and then multiplying.
No commutativity assumption is involved. -/
spell ✨Keep✨the✨Circle✨ ⟪☥ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⧼jade✨cube silver✨bell ⟡ ᛰ⧽
    ⟪sigilward ⟡ jade✨cube ∈ ☥⟫ ⟪runeward ⟡ silver✨bell ∈ ☥⟫ ⟡ jade✨cube ⊛ silver✨bell† ∈ ☥ ⇰ cast
  bind reversed ⟡ silver✨bell† ∈ ☥ ⇰ ☥☿✨Reversal✨Remains✨ runeward
  missile ☥☿✨Binding✨Remains✨ sigilward reversed

/- Generating from an existing subgroup adds no new elements.
Antisymmetry reduces equality to containment in both directions. -/
spell ✨Seal✨the✨Circle✨ ⟪☥ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟡ ✨Bound✨Circle✨ ⟪☥ ⟡ Host ᛰ⟫ ≣ ☥ ⇰ cast
  channel Stalemate
  ❖ bind sown ⟡ ⟪☥ ⟡ Host ᛰ⟫ ⊆ ☥ ⇰ conjure jade✨cube sigilward ⇉ sigilward
    missile ⟪✨Smallest✨Circle✨ ⟪☥ ⟡ Host ᛰ⟫ ☥⟫☿backward sown
  ❖ summon jade✨cube sigilward
    missile ✨Gather✨the✨Seeds✨ ⟪☥ ⟡ Host ᛰ⟫ sigilward

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Subgroups.lean) · [Arcana source](../public/grimoire/circles.spell)

[Subgroup.closure_le](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Lattice.lean#L355) · [Subgroup.closure_eq](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Lattice.lean#L433) · [Subgroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Defs.lean#L295)

## Chain of pacts

*Homomorphisms and their composition*

A pact transports the group operation intact. Chain two faithful pacts and no distinctions are lost.

**Mathematical meaning.** A homomorphism f satisfies f(xy) = f(x)f(y). From this alone it follows that f(1) = 1 and f(x⁻¹) = f(x)⁻¹. Injective homomorphisms compose. An element lies in ker(g ∘ f) precisely when f(x) lies in ker(g).

**Hypotheses.** G, H, K are groups. A bundled homomorphism G →* H already includes preservation of multiplication and the identity. The lesson still derives the identity and inverse laws from multiplication alone, to show why they must hold. Injectivity is explicitly assumed where needed.

**Proof idea.** Only multiplication is assumed. The identity is forced: f(1)·f(1) = f(1·1) = f(1) = f(1)·1, so cancellation gives f(1) = 1. Then f(x⁻¹)·f(x) = f(x⁻¹x) = f(1) = 1, so f(x⁻¹) is the inverse of f(x). The kernel of a composite unfolds in a three-line calc to g(f(x)) = 1. Injective pacts compose through the shared faithful-thread cantrip.

**A guided reading.** A homomorphism transports a group calculation from one group to another. Read this after functions and subgroups: the new ingredient is that the function respects multiplication, so algebraic information survives the journey.

1. **Read the bundled pact** The arrow G →* H packages a function with its homomorphism laws. Writing f x applies its underlying function. Although the bundle already stores identity preservation, the lesson deliberately derives the identity and inverse laws from multiplication to expose why they are forced.

2. **Force the image of the identity** Multiplication preservation turns f(1)f(1) into f(1·1), hence f(1). Re-express the other side as f(1)·1 and cancel the common left factor. A calc block records this chain one equality at a time; .symm uses an equality in the opposite direction.

3. **Transport an inverse** Multiply f(x⁻¹) by f(x). It equals f(x⁻¹x), which is f(1), hence the identity by the preceding theorem. The group inverse is characterized by exactly this cancellation property, so f(x⁻¹) must be the inverse of f(x). No commutativity is used.

4. **Compose, then inspect the kernel** composeHom f g applies f first and g second. Its injectivity proof reuses the function cantrip because injectivity concerns the underlying functions. Its kernel consists of inputs whose image under f lies in the kernel of g: unfolding both membership statements gives the same equation g(f(x)) = 1.

**Try it yourself.** Compare composeFunctions with composeHom. Which argument justifies that a composite is injective, and which extra structure allows it to be a homomorphism?

<details><summary>A hint</summary>

The shared cantrip proves injectivity. The bundled homomorphism composition already supplies the multiplication laws; an arbitrary function need not preserve them.

</details>

```text
beckon Arcana☿Cantrips
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿✨Inner✨Veyr✨☿Silences

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ☥ ᛟ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯ ⟮Veyr ᛟ⟯

/- A bundled homomorphism carries its operation-preservation proofs with its function.
The composite applies the first map and then the second. -/
ritual ✨Chain✨of✨Pacts✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪silk✨cord ⟡ ☥ ↝⊛ ᛟ⟫ ⟡ ᛰ ↝⊛ ᛟ ⇰ silk✨cord☿threading copper✨wire

spell ✨Preserve✨the✨Binding✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪jade✨cube silver✨bell ⟡ ᛰ⟫ ⟡
    copper✨wire ⟪jade✨cube ⊛ silver✨bell⟫ ≣ copper✨wire jade✨cube ⊛ copper✨wire silver✨bell ⇰ copper✨wire☿✨Carry✨the✨Binding✨ jade✨cube silver✨bell

/- Even though the bundle already stores identity preservation, derive it here
from multiplication: the image of the identity is idempotent, so cancellation forces it to be the identity. -/
spell ✨Preserve✨the✨Stillness✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ copper✨wire 一 ≣ 一 ⇰ cast
  bind doubled ⟡ copper✨wire 一 ⊛ copper✨wire 一 ≣ copper✨wire 一 ⊛ 一 ⇰
    litany copper✨wire 一 ⊛ copper✨wire 一 ≣ copper✨wire ⟪一 ⊛ 一⟫ ⇰ ⟪✨Preserve✨the✨Binding✨ copper✨wire 一 一⟫☿reflect
      ▢ ≣ copper✨wire 一 ⇰ sympathy copper✨wire ⟪✨Bind✨with✨Stillness✨ 一⟫
      ▢ ≣ copper✨wire 一 ⊛ 一 ⇰ ⟪✨Bind✨with✨Stillness✨ ⟪copper✨wire 一⟫⟫☿reflect
  missile ✨Strike✨from✨the✨Left✨ doubled

/- To recognize the image of an inverse, multiply it by the image of the original
element and show that the product is the identity. -/
spell ✨Reverse✨the✨Binding✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪jade✨cube ⟡ ᛰ⟫ ⟡
    copper✨wire jade✨cube† ≣ ⟪copper✨wire jade✨cube⟫† ⇰ cast
  bind undone ⟡ copper✨wire jade✨cube† ⊛ copper✨wire jade✨cube ≣ 一 ⇰
    litany copper✨wire jade✨cube† ⊛ copper✨wire jade✨cube ≣ copper✨wire ⟪jade✨cube† ⊛ jade✨cube⟫ ⇰ ⟪✨Preserve✨the✨Binding✨ copper✨wire jade✨cube† jade✨cube⟫☿reflect
      ▢ ≣ copper✨wire 一 ⇰ sympathy copper✨wire ⟪✨Reversal✨Undoes✨ jade✨cube⟫
      ▢ ≣ 一 ⇰ ✨Preserve✨the✨Stillness✨ copper✨wire
  missile ✨Undoer✨is✨Reversal✨ undone

/- Injectivity concerns the underlying functions, so the shared function cantrip
already proves this part of the homomorphism story. -/
spell ✨Chain✨without✨Loss✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪silk✨cord ⟡ ☥ ↝⊛ ᛟ⟫
    ⟪faith ⟡ Rite☿Faithful copper✨wire⟫ ⟪echoward ⟡ Rite☿Faithful silk✨cord⟫ ⟡
    Rite☿Faithful ⟪✨Chain✨of✨Pacts✨ copper✨wire silk✨cord⟫ ⇰
  Arcana☿Cantrips☿✨Faithful✨Weaving✨ ⟪copper✨wire ⇰ copper✨wire⟫ ⟪silk✨cord ⇰ silk✨cord⟫ faith echoward

/- An input vanishes under the composite exactly when its first image vanishes
under the second map. Unfolding kernel membership reveals the same equation. -/
spell ✨Silence✨in✨the✨Chain✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪silk✨cord ⟡ ☥ ↝⊛ ᛟ⟫ ⟪jade✨cube ⟡ ᛰ⟫ ⟡
    jade✨cube ∈ ⟪✨Chain✨of✨Pacts✨ copper✨wire silk✨cord⟫☿silence ↭ copper✨wire jade✨cube ∈ silk✨cord☿silence ⇰
  litany jade✨cube ∈ ⟪✨Chain✨of✨Pacts✨ copper✨wire silk✨cord⟫☿silence ↭ ✨Chain✨of✨Pacts✨ copper✨wire silk✨cord jade✨cube ≣ 一 ⇰ Herald☿✨Silence✨Criterion✨
    ▢ ↭ silk✨cord ⟪copper✨wire jade✨cube⟫ ≣ 一 ⇰ Pact☿mirror
    ▢ ↭ copper✨wire jade✨cube ∈ silk✨cord☿silence ⇰ Herald☿✨Silence✨Criterion✨☿reflect

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Homomorphisms.lean) · [Arcana source](../public/grimoire/pacts.spell)

[MonoidHom](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Hom/Defs.lean#L366) · [MonoidHom.mem_ker](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Ker.lean#L245)

## Circle of silence

*Kernels, normality, and faithful maps*

The kernel is everything a pact sends to the identity. Conjugating an element cannot break that silence.

**Mathematical meaning.** ker(f) = {x | f(x) = 1}. It is a normal subgroup: if x ∈ ker(f), then gxg⁻¹ ∈ ker(f). A homomorphism is injective exactly when its kernel is trivial.

**Hypotheses.** G and H are groups and f : G →* H. No commutativity is required. The bottom subgroup ⊥ contains just the identity.

**Proof idea.** Take x with f(x) = 1. A seven-line calc pushes f through g·x·g⁻¹ one step at a time, using congrArg to rewrite inside the product: split the product, replace f(x) by 1, drop it, turn f(g⁻¹) into f(g)⁻¹, and cancel. Normality is then built directly from that computation. For injectivity: a trivial kernel sends f(x) = f(y) to f(xy⁻¹) = 1, so xy⁻¹ = 1 and x = y.

**A guided reading.** A map can forget distinctions. Its kernel records everything it sends to the identity, and this lesson turns that one fiber into a test for whether the whole map is injective. Keep the homomorphism laws from Chain of pacts nearby.

1. **Translate membership into an equation** homKernel f is f.ker. The theorem mem_homKernel_iff lets you switch between the geometric language “x lies in this subgroup” and the computational statement f(x) = 1. The projections .mp and .mpr use the forward and backward directions of an equivalence.

2. **Follow one conjugate through the map** To prove gxg⁻¹ stays in the kernel, push f through each multiplication, replace f(x) by the identity, transport the inverse, and cancel f(g) against its inverse. The congrArg lines change one part of a larger expression while keeping its surroundings intact.

3. **Package normality** A normal subgroup remains closed under conjugation by every ambient group element. homKernel_normal asks for exactly the calculation already proved, so its short proof supplies that theorem as the required field. Normality will allow the next folio to form a quotient group.

4. **Recover equality from a trivial kernel** The bottom subgroup ⊥ contains only the identity. If f is injective, anything mapping to 1 equals 1. Conversely, if f(x) = f(y), then xy⁻¹ maps to 1. A trivial kernel forces xy⁻¹ = 1, and group cancellation gives x = y.

**Try it yourself.** Find the precise point in the last proof where the trivial-kernel hypothesis turns information about images into information about elements.

<details><summary>A hint</summary>

Look for h_div_eq_one. Everything before it computes an image; that line concludes an equality inside the original group.

</details>

```text
beckon Arcana☿Enchantment☿Pacts

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ☥ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯

/- The kernel collects exactly the inputs sent to the identity.
The next equivalence switches between subgroup membership and that equation. -/
ritual ✨Circle✨of✨Silence✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ ✨Inner✨Veyr✨ ᛰ ⇰ copper✨wire☿silence

spell ✨Name✨the✨Silent✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪jade✨cube ⟡ ᛰ⟫ ⟡
    jade✨cube ∈ ✨Circle✨of✨Silence✨ copper✨wire ↭ copper✨wire jade✨cube ≣ 一 ⇰ Herald☿✨Silence✨Criterion✨

/- Push the map through this conjugate. The middle image becomes the identity,
and the two surrounding images cancel. This is the calculation behind normality. -/
spell ✨Unbroken✨Silence✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⧼jade✨cube ⟡ ᛰ⧽
    ⟪sigilward ⟡ jade✨cube ∈ ✨Circle✨of✨Silence✨ copper✨wire⟫ ⟪silk✨cord ⟡ ᛰ⟫ ⟡ silk✨cord ⊛ jade✨cube ⊛ silk✨cord† ∈ ✨Circle✨of✨Silence✨ copper✨wire ⇰ cast
  bind muted ⟡ copper✨wire jade✨cube ≣ 一 ⇰ ⟪✨Name✨the✨Silent✨ copper✨wire jade✨cube⟫☿onward sigilward
  bind hushed ⟡ copper✨wire ⟪silk✨cord ⊛ jade✨cube ⊛ silk✨cord†⟫ ≣ 一 ⇰
    litany copper✨wire ⟪silk✨cord ⊛ jade✨cube ⊛ silk✨cord†⟫ ≣ copper✨wire ⟪silk✨cord ⊛ jade✨cube⟫ ⊛ copper✨wire silk✨cord† ⇰ ✨Preserve✨the✨Binding✨ copper✨wire ⟪silk✨cord ⊛ jade✨cube⟫ silk✨cord†
      ▢ ≣ copper✨wire silk✨cord ⊛ copper✨wire jade✨cube ⊛ copper✨wire silk✨cord† ⇰
          sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⊛ copper✨wire silk✨cord†⟫ ⟪✨Preserve✨the✨Binding✨ copper✨wire silk✨cord jade✨cube⟫
      ▢ ≣ copper✨wire silk✨cord ⊛ 一 ⊛ copper✨wire silk✨cord† ⇰ sympathy ⟪conjure pearl✨dust ⇉ copper✨wire silk✨cord ⊛ pearl✨dust ⊛ copper✨wire silk✨cord†⟫ muted
      ▢ ≣ copper✨wire silk✨cord ⊛ copper✨wire silk✨cord† ⇰ sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⊛ copper✨wire silk✨cord†⟫ ⟪✨Bind✨with✨Stillness✨ ⟪copper✨wire silk✨cord⟫⟫
      ▢ ≣ copper✨wire silk✨cord ⊛ ⟪copper✨wire silk✨cord⟫† ⇰ sympathy ⟪conjure pearl✨dust ⇉ copper✨wire silk✨cord ⊛ pearl✨dust⟫ ⟪✨Reverse✨the✨Binding✨ copper✨wire silk✨cord⟫
      ▢ ≣ 一 ⇰ ✨Binding✨Undone✨ ⟪copper✨wire silk✨cord⟫
  missile ⟪✨Name✨the✨Silent✨ copper✨wire ⟪silk✨cord ⊛ jade✨cube ⊛ silk✨cord†⟫⟫☿backward hushed

/- Normality asks for closure under every conjugation.
Package the preceding calculation as that structural property. -/
spell ✨Silence✨is✨Hallowed✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ ⟪✨Circle✨of✨Silence✨ copper✨wire⟫☿Hallowed ⇰ cast
  fabricate
  summon jade✨cube sigilward silk✨cord
  missile ✨Unbroken✨Silence✨ copper✨wire sigilward silk✨cord

/- A trivial kernel means only the identity maps to the identity.
For the converse implication, equal images make the product with an inverse
land in the kernel, forcing the original inputs to coincide. -/
spell ✨Nothing✨Lost✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡
    Rite☿Faithful copper✨wire ↭ ✨Circle✨of✨Silence✨ copper✨wire ≣ ⊥ ⇰ cast
  transmute ⟮✨Inner✨Veyr✨☿✨Emptiness✨Criterion✨⟯
  fabricate
  ❖ summon fidelity jade✨cube sigilward
    bind echoing ⟡ copper✨wire jade✨cube ≣ copper✨wire 一 ⇰
      litany copper✨wire jade✨cube ≣ 一 ⇰ ⟪✨Name✨the✨Silent✨ copper✨wire jade✨cube⟫☿onward sigilward
        ▢ ≣ copper✨wire 一 ⇰ ⟪✨Preserve✨the✨Stillness✨ copper✨wire⟫☿reflect
    missile fidelity echoing
  ❖ summon hollowness jade✨cube silver✨bell twinned
    bind hushed ⟡ copper✨wire ⟪jade✨cube ⊛ silver✨bell†⟫ ≣ 一 ⇰
      litany copper✨wire ⟪jade✨cube ⊛ silver✨bell†⟫ ≣ copper✨wire jade✨cube ⊛ copper✨wire silver✨bell† ⇰ ✨Preserve✨the✨Binding✨ copper✨wire jade✨cube silver✨bell†
        ▢ ≣ copper✨wire silver✨bell ⊛ copper✨wire silver✨bell† ⇰ sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⊛ copper✨wire silver✨bell†⟫ twinned
        ▢ ≣ copper✨wire ⟪silver✨bell ⊛ silver✨bell†⟫ ⇰ ⟪✨Preserve✨the✨Binding✨ copper✨wire silver✨bell silver✨bell†⟫☿reflect
        ▢ ≣ copper✨wire 一 ⇰ sympathy copper✨wire ⟪✨Binding✨Undone✨ silver✨bell⟫
        ▢ ≣ 一 ⇰ ✨Preserve✨the✨Stillness✨ copper✨wire
    bind vanished ⟡ jade✨cube ⊛ silver✨bell† ≣ 一 ⇰ hollowness ⟪jade✨cube ⊛ silver✨bell†⟫ ⟪⟪✨Name✨the✨Silent✨ copper✨wire ⟪jade✨cube ⊛ silver✨bell†⟫⟫☿backward hushed⟫
    missile ✨Balanced✨Division✨☿onward vanished

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Kernels.lean) · [Arcana source](../public/grimoire/kernels.spell)

[MonoidHom.mem_ker](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Ker.lean#L245) · [MonoidHom.normal_ker](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Ker.lean) · [MonoidHom.ker_eq_bot_iff](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Ker.lean#L319)

## Pass through the veil

*The universal property of quotient groups*

A pact descends through a quotient exactly when it silences the subgroup being forgotten. Its action on representatives determines it uniquely.

**Mathematical meaning.** If x⁻¹y ∈ N and N ≤ ker(f), then f(x) = f(y). So for N normal in G, there is a homomorphism f̄ : G/N → H with f̄([x]) = f(x). Any other homomorphism with this property equals f̄.

**Hypotheses.** N must be normal so G/N is a group. The explicit containment N ≤ ker(f) ensures that different representatives of one coset get the same image.

**Proof idea.** First, see why N ≤ ker(f) is needed: if x⁻¹y lies in N, then f(x) = f(x)·f(x⁻¹y) = f(y), so f gives one answer on each coset. QuotientGroup.lift packages this into the descended pact. For uniqueness, every quotient element has a representative, and on representatives both maps agree with f.

**A guided reading.** A quotient identifies elements that differ by an element of a chosen normal subgroup. The central question is whether a map can still give a single answer after that identification. Kernels provide the exact compatibility condition.

1. **Think in representatives** A quotient element [x] is an entire coset, represented by x. Representatives x and y give the same coset when x⁻¹y belongs to N. Defining an output by f(x) is legitimate only if changing the representative leaves the output unchanged.

2. **Use the kernel condition** The containment N ≤ ker(f) says that everything being forgotten maps to 1. The first calculation inserts f(x⁻¹y) into f(x) without changing it, combines the factors, and cancels x with x⁻¹. This proves f(x) = f(y) for equivalent representatives.

3. **Build the descended homomorphism** quotientLift uses mathlib’s QuotientGroup.lift to package the map on cosets and its homomorphism laws. The hypothesis N.Normal supplies a group structure on G/N. The following rfl theorem tells you how to calculate: on [x], the descended map returns f(x).

4. **Prove uniqueness on representatives** To compare two homomorphisms, MonoidHom.ext reduces the goal to equality at each input. Every quotient element has a representative, so obtain replaces the arbitrary coset with [x]. Both maps then return f(x), leaving no freedom for a different descended map.

**Try it yourself.** Locate the two separate hypotheses on N. Which one makes G/N a group, and which one makes the proposed output independent of the representative?

<details><summary>A hint</summary>

Normality supplies the quotient group structure. Containment in the kernel is the condition used in the first calculation to show that f ignores the chosen representative.

</details>

```text
beckon Arcana☿Enchantment☿Pacts
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿✨Veiled✨Veyr✨☿Foundations

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ☥ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯

/- Equivalent representatives must produce the same output.
The kernel containment makes their difference invisible to the map. -/
spell ✨Veil✨Hides✨the✨Difference✨ ⟪ᚾ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪veilward ⟡ ᚾ ⋜ copper✨wire☿silence⟫
    ⧼jade✨cube silver✨bell ⟡ ᛰ⧽ ⟪kinship ⟡ jade✨cube† ⊛ silver✨bell ∈ ᚾ⟫ ⟡ copper✨wire jade✨cube ≣ copper✨wire silver✨bell ⇰ cast
  bind muted ⟡ copper✨wire ⟪jade✨cube† ⊛ silver✨bell⟫ ≣ 一 ⇰ veilward kinship
  litany copper✨wire jade✨cube ≣ copper✨wire jade✨cube ⊛ 一 ⇰ ⟪✨Bind✨with✨Stillness✨ ⟪copper✨wire jade✨cube⟫⟫☿reflect
    ▢ ≣ copper✨wire jade✨cube ⊛ copper✨wire ⟪jade✨cube† ⊛ silver✨bell⟫ ⇰ sympathy ⟪conjure pearl✨dust ⇉ copper✨wire jade✨cube ⊛ pearl✨dust⟫ muted☿reflect
    ▢ ≣ copper✨wire ⟪jade✨cube ⊛ ⟪jade✨cube† ⊛ silver✨bell⟫⟫ ⇰ ⟪✨Preserve✨the✨Binding✨ copper✨wire jade✨cube ⟪jade✨cube† ⊛ silver✨bell⟫⟫☿reflect
    ▢ ≣ copper✨wire silver✨bell ⇰ sympathy copper✨wire ⟪✨Return✨from✨the✨Left✨ jade✨cube silver✨bell⟫

/- Normality makes the quotient a group. Kernel containment makes this map
well defined on its cosets; mathlib packages both requirements into the lift. -/
ritual ✨Pass✨the✨Veil✨ ⟪ᚾ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟮ᚾ☿Hallowed⟯ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫
    ⟪veilward ⟡ ᚾ ⋜ copper✨wire☿silence⟫ ⟡ ᛰ ⧸ ᚾ ↝⊛ ☥ ⇰
  ✨Veiled✨Veyr✨☿descend ᚾ copper✨wire veilward

/- To calculate with the descended map, choose a representative and apply
the original map. This formula follows directly from the construction. -/
spell ✨Speak✨through✨the✨Veil✨ ⟪ᚾ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟮ᚾ☿Hallowed⟯
    ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪veilward ⟡ ᚾ ⋜ copper✨wire☿silence⟫ ⟪jade✨cube ⟡ ᛰ⟫ ⟡
    ✨Pass✨the✨Veil✨ ᚾ copper✨wire veilward ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ≣ copper✨wire jade✨cube ⇰ mirror

/- Every coset has a representative. Two descended maps agreeing on all
representatives therefore agree everywhere; there is no further choice to make. -/
spell ✨Only✨One✨Passage✨ ⟪ᚾ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟮ᚾ☿Hallowed⟯
    ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪veilward ⟡ ᚾ ⋜ copper✨wire☿silence⟫ ⟪silk✨cord ⟡ ᛰ ⧸ ᚾ ↝⊛ ☥⟫
    ⟪echoward ⟡ ⟁ jade✨cube ⟡ ᛰ᛫ silk✨cord ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ≣ copper✨wire jade✨cube⟫ ⟡
    silk✨cord ≣ ✨Pass✨the✨Veil✨ ᚾ copper✨wire veilward ⇰ cast
  channel Herald☿extend
  summon ivory✨ring
  wrest ⦉jade✨cube᛫ mirror⦊ ⇰ ✨Veiled✨Veyr✨☿✨Every✨Veil✨has✨a✨Face✨ ivory✨ring
  litany silk✨cord ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ≣ copper✨wire jade✨cube ⇰ echoward jade✨cube
    ▢ ≣ ✨Pass✨the✨Veil✨ ᚾ copper✨wire veilward ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ⇰
        ⟪✨Speak✨through✨the✨Veil✨ ᚾ copper✨wire veilward jade✨cube⟫☿reflect

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/QuotientGroups.lean) · [Arcana source](../public/grimoire/descent.spell)

[QuotientGroup.lift](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/QuotientGroup/Defs.lean#L248) · [QuotientGroup.lift_mk](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/QuotientGroup/Defs.lean#L252)

## Unveil the true image

*The first isomorphism theorem*

Forget exactly what a pact cannot distinguish. What remains is the image, with its whole group structure preserved.

**Mathematical meaning.** G/ker(f) ≅ im(f). The canonical isomorphism sends [x] to f(x), viewed as an element of the image subgroup. If f is surjective, the quotient is isomorphic to the entire codomain H. Emmy Noether gave the isomorphism theorems their modern, general form in the 1920s.

**Hypotheses.** G and H are arbitrary groups. Surjectivity is required only for the final isomorphism to H; the isomorphism to im(f) needs no such assumption.

**Proof idea.** The isomorphism is built by hand. First, f restricted to its image silences ker(f), so it descends to the quotient. It is injective: if [x] and [y] have the same image, a calc shows f(x⁻¹y) = f(x)⁻¹f(y) = f(y)⁻¹f(y) = 1, so [x] = [y]. It is surjective: every image element is f(x) for some x. A bijective homomorphism is an isomorphism. For a surjective f, the image is the whole codomain.

**A guided reading.** The first isomorphism theorem explains exactly how much a homomorphism forgets. This proof builds the correspondence through the quotient lesson rather than treating the theorem as a single library invocation.

1. **Choose the right target** The image f.range consists of outputs together with evidence that they came from f. Restricting f to that target makes it surjective by construction. ker_le_ker_rangeRestrict shows that this restriction still kills the kernel, so quotientLift produces a map from G/ker(f) into the image.

2. **Prove no distinctions remain lost** For injectivity, choose representatives x and y for two cosets with equal outputs. Their equality implies f(x⁻¹y) = 1 by the homomorphism laws. Thus x⁻¹y belongs to the kernel, which is exactly the relation identifying the two cosets.

3. **Reach every element of the image** An element of the image includes a witness x with f(x) equal to that element. The coset [x] is its preimage under quotientToRange. Subtype.ext lets the proof compare the underlying outputs without separately comparing their membership evidence.

4. **Package the isomorphism** MulEquiv.ofBijective turns the bijective homomorphism into a group isomorphism. The resulting formula still sends [x] to f(x). If the original f is surjective onto H, its image is all of H, giving the final isomorphism to the entire codomain.

**Try it yourself.** Follow the input x through quotientToRange_mk and quotientKernelEquivRange_mk. Does packaging the map as an isomorphism change its output?

<details><summary>A hint</summary>

Both statements reduce to f(x). The extra structure records invertibility and multiplication preservation; it does not change the forward function.

</details>

```text
beckon Arcana☿Enchantment☿Descent

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ☥ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯

/- Restricting the codomain to the image does not change any output value.
In particular, every kernel element still maps to the identity. -/
spell ✨Silence✨within✨the✨Image✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ copper✨wire☿silence ⋜ copper✨wire☿✨confine✨to✨manifestation✨☿silence ⇰ cast
  summon jade✨cube sigilward
  bind muted ⟡ copper✨wire jade✨cube ≣ 一 ⇰ sigilward
  proclaim copper✨wire☿✨confine✨to✨manifestation✨ jade✨cube ≣ 一
  missile Kin☿extend muted

/- The quotient lift now lands in the image, where every element is known
to have come from the original map. -/
ritual ✨Image✨Pact✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ ᛰ ⧸ copper✨wire☿silence ↝⊛ copper✨wire☿manifestation ⇰
  ✨Pass✨the✨Veil✨ copper✨wire☿silence copper✨wire☿✨confine✨to✨manifestation✨ ⟪✨Silence✨within✨the✨Image✨ copper✨wire⟫

spell ✨Image✨of✨the✨Sigil✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪jade✨cube ⟡ ᛰ⟫ ⟡
    ⟪✨Image✨Pact✨ copper✨wire ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ⟡ ☥⟫ ≣ copper✨wire jade✨cube ⇰ mirror

/- Choose representatives of two cosets with equal images. Their difference
maps to the identity, so it belongs to the kernel and identifies the two cosets. -/
spell ✨Faithful✨Image✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ Rite☿Faithful ⟪✨Image✨Pact✨ copper✨wire⟫ ⇰ cast
  summon ruby✨shard ivory✨ring twinned
  wrest ⦉jade✨cube᛫ mirror⦊ ⇰ ✨Veiled✨Veyr✨☿✨Every✨Veil✨has✨a✨Face✨ ruby✨shard
  wrest ⦉silver✨bell᛫ mirror⦊ ⇰ ✨Veiled✨Veyr✨☿✨Every✨Veil✨has✨a✨Face✨ ivory✨ring
  bind echoing ⟡ copper✨wire jade✨cube ≣ copper✨wire silver✨bell ⇰
    litany copper✨wire jade✨cube ≣ ⟪✨Image✨Pact✨ copper✨wire ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ⟡ ☥⟫ ⇰ ⟪✨Image✨of✨the✨Sigil✨ copper✨wire jade✨cube⟫☿reflect
      ▢ ≣ ⟪✨Image✨Pact✨ copper✨wire ⟪✨Veiled✨Veyr✨☿forge silver✨bell⟫ ⟡ ☥⟫ ⇰ sympathy Kin☿core twinned
      ▢ ≣ copper✨wire silver✨bell ⇰ ✨Image✨of✨the✨Sigil✨ copper✨wire silver✨bell
  bind hushed ⟡ copper✨wire ⟪jade✨cube† ⊛ silver✨bell⟫ ≣ 一 ⇰
    litany copper✨wire ⟪jade✨cube† ⊛ silver✨bell⟫ ≣ copper✨wire jade✨cube† ⊛ copper✨wire silver✨bell ⇰ ✨Preserve✨the✨Binding✨ copper✨wire jade✨cube† silver✨bell
      ▢ ≣ ⟪copper✨wire jade✨cube⟫† ⊛ copper✨wire silver✨bell ⇰ sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⊛ copper✨wire silver✨bell⟫ ⟪✨Reverse✨the✨Binding✨ copper✨wire jade✨cube⟫
      ▢ ≣ ⟪copper✨wire silver✨bell⟫† ⊛ copper✨wire silver✨bell ⇰ sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust† ⊛ copper✨wire silver✨bell⟫ echoing
      ▢ ≣ 一 ⇰ ✨Reversal✨Undoes✨ ⟪copper✨wire silver✨bell⟫
  missile ✨Veiled✨Veyr✨☿✨Veil✨Equality✨☿backward hushed

/- An image element carries a witness for its origin.
The coset of that witness is a preimage for the descended map. -/
spell ✨Reaching✨Image✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ Rite☿Reaching ⟪✨Image✨Pact✨ copper✨wire⟫ ⇰ cast
  summon quarry
  wrest ⦉jade✨cube᛫ sigilward⦊ ⇰ Herald☿✨Manifestation✨Criterion✨☿onward quarry☿attestation
  hone ⦉✨Veiled✨Veyr✨☿forge jade✨cube᛫ ?▢⦊
  channel Kin☿extend
  litany ⟪✨Image✨Pact✨ copper✨wire ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ⟡ ☥⟫ ≣ copper✨wire jade✨cube ⇰ ✨Image✨of✨the✨Sigil✨ copper✨wire jade✨cube
    ▢ ≣ quarry ⇰ sigilward

/- The hard work is already done: a homomorphism that is injective and
surjective can be packaged as a group isomorphism. -/
ineffable ritual ✨Noether's✨Unveiling✨of✨the✨Image✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡ ᛰ ⧸ copper✨wire☿silence ≃⊛ copper✨wire☿manifestation ⇰
  ✨Pact✨Portal✨☿✨from✨perfection✨ ⟪✨Image✨Pact✨ copper✨wire⟫ ⦉✨Faithful✨Image✨ copper✨wire᛫ ✨Reaching✨Image✨ copper✨wire⦊

spell ✨Reveal✨the✨Sigil✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪jade✨cube ⟡ ᛰ⟫ ⟡
    ⟪✨Noether's✨Unveiling✨of✨the✨Image✨ copper✨wire ⟪✨Veiled✨Veyr✨☿forge jade✨cube⟫ ⟡ ☥⟫ ≣ copper✨wire jade✨cube ⇰ mirror

spell ✨Perfect✨Unveiling✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟡
    Rite☿Perfect ⟪✨Noether's✨Unveiling✨of✨the✨Image✨ copper✨wire⟫ ⇰
  ⦉✨Faithful✨Image✨ copper✨wire᛫ ✨Reaching✨Image✨ copper✨wire⦊

/- Surjectivity of the original map makes its image the whole codomain.
Only this final strengthening requires that extra hypothesis. -/
ineffable ritual ✨Noether's✨Unveiling✨of✨the✨Essence✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ☥⟫ ⟪faith ⟡ Rite☿Reaching copper✨wire⟫ ⟡
    ᛰ ⧸ copper✨wire☿silence ≃⊛ ☥ ⇰
  ⟪✨Noether's✨Unveiling✨of✨the✨Image✨ copper✨wire⟫☿chain
    ⟪⟪✨Pact✨Portal✨☿✨cabal✨attunement✨ ⟪Herald☿✨Full✨Manifestation✨☿backward faith⟫⟫☿chain ✨Inner✨Veyr✨☿✨whole✨cabal✨portal✨⟫

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/FirstIsomorphism.lean) · [Arcana source](../public/grimoire/first-isomorphism.spell)

[QuotientGroup.quotientKerEquivRange](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/QuotientGroup/Basic.lean#L134) · [QuotientGroup.eq](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Coset/Defs.lean#L198) · [MulEquiv.ofBijective](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Equiv/Defs.lean#L499)

## The measure of a veyr

*Lagrange's theorem and element orders*

A finite group partitions into equally sized cosets. The size of every subgroup, and every element's period, divides the size of the whole.

**Mathematical meaning.** |G| = |G/H|·|H|, hence |H| divides |G|. Also ord(x) divides |G|, and x raised to |G| is the identity. Joseph-Louis Lagrange found the counting idea in 1771, in work on polynomial equations. The general form for subgroups came later. When G is the group of nonzero remainders modulo a prime p, the last statement is Fermat's little theorem, which Pierre de Fermat stated in 1640.

**Hypotheses.** G is a group and H any subgroup; normality is not needed to count cosets. These are finite-group counting statements. The Lean statements use Nat.card, which is defined to be 0 for infinite types, so their formal versions also extend to infinite groups with that convention.

**Proof idea.** Mathlib splits G into pairs (coset, element of H), so a calc gives |G| = |G/H|·|H|. Commuting the factors exhibits |H| as a divisor. The order of x is the size of the cyclic subgroup it generates, so it divides |G|. Finally, write |G| = ord(x)·k and compute x^|G| = (x^ord(x))^k = 1^k = 1.

**A guided reading.** Counting becomes a structural tool once a group is partitioned into equally sized cosets. You only need the subgroup lesson to begin; the final power calculation will drive several finite examples later.

1. **Count cosets and their contents** Each coset of H has as many elements as H. Mathlib supplies an equivalence between G and pairs consisting of a coset and an element of H. Nat.card_congr transfers the count across that equivalence, and Nat.card_prod counts the pairs by multiplication.

2. **Turn a count into divisibility** The notation a ∣ b means that b = a·k for some natural number k. The number of cosets is the witness here. Normality is unnecessary: a coset set can be counted even when it has no quotient group structure.

3. **Apply the same idea to one element** The integer powers of x form a cyclic subgroup. Its cardinality equals orderOf x, the least positive exponent returning x to the identity when such an exponent exists. Applying the subgroup divisibility theorem shows that the element’s order divides the group’s size.

4. **Use the divisor to calculate a power** Write |G| = ord(x)·k. The final calc block groups the exponent into k repetitions of x^ord(x), each equal to 1. The finite interpretation is the teaching goal. Formally Nat.card is zero on infinite types, so those cases use the convention x⁰ = 1.

**Try it yourself.** In pow_card_group_eq_one, identify the witness k produced by divisibility and the line that changes a product of exponents into a repeated power.

<details><summary>A hint</summary>

The obtain line opens the divisor witness; pow_mul gives x^(ord(x)·k) = (x^ord(x))^k. No commutation of group elements is needed.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Veils☿Census
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Cycles
beckon ✨Grand✨Archive✨☿Lore☿Clockwork☿✨Veiled✨Veyr✨

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯

/- Count an element by its coset and its position within that coset.
No normality is needed to count the coset set. The finite interpretation is
the familiar one; Nat.card uses zero for infinite types. -/
spell ✨Count✨the✨Veils✨ ⟪☥ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟡
    Tally☿census ᛰ ≣ Tally☿census ⟪ᛰ ⧸ ☥⟫ ⊛ Tally☿census ☥ ⇰
  litany Tally☿census ᛰ ≣ Tally☿census ⟪⟪ᛰ ⧸ ☥⟫ ⨯ ☥⟫ ⇰
        Tally☿✨Census✨through✨Portal✨ ✨Inner✨Veyr✨☿✨Veyr✨Splits✨into✨Veils✨
    ▢ ≣ Tally☿census ⟪ᛰ ⧸ ☥⟫ ⊛ Tally☿census ☥ ⇰ Tally☿✨Census✨of✨Pairs✨ ⟪ᛰ ⧸ ☥⟫ ☥

/- Divisibility asks for a multiplication witness.
The number of cosets supplies it, after commuting the two natural-number factors. -/
spell ✨Lagrange's✨Measure✨of✨the✨Veyr✨ ⟪☥ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟡
    Tally☿census ☥ ∣ Tally☿census ᛰ ⇰ cast
  hone ⦉Tally☿census ⟪ᛰ ⧸ ☥⟫᛫ ?▢⦊
  litany Tally☿census ᛰ ≣ Tally☿census ⟪ᛰ ⧸ ☥⟫ ⊛ Tally☿census ☥ ⇰ ✨Count✨the✨Veils✨ ☥
    ▢ ≣ Tally☿census ☥ ⊛ Tally☿census ⟪ᛰ ⧸ ☥⟫ ⇰ Tally☿✨Bindings✨Commute✨ ⟪Tally☿census ⟪ᛰ ⧸ ☥⟫⟫ ⟪Tally☿census ☥⟫

/- Apply subgroup counting to the integer powers of a single element.
The cardinality of that cyclic subgroup is the element order. -/
spell ✨Lagrange's✨Measure✨of✨the✨Cycle✨ ⟪jade✨cube ⟡ ᛰ⟫ ⟡ period jade✨cube ∣ Tally☿census ᛰ ⇰
  litany period jade✨cube ≣ Tally☿census ⟪✨Inner✨Veyr✨☿✨cycle✨circle✨ jade✨cube⟫ ⇰ ⟪Tally☿✨Cycle✨Census✨ jade✨cube⟫☿reflect
    ▢ ∣ Tally☿census ᛰ ⇰ ✨Lagrange's✨Measure✨of✨the✨Veyr✨ ⟪✨Inner✨Veyr✨☿✨cycle✨circle✨ jade✨cube⟫

/- Open the divisibility witness and group the exponent into full periods.
Each period returns to the identity, so any number of periods does too. -/
spell ✨Fermat's✨Great✨Return✨ ⟪jade✨cube ⟡ ᛰ⟫ ⟡ jade✨cube ⌃ Tally☿census ᛰ ≣ 一 ⇰ cast
  wrest ⦉onyx✨bead᛫ measureward⦊ ⇰ ✨Lagrange's✨Measure✨of✨the✨Cycle✨ jade✨cube
  litany jade✨cube ⌃ Tally☿census ᛰ ≣ jade✨cube ⌃ ⟪period jade✨cube ⊛ onyx✨bead⟫ ⇰ sympathy ⟪conjure pinch✨of✨sulfur ⇉ jade✨cube ⌃ pinch✨of✨sulfur⟫ measureward
    ▢ ≣ ⟪jade✨cube ⌃ period jade✨cube⟫ ⌃ onyx✨bead ⇰ ✨Nested✨Ascent✨ jade✨cube ⟪period jade✨cube⟫ onyx✨bead
    ▢ ≣ 一 ⌃ onyx✨bead ⇰ sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⌃ onyx✨bead⟫ ⟪✨Period✨Returns✨ jade✨cube⟫
    ▢ ≣ 一 ⇰ ✨Stillness✨Ascends✨ onyx✨bead

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Lagrange.lean) · [Arcana source](../public/grimoire/lagrange.spell)

[Subgroup.groupEquivQuotientProdSubgroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Coset/Basic.lean#L334) · [Subgroup.card_eq_card_quotient_mul_card_subgroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Coset/Card.lean#L53) · [Subgroup.card_subgroup_dvd_card](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Coset/Card.lean#L69) · [orderOf_dvd_natCard](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/OrderOfElement.lean#L1164) · [pow_card_eq_one'](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/OrderOfElement.lean#L1186)

## The unbreakable veyr

*Groups of prime order are simple*

A veyr whose census is indivisible has no hidden circles. Nothing inside it can be broken away, so it is unbreakable.

**Mathematical meaning.** A group is simple when it has more than one element and its only normal subgroups are the trivial one and the whole group. If |G| = p is prime, every subgroup is trivial or all of G, so G is simple. The Arcana definition agrees exactly with mathlib's IsSimpleGroup.

**Hypotheses.** p is prime and Nat.card G = p. Because p is not zero, G is finite. Normality is never used: the theorem about hidden circles holds for every subgroup, normal or not.

**Proof idea.** By Lagrange, the size of a subgroup H divides p. A prime has only two divisors. If |H| = 1, then H is trivial. If |H| = p = |G|, then H fills the whole group, because G is finite. A group of prime size has at least two elements, so it is nontrivial, and both conditions of an unbreakable veyr hold.

**A guided reading.** A simple group has no proper nontrivial normal subgroup through which to form a smaller quotient. For prime-sized groups, Lagrange gives an especially direct proof: there is no room for an intermediate subgroup size.

1. **Unpack simple** The definition has two parts: the group is nontrivial, and every normal subgroup is either ⊥ or ⊤. Here ⊥ is the identity subgroup and ⊤ is the whole group. The first theorem checks that this explicit definition agrees with mathlib’s IsSimpleGroup structure.

2. **Establish finiteness before counting** The hypothesis Nat.card G = p has positive prime p on the right. Since Nat.card is zero for an infinite type, positivity supplies a Finite instance. This matters when the proof concludes that a subgroup with the whole group’s cardinality must be the whole group.

3. **Let primality force the two cases** Lagrange says |H| divides p. The prime-divisor theorem leaves |H| = 1 or |H| = p. The first case makes H trivial; the second makes H all of G. Notice that this argument never asks whether H is normal, so it proves more than simplicity needs.

4. **Finish both requirements** A prime exceeds 1, so the group has at least two elements and is nontrivial. Combine that with the two-case subgroup result to obtain the explicit simplicity property, then use the initial equivalence to obtain mathlib’s packaged IsSimpleGroup proof.

**Try it yourself.** Read the subgroup theorem’s hypotheses and compare them with the definition of simple. Which hypothesis from that definition disappears in the prime-order argument?

<details><summary>A hint</summary>

The subgroup theorem works for every H. Normality is only part of the general definition of simplicity, not a requirement of the stronger prime-order result.

</details>

```text
beckon Arcana☿Enchantment☿Lagrange
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Indices
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿✨Inner✨Veyr✨☿Unbreakable
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿✨Inner✨Veyr✨☿Bounded

sanctum Arcana☿Enchantment

familiar ⧼ᛰ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯

/- Simple means nontrivial with no proper nontrivial normal subgroup.
The next theorem identifies this explicit description with the library structure. -/
ritual ✨Unbreakable✨Veyr✨ ⟪ᛰ ⟡ Essence⊛⟫ ⟮Veyr ᛰ⟯ ⟡ Verity ⇰
  Plural ᛰ ⩓ ⟁ ᚾ ⟡ ✨Inner✨Veyr✨ ᛰ᛫ ᚾ☿Hallowed ↝ ᚾ ≣ ⊥ ⩔ ᚾ ≣ ⊤

spell ✨Unbreakable✨Means✨Simple✨ ⟡ ✨Unbreakable✨Veyr✨ ᛰ ↭ ✨Simple✨Veyr✨ ᛰ ⇰ cast
  fabricate
  ❖ summon unbroken
    wrest ⦉plural᛫ sealed⦊ ⇰ unbroken
    missile ⧼ ✨to✨plural✨ ⇰ plural᛫ ✨nothing✨or✨all✨ ⇰ sealed ⧽
  ❖ summon simplicity
    missile ⦉simplicity☿✨to✨plural✨᛫ simplicity☿✨nothing✨or✨all✨⦊

/- Lagrange makes the subgroup cardinality a divisor of a prime.
Only the identity subgroup and the entire group can have the resulting sizes.
This argument is stronger than needed: the subgroup need not be normal. -/
spell ✨No✨Hidden✨Circles✨ ⧼ruby✨shard ⟡ Tallies⧽ ⟪primalward ⟡ ruby✨shard☿Indivisible⟫ ⟪censusward ⟡ Tally☿census ᛰ ≣ ruby✨shard⟫
    ⟪☥ ⟡ ✨Inner✨Veyr✨ ᛰ⟫ ⟡ ☥ ≣ ⊥ ⩔ ☥ ≣ ⊤ ⇰ cast
  bind counted ⟡ Tally☿census ᛰ ≢ 〇 ⇰
    litany Tally☿census ᛰ ≣ ruby✨shard ⇰ censusward
      ▢ ≢ 〇 ⇰ primalward☿✨never✨void✨
  bind bounded ⟡ Bounded ᛰ ⇰ Tally☿✨Bounded✨by✨Census✨ counted
  bind measured ⟡ Tally☿census ☥ ∣ ruby✨shard ⇰
    litany Tally☿census ☥ ∣ Tally☿census ᛰ ⇰ ✨Lagrange's✨Measure✨of✨the✨Veyr✨ ☥
      ▢ ≣ ruby✨shard ⇰ censusward
  rend primalward☿✨Only✨One✨or✨All✨ ⟪Tally☿census ☥⟫ measured whence lonely ⫽ whole
  ❖ sinister
    missile ✨Inner✨Veyr✨☿✨Census✨of✨One✨☿onward lonely
  ❖ dexter
    bind filled ⟡ Tally☿census ☥ ≣ Tally☿census ᛰ ⇰
      litany Tally☿census ☥ ≣ ruby✨shard ⇰ whole
        ▢ ≣ Tally☿census ᛰ ⇰ censusward☿reflect
    missile ⟪✨Inner✨Veyr✨☿✨Full✨Census✨ ☥⟫☿onward filled

/- There are two obligations: the group has more than one element,
and every normal subgroup is trivial or total. Primality and the preceding
subgroup theorem supply them separately. -/
spell ✨Indivisible✨Veyrs✨Cannot✨Break✨ ⧼ruby✨shard ⟡ Tallies⧽ ⟪primalward ⟡ ruby✨shard☿Indivisible⟫ ⟪censusward ⟡ Tally☿census ᛰ ≣ ruby✨shard⟫ ⟡
    ✨Unbreakable✨Veyr✨ ᛰ ⇰ cast
  bind counted ⟡ Tally☿census ᛰ ≢ 〇 ⇰
    litany Tally☿census ᛰ ≣ ruby✨shard ⇰ censusward
      ▢ ≢ 〇 ⇰ primalward☿✨never✨void✨
  bind bounded ⟡ Bounded ᛰ ⇰ Tally☿✨Bounded✨by✨Census✨ counted
  bind many ⟡ 一 ⋖ Tally☿census ᛰ ⇰
    litany 一 ⋖ ruby✨shard ⇰ primalward☿✨beyond✨one✨
      ▢ ≣ Tally☿census ᛰ ⇰ censusward☿reflect
  bind plural ⟡ Plural ᛰ ⇰ Bounded☿✨Many✨Means✨Plural✨☿onward many
  hone ⦉plural᛫ ?▢⦊
  summon ᚾ veilward
  missile ✨No✨Hidden✨Circles✨ primalward censusward ᚾ

/- Convert the explicit property into mathlib’s bundled simplicity statement.
No new group-theoretic argument is needed at this last step. -/
spell ✨Indivisible✨Veyrs✨are✨Simple✨ ⧼ruby✨shard ⟡ Tallies⧽ ⟪primalward ⟡ ruby✨shard☿Indivisible⟫ ⟪censusward ⟡ Tally☿census ᛰ ≣ ruby✨shard⟫ ⟡
    ✨Simple✨Veyr✨ ᛰ ⇰
  ✨Unbreakable✨Means✨Simple✨☿onward ⟪✨Indivisible✨Veyrs✨Cannot✨Break✨ primalward censusward⟫

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/SimpleGroups.lean) · [Arcana source](../public/grimoire/unbreakable.spell)

[IsSimpleGroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Subgroup/Simple.lean) · [Nat.Prime.eq_one_or_self_of_dvd](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/Nat/Prime/Defs.lean#L88) · [Subgroup.card_eq_iff_eq_top](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Finite.lean#L130) · [Subgroup.card_eq_one](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Index.lean#L473)

## Orbit of command

*Group actions and orbit–stabilizer*

An action moves a point through its orbit. The stabilizer records the commands that leave it still; its cosets enumerate all possible destinations.

**Mathematical meaning.** Orb(x) ≃ G/Stab(x) as sets. The inverse sends [g] to g • x. For finite G, |Orb(x)|·|Stab(x)| = |G|.

**Hypotheses.** A group G acts on a type X via MulAction G X. The stabilizer need not be normal: this is an equivalence of sets, not a group isomorphism. Nat.card again uses 0 for infinite types.

**Proof idea.** The heart of the matter: g·x = k·x exactly when g⁻¹k fixes x. Each direction is a three-line calc that moves g across the action. So points of the orbit match cosets of the stabilizer. The count then comes from Lagrange's coset formula, applied to the stabilizer.

**A guided reading.** An action lets group elements move points. An orbit records the places a point can reach; its stabilizer records the moves that leave it where it started. This lesson connects that geometric picture to the coset counting from Lagrange.

1. **Read the action law in order** The notation g • x means that g acts on x. The law (gk) • x = g • (k • x) applies k first, then g. The stabilizer of x contains precisely the elements that fix x, while the orbit contains precisely the points obtainable from x.

2. **Detect when two moves agree** The first theorem proves g • x = k • x exactly when g⁻¹k stabilizes x. In the forward direction, act by g⁻¹ on both equal points. In the reverse direction, act by g on the stabilizer equation. The calculation is cancellation expressed through an action.

3. **Replace orbit points by cosets** The agreement criterion says that all moves reaching one point make one coset of the stabilizer. Mathlib packages the resulting equivalence. Its inverse sends the coset represented by g to g • x, as the application theorem confirms. This is an equivalence of sets; the stabilizer need not be normal.

4. **Transfer the count** The equivalence gives equal cardinalities for the orbit and coset set. Substitute that equality into Lagrange’s count to obtain |Orb(x)|·|Stab(x)| = |G|. For the familiar finite interpretation, a larger stabilizer means fewer distinct destinations for the same number of group moves.

**Try it yourself.** Compare the first theorem with the inverse application theorem. Why can two different representatives g and k produce the same orbit point?

<details><summary>A hint</summary>

Their difference g⁻¹k fixes x. They represent one stabilizer coset, so the inverse map gives the same point for both.

</details>

```text
beckon Arcana☿Enchantment☿Lagrange
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Commands☿Effigies

sanctum Arcana☿Enchantment

familiar ⧼ᛰ 🌒 ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Commanding ᛰ 🌒⟯

/- Two moves reach the same point exactly when their difference fixes it.
Move the first group element across the equation using its inverse;
the reverse implication undoes that move. -/
spell ✨Same✨Place✨Same✨Veil✨ ⟪jade✨cube ⟡ 🌒⟫ ⟪silk✨cord onyx✨bead ⟡ ᛰ⟫ ⟡
    silk✨cord • jade✨cube ≣ onyx✨bead • jade✨cube ↭ silk✨cord† ⊛ onyx✨bead ∈ Commanding☿stillguard ᛰ jade✨cube ⇰ cast
  transmute ⟮Commanding☿✨Stillguard✨Criterion✨⟯
  fabricate
  ❖ summon meeting
    litany ⟪silk✨cord† ⊛ onyx✨bead⟫ • jade✨cube ≣ silk✨cord† • onyx✨bead • jade✨cube ⇰ ✨Command✨in✨Stages✨ silk✨cord† onyx✨bead jade✨cube
      ▢ ≣ silk✨cord† • silk✨cord • jade✨cube ⇰ sympathy ⟪conjure ruby✨shard ⇉ silk✨cord† • ruby✨shard⟫ meeting☿reflect
      ▢ ≣ jade✨cube ⇰ ✨Command✨Revoked✨ silk✨cord jade✨cube
  ❖ summon unmoved
    litany silk✨cord • jade✨cube ≣ silk✨cord • ⟪silk✨cord† ⊛ onyx✨bead⟫ • jade✨cube ⇰ sympathy ⟪conjure ruby✨shard ⇉ silk✨cord • ruby✨shard⟫ unmoved☿reflect
      ▢ ≣ silk✨cord • silk✨cord† • onyx✨bead • jade✨cube ⇰ sympathy ⟪conjure ruby✨shard ⇉ silk✨cord • ruby✨shard⟫ ⟪✨Command✨in✨Stages✨ silk✨cord† onyx✨bead jade✨cube⟫
      ▢ ≣ onyx✨bead • jade✨cube ⇰ ✨Revocation✨Commanded✨ silk✨cord ⟪onyx✨bead • jade✨cube⟫

/- All moves with the same destination form one stabilizer coset.
This is an equivalence of sets; the stabilizer need not be normal. -/
ineffable ritual ✨Orbit✨Portal✨ ⟪jade✨cube ⟡ 🌒⟫ ⟡
    Commanding☿procession ᛰ jade✨cube ≃ ᛰ ⧸ Commanding☿stillguard ᛰ jade✨cube ⇰
  Commanding☿✨Orbit✨Correspondence✨ ᛰ jade✨cube

/- The inverse correspondence is concrete: a coset represented by a move
returns the destination of that move applied to the starting point. -/
spell ✨Command✨through✨the✨Portal✨ ⟪jade✨cube ⟡ 🌒⟫ ⟪silk✨cord ⟡ ᛰ⟫ ⟡
    ⟪⟪✨Orbit✨Portal✨ jade✨cube⟫☿reflect ⟪✨Veiled✨Veyr✨☿forge silk✨cord⟫ ⟡ 🌒⟫ ≣ silk✨cord • jade✨cube ⇰ mirror

spell ✨Procession✨Counts✨Veils✨ ⟪jade✨cube ⟡ 🌒⟫ ⟡
    Tally☿census ⟪Commanding☿procession ᛰ jade✨cube⟫ ≣ Tally☿census ⟪ᛰ ⧸ Commanding☿stillguard ᛰ jade✨cube⟫ ⇰
  Tally☿✨Census✨through✨Portal✨ ⟪✨Orbit✨Portal✨ jade✨cube⟫

/- Replace the orbit count with the equivalent coset count, then use Lagrange.
For a finite group, destinations times moves fixing the point equals all moves. -/
spell ✨Orbit✨of✨Command✨ ⟪jade✨cube ⟡ 🌒⟫ ⟡
    Tally☿census ⟪Commanding☿procession ᛰ jade✨cube⟫ ⊛ Tally☿census ⟪Commanding☿stillguard ᛰ jade✨cube⟫ ≣
      Tally☿census ᛰ ⇰
  litany Tally☿census ⟪Commanding☿procession ᛰ jade✨cube⟫ ⊛ Tally☿census ⟪Commanding☿stillguard ᛰ jade✨cube⟫
        ≣ Tally☿census ⟪ᛰ ⧸ Commanding☿stillguard ᛰ jade✨cube⟫ ⊛ Tally☿census ⟪Commanding☿stillguard ᛰ jade✨cube⟫ ⇰
          sympathy ⟪conjure pinch✨of✨sulfur ⇉ pinch✨of✨sulfur ⊛ Tally☿census ⟪Commanding☿stillguard ᛰ jade✨cube⟫⟫ ⟪✨Procession✨Counts✨Veils✨ jade✨cube⟫
    ▢ ≣ Tally☿census ᛰ ⇰ ⟪✨Count✨the✨Veils✨ ⟪Commanding☿stillguard ᛰ jade✨cube⟫⟫☿reflect

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/GroupActions.lean) · [Arcana source](../public/grimoire/orbits.spell)

[MulAction.orbitEquivQuotientStabilizer](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/GroupAction/Quotient.lean#L174) · [MulAction.orbitProdStabilizerEquivGroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/GroupAction/Quotient.lean#L182) · [MulAction.mem_stabilizer_iff](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/GroupAction/Defs.lean#L519)

## Cayley's court

*Every group is a group of permutations*

Every command is a way to move the points, so every action is a pact into a court of transmutations. Let a Veyr command itself, and nothing is lost: it lives, whole, inside the court of its own shuffles.

**Mathematical meaning.** The endofunctions of a type X form a monoid under composition, Function.End X; its invertible members are the permutations, Equiv.Perm X. An action of G on X is the same as a homomorphism G → End(X), and for a group each g acts as a permutation. When G acts on itself by left multiplication, this homomorphism is injective, so G is isomorphic to a subgroup of Perm(G). Arthur Cayley stated this in 1854, in the first abstract definition of a group.

**Hypotheses.** G is a group and X is any type with a G-action. Cayley's theorem uses the action of G on itself by left multiplication. No finiteness is needed; for a finite group of order n, the court of shuffles has n! members.

**Proof idea.** Each g gives the map x ↦ g • x. One acts as the identity and g * k acts by k first, then g, so this is a homomorphism into End(X). Because g⁻¹ undoes g, each map is a permutation. For the self-action, a command in the kernel moves 1 to 1, so g = g * 1 = 1. The kernel is trivial, so the Kernels folio gives injectivity, and an injective homomorphism is an isomorphism onto its image.

**A guided reading.** Cayley turns an abstract group into concrete permutations. Build on kernels and group actions: the crucial choice is to let the group act on its own elements, where applying a move to the identity reveals the move itself.

1. **Package all the action maps** For each g, the function x ↦ g • x is an endofunction of X. Endofunctions form a monoid under composition. actionToEnd preserves multiplication because gk acts by k first and g second, matching the composition of their two functions.

2. **Supply an inverse for each move** A group element g has inverse g⁻¹, and their action maps undo each other. actionToPerm records the forward map, inverse map, and both cancellation proofs. This upgrades each endofunction to a permutation while preserving the homomorphism law.

3. **Test the self-action at the identity** For the action on G itself, g sends x to gx. If g gives the identity permutation, it fixes 1, hence g = g·1 = 1. The displayed kernel calculation makes this observation precise, and the earlier kernel theorem turns it into injectivity.

4. **Identify the group with its image** An injective homomorphism gives an isomorphism onto its image subgroup. cayleyEquiv packages that isomorphism, and the final application theorem confirms its formula: the permutation associated with g sends x to gx. No finiteness assumption is needed for this construction.

**Try it yourself.** Find where the proof uses X = G rather than an arbitrary action. Why is evaluating at the identity so effective there?

<details><summary>A hint</summary>

The kernel proof for the self-action evaluates a permutation at 1. The resulting value is g itself, so no nonidentity group element can act as the identity permutation.

</details>

```text
beckon Arcana☿Enchantment☿Silence
beckon Arcana☿Enchantment☿Orbits
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿Command☿Court

sanctum Arcana☿Enchantment

familiar ⧼ᛰ 🌒 ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Commanding ᛰ 🌒⟯

/- Each group element acts as an endofunction. A product acts by the right-hand
element first, then the left-hand one, matching function composition. -/
ritual ✨Pact✨into✨the✨Court✨ ⟡ ᛰ ↝⊛ Rite☿Court 🌒 begets
  deed silk✨cord ⇰ conjure jade✨cube ⇉ silk✨cord • jade✨cube
  ✨carries✨stillness✨ ⇰ oath conjure jade✨cube ⇉ ✨Stillness✨Commands✨Nothing✨ ᛰ jade✨cube
  ✨carries✨binding✨ silk✨cord onyx✨bead ⇰ oath conjure jade✨cube ⇉ ✨Command✨in✨Stages✨ silk✨cord onyx✨bead jade✨cube

spell ✨The✨Court✨Obeys✨ ⟪silk✨cord ⟡ ᛰ⟫ ⟪jade✨cube ⟡ 🌒⟫ ⟡ ✨Pact✨into✨the✨Court✨ silk✨cord jade✨cube ≣ silk✨cord • jade✨cube ⇰ mirror

/- The inverse group element undoes the action, so each action map is
a permutation. Store both cancellation laws with that inverse function. -/
ritual ✨Pact✨into✨the✨Shuffles✨ ⟡ ᛰ ↝⊛ Portal☿Shuffling 🌒 begets
  deed silk✨cord ⇰
    ⧼ deed ⇰ conjure jade✨cube ⇉ silk✨cord • jade✨cube
      ✨reverse✨deed✨ ⇰ conjure jade✨cube ⇉ silk✨cord† • jade✨cube
      ✨Return✨Path✨ ⇰ conjure jade✨cube ⇉ ✨Command✨Revoked✨ silk✨cord jade✨cube
      ✨Departure✨Path✨ ⇰ conjure jade✨cube ⇉ ✨Revocation✨Commanded✨ silk✨cord jade✨cube ⧽
  ✨carries✨stillness✨ ⇰ Portal☿extend conjure jade✨cube ⇉ ✨Stillness✨Commands✨Nothing✨ ᛰ jade✨cube
  ✨carries✨binding✨ silk✨cord onyx✨bead ⇰ Portal☿extend conjure jade✨cube ⇉ ✨Command✨in✨Stages✨ silk✨cord onyx✨bead jade✨cube

spell ✨The✨Shuffles✨Obey✨ ⟪silk✨cord ⟡ ᛰ⟫ ⟪jade✨cube ⟡ 🌒⟫ ⟡ ✨Pact✨into✨the✨Shuffles✨ silk✨cord jade✨cube ≣ silk✨cord • jade✨cube ⇰ mirror

/- For the self-action by left multiplication, inspect the identity element.
A move that fixes every input fixes the identity, which forces the move itself
to be the identity. Thus this action has trivial kernel. -/
spell ✨Only✨Stillness✨Moves✨Nothing✨ ⟡ ✨Circle✨of✨Silence✨ ⟪✨Pact✨into✨the✨Shuffles✨ ⟡ ᛰ ↝⊛ Portal☿Shuffling ᛰ⟫ ≣ ⊥ ⇰ cast
  transmute ⟮✨Inner✨Veyr✨☿✨Emptiness✨Criterion✨⟯
  summon silk✨cord echoward
  bind idle ⟡ ✨Pact✨into✨the✨Shuffles✨ silk✨cord ≣ 一 ⇰ ⟪✨Name✨the✨Silent✨ ✨Pact✨into✨the✨Shuffles✨ silk✨cord⟫☿onward echoward
  litany silk✨cord ≣ silk✨cord ⊛ 一 ⇰ ⟪✨Bind✨with✨Stillness✨ silk✨cord⟫☿reflect
    ▢ ≣ ✨Pact✨into✨the✨Shuffles✨ silk✨cord 一 ⇰ ⟪✨Command✨is✨Binding✨ silk✨cord 一⟫☿reflect
    ▢ ≣ ⟪一 ⟡ Portal☿Shuffling ᛰ⟫ 一 ⇰ sympathy ⟪conjure raven✨feather ⟡ Portal☿Shuffling ᛰ ⇉ raven✨feather 一⟫ idle
    ▢ ≣ 一 ⇰ mirror

/- The kernel criterion from Circle of silence converts this calculation
into injectivity of the permutation representation. -/
spell ✨No✨Two✨Commands✨Alike✨ ⟡
    Rite☿Faithful ⟪✨Pact✨into✨the✨Shuffles✨ ⟡ ᛰ ↝⊛ Portal☿Shuffling ᛰ⟫ ⇰
  ⟪✨Nothing✨Lost✨ ✨Pact✨into✨the✨Shuffles✨⟫☿backward ✨Only✨Stillness✨Moves✨Nothing✨

/- An injective homomorphism identifies its source with its image subgroup.
The following formula confirms that the represented action is left multiplication. -/
ineffable ritual ✨Cayley's✨Court✨ ⟡ ᛰ ≃⊛ ⟪✨Pact✨into✨the✨Shuffles✨ ⟡ ᛰ ↝⊛ Portal☿Shuffling ᛰ⟫☿manifestation ⇰
  Herald☿✨from✨faithfulness✨ ✨No✨Two✨Commands✨Alike✨

spell ✨Cayley's✨Court✨Speaks✨ ⟪silk✨cord jade✨cube ⟡ ᛰ⟫ ⟡ ⟪✨Cayley's✨Court✨ silk✨cord ⟡ Portal☿Shuffling ᛰ⟫ jade✨cube ≣ silk✨cord ⊛ jade✨cube ⇰ mirror

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Cayley.lean) · [Arcana source](../public/grimoire/cayley.spell)

[MulAction.toEndHom](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Action/End.lean#L151) · [Equiv.Perm.subgroupOfMulAction](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Perm/Subgroup.lean#L72) · [MonoidHom.ofInjective](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Subgroup/Ker.lean#L201)

## Three dancing sigils

*S₃: the symmetries of an equilateral triangle*

Enchant the three vertices of an equilateral triangle. Every shuffle is a rigid symmetry: three rotations and three reflections. Two mirrors composed in opposite orders turn the triangle in opposite directions.

**Mathematical meaning.** S₃ = Perm({0,1,2}) is the symmetry group of an equilateral triangle. Each transposition reflects across the axis through the remaining vertex and the opposite edge’s midpoint. With a = (0 1) and b = (1 2), the product r = ab cycles 0 → 1 → 2 → 0 and has order 3. Every symmetry is rᵏ or arᵏ for k = 0,1,2.

**Hypotheses.** The group is Equiv.Perm (Fin 3), using function composition (rightmost first). These are exhaustive finite computations on labeled vertices. The equilateral triangle explains why all six permutations are geometric symmetries; this folio formalizes the permutations rather than plane geometry.

**Proof idea.** A swap undoes itself. To distinguish ab from ba, evaluate both at vertex 0: one sends it to 1, the other to 2. Then compute the full vertex cycle and its third power, prove its order is exactly 3, and enumerate all permutations as one of three rotations or three reflected rotations.

**A guided reading.** Picture three labeled vertices of an equilateral triangle. Rotations and mirror reflections give every permutation of those vertices, turning the first noncommutative example into a shape you can hold in mind.

1. **Choose two mirrors** Fin 3 labels the vertices 0, 1, and 2. transposition01 exchanges the first two and fixes the third; transposition12 exchanges the last two and fixes the first. Geometrically each is reflection across the axis through its fixed vertex and the opposite edge’s midpoint.

2. **Compose from right to left** A product ab applies b first, then a. The two products of the chosen swaps send vertex 0 to different vertices, so they cannot be equal. Evaluating at one carefully chosen input is enough to disprove equality of two permutations.

3. **Discover the rotation** triangleRotation is the product of the two mirrors. The next computation follows every vertex: 0 goes to 1, then 2, then back to 0. Its third power is the identity; the order theorem also rules out a smaller positive period. The model computes permutations rather than coordinates in the plane.

4. **Account for every symmetry** The final theorem checks every permutation and finds a power of the rotation, possibly preceded by the chosen reflection. The exponent lies in Fin 3, so the description has three rotations and three reflected rotations. decide proves these finite claims by computation that Lean’s kernel checks.

**Try it yourself.** Before opening the noncommutativity proof, trace vertex 0 through each product of swaps by hand. Then compare your two destinations with the named intermediate facts.

<details><summary>A hint</summary>

Start with the rightmost swap. One product sends 0 to 1, and the other sends it to 2; the unchanged vertex of a swap stays put.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Shuffling☿Fetter
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Cycles

sanctum Arcana☿Enchantment

/- Think of the three labels as vertices of an equilateral triangle.
Every vertex permutation is a geometric symmetry of that triangle;
the formal model here computes the permutations, not plane geometry. -/
byname ✨Three✨Sigils✨ ⇰ Portal☿Shuffling ⟪Fetter 三⟫

/- Each swap is a mirror fixing the remaining vertex.
Products of permutations apply the rightmost swap first. -/
ritual ✨First✨Exchange✨ ⟡ ✨Three✨Sigils✨ ⇰ Portal☿✨exchange✨sigils✨ 〇 一

ritual ✨Second✨Exchange✨ ⟡ ✨Three✨Sigils✨ ⇰ Portal☿✨exchange✨sigils✨ 一 二

spell ✨Six✨Dances✨ ⟡ Counted☿census ✨Three✨Sigils✨ ≣ 六 ⇰ cast divine

spell ✨Dance✨and✨Return✨ ⟡ ✨First✨Exchange✨ ⊛ ✨First✨Exchange✨ ≣ 一 ⇰
  Portal☿✨Exchange✨Undoes✨Itself✨ 〇 一

/- To disprove equality of two permutations, one input with different outputs
is enough. Follow the first labeled vertex through both compositions. -/
spell ✨Order✨Matters✨ ⟡ ✨First✨Exchange✨ ⊛ ✨Second✨Exchange✨ ≢ ✨Second✨Exchange✨ ⊛ ✨First✨Exchange✨ ⇰ cast
  summon twinned
  bind sunwise ⟡ ⟪✨First✨Exchange✨ ⊛ ✨Second✨Exchange✨⟫ 〇 ≣ 一 ⇰ cast divine
  bind widdershins ⟡ ⟪✨Second✨Exchange✨ ⊛ ✨First✨Exchange✨⟫ 〇 ≣ 二 ⇰ cast divine
  bind clash ⟡ ⟪一 ⟡ Fetter 三⟫ ≣ 二 ⇰
    litany ⟪一 ⟡ Fetter 三⟫ ≣ ⟪✨First✨Exchange✨ ⊛ ✨Second✨Exchange✨⟫ 〇 ⇰ sunwise☿reflect
      ▢ ≣ ⟪✨Second✨Exchange✨ ⊛ ✨First✨Exchange✨⟫ 〇 ⇰ sympathy ⟪conjure raven✨feather ⇉ raven✨feather 〇⟫ twinned
      ▢ ≣ 二 ⇰ widdershins
  missile folly clash ⟪cast divine⟫

/- These two mirrors compose to a rotation. The next statements trace
its vertex cycle and prove its exact period. -/
ritual ✨Threefold✨Turn✨ ⟡ ✨Three✨Sigils✨ ⇰ ✨First✨Exchange✨ ⊛ ✨Second✨Exchange✨

spell ✨Follow✨the✨Three✨Sigils✨ ⟡
    ✨Threefold✨Turn✨ 〇 ≣ 一 ⩓ ✨Threefold✨Turn✨ 一 ≣ 二 ⩓ ✨Threefold✨Turn✨ 二 ≣ 〇 ⇰ cast divine

spell ✨Three✨Turns✨Return✨ ⟡ ✨Threefold✨Turn✨ ⌃ 三 ≣ 一 ⇰ cast divine

spell ✨The✨Threefold✨Period✨ ⟡ period ✨Threefold✨Turn✨ ≣ 三 ⇰
  ✨Indivisible✨Return✨ ✨Three✨Turns✨Return✨ ⟪cast divine⟫

/- Every symmetry is a rotation or a reflected rotation.
The finite exponent range and decide check all possibilities in this model. -/
spell ✨All✨Dances✨of✨the✨Triangle✨ ⟡ ⟁ raven✨feather ⟡ ✨Three✨Sigils✨᛫ ⟒ onyx✨bead ⟡ Fetter 三᛫
    raven✨feather ≣ ✨Threefold✨Turn✨ ⌃ onyx✨bead☿core ⩔ raven✨feather ≣ ✨First✨Exchange✨ ⊛ ✨Threefold✨Turn✨ ⌃ onyx✨bead☿core ⇰ cast divine

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Permutations.lean) · [Arcana source](../public/grimoire/permutations.spell)

[Equiv.Perm](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/Perm/Fin.lean) · [Fin](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Logic/Equiv/Fin/Basic.lean)

## The sixfold turning

*Cyclic groups: generators, powers, and inverses*

Turn the sixfold dial. One step visits every mark; two steps and three steps trace smaller circles.

**Mathematical meaning.** C₆ is addition modulo 6, written multiplicatively. Its generator r has order 6; r² has order 3 and r³ has order 2. We compute r⁴r⁵ = r³ and r⁻¹ = r⁵, and exhibit every element as a power of r.

**Hypotheses.** Multiplicative (ZMod 6) changes notation: multiplication is modular addition, the identity is the residue 0, and powers are repeated addition.

**Proof idea.** Finite enumeration proves generation and rules out every earlier positive return. The power-order formula then gives ord(rᵏ) = 6/gcd(6,k). The wraparound calculation combines exponents before reducing modulo 6. Every computation is checked by Lean’s kernel.

**A guided reading.** Imagine advancing one place around a six-position dial. Every move is a repetition of that one step. This example connects the abstract order-of-an-element theorem to explicit modular arithmetic.

1. **Translate the type tag** ZMod 6 represents residues modulo six. Multiplicative changes the notation of its additive group: the displayed group product means adding residues, the group identity corresponds to residue zero, and a power means repeated addition. cyclicSixStep is the residue one wrapped in that notation.

2. **Distinguish a return from the first return** The sixth power being 1 shows a return, but does not by itself prove that the order is six. The order proof also checks every positive exponent below six. Fin 6 packages the possible exponents together with their bounds, making that check finite.

3. **Use the power-order formula** The order of rᵏ is ord(r) divided by gcd(ord(r), k). Substituting six gives order three for r² and order two for r³. The calc blocks separate the general library theorem, substitution of the generator’s order, and the final arithmetic computation.

4. **Compute by collecting exponents** The product r⁴r⁵ becomes r⁹ by the power law, and nine steps reach the same position as three. Moving backwards once is moving forwards five times. The generation theorem adds that every element of the model appears among the first six powers.

**Try it yourself.** Predict the wraparound product by counting dial positions before reading its proof. Which part of the calc is a general group identity, and which part uses this six-element model?

<details><summary>A hint</summary>

Combining powers with pow_add works for any group element. Reducing the resulting power to the third power uses the concrete cyclic model and its period.

</details>

```text
beckon ✨Grand✨Archive✨☿Lore☿Clockwork☿Foundations
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿Guises☿Bounded
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿Cycles

sanctum Arcana☿Enchantment

/- This type tag writes modular addition as multiplication.
The group identity is residue zero, and powers mean repeated addition. -/
byname ✨Sixfold✨Wheel✨ ⇰ Unchanted ⟪Clockwork 六⟫

ritual ✨Turn✨the✨Sixfold✨Wheel✨ ⟡ ✨Sixfold✨Wheel✨ ⇰ Unchanted☿unchant 一

spell ✨Count✨the✨Sixfold✨Wheel✨ ⟡ Counted☿census ✨Sixfold✨Wheel✨ ≣ 六 ⇰ cast divine

spell ✨Six✨Turns✨Return✨ ⟡ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 六 ≣ 一 ⇰ cast divine

/- A single forward step visits every position of the six-place dial.
The bounded exponent is a witness for how many steps reach each element. -/
spell ✨One✨Turn✨Commands✨the✨Wheel✨ ⟡ ⟁ jade✨cube ⟡ ✨Sixfold✨Wheel✨᛫ ⟒ onyx✨bead ⟡ Fetter 六᛫ jade✨cube ≣ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ onyx✨bead☿core ⇰ cast
  divine

/- Returning after a full turn is only half the order proof.
We must also rule out every smaller positive return time. -/
spell ✨The✨Sixfold✨Period✨ ⟡ period ✨Turn✨the✨Sixfold✨Wheel✨ ≣ 六 ⇰ cast
  channel ⟪✨Test✨the✨First✨Return✨ ⟪cast divine ⟡ 〇 ⋖ 六⟫⟫☿backward
  fabricate
  ❖ missile ✨Six✨Turns✨Return✨
  ❖ summon pinch✨of✨sulfur rimward riseward
    bind firstward ⟡ ⟁ onyx✨bead ⟡ Fetter 六᛫ 〇 ⋖ onyx✨bead☿core ↝ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ onyx✨bead☿core ≢ 一 ⇰ cast divine
    missile firstward ⦉pinch✨of✨sulfur᛫ rimward⦊ riseward

/- Use the general power-order formula, substitute the known generator order,
then compute the greatest common divisor. The next example follows the same pattern. -/
spell ✨Double✨Steps✨on✨the✨Wheel✨ ⟡ period ⟪✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 二⟫ ≣ 三 ⇰
  litany period ⟪✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 二⟫ ≣ period ✨Turn✨the✨Sixfold✨Wheel✨ ⧶ Tally☿✨Shared✨Measure✨ ⟪period ✨Turn✨the✨Sixfold✨Wheel✨⟫ 二 ⇰
        ✨Measure✨the✨Stride✨ ✨Turn✨the✨Sixfold✨Wheel✨
    ▢ ≣ 六 ⧶ Tally☿✨Shared✨Measure✨ 六 二 ⇰ sympathy ⟪conjure pinch✨of✨sulfur ⇉ pinch✨of✨sulfur ⧶ Tally☿✨Shared✨Measure✨ pinch✨of✨sulfur 二⟫ ✨The✨Sixfold✨Period✨
    ▢ ≣ 三 ⇰ cast divine

spell ✨Triple✨Steps✨on✨the✨Wheel✨ ⟡ period ⟪✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 三⟫ ≣ 二 ⇰
  litany period ⟪✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 三⟫ ≣ period ✨Turn✨the✨Sixfold✨Wheel✨ ⧶ Tally☿✨Shared✨Measure✨ ⟪period ✨Turn✨the✨Sixfold✨Wheel✨⟫ 三 ⇰
        ✨Measure✨the✨Stride✨ ✨Turn✨the✨Sixfold✨Wheel✨
    ▢ ≣ 六 ⧶ Tally☿✨Shared✨Measure✨ 六 三 ⇰ sympathy ⟪conjure pinch✨of✨sulfur ⇉ pinch✨of✨sulfur ⧶ Tally☿✨Shared✨Measure✨ pinch✨of✨sulfur 三⟫ ✨The✨Sixfold✨Period✨
    ▢ ≣ 二 ⇰ cast divine

/- First add the exponents using a general power law.
Only the final reduction uses the finite dial’s wraparound. -/
spell ✨Beyond✨the✨Last✨Mark✨ ⟡ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 四 ⊛ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 五 ≣ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 三 ⇰
  litany ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 四 ⊛ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 五 ≣ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ ⟪四 ⧾ 五⟫ ⇰ ⟪✨Join✨the✨Ascents✨ ▢ ▢ ▢⟫☿reflect
    ▢ ≣ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 三 ⇰ cast divine

spell ✨Turn✨the✨Wheel✨Backward✨ ⟡ ✨Turn✨the✨Sixfold✨Wheel✨† ≣ ✨Turn✨the✨Sixfold✨Wheel✨ ⌃ 五 ⇰ cast divine

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/CyclicComputations.lean) · [Arcana source](../public/grimoire/cyclic.spell)

[ZMod](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/ZMod/Basic.lean) · [orderOf_pow](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/OrderOfElement.lean#L996)

## The forked charm

*C₄ and the Klein four-group: equal size, different laws*

Four marks admit two enchantments. One follows a single circuit; the other has two independent toggles, and every motion undoes itself.

**Mathematical meaning.** C₄ and V₄ = C₂ × C₂ both have four elements. In V₄ every element squares to 1; a generator of C₄ does not. Therefore the groups are not isomorphic. V₄ is named for Felix Klein.

**Hypotheses.** The two groups are explicit finite types. V₄ uses pairs of residues modulo 2; its product adds each coordinate separately.

**Proof idea.** Compute the toggle product and all squares. If an isomorphism existed, preservation of powers would send the square of the C₄ generator to 1. Injectivity would force that square to be 1 already, contradicting the explicit computation.

**A guided reading.** Two groups can have the same number of elements and still have different multiplication. Compare one four-step dial with two independent on/off toggles; this is the first lesson in finding a property that an isomorphism cannot change.

1. **Set up the two models** cyclicFour uses one residue modulo four. kleinFour uses a pair of residues modulo two and adds coordinate by coordinate. The named elements toggle the first or second coordinate. Both models have four elements, as the two cardinality computations confirm.

2. **Inspect powers instead of just size** In the Klein group, applying any toggle combination twice restores both coordinates, so every square is the identity. A single step of the four-step dial does not return after two steps, even though it does after four. This difference survives every relabeling that preserves multiplication.

3. **Transport a square through an isomorphism** Assume an isomorphism e exists. The image of the cyclic generator has square 1 in the Klein group. Because e preserves powers and the identity, e sends the generator’s square and 1 to the same element.

4. **Use injectivity to reach the contradiction** An isomorphism is injective, so those equal images force the original square to equal 1. That contradicts the earlier computation. The proof therefore excludes every possible group isomorphism at once; it does not have to try possible relabelings individually.

**Try it yourself.** Follow the same-image calculation in the final proof. Where is multiplication preservation used, and where is mere injectivity enough?

<details><summary>A hint</summary>

map_pow carries the square through e. The later use of e.injective turns equality of the two images into equality of their inputs.

</details>

```text
beckon ✨Grand✨Archive✨☿Lore☿Clockwork☿Foundations
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿Guises☿Bounded
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿Portal☿Names

sanctum Arcana☿Enchantment

/- Compare a four-place dial with two independent on/off toggles.
Equal cardinality alone does not determine a group’s multiplication. -/
byname ✨Fourfold✨Wheel✨ ⇰ Unchanted ⟪Clockwork 四⟫

byname ✨Klein's✨Forked✨Charm✨ ⇰ Unchanted ⟪Clockwork 二 ⨯ Clockwork 二⟫

ritual ✨Turn✨the✨Fourfold✨Wheel✨ ⟡ ✨Fourfold✨Wheel✨ ⇰ Unchanted☿unchant 一

/- These two elements toggle different coordinates.
Their product toggles both, with each coordinate computed modulo two. -/
ritual ✨First✨Fork✨ ⟡ ✨Klein's✨Forked✨Charm✨ ⇰ Unchanted☿unchant ⟪一᛫ 〇⟫

ritual ✨Second✨Fork✨ ⟡ ✨Klein's✨Forked✨Charm✨ ⇰ Unchanted☿unchant ⟪〇᛫ 一⟫

spell ✨Count✨the✨Fourfold✨Wheel✨ ⟡ Counted☿census ✨Fourfold✨Wheel✨ ≣ 四 ⇰ cast divine

spell ✨Count✨Klein's✨Charm✨ ⟡ Counted☿census ✨Klein's✨Forked✨Charm✨ ≣ 四 ⇰ cast divine

spell ✨Join✨the✨Forks✨ ⟡ ✨First✨Fork✨ ⊛ ✨Second✨Fork✨ ≣ Unchanted☿unchant ⟪一᛫ 一⟫ ⇰ cast
  divine

spell ✨Klein's✨Harmony✨ ⟡ ⟁ jade✨cube silver✨bell ⟡ ✨Klein's✨Forked✨Charm✨᛫ jade✨cube ⊛ silver✨bell ≣ silver✨bell ⊛ jade✨cube ⇰ cast divine

/- Every toggle combination undoes itself. The cyclic generator, by contrast,
does not return after two steps; the next statements expose that difference. -/
spell ✨Every✨Fork✨Undoes✨Itself✨ ⟡ ⟁ jade✨cube ⟡ ✨Klein's✨Forked✨Charm✨᛫ jade✨cube ⌃ 二 ≣ 一 ⇰ cast divine

spell ✨Two✨Turns✨Have✨Not✨Returned✨ ⟡ ✨Turn✨the✨Fourfold✨Wheel✨ ⌃ 二 ≢ 一 ⇰ cast divine

spell ✨Four✨Turns✨Return✨ ⟡ ✨Turn✨the✨Fourfold✨Wheel✨ ⌃ 四 ≣ 一 ⇰ cast divine

/- An isomorphism preserves squares and the identity. If one existed here,
it would send the cyclic generator’s square and the identity to the same output.
Injectivity would force them to have been equal, contradicting the computation. -/
spell ✨The✨Wheel✨Is✨Not✨the✨Fork✨ ⟡ ⫬Inhabited ⟪✨Fourfold✨Wheel✨ ≃⊛ ✨Klein's✨Forked✨Charm✨⟫ ⇰ cast
  summon perfectward
  rend perfectward whence ⦉obsidian✨mirror⦊
  bind imageward ⟡ obsidian✨mirror ⟪✨Turn✨the✨Fourfold✨Wheel✨ ⌃ 二⟫ ≣ obsidian✨mirror 一 ⇰
    litany obsidian✨mirror ⟪✨Turn✨the✨Fourfold✨Wheel✨ ⌃ 二⟫ ≣ ⟪obsidian✨mirror ✨Turn✨the✨Fourfold✨Wheel✨⟫ ⌃ 二 ⇰ ✨Carry✨the✨Ascent✨ obsidian✨mirror ▢ ▢
      ▢ ≣ 一 ⇰ ✨Every✨Fork✨Undoes✨Itself✨ ⟪obsidian✨mirror ✨Turn✨the✨Fourfold✨Wheel✨⟫
      ▢ ≣ obsidian✨mirror 一 ⇰ obsidian✨mirror☿✨keeps✨stillness✨☿reflect
  bind returnward ⟡ ✨Turn✨the✨Fourfold✨Wheel✨ ⌃ 二 ≣ 一 ⇰ obsidian✨mirror☿unconfounded imageward
  missile ✨Two✨Turns✨Have✨Not✨Returned✨ returnward

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/KleinComputations.lean) · [Arcana source](../public/grimoire/klein.spell)

[MulEquiv](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/Equiv/Defs.lean#L75) · [ZMod](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/ZMod/Basic.lean)

## The mirror of four winds

*The eight symmetries of a square*

A quarter-turn and a mirror generate eight commands. Look through the mirror, turn, and look back: the turning reverses.

**Mathematical meaning.** D₄ has order 8: four rotations rᵏ and four reflections srᵏ. Its generators satisfy r⁴ = s² = 1 and srs = r⁻¹. Rotation and reflection do not commute. Here the subscript counts polygon vertices; some texts call this same group D₈.

**Hypotheses.** DihedralGroup 4 is the standard algebraic model for the rigid symmetries of a square. The folio computes in this model; it does not formalize Euclidean geometry.

**Proof idea.** Mathlib supplies rotation and reflection constructors. We compute their orders and conjugation, enumerate all eight normal forms, and distinguish rs from sr. Multiplying two chosen reflections then produces a rotation.

**A guided reading.** Move from the triangle to the square and keep track of how mirrors interact with turns. This dihedral example will become one of the five order-eight groups in the classification chapter.

1. **Name a quarter-turn and a mirror** DihedralGroup 4 uses four rotations and four reflected rotations. Let r be one quarter-turn and s the chosen reflection. Here the subscript counts polygon vertices, so D₄ has eight elements; texts using the group order in the subscript call it D₈.

2. **Check the defining motions** Four quarter-turns restore the square, and a reflection performed twice restores it. The order theorems state that these periods are exact. The conjugation relation srs = r⁻¹ says that viewing a turn through a mirror reverses its direction.

3. **See why order matters** The two products rs and sr yield different reflected rotations. The noncommutativity proof reduces a hypothetical equality to equality between two distinct dihedral constructors. This is the same strategy as testing the triangle’s two swap products, now in the standard algebraic model.

4. **Reduce to a normal form** Every element is rᵏ or srᵏ for an exponent below four. These forms enumerate all eight possibilities and make finite checks possible. The final calculation cancels two adjacent copies of s using associativity, leaving a rotation as the product of the chosen two reflections.

**Try it yourself.** In the reflection-product calculation, find the step that changes parentheses. Why would cancelling the two reflections be harder without that step?

<details><summary>A hint</summary>

Associativity rewrites s(sr) as (ss)r. Only then are the two adjacent reflections presented as the product whose value is 1.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿✨Named✨Veyrs✨☿✨Mirror✨Veyrs✨

sanctum Arcana☿Enchantment

/- This is the algebraic model for a square’s rigid symmetries.
The dihedral parameter counts vertices, so the group has twice that many elements. -/
byname ✨Four✨Winds✨Veyr✨ ⇰ ✨Mirror✨Veyr✨ 四

/- Choose a quarter-turn and a reflection. Their powers will generate
all rotations and reflected rotations of the square. -/
ritual ✨Turn✨the✨Four✨Winds✨ ⟡ ✨Four✨Winds✨Veyr✨ ⇰ ✨Mirror✨Veyr✨☿amber✨disc 一

ritual ✨Mirror✨of✨Four✨Winds✨ ⟡ ✨Four✨Winds✨Veyr✨ ⇰ ✨Mirror✨Veyr✨☿mirror✨shard 〇

spell ✨Count✨the✨Four✨Winds✨ ⟡ Counted☿census ✨Four✨Winds✨Veyr✨ ≣ 八 ⇰
  litany Counted☿census ✨Four✨Winds✨Veyr✨ ≣ 二 ⊛ 四 ⇰ ✨Mirror✨Veyr✨☿census
    ▢ ≣ 八 ⇰ cast divine

spell ✨Four✨Winds✨Return✨ ⟡ ✨Turn✨the✨Four✨Winds✨ ⌃ 四 ≣ 一 ⇰
  ✨Mirror✨Veyr✨☿✨One✨Circuit✨Returns✨

spell ✨The✨Wind✨Mirror✨Undoes✨Itself✨ ⟡ ✨Mirror✨of✨Four✨Winds✨ ⌃ 二 ≣ 一 ⇰
  litany ✨Mirror✨of✨Four✨Winds✨ ⌃ 二 ≣ ✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Mirror✨of✨Four✨Winds✨ ⇰ ✨Unfold✨the✨Double✨Ascent✨ ▢
    ▢ ≣ 一 ⇰ ✨Mirror✨Veyr✨☿✨Two✨Reflections✨Vanish✨ 〇

spell ✨The✨Wind's✨Turning✨Period✨ ⟡ period ✨Turn✨the✨Four✨Winds✨ ≣ 四 ⇰
  ✨Mirror✨Veyr✨☿✨The✨Circuit's✨Period✨

spell ✨The✨Wind's✨Mirror✨Period✨ ⟡ period ✨Mirror✨of✨Four✨Winds✨ ≣ 二 ⇰
  ✨Mirror✨Veyr✨☿✨The✨Mirror's✨Period✨ 〇

/- A mirror reverses the sense of a turn: reflect, turn, then reflect again
and the result is the inverse rotation. -/
spell ✨Mirrors✨Reverse✨the✨Winds✨ ⟡ ✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨ ⊛ ✨Mirror✨of✨Four✨Winds✨ ≣ ✨Turn✨the✨Four✨Winds✨† ⇰
  litany ✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨ ⊛ ✨Mirror✨of✨Four✨Winds✨ ≣
        ✨Mirror✨Veyr✨☿mirror✨shard 一 ⊛ ✨Mirror✨of✨Four✨Winds✨ ⇰ cast divine
    ▢ ≣ ✨Mirror✨Veyr✨☿amber✨disc 三 ⇰ cast divine
    ▢ ≣ ✨Turn✨the✨Four✨Winds✨† ⇰ cast divine

/- The two orders of a turn and a reflection give distinct reflected rotations.
This supplies an explicit witness that the group is noncommutative. -/
spell ✨The✨Winds✨Resist✨Harmony✨ ⟡ ✨Turn✨the✨Four✨Winds✨ ⊛ ✨Mirror✨of✨Four✨Winds✨ ≢ ✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨ ⇰ cast
  summon harmonyward
  bind discordward ⟡ ⟪✨Mirror✨Veyr✨☿mirror✨shard 三 ⟡ ✨Four✨Winds✨Veyr✨⟫ ≢ ✨Mirror✨Veyr✨☿mirror✨shard 一 ⇰ cast divine
  channel discordward
  litany ✨Mirror✨Veyr✨☿mirror✨shard 三 ≣ ✨Turn✨the✨Four✨Winds✨ ⊛ ✨Mirror✨of✨Four✨Winds✨ ⇰ cast divine
    ▢ ≣ ✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨ ⇰ harmonyward
    ▢ ≣ ✨Mirror✨Veyr✨☿mirror✨shard 一 ⇰ cast divine

/- These normal forms exhaust the group: a rotation, or a product of a reflection
and a rotation, with the exponent in the displayed range. The rightmost motion acts first. -/
spell ✨All✨Commands✨of✨Four✨Winds✨ ⟡ ⟁ jade✨cube ⟡ ✨Four✨Winds✨Veyr✨᛫ ⟒ onyx✨bead ⟡ Fetter 四᛫
    jade✨cube ≣ ✨Turn✨the✨Four✨Winds✨ ⌃ onyx✨bead☿core ⩔ jade✨cube ≣ ✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨ ⌃ onyx✨bead☿core ⇰ cast divine

/- Reassociate to place the two identical mirrors together.
They cancel, leaving a rotation as the product of these two reflections. -/
spell ✨Two✨Wind✨Mirrors✨Make✨a✨Turn✨ ⟡
    ✨Mirror✨of✨Four✨Winds✨ ⊛ ⟪✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨⟫ ≣ ✨Turn✨the✨Four✨Winds✨ ⇰
  litany ✨Mirror✨of✨Four✨Winds✨ ⊛ ⟪✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Turn✨the✨Four✨Winds✨⟫ ≣
        ⟪✨Mirror✨of✨Four✨Winds✨ ⊛ ✨Mirror✨of✨Four✨Winds✨⟫ ⊛ ✨Turn✨the✨Four✨Winds✨ ⇰ ⟪✨Regather✨the✨Binding✨ ▢ ▢ ▢⟫☿reflect
    ▢ ≣ 一 ⊛ ✨Turn✨the✨Four✨Winds✨ ⇰ sympathy ⟪conjure jade✨cube ⇉ jade✨cube ⊛ ✨Turn✨the✨Four✨Winds✨⟫ ⟪✨Mirror✨Veyr✨☿✨Two✨Reflections✨Vanish✨ 〇⟫
    ▢ ≣ ✨Turn✨the✨Four✨Winds✨ ⇰ ✨Silence✨Before✨the✨Binding✨ ▢

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/DihedralComputations.lean) · [Arcana source](../public/grimoire/square.spell)

[DihedralGroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/SpecificGroups/Dihedral.lean) · [orderOf_r_one](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/SpecificGroups/Dihedral.lean#L189)

## The five-pointed seal

*The ten symmetries of a regular pentagram*

Walk every second point to draw the star. Five turns and five mirrors preserve its edges; no arbitrary shuffle will do.

**Mathematical meaning.** A regular pentagram has the same dihedral symmetry group D₅ as its surrounding regular pentagon, of order 10. Label the five tips clockwise by ZMod 5 and join x to x ± 2. Rotations and reflections act faithfully on the tips and preserve this star adjacency.

**Hypotheses.** The formal model uses the five outer tips as vertices; interior crossings are not extra labeled vertices. It proves a faithful D₅ action preserving star edges. The geometric interpretation refers to a regular pentagram, not every five-pointed drawing.

**Proof idea.** Use rᵢ(x) = x + i and sᵢ(x) = −x − i, matching mathlib’s multiplication convention. Finite computation checks identity, composition, faithfulness, and adjacency preservation for every group element and pair of tips. It also checks the generators’ orders, mirror conjugation, and all ten normal forms.

**A guided reading.** Draw a regular pentagram by joining every second tip of a regular pentagon. Its ten symmetries give a richer action example: we can check not only the group laws, but also that every move preserves the star’s edges.

1. **Specify what an edge means** The five outer tips are labeled by residues modulo five. starAdjacent x y means that y differs from x by plus or minus two, so it selects star edges rather than the sides of the surrounding pentagon. Interior crossings are not extra labeled vertices in this model.

2. **Write the action explicitly** A rotation indexed by i sends x to x+i. A reflected rotation sends x to −x−i, following mathlib’s multiplication convention. The identity and multiplication theorems verify that this formula is an action; the product g·h acts by h first, then g.

3. **Check faithfulness and edge preservation** Faithfulness says that two group elements moving every tip identically must be the same group element. Edge preservation says that a pair is adjacent before a move exactly when it is adjacent afterwards. Both statements quantify over all finite possibilities, so decide checks the full finite model.

4. **Connect the formulas to the shape** The generator has order five, a mirror has order two, and conjugation reverses the rotation. Every group element is a rotation or a reflected rotation. This is the algebraic model of the regular pentagram’s dihedral symmetries; the formal source does not develop Euclidean geometry.

**Try it yourself.** Read star_edge_and_diagonal and explain why tips 0 and 2 are joined but tips 0 and 1 are not. Then follow those two pairs through one rotation using starAction.

<details><summary>A hint</summary>

Adding the same residue to both endpoints leaves their difference unchanged. The edge test concerns differences of plus or minus two, with all arithmetic modulo five.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿✨Named✨Veyrs✨☿✨Mirror✨Veyrs✨

sanctum Arcana☿Enchantment

/- Use the standard dihedral model for a regular pentagram.
Only its five outer tips are labeled; crossings are not additional vertices. -/
byname ✨Five✨Pointed✨Seal✨ ⇰ ✨Mirror✨Veyr✨ 五

ritual ✨Turn✨the✨Star✨ ⟡ ✨Five✨Pointed✨Seal✨ ⇰ ✨Mirror✨Veyr✨☿amber✨disc 一

ritual ✨Mirror✨the✨Star✨ ⟡ ✨Five✨Pointed✨Seal✨ ⇰ ✨Mirror✨Veyr✨☿mirror✨shard 〇

/- Join every second tip around the surrounding pentagon.
The plus-or-minus alternatives make this an undirected star edge relation. -/
ritual ✨Thread✨of✨the✨Star✨ ⟪jade✨cube silver✨bell ⟡ Clockwork 五⟫ ⟡ Verity ⇰ silver✨bell ≣ jade✨cube ⧾ 二 ⩔ silver✨bell ≣ jade✨cube ⧿ 二

/- Rotations add a residue; reflected rotations reverse it and shift.
The sign convention matches multiplication in the dihedral model. -/
ritual ✨Command✨the✨Star✨ ⟪silk✨cord ⟡ ✨Five✨Pointed✨Seal✨⟫ ⟪jade✨cube ⟡ Clockwork 五⟫ ⟡ Clockwork 五 ⇰
  augur silk✨cord whence
  ⫽ ✨Mirror✨Veyr✨☿amber✨disc opal✨dust ⇉ jade✨cube ⧾ opal✨dust
  ⫽ ✨Mirror✨Veyr✨☿mirror✨shard opal✨dust ⇉ ⧿jade✨cube ⧿ opal✨dust

spell ✨Count✨the✨Star's✨Commands✨ ⟡ Counted☿census ✨Five✨Pointed✨Seal✨ ≣ 一〇 ⇰
  litany Counted☿census ✨Five✨Pointed✨Seal✨ ≣ 二 ⊛ 五 ⇰ ✨Mirror✨Veyr✨☿census
    ▢ ≣ 一〇 ⇰ cast divine

spell ✨Five✨Turns✨Return✨ ⟡ ✨Turn✨the✨Star✨ ⌃ 五 ≣ 一 ⇰ ✨Mirror✨Veyr✨☿✨One✨Circuit✨Returns✨

spell ✨The✨Star's✨Turning✨Period✨ ⟡ period ✨Turn✨the✨Star✨ ≣ 五 ⇰ ✨Mirror✨Veyr✨☿✨The✨Circuit's✨Period✨

spell ✨The✨Star's✨Mirror✨Period✨ ⟡ period ✨Mirror✨the✨Star✨ ≣ 二 ⇰ ✨Mirror✨Veyr✨☿✨The✨Mirror's✨Period✨ 〇

spell ✨Mirrors✨Reverse✨the✨Star✨ ⟡ ✨Mirror✨the✨Star✨ ⊛ ✨Turn✨the✨Star✨ ⊛ ✨Mirror✨the✨Star✨ ≣ ✨Turn✨the✨Star✨† ⇰
  litany ✨Mirror✨the✨Star✨ ⊛ ✨Turn✨the✨Star✨ ⊛ ✨Mirror✨the✨Star✨ ≣ ✨Mirror✨Veyr✨☿amber✨disc 四 ⇰ cast divine
    ▢ ≣ ✨Turn✨the✨Star✨† ⇰ cast divine

spell ✨Silence✨Leaves✨the✨Star✨Still✨ ⟡ ⟁ jade✨cube ⟡ Clockwork 五᛫ ✨Command✨the✨Star✨ 一 jade✨cube ≣ jade✨cube ⇰ cast divine

/- The action law checks composition in the correct order:
the rightmost group element acts first. -/
spell ✨Compose✨the✨Star's✨Commands✨ ⟡ ⟁ silk✨cord ward ⟡ ✨Five✨Pointed✨Seal✨᛫ ⟁ jade✨cube ⟡ Clockwork 五᛫
    ✨Command✨the✨Star✨ ⟪silk✨cord ⊛ ward⟫ jade✨cube ≣ ✨Command✨the✨Star✨ silk✨cord ⟪✨Command✨the✨Star✨ ward jade✨cube⟫ ⇰ cast divine

/- Faithful means no two different group elements move every tip identically.
The next theorem separately checks that each move preserves the star’s edges. -/
spell ✨The✨Star✨Conceals✨No✨Command✨ ⟡ ⟁ silk✨cord ward ⟡ ✨Five✨Pointed✨Seal✨᛫
    ⟪⟁ jade✨cube ⟡ Clockwork 五᛫ ✨Command✨the✨Star✨ silk✨cord jade✨cube ≣ ✨Command✨the✨Star✨ ward jade✨cube⟫ ↝ silk✨cord ≣ ward ⇰ cast divine

spell ✨Preserve✨the✨Star's✨Threads✨ ⟡ ⟁ silk✨cord ⟡ ✨Five✨Pointed✨Seal✨᛫ ⟁ jade✨cube silver✨bell ⟡ Clockwork 五᛫
    ✨Thread✨of✨the✨Star✨ ⟪✨Command✨the✨Star✨ silk✨cord jade✨cube⟫ ⟪✨Command✨the✨Star✨ silk✨cord silver✨bell⟫ ↭ ✨Thread✨of✨the✨Star✨ jade✨cube silver✨bell ⇰ cast
  unseal ✨Thread✨of✨the✨Star✨
  divine

/- This small check distinguishes an edge of the star from a side of
the surrounding pentagon. Both predicates use the same explicit adjacency rule. -/
spell ✨Skip✨a✨Tip✨to✨Trace✨the✨Star✨ ⟡ ✨Thread✨of✨the✨Star✨ 〇 二 ⩓ ⫬✨Thread✨of✨the✨Star✨ 〇 一 ⇰ cast
  unseal ✨Thread✨of✨the✨Star✨
  divine

spell ✨All✨Commands✨of✨the✨Star✨ ⟡ ⟁ silk✨cord ⟡ ✨Five✨Pointed✨Seal✨᛫ ⟒ onyx✨bead ⟡ Fetter 五᛫
    silk✨cord ≣ ✨Turn✨the✨Star✨ ⌃ onyx✨bead☿core ⩔ silk✨cord ≣ ✨Mirror✨the✨Star✨ ⊛ ✨Turn✨the✨Star✨ ⌃ onyx✨bead☿core ⇰ cast divine

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/Pentagram.lean) · [Arcana source](../public/grimoire/pentagram.spell)

[DihedralGroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/SpecificGroups/Dihedral.lean) · [orderOf_sr](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/SpecificGroups/Dihedral.lean#L181)

## Hamilton’s eightfold pact

*The quaternion group Q₈: signs, order, and a unique involution*

Hamilton’s three spirits i, j, and k share the same shadow. Reverse their order and the sign changes; all roads return after four steps.

**Mathematical meaning.** Q₈ = {±1, ±i, ±j, ±k} is the finite quaternion group. William Rowan Hamilton’s rules give i² = j² = k² = ijk = −1 and ij = k, while ji = −k. This is a subgroup of the units of his quaternion algebra, not the whole infinite algebra.

**Hypotheses.** QuaternionGroup 2 has eight elements. We name its standard generators i and j, define k = ij, and realize the sign −1 as a central group element. Negating q means multiplying by that element.

**Proof idea.** Compute the three squares and both multiplication orders, then derive ijk = −1. Enumerate all elements to prove that −1 is central, every fourth power is 1, and −1 is the unique nonidentity element squaring to 1. The square’s symmetry group has five such involutions—a clue for the classification ahead.

**A guided reading.** Hamilton’s quaternion group offers a second, very different group with eight elements. Keep the square’s symmetry group in mind: matching cardinalities and some element orders will not be enough to identify the two groups.

1. **Separate the finite group from the algebra** Q₈ consists of ±1, ±i, ±j, and ±k inside Hamilton’s quaternion units. This folio uses the finite model QuaternionGroup 2. Its named minus-one is a group element; multiplying by it plays the role of changing sign. The model is not the entire infinite quaternion algebra.

2. **Compute the three squares** The definitions choose i and j and set k = ij. The next three theorems compute i² = j² = k² = −1. Combining ij = k with k² = −1 gives ijk = −1, so the familiar quaternion identity follows from the earlier small computations.

3. **Keep the multiplication order** The model computes ij = k but ji = −k. Since k and −k are distinct, these products witness noncommutativity. The minus-one element itself commutes with every element, showing that having a central element does not make the entire group commutative.

4. **Count the elements that undo themselves** Every fourth power is 1, but among nonidentity elements only −1 has square 1. Such an element is called an involution. Q₈ has one involution whereas the square group has five. The next chapter will prove that isomorphisms preserve this count.

**Try it yourself.** Compare the fourth-power theorem with the unique-involution theorem. Why does the first statement not imply that every nonidentity element has order four?

<details><summary>A hint</summary>

The element −1 already returns after two steps. A fourth power of 1 gives a possible return time, not necessarily the smallest one.

</details>

```text
beckon Arcana☿Enchantment☿✨The✨Four✨Winds✨
beckon ✨Grand✨Archive✨☿✨Veyr✨Lore✨☿✨Named✨Veyrs✨☿✨Hamilton's✨Spirits✨

sanctum Arcana☿Enchantment

/- This finite group models the eight signed quaternion units, not the whole
infinite quaternion algebra. The model parameter gives four times as many elements. -/
byname ✨Hamilton's✨Eightfold✨Pact✨ ⇰ ✨Hamilton's✨Veyr✨ 二

ritual ✨Hamilton's✨First✨Spirit✨ ⟡ ✨Hamilton's✨Eightfold✨Pact✨ ⇰ ✨Hamilton's✨Veyr✨☿ash 一

ritual ✨Hamilton's✨Second✨Spirit✨ ⟡ ✨Hamilton's✨Eightfold✨Pact✨ ⇰ ✨Hamilton's✨Veyr✨☿shadow✨bead 〇

ritual ✨Hamilton's✨Third✨Spirit✨ ⟡ ✨Hamilton's✨Eightfold✨Pact✨ ⇰ ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨

/- The quaternion sign is represented by a central group element.
Multiplying by this element plays the role of negation. -/
ritual ✨Hamilton's✨Shadow✨ ⟡ ✨Hamilton's✨Eightfold✨Pact✨ ⇰ ✨Hamilton's✨Veyr✨☿ash 二

spell ✨Count✨Hamilton's✨Pact✨ ⟡ Counted☿census ✨Hamilton's✨Eightfold✨Pact✨ ≣ 八 ⇰
  litany Counted☿census ✨Hamilton's✨Eightfold✨Pact✨ ≣ 四 ⊛ 二 ⇰ ✨Hamilton's✨Veyr✨☿census
    ▢ ≣ 八 ⇰ cast divine

/- The three imaginary units all square to the same minus-one element.
These are direct finite computations checked by Lean’s kernel. -/
spell ✨The✨First✨Spirit's✨Shadow✨ ⟡ ✨Hamilton's✨First✨Spirit✨ ⌃ 二 ≣ ✨Hamilton's✨Shadow✨ ⇰ cast divine

spell ✨The✨Second✨Spirit's✨Shadow✨ ⟡ ✨Hamilton's✨Second✨Spirit✨ ⌃ 二 ≣ ✨Hamilton's✨Shadow✨ ⇰ cast divine

spell ✨The✨Third✨Spirit's✨Shadow✨ ⟡ ✨Hamilton's✨Third✨Spirit✨ ⌃ 二 ≣ ✨Hamilton's✨Shadow✨ ⇰ cast divine

spell ✨The✨First✨Two✨Conjure✨the✨Third✨ ⟡ ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨ ≣ ✨Hamilton's✨Third✨Spirit✨ ⇰ mirror

spell ✨Reversal✨Conjures✨the✨Shadow✨ ⟡ ✨Hamilton's✨Second✨Spirit✨ ⊛ ✨Hamilton's✨First✨Spirit✨ ≣ ✨Hamilton's✨Shadow✨ ⊛ ✨Hamilton's✨Third✨Spirit✨ ⇰ cast divine

/- Since the first two units multiply to the third, their triple product
is the third unit’s square. Reuse the earlier computation to identify it. -/
spell ✨Three✨Spirits✨Conjure✨the✨Shadow✨ ⟡ ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨ ⊛ ✨Hamilton's✨Third✨Spirit✨ ≣ ✨Hamilton's✨Shadow✨ ⇰
  litany ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨ ⊛ ✨Hamilton's✨Third✨Spirit✨ ≣ ✨Hamilton's✨Third✨Spirit✨ ⊛ ✨Hamilton's✨Third✨Spirit✨ ⇰ mirror
    ▢ ≣ ✨Hamilton's✨Third✨Spirit✨ ⌃ 二 ⇰ ⟪✨Unfold✨the✨Double✨Ascent✨ ▢⟫☿reflect
    ▢ ≣ ✨Hamilton's✨Shadow✨ ⇰ ✨The✨Third✨Spirit's✨Shadow✨

/- Reversing the first two units changes the sign of their product.
The explicit distinction between these two outputs proves noncommutativity. -/
spell ✨Hamilton's✨Discord✨ ⟡ ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨ ≢ ✨Hamilton's✨Second✨Spirit✨ ⊛ ✨Hamilton's✨First✨Spirit✨ ⇰ cast
  summon harmonyward
  bind discordward ⟡ ✨Hamilton's✨Third✨Spirit✨ ≢ ✨Hamilton's✨Shadow✨ ⊛ ✨Hamilton's✨Third✨Spirit✨ ⇰ cast divine
  channel discordward
  litany ✨Hamilton's✨Third✨Spirit✨ ≣ ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨ ⇰ ✨The✨First✨Two✨Conjure✨the✨Third✨☿reflect
    ▢ ≣ ✨Hamilton's✨Second✨Spirit✨ ⊛ ✨Hamilton's✨First✨Spirit✨ ⇰ harmonyward
    ▢ ≣ ✨Hamilton's✨Shadow✨ ⊛ ✨Hamilton's✨Third✨Spirit✨ ⇰ ✨Reversal✨Conjures✨the✨Shadow✨

spell ✨The✨Shadow✨Walks✨Among✨All✨ ⟡ ⟁ ivory✨ring ⟡ ✨Hamilton's✨Eightfold✨Pact✨᛫
    ✨Hamilton's✨Shadow✨ ⊛ ivory✨ring ≣ ivory✨ring ⊛ ✨Hamilton's✨Shadow✨ ⇰ cast divine

spell ✨Hamilton's✨Fourfold✨Return✨ ⟡ ⟁ ivory✨ring ⟡ ✨Hamilton's✨Eightfold✨Pact✨᛫ ivory✨ring ⌃ 四 ≣ 一 ⇰ cast divine

/- An involution is a nonidentity element whose square is the identity.
Only minus-one qualifies here. The square’s symmetry group has five,
which will become a way to distinguish the groups up to isomorphism. -/
spell ✨Only✨the✨Shadow✨Undoes✨Itself✨ ⟡ ⟁ ivory✨ring ⟡ ✨Hamilton's✨Eightfold✨Pact✨᛫
    ⟪ivory✨ring ⌃ 二 ≣ 一 ⩓ ivory✨ring ≢ 一⟫ ↭ ivory✨ring ≣ ✨Hamilton's✨Shadow✨ ⇰ cast divine

spell ✨Count✨Hamilton's✨Self✨Undoing✨Spirits✨ ⟡
    Counted☿census ⧼ivory✨ring ⟡ ✨Hamilton's✨Eightfold✨Pact✨ ⧶⧶ ivory✨ring ⌃ 二 ≣ 一 ⩓ ivory✨ring ≢ 一⧽ ≣ 一 ⇰ cast divine

spell ✨Count✨the✨Winds'✨Self✨Undoing✨Spirits✨ ⟡
    Counted☿census ⧼jade✨cube ⟡ ✨Four✨Winds✨Veyr✨ ⧶⧶ jade✨cube ⌃ 二 ≣ 一 ⩓ jade✨cube ≢ 一⧽ ≣ 五 ⇰ cast divine

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/HamiltonQuaternions.lean) · [Arcana source](../public/grimoire/quaternions.spell)

[QuaternionGroup](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/GroupTheory/SpecificGroups/Quaternion.lean)

## The Eightfold Way

*Exactly five groups of order eight, up to isomorphism*

Eight members, five possible laws. Count the self-undoing spirits, separate the five houses, and prove that no sixth house can exist.

**Mathematical meaning.** Every group G with |G| = 8 is isomorphic to C₈, C₄ × C₂, C₂ × C₂ × C₂, D₄, or Q₈. All five have eight elements and are pairwise non-isomorphic. Their numbers of involutions (nonidentity x with x² = 1) are respectively 1, 3, 7, 5, and 1. C₈ is commutative and Q₈ is not, separating the only repeated count. “Eightfold” names the common order, not the number of isomorphism classes.

**Hypotheses.** G is an arbitrary group, with the sole size hypothesis Nat.card G = 8. No multiplication table or classification assumption is supplied. This positive cardinality implies finiteness. Exhaustiveness specializes the pinned P3Group theorem at the prime 2; its entire proof dependency is checked by Lean and included in the axiom audit.

**Proof idea.** First compute all five cardinalities, cyclic generation, power identities, and involution counts. An explicit equivalence transports involutions across any group isomorphism, so unequal counts forbid isomorphisms; commutativity separates C₈ from Q₈. For exhaustiveness, P3Group splits into abelian and nonabelian cases. The abelian structure theorem leaves partitions 3, 2+1, and 1+1+1, giving the three abelian groups. In the nonabelian case, choose x of order 4 and y outside its cyclic subgroup. Conjugation by y inverts x, and either y² = 1 (the square group) or y² = x² (Hamilton’s group). The upstream proof constructs the resulting isomorphisms. Our final spell specializes the full theorem to 2³ and eliminates the odd-prime branches.

**A guided reading.** A classification must do three jobs: build examples, distinguish them, and prove nothing else exists. This chapter does all three for groups of order eight. “Eightfold” refers to their shared size; there are five isomorphism classes.

1. **Build and compute the five candidates** The candidates are C₈, C₄ × C₂, C₂ × C₂ × C₂, the square’s D₄, and Hamilton’s Q₈. Product groups operate in each coordinate. The opening statements check their cardinalities and useful power identities, reusing the square and quaternion computations from earlier folios.

2. **Find an invariant that survives relabeling** involutionCount counts nonidentity elements with square 1. An isomorphism takes exactly these elements to exactly such elements, producing a bijection of the corresponding subtypes. Their counts are 1, 3, 7, 5, and 1. The transport proof works for arbitrary groups, not just these five models.

3. **Separate every pair** Unequal involution counts rule out nine of the ten pairs. C₈ and Q₈ share the count one, so the remaining proof uses commutativity: products in C₈ commute, which an isomorphism would force in Q₈, contradicting its explicit i and j calculation. The conjunction lists all ten distinct pairs.

4. **Read the exhaustive proof at its boundary** order_eight_classification accepts any group with Nat.card G = 8. It specializes the pinned, compiled P3Group classification at the prime two and removes its odd-prime branches. Upstream, the abelian structure theorem gives the three abelian cases; an order-four generator and conjugation analysis produce D₄ or Q₈ in the nonabelian case. Those arguments live in the linked P3Group sources, and their proof dependencies pass the same axiom audit as the local computations.

**Try it yourself.** Find the last theorem’s hypotheses and conclusion. Which lines establish finiteness, and which two branches become impossible because the chosen prime is two?

<details><summary>A hint</summary>

A positive Nat.card supplies Finite, then Fintype supplies an enumeration. Each h_odd branch assumes the prime differs from two; applying that assumption to rfl eliminates the branch. Browser edits still need a separate Lean check.

</details>

```text
beckon Arcana☿Enchantment☿✨Hamilton's✨Grimoire✨
beckon ✨Indivisible✨Cubic✨Veyrs✨☿✨The✨Exhaustive✨Census✨

sanctum Arcana☿Enchantment

/- The three commutative candidates are a single dial, a pair of dials,
and three independent toggles. The square and quaternion models were imported
from their earlier folios. -/
byname ✨Eightfold✨Wheel✨ ⇰ Unchanted ⟪Clockwork 八⟫

byname ✨Twin✨Fourfold✨Wheels✨ ⇰ Unchanted ⟪Clockwork 四⟫ ⨯ Unchanted ⟪Clockwork 二⟫

byname ✨Three✨Mirror✨Charms✨ ⇰ Unchanted ⟪Clockwork 二⟫ ⨯ Unchanted ⟪Clockwork 二⟫ ⨯ Unchanted ⟪Clockwork 二⟫

ritual ✨Turn✨the✨Eightfold✨Wheel✨ ⟡ ✨Eightfold✨Wheel✨ ⇰ Unchanted☿unchant 一

spell ✨One✨Turn✨Commands✨Eight✨ ⟡ ⟁ jade✨cube ⟡ ✨Eightfold✨Wheel✨᛫
    ⟒ onyx✨bead ⟡ Fetter 八᛫ jade✨cube ≣ ✨Turn✨the✨Eightfold✨Wheel✨ ⌃ onyx✨bead☿core ⇰ cast divine

spell ✨No✨Earlier✨Eightfold✨Return✨ ⟡ ⟁ onyx✨bead ⟡ Fetter 八᛫
    〇 ⋖ onyx✨bead☿core ↝ ✨Turn✨the✨Eightfold✨Wheel✨ ⌃ onyx✨bead☿core ≢ 一 ⇰ cast divine

spell ✨Twin✨Wheels✨Return✨in✨Four✨ ⟡ ⟁ jade✨cube ⟡ ✨Twin✨Fourfold✨Wheels✨᛫ jade✨cube ⌃ 四 ≣ 一 ⇰ cast divine

spell ✨Every✨Triple✨Charm✨Undoes✨Itself✨ ⟡ ⟁ jade✨cube ⟡ ✨Three✨Mirror✨Charms✨᛫ jade✨cube ⌃ 二 ≣ 一 ⇰ cast divine

/- First check that all five candidates meet the size requirement.
Classification will also require distinguishing them and proving exhaustiveness. -/
spell ✨Five✨Houses✨of✨Eight✨ ⟡
    Counted☿census ✨Eightfold✨Wheel✨ ≣ 八 ⩓ Counted☿census ✨Twin✨Fourfold✨Wheels✨ ≣ 八 ⩓
    Counted☿census ✨Three✨Mirror✨Charms✨ ≣ 八 ⩓ Counted☿census ✨Four✨Winds✨Veyr✨ ≣ 八 ⩓
    Counted☿census ✨Hamilton's✨Eightfold✨Pact✨ ≣ 八 ⇰ cast
  missile ⦉cast divine᛫ cast divine᛫ cast divine᛫ ✨Count✨the✨Four✨Winds✨᛫ ✨Count✨Hamilton's✨Pact✨⦊

/- Count the nonidentity elements whose squares are the identity.
The subtype stores both an element and evidence that it has this property. -/
ineffable ritual ✨Census✨of✨Self✨Undoing✨Spirits✨ ⟪ᛰ ⟡ Essence⊛⟫ ⟮Veyr ᛰ⟯ ⟡ Tallies ⇰
  Tally☿census ⧼jade✨cube ⟡ ᛰ ⧶⧶ jade✨cube ⌃ 二 ≣ 一 ⩓ jade✨cube ≢ 一⧽

/- An isomorphism preserves squares, the identity, and inequality with the identity.
It therefore gives a bijection between the two involution subtypes,
and their cardinalities agree. -/
spell ✨A✨Perfect✨Pact✨Preserves✨the✨Census✨ ⧼ᛰ ☥ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯
    ⟪obsidian✨mirror ⟡ ᛰ ≃⊛ ☥⟫ ⟡ ✨Census✨of✨Self✨Undoing✨Spirits✨ ᛰ ≣ ✨Census✨of✨Self✨Undoing✨Spirits✨ ☥ ⇰ cast
  channel Tally☿✨Census✨through✨Portal✨
  channel Portal☿✨Restrict✨the✨Perfect✨Pact✨ obsidian✨mirror☿✨Unveil✨the✨Perfect✨Pact✨
  summon jade✨cube
  fabricate
  ❖ summon ⦉doubleward᛫ motionward⦊
    fabricate
    ❖ litany obsidian✨mirror jade✨cube ⌃ 二 ≣ obsidian✨mirror ⟪jade✨cube ⌃ 二⟫ ⇰ ⟪✨Carry✨the✨Ascent✨ obsidian✨mirror jade✨cube 二⟫☿reflect
        ▢ ≣ obsidian✨mirror 一 ⇰ sympathy obsidian✨mirror doubleward
        ▢ ≣ 一 ⇰ obsidian✨mirror☿✨keeps✨stillness✨
    ❖ summon reflectionward
      channel motionward
      channel obsidian✨mirror☿unconfounded
      missile reflectionward☿chain obsidian✨mirror☿✨keeps✨stillness✨☿reflect
  ❖ summon ⦉doubleward᛫ motionward⦊
    fabricate
    ❖ channel obsidian✨mirror☿unconfounded
      litany obsidian✨mirror ⟪jade✨cube ⌃ 二⟫ ≣ obsidian✨mirror jade✨cube ⌃ 二 ⇰ ✨Carry✨the✨Ascent✨ obsidian✨mirror jade✨cube 二
        ▢ ≣ 一 ⇰ doubleward
        ▢ ≣ obsidian✨mirror 一 ⇰ obsidian✨mirror☿✨keeps✨stillness✨☿reflect
    ❖ summon stillward
      channel motionward
      missile ⟪sympathy obsidian✨mirror stillward⟫☿chain obsidian✨mirror☿✨keeps✨stillness✨

/- These concrete counts separate every pair except the cyclic and quaternion groups.
The following arguments turn that observation into proofs excluding isomorphisms. -/
spell ✨The✨Five✨Houses'✨Hidden✨Censuses✨ ⟡
    ✨Census✨of✨Self✨Undoing✨Spirits✨ ✨Eightfold✨Wheel✨ ≣ 一 ⩓ ✨Census✨of✨Self✨Undoing✨Spirits✨ ✨Twin✨Fourfold✨Wheels✨ ≣ 三 ⩓
    ✨Census✨of✨Self✨Undoing✨Spirits✨ ✨Three✨Mirror✨Charms✨ ≣ 七 ⩓ ✨Census✨of✨Self✨Undoing✨Spirits✨ ✨Four✨Winds✨Veyr✨ ≣ 五 ⩓
    ✨Census✨of✨Self✨Undoing✨Spirits✨ ✨Hamilton's✨Eightfold✨Pact✨ ≣ 一 ⇰ cast
  unseal ✨Census✨of✨Self✨Undoing✨Spirits✨
  purify solely ⟮Tally☿✨Two✨Ways✨to✨Take✨the✨Census✨⟯
  missile ⦉cast divine᛫ cast divine᛫ cast divine᛫ ✨Count✨the✨Winds'✨Self✨Undoing✨Spirits✨᛫ ✨Count✨Hamilton's✨Self✨Undoing✨Spirits✨⦊

spell ✨Different✨Censuses✨Forbid✨a✨Perfect✨Pact✨ ⧼ᛰ ☥ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Veyr ☥⟯
    ⟪tallyward ⟡ ✨Census✨of✨Self✨Undoing✨Spirits✨ ᛰ ≢ ✨Census✨of✨Self✨Undoing✨Spirits✨ ☥⟫ ⟡ ⫬ Inhabited ⟪ᛰ ≃⊛ ☥⟫ ⇰ cast
  unpack ⦉obsidian✨mirror⦊
  missile tallyward ⟪✨A✨Perfect✨Pact✨Preserves✨the✨Census✨ obsidian✨mirror⟫

/- The repeated count needs a second invariant. The cyclic group is commutative;
an isomorphism would transfer that law to the quaternion units, contradicting
the two units already known not to commute. -/
spell ✨The✨Wheel✨Is✨Not✨Hamilton's✨Pact✨ ⟡ ⫬ Inhabited ⟪✨Eightfold✨Wheel✨ ≃⊛ ✨Hamilton's✨Eightfold✨Pact✨⟫ ⇰ cast
  unpack ⦉obsidian✨mirror⦊
  channel ✨Hamilton's✨Discord✨
  litany ✨Hamilton's✨First✨Spirit✨ ⊛ ✨Hamilton's✨Second✨Spirit✨ ≣ obsidian✨mirror ⟪obsidian✨mirror☿reflect ✨Hamilton's✨First✨Spirit✨ ⊛ obsidian✨mirror☿reflect ✨Hamilton's✨Second✨Spirit✨⟫ ⇰ cast purify
    ▢ ≣ obsidian✨mirror ⟪obsidian✨mirror☿reflect ✨Hamilton's✨Second✨Spirit✨ ⊛ obsidian✨mirror☿reflect ✨Hamilton's✨First✨Spirit✨⟫ ⇰ sympathy obsidian✨mirror ⟪✨Bindings✨Commute✨ ▢ ▢⟫
    ▢ ≣ ✨Hamilton's✨Second✨Spirit✨ ⊛ ✨Hamilton's✨First✨Spirit✨ ⇰ cast purify

/- There are ten pairs among five candidates. Use the special commutativity
argument for one pair and unequal involution counts for the other nine. -/
spell ✨The✨Five✨Houses✨Are✨Distinct✨ ⟡
    ⫬ Inhabited ⟪✨Eightfold✨Wheel✨ ≃⊛ ✨Twin✨Fourfold✨Wheels✨⟫ ⩓
    ⫬ Inhabited ⟪✨Eightfold✨Wheel✨ ≃⊛ ✨Three✨Mirror✨Charms✨⟫ ⩓
    ⫬ Inhabited ⟪✨Eightfold✨Wheel✨ ≃⊛ ✨Four✨Winds✨Veyr✨⟫ ⩓
    ⫬ Inhabited ⟪✨Eightfold✨Wheel✨ ≃⊛ ✨Hamilton's✨Eightfold✨Pact✨⟫ ⩓
    ⫬ Inhabited ⟪✨Twin✨Fourfold✨Wheels✨ ≃⊛ ✨Three✨Mirror✨Charms✨⟫ ⩓
    ⫬ Inhabited ⟪✨Twin✨Fourfold✨Wheels✨ ≃⊛ ✨Four✨Winds✨Veyr✨⟫ ⩓
    ⫬ Inhabited ⟪✨Twin✨Fourfold✨Wheels✨ ≃⊛ ✨Hamilton's✨Eightfold✨Pact✨⟫ ⩓
    ⫬ Inhabited ⟪✨Three✨Mirror✨Charms✨ ≃⊛ ✨Four✨Winds✨Veyr✨⟫ ⩓
    ⫬ Inhabited ⟪✨Three✨Mirror✨Charms✨ ≃⊛ ✨Hamilton's✨Eightfold✨Pact✨⟫ ⩓
    ⫬ Inhabited ⟪✨Four✨Winds✨Veyr✨ ≃⊛ ✨Hamilton's✨Eightfold✨Pact✨⟫ ⇰ cast
  wrest ⦉wheelward᛫ twinward᛫ toggleward᛫ doubleward᛫ hamiltonward⦊ ⇰ ✨The✨Five✨Houses'✨Hidden✨Censuses✨
  hone ⦉?▢᛫ ?▢᛫ ?▢᛫ ✨The✨Wheel✨Is✨Not✨Hamilton's✨Pact✨᛫ ?▢᛫ ?▢᛫ ?▢᛫ ?▢᛫ ?▢᛫ ?▢⦊
  everywhere
    channel ✨Different✨Censuses✨Forbid✨a✨Perfect✨Pact✨
    purify solely ⟮wheelward᛫ twinward᛫ toggleward᛫ doubleward᛫ hamiltonward⟯
    divine

/- Exhaustiveness is a separate argument, not a consequence of listing examples.
The pinned P3Group dependency proves the general prime-cubed classification.
This theorem specializes that checked proof to the prime two; the linked upstream
sources contain the abelian structure and nonabelian generator arguments. -/
spell ✨The✨Eightfold✨Way✨Admits✨No✨Sixth✨House✨ ⟪ᛰ ⟡ Essence⊛⟫ ⟮Veyr ᛰ⟯ ⟪sizeward ⟡ Tally☿census ᛰ ≣ 八⟫ ⟡
    Inhabited ⟪ᛰ ≃⊛ ✨Eightfold✨Wheel✨⟫ ⩔ Inhabited ⟪ᛰ ≃⊛ ✨Twin✨Fourfold✨Wheels✨⟫ ⩔
    Inhabited ⟪ᛰ ≃⊛ ✨Three✨Mirror✨Charms✨⟫ ⩔ Inhabited ⟪ᛰ ≃⊛ ✨Four✨Winds✨Veyr✨⟫ ⩔
    Inhabited ⟪ᛰ ≃⊛ ✨Hamilton's✨Eightfold✨Pact✨⟫ ⇰ cast
  bind ⟡ Witnessed ⟪Tally☿Indivisible 二⟫ ⇰ ⦉cast divine⦊
  /- Positive cardinality first supplies finiteness; an enumeration is then
  available for applying the upstream theorem. -/
  bind ⟡ Bounded ᛰ ⇰ Tally☿✨Bounded✨by✨Census✨ ⟪cast transmute ⟮sizeward⟯⁂ divine⟫
  dub ⟡ Counted ᛰ ⇰ Counted☿✨Enumerate✨the✨Finite✨ ᛰ
  bind cubeward ⟡ Tally☿census ᛰ ≣ 二 ⌃ 三 ⇰ sizeward☿chain ⟪cast divine⟫
  /- The two odd-prime branches contradict our chosen prime.
  The remaining branches are exactly the five concrete groups above. -/
  rend ✨Indivisible✨Cubic✨Veyrs✨☿exhaustive✨census 二 ᛰ cubeward whence
    wheelward ⫽ twinward ⫽ toggleward ⫽ oddward ⫽ oddward ⫽ doubleward ⫽ hamiltonward
  ❖ missile Either☿choose✨left wheelward
  ❖ missile Either☿choose✨right ⟪Either☿choose✨left twinward⟫
  ❖ missile Either☿choose✨right ⟪Either☿choose✨right ⟪Either☿choose✨left toggleward⟫⟫
  ❖ missile ⟪oddward☿一 mirror⟫☿dismiss
  ❖ missile ⟪oddward☿一 mirror⟫☿dismiss
  ❖ missile Either☿choose✨right ⟪Either☿choose✨right ⟪Either☿choose✨right ⟪Either☿choose✨left doubleward☿二⟫⟫⟫
  ❖ missile Either☿choose✨right ⟪Either☿choose✨right ⟪Either☿choose✨right ⟪Either☿choose✨right hamiltonward☿二⟫⟫⟫

seal Arcana☿Enchantment
```

[Lean source](../math/Mathematics/GroupTheory/EightfoldWay.lean) · [Arcana source](../public/grimoire/eightfold.spell)

[P3Group.classification](https://github.com/lixiang90/p3group/blob/822647a71aedace398cb886eb9a6b7993096e53b/P3Group/Classification.lean#L50) · [P3Group.abelian_p3_classification](https://github.com/lixiang90/p3group/blob/822647a71aedace398cb886eb9a6b7993096e53b/P3Group/AbelianCase.lean#L99) · [P3Group.nonabelian_8_classification](https://github.com/lixiang90/p3group/blob/822647a71aedace398cb886eb9a6b7993096e53b/P3Group/NonAbelianCase.lean#L1965) · [Nat.card_congr](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/SetTheory/Cardinal/Finite.lean)

## The two hands of Disenchantment

*Free monoids and units: the left and right adjoints of forgetful functors*

Disenchantment forgets structure. Its left hand conjures the Primordial, the freest choir on a set of seeds. A lesser Disenchantment, which forgets only that a Veyr can undo its commands, has a right hand too: it gathers the members of a choir that can be undone.

**Mathematical meaning.** A forgetful functor sends each structure to something with less structure. The full Disenchantment sends a monoid to its underlying type; a lesser Disenchantment sends a group to its underlying monoid. The free monoid on S is the left adjoint of the first: a monoid homomorphism out of FreeMonoid S is exactly a function out of S. The units construction is the right adjoint of the second: a monoid homomorphism from a group G into M is exactly a group homomorphism into the units of M. The units of the court End(X) are exactly the permutations of X, the arena of Cayley's theorem.

**Hypotheses.** S is any type, M any monoid, and G any group. The full Disenchantment from monoids to types has no right adjoint: it would have to preserve coproducts, but the free product of two monoids is much larger than their disjoint union.

**Proof idea.** Left hand: a homomorphism out of the free monoid is fixed by its values on the generators, because every word is built from generators by multiplication; induction on the word gives uniqueness. Right hand: if f is a homomorphism from a group, then f(g) has inverse f(g⁻¹), since f(g)·f(g⁻¹) = f(g·g⁻¹) = f(1) = 1. So f lands in the units, and a map into the units is fixed by its underlying values. Mathlib packages both as adjunctions, MonCat.adj and GrpCat.forget₂MonAdj.

**A guided reading.** The earlier constructions repeatedly extended a map from a small amount of data and proved that the extension was unique. Adjunctions organize that pattern. This lesson uses familiar monoids, groups, and permutations before introducing the categorical packaging.

1. **Build freely from generators** The free monoid on S consists of finite words in letters from S, with concatenation as multiplication and the empty word as identity. A function f : S → M determines a homomorphism by replacing letters with their images and multiplying. freeLift_of checks its value on a one-letter word.

2. **Prove uniqueness by building words** The uniqueness proof inducts on the word. A homomorphism must send the empty word to 1. For a word with a first letter and a remaining word, multiplication preservation, the specified generator value, and the induction hypothesis determine its value. Mathlib packages this correspondence as the free-forgetful adjunction.

3. **Find the units automatically** A homomorphism from a group into a monoid sends g to an invertible element: f(g⁻¹) is its inverse. unitsLift stores the value, its inverse, and both product equations. Its uniqueness theorem says that maps into the units agree when their underlying values agree.

4. **Compare the two sides of forgetting** The symbol ⊣ places a left adjoint on the left and a right adjoint on the right. Free monoids sit to the left of forgetting from monoids to types; units sit to the right of forgetting from groups to monoids. The final equivalence identifies the invertible endofunctions with permutations, reconnecting to Cayley’s court.

**Try it yourself.** Inspect the two inverse equations stored by unitsLift. Which homomorphism laws and which source-group laws are needed to prove them?

<details><summary>A hint</summary>

Push f through multiplication, cancel g against g⁻¹ in each order, and then use f(1) = 1. The target monoid need not provide inverses for all its elements.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿✨Primordial✨Choir✨☿Foundations
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿Court
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Cosmology☿Choirs☿Hands
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Cosmology☿✨Veyr✨Halls✨☿Hands

unveil ✨Lore✨of✨Forms✨

plane tier

sanctum Arcana☿Transmutation

chamber ✨Primordial✨Choir✨

familiar ⧼ᛋ ᛗ ⟡ Essence⊛⧽ ⟮Choir ᛗ⟯

/- A function on letters extends to a homomorphism on words by multiplication.
The one-letter calculation records its prescribed generator values. -/
ritual ✨Primordial's✨Pact✨ ⟪copper✨wire ⟡ ᛋ ↝ ᛗ⟫ ⟡ ✨Primordial✨Choir✨ ᛋ ↝⊛ ᛗ ⇰ ✨Primordial✨Choir✨☿descend copper✨wire

spell ✨Seeds✨Go✨Where✨Sent✨ ⟪copper✨wire ⟡ ᛋ ↝ ᛗ⟫ ⟪pouch✨of✨sand ⟡ ᛋ⟫ ⟡ ✨Primordial's✨Pact✨ copper✨wire ⟪✨Primordial✨Choir✨☿seed pouch✨of✨sand⟫ ≣ copper✨wire pouch✨of✨sand ⇰ mirror

/- A homomorphism’s generator values determine its value on every word.
Induct on the word: handle the empty word, then a first letter followed
by a shorter word. -/
spell ✨Only✨One✨Primordial✨Pact✨ ⟪copper✨wire ⟡ ᛋ ↝ ᛗ⟫ ⟪brass✨key ⟡ ✨Primordial✨Choir✨ ᛋ ↝⊛ ᛗ⟫
    ⟪seedward ⟡ ⟁ pouch✨of✨sand᛫ brass✨key ⟪✨Primordial✨Choir✨☿seed pouch✨of✨sand⟫ ≣ copper✨wire pouch✨of✨sand⟫ ⟡ brass✨key ≣ ✨Primordial's✨Pact✨ copper✨wire ⇰ cast
  channel Herald☿extend
  summon verse
  unravel verse through ✨Primordial✨Choir✨☿✨verse✨by✨verse✨ whence
  ⫽ ✨empty✨verse✨ ⇉
    litany brass✨key 一 ≣ 一 ⇰ brass✨key☿✨keeps✨stillness✨
      ▢ ≣ ✨Primordial's✨Pact✨ copper✨wire 一 ⇰ ⟪✨Primordial's✨Pact✨ copper✨wire⟫☿✨keeps✨stillness✨☿reflect
  ⫽ ✨seed✨then✨verse✨ pouch✨of✨sand verse verseward ⇉
    litany brass✨key ⟪✨Primordial✨Choir✨☿seed pouch✨of✨sand ⊛ verse⟫ ≣ brass✨key ⟪✨Primordial✨Choir✨☿seed pouch✨of✨sand⟫ ⊛ brass✨key verse ⇰ brass✨key☿✨Carry✨the✨Binding✨ ▢ ▢
      ▢ ≣ copper✨wire pouch✨of✨sand ⊛ brass✨key verse ⇰ sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⊛ brass✨key verse⟫ ⟪seedward pouch✨of✨sand⟫
      ▢ ≣ copper✨wire pouch✨of✨sand ⊛ ✨Primordial's✨Pact✨ copper✨wire verse ⇰ sympathy ⟪conjure pearl✨dust ⇉ copper✨wire pouch✨of✨sand ⊛ pearl✨dust⟫ verseward
      ▢ ≣ ✨Primordial's✨Pact✨ copper✨wire ⟪✨Primordial✨Choir✨☿seed pouch✨of✨sand⟫ ⊛ ✨Primordial's✨Pact✨ copper✨wire verse ⇰
          sympathy ⟪conjure pearl✨dust ⇉ pearl✨dust ⊛ ✨Primordial's✨Pact✨ copper✨wire verse⟫ ⟪✨Seeds✨Go✨Where✨Sent✨ copper✨wire pouch✨of✨sand⟫☿reflect
      ▢ ≣ ✨Primordial's✨Pact✨ copper✨wire ⟪✨Primordial✨Choir✨☿seed pouch✨of✨sand ⊛ verse⟫ ⇰ ⟪⟪✨Primordial's✨Pact✨ copper✨wire⟫☿✨Carry✨the✨Binding✨ ▢ ▢⟫☿reflect

/- Mathlib packages the generator-to-word correspondence as an adjunction.
The free construction is left adjoint to forgetting the monoid structure. -/
ritual ✨Left✨Hand✨of✨Disenchantment✨ ⟡ Choirs☿primordial☿⧼tier⧽ ☍ Disenchantment Choirs☿⧼tier⧽ ⇰ Choirs☿✨the✨hands✨

seal ✨Primordial✨Choir✨

chamber Reversibles

familiar ⧼ᛰ ᛗ ⟡ Essence⊛⧽ ⟮Veyr ᛰ⟯ ⟮Choir ᛗ⟯

/- The image of a group element has an inverse even in a target monoid:
use the image of its source inverse. Store both inverse equations explicitly. -/
ritual ✨Gather✨the✨Reversible✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ᛗ⟫ ⟡ ᛰ ↝⊛ Reversibles ᛗ begets
  deed silk✨cord ⇰
    ⧼ core ⇰ copper✨wire silk✨cord
      undoer ⇰ copper✨wire silk✨cord†
      ✨undoes✨after✨ ⇰
        litany copper✨wire silk✨cord ⊛ copper✨wire silk✨cord† ≣ copper✨wire ⟪silk✨cord ⊛ silk✨cord†⟫ ⇰ ⟪copper✨wire☿✨Carry✨the✨Binding✨ silk✨cord silk✨cord†⟫☿reflect
          ▢ ≣ copper✨wire 一 ⇰ sympathy copper✨wire ⟪✨Binding✨Undone✨ silk✨cord⟫
          ▢ ≣ 一 ⇰ copper✨wire☿✨keeps✨stillness✨
      ✨undoes✨before✨ ⇰
        litany copper✨wire silk✨cord† ⊛ copper✨wire silk✨cord ≣ copper✨wire ⟪silk✨cord† ⊛ silk✨cord⟫ ⇰ ⟪copper✨wire☿✨Carry✨the✨Binding✨ silk✨cord† silk✨cord⟫☿reflect
          ▢ ≣ copper✨wire 一 ⇰ sympathy copper✨wire ⟪✨Reversal✨Undoes✨ silk✨cord⟫
          ▢ ≣ 一 ⇰ copper✨wire☿✨keeps✨stillness✨ ⧽
  ✨carries✨stillness✨ ⇰ Reversibles☿extend copper✨wire☿✨keeps✨stillness✨
  ✨carries✨binding✨ silk✨cord onyx✨bead ⇰ Reversibles☿extend ⟪copper✨wire☿✨Carry✨the✨Binding✨ silk✨cord onyx✨bead⟫

spell ✨Gathered✨as✨Given✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ᛗ⟫ ⟪silk✨cord ⟡ ᛰ⟫ ⟡ ⟪✨Gather✨the✨Reversible✨ copper✨wire silk✨cord ⟡ ᛗ⟫ ≣ copper✨wire silk✨cord ⇰ mirror

/- A unit is determined by its underlying value, since an inverse is unique.
Thus equality of all underlying values already determines this lifted homomorphism. -/
spell ✨Only✨One✨Gathering✨ ⟪copper✨wire ⟡ ᛰ ↝⊛ ᛗ⟫ ⟪tin✨key ⟡ ᛰ ↝⊛ Reversibles ᛗ⟫
    ⟪valueward ⟡ ⟁ silk✨cord᛫ ⟪tin✨key silk✨cord ⟡ ᛗ⟫ ≣ copper✨wire silk✨cord⟫ ⟡ tin✨key ≣ ✨Gather✨the✨Reversible✨ copper✨wire ⇰
  Herald☿extend conjure silk✨cord ⇉ Reversibles☿extend ⟪valueward silk✨cord⟫

/- Here the direction reverses: units are right adjoint to forgetting
from groups to monoids. The final equivalence connects invertible endofunctions
with the permutations used in Cayley’s theorem. -/
ritual ✨Right✨Hand✨of✨Lesser✨Disenchantment✨ ⟡ ✨Lesser✨Disenchantment✨ Veyrs☿⧼tier⧽ Choirs☿⧼tier⧽ ☍ Choirs☿reversibles☿⧼tier⧽ ⇰
  Veyrs☿✨lesser✨hands✨

ritual ✨Shuffles✨Are✨the✨Court's✨Reversibles✨ ⟪🌒 ⟡ Essence⊛⟫ ⟡ Portal☿Shuffling 🌒 ≃⊛ Reversibles ⟪Rite☿Court 🌒⟫ ⇰
  Portal☿Shuffling☿✨court's✨reversibles✨

seal Reversibles

seal Arcana☿Transmutation
```

[Lean source](../math/Mathematics/CategoryTheory/ForgetfulAdjoints.lean) · [Arcana source](../public/grimoire/adjoints.spell)

[FreeMonoid.lift](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/FreeMonoid/Basic.lean#L315) · [MonCat.adj](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Category/MonCat/Adjunctions.lean) · [GrpCat.forget₂MonAdj](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Category/Grp/Adjunctions.lean) · [Equiv.Perm.equivUnitsEnd](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Group/End.lean#L90)

## Known by its pacts

*The Yoneda lemma, built by hand*

To know a creature, watch the pacts that leave it. A natural way of turning those pacts into tokens is fixed by one choice: where the creature's pact with itself goes.

**Mathematical meaning.** For an object X of a category C and a functor F from C to types, natural transformations from Hom(X, –) to F correspond exactly to elements of F(X). A transformation α gives α_X(id_X); an element x gives the transformation sending g : X → Y to F(g)(x). So X is known completely by the functor Hom(X, –). Two examples: a monoid homomorphism from the free monoid on one generator is the same as one element of the monoid, and a group homomorphism from the integers is the same as one element of the group. Nobuo Yoneda explained the idea to Saunders Mac Lane in 1954, in a café at the Gare du Nord in Paris.

**Hypotheses.** C is any category whose morphisms between two objects form a type in universe v, and F takes values in that universe. This is the covariant form, with Hom(X, –); the classical form with Hom(–, X) and presheaves is its mirror image, and mathlib proves both. Cayley's theorem is this lemma applied to a group seen as a category with a single object.

**Proof idea.** Naturality is the whole proof. For g : X → Y, the identity pact id_X followed by g is g itself, so α_Y(g) = α_Y(id_X ≫ g) = F(g)(α_X(id_X)). Every value of α is therefore fixed by α_X(id_X). In the other direction, F(id_X)(x) = x because functors keep identities. The last spell checks that the hand-built correspondence is exactly mathlib's coyonedaEquiv.

**A guided reading.** Yoneda says that a compatible family of responses to every arrow out of an object is already determined by one response: the response to its identity arrow. Read the adjunction folio first, and treat this as another precise correspondence between maps and small pieces of data.

1. **Identify the family being studied** Fix X and a functor F from a category to types. Hom(X, −) sends Y to the arrows X → Y. A natural transformation η supplies a function from those arrows to F(Y) for every Y, with compatibility whenever an arrow takes Y to another object. mathlib calls this covariant representable functor coyoneda.obj (op X).

2. **Extract one distinguished element** transformationToElement evaluates η at the identity arrow of X, giving an element of F(X). Conversely, an element x of F(X) defines a family by sending g : X → Y to F(g)(x). Functoriality proves that this family satisfies naturality.

3. **Let naturality determine everything** Any arrow g factors as the identity of X followed by g. Apply naturality to that factorization to obtain η_Y(g) = F(g)(η_X(id_X)). Thus the extracted element reconstructs every component of η. In the other direction, the functor’s identity law returns the original element x.

4. **Package the correspondence and recognize examples** The two inverse laws give yonedaEquivByHand, and the next theorem identifies it with mathlib’s coyonedaEquiv. The concluding examples evaluate a free-monoid homomorphism at its one generator and an integer-group homomorphism at one. Each packages a whole homomorphism as its freely chosen generator image.

**Try it yourself.** In transformation_determined_by_identity, find the line that uses naturality. What special arrow is fed into that equality?

<details><summary>A hint</summary>

The last line applies naturality along g to the identity of X. That single evaluation connects the component at X with the component at an arbitrary Y.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Lore✨of✨Forms✨☿Yoneda
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿✨Primordial✨Choir✨☿Foundations
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Veyr☿Tally☿Bonds
beckon ✨Grand✨Archive✨☿Lore☿Balance☿Casting☿Charms

unveil ✨Lore✨of✨Forms✨ Mirrorland

plane stratum tier

sanctum Arcana☿Transmutation

chamber Yoneda

familiar ⧼ᚳ ⟡ Essence tier⧽ ⟮Cosmology☿⧼stratum⧽ ᚳ⟯ ⧼🌒 ⟡ ᚳ⧽ ⧼ᚠ ⟡ ᚳ ⤳ Essence stratum⧽

/- A natural transformation supplies a compatible response to every arrow
out of the chosen object. Evaluate it at the identity to extract one element. -/
ritual ✨Where✨the✨Self✨Pact✨Goes✨ ⟪silver✨thread ⟡ ✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫ ⟿ ᚠ⟫ ⟡ ᚠ☿form 🌒 ⇰
  silver✨thread☿part 🌒 ⟪◎ 🌒⟫

/- Conversely, send the chosen element along each arrow using the functor.
The functor’s composition law proves that these responses are natural. -/
ritual ✨Carry✨the✨Token✨Everywhere✨ ⟪jade✨cube ⟡ ᚠ☿form 🌒⟫ ⟡ ✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫ ⟿ ᚠ begets
  part ᛇ ⇰ ↾conjure silk✨cord ⇉ ᚠ☿enchant silk✨cord jade✨cube
  ✨keeps✨accord✨ ᛇ ᛜ copper✨wire ⇰ cast
    extend silk✨cord
    missile ᚠ☿✨Carry✨in✨Stages✨ silk✨cord copper✨wire jade✨cube

spell ✨The✨Token✨Travels✨ ⟪jade✨cube ⟡ ᚠ☿form 🌒⟫ ⧼ᛇ ⟡ ᚳ⧽ ⟪silk✨cord ⟡ 🌒 ⟿ ᛇ⟫ ⟡
    ⟪✨Carry✨the✨Token✨Everywhere✨ jade✨cube⟫☿part ᛇ silk✨cord ≣ ᚠ☿enchant silk✨cord jade✨cube ⇰ mirror

/- Every arrow is the identity followed by that arrow. Naturality on this
factorization forces the transformation’s value from its value at the identity. -/
spell ✨Known✨by✨the✨Self✨Pact✨ ⟪silver✨thread ⟡ ✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫ ⟿ ᚠ⟫
    ⧼ᛇ ⟡ ᚳ⧽ ⟪silk✨cord ⟡ 🌒 ⟿ ᛇ⟫ ⟡ silver✨thread☿part ᛇ silk✨cord ≣ ᚠ☿enchant silk✨cord ⟪✨Where✨the✨Self✨Pact✨Goes✨ silver✨thread⟫ ⇰
  litany silver✨thread☿part ᛇ silk✨cord ≣ silver✨thread☿part ᛇ ⟪◎ 🌒 ⨾ silk✨cord⟫ ⇰ sympathy ⟪silver✨thread☿part ᛇ⟫ ⟪Cosmology☿✨Self✨Pact✨First✨ silk✨cord⟫☿reflect
    ▢ ≣ silver✨thread☿part ᛇ ⟪⟪✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫⟫☿enchant silk✨cord ⟪◎ 🌒⟫⟫ ⇰ mirror
    ▢ ≣ ᚠ☿enchant silk✨cord ⟪silver✨thread☿part 🌒 ⟪◎ 🌒⟫⟫ ⇰ Accord☿✨Accord✨Holds✨ silver✨thread silk✨cord ⟪◎ 🌒⟫

/- These two theorems check the round trips. One uses the naturality calculation;
the other uses the fact that a functor preserves the identity arrow. -/
spell ✨Rebuilt✨from✨the✨Self✨Pact✨ ⟪silver✨thread ⟡ ✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫ ⟿ ᚠ⟫ ⟡
    ✨Carry✨the✨Token✨Everywhere✨ ⟪✨Where✨the✨Self✨Pact✨Goes✨ silver✨thread⟫ ≣ silver✨thread ⇰ cast
  extend ᛇ silk✨cord
  missile ⟪✨Known✨by✨the✨Self✨Pact✨ silver✨thread silk✨cord⟫☿reflect

spell ✨The✨Token✨Returns✨ ⟪jade✨cube ⟡ ᚠ☿form 🌒⟫ ⟡
    ✨Where✨the✨Self✨Pact✨Goes✨ ⟪✨Carry✨the✨Token✨Everywhere✨ jade✨cube⟫ ≣ jade✨cube ⇰
  litany ✨Where✨the✨Self✨Pact✨Goes✨ ⟪✨Carry✨the✨Token✨Everywhere✨ jade✨cube⟫ ≣ ᚠ☿enchant ⟪◎ 🌒⟫ jade✨cube ⇰ mirror
    ▢ ≣ jade✨cube ⇰ ᚠ☿✨Self✨Pact✨Changes✨Nothing✨ 🌒 jade✨cube

/- Package the two constructions and their inverse laws as an equivalence.
The next proof checks that its forward function is exactly mathlib’s correspondence. -/
ritual ✨Yoneda's✨Mirror✨ ⟡ ⟪✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫ ⟿ ᚠ⟫ ≃ ᚠ☿form 🌒 begets
  deed ⇰ ✨Where✨the✨Self✨Pact✨Goes✨
  ✨reverse✨deed✨ ⇰ ✨Carry✨the✨Token✨Everywhere✨
  ✨Return✨Path✨ ⇰ ✨Rebuilt✨from✨the✨Self✨Pact✨
  ✨Departure✨Path✨ ⇰ ✨The✨Token✨Returns✨

spell ✨The✨Archive✨Keeps✨the✨Same✨Mirror✨ ⟡
    ⟪✨Yoneda's✨Mirror✨ ⟡ ⟪✨pacts✨out✨of✨☿form ⟪mirrored 🌒⟫ ⟿ ᚠ⟫ ≃ ᚠ☿form 🌒⟫ ≣ ✨archive's✨mirror✨ ⇰ cast
  extend silver✨thread
  mirror

seal Yoneda

chamber Proxies

familiar ⟪ᛗ ⟡ Essence⊛⟫ ⟮Choir ᛗ⟯ ⟪ᛰ ⟡ Essence⊛⟫ ⟮Veyr ᛰ⟯

/- A homomorphism from the free monoid on one generator is determined
by the image of that generator, which can be any element of the target monoid. -/
ritual ✨One✨Seed✨Holds✨Every✨Member✨ ⟡ ⟪✨Primordial✨Choir✨ Mote ↝⊛ ᛗ⟫ ≃ ᛗ ⇰
  ✨Primordial✨Choir✨☿descend☿reflect☿chain ⟪Portal☿✨lone✨seed✨ Mote ᛗ⟫

spell ✨Where✨the✨Seed✨Goes✨ ⟪brass✨key ⟡ ✨Primordial✨Choir✨ Mote ↝⊛ ᛗ⟫ ⟡
    ✨One✨Seed✨Holds✨Every✨Member✨ ᛗ brass✨key ≣ brass✨key ⟪✨Primordial✨Choir✨☿seed ⟪⟫⟫ ⇰ mirror

/- Likewise, a homomorphism from the integer group is determined by the image
of one. Multiplicative notation lets the integer source use the same group arrow. -/
ritual ✨The✨Integers✨Hold✨Every✨Member✨ ⟡ ⟪Unchanted Balances ↝⊛ ᛰ⟫ ≃ ᛰ ⇰
  ⟪✨powers✨of✨one✨ ᛰ⟫☿reflect

spell ✨Where✨the✨Step✨Goes✨ ⟪brass✨key ⟡ Unchanted Balances ↝⊛ ᛰ⟫ ⟡
    ✨The✨Integers✨Hold✨Every✨Member✨ ᛰ brass✨key ≣ brass✨key ⟪Unchanted☿unchant 一⟫ ⇰ mirror

seal Proxies

seal Arcana☿Transmutation
```

[Lean source](../math/Mathematics/CategoryTheory/Yoneda.lean) · [Arcana source](../public/grimoire/yoneda.spell)

[CategoryTheory.coyonedaEquiv](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/CategoryTheory/Yoneda.lean#L1005) · [FreeMonoid.lift](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/FreeMonoid/Basic.lean#L315) · [zpowersHom](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/Int/Cast/Lemmas.lean#L283)

## The descending rite

*Chain complexes, cycles, boundaries, and chain maps*

Send a trace down one stair and it may remain; send it down twice and it vanishes. Distinguish the closed traces from those arriving from above.

**Mathematical meaning.** A chain complex has modules Cₙ and linear differentials dₙ : Cₙ → Cₙ₋₁ with dₙ ∘ dₙ₊₁ = 0. Cycles Zₙ are ker dₙ; boundaries Bₙ are im dₙ₊₁. Every boundary is a cycle. Chain maps preserve both. In our worked complex Cₙ = ℚ³ and d(a,b,c) = (b,0,0), so in every positive degree Zₙ = {(a,0,c)} and Bₙ = {(a,0,0)}.

**Hypotheses.** The general results use a natural-number-indexed Mathlib ChainComplex in ModuleCat R for a ring R. cycleSubmodule C n and boundarySubmodule C n describe degree n+1, not degree n; this avoids the endpoint at degree zero. The worked complex uses rational vector spaces. It is an algebraic example, with no claimed construction from a topological space.

**Proof idea.** To prove B ⊆ Z, unpack a boundary as d(y) and apply d² = 0. For a chain map f, its commuting square rewrites d(f(x)) as f(d(x)); this preserves cycles and transports a boundary witness. Construct the worked complex with ChainComplex.of, using an explicit linear map and its square-zero proof. Read off the cycle equation and build a preimage (0,a,0) for every proposed boundary (a,0,0).

**A guided reading.** Algebraic topology turns shapes into algebra that can be computed. This first lesson isolates the algebraic machinery: in geometric examples, chains are often formal linear combinations of pieces, a differential records a boundary, and taking a boundary twice gives zero. We work with a small coordinate example before trying to build chains from spaces. A module is the setting for adding chains and multiplying them by scalars; over ℚ it is a vector space.

1. **Follow degrees, not just arrows** Read C.d (n+1) n as the differential from degree n+1 down to degree n. ModuleCat packages modules and linear maps, while ChainComplex packages a whole family of them together with the square-zero law. The source uses n as an offset: cycleSubmodule C 0 means cycles in degree 1. ChainComplex is different from CochainComplex, whose arrows increase degree.

2. **Why every boundary is closed** A cycle x satisfies d(x)=0. A boundary is an x for which some y one degree higher satisfies d(y)=x. Substitute the witness: d(x)=d(d(y))=0. The obtain line extracts y, and the complex's d_comp_d law proves the last equality. The reverse inclusion need not hold; the gap between cycles and boundaries is exactly what homology will measure.

3. **Transport must respect the differential** A chain map supplies one linear map in each degree, with f commuting with d. That equation takes a cycle to a cycle because f(0)=0. It takes a boundary d(y) to d(f(y)), so f(y) becomes a new boundary witness. These two facts are both needed before a map can descend to homology classes.

4. **Compute the three coordinates** Our differential takes (a,b,c) to (b,0,0), and applying it again gives (0,0,0). Hence a cycle must have b=0; a and c remain free. A boundary must have b=c=0, and every (a,0,0) really is the boundary of (0,a,0). Thus the first coordinate is removable by adding a boundary, while the third looks like information that can survive. The next folio proves this precisely.

**Try it yourself.** Classify (3,0,7), (3,0,0), and (0,2,0): which are cycles, which are boundaries, and which are neither?

<details><summary>A hint</summary>

A cycle has second coordinate zero; a boundary also has third coordinate zero. The first is a cycle but not a boundary, the second is both, and the third is neither. The browser translates edits but does not check new Lean proofs.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Echoes☿✨Threefold✨Descent✨☿✨Bound✨Veyrs✨
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Echoes☿✨Threefold✨Descent✨☿✨Graded✨Descent✨
beckon ✨Grand✨Archive✨☿Lore☿Ratio☿Casting☿Names

unveil ✨Lore✨of✨Forms✨

sanctum Arcana☿Transmutation☿✨Chains✨and✨Echoes✨

ineffable chamber

/- A chain complex is a row of modules with arrows lowering degree.
Two consecutive differentials compose to zero. We begin in positive
degree so that both neighboring degrees exist in a natural-number complex. -/
ritual ✨Circle✨of✨Closed✨Traces✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⟪ᚳ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡ ✨Inner✨Bound✨Veyr✨ ᚱ ⟪ᚳ☿🌒 ⟪pinch✨of✨sulfur ⧾ 一⟫⟫ ⇰
  Bridge☿silence ⟪ᚳ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur⟫☿essence

ritual ✨Circle✨of✨Descended✨Traces✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⟪ᚳ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡ ✨Inner✨Bound✨Veyr✨ ᚱ ⟪ᚳ☿🌒 ⟪pinch✨of✨sulfur ⧾ 一⟫⟫ ⇰
  Bridge☿manifestation ⟪ᚳ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 二⟫ ⟪pinch✨of✨sulfur ⧾ 一⟫⟫☿essence

/- A boundary has a witness one degree higher. Apply the next differential
to that witness's image, then use the defining square-zero law. -/
spell ✨Every✨Descended✨Trace✨is✨Closed✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⟪ᚳ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    ✨Circle✨of✨Descended✨Traces✨ ᚳ pinch✨of✨sulfur ⋜ ✨Circle✨of✨Closed✨Traces✨ ᚳ pinch✨of✨sulfur ⇰ cast
  summon jade✨cube sigilward
  wrest ⦉silver✨bell᛫ mirror⦊ ⇰ sigilward
  shapeshift ⟪ᚳ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur⟫ ⟪⟪ᚳ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 二⟫ ⟪pinch✨of✨sulfur ⧾ 一⟫⟫ silver✨bell⟫ ≣ 〇
  bind voidmark ⇰ ᚳ☿✨Twice✨Descended✨Means✨Silence✨ ⟪pinch✨of✨sulfur ⧾ 二⟫ ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur
  missile sympathy ⟪conjure copper✨wire ⇉ copper✨wire silver✨bell⟫ voidmark

/- Chain maps commute with differentials. A closed chain therefore stays
closed after transport; this is the first requirement for a map on homology. -/
spell ✨Carry✨the✨Closed✨Traces✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⧼ᚳ ᚦ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⧽ ⟪copper✨wire ⟡ ᚳ ⟿ ᚦ⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫
    ⟪jade✨cube ⟡ ᚳ☿🌒 ⟪pinch✨of✨sulfur ⧾ 一⟫⟫ ⟪sigilward ⟡ jade✨cube ∈ ✨Circle✨of✨Closed✨Traces✨ ᚳ pinch✨of✨sulfur⟫ ⟡
    copper✨wire☿copper✨wire ⟪pinch✨of✨sulfur ⧾ 一⟫ jade✨cube ∈ ✨Circle✨of✨Closed✨Traces✨ ᚦ pinch✨of✨sulfur ⇰ cast
  shapeshift ⟪ᚳ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur⟫ jade✨cube ≣ 〇 upon sigilward
  shapeshift ⟪ᚦ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur⟫ ⟪copper✨wire☿copper✨wire ⟪pinch✨of✨sulfur ⧾ 一⟫ jade✨cube⟫ ≣ 〇
  litany
    ▢ ≣ copper✨wire☿copper✨wire pinch✨of✨sulfur ⟪⟪ᚳ☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur⟫ jade✨cube⟫ ⇰
      sympathy ⟪conjure silk✨cord ⇉ silk✨cord jade✨cube⟫ ⟪copper✨wire☿accord ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur⟫
    ▢ ≣ copper✨wire☿copper✨wire pinch✨of✨sulfur 〇 ⇰ sympathy ⟪copper✨wire☿copper✨wire pinch✨of✨sulfur⟫ sigilward
    ▢ ≣ 〇 ⇰ ✨Carry✨the✨Silence✨ ▢

spell ✨Carry✨the✨Descended✨Traces✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⧼ᚳ ᚦ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⧽ ⟪copper✨wire ⟡ ᚳ ⟿ ᚦ⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫
    ⟪jade✨cube ⟡ ᚳ☿🌒 ⟪pinch✨of✨sulfur ⧾ 一⟫⟫ ⟪sigilward ⟡ jade✨cube ∈ ✨Circle✨of✨Descended✨Traces✨ ᚳ pinch✨of✨sulfur⟫ ⟡
    copper✨wire☿copper✨wire ⟪pinch✨of✨sulfur ⧾ 一⟫ jade✨cube ∈ ✨Circle✨of✨Descended✨Traces✨ ᚦ pinch✨of✨sulfur ⇰ cast
  wrest ⦉silver✨bell᛫ mirror⦊ ⇰ sigilward
  hone ⦉copper✨wire☿copper✨wire ⟪pinch✨of✨sulfur ⧾ 二⟫ silver✨bell᛫ ?▢⦊
  missile sympathy ⟪conjure silk✨cord ⇉ silk✨cord silver✨bell⟫ ⟪copper✨wire☿accord ⟪pinch✨of✨sulfur ⧾ 二⟫ ⟪pinch✨of✨sulfur ⧾ 一⟫⟫

/- Our worked complex has three rational coordinates in every degree.
The differential sends (a,b,c) to (b,0,0): it erases the third coordinate
and moves the second into the first. Its next application is zero. -/
ritual ✨Drain✨the✨Three✨Chambers✨ ⟡ ⟪Ratios ⨯ Ratios ⨯ Ratios⟫ ↝Veyrbound⟮Ratios⟯ ⟪Ratios ⨯ Ratios ⨯ Ratios⟫ begets
  deed jade✨cube ⇰ ⟪jade✨cube☿二☿一᛫ 〇᛫ 〇⟫
  chantward jade✨cube silver✨bell ⇰ cast purify
  tetherward ash jade✨cube ⇰ cast purify

spell ✨Two✨Drainings✨Leave✨Silence✨ ⟪jade✨cube ⟡ Ratios ⨯ Ratios ⨯ Ratios⟫ ⟡
    ✨Drain✨the✨Three✨Chambers✨ ⟪✨Drain✨the✨Three✨Chambers✨ jade✨cube⟫ ≣ 〇 ⇰ mirror

ritual ✨The✨Three✨Chamber✨Rite✨ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ Ratios⟫ Tallies ⇰
  ✨Descending✨Rite✨☿seed ⟪conjure ▢ ⇉ ✨Bound✨Veyrs✨☿seed Ratios ⟪Ratios ⨯ Ratios ⨯ Ratios⟫⟫
    ⟪conjure ▢ ⇉ ✨Bound✨Veyrs✨☿✨clothe✨the✨pact✨ ✨Drain✨the✨Three✨Chambers✨⟫ ⟪cast
      summon pinch✨of✨sulfur
      channel ✨Bound✨Veyrs✨☿✨Pacts✨Agree✨in✨Essence✨
      channel Bridge☿extend
      summon jade✨cube
      missile ✨Two✨Drainings✨Leave✨Silence✨ jade✨cube⟫

spell ✨Unveil✨the✨Chamber's✨Drain✨ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    ✨The✨Three✨Chamber✨Rite✨☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur ≣ ✨Bound✨Veyrs✨☿✨clothe✨the✨pact✨ ✨Drain✨the✨Three✨Chambers✨ ⇰
cast
  purify ⟮✨The✨Three✨Chamber✨Rite✨᛫ ✨Descending✨Rite✨☿✨unveil✨the✨descent✨⟯

/- Cycles have zero second coordinate. Boundaries have both the second
and third coordinates zero. The surviving third coordinate is the clue
for the next folio's homology calculation. -/
spell ✨The✨Middle✨Chamber✨Must✨Be✨Silent✨ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟪jade✨cube ⟡ Ratios ⨯ Ratios ⨯ Ratios⟫ ⟡
    jade✨cube ∈ ✨Circle✨of✨Closed✨Traces✨ ✨The✨Three✨Chamber✨Rite✨ pinch✨of✨sulfur ↭ jade✨cube☿二☿一 ≣ 〇 ⇰ cast
  shapeshift ✨The✨Three✨Chamber✨Rite✨☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 一⟫ pinch✨of✨sulfur jade✨cube ≣ 〇 ↭ ▢
  transmute ⟮✨Unveil✨the✨Chamber's✨Drain✨⟯
  shapeshift ⟪jade✨cube☿二☿一᛫ ⟪〇 ⟡ Ratios⟫᛫ ⟪〇 ⟡ Ratios⟫⟫ ≣ 〇 ↭ ▢
  purify

spell ✨Only✨the✨First✨Chamber✨Descends✨ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟪jade✨cube ⟡ Ratios ⨯ Ratios ⨯ Ratios⟫ ⟡
    jade✨cube ∈ ✨Circle✨of✨Descended✨Traces✨ ✨The✨Three✨Chamber✨Rite✨ pinch✨of✨sulfur ↭ jade✨cube☿二☿一 ≣ 〇 ⩓ jade✨cube☿二☿二 ≣ 〇 ⇰ cast
  shapeshift ⟪⟒ silver✨bell᛫ ✨The✨Three✨Chamber✨Rite✨☿cinder✨thread ⟪pinch✨of✨sulfur ⧾ 二⟫ ⟪pinch✨of✨sulfur ⧾ 一⟫ silver✨bell ≣ jade✨cube⟫ ↭ ▢
  transmute ⟮proclaim pinch✨of✨sulfur ⧾ 二 ≣ ⟪pinch✨of✨sulfur ⧾ 一⟫ ⧾ 一 cast oracle᛫ ✨Unveil✨the✨Chamber's✨Drain✨⟯
  fabricate
  ❖ unpack ⦉silver✨bell᛫ mirror⦊
    missile ⦉mirror᛫ mirror⦊
  ❖ summon sigilward
    hone ⦉⟪〇᛫ jade✨cube☿一᛫ 〇⟫᛫ ?▢⦊
    shapeshift ⟪jade✨cube☿一᛫ ⟪〇 ⟡ Ratios⟫᛫ ⟪〇 ⟡ Ratios⟫⟫ ≣ jade✨cube
    rend jade✨cube whence ⦉ash᛫ elm᛫ yew⦊
    purge

seal

seal Arcana☿Transmutation☿✨Chains✨and✨Echoes✨
```

[Lean source](../math/Mathematics/AlgebraicTopology/ChainComplexes.lean) · [Arcana source](../public/grimoire/chain-complexes.spell)

[ChainComplex.of](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/HomologicalComplex.lean) · [HomologicalComplex.d_comp_d](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/HomologicalComplex.lean#L72) · [HomologicalComplex.Hom.comm](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/HomologicalComplex.lean#L222) · [ShortComplex.moduleCatMk](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/ShortComplex/ModuleCat.lean#L37)

## Echoes beyond the boundary

*Homology as cycles modulo boundaries, with a complete computation*

Let boundary traces dissolve behind the veil. One rational echo survives, and every surviving echo has exactly one measure.

**Mathematical meaning.** Homology Hₙ = Zₙ/Bₙ identifies cycles whose difference is a boundary. For d(a,b,c)=(b,0,0), the map [(a,0,c)] ↦ c is a linear equivalence H₁ ≃ ℚ. In particular [(3,0,7)] = [(0,0,7)], while [(0,0,1)] ≠ 0. The explicit quotient is connected by an isomorphism to Mathlib's actual tripleComplex.homology 1. Chain maps induce homology maps preserving identities and composition.

**Hypotheses.** The concrete computation uses the rational chain complex from The descending rite and computes degree 1. Its explicit quotient uses boundaries as a submodule of cycles, not as an unrelated submodule of the ambient chain space. The induced-map laws hold for arbitrary natural-number-indexed complexes of modules over a ring. No homotopy invariance, singular homology of spaces, or geometric realization is claimed here.

**Proof idea.** Restrict the incoming differential to the outgoing kernel, then quotient its range. On cycles, project to the third coordinate. Prove by explicit witnesses that the kernel of this projection is exactly the boundaries and that every rational number occurs. Apply the linear first isomorphism theorem to obtain the equivalence and its representative formula. A three-term window and Mathlib's moduleCatHomologyIso connect this quotient to the library homology object. Finally specialize the library's homology functor laws.

**A guided reading.** The previous folio found cycles that are not boundaries. Homology records precisely this difference. It is a quotient vector space here, so it remembers addition and scalar multiplication, not just how many classes exist. This lesson completes a calculation instead of merely introducing the notation Hₙ.

1. **Put boundaries inside the correct space** The outgoing kernel is the space of cycles. The incoming differential lands there because d²=0, so codRestrict packages each boundary together with the proof that it is a cycle. Now its range is a submodule of the cycle space, and the quotient is well typed. A cycle represents zero in this quotient exactly when it came from the preceding degree.

2. **Find an invariant of the class** For a cycle (a,0,c), use c as its invariant. Adding a boundary (b,0,0) does not change c. To prove that nothing else survives, suppose c=0: then (a,0,0) is the boundary of (0,a,0). Conversely, every boundary has c=0. This proves that the kernel of survivingCoordinate equals the boundary space, with actual witnesses in the Lean proof.

3. **Finish the quotient calculation** Every rational c occurs, using the cycle (0,0,c). The linear first isomorphism theorem therefore identifies cycles modulo the kernel with all of ℚ. Because that kernel is exactly the boundaries, it gives our homology equivalence. The formula on representatives proves two classes are equal exactly when their third coordinates agree. It proves both the displayed numerical equality and the nonzero class of (0,0,1).

4. **Connect the calculation to the library** Mathlib's abstract homology uses categorical kernels and cokernels. tripleWindowHomologyIso identifies its three-term homology with the explicit quotient we computed, and tripleComplexHomologyIso identifies degree 1 of the actual chain complex with ℚ. These are structure-preserving isomorphisms, not an informal resemblance. The final induced-map laws say doing nothing induces the identity and composing chain maps composes their homology maps.

**Try it yourself.** Do (5,0,2) and (−1,0,2) represent the same class? Can (5,0,2) represent the zero class? Give the boundary witness for their difference.

<details><summary>A hint</summary>

Their third coordinates agree, so the classes agree. Their difference is (6,0,0)=d(0,6,0). Their class is nonzero because its image under the homology equivalence is 2.

</details>

```text
beckon Arcana☿Transmutation☿✨Chains✨and✨Echoes✨☿✨The✨Descending✨Rites✨
beckon ✨Grand✨Archive✨☿✨Bound✨Pact✨Lore✨☿✨Perfect✨Passages✨

unveil ✨Lore✨of✨Forms✨

sanctum Arcana☿Transmutation☿✨Chains✨and✨Echoes✨

ineffable chamber

/- Homology remembers closed chains but forgets those which are boundaries.
First restrict the incoming differential to the kernel of the outgoing
one. Only then is its range a submodule of the right space to quotient. -/
byname ✨The✨Closed✨Chambers✨ ⇰ Bridge☿silence ✨Drain✨the✨Three✨Chambers✨

ritual ✨Descent✨into✨the✨Closed✨Circle✨ ⟡ ⟪Ratios ⨯ Ratios ⨯ Ratios⟫ ↝Veyrbound⟮Ratios⟯ ✨The✨Closed✨Chambers✨ ⇰
  ✨Drain✨the✨Three✨Chambers✨☿✨narrow✨the✨arrival✨ ✨The✨Closed✨Chambers✨ ✨Two✨Drainings✨Leave✨Silence✨

byname ✨The✨Chambers'✨Echoes✨ ⇰ ✨The✨Closed✨Chambers✨ ⧸ Bridge☿manifestation ✨Descent✨into✨the✨Closed✨Circle✨

/- A homology class is zero exactly when the cycle came from the preceding
degree. This statement makes the meaning of the quotient explicit. -/
spell ✨A✨Descended✨Echo✨is✨Silent✨ ⟪jade✨cube ⟡ ✨The✨Closed✨Chambers✨⟫ ⟡
    ⟪✨Inner✨Bound✨Veyr✨☿Effigies☿forge jade✨cube ⟡ ✨The✨Chambers'✨Echoes✨⟫ ≣ 〇 ↭
      ⟒ silver✨bell᛫ ✨Descent✨into✨the✨Closed✨Circle✨ silver✨bell ≣ jade✨cube ⇰
  ✨Inner✨Bound✨Veyr✨☿Effigies☿✨veil✨to✨silence✨ ⟪Bridge☿manifestation ✨Descent✨into✨the✨Closed✨Circle✨⟫

/- The third coordinate survives. For a cycle, the second coordinate is
already zero; forgetting the first coordinate should remove exactly the
boundaries, and no more. The next proof checks both directions. -/
ritual ✨Listen✨to✨the✨Last✨Chamber✨ ⟡ ✨The✨Closed✨Chambers✨ ↝Veyrbound⟮Ratios⟯ Ratios begets
  deed jade✨cube ⇰ jade✨cube☿core☿二☿二
  chantward ▢ ▢ ⇰ mirror
  tetherward ▢ ▢ ⇰ mirror

spell ✨Only✨Descended✨Traces✨Fall✨Silent✨ ⟡
    Bridge☿silence ✨Listen✨to✨the✨Last✨Chamber✨ ≣ Bridge☿manifestation ✨Descent✨into✨the✨Closed✨Circle✨ ⇰ cast
  extend jade✨cube
  fabricate
  ❖ summon sigilward
    bind middleward ⟡ jade✨cube☿core☿二☿一 ≣ 〇 ⇰
      sympathy ⟪conjure silver✨bell ⟡ Ratios ⨯ Ratios ⨯ Ratios ⇉ silver✨bell☿一⟫ jade✨cube☿attestation
    bind lastward ⟡ jade✨cube☿core☿二☿二 ≣ 〇 ⇰ sigilward
    hone ⦉⟪〇᛫ jade✨cube☿core☿一᛫ 〇⟫᛫ ?▢⦊
    channel Kin☿extend
    shapeshift ⟪jade✨cube☿core☿一᛫ ⟪〇 ⟡ Ratios⟫᛫ ⟪〇 ⟡ Ratios⟫⟫ ≣ jade✨cube☿core
    rend jade✨cube whence ⦉⦉ash᛫ elm᛫ yew⦊᛫ closedward⦊
    purge
  ❖ unpack ⦉silver✨bell᛫ mirror⦊
    mirror

spell ✨Every✨Echo✨Can✨Be✨Heard✨ ⟡ Rite☿Reaching ✨Listen✨to✨the✨Last✨Chamber✨ ⇰ cast
  summon yew
  missile ⦉⦉⟪〇᛫ 〇᛫ yew⟫᛫ mirror⦊᛫ mirror⦊

/- The linear first isomorphism theorem finishes the computation:
cycles modulo boundaries are linearly equivalent to one copy of ℚ.
Its representative formula lets us compute actual homology classes. -/
ritual ✨Unveil✨the✨Surviving✨Echo✨ ⟡ ✨The✨Chambers'✨Echoes✨ ≃Veyrbound⟮Ratios⟯ Ratios ⇰
  ⟪✨Inner✨Bound✨Veyr✨☿✨equal✨veils✨give✨equal✨passages✨ ▢ ▢ ✨Only✨Descended✨Traces✨Fall✨Silent✨☿reflect⟫☿chain
    ⟪✨Listen✨to✨the✨Last✨Chamber✨☿✨unveil✨the✨reaching✨bound✨pact✨ ✨Every✨Echo✨Can✨Be✨Heard✨⟫

spell ✨The✨Last✨Chamber✨Names✨the✨Echo✨ ⟪jade✨cube ⟡ ✨The✨Closed✨Chambers✨⟫ ⟡
    ✨Unveil✨the✨Surviving✨Echo✨ ⟪✨Inner✨Bound✨Veyr✨☿Effigies☿forge jade✨cube⟫ ≣ jade✨cube☿core☿二☿二 ⇰ cast
  missile ✨Listen✨to✨the✨Last✨Chamber✨☿✨hear✨through✨the✨bound✨veil✨
    ✨Every✨Echo✨Can✨Be✨Heard✨ jade✨cube

spell ✨Equal✨Last✨Chambers✨Give✨Equal✨Echoes✨ ⟪jade✨cube silver✨bell ⟡ ✨The✨Closed✨Chambers✨⟫ ⟡
    ⟪✨Inner✨Bound✨Veyr✨☿Effigies☿forge jade✨cube ⟡ ✨The✨Chambers'✨Echoes✨⟫ ≣ ✨Inner✨Bound✨Veyr✨☿Effigies☿forge silver✨bell ↭
      jade✨cube☿core☿二☿二 ≣ silver✨bell☿core☿二☿二 ⇰ cast
  fabricate
  ❖ summon unisonward
    missile sympathy ✨Unveil✨the✨Surviving✨Echo✨ unisonward
  ❖ summon unisonward
    channel ✨Unveil✨the✨Surviving✨Echo✨☿unconfounded
    missile unisonward

/- These cycles differ by the boundary of (0,3,0), so they give the same
class. Changing the last coordinate would instead change the class. -/
spell ✨The✨First✨Chamber✨Leaves✨No✨Echo✨ ⟡
    ⟪✨Inner✨Bound✨Veyr✨☿Effigies☿forge ⟪⦉⟪三᛫ 〇᛫ 七⟫᛫ mirror⦊ ⟡ ✨The✨Closed✨Chambers✨⟫ ⟡ ✨The✨Chambers'✨Echoes✨⟫ ≣
      ✨Inner✨Bound✨Veyr✨☿Effigies☿forge ⟪⦉⟪〇᛫ 〇᛫ 七⟫᛫ mirror⦊ ⟡ ✨The✨Closed✨Chambers✨⟫ ⇰
  ⟪✨Equal✨Last✨Chambers✨Give✨Equal✨Echoes✨ ▢ ▢⟫☿backward mirror

ritual ✨The✨Unfading✨Chamber✨ ⟡ ✨The✨Closed✨Chambers✨ ⇰ ⦉⟪〇᛫ 〇᛫ 一⟫᛫ mirror⦊

spell ✨One✨Echo✨Cannot✨Be✨Silenced✨ ⟡
    ⟪✨Inner✨Bound✨Veyr✨☿Effigies☿forge ✨The✨Unfading✨Chamber✨ ⟡ ✨The✨Chambers'✨Echoes✨⟫ ≢ 〇 ⇰ cast
  summon voidmark
  bind reflectionward ⇰ sympathy ✨Unveil✨the✨Surviving✨Echo✨ voidmark
  transmute ⟮✨The✨Last✨Chamber✨Names✨the✨Echo✨᛫ ✨Carry✨the✨Silence✨⟯ upon reflectionward
  missile ✨Presence✨is✨Not✨Silence✨ reflectionward

/- This is the same homology that mathlib attaches to a chain complex,
not merely a separately defined quotient. A three-term window is enough
to compute the middle degree; the library identifies it with ker/im. -/
ritual ✨The✨Three✨Stair✨Window✨ ⟡ ✨Threefold✨Descent✨ ⟪✨Bound✨Veyrs✨ Ratios⟫ ⇰
  ✨Threefold✨Descent✨☿✨assemble✨a✨bound✨descent✨ ✨Drain✨the✨Three✨Chambers✨ ✨Drain✨the✨Three✨Chambers✨ ⟪cast
    channel Bridge☿extend
    summon jade✨cube
    missile ✨Two✨Drainings✨Leave✨Silence✨ jade✨cube⟫

ritual ✨The✨Window✨Reveals✨its✨Echoes✨ ⟡ ✨The✨Three✨Stair✨Window✨☿echoes ≅ ✨Bound✨Veyrs✨☿seed Ratios ✨The✨Chambers'✨Echoes✨ ⇰
  ✨The✨Three✨Stair✨Window✨☿✨unveil✨the✨bound✨echoes✨

ritual ✨The✨Rite✨Opens✨a✨Window✨ ⟡ ✨The✨Three✨Chamber✨Rite✨☿stairwell 二 一 〇 ≅ ✨The✨Three✨Stair✨Window✨ ⇰
  ✨Threefold✨Descent✨☿✨forge✨a✨perfect✨passage✨ ⟪Mirrorkin☿unmoving ▢⟫ ⟪Mirrorkin☿unmoving ▢⟫ ⟪Mirrorkin☿unmoving ▢⟫
    ⟪cast
      channel ✨Bound✨Veyrs✨☿✨Pacts✨Agree✨in✨Essence✨
      channel Bridge☿extend
      summon jade✨cube
      shapeshift ✨Drain✨the✨Three✨Chambers✨ jade✨cube ≣ ✨The✨Three✨Chamber✨Rite✨☿cinder✨thread 二 一 jade✨cube
      transmute ⟮✨Unveil✨the✨Chamber's✨Drain✨ 一⟯
      mirror⟫
    ⟪cast
      channel ✨Bound✨Veyrs✨☿✨Pacts✨Agree✨in✨Essence✨
      channel Bridge☿extend
      summon jade✨cube
      shapeshift ✨Drain✨the✨Three✨Chambers✨ jade✨cube ≣ ✨The✨Three✨Chamber✨Rite✨☿cinder✨thread 一 〇 jade✨cube
      transmute ⟮✨Unveil✨the✨Chamber's✨Drain✨ 〇⟯
      mirror⟫

ritual ✨The✨Rite's✨One✨Surviving✨Echo✨ ⟡ ✨The✨Three✨Chamber✨Rite✨☿echoes 一 ≅ ✨Bound✨Veyrs✨☿seed Ratios Ratios ⇰
  ⟪✨The✨Three✨Chamber✨Rite✨☿✨echoes✨through✨a✨window✨ 二 一 〇 ⟪⟪✨Pattern✨of✨Descent✨☿descending Tallies⟫☿✨the✨stair✨above✨ mirror⟫ ⟪⟪✨Pattern✨of✨Descent✨☿descending Tallies⟫☿✨the✨stair✨below✨ mirror⟫⟫ ≪⨾
    ✨Threefold✨Descent✨☿✨carry✨echoes✨through✨the✨passage✨ ✨The✨Rite✨Opens✨a✨Window✨ ≪⨾
    ✨The✨Window✨Reveals✨its✨Echoes✨ ≪⨾ ✨Unveil✨the✨Surviving✨Echo✨☿✨clothe✨the✨bound✨passage✨

/- Transport on homology respects both identity and composition.
The preceding folio explained why: chain maps preserve closed chains
and boundaries, so they descend consistently to equivalence classes. -/
ritual ✨Carry✨the✨Surviving✨Echoes✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⧼ᚳ ᚦ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⧽ ⟪copper✨wire ⟡ ᚳ ⟿ ᚦ⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    ᚳ☿echoes pinch✨of✨sulfur ⟿ ᚦ☿echoes pinch✨of✨sulfur ⇰
  ✨Graded✨Descent✨☿✨carry✨the✨echoes✨ copper✨wire pinch✨of✨sulfur

spell ✨Unmoved✨Traces✨Leave✨Unmoved✨Echoes✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⟪ᚳ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    ✨Carry✨the✨Surviving✨Echoes✨ ⟪◎ ᚳ⟫ pinch✨of✨sulfur ≣ ◎ ⟪ᚳ☿echoes pinch✨of✨sulfur⟫ ⇰
  ✨Graded✨Descent✨☿✨unmoved✨echoes✨ ᚳ pinch✨of✨sulfur

spell ✨Chained✨Pacts✨Carry✨Chained✨Echoes✨ ⧼ᚱ ⟡ Essence⊛⧽ ⟮Veyrath ᚱ⟯
    ⧼ᚳ ᚦ ᛖ ⟡ ✨Descending✨Rite✨ ⟪✨Bound✨Veyrs✨ ᚱ⟫ Tallies⧽ ⟪copper✨wire ⟡ ᚳ ⟿ ᚦ⟫ ⟪silk✨cord ⟡ ᚦ ⟿ ᛖ⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    ✨Carry✨the✨Surviving✨Echoes✨ ⟪copper✨wire ⨾ silk✨cord⟫ pinch✨of✨sulfur ≣ ✨Carry✨the✨Surviving✨Echoes✨ copper✨wire pinch✨of✨sulfur ⨾ ✨Carry✨the✨Surviving✨Echoes✨ silk✨cord pinch✨of✨sulfur ⇰
  ✨Graded✨Descent✨☿✨chain✨the✨echo✨bearers✨ copper✨wire silk✨cord pinch✨of✨sulfur

seal

seal Arcana☿Transmutation☿✨Chains✨and✨Echoes✨
```

[Lean source](../math/Mathematics/AlgebraicTopology/Homology.lean) · [Arcana source](../public/grimoire/homology.spell)

[ShortComplex.moduleCatHomologyIso](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/ShortComplex/ModuleCat.lean#L177) · [LinearMap.quotKerEquivOfSurjective](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/LinearAlgebra/Isomorphisms.lean#L47) · [HomologicalComplex.homologyIsoSc'](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/ShortComplex/HomologicalComplex.lean#L907) · [HomologicalComplex.homologyMap_comp](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Homology/ShortComplex/HomologicalComplex.lean#L371)

## The imaginary mirror

*Complex arithmetic, conjugation, and modulus*

Turn a sigil through an unseen quarter circle, reflect it in a mirror, and recover its distance from the origin.

**Mathematical meaning.** The complex field contains i with i² = −1. Multiplication by i takes (a,b) to (−b,a), so four turns restore every point. Conjugation sends a+bi to a−bi; z·conj(z) = |z|². We compute (1+i)² = 2i and |3+4i| = 5 exactly.

**Hypotheses.** All statements concern the complex field ℂ and its standard real-valued norm. No ordering of complex numbers is assumed. The word imaginary names a coordinate direction; these are fully defined mathematical objects.

**Proof idea.** Read complex multiplication by coordinates, then regroup four factors of i into two copies of i². Conjugation is an involution. The norm-square identity reduces distance computations to real squares. ring proves polynomial rearrangements; norm_num checks numerical arithmetic; nonnegativity of a norm selects +5 rather than −5 from its square.

**A guided reading.** Illusion begins with an extra direction, not with unreliable arithmetic. A complex number a+bi is a point with two real coordinates. Its field operations let geometry and algebra describe the same motion, preparing both complex analysis and the polynomial geometry of Phantasms.

1. **Meet the imaginary unit** Complex.I is the particular complex number with real part 0 and imaginary part 1. Its square is −1. quarterTurn_coordinates shows how multiplication by i rotates any point: the old imaginary coordinate becomes the negative real coordinate, and the old real coordinate becomes the imaginary coordinate. Four such turns return to the start. This differs from the quaternion generators: complex multiplication is commutative.

2. **Reflect across the real axis** Conjugation fixes a and negates b in a+bi. Applying it twice restores the original number. Multiplying a number by its conjugate cancels the imaginary cross terms and gives the real number a²+b². Lean explicitly casts this real result back to ℂ in conjugate_product so that both sides of the equality have the same type.

3. **Distinguish a norm from its square** Complex.normSq z is |z|², not |z|. The notation ‖z‖ is the nonnegative distance from z to 0. modulus_squared_coordinates links the analytic norm to the two algebraic coordinates. This is the same Pythagorean calculation familiar from the real plane, now attached to a field element.

4. **Check exact computations** For (1+i)², expand the polynomial and replace i² by −1. For |3+4i|, first obtain the squared norm 25, then use nonnegativity to choose 5. These proofs manipulate exact real and complex numbers; they do not approximate them with machine decimals. Opening the proof shows why knowing only that a square is 25 would leave two possible real values.

**Try it yourself.** Predict the coordinates after two quarter turns, then use i² = −1 to explain the answer. Why is conjugation a different transformation from multiplication by i?

<details><summary>A hint</summary>

Two quarter turns negate both coordinates. Conjugation negates only the imaginary coordinate and fixes every real number. Browser edits are unchecked drafts until run through Lean.

</details>

```text
beckon ✨Grand✨Archive✨☿Necromantic☿Umbra☿Radiance
beckon ✨Grand✨Archive✨☿Gestures

sanctum Arcana☿Illusion

unveil Umbra Mirrors

/- The imaginary unit is an ordinary field element with one unusual square.
Multiplication by it rotates the real and imaginary coordinates a quarter turn. -/
spell ✨Conjure✨the✨Imaginary✨Ember✨ ⟡ ✨Imaginary✨Ember✨ ⌃ 二 ≣ ⟪⧿一 ⟡ Umbrae⟫ ⇰ Umbra☿✨The✨Ember's✨Shadow✨

spell ✨A✨Quarter✨Turn✨through✨the✨Mirror✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡
    ⟪✨Imaginary✨Ember✨ ⊛ amber✨rod⟫☿sunface ≣ ⧿amber✨rod☿moonface ⩓ ⟪✨Imaginary✨Ember✨ ⊛ amber✨rod⟫☿moonface ≣ amber✨rod☿sunface ⇰ cast
  fabricate ⋖⁂⋗ purify

spell ✨Four✨Imaginary✨Turns✨Return✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ ✨Imaginary✨Ember✨ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ amber✨rod⟫⟫⟫ ≣ amber✨rod ⇰ cast
  litany ✨Imaginary✨Ember✨ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ amber✨rod⟫⟫⟫ ≣ ⟪✨Imaginary✨Ember✨ ⊛ ✨Imaginary✨Ember✨⟫ ⊛ ⟪✨Imaginary✨Ember✨ ⊛ ✨Imaginary✨Ember✨⟫ ⊛ amber✨rod ⇰ cast circlet
    ▢ ≣ amber✨rod ⇰ cast transmute ⟮Umbra☿✨Two✨Embers✨Cast✨a✨Shadow✨⟯⁂ circlet

/- Conjugation fixes the real coordinate and negates the imaginary one.
It is an involution, so looking into this mirror twice restores the input. -/
spell ✨Twice✨through✨the✨Imaginary✨Mirror✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ mirrorlight ⟪mirrorlight amber✨rod⟫ ≣ amber✨rod ⇰ cast purify

/- The squared modulus is real and nonnegative. Multiplying a complex number
by its conjugate gives that squared modulus, embedded back into the complex field. -/
spell ✨The✨Mirror✨Reveals✨Radiance✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ amber✨rod ⊛ mirrorlight amber✨rod ≣ ⟪✨radiance✨squared✨ amber✨rod ⟡ Umbrae⟫ ⇰
  Umbra☿✨bind✨the✨mirrorlight✨ amber✨rod

spell ✨Radiance✨from✨Two✨Shadows✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ ‖amber✨rod‖ ⌃ 二 ≣ amber✨rod☿sunface ⌃ 二 ⧾ amber✨rod☿moonface ⌃ 二 ⇰ cast
  transmute ⟮Umbra☿✨square✨the✨radiance✨᛫ Umbra☿✨unveil✨the✨squared✨radiance✨⟯
  circlet

/- This exact computation uses field algebra, not a floating-point approximation. -/
spell ✨Twin✨Sparks✨Become✨Moonlight✨ ⟡ ⟪一 ⧾ ✨Imaginary✨Ember✨⟫ ⌃ 二 ≣ ⟪二 ⟡ Umbrae⟫ ⊛ ✨Imaginary✨Ember✨ ⇰ cast
  litany ⟪一 ⧾ ✨Imaginary✨Ember✨⟫ ⌃ 二 ≣ 一 ⧾ 二 ⊛ ✨Imaginary✨Ember✨ ⧾ ✨Imaginary✨Ember✨ ⌃ 二 ⇰ cast circlet
    ▢ ≣ 二 ⊛ ✨Imaginary✨Ember✨ ⇰ cast transmute ⟮Umbra☿✨The✨Ember's✨Shadow✨⟯⁂ circlet

spell ✨The✨Fivefold✨Radiance✨ ⟡ ‖⟪三 ⟡ Umbrae⟫ ⧾ 四 ⊛ ✨Imaginary✨Ember✨‖ ≣ 五 ⇰ cast
  bind doubleward ⟡ ‖⟪三 ⟡ Umbrae⟫ ⧾ 四 ⊛ ✨Imaginary✨Ember✨‖ ⌃ 二 ≣ 二五 ⇰ cast
    transmute ⟮✨Radiance✨from✨Two✨Shadows✨⟯
    numerology
  bind lightward ⇰ ✨radiance✨cannot✨darken✨ ⟪⟪三 ⟡ Umbrae⟫ ⧾ 四 ⊛ ✨Imaginary✨Ember✨⟫
  greatledger

seal Arcana☿Illusion
```

[Lean source](../math/Mathematics/ComplexAnalysis/ComplexArithmetic.lean) · [Arcana source](../public/grimoire/complex-mirrors.spell)

[Complex.I_sq](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/Complex/Basic.lean#L627) · [Complex.mul_conj](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/Complex/Basic.lean#L586) · [Complex.sq_norm](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Complex/Norm.lean#L150)

## Whispers from every direction

*Complex derivatives and entire functions*

Listen to one whisper that agrees along every approach, then compose a square with an exponential incantation.

**Mathematical meaning.** For complex z, the function z ↦ z² has derivative 2z. The chain rule gives (exp(z²))′ = exp(z²)·2z. Both functions are complex differentiable everywhere, hence entire. At i the latter derivative is exp(−1)·2i.

**Hypotheses.** The derivative is taken over ℂ, not merely over ℝ. The polynomial and exponential are defined on the whole complex plane, so there are no domain exclusions. Entire means holomorphic everywhere; the lesson establishes this through complex differentiability at every point.

**Proof idea.** Apply mathlib’s derivative-of-a-power theorem to the identity function. Extract differentiability and the derivative value from the resulting HasDerivAt certificate. For exp(z²), compose mathlib’s complex exponential derivative with the square derivative. Finally substitute i² = −1 into the proved derivative formula.

**A guided reading.** Complex arithmetic becomes complex analysis when we ask how a function changes near a point. A complex derivative must describe changes from every direction in the plane using multiplication by one complex number. This is stronger than ordinary differentiability of a map between two real planes.

1. **Read a derivative certificate** HasDerivAt f d z says that f has derivative d at z. It includes the existence and limiting property of that derivative. Here all inputs and outputs are complex, and Differentiable ℂ makes the scalar field explicit. Informally, f(z+h) is f(z)+d·h plus an error negligible compared with |h| as h approaches zero through arbitrary complex directions.

2. **Differentiate the square** The identity function has derivative 1. The power rule with exponent 2 yields 2·z·1, which simplifies to 2z. complexSquare_hasDerivAt records this at any point. Quantifying that result over all points establishes complexSquare_differentiable, and the certificate’s .deriv projection obtains the value of deriv.

3. **Compose two controlled changes** The outer function is the complex exponential, whose derivative is itself; the inner function is the square, whose derivative we just established. HasDerivAt.comp multiplies the outer derivative at z² by the inner derivative at z. The resulting formula exp(z²)·2z is valid throughout ℂ, so the composite is entire too.

4. **Evaluate after proving existence** At i, the inner square is −1, leaving exp(−1)·2i. In Lean, deriv is a total function and takes a default value at points lacking a derivative; a displayed derivative value alone would therefore be a poor existence claim. These folios first prove HasDerivAt, then extract its derivative value. Entire functions here are examples, not a claim that every function built from complex coordinates is holomorphic.

**Try it yourself.** Use the two derivative formulas to predict their values at 0. Why does the derivative of exp(z²) vanish there even though exp(0) = 1?

<details><summary>A hint</summary>

The chain rule also includes the derivative 2z of the inner square. That factor vanishes at 0. A constant output value and a rate of change answer different questions.

</details>

```text
beckon ✨Grand✨Archive✨☿Necromantic☿✨Named✨Invocations✨☿✨Breath's✨Whispercraft✨
beckon ✨Grand✨Archive✨☿Necromantic☿Whispers☿Whispering☿Kindling
beckon ✨Grand✨Archive✨☿Gestures

ineffable chamber

sanctum Arcana☿Illusion

/- The scalar field in HasDerivAt matters: every variable here lies in ℂ,
so this is a complex derivative, controlling approach from every direction. -/
ritual ✨The✨Umbra's✨Second✨Ascent✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ Umbrae ⇰ amber✨rod ⌃ 二

spell ✨The✨Second✨Ascent's✨Whisper✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡
    ✨Bears✨the✨Whisper✨ ✨The✨Umbra's✨Second✨Ascent✨ ⟪二 ⊛ amber✨rod⟫ amber✨rod ⇰ cast
  shapeshift ✨Bears✨the✨Whisper✨ ⟪conjure verse ⟡ Umbrae ⇉ verse ⌃ 二⟫ ⟪二 ⊛ amber✨rod⟫ amber✨rod
  clarify through ⟪✨The✨Mirror✨Whispers✨Once✨ amber✨rod⟫☿✨whisper✨through✨powers✨ 二

/- A complex derivative at every point makes the function entire, hence
holomorphic on every open subset of the complex plane. -/
spell ✨The✨Second✨Ascent✨Whispers✨Everywhere✨ ⟡ ✨Everywhere✨Whispering✨ Umbrae ✨The✨Umbra's✨Second✨Ascent✨ ⇰ cast
  summon amber✨rod
  missile ⟪✨The✨Second✨Ascent's✨Whisper✨ amber✨rod⟫☿✨whispering✨here✨

spell ✨Hear✨the✨Umbra's✨Second✨Ascent✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ undertone ✨The✨Umbra's✨Second✨Ascent✨ amber✨rod ≣ 二 ⊛ amber✨rod ⇰
  ⟪✨The✨Second✨Ascent's✨Whisper✨ amber✨rod⟫☿undertone

/- The derivative of the complex exponential is a library theorem. The chain
rule combines it with the polynomial derivative proved above. -/
ritual ✨Breathe✨upon✨the✨Second✨Ascent✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡ Umbrae ⇰ Umbra☿breath ⟪✨The✨Umbra's✨Second✨Ascent✨ amber✨rod⟫

spell ✨The✨Breath's✨Layered✨Whisper✨ ⟪amber✨rod ⟡ Umbrae⟫ ⟡
    ✨Bears✨the✨Whisper✨ ✨Breathe✨upon✨the✨Second✨Ascent✨ ⟪Umbra☿breath ⟪amber✨rod ⌃ 二⟫ ⊛ ⟪二 ⊛ amber✨rod⟫⟫ amber✨rod ⇰ cast
  missile ⟪Umbra☿✨breath✨echoes✨itself✨ ⟪✨The✨Umbra's✨Second✨Ascent✨ amber✨rod⟫⟫☿threading amber✨rod ⟪✨The✨Second✨Ascent's✨Whisper✨ amber✨rod⟫

spell ✨The✨Breath✨Whispers✨Everywhere✨ ⟡ ✨Everywhere✨Whispering✨ Umbrae ✨Breathe✨upon✨the✨Second✨Ascent✨ ⇰ cast
  summon amber✨rod
  missile ⟪✨The✨Breath's✨Layered✨Whisper✨ amber✨rod⟫☿✨whispering✨here✨

/- Evaluate a derivative only after obtaining its HasDerivAt certificate.
At the imaginary unit, z squared is negative one, so the exponential is exp(-1). -/
spell ✨The✨Imaginary✨Ember's✨Breath✨ ⟡
    undertone ✨Breathe✨upon✨the✨Second✨Ascent✨ Umbra☿✨Imaginary✨Ember✨ ≣ Umbra☿breath ⟪⧿一⟫ ⊛ ⟪二 ⊛ Umbra☿✨Imaginary✨Ember✨⟫ ⇰ cast
  transmute ⟮⟪✨The✨Breath's✨Layered✨Whisper✨ Umbra☿✨Imaginary✨Ember✨⟫☿undertone᛫ Umbra☿✨The✨Ember's✨Shadow✨⟯

seal Arcana☿Illusion
```

[Lean source](../math/Mathematics/ComplexAnalysis/Holomorphic.lean) · [Arcana source](../public/grimoire/holomorphic-whispers.spell)

[HasDerivAt.pow](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Calculus/Deriv/Pow.lean#L109) · [HasDerivAt.comp](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Calculus/Deriv/Comp.lean#L258) · [Complex.hasDerivAt_exp](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/ExpDeriv.lean)

## Shapes summoned by equations

*Affine complex zero loci and vanishing ideals*

Let equations summon a shape, and let the shape answer with every equation that vanishes upon it. Adding constraints makes an apparition shrink.

**Mathematical meaning.** For an ideal J of complex multivariate polynomials, V(J) is the set of common zeros. For a point set S, I(S) consists of every polynomial vanishing on S. J ⊆ K implies V(K) ⊆ V(J), and S ⊆ V(J) iff J ⊆ I(S). The equation xy = 0 cuts out the two complex coordinate axes. Squaring this equation gives the same point set.

**Hypotheses.** Coefficients and point coordinates lie in ℂ. The general constructions allow any coordinate index type; the explicit example uses two coordinates, Fin 2. This is classical affine algebraic geometry of equations and solution sets, not a construction of schemes. Each complex axis is a copy of ℂ, not merely a real line.

**Proof idea.** Unfold the common-zero and vanishing-ideal membership tests. Order reversal and the correspondence reduce to passing an equation and a point to the same evaluation equality. Identify a point’s vanishing ideal with the kernel of its evaluation homomorphism. For the ideal generated by xy, mathlib’s zeroLocus_span reduces every ideal equation to the generator; a field has no zero divisors, so xy = 0 iff x = 0 or y = 0. The same reasoning shows that squaring the generator preserves its zero set.

**A guided reading.** Phantasms meets Illusion in its complex coordinates and Transmutation in its passage between two kinds of description: equations and spaces. Analysis studies limits and derivatives of functions; algebraic geometry here studies shapes defined by polynomial equations. The coordinate field is shared, while the questions differ.

1. **Collect consequences in an ideal** MvPolynomial α ℂ is the ring of polynomials whose variables are indexed by α. An ideal is closed under sums and multiplication by arbitrary polynomials. Thus an ideal generated by chosen equations also contains their polynomial consequences. affineZeroLocus asks that every polynomial in the ideal evaluate to zero. A point is a function α → ℂ assigning one value to each coordinate.

2. **Reverse the inclusion** Adding equations can only remove solutions. In the other direction, requiring vanishing at more points can only remove permissible polynomials. The equivalence S ⊆ V(J) iff J ⊆ I(S) is proved by exchanging the order of the two universal quantifiers. This is an order-reversing Galois connection: viewing one inclusion order oppositely turns it into an adjunction between partially ordered sets, connecting with the two hands of Transmutation. It is not a bijection between arbitrary ideals and arbitrary point sets.

3. **Evaluate a point as a homomorphism** Fixing coordinate values gives a polynomial evaluation map that preserves addition, multiplication, constants, and the complex scalar action. Its kernel is precisely the ideal of equations vanishing at that point. This extends the kernel idea from Enchantment to rings and algebras. For xy, evaluation gives the product of the two coordinate values; the zero-product law splits its zero set into the two coordinate axes. The examples (i,0) and (i,1) test membership exactly.

4. **Notice what the point set forgets** The equations xy = 0 and (xy)² = 0 have identical complex solutions because a complex square is zero exactly when its base is zero. Yet the squared equation records additional multiplicity. This is a first reason to retain algebraic data alongside a picture of points. The folio proves equality of these solution sets; it does not develop multiplicities, the Nullstellensatz, or schemes. Those are later routes from these foundations.

**Try it yourself.** Predict the common-zero set after adding x = 0 to xy = 0. Which direction of the inclusion should hold, and why does squaring xy fail to make its solution set smaller?

<details><summary>A hint</summary>

Adding x = 0 leaves the axis where the first coordinate vanishes. Squaring introduces no new nonzero roots in a field, so it imposes the same condition on individual complex points.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Veyrath✨Lore✨☿✨Hilbert's✨Vanishing✨Oracle✨
beckon ✨Grand✨Archive✨☿Lore☿Umbra☿Foundations
beckon ✨Grand✨Archive✨☿Gestures

ineffable chamber

sanctum Arcana☿Phantasms

/- A point of affine complex space assigns a complex number to each coordinate.
An ideal collects equations and all their polynomial consequences. -/
ritual ✨Apparition✨of✨the✨Covenant✨ ⧼ᚨ ⟡ Essence⊛⧽ ⟪garnet✨seal ⟡ Covenant ⟪✨Many✨Glyph✨Incantations✨ ᚨ Umbrae⟫⟫ ⟡ Host ⟪ᚨ ↝ Umbrae⟫ ⇰
  ✨Many✨Glyph✨Incantations✨☿apparition Umbrae garnet✨seal

ritual ✨Vows✨of✨the✨Apparition✨ ⧼ᚨ ⟡ Essence⊛⧽ ⟪cloud✨of✨chalk ⟡ Host ⟪ᚨ ↝ Umbrae⟫⟫ ⟡ Covenant ⟪✨Many✨Glyph✨Incantations✨ ᚨ Umbrae⟫ ⇰
  ✨Many✨Glyph✨Incantations✨☿✨vanishing✨covenant✨ Umbrae cloud✨of✨chalk

/- More equations can only remove solutions. Read the inclusion backwards:
J is contained in K, while the solution set of K is contained in that of J. -/
spell ✨More✨Vows✨Fewer✨Apparitions✨ ⧼ᚨ ⟡ Essence⊛⧽ ⧼garnet✨seal lapis✨seal ⟡ Covenant ⟪✨Many✨Glyph✨Incantations✨ ᚨ Umbrae⟫⧽
    ⟪vowward ⟡ garnet✨seal ⋜ lapis✨seal⟫ ⟡ ✨Apparition✨of✨the✨Covenant✨ lapis✨seal ⊆ ✨Apparition✨of✨the✨Covenant✨ garnet✨seal ⇰ cast
  summon jade✨cube sigilward ruby✨shard primalward
  missile sigilward ruby✨shard ⟪vowward primalward⟫

/- The same statement can be read from either side: each point solves every
equation, or each equation vanishes at every point. This is a Galois connection. -/
spell ✨The✨Two✨Faces✨of✨an✨Apparition✨ ⧼ᚨ ⟡ Essence⊛⧽ ⟪garnet✨seal ⟡ Covenant ⟪✨Many✨Glyph✨Incantations✨ ᚨ Umbrae⟫⟫
    ⟪cloud✨of✨chalk ⟡ Host ⟪ᚨ ↝ Umbrae⟫⟫ ⟡ cloud✨of✨chalk ⊆ ✨Apparition✨of✨the✨Covenant✨ garnet✨seal ↭ garnet✨seal ⋜ ✨Vows✨of✨the✨Apparition✨ cloud✨of✨chalk ⇰ cast
  fabricate
  ❖ summon apparitionward ruby✨shard primalward jade✨cube sigilward
    missile apparitionward sigilward ruby✨shard primalward
  ❖ summon fadeguard jade✨cube sigilward ruby✨shard primalward
    missile fadeguard primalward jade✨cube sigilward

/- Evaluation at a point preserves addition and multiplication. Its kernel
is exactly the ideal of equations vanishing at that point. -/
spell ✨A✨Sigil's✨Vows✨Are✨Its✨Silence✨ ⧼ᚨ ⟡ Essence⊛⧽ ⟪jade✨cube ⟡ ᚨ ↝ Umbrae⟫ ⟡
    ✨Vows✨of✨the✨Apparition✨ ⧼jade✨cube⧽ ≣ Emissary☿silence ⟪✨Many✨Glyph✨Incantations✨☿✨conjure✨at✨the✨sigils✨ jade✨cube⟫☿✨unveil✨the✨Veyrath✨pact✨ ⇰ cast
  extend ruby✨shard
  purify ⟮✨Vows✨of✨the✨Apparition✨᛫ Emissary☿✨Silence✨Criterion✨⟯

/- In two coordinates, the equation xy = 0 describes the union of the axes.
Fin 2 names the coordinates; each coordinate itself can be any complex number. -/
ritual ✨The✨Crossed✨Apparition✨ ⟡ ✨Many✨Glyph✨Incantations✨ ⟪Fetter 二⟫ Umbrae ⇰
  ✨Many✨Glyph✨Incantations✨☿✨coordinate✨glyph✨ 〇 ⊛ ✨Many✨Glyph✨Incantations✨☿✨coordinate✨glyph✨ 一

ritual ✨Covenant✨of✨Crossed✨Apparitions✨ ⟡ Covenant ⟪✨Many✨Glyph✨Incantations✨ ⟪Fetter 二⟫ Umbrae⟫ ⇰
  Covenant☿consecrate ⧼✨The✨Crossed✨Apparition✨⧽

spell ✨One✨Arm✨or✨the✨Other✨ ⟪jade✨cube ⟡ Fetter 二 ↝ Umbrae⟫ ⟡
    jade✨cube ∈ ✨Apparition✨of✨the✨Covenant✨ ✨Covenant✨of✨Crossed✨Apparitions✨ ↭ jade✨cube 〇 ≣ 〇 ⩔ jade✨cube 一 ≣ 〇 ⇰ cast
  transmute ⟮✨Apparition✨of✨the✨Covenant✨᛫ ✨Covenant✨of✨Crossed✨Apparitions✨᛫ ✨Many✨Glyph✨Incantations✨☿✨the✨seeds✨summon✨the✨shape✨⟯
  purify ⟮✨The✨Crossed✨Apparition✨᛫ ✨a✨silent✨binding✨betrays✨a✨silence✨⟯

/- The point (i, 0) lies on the horizontal complex axis. The point (i, 1)
lies on neither axis. These are exact complex-coordinate computations. -/
spell ✨The✨Ember✨Rests✨upon✨the✨Cross✨ ⟡
    ⟪!⟮Umbra☿✨Imaginary✨Ember✨᛫ 〇⟯ ⟡ Fetter 二 ↝ Umbrae⟫ ∈ ✨Apparition✨of✨the✨Covenant✨ ✨Covenant✨of✨Crossed✨Apparitions✨ ⇰ cast
  transmute ⟮✨One✨Arm✨or✨the✨Other✨⟯
  missile Either☿choose✨right mirror

spell ✨The✨Ember✨Escapes✨the✨Cross✨ ⟡
    ⟪!⟮Umbra☿✨Imaginary✨Ember✨᛫ 一⟯ ⟡ Fetter 二 ↝ Umbrae⟫ ∉ ✨Apparition✨of✨the✨Covenant✨ ✨Covenant✨of✨Crossed✨Apparitions✨ ⇰ cast
  transmute ⟮✨One✨Arm✨or✨the✨Other✨⟯
  purify

/- Squaring an equation changes its multiplicity, but not its zero set over
the complex field. A bare set of solutions forgets this extra algebraic data. -/
spell ✨A✨Deeper✨Vow✨Casts✨the✨Same✨Shape✨ ⟡
    ✨Apparition✨of✨the✨Covenant✨ ⟪Covenant☿consecrate ⧼✨The✨Crossed✨Apparition✨ ⌃ 二⧽⟫ ≣
      ✨Apparition✨of✨the✨Covenant✨ ✨Covenant✨of✨Crossed✨Apparitions✨ ⇰ cast
  extend jade✨cube
  transmute ⟮✨Apparition✨of✨the✨Covenant✨᛫ ✨Many✨Glyph✨Incantations✨☿✨the✨seeds✨summon✨the✨shape✨᛫ ✨One✨Arm✨or✨the✨Other✨⟯
  purify ⟮✨The✨Crossed✨Apparition✨᛫ ✨a✨silent✨binding✨betrays✨a✨silence✨⟯

seal Arcana☿Phantasms
```

[Lean source](../math/Mathematics/AlgebraicGeometry/AffineZeroLoci.lean) · [Arcana source](../public/grimoire/affine-phantasms.spell)

[MvPolynomial.zeroLocus](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/RingTheory/Nullstellensatz.lean#L40) · [MvPolynomial.vanishingIdeal](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/RingTheory/Nullstellensatz.lean#L62) · [MvPolynomial.zeroLocus_span](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/RingTheory/Nullstellensatz.lean#L96) · [MvPolynomial.aeval](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/MvPolynomial/Eval.lean#L593)

## The sixfold omen

*Finite probability, expectation, and independent draws*

Cast a fair six-faced die, weigh an event, read an average reward, and cast twice without letting the first omen alter the second.

**Mathematical meaning.** A probability mass function assigns nonnegative weights totaling one. Our fair die assigns 1/6 to each of six outcomes; the event of an even face has probability 1/2 and the expected face is 7/2. Two independently drawn dice give every ordered pair probability 1/36, including double six.

**Hypotheses.** The outcome carrier is Fin 6, whose indices are 0 through 5; dieFace adds one to obtain faces 1 through 6. Probabilities live in ℝ≥0∞, Mathlib's extended nonnegative reals, but normalization makes the individual masses finite. Payoffs and their expectations are real. Independence is built into the second draw using the same distribution for every first outcome.

**Proof idea.** Construct the PMF by proving the six constant weights sum to one. Turn it into a probability measure to evaluate the even-face event. Mathlib's integral_eq_sum reduces the expected payoff to a weighted finite sum. The joint distribution uses bind followed by map; expanding those operations leaves just the chosen first and second outcome, yielding (1/6)(1/6).

**A guided reading.** Augury starts with a model of what could happen. Its weights describe uncertainty before observing an outcome. This folio builds an actual Mathlib probability object, so event probabilities and expected values are connected to the same underlying measure.

1. **Normalize the possible outcomes** Fin 6 contains six indices, beginning at zero. fairDie gives each weight 1/6 and supplies the proof required by PMF.ofFintype: the weights sum to one. Nonnegativity comes from the probability's type. fairDie_mass reads one weight, while fairDie_total checks the whole distribution.

2. **An event collects outcomes** The even faces 2, 4, and 6 correspond to indices 1, 3, and 5. Applying fairDie.toMeasure to that finite set adds three disjoint singleton masses, giving 1/2. The use of toReal in the calculation transports an equality between finite probabilities to ordinary real arithmetic; it does not change the probability model.

3. **An expectation is a weighted average** dieFace assigns each index its displayed face. The integral against fairDie.toMeasure is its expectation. integral_eq_sum changes that integral into six weighted terms, whose total is 7/2. No face is labeled 3.5: an expected value is a summary of a distribution, not a promise about the next throw.

4. **Build independence explicitly** In independentDice, bind first samples i; the inner map samples j from fairDie and keeps the ordered pair (i,j). The distribution used for j never depends on i. Expanding the two finite sums proves every pair has mass 1/36. If the second distribution depended on i, the same multiplication rule would not follow merely from having two dice.

**Try it yourself.** Which indices form the event that a face is at least five? What probability should its toMeasure calculation give, and why is that different from the expected face?

<details><summary>A hint</summary>

Faces five and six are indices four and five, so their two masses add to 1/3. Expectation instead sums all six face values multiplied by their probabilities. Browser edits remain unchecked drafts until Lean is run.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Omen✨Lore✨☿✨Augurglass✨Craft✨☿Gatherings
beckon ✨Grand✨Archive✨☿Gestures

sanctum Arcana☿Divination☿Augury

unveil attuned ✨Chorus✨Rites✨ ✨Unbounded✨Omenweight✨
unveil ✨Measure✨Lore✨

/- A probability mass function stores nonnegative weights whose total is one.
The six indices are 0 through 5; the displayed die faces are one greater. -/
ineffable ritual ✨Sixfold✨Omen✨ ⟡ Augurglass ⟪Fetter 六⟫ ⇰
  Augurglass☿✨from✨counted✨weights✨ ⟪conjure ▢ ⇉ 一 ⧶ 六⟫ ⟪cast
    numerology
    missile ✨Unbounded✨Omenweight✨☿✨Binding✨Undone✨ ⟪cast numerology⟫ ⟪cast boundedness⟫⟫

spell ✨Weight✨of✨Each✨Face✨ ⟪opal✨dust ⟡ Fetter 六⟫ ⟡ ✨Sixfold✨Omen✨ opal✨dust ≣ 一 ⧶ 六 ⇰ mirror

spell ✨The✨Whole✨Omen✨ ⟡ ∑ opal✨dust᛫ ✨Sixfold✨Omen✨ opal✨dust ≣ 一 ⇰ cast
  clarify solely ⟮✨gather✨a✨counted✨chorus✨⟯ through ✨Sixfold✨Omen✨☿✨all✨omenweights✨are✨one✨

/- The outcome indices 1, 3, 5 correspond to faces 2, 4, 6.
An event is a set of outcomes, and its probability adds their masses. -/
spell ✨Three✨Faces✨Claim✨Half✨the✨Omen✨ ⟡
    ✨Sixfold✨Omen✨☿✨weigh✨the✨omens✨ ⟪⧼一᛫ 三᛫ 五⧽ ⟡ Band ⟪Fetter 六⟫⟫ ≣ 一 ⧶ 二 ⇰ cast
  transmute ⟮Augurglass☿✨weigh✨a✨band✨of✨omens✨⟯
  shapeshift ⟪一 ⧶ 六 ⟡ Fluxes⋝〇∞⟫ ⧾ ⟪一 ⧶ 六 ⧾ ⟪一 ⧶ 六 ⧾ 〇⟫⟫ ≣ 一 ⧶ 二
  channel ⟪✨Unbounded✨Omenweight✨☿✨finite✨weights✨agree✨when✨unveiled✨ ⟪cast boundedness⟫ ⟪cast boundedness⟫⟫☿onward
  numerology ⟮✨Unbounded✨Omenweight✨☿✨unveil✨joined✨weights✨⟯

/- A random variable assigns a real payoff to every outcome.
Expectation weights those payoffs by their probabilities; it need not be an outcome. -/
ritual ✨Face✨of✨the✨Omen✨ ⟪opal✨dust ⟡ Fetter 六⟫ ⟡ Fluxes ⇰ opal✨dust☿core ⧾ 一

spell ✨Balance✨the✨Sixfold✨Omen✨ ⟡ ∫ opal✨dust᛫ ✨Face✨of✨the✨Omen✨ opal✨dust ∂✨Sixfold✨Omen✨☿✨weigh✨the✨omens✨ ≣ 七 ⧶ 二 ⇰ cast
  transmute ⟮Augurglass☿✨gather✨the✨finite✨weights✨⟯
  numerology ⟮✨Weight✨of✨Each✨Face✨᛫ ✨Face✨of✨the✨Omen✨᛫ Fetter☿✨gather✨one✨face✨at✨a✨time✨⟯

/- Resampling from the same distribution inside bind makes the two draws independent.
Keeping both indices, rather than just their sum, records the full joint outcome. -/
ineffable ritual ✨Twin✨Unentangled✨Omens✨ ⟡ Augurglass ⟪Fetter 六 ⨯ Fetter 六⟫ ⇰
  ✨Sixfold✨Omen✨☿✨cast✨then✨cast✨ ⟪conjure opal✨dust ⇉ ✨Sixfold✨Omen✨☿enchant ⟪conjure quartz✨chip ⇉ ⟪opal✨dust᛫ quartz✨chip⟫⟫⟫

spell ✨Weight✨of✨the✨Twin✨Faces✨ ⟪opal✨dust quartz✨chip ⟡ Fetter 六⟫ ⟡ ✨Twin✨Unentangled✨Omens✨ ⟪opal✨dust᛫ quartz✨chip⟫ ≣ 一 ⧶ 三六 ⇰ cast
  purify ⟮✨Twin✨Unentangled✨Omens✨᛫ Augurglass☿✨unfold✨the✨second✨casting✨᛫ Augurglass☿✨unfold✨the✨carried✨omen✨᛫ ✨gather✨a✨counted✨chorus✨᛫ ✨Weight✨of✨Each✨Face✨᛫ ✨split✨the✨twin✨portent✨⟯
  channel ⟪✨Unbounded✨Omenweight✨☿✨finite✨weights✨agree✨when✨unveiled✨ ⟪cast boundedness⟫ ⟪cast boundedness⟫⟫☿onward
  numerology

/- Singleton events expose the same mass as the probability mass function.
Multiplication of 1/6 by 1/6 is justified by our independent joint construction. -/
spell ✨Both✨Omens✨Show✨the✨Last✨Face✨ ⟡
    ✨Twin✨Unentangled✨Omens✨☿✨weigh✨the✨omens✨ ⟪⧼⟪五᛫ 五⟫⧽ ⟡ Host ⟪Fetter 六 ⨯ Fetter 六⟫⟫ ≣ 一 ⧶ 三六 ⇰ cast
  transmute ⟮Augurglass☿✨weigh✨one✨omen✨ ▢ ▢ ⟪✨one✨face✨may✨be✨weighed✨ ▢⟫⟯
  missile ✨Weight✨of✨the✨Twin✨Faces✨ 五 五

seal Arcana☿Divination☿Augury
```

[Lean source](../math/Mathematics/Probability.lean) · [Arcana source](../public/grimoire/augury.spell)

[PMF.ofFintype](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Probability/ProbabilityMassFunction/Constructions.lean#L204) · [PMF.toMeasure_apply_finset](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Probability/ProbabilityMassFunction/Basic.lean#L279) · [PMF.integral_eq_sum](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Probability/ProbabilityMassFunction/Integrals.lean#L47) · [PMF.bind_apply](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Probability/ProbabilityMassFunction/Monad.lean#L113) · [PMF.map_apply](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Probability/ProbabilityMassFunction/Constructions.lean#L54)

## The still center of the mirror

*Sample means, empirical variance, and least squares*

Gather observed readings into a mirror, locate their center, and distinguish the mirror's spread from a guess about unseen worlds.

**Mathematical meaning.** For a nonempty finite dataset, the mean is the sum divided by the number of observations. The empirical variance averages squared deviations from that mean. Centered readings average to zero; adding a constant changes the mean but preserves variance. The mean minimizes average squared distance. For [1,2,3,6], the mean is 3, empirical variance is 7/2, and the corrected n−1 calculation gives 14/3.

**Hypotheses.** Observations are real values indexed by an arbitrary nonempty finite type, so repeated values count separately. All general laws concern a fixed dataset. The variance divides by n and equals the variance of its uniform empirical distribution; the concrete corrected calculation divides by n−1. No i.i.d. sampling, unbiasedness theorem, confidence interval, or inference about an unknown population is asserted.

**Proof idea.** Use Mathlib's Finset.expect for equal-weight finite averages. Its linearity proves shift and centering laws. Expand (x−mean)² and average term by term to get the second-moment identity. Expanding (x−c)² then yields empiricalVariance + (mean−c)², whose nonnegative final term proves least-squares minimization. Evaluate the example with exact real arithmetic.

**A guided reading.** Scrying begins after readings have been observed. A probability model says how observations might arise; descriptive statistics summarize the observations we actually have. These algebraic facts need no assumptions about how the data were collected.

1. **Keep observations, including repetitions** The input x : ι → ℝ is indexed data. Two indices with the same value still contribute twice; averaging the set of distinct values would change the question. sampleMean uses Finset.expect on all indices. The nonempty condition ensures this has the usual interpretation as a sum divided by a positive count.

2. **Separate center from spread** Subtracting the mean makes the average deviation zero. Squaring deviations prevents positive and negative deviations from canceling. empiricalVariance averages those squares with denominator n. Expanding the square gives mean(x²)−mean(x)². This identity is exact, though direct evaluation of that subtraction in floating-point software can lose accuracy.

3. **Why the mean is the least-squares center** For any proposed center c, mean_squared_distance splits its loss into empiricalVariance x plus (sampleMean x−c)². The latter term is nonnegative and vanishes at the mean. This proves an optimization property of the mean using finite sums and algebra. It does not claim the mean minimizes absolute deviations or is resistant to outliers.

4. **Read the denominator before interpreting variance** The data [1,2,3,6] have mean 3 and squared deviations 4,1,0,9, totaling 14. Dividing by four gives the empirical or descriptive variance 7/2. Dividing by three gives the corrected sample variance 14/3. Calling the corrected statistic unbiased for a population variance additionally requires a sampling model with independent identically distributed observations and finite second moment; that probabilistic theorem is outside this folio.

**Try it yourself.** Add ten to every observation without expanding the four values. What are the new mean, empirical variance, and average squared distance from the old mean?

<details><summary>A hint</summary>

The shift laws give new mean 13 and unchanged variance 7/2. The distance identity with center 3 adds the penalty (13−3)², giving 207/2. This is a statement about the transformed fixed dataset.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Bound✨Veyrath✨☿Ranks☿✨Chorus✨Rites✨☿✨Balance✨Readings✨
beckon ✨Grand✨Archive✨☿Gestures

sanctum Arcana☿Divination☿Scrying

unveil attuned ✨Chorus✨Rites✨

familiar ⧼ᛁ ⟡ Essence⊛⧽ ⟮Counted ᛁ⟯ ⟮Inhabited ᛁ⟯

/- An index denotes an observation, so equal observed values are still counted twice.
The nonempty hypothesis rules out the empty dataset convention of Finset.expect. -/
ineffable ritual ✨Center✨of✨the✨Mirror✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟡ Fluxes ⇰ Band☿everywhere✨at✨once☿✨balance✨the✨readings✨ jade✨cube

/- This descriptive variance divides by the number of observations, not by n - 1.
It is the variance of the empirical distribution that weights every index equally. -/
ineffable ritual ✨Spread✨in✨the✨Mirror✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟡ Fluxes ⇰
  ✨Center✨of✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ ⟪jade✨cube opal✨dust ⧿ ✨Center✨of✨the✨Mirror✨ jade✨cube⟫ ⌃ 二⟫

spell ✨Move✨Every✨Reading✨Move✨the✨Center✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟪yew ⟡ Fluxes⟫ ⟡
    ✨Center✨of✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ jade✨cube opal✨dust ⧾ yew⟫ ≣ ✨Center✨of✨the✨Mirror✨ jade✨cube ⧾ yew ⇰ cast
  purify ⟮✨Center✨of✨the✨Mirror✨᛫ Band☿✨balance✨joined✨readings✨⟯

spell ✨Centered✨Readings✨Balance✨to✨Stillness✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟡
    ✨Center✨of✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ jade✨cube opal✨dust ⧿ ✨Center✨of✨the✨Mirror✨ jade✨cube⟫ ≣ 〇 ⇰ cast
  purify ⟮✨Center✨of✨the✨Mirror✨᛫ Band☿✨balance✨sundered✨readings✨⟯

dismissal ⟮Inhabited ᛁ⟯ within
spell ✨The✨Mirror's✨Spread✨Cannot✨Sink✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟡ 〇 ⋜ ✨Spread✨in✨the✨Mirror✨ jade✨cube ⇰ cast
  missile Band☿✨balance✨cannot✨sink✨ ⟪conjure opal✨dust ▢ ⇉ ✨a✨doubled✨ascent✨cannot✨sink✨ ⟪jade✨cube opal✨dust ⧿ ✨Center✨of✨the✨Mirror✨ jade✨cube⟫⟫

/- Expanding the square turns spread into mean-square minus square-mean.
Linearity of a finite average lets each algebraic term move outside the sum. -/
spell ✨Unfold✨the✨Mirror's✨Spread✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟡
    ✨Spread✨in✨the✨Mirror✨ jade✨cube ≣ ✨Center✨of✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ jade✨cube opal✨dust ⌃ 二⟫ ⧿ ✨Center✨of✨the✨Mirror✨ jade✨cube ⌃ 二 ⇰ cast
  unseal ✨Spread✨in✨the✨Mirror✨ ✨Center✨of✨the✨Mirror✨
  polish ⟮✨unfold✨the✨sundered✨double✨ascent✨᛫ Band☿✨balance✨joined✨readings✨᛫ Band☿✨balance✨sundered✨readings✨᛫
    ↜ Band☿✨scale✨after✨balancing✨᛫ ↜ Band☿✨scale✨before✨balancing✨⟯
  purify
  circlet

/- A common shift changes location, but every centered observation stays the same. -/
spell ✨Move✨the✨Mirror✨Keep✨the✨Spread✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟪yew ⟡ Fluxes⟫ ⟡
    ✨Spread✨in✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ jade✨cube opal✨dust ⧾ yew⟫ ≣ ✨Spread✨in✨the✨Mirror✨ jade✨cube ⇰ cast
  unseal ✨Spread✨in✨the✨Mirror✨
  transmute ⟮✨Move✨Every✨Reading✨Move✨the✨Center✨⟯
  attune 一
  oath opal✨dust
  attune 一
  circlet

/- The average squared distance to any proposed center splits into spread
and a nonnegative penalty for moving away from the sample mean. -/
spell ✨The✨Mirror's✨Center✨and✨Its✨Wandering✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟪yew ⟡ Fluxes⟫ ⟡
    ✨Center✨of✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ ⟪jade✨cube opal✨dust ⧿ yew⟫ ⌃ 二⟫ ≣
      ✨Spread✨in✨the✨Mirror✨ jade✨cube ⧾ ⟪✨Center✨of✨the✨Mirror✨ jade✨cube ⧿ yew⟫ ⌃ 二 ⇰ cast
  transmute ⟮✨Unfold✨the✨Mirror's✨Spread✨⟯
  unseal ✨Center✨of✨the✨Mirror✨
  polish ⟮✨unfold✨the✨sundered✨double✨ascent✨᛫ Band☿✨balance✨joined✨readings✨᛫ Band☿✨balance✨sundered✨readings✨᛫
    ↜ Band☿✨scale✨after✨balancing✨᛫ ↜ Band☿✨scale✨before✨balancing✨⟯
  purify
  circlet

spell ✨The✨Center✨Is✨the✨Stillest✨Place✨ ⟪jade✨cube ⟡ ᛁ ↝ Fluxes⟫ ⟪yew ⟡ Fluxes⟫ ⟡
    ✨Spread✨in✨the✨Mirror✨ jade✨cube ⋜ ✨Center✨of✨the✨Mirror✨ ⟪conjure opal✨dust ⇉ ⟪jade✨cube opal✨dust ⧿ yew⟫ ⌃ 二⟫ ⇰ cast
  transmute ⟮✨The✨Mirror's✨Center✨and✨Its✨Wandering✨⟯
  missile ✨adding✨a✨rising✨weight✨cannot✨lower✨ ⟪✨a✨doubled✨ascent✨cannot✨sink✨ ▢⟫

/- The four observations have mean 3 and squared deviations 4, 1, 0, 9.
The calculation is exact over the reals, not rounded floating-point arithmetic. -/
ritual ✨Four✨Mirror✨Readings✨ ⟡ Fetter 四 ↝ Fluxes ⇰ !⟮一᛫ 二᛫ 三᛫ 六⟯

spell ✨Center✨the✨Four✨Readings✨ ⟡ ✨Center✨of✨the✨Mirror✨ ✨Four✨Mirror✨Readings✨ ≣ 三 ⇰ cast
  numerology ⟮✨Center✨of✨the✨Mirror✨᛫ Band☿✨gather✨then✨share✨the✨readings✨᛫ ✨Four✨Mirror✨Readings✨᛫ Fetter☿✨gather✨one✨face✨at✨a✨time✨⟯

spell ✨Spread✨of✨the✨Four✨Readings✨ ⟡ ✨Spread✨in✨the✨Mirror✨ ✨Four✨Mirror✨Readings✨ ≣ 七 ⧶ 二 ⇰ cast
  transmute ⟮✨Spread✨in✨the✨Mirror✨᛫ ✨Center✨the✨Four✨Readings✨⟯
  numerology ⟮✨Center✨of✨the✨Mirror✨᛫ Band☿✨gather✨then✨share✨the✨readings✨᛫ ✨Four✨Mirror✨Readings✨᛫ Fetter☿✨gather✨one✨face✨at✨a✨time✨⟯

/- Dividing the same sum of squared deviations by n - 1 gives the usual
corrected sample variance. Calling it unbiased needs an i.i.d. sampling model
and finite second moments; this calculation does not assume or prove that model. -/
spell ✨Share✨the✨Spread✨One✨Way✨Fewer✨ ⟡
    ⟪∑ opal✨dust᛫ ⟪✨Four✨Mirror✨Readings✨ opal✨dust ⧿ ✨Center✨of✨the✨Mirror✨ ✨Four✨Mirror✨Readings✨⟫ ⌃ 二⟫ ⧶ ⟪四 ⧿ 一⟫ ≣ ⟪一四 ⧶ 三 ⟡ Fluxes⟫ ⇰ cast
  transmute ⟮✨Center✨the✨Four✨Readings✨⟯
  numerology ⟮✨Four✨Mirror✨Readings✨᛫ Fetter☿✨gather✨one✨face✨at✨a✨time✨⟯

seal Arcana☿Divination☿Scrying
```

[Lean source](../math/Mathematics/Statistics.lean) · [Arcana source](../public/grimoire/scrying.spell)

[Finset.expect](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/BigOperators/Expect.lean#L61) · [Finset.expect_eq_sum_div_card](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/BigOperators/Expect.lean#L371) · [Finset.expect_sub_distrib](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/BigOperators/Expect.lean#L313) · [Finset.expect_nonneg](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Algebra/Order/BigOperators/Expect.lean#L59)

## Fermat's returning embers

*Congruences, primes, and modular powers*

Read immense powers through the small marks they leave on a clock, and learn which returns demand an indivisible modulus.

**Mathematical meaning.** Congruences preserve polynomial calculations. If a prime divides a square, it divides the base; a composite modulus can fail this rule. Fermat's little theorem gives a^(p−1) ≡ 1 modulo prime p when a is coprime to p. It reduces 2^100 modulo 7 to 2 without expanding the large power. In the field ZMod 7, the inverse of 3 is 5.

**Hypotheses.** Modular congruence compares natural-number remainders. The prime factor rule assumes Nat.Prime p. Fermat additionally assumes coprimality, and the ZMod return law assumes a nonzero residue and a prime modulus. The examples include explicit counterexamples when primality or coprimality is omitted.

**Proof idea.** Transport a congruence through squaring and addition, then compute only a small remainder. Reduce prime divisibility of a square to Mathlib's product rule. Apply Fermat to 2 modulo 7, raise its six-step return to the sixteenth power, and split 100 = 6·16+4. The inverse calculation proves 5·3=1 in ZMod 7 and uses the characterization of inverses.

**A guided reading.** Arithmancy extracts exact structure from whole numbers. Remainders turn huge computations into small ones, while prime hypotheses explain when strong cancellation and return laws are available. Its link to Enchantment is the multiplicative group of nonzero residues in a finite field.

1. **Calculate with remainders first** a ≡ b [MOD n] means a and b have the same remainder modulo n. It is not ordinary equality. Squaring both sides and adding one preserves congruence. Thus 17 can be replaced by 2 before evaluating 17²+1 modulo 5; the smaller expression already has remainder zero.

2. **Ask what primality buys** A prime is a natural number greater than one with no positive divisors except one and itself. Mathlib's prime product rule says p∣ab forces p∣a or p∣b. Taking the two factors equal proves the square rule. The example 4∣2·2 but 4∤2 shows exactly why a general modulus cannot replace a prime.

3. **Reduce the exponent with Fermat** Pierre de Fermat's little theorem says a^(p−1) returns to one modulo a prime p when the base is coprime to p. For p=7 and a=2, six powers form one return. Break 100 into sixteen blocks of six plus four; each block becomes one, leaving 2⁴, whose remainder is 2. The Lean proof invokes the general library theorem and shows the reduction step by step.

4. **Move into the residue field** ZMod p packages residues as a mathematical carrier. A prime modulus gives a field, so every nonzero residue has an inverse and the congruence return becomes equality inside that field. In ZMod 7, 5·3=1 proves 3⁻¹=5. The final counterexample uses base 7 itself: its sixth power is zero modulo 7, illustrating the missing coprimality condition.

**Try it yourself.** Use the same six-step return to predict 2^101 modulo 7. Then explain why repeating this argument with base 7 would fail before the exponent reduction even begins.

<details><summary>A hint</summary>

Multiply the proved remainder for 2^100 by 2, giving remainder 4. For base 7, gcd(7,7)=7, so the coprimality hypothesis needed to obtain a six-step return is unavailable.

</details>

```text
beckon ✨Grand✨Archive✨☿✨Veyrion✨Lore✨☿Bounded☿Foundations
beckon ✨Grand✨Archive✨☿Gestures

sanctum Arcana☿Divination☿Arithmancy

/- Congruence records equal remainders after division by a modulus.
Reducing first keeps calculations small while addition and multiplication survive. -/
spell ✨The✨Clock✨Remembers✨the✨Rite✨ ⧼pinch✨of✨sulfur ash elm ⟡ Tallies⧽ ⟪ward ⟡ ash ≡ elm ⟮CLOCK pinch✨of✨sulfur⟯⟫ ⟡
    ash ⌃ 二 ⧾ 一 ≡ elm ⌃ 二 ⧾ 一 ⟮CLOCK pinch✨of✨sulfur⟯ ⇰
  ⟪ward☿ascend 二⟫☿✨append✨the✨same✨chime✨ 一

spell ✨Reduce✨the✨Rite✨upon✨Five✨ ⟡ ⟪一七 ⌃ 二 ⧾ 一⟫ % 五 ≣ 〇 ⇰ cast
  bind clockward ⟡ 一七 ≡ 二 ⟮CLOCK 五⟯ ⇰ cast divine
  bind riteward ⇰ ✨The✨Clock✨Remembers✨the✨Rite✨ clockward
  bind voidmark ⟡ 一七 ⌃ 二 ⧾ 一 ≡ 〇 ⟮CLOCK 五⟯ ⇰ riteward☿chain ⟪cast divine⟫
  missile voidmark

/- A prime dividing a product must divide a factor. Applying that fact to a square
exposes why primality is stronger than just being a positive modulus. -/
spell ✨Indivisible✨Finds✨the✨Root✨ ⧼ruby✨shard ash ⟡ Tallies⧽ ⟪primalward ⟡ ruby✨shard☿Indivisible⟫ ⟪ward ⟡ ruby✨shard ∣ ash ⌃ 二⟫ ⟡ ruby✨shard ∣ ash ⇰ cast
  transmute ⟮✨Unfold✨the✨Double✨Ascent✨⟯ upon ward
  rend primalward☿✨Indivisible✨Catches✨a✨Factor✨☿onward ward whence sunward ⫽ moonward
  ❖ missile sunward
  ❖ missile moonward

spell ✨A✨Divisible✨Clock✨Breaks✨the✨Rule✨ ⟡
    四 ∣ 二 ⊛ 二 ⩓ ⫬四 ∣ 二 ⇰ cast divine

/- Fermat's little theorem connects arithmetic to the finite group of nonzero
residues modulo a prime. Mathlib proves this general theorem; we apply it below. -/
spell ✨Fermat's✨Returning✨Embers✨ ⧼ruby✨shard ash ⟡ Tallies⧽ ⟪primalward ⟡ ruby✨shard☿Indivisible⟫ ⟪unsharedward ⟡ ash☿✨No✨Shared✨Measure✨ ruby✨shard⟫ ⟡
    ash ⌃ ⟪ruby✨shard ⧿ 一⟫ ≡ 一 ⟮CLOCK ruby✨shard⟯ ⇰
  Tally☿✨Same✨Clockmark✨☿✨Fermat's✨Little✨Return✨ primalward unsharedward

/- Since 100 = 6 * 16 + 4, Fermat reduces the exponent before the remainder is read.
The proof never has to expand the huge integer 2^100. -/
spell ✨A✨Hundred✨Ascents✨upon✨Seven✨ ⟡ 二 ⌃ 一〇〇 % 七 ≣ 二 ⇰ cast
  bind fermatward ⟡ 二 ⌃ 六 ≡ 一 ⟮CLOCK 七⟯ ⇰
    ✨Fermat's✨Returning✨Embers✨ ⟪cast divine⟫ ⟪cast divine⟫
  bind blockward ⟡ ⟪二 ⌃ 六⟫ ⌃ 一六 ≡ 一 ⟮CLOCK 七⟯ ⇰ cast
    clarify through fermatward☿ascend 一六
  bind clockward ⟡ 二 ⌃ 一〇〇 ≡ 二 ⌃ 四 ⟮CLOCK 七⟯ ⇰ cast
    litany
      二 ⌃ 一〇〇 ≣ ⟪二 ⌃ 六⟫ ⌃ 一六 ⊛ 二 ⌃ 四 ⇰ cast transmute ⟮↜ ✨Nested✨Ascent✨᛫ ↜ ✨Join✨the✨Ascents✨⟯
      ▢ ≡ 一 ⊛ 二 ⌃ 四 ⟮CLOCK 七⟯ ⇰ blockward☿✨bind✨the✨same✨right✨charm✨ ▢
      ▢ ≣ 二 ⌃ 四 ⇰ ✨Silence✨Before✨the✨Binding✨ ▢
  bind twinmark ⟡ 二 ⌃ 一〇〇 ≡ 二 ⟮CLOCK 七⟯ ⇰ clockward☿chain ⟪cast divine⟫
  missile twinmark

/- Modular arithmetic also has a carrier: ZMod p is a field when p is prime.
Inside that field the same return law is an ordinary equality. -/
spell ✨The✨Veyrion's✨Ember✨Returns✨ ⧼ruby✨shard ⟡ Tallies⧽ ⟮Witnessed ruby✨shard☿Indivisible⟯ ⟪ash ⟡ Clockwork ruby✨shard⟫ ⟪ashward ⟡ ash ≢ 〇⟫ ⟡
    ash ⌃ ⟪ruby✨shard ⧿ 一⟫ ≣ 一 ⇰
  Clockwork☿✨Fermat's✨Little✨Return✨ ashward

spell ✨Undo✨Three✨upon✨the✨Sevenfold✨Clock✨ ⟡ ⟪三 ⟡ Clockwork 七⟫† ≣ 五 ⇰ cast
  dub ⟡ Witnessed ⟪Tally☿Indivisible 七⟫ ⇰ ⦉cast divine⦊
  channel ✨a✨left✨undoer✨is✨the✨undoer✨
  divine

/- Removing Fermat's coprimality hypothesis is false: a multiple of the prime
has zero residue, and positive powers keep that zero. -/
spell ✨Shared✨Measures✨Break✨the✨Return✨ ⟡ ⫬⟪七 ⌃ 六 ≡ 一 ⟮CLOCK 七⟯⟫ ⇰ cast divine

seal Arcana☿Divination☿Arithmancy
```

[Lean source](../math/Mathematics/NumberTheory.lean) · [Arcana source](../public/grimoire/arithmancy.spell)

[Nat.ModEq.pow](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/Nat/ModEq.lean#L157) · [Nat.Prime.dvd_mul](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Data/Nat/Prime/Defs.lean#L422) · [Nat.ModEq.pow_card_sub_one_eq_one](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/FieldTheory/Finite/Basic.lean#L665) · [ZMod.pow_card_sub_one_eq_one](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/FieldTheory/Finite/Basic.lean)

## Embers beyond the last breath

*Real limits, continuity, and a first derivative*

An ember can fade forever without vanishing at any finite instant. Learn to describe its approach precisely, then measure change at a single point.

**Mathematical meaning.** For any real amplitude a and 0 ≤ r < 1, the sequence a·rⁿ tends to zero. Every positive tolerance eventually contains all remaining terms. If a and r are positive, each finite term is still positive. The derivative of x² is 2x, and differentiability gives continuity.

**Hypotheses.** The sequence is indexed by natural numbers and takes real values. Convergence assumes 0 ≤ r < 1; positivity separately assumes a > 0 and r > 0. The square derivative holds at every real x. These are foundations of real analysis, with no differential-equation or PDE claims.

**Proof idea.** Start with the recurrence from the power law. Apply Mathlib’s geometric-limit theorem and multiply its limit by a. Unpack the metric definition of convergence into an epsilon-N statement. Positivity follows from positivity of products and powers. Finally specialize the power rule for derivatives to the identity function squared.

**A guided reading.** Analysis makes “getting closer” precise. Geometric fading is a familiar sequence where an exact recurrence, an infinite limiting claim, and a finite error tolerance can all be compared. The last two spells introduce local change, preparing the passage to operators.

1. **Separate the rule from its limit** geometricDecay a r n is a·rⁿ. At n = 0 it is a; advancing one step multiplies the current value by r. These identities need no restriction on a or r. The restrictions enter only when we ask whether the sequence converges to zero.

2. **Read the filters as a quantified promise** Tendsto u atTop (𝓝 0) says that u eventually lies in every neighborhood of zero. For a real sequence, geometricDecay_eventually_small spells this out: for each ε > 0 there is an index N after which every |u(n)| is below ε. N may depend on ε, a, and r.

3. **Approach without arriving** For a = 1 and r = 1/2, the terms are 1, 1/2, 1/4, and so on. halfDecay_tendsto proves their limit is zero, while geometricDecay_positive proves every finite term remains positive. Convergence does not mean reaching the limiting value.

4. **Pass from global fading to local change** HasDerivAt (fun y => y²) (2*x) x means the function near x has linear approximation x² + (2*x)·(y−x), with a smaller-order error. The proof uses Mathlib’s power rule; continuity then follows from differentiability. It does not say every continuous function is differentiable.

**Try it yourself.** What fails if the fading ratio becomes 1? What happens if it becomes 0, and why does that not contradict the positivity theorem?

<details><summary>A hint</summary>

At r = 1 the sequence is constantly a, so the strict bound r < 1 matters. At r = 0 every term after the first is zero; the positivity theorem required r > 0.

</details>

```text
beckon ✨Grand✨Archive✨☿Necromantic☿Vanishings☿Foundations
beckon ✨Grand✨Archive✨☿Necromantic☿Whispers☿Whispering☿Kindling
beckon ✨Grand✨Archive✨☿Gestures☿Counting

unveil Sieve
unveil attuned Nearness

sanctum Arcana☿Necromancy

/- A fading sequence keeps a fixed proportion of its previous value.
The real number a is the initial amplitude; r is the retained proportion. -/
ritual ✨Fading✨Ember✨ ⟪ash amber✨disc ⟡ Fluxes⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡ Fluxes ⇰ ash ⊛ amber✨disc ⌃ pinch✨of✨sulfur

spell ✨Light✨the✨First✨Ember✨ ⟪ash amber✨disc ⟡ Fluxes⟫ ⟡ ✨Fading✨Ember✨ ash amber✨disc 〇 ≣ ash ⇰ cast
  purify ⟮✨Fading✨Ember✨⟯

spell ✨Diminish✨the✨Ember✨ ⟪ash amber✨disc ⟡ Fluxes⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    ✨Fading✨Ember✨ ash amber✨disc ⟪pinch✨of✨sulfur ⧾ 一⟫ ≣ ✨Fading✨Ember✨ ash amber✨disc pinch✨of✨sulfur ⊛ amber✨disc ⇰ cast
  litany ✨Fading✨Ember✨ ash amber✨disc ⟪pinch✨of✨sulfur ⧾ 一⟫ ≣ ash ⊛ ⟪amber✨disc ⌃ pinch✨of✨sulfur ⊛ amber✨disc⟫ ⇰ cast transmute ⟮✨Fading✨Ember✨᛫ Flare⟯
    ▢ ≣ ✨Fading✨Ember✨ ash amber✨disc pinch✨of✨sulfur ⊛ amber✨disc ⇰ ⟪✨Regather✨the✨Binding✨ ash ⟪amber✨disc ⌃ pinch✨of✨sulfur⟫ amber✨disc⟫☿reflect

/- atTop means arbitrarily late indices; nhds 0 means arbitrarily small
neighborhoods of zero. Multiplication by a fixed amplitude preserves this limit. -/
spell ✨Embers✨Approach✨Silence✨ ⟪ash ⟡ Fluxes⟫ ⧼amber✨disc ⟡ Fluxes⧽ ⟪unshadowed ⟡ 〇 ⋜ amber✨disc⟫ ⟪lesserward ⟡ amber✨disc ⋖ 一⟫ ⟡
    Pilgrimage ⟪✨Fading✨Ember✨ ash amber✨disc⟫ everafter ⟪aura 〇⟫ ⇰ cast
  bind emberward ⟡ Pilgrimage ⟪conjure pinch✨of✨sulfur ⟡ Tallies ⇉ amber✨disc ⌃ pinch✨of✨sulfur⟫ everafter ⟪aura 〇⟫ ⇰
    ✨Fading✨Powers✨Reach✨Silence✨ unshadowed lesserward
  shapeshift Pilgrimage ⟪conjure pinch✨of✨sulfur ⟡ Tallies ⇉ ash ⊛ amber✨disc ⌃ pinch✨of✨sulfur⟫ everafter ⟪aura 〇⟫
  clarify solely ⟮✨Silence✨Consumes✨the✨Binding✨⟯ through emberward☿✨bind✨the✨amplitude✨ ash

/- This is the same limit unpacked into the epsilon-N language of analysis.
Every positive tolerance eventually contains all remaining terms. -/
spell ✨Every✨Veil✨Encloses✨the✨Ember✨ ⟪ash ⟡ Fluxes⟫ ⧼amber✨disc ⟡ Fluxes⧽
    ⟪unshadowed ⟡ 〇 ⋜ amber✨disc⟫ ⟪lesserward ⟡ amber✨disc ⋖ 一⟫ ⟪grain✨of✨salt ⟡ Fluxes⟫ ⟪grainward ⟡ 〇 ⋖ grain✨of✨salt⟫ ⟡
    ⟒ ᚾ ⟡ Tallies᛫ ⟁ pinch✨of✨sulfur ⋝ ᚾ᛫ ⫽✨Fading✨Ember✨ ash amber✨disc pinch✨of✨sulfur⫽ ⋖ grain✨of✨salt ⇰ cast
  bind fadingward ⇰ ✨Embers✨Approach✨Silence✨ ash unshadowed lesserward
  clarify ⟮Flux☿✨Measure✨the✨Gap✨⟯ through ⟪Fathom☿✨Unveil✨the✨Distant✨Promise✨☿onward fadingward⟫ grain✨of✨salt grainward

spell ✨Halved✨Embers✨Approach✨Silence✨ ⟡
    Pilgrimage ⟪✨Fading✨Ember✨ 一 ⟪一 ⧶ 二⟫⟫ everafter ⟪aura 〇⟫ ⇰ cast
  channel ✨Embers✨Approach✨Silence✨
  ❖ numerology
  ❖ numerology

/- A limit need not be reached at a finite time: positive amplitudes and
positive ratios give positive terms, even while those terms approach zero. -/
spell ✨An✨Ember✨Still✨Glows✨ ⧼ash amber✨disc ⟡ Fluxes⧽ ⟪ashward ⟡ 〇 ⋖ ash⟫ ⟪coalward ⟡ 〇 ⋖ amber✨disc⟫ ⟪pinch✨of✨sulfur ⟡ Tallies⟫ ⟡
    〇 ⋖ ✨Fading✨Ember✨ ash amber✨disc pinch✨of✨sulfur ⇰ ✨Kindle✨Two✨Flames✨ ashward ⟪✨Repeated✨Kindling✨ coalward pinch✨of✨sulfur⟫

/- Derivatives record local change as a linear approximation. The power rule
proves the derivative of squaring at every real point, including zero. -/
spell ✨Hear✨the✨Doubled✨Whisper✨ ⟪jade✨cube ⟡ Fluxes⟫ ⟡ ✨Bears✨the✨Whisper✨ ⟪conjure silver✨bell ⟡ Fluxes ⇉ silver✨bell ⌃ 二⟫ ⟪二 ⊛ jade✨cube⟫ jade✨cube ⇰ cast
  clarify through ⟪✨The✨Mirror✨Whispers✨Once✨ jade✨cube⟫☿✨whisper✨through✨powers✨ 二

spell ✨The✨Squared✨Ember✨is✨Unbroken✨ ⟪jade✨cube ⟡ Fluxes⟫ ⟡ ✨Unbroken✨Here✨ ⟪conjure silver✨bell ⟡ Fluxes ⇉ silver✨bell ⌃ 二⟫ jade✨cube ⇰
  ⟪✨Hear✨the✨Doubled✨Whisper✨ jade✨cube⟫☿✨unbroken✨here✨

seal Arcana☿Necromancy
```

[Lean source](../math/Mathematics/RealAnalysis/Limits.lean) · [Arcana source](../public/grimoire/fading-embers.spell)

[tendsto_pow_atTop_nhds_zero_of_lt_one](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecificLimits/Basic.lean#L188) · [Metric.tendsto_atTop](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Topology/MetricSpace/Pseudo/Defs.lean#L911) · [HasDerivAt.pow](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Calculus/Deriv/Pow.lean#L109)

## The pact that bounds an echo

*Normed spaces and bounded linear operators*

Give a linear pact a measure of amplification. Its algebraic promises now control how far an echo may stray.

**Mathematical meaning.** A continuous linear map between real normed spaces preserves addition and scalar multiplication. Its operator norm bounds output error: ‖f(x)−f(y)‖ ≤ ‖f‖·‖x−y‖. Composition multiplies the available bounds. Scaling by a has norm |a| on a nontrivial space; scaling by 1/2 halves every distance.

**Hypotheses.** E and F are real normed vector spaces. The maps are bundled continuous linear maps, not arbitrary linear maps. No finite-dimensionality or completeness is assumed. The exact norm of a scaling operator requires E to be nontrivial; on the zero space its norm is zero. This is introductory functional analysis, not a PDE existence theorem.

**Proof idea.** Build scaling as a scalar multiple of the identity operator. Use linearity to rewrite f(x)−f(y) as f(x−y), then apply the operator norm bound. Mathlib’s composition inequality gives the product bound. The identity has norm one on a nontrivial space, and norm_smul computes the norm of its scalar multiple.

**A guided reading.** Enchantment studies maps that preserve algebraic operations. Necromancy adds distance, limits, and continuity. A bounded linear operator is where these meet: its algebraic structure lets one uniform estimate control all input errors.

1. **Give a vector space a norm** A norm measures vector size, with ‖x‖ = 0 only for x = 0, a triangle inequality, and ‖a • x‖ = |a|·‖x‖. NormedSpace ℝ E combines this geometry with a real scalar action. The notation E →L[ℝ] F bundles linearity and continuity.

2. **Build a familiar operator** scalingOperator a multiplies each vector by a. It is constructed from the identity map by scalar multiplication. The addition theorem reads the linearity stored in the resulting operator. This is the same preservation idea as group homomorphisms, now with scalars as well.

3. **Control error everywhere at once** The operator norm is the least nonnegative C for which ‖f(x)‖ ≤ C·‖x‖ for all x. Rewrite an output difference using linearity, then apply that bound to x−y. Composition gives an upper bound ‖g∘f‖ ≤ ‖g‖·‖f‖; equality is not claimed.

4. **Know when a bound is exact** Scalar multiplication has exact norm |a| when the space contains a nonzero vector. In the zero space every operator is zero, so that hypothesis matters. Independently of nontriviality, halfScaling_error proves that scaling by 1/2 halves every input distance. Completeness would be an additional hypothesis for Banach-space theorems.

**Try it yourself.** Compare the general error inequality with halfScaling_error. Why is equality proved for scaling, while a general operator only has an inequality?

<details><summary>A hint</summary>

A scaling changes every vector by the same magnitude factor. A general linear map can shrink some directions more than others, and may even send a nonzero direction to zero.

</details>

```text
beckon ✨Grand✨Archive✨☿Necromantic☿Measured☿Conduits☿Foundations
beckon ✨Grand✨Archive✨☿Gestures☿Counting

sanctum Arcana☿Necromancy☿✨Bound✨Echoes✨

familiar ⧼ᛖ ᚠ ⟡ Essence⊛⧽ ⟮✨Measured✨Harmonic✨Chanted✨Veyr✨ ᛖ⟯ ⟮✨Measured✨Bound✨Veyr✨ Fluxes ᛖ⟯
  ⟮✨Measured✨Harmonic✨Chanted✨Veyr✨ ᚠ⟯ ⟮✨Measured✨Bound✨Veyr✨ Fluxes ᚠ⟯

/- Enchantment contributes linearity; Necromancy contributes a norm and
continuity. A continuous linear map carries both pieces of structure. -/
ritual ✨Amplifying✨Conduit✨ ⟪ash ⟡ Fluxes⟫ ⟡ ᛖ ↝Steady⟮Fluxes⟯ ᛖ ⇰ ash • ✨Steady✨Bound✨Pact✨☿selfsame Fluxes ᛖ

spell ✨Send✨an✨Ember✨through✨the✨Conduit✨ ⟪ash ⟡ Fluxes⟫ ⟪jade✨cube ⟡ ᛖ⟫ ⟡ ✨Amplifying✨Conduit✨ ash jade✨cube ≣ ash • jade✨cube ⇰ mirror

spell ✨The✨Conduit✨Preserves✨Chanting✨ ⟪ash ⟡ Fluxes⟫ ⟪jade✨cube silver✨bell ⟡ ᛖ⟫ ⟡
    ✨Amplifying✨Conduit✨ ash ⟪jade✨cube ⧾ silver✨bell⟫ ≣ ✨Amplifying✨Conduit✨ ash jade✨cube ⧾ ✨Amplifying✨Conduit✨ ash silver✨bell ⇰
  ⟪✨Amplifying✨Conduit✨ ash⟫☿✨Carry✨the✨Chant✨ jade✨cube silver✨bell

/- The operator norm is a uniform amplification bound. Linearity turns an
output difference into the image of an input difference before we apply it. -/
spell ✨Bind✨the✨Straying✨Echo✨ ⟪copper✨wire ⟡ ᛖ ↝Steady⟮Fluxes⟯ ᚠ⟫ ⟪jade✨cube silver✨bell ⟡ ᛖ⟫ ⟡
    ‖copper✨wire jade✨cube ⧿ copper✨wire silver✨bell‖ ⋜ ‖copper✨wire‖ ⊛ ‖jade✨cube ⧿ silver✨bell‖ ⇰ cast
  litany ‖copper✨wire jade✨cube ⧿ copper✨wire silver✨bell‖ ≣ ‖copper✨wire ⟪jade✨cube ⧿ silver✨bell⟫‖ ⇰ sympathy strength ⟪copper✨wire☿✨Carry✨the✨Difference✨ jade✨cube silver✨bell⟫☿reflect
    ▢ ⋜ ‖copper✨wire‖ ⊛ ‖jade✨cube ⧿ silver✨bell‖ ⇰ copper✨wire☿✨The✨Conduit✨Bounds✨its✨Echo✨ ⟪jade✨cube ⧿ silver✨bell⟫

spell ✨Weigh✨the✨Amplified✨Ember✨ ⟪ash ⟡ Fluxes⟫ ⟪jade✨cube ⟡ ᛖ⟫ ⟡
    ‖✨Amplifying✨Conduit✨ ash jade✨cube‖ ≣ ⫽ash⫽ ⊛ ‖jade✨cube‖ ⇰ cast
  missile ✨Strength✨of✨a✨Binding✨ ash jade✨cube

/- On a nontrivial space the identity has norm one, so the bound for scalar
scaling is sharp. The nontriviality hypothesis rules out the zero space. -/
spell ✨The✨Conduits✨True✨Strength✨ ⟮Plural ᛖ⟯ ⟪ash ⟡ Fluxes⟫ ⟡
    ‖⟪✨Amplifying✨Conduit✨ ash ⟡ ᛖ ↝Steady⟮Fluxes⟯ ᛖ⟫‖ ≣ ⫽ash⫽ ⇰ cast
  purify ⟮✨Amplifying✨Conduit✨᛫ ✨Strength✨of✨a✨Binding✨᛫ ✨Steady✨Bound✨Pact✨☿✨The✨Mirrors✨Strength✨is✨One✨⟯

/- Compose two bounded maps and their amplification bounds multiply.
This is the analytic counterpart of composing algebraic homomorphisms. -/
spell ✨Chained✨Conduits✨Bound✨the✨Echo✨ ⟪copper✨wire ⟡ ᛖ ↝Steady⟮Fluxes⟯ ᚠ⟫ ⟪silk✨cord ⟡ ᚠ ↝Steady⟮Fluxes⟯ ᛖ⟫ ⟡
    ‖silk✨cord☿threading copper✨wire‖ ⋜ ‖silk✨cord‖ ⊛ ‖copper✨wire‖ ⇰ silk✨cord☿✨Strength✨of✨Chained✨Conduits✨ copper✨wire

spell ✨The✨Halved✨Echo✨Strays✨Half✨as✨Far✨ ⟪jade✨cube silver✨bell ⟡ ᛖ⟫ ⟡
    ‖✨Amplifying✨Conduit✨ ⟪一 ⧶ 二 ⟡ Fluxes⟫ jade✨cube ⧿ ✨Amplifying✨Conduit✨ ⟪一 ⧶ 二 ⟡ Fluxes⟫ silver✨bell‖ ≣
      ⟪一 ⧶ 二 ⟡ Fluxes⟫ ⊛ ‖jade✨cube ⧿ silver✨bell‖ ⇰ cast
  litany ‖✨Amplifying✨Conduit✨ ⟪一 ⧶ 二 ⟡ Fluxes⟫ jade✨cube ⧿ ✨Amplifying✨Conduit✨ ⟪一 ⧶ 二 ⟡ Fluxes⟫ silver✨bell‖ ≣
      ‖✨Amplifying✨Conduit✨ ⟪一 ⧶ 二 ⟡ Fluxes⟫ ⟪jade✨cube ⧿ silver✨bell⟫‖ ⇰
        sympathy strength ⟪⟪✨Amplifying✨Conduit✨ ⟪一 ⧶ 二 ⟡ Fluxes⟫⟫☿✨Carry✨the✨Difference✨ jade✨cube silver✨bell⟫☿reflect
    ▢ ≣ ⟪一 ⧶ 二 ⟡ Fluxes⟫ ⊛ ‖jade✨cube ⧿ silver✨bell‖ ⇰ cast transmute ⟮✨Weigh✨the✨Amplified✨Ember✨⟯⁂ numerology

seal Arcana☿Necromancy☿✨Bound✨Echoes✨
```

[Lean source](../math/Mathematics/FunctionalAnalysis/Operators.lean) · [Arcana source](../public/grimoire/bound-echoes.spell)

[ContinuousLinearMap.le_opNorm](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Normed/Operator/Basic.lean#L237) · [ContinuousLinearMap.opNorm_comp_le](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Normed/Operator/Basic.lean#L395) · [ContinuousLinearMap.norm_id](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Normed/Operator/Basic.lean#L323)
