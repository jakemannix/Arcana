#!/usr/bin/env python3
"""spellcast: a token-level bijection between Lean 4 source and spell text.

    python spellcast.py to   file.lean  [--key K.json]  > file.spell
    python spellcast.py from file.spell [--key K.json]  > file.lean
    python spellcast.py glossary [--key K.json]           # names the lexicon chose
    python spellcast.py test [dir-or-files...]            # round trip, byte-exact
    add --dialect D.json to any command to swap the whole word table

No name leaks. Every name component that is not a keyword gets a spell word:
first from the key file (your choices), else from the built-in lexicon, in
order of first appearance. New choices are written back to the key file, so
both directions share one key. Bound variables are flat (the same word in
every declaration) unless the key gives a scoped override:
    {"global": {"n": "ember"}, "scoped": {"enlarge": {"n": "tinder"}}}
"""
import re, sys, os, json

ESC = "\u27c4"   # ⟄  escape for a raw symbol that equals a spell glyph
NBSP = "\u00a0"  # joins the words of a multi-word spell name: Burning Hands

# =========================================================== keyword dictionary
# Lean keyword / tactic / library name  ->  spell word.   [source in brackets]
WORDS = {
    # --- declarations and commands
    "theorem": "spell", "lemma": "charm", "def": "ritual", "abbrev": "byname",
    "inductive": "lineage", "structure": "sigil", "class": "order",
    "instance": "initiate", "example": "trial", "axiom": "decree",
    "opaque": "veiled", "namespace": "sanctum", "section": "chamber",
    "end": "seal", "open": "unveil", "import": "beckon", "variable": "familiar",
    "universe": "plane", "deriving": "inherits", "attribute": "brand",
    "protected": "warded", "private": "hidden", "extends": "descends", "noncomputable": "ineffable",
    "partial": "fickle", "mutual": "entwined", "termination_by": "knell",
    "decreasing_by": "dwindle", "check": "scry", "eval": "reveal",
    "print": "chronicle", "reduce": "render",
    # --- term-level keywords
    "where": "begets", "with": "whence", "by": "cast", "fun": "conjure",
    "match": "augur", "let": "dub", "have": "bind", "show": "proclaim",
    "from": "drawn", "at": "upon", "in": "within", "if": "portent",
    "then": "thence", "else": "elsewise", "do": "perform", "calc": "litany",
    "suffices": "contingency",     # [Contingency, 5e]
    "using": "through", "this": "thus", "sorry": "fizzle", "admit": "surrender",
    # --- prelude types
    "Prop": "Verity", "Type": "Essence", "Sort": "Aether", "Nat": "Tally",
    "Int": "Balance", "Bool": "Omen", "List": "Litany", "Array": "Quiver",
    "String": "Scroll", "Char": "Rune", "Option": "Whim", "Unit": "Mote",
    "Empty": "Naught", "Fin": "Fetter", "True": "Sooth", "False": "Lie",
    "Eq": "Bond", "Iff": "Pact", "And": "Both", "Or": "Either", "Not": "Nay",
    "Exists": "Manifest", "Decidable": "Fated", "Classical": "Elder",
    "Set": "Host", "Finset": "Band", "Function": "Rite", "Subtype": "Kin",
    "Prod": "Yoke", "Sum": "Crossroads", "Quot": "Effigy", "Quotient": "Effigies",
    "Real": "Flux", "Rat": "Ratio", "Complex": "Umbra",
    "\u2115": "Tallies", "\u2124": "Balances", "\u211a": "Ratios",
    "\u211d": "Fluxes", "\u2102": "Umbrae",
    # --- prelude constructors and functions
    "zero": "void", "succ": "childe", "pred": "elder", "rec": "ancestry",
    "add": "join", "mul": "weave", "pow": "ascend", "sub": "sunder",
    "le": "bow", "lt": "kneel", "nil": "hush", "cons": "bead", "map": "enchant",
    "filter": "sift", "foldl": "brew", "foldr": "steep", "length": "reach",
    "reverse": "inversion", "append": "splice", "some": "boon", "none": "nought",
    "mk": "forge",                # [Fabricate, 5e] the constructor
    "choice": "wish",             # [Wish, 5e] Classical.choice
    "em": "fate",                 # excluded middle
    "propext": "vow", "funext": "oath",
    "symm": "reflect", "trans": "chain",              # [Chain Lightning]
    "subst": "transubstantiate", "mp": "onward", "mpr": "backward",
    "congrArg": "sympathy", "congrFun": "resonance", "congr": "attune",
    "rfl": "mirror",              # [Mirror Image, 5e]
    "trivial": "cantrip", "id": "selfsame",
    # --- Mathlib algebra and order
    "Group": "Coven", "CommGroup": "Sabbat", "Monoid": "Choir",
    "Semigroup": "Chorus", "Subgroup": "Cabal", "Normal": "Hallowed",
    "Ring": "Circle",             # [Magic Circle, 5e]
    "CommRing": "Wheel", "Field": "Realm", "Module": "Fief",
    "Submodule": "Manor", "LinearMap": "Bridge", "MonoidHom": "Herald",
    "RingHom": "Emissary", "Equiv": "Doppelganger", "Iso": "Mirrorkin",
    "Preorder": "Hierarchy", "PartialOrder": "Pecking", "Lattice": "Trellis",
    "TopologicalSpace": "Aetherium", "Continuous": "Unbroken",
    "IsOpen": "Unveiled", "IsClosed": "Sealed", "Compact": "Bound",
    "Filter": "Sieve", "Tendsto": "Pilgrimage", "Metric": "Fathom",
    # --- tactics
    "exact": "missile",           # [Magic Missile, 5e] never misses
    "intro": "summon", "intros": "summons", "apply": "channel",
    "refine": "hone", "rw": "transmute",              # [Transmute Rock, 5e]
    "rwa": "alchemize", "simp": "purify",             # [Purify Food and Drink]
    "simp_all": "purge", "dsimp": "distill", "unfold": "unseal",
    "delta": "flay", "cases": "shatter",              # [Shatter, 5e]
    "rcases": "rend", "obtain": "wrest", "induction": "unravel",
    "constructor": "fabricate",   # [Fabricate, 5e]
    "left": "sinister", "right": "dexter", "use": "wield", "exists": "evoke",
    "assumption": "recall", "contradiction": "paradox", "exfalso": "abyss",
    "absurd": "folly", "omega": "oracle", "decide": "divine",
    "grind": "disintegrate",      # [Disintegrate, 5e]
    "aesop": "swarm",             # [Insect Plague]
    "linarith": "ledger", "nlinarith": "greatledger", "norm_num": "numerology",
    "ring": "circlet", "ring_nf": "circleting", "positivity": "blessing",
    "tauto": "platitude", "exact?": "augury", "apply?": "divination",
    "simp?": "scrying", "rw?": "commune",             # [Commune, 5e]
    "only": "solely", "generalizing": "unbound", "case": "stanza",
    "next": "hence", "try": "attempt", "repeat": "chant", "first": "foremost",
    "all_goals": "everywhere", "any_goals": "anywhere", "skip": "pause",
    "done": "finis", "rename_i": "christen", "change": "shapeshift",
    "convert": "polymorph",       # [Polymorph, 5e]
    "specialize": "focus", "generalize": "broaden", "ext": "extend",
    "by_cases": "fork", "by_contra": "hex", "push_neg": "banish",
    "contrapose": "reversal", "push_cast": "alchemy", "norm_cast": "transfigure",
    "exact_mod_cast": "missilecast", "field_simp": "realmpurify",
    "nth_rewrite": "transmuteth", "conv": "mesmer", "trace": "whisper",
    "infer_instance": "initiation", "exists_intro": "evocation",
    "and_intro": "betrothal", "or_inl": "sinistral", "or_inr": "dextral",
}

