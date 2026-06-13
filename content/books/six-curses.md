# The Six Curses of the Lost Kingdom — Art Production Sheet

Chapter book (`kind: 'chapter'`, book 11). Images live in `public/images/book11/`
(served at `/Images/book11/...`). **Filenames below match the reader exactly** —
generate to these names, drop the files in, and they appear.

## Output sizes & where each image is used

| Role | Aspect | Output px | Midjourney | Used as |
|---|---|---|---|---|
| **Cover** | 3:4 portrait | **1024 × 1365** | `--ar 3:4` | Hard cover page + bookshelf thumbnail. Keep the upper third open for a title. |
| **Full-page (chapter opener)** | 3:4 portrait | **1024 × 1365** | `--ar 3:4` | Fills a book page; subject in the upper-middle. |
| **Spot** | 1:1 square | **1024 × 1024** | `--ar 1:1` | Inline vignette in the text column. |

> Pipeline note: `scripts/generate-art.mjs` (job `book11`) already sets `3:4` for
> cover/full-page and `1:1` for spots via `imageConfig.aspectRatio`.

## Reference images to attach (per image)

Lead refs live in `content/characters/refs/`. **Attach a ref ONLY for characters
actually in the image** — attaching an absent character makes the model add them.
No-character spots get none. Theo / Becca / the monsters are one-off (no ref —
the prompt defines them).

| Image | Attach |
|---|---|
| `0-cover.png` | `ivy.png`, `oliver.png` |
| `prologue-kitchen.png` | `ivy.png`, `oliver.png`, `mom.png`, `dad.png` |
| `prologue-book.png` | *(none)* |
| `prologue-courtyard.png` | `ivy.png`, `oliver.png` |
| `ch1-peach-tree.png` | `ivy.png`, `oliver.png` |
| `ch1-feast-tables.png` | *(none)* |
| `ch1-theo-freed.png` | `ivy.png`, `oliver.png` |
| `ch2-comparing-garden.png` | `ivy.png`, `oliver.png` |
| `ch2-beccas-pile.png` | *(none)* |
| `ch2-ivys-pencils.png` | `ivy.png` |

## How to keep characters consistent (read first)

Tools that DON'T accept reference images keep characters on-model only if you
**repeat the exact physical spec every time**. So:

1. **Paste the character's full descriptor verbatim** into every prompt they
   appear in (they're written inline in each prompt below — don't paraphrase).
2. **Generate a turnaround first.** Make one "character line-up" image (all four
   leads, plain cream background) and — in any tool that takes an image input
   (Gemini/Nano-Banana, Midjourney `--cref`, etc.) — attach it to every scene.
   Prompt for it: *"Character reference line-up, plain pale cream background,
   full bodies in a row, soft watercolor children's-book style:"* + the four
   descriptors below + *"correct relative heights: Dad tallest, then Mama, then
   Ivy, then Oliver."*
