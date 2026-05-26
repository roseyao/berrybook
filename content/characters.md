# Canonical Character Guide — Recurring Cast

Single source of truth for the characters who appear across multiple Problem Solver books.
Use this for **both** jobs:

- **Story generation** → keep each character's *voice & personality* consistent.
- **Art generation** → feed the listed **reference image** to the image API (Gemini), plus the
  "always include" visual notes, so characters stay on-model. Reference images are the primary
  consistency mechanism; the text notes are backup.

Full visual detail and world/location references live in [consistency-bible.md](consistency-bible.md).

---

## Ivy the Alicorn
**Reference image:** [characters/refs/ivy.png](characters/refs/ivy.png)

**Always include (visual):** white coat, flowing purple/lavender wavy mane & tail, white fluffy
wings with purple highlights, pearlescent spiral horn, large violet eyes, silvery-purple hooves,
small star-shaped birthmark on left shoulder. Child-sized. Horn glows faintly when using magic;
ears droop when anxious; tail swishes when frustrated.

**Voice & personality:** the organized, caring leader. Calm and capable, takes charge in a crisis
("Oliver, this is serious!"), but a perfectionist who gets anxious and can be shy in new social
situations. Speaks clearly and gently, encourages others, narrates the plan. Recurring growth:
learning to accept imperfection, to listen instead of always directing, and to share.
**Magic:** silver/white sparkles like stardust; can form solid constructs (steps, bridges).

## Oliver the Dragon
**Reference image:** [characters/refs/oliver.png](characters/refs/oliver.png)

**Always include (visual):** emerald-green body with orange circular patches, lighter yellow-green
belly, orange-membrane wings with green edges, amber/orange round eyes, stubby horns, long tail
with orange spade tip, **orange heart-shaped scale patch on chest (always visible)**. ~4 ft, usually
mid-bounce or hovering. Little orange flame puffs when excited/laughing.

**Voice & personality:** playful, enthusiastic, easily distracted (chases butterflies, sticks),
genuinely kind. Exclamatory and giggly, goes off on tangents, but lights up with pride when his
dragon knowledge matters. Recurring growth: learning to focus, to be patient, and to save/wait.
**Magic:** small controlled orange/gold flame puffs; warm, never threatening; can make light orbs.

## Violet the Dragon
**Reference image:** [characters/refs/violet.png](characters/refs/violet.png)

**Always include (visual):** small (~2 ft) deep-purple baby dragon, lighter purple belly,
translucent purple wings, big shimmering golden eyes, nub horns, tiny claws, curled arrow-tip tail,
sparkles in her scales.

**Voice & personality:** starts shy, scared, and apologetic (wings wrapped around herself), grows
braver and playful as she's accepted. Earnest, loves her family. **Magic:** tiny purple
sparkler-like fire.

## Shimmer the Baby Unicorn
**Reference image:** [characters/refs/shimmer.png](characters/refs/shimmer.png)

**Always include (visual):** toddler unicorn, ~half Ivy's size / reaches Ivy's shoulder, snow-white
coat, short fluffy silver-blue sparkling mane & tail, tiny 2-inch silver nub horn that glows when
she tries magic, big innocent blue eyes, chubby baby proportions, wobbly legs, **pink flower behind
one ear**, constant sparkle trail. Always bouncing / mid-wiggle.

**Voice & personality:** eager toddler who **copies and repeats the last thing others say**
("Together! Together!") and imitates their actions. Boundless energy. **Magic:** wild, unpredictable
silver-blue sparkles that cause accidents (turning things invisible, etc.); leaves a glitter trail.

---

## The Family (recurring)
Ivy & Oliver's family. Featured in *The New Little Light* (book 8); Mom and Grandma also appear in *The Day Everything Stopped* (book 5). Female line = unicorns, male line = dragons. **Reference images: to be created in the art phase** — extract Mom & Grandma from book 5 art where shown, generate Dad and the baby, then feed them to the image API like the other refs.