# Lean symbol -> spell glyph
SYMS = {
    ":=": "\u21f0", "=>": "\u21c9", "->": "~>", "<-": "<~",
    "\u2192": "\u219d", "\u2190": "\u219c", "\u2194": "\u21ad", "\u21a6": "\u2907",
    "\u2200": "\u27c1", "\u2203": "\u27d2", "\u03bb": "\u22cb",
    "\u2227": "\u2a53", "\u2228": "\u2a54", "\u00ac": "\u2aec",
    "=": "\u2263", "\u2260": "\u2262", "\u2264": "\u22dc", "\u2265": "\u22dd",
    "<": "\u22d6", ">": "\u22d7",
    "+": "\u29fe", "-": "\u29ff", "*": "\u229b", "/": "\u29f6", "^": "\u2303",
    "\u2218": "\u229a", "\u00d7": "\u2a2f",
    "(": "\u27ea", ")": "\u27eb", "{": "\u29fc", "}": "\u29fd",
    "[": "\u27ee", "]": "\u27ef", "\u27e8": "\u2989", "\u27e9": "\u298a",
    ",": "\u16eb", ";": "\u2042", ":": "\u27e1", "|": "\u2afd",
    "\u00b7": "\u2756", "\u22a2": "\u22b6", "#": "\u233d", "@": "\u233e",
    "::": "\u2237", "++": "\u29fa",
}
NUMS = {"0": "\u2298", "1": "\u2609"}          # ⊘ the void, ☉ the self
HOLE, HOLE_IMG = "_", "\u25a2"                 # ▢ the unnamed