3. **Reuse the same seed** across scenes where your tool supports it.
4. **Always keep the negative guards** (they're in each prompt): *no humans;
   each named character appears exactly once, no duplicates; unicorns have four
   legs and hooves, never hands, never humanoid.* Don't drop them even after a
   clean render — re-rolls re-introduce errors.

### Character descriptors (the "bible" — copy these verbatim)

- **IVY** — *a ~5-ft-tall white UNICORN child: pure white coat, flowing
  lavender-purple mane and tail, large violet eyes, one pearlescent spiral horn,
  soft white feathered wings, a small purple star birthmark on her flank; four
  legs with a horse muzzle and hooves — her front legs END IN HOOVES, never
  hands — never humanoid.*
- **OLIVER** — *a ~4-ft-tall emerald-green DRAGON child, about a head SHORTER
  than Ivy: bright emerald scales, orange round patches, yellow-green belly,
  orange membrane wings, amber eyes, two small rounded horns on top of his head,
  an orange heart-shaped patch on his chest, small three-clawed dragon hands, a
  tapering tail; small puffs of orange flame escape his mouth when upset.*
- **MAMA** — *a ~5.5-ft adult UNICORN, clearly taller than the children:
  golden-honey coat, lavender mane in a practical style, gentle warm eyes,
  pearlescent spiral horn, a thin gold necklace with a small heart pendant, a
  soft shawl draped over her back; four legs, never humanoid.*
- **DAD** — *a tall, sturdy adult DRAGON, much larger than Oliver: deep
  bronzed-green scales with silver patches along his back, lighter green belly,
  friendly amber eyes, small rounded horns, folded wings, a gentle soft dad
  build (not muscular).*
- **THEO** (hedgehog kid) — *a small hedgehog: round dark eyes, soft brown
  spines, a cream tummy.*
- **BECCA** (rabbit kid) — *a small rabbit: soft grey-brown fur, long ears, big
  gentle eyes. As a ghost: pale, translucent and wispy, trailing faint cold
  mist.*
- **Relative heights, always:** Dad > Mama > Ivy > Oliver > (Theo / Becca).

Style for every image: *children's-book watercolor, soft brushstrokes, warm and
whimsical but atmospheric — mysterious, never scary for young kids.*

---

## COVER — `0-cover.png`  ·  3:4, **1024 × 1365**
OUTPUT: 1024×1365 px, 3:4 portrait. Book cover; keep the **upper third open** for
a title (no lettering needed). Children's-book watercolor, deep-violet-and-gold
twilight palette. Seen from behind / three-quarter at the centre of a vast
crumbling fairy-tale **courtyard**: IVY (a ~5-ft white unicorn child — white
coat, lavender-purple mane, violet eyes, pearlescent spiral horn, soft white
feathered wings, star birthmark; four legs, hooves, never humanoid) and a
smaller OLIVER (a ~4-ft emerald-green dragon child, a head shorter — orange
patches, yellow-green belly, orange wings, amber eyes, two small horns, orange
heart chest-patch) hold hand-in-hoof, gazing out at **six garden paths**
radiating away, each glowing a different faint mood-colour. Above them floats an
ancient dark **book with six glowing symbols arranged in a ring** on its cover.
Awe and wonder. Ivy clearly taller than Oliver. NO humans; exactly two
characters, no duplicates.

## PROLOGUE — The Attic

### `prologue-kitchen.png` · full page · 3:4, **1024 × 1365**
OUTPUT: 1024×1365 px, 3:4 portrait. A cozy summer-house **kitchen** on a rainy
day, warm lamplight against cool grey rain on the window. FOUR characters:
**IVY** (~5-ft white unicorn child — lavender-purple mane, violet eyes, spiral
horn, soft wings, star birthmark; four legs/hooves, never humanoid) sits calmly
at a wooden table, watching. **OLIVER** (~4-ft emerald-green dragon child, a head
shorter than Ivy — orange patches, yellow-green belly, orange wings, two small
horns, orange heart chest-patch) stands in the middle **mid-tantrum**: crocodile
tears, small orange flame-puffs from his mouth, little clawed fists balled.
**MAMA** (~5.5-ft adult unicorn, taller than the kids — golden-honey coat,
lavender mane, gold heart-pendant necklace, soft shawl over her back; four legs,
never humanoid) stands at the counter, calm but tired and sad. **DAD** (tall
sturdy adult dragon, much larger than Oliver — bronzed-green scales with silver
patches, soft build) just visible in the doorway behind. Heights: Dad > Mama >
Ivy > Oliver. Tender rainy mood. NO humans; each character once, no duplicates.

### `prologue-book.png` · spot · 1:1, **1024 × 1024**
OUTPUT: 1024×1024 px, square. Children's-book watercolor, soft brushstrokes.
Close-up of an ancient heavy **book** on dusty attic floorboards — dark, worn
leather-like cover, **six distinct glowing symbols pressed in a ring** on it,
each emanating soft warm light; old worn lettering across the centre reading
"The Six Curses of the Lost Kingdom". A single grey beam of rainy light from
above, dusty attic, drifting motes. NO characters — just the book. Hushed,
mysterious, not scary.

### `prologue-courtyard.png` · spot · 1:1, **1024 × 1024**
OUTPUT: 1024×1024 px, square. A once-magnificent, now **crumbling stone
courtyard**: stone towers wrapped in dry grey vines, silent cracked fountains,
**six garden paths radiating from the centre, each wrong in a different way** —
one overflowing, one stripped bare, one frozen still. Sky swirling with
indecisive colours. Small, centred, backs to us: IVY (~5-ft white unicorn,
lavender mane, spiral horn, soft wings, star birthmark, four legs/hooves) and a
shorter OLIVER (~4-ft emerald dragon, orange patches/wings, two small horns,
heart chest-patch) hold hand-in-hoof, looking out at the six paths. Ivy taller
than Oliver. Atmospheric, mysterious, not frightening. NO humans.

## CHAPTER 1 — The Ward of Always More  *(Gluttony · Blob · Theo)*

### `ch1-peach-tree.png` · full page · 3:4, **1024 × 1365**
OUTPUT: 1024×1365 px, 3:4 portrait. Sickly gold-and-green overripe palette. A
single perfect **peach tree** grows through cracked stone at the centre of an
overwhelming **feast garden** — tables stretching away with towers of cakes,
overflowing fruit, trophies, gold stars, flickering screens, far too much of
everything. At the base of the tree sprawls a large translucent pulsing **blob
creature**: soft jelly body, two small sad exhausted eyes deep inside, half-eaten
objects (a ribbon, a tilted trophy) faintly visible through its sides; the ground
around it stripped bare. **IVY** (~5-ft white unicorn child — lavender mane,
violet eyes, spiral horn, soft wings, star birthmark, four legs/hooves) crouches
near the blob, looking at it gently. **OLIVER** (~4-ft emerald-green dragon
child, a head shorter — orange patches, yellow-green belly, orange wings, two
small horns, heart chest-patch) stands nearby staring in alarm at his own front
claws, which are **fading and turning translucent at the fingertips** (the ground
faintly visible through them). Ivy taller than Oliver. Unsettling, not scary. NO
humans; each character once.

### `ch1-feast-tables.png` · spot · 1:1, **1024 × 1024**
OUTPUT: 1024×1024 px, square. Children's-book watercolor, sickly-sweet
gold-and-green tones. Wide view of endless **feast tables** receding into
darkness, laden with too much of everything — cakes too tall, fruit overflowing
onto the floor, trophies and ribbons stacked high, screens flickering with no one
watching. Everything slightly too vivid, faintly wrong. NO characters. Overripe,
overwhelming, a little eerie — not scary.

### `ch1-theo-freed.png` · spot · 1:1, **1024 × 1024**
OUTPUT: 1024×1024 px, square. Warm tones returning. A small **hedgehog** (THEO —
round dark eyes, soft brown spines, cream tummy) sits on the stone ground at the
base of the peach tree, little legs straight out, looking at his own hands with a
wondering, just-woke-up expression. IVY (~5-ft white unicorn, lavender mane,
spiral horn, soft wings, four legs/hooves) and a shorter OLIVER (~4-ft emerald
dragon, orange patches/wings, heart chest-patch) crouch nearby, watching gently.
Warm light returning. Exactly three characters; Ivy taller than Oliver. NO humans.

## CHAPTER 2 — The Ward of Not Fair  *(Envy · Ghost · Becca)*

### `ch2-comparing-garden.png` · full page · 3:4, **1024 × 1365**
OUTPUT: 1024×1365 px, 3:4 portrait. Sour greens and yellows, faintly wilted party
mood. A round birthday table with two place settings, each labelled — one
"OLIVER", one "IVY". Oliver's side clearly **more** abundant (three presents,
larger candy bag, four stuffies); Ivy's side **less** (two presents, smaller candy
bag, three stuffies). **IVY** (~5-ft white unicorn child — lavender mane, violet
eyes, spiral horn, soft wings, star birthmark, four legs/hooves) is mid-tantrum,
tears streaming, lifting a **hoof** toward Oliver's bigger pile — and she is
turning **ghostly**: her outline faded and translucent, her own presents and
stuffies gone grey and see-through. **OLIVER** (~4-ft emerald dragon child, a head
shorter — orange patches, yellow-green belly, orange wings, two small horns, heart
chest-patch) stands beside her, alarmed, reaching out a clawed hand. Hovering just
behind Ivy: **BECCA**, a pale wispy translucent **rabbit ghost** — soft grey-brown
fur, long drifting ears, big sad eyes, faint cold mist — one small paw raised to
tap Ivy's shoulder. Exactly three characters; Ivy taller than Oliver. Eerie-gentle,
not scary. NO humans.