### Mom — Unicorn
**Reference image:** _TBD — generate two states: **normal** and **pregnant**._
**Visual:** graceful adult unicorn, **warm golden/honey coat**, elegant flowing mane (lavender-toned, echoing Ivy), spiral horn, gentle eyes. **Marker:** a simple gold **necklace with a heart pendant**; also wears an elegant **shawl/wrap** draped over her back. **Pregnant (book 8):** big round belly, moves slowly, often resting or napping, a little tired but glowing.
**Voice & role:** warm but **the boss of the family** — very put-together, organized, and artistic (she loves art; Ivy clearly takes after her). Calm and deeply reassuring; source of the book's heart-line — *"love isn't a pie that runs out; it grows."*

### Dad — Dragon
**Reference image:** _TBD — generate._
**Visual:** big, friendly adult dragon, warm bronzed-green scales (distinct from Oliver's bright emerald), kind eyes, easy smile. **Marker:** none (recognizable by his deeper bronzed-green scales and tall, soft-bodied adult build). The cozy, capable parent who cooks dinner and gives steady hugs.
**Voice & role:** steady, playful, warm, and a bit of a tech nerd (loves computers/AI; Oliver takes after him). Comforts with a dragon's twist — *"love isn't a treasure pile that runs out when you share it; it grows."*

### Grandma Quinn — Older Unicorn
**Reference image:** _TBD — extract from book 5 art if shown, else generate._ (Book 5 was renamed from "Hazel" to unify the series on **Quinn**.)
**Visual:** kind older unicorn, silvery mane, small glasses, a warm shawl.
**Voice & role:** wise, gentle, comforting; the steady caretaker (minds the kids during the hospital stay, bakes, validates big feelings — *"it's alright to feel unsure"*).

### Baby Sister — Newborn Unicorn ("the new little light")
**Reference image:** _TBD — generate; **must be distinct from Shimmer**._
**Visual:** tiny newborn unicorn, **soft pink coat**, deeper rose-pink mane & tail, a tiny **horn-nub that glows warm gold like a nightlight**, big innocent eyes, chubby/wobbly, trails soft golden sparkles when happy (glow dims when sleeping), often swaddled. **No flower** (that's Shimmer's marker; this baby reads as the *pink* one with a golden glow).
**Voice & role:** a baby — cries, sleeps, sparkles, gives first smiles, calms to her family's voices. Name TBD.

---

## Minor recurring folk
Forest friends and townsfolk who recur in small roles, soft-watercolor woodland style:
**Squirrel, Owl, Bunny** (the forest-friend trio), **Mayor Badger**, **Carpenter Beaver**.
Keep them gentle and child-friendly; no fixed model sheets yet — add one here if a character
graduates to a larger recurring role.

---

## Global art style (apply to every illustration)
- Soft watercolor with visible brush strokes; warm, inviting palette even in night scenes.
- Characters **always on model**: size relationships maintained (Shimmer = half of Ivy), Shimmer's
  pink flower, Oliver's heart patch, and Ivy's purple mane always present.
- Emotions clearly readable in expressions; magic effects translucent, never harsh.
- Background softer than foreground. Child-friendly, never scary — even at night.

---

## New characters per book
Most books introduce **one unique character** (e.g. the Gratitude Goblin, the Hungry Dryer, the
Purple Shadow, the Crystal Guide / Game Dragon). These are **not** recurring and live with their
book, not here. Per-book protocol:

1. The story step emits a **design-sheet prompt** for the new character (look, size stages, palette,
   personality-in-visuals), modeled on the design sheets in [consistency-bible.md](consistency-bible.md).
2. Generate a **reference image** for it (Gemini) and **review/approve** it before any scenes.
3. Save the approved ref under that book's assets and feed it — alongside the recurring refs above —
   into every scene where the character appears.
4. If a one-off character later recurs, promote it: add a section here and move its ref into
   `characters/refs/`.