# Lean symbols that pass through unchanged but must lex as single tokens.
PASS_SYMS = ["|>.", "<|>", "<|", "|>", "...", "..", "&&", "||", "%", "$",
             "\u207b\u00b9", "\u2208", "\u2209", "\u2286", "\u222a", "\u2229",
             "\u2205", "\u2295", "\u2297", "\u03a3", "\u03a0", "\u2016",
             "\u2039", "\u203a", "!", "?", "~", "."]

# Words that reset the name scope; the next plain name is a declaration name.
DECL_WORDS = {"theorem", "lemma", "def", "abbrev", "inductive", "structure",
              "class", "instance", "example", "axiom", "opaque", "namespace",
              "section", "end", "open"}

# ============================================================ lexicon (auto)
_BASES = """ember cinder echo ash tinder wisp rune glyph ward veil mist frost
rime thaw gale zephyr tempest squall ebb tide brine coral pearl amber onyx opal
garnet jasper agate flint slate shale chalk loam peat moss fern bramble briar
thorn nettle willow rowan yew elm oak birch alder hazel thistle clover heather
sorrel tansy rue sage myrrh resin tallow wax wick lantern spark flare blaze
kindle smolder soot coal raven crow rook wren lark owl moth beetle newt toad
adder viper drake wyrm wyvern basilisk griffin sphinx kelpie selkie sylph dryad
naiad nymph imp sprite pixie gnome troll ogre ghoul wraith shade specter phantom
banshee lich revenant golem grimoire tome codex quill ink vellum parchment
candle censer chalice athame wand staff orb crystal prism lodestone compass
hourglass sundial chime bell knell dirge hymn canticle psalm verse refrain
cadence harmony discord tremor quake fissure chasm cavern grotto hollow dell
glen fen marsh bog mire heath moor tor crag scarp ridge spur summit zenith nadir
eclipse corona halo nimbus aurora comet meteor nova nebula dusk gloaming
twilight dawn vesper midnight solstice equinox harvest pledge troth tithe
blight pox fever ague balm salve tonic elixir philter draught potion vial phial
flask retort alembic crucible mortar pestle loom spindle shuttle skein thread
weft warp knot braid plait tress latch hasp hinge key clasp buckle girdle sash
cloak mantle cowl hood mask visor gauntlet greave cuirass hauberk shield
buckler targe pike glaive halberd dirk stiletto rapier saber cutlass scimitar
falchion bodkin arrow bolt quarrel shaft pyre bier cairn barrow crypt ossuary
reliquary shrine altar idol totem talisman amulet periapt phylactery""".split()
_SUFFIXES = ["", "ling", "kin", "wright", "wick", "bane", "song", "stone",
             "thorn", "shade", "moss", "fell"]


def lexicon():
    for suf in _SUFFIXES:
        for b in _BASES:
            yield b + suf