### `ch2-beccas-pile.png` · spot · 1:1, **1024 × 1024**
OUTPUT: 1024×1024 px, square. Children's-book watercolor, warm tones. Still-life:
a small, modest pile with a little handwritten label reading "BECCA" — a worn,
loved grey stuffed rabbit (soft from cuddling); a small folded handwritten note; a
single slice of carrot cake on a tiny plate. Simple, real, quietly precious. NO
characters. Soft warm light.

### `ch2-ivys-pencils.png` · spot · 1:1, **1024 × 1024**
OUTPUT: 1024×1024 px, square. Close-up, warm light returning. **Twelve coloured
pencils, each a different shade of purple**, fanned out resting across a single
white unicorn **hoof** (Ivy's — a hoof, NOT a hand). Just the hoof and pencils in
frame, tender and quiet, colour fully returned and glowing softly. No other
character. Soft watercolor.

---

### Cast refs (reused from the existing series, for the Gemini pipeline)
The `book11` job in `generate-art.mjs` attaches existing reference thumbnails so
the leads stay on-model: **Ivy** → `ivy.png`, **Oliver** → `oliver.png`
(emerald dragon, orange heart chest-patch — already canon by book 10),
**Mama** → `mom.png`, **Dad** → `dad.png`. Theo, Becca and the monsters are
one-off and described in-prompt. If you generate outside the pipeline, build the
turnaround line-up (see "How to keep characters consistent" above) and attach it.