# ================================================================== checks
def set_dialect(words=None, syms=None, nums=None):
    """Replace the word/symbol tables (a dialect) and rebuild derived tables."""
    global WORDS, SYMS, NUMS, INV_WORDS, INV_SYMS, INV_NUMS, INV_DECL_IMGS, LEXICON
    global LEAN_SYMBOLS, SPELL_SYMBOLS
    if words is not None: WORDS = dict(words)
    if syms is not None: SYMS = dict(syms)
    if nums is not None: NUMS = dict(nums)
    missing = DECL_WORDS - set(WORDS)
    assert not missing, f"dialect lacks declaration words: {missing}"
    imgs = list(WORDS.values()) + list(SYMS.values())
    assert len(set(imgs)) == len(imgs), "map is not injective"
    assert not set(imgs) & (set(WORDS) | set(SYMS) | set(PASS_SYMS)), "image collides with a Lean token"
    assert not any(re.search(r"\w", v) for v in SYMS.values()), "symbol image must not be a word char"
    assert all(re.fullmatch(r"[^\W\d][\w\u00a0'!?]*", w) for w in WORDS.values()), "word image must be one word"
    INV_WORDS = {v: k for k, v in WORDS.items()}
    INV_SYMS = {v: k for k, v in SYMS.items()}
    INV_NUMS = {v: k for k, v in NUMS.items()}
    INV_NUMS[HOLE_IMG] = HOLE
    INV_DECL_IMGS = {WORDS[w] for w in DECL_WORDS}
    reserved = set(WORDS) | set(WORDS.values())
    LEXICON = [w for w in lexicon() if w not in reserved]
    LEAN_SYMBOLS = set(SYMS) | set(PASS_SYMS)
    SPELL_SYMBOLS = set(INV_SYMS) | set(PASS_SYMS) | set(INV_NUMS)


def load_dialect(path):
    d = json.load(open(path, encoding="utf-8"))
    set_dialect(d.get("words"), d.get("syms"), d.get("nums"))


set_dialect()

# ================================================================ tokenizer
WS = re.compile(r"[^\S\u00a0]+")
LINE_COMMENT = re.compile(r"--[^\n]*")
STRING = re.compile(r'r#*"(?:[^"]|"(?!#))*"#*|"(?:[^"\\]|\\.)*"')
CHAR = re.compile(r"'(?:[^'\\]|\\.)'")
NUM = re.compile(r"0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?")
COMP = r"(?:\u00ab[^\u00bb]*\u00bb|[^\W\d][\w'!?\u2080-\u2089\u2090-\u209c\u1d62-\u1d6a\u2c7c]*)"
COMP_S = r"(?:\u00ab[^\u00bb]*\u00bb|[^\W\d][\w\u00a0'!?\u2080-\u2089\u2090-\u209c\u1d62-\u1d6a\u2c7c]*)"
IDENT = re.compile(COMP + r"(?:\." + COMP + r")*")
IDENT_E = re.compile(ESC + "?" + COMP_S + r"(?:\." + ESC + "?" + COMP_S + r")*")
SIMPLE_WORDS = re.compile(r"[^\W\d][\w'!?]*(?: [^\W\d][\w'!?]*)*")   # «Shield», «Burning Hands»


def _block_comment_end(s, i):
    depth, j = 0, i
    while j < len(s):
        if s.startswith("/-", j):
            depth += 1; j += 2
        elif s.startswith("-/", j):
            depth -= 1; j += 2
            if depth == 0:
                return j
        else:
            j += 1
    return len(s)


def tokenize(s, symbols, ident_re):
    """Yield (kind, text); the texts concatenate back to s exactly."""
    syms = sorted(symbols, key=len, reverse=True)
    i, n = 0, len(s)
    while i < n:
        c = s[i]
        if c.isspace() and c != NBSP:
            m = WS.match(s, i); yield ("ws", m.group()); i = m.end(); continue
        if s.startswith("--", i):
            m = LINE_COMMENT.match(s, i); yield ("comment", m.group()); i = m.end(); continue
        if s.startswith("/-", i):
            j = _block_comment_end(s, i); yield ("comment", s[i:j]); i = j; continue
        if c == '"' or (c == "r" and STRING.match(s, i)):
            m = STRING.match(s, i)
            if m: yield ("string", m.group()); i = m.end(); continue
        if c == "'":
            m = CHAR.match(s, i)
            if m: yield ("char", m.group()); i = m.end(); continue
        if c == ESC:
            m = ident_re.match(s, i + 1)
            if m and not s[i + 1].isdigit():
                yield ("esc", s[i:m.end()]); i = m.end(); continue
            yield ("esc", s[i:i + 2]); i += 2; continue
        m = NUM.match(s, i)
        if m:
            yield ("num", m.group()); i = m.end(); continue
        for sym in syms:
            if s.startswith(sym, i):
                yield ("sym", sym); i += len(sym); break
        else:
            m = ident_re.match(s, i)
            if m:
                yield ("ident", m.group()); i = m.end()
            else:
                yield ("other", c); i += 1


def _split_comps(ident):
    out, cur, i = [], "", 0
    while i < len(ident):
        c = ident[i]
        if c == "\u00ab":
            j = ident.index("\u00bb", i) + 1; cur += ident[i:j]; i = j
        elif c == ".":
            out.append(cur); cur = ""; i += 1
        else:
            cur += c; i += 1
    out.append(cur)
    return out

# ===================================================================== key
class Key:
    """Your name choices, plus the lexicon's, in one JSON file."""

    def __init__(self, path):
        self.path = path
        data = json.load(open(path, encoding="utf-8")) if path and os.path.exists(path) else {}
        self.glob = dict(data.get("global", {}))
        self.scoped = {k: dict(v) for k, v in data.get("scoped", {}).items()}
        self.auto = list(data.get("auto", []))
        self.dirty = False
        self._check()
        self._inv_glob = {v: k for k, v in self.glob.items()}
        self._inv_scoped = {s: {v: k for k, v in t.items()} for s, t in self.scoped.items()}
        self._used = set(self.glob.values()) | set(WORDS.values())
        for t in self.scoped.values():
            self._used |= set(t.values())
        self._lex = iter(LEXICON)

    def _check(self):
        vals = list(self.glob.values())
        assert len(set(vals)) == len(vals), "key: global names not injective"
        assert not set(vals) & set(WORDS.values()), "key: a global image is a keyword image"
        assert all(re.fullmatch(r"[^\W\d][\w\u00a0'!?]*", v) for v in vals), "key: image must be one word"
        for scope, t in self.scoped.items():
            sv = list(t.values())
            assert len(set(sv)) == len(sv), f"key: scope {scope} not injective"
            assert not set(sv) & (set(WORDS.values()) | set(self.glob.values())), \
                f"key: scope {scope} reuses a global image"

    def word(self, lean, scope, bare_ok=True):
        """Spell word for a Lean name component, choosing a fresh one if needed."""
        if lean.startswith("\u00ab"):
            inner = lean[1:-1]
            if lean in self.glob:
                return self.glob[lean]
            if bare_ok and SIMPLE_WORDS.fullmatch(inner):
                img = inner.replace(" ", NBSP)
                if img not in self._used:
                    return img
            return lean
        t = self.scoped.get(scope)
        if t and lean in t:
            return t[lean]
        if lean in self.glob:
            return self.glob[lean]
        if lean in WORDS:
            return WORDS[lean]
        for w in self._lex:
            if w not in self._used:
                self.glob[lean] = w; self._inv_glob[w] = lean; self._used.add(w)
                self.auto.append(lean); self.dirty = True
                return w
        raise RuntimeError("lexicon exhausted")

    def lean(self, word, scope):
        if word.startswith("\u00ab"):
            return word
        t = self._inv_scoped.get(scope)
        if t and word in t:
            return t[word]
        if word in self._inv_glob:
            return self._inv_glob[word]
        if word in INV_WORDS:
            return INV_WORDS[word]
        return "\u00ab" + word.replace(NBSP, " ") + "\u00bb"   # an unkeyed word came from «…»

    def save(self):
        if self.path and self.dirty:
            json.dump({"global": self.glob, "scoped": self.scoped, "auto": self.auto},
                      open(self.path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# ================================================================= the map
GLUE = re.compile(r"[\w'!?\u00a0\u2080-\u2089\u2090-\u209c\u1d62-\u1d6a\u2c7c]")


def to_spell(src, key):
    out, scope, pending, anon = [], "", False, 0
    toks = list(tokenize(src, LEAN_SYMBOLS, IDENT))
    for i, (kind, t) in enumerate(toks):
        if kind == "num":
            out.append(NUMS.get(t, t))
        elif kind == "ident":
            if t == HOLE:
                out.append(HOLE_IMG); continue
            comps = _split_comps(t)
            if comps[0] in DECL_WORDS and len(comps) == 1:
                pending, scope = True, ""
                anon += 1
                scope = f"#{anon}"
            elif pending:
                pending = False
                if comps[0] not in WORDS:
                    scope = comps[0]
            nxt = toks[i + 1][1] if i + 1 < len(toks) else ""
            bare_ok = not GLUE.match(nxt)   # a bare «name» must not glue onto the next token
            out.append(".".join(key.word(c, scope, bare_ok) for c in comps))
        elif kind == "sym":
            out.append(SYMS.get(t, t))
        elif kind == "other":
            out.append(ESC + t if t in INV_SYMS or t in INV_NUMS or t in (ESC, NBSP) else t)
        else:
            if kind not in ("ws", "comment", "string", "char"):
                raise AssertionError(kind)
            if pending and kind != "ws":
                pass
            out.append(t)
    key.save()
    return "".join(out)


def from_spell(txt, key):
    out, scope, pending, anon = [], "", False, 0
    for kind, t in tokenize(txt, SPELL_SYMBOLS, IDENT_E):
        if kind == "esc":
            out.append(t[1:])
        elif kind == "ident":
            comps = _split_comps(t)
            if comps[0] in INV_DECL_IMGS and len(comps) == 1:
                pending = True
                anon += 1
                scope = f"#{anon}"
                out.append(INV_WORDS[comps[0]]); continue
            leans = []
            for c in comps:
                if c.startswith(ESC):
                    leans.append(c[1:])
                else:
                    leans.append(key.lean(c, scope))
            if pending:
                pending = False
                if leans[0] not in WORDS:
                    scope = leans[0]
                    # re-resolve with the right scope (scoped overrides may differ)
                    leans = [key.lean(c[1:], scope) if False else
                             (c[1:] if c.startswith(ESC) else key.lean(c, scope)) for c in comps]
            out.append(".".join(leans))
        elif kind == "sym":
            out.append(INV_NUMS.get(t) or INV_SYMS.get(t, t))
        else:
            out.append(t)
    return "".join(out)

# ===================================================================== cli
def _files(args):
    for a in args:
        if os.path.isdir(a):
            for root, _, fs in os.walk(a):
                for f in fs:
                    if f.endswith(".lean"):
                        yield os.path.join(root, f)
        else:
            yield a


def main():
    argv = sys.argv[1:]
    keypath = "spellcast.key.json"
    if "--key" in argv:
        i = argv.index("--key"); keypath = argv[i + 1]; del argv[i:i + 2]
    if "--dialect" in argv:
        i = argv.index("--dialect"); load_dialect(argv[i + 1]); del argv[i:i + 2]
    if not argv:
        print(__doc__); return
    cmd, args = argv[0], argv[1:]
    if cmd == "to":
        sys.stdout.write(to_spell(open(args[0], encoding="utf-8").read(), Key(keypath)))
    elif cmd == "from":
        sys.stdout.write(from_spell(open(args[0], encoding="utf-8").read(), Key(keypath)))
    elif cmd == "glossary":
        k = Key(keypath)
        for lean in k.auto:
            print(f"{k.glob[lean]:16s} <- {lean}")
    elif cmd == "test":
        ok = bad = 0
        for f in _files(args):
            src = open(f, encoding="utf-8").read()
            k = Key(None)
            spell = to_spell(src, k)
            legal = set(WORDS.values()) | set(k.glob.values())
            legal |= {c[1:-1].replace(" ", NBSP) for kind, t in tokenize(src, LEAN_SYMBOLS, IDENT)
                      if kind == "ident" for c in _split_comps(t) if c.startswith("\u00ab")}
            leaks = {c for kind, t in tokenize(spell, SPELL_SYMBOLS, IDENT_E) if kind == "ident"
                     for c in _split_comps(t) if not c.startswith("\u00ab") and NBSP not in c and c not in legal}
            if leaks:
                bad += 1; print("LEAK:", f, sorted(leaks)[:5])
            elif from_spell(spell, k) == src:
                ok += 1
            else:
                bad += 1; print("ROUNDTRIP FAIL:", f)
        print(f"{ok} ok, {bad} failed")
        sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
