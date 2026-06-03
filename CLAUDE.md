# Berrybook — Ivy & Oliver: The Problem Solver Series

Interactive, branching picture-books for kids (read-aloud). Create-React-App, deployed on
Netlify. Each book is a "choose-a-path" story with one illustration + audio per scene.

> Universal engineering rules live in `~/.claude/CLAUDE.md`. This file is repo-specific.

## Where things live
- **Book data:** `src/books/<id>/index.js` — one ES module per book. `src/books/index.js` glob-imports them and runs `validate.js` at module load (every `next` target resolves, no unreachable scenes, `start` exists).
- **Illustrations:** `public/images/book<N>/` (served at `/Images/book<N>/...` — note the capital `I`). Square 1:1 (1024×1024) is the default; see `scripts/generate-art.mjs`.
- **Audio:** pre-recorded at `public/audio/<voice>/<book-id>/<scene-id>.{mp3,json}` via `scripts/record-audio.mjs`. The client tries the static MP3+alignment first (instant) and falls back to live `netlify/functions/generate-audio.js` (ElevenLabs → Gemini) only if files are missing. Default voice is **Ivanna** (`yM93hbw8Qtvdma2wCnJG`); `Paige-british` is also kept for future voice-switching. **New books DO need an audio recording pass — see step 6 below.**
- **Authoring kit (`content/`):**
  - `AUTHORING.md` — the full step-by-step recipe for a new book.
  - `characters.md` — canonical recurring cast (voices + looks + reference images). **Update this when a character recurs.**
  - `consistency-bible.md` — master art/world/style bible (per-book breakdowns).
  - `characters/refs/` — character reference PNGs (+ `_thumbs/` downscaled copies) and `world/refs/`.
  - `books/<id>.md` — per-book working draft (story text + per-scene image prompts).

## How to make a new book (high level)
1. Pick the **lesson/theme** and which characters appear (default Ivy + Oliver; +Mom/Dad/Hazel/Grandma Quinn/etc.). Most books introduce **one** new character.
2. **Draft the story** in `content/books/<id>.md` following `content/AUTHORING.md` and the voices in `content/characters.md`. **Get the text approved before art.** Scene structure is free-form (no required diamond) — author whatever shape fits the story; the validator catches dangling `next` targets and unreachable scenes at module load.
3. **New character:** write a design-sheet, generate a reference image, and get it **approved** before any scenes (it's fed into every scene the character appears in).
4. **Generate art** with `scripts/generate-art.mjs` (see below). Review every image; re-roll the bad ones.
5. **Wire the book** into `src/books/<id>/index.js` (schema below) and add the import to `src/books/index.js`.
6. **Record audio.** Run `ELEVENLABS_API_KEY=... node scripts/record-audio.mjs --book=<id>` (or omit `--book` to record everything missing). Writes `public/audio/Ivanna/<id>/<scene>.{mp3,json}`. Cache invalidation is automatic via SHA-1 of (text + voice settings) in the `.meta.json` sidecar — re-runs only re-record scenes whose text or voice settings changed. Use `--voice=Paige-british` to record an alternate.
7. **Deploy:** verify `CI=false npm run build`, then `git push origin main` (Netlify auto-builds).

## Book object schema (free-form)
Each book is `{ id, title, coverImage, scenes }`. `scenes` is keyed by any string scene id you like (`start` is required as the entry point). Each scene is `{ title, image, text, choices }`; each choice is `{ text, next }`. The validator in `src/books/validate.js` runs at module load and fails the build on dangling `next`, unreachable scenes, or a missing `start`.

```js
const book = {
  id: 'kebab-id',
  title: 'Book Title',
  coverImage: '/Images/book<N>/0-cover.png',
  scenes: {
    start: {
      title: 'Hook',
      image: '/Images/book<N>/0-intro.png',
      text: '…',
      choices: [{ text: 'Start the Adventure!', next: 'scene1' }],
    },
    scene1: { /* … */ choices: [{ text, next: 'scene2A' }, { text, next: 'scene2B' }] },
    // …any scene ids, any number of choices, any graph shape.
    // 'The End' is conventional (any choice that returns to 'start').
  },
};
export default book;
```

A clean diamond is still a fine pattern (`scene1 → 2A/2B → 3A/3B → 4 → 5A/5B → 6`), but isn't required. Sequential or branch-and-converge structures both work — see `closet-portal` for a sequential example, `family-rhythm-tree` for an arc that plays out both paths every read. Keep each scene's `text` under ~1200 chars so the chunked live-TTS fallback's payload limit isn't a concern (pre-recorded paths have no such limit).

## Art pipeline — `scripts/generate-art.mjs`
Calls Gemini **`gemini-2.5-flash-image`** ("Nano Banana"). API key auto-loaded from `../games/.env.local` (`GEMINI_API_KEY`). **Reference images are THE consistency mechanism** — every call attaches the relevant character PNGs.

```bash
node scripts/generate-art.mjs mom dad           # (re)generate character refs → content/characters/refs/
node scripts/generate-art.mjs scenes 4 5B       # (re)generate named scenes → public/images/book<N>/
node scripts/generate-art.mjs scenes            # all scenes
```
- `JOBS` = character reference sheets; `SCENES` = the book's pages. Both are objects of `{refs, out, prompt, refDir, outDir}`.
- Scene jobs attach **downscaled thumbnails** from `content/characters/refs/_thumbs/`. **After changing a ref, regenerate its thumbnail** (PIL: open → `thumbnail((512,512))` → save into `_thumbs/`), or scenes will use the stale look.
- **Per book:** point `BOOK8`/`outDir` at the new `public/images/book<N>/` and rewrite the `SCENES` prompts for the new story (copy the existing pattern).
- Run from the repo root.

## Gemini prompt rules (learned the hard way — follow these)
- **Only name and attach the characters present in a scene**, and add *"only the named characters appear — no duplicates, no extra background characters."* Listing/attaching absent characters makes the model insert them. For multi-character scenes, **state the exact count and cast** (e.g. *"exactly THREE characters appear: Grandma, Ivy, and Oliver"*) and add *"each unicorn has exactly four legs, no extra legs."* Extra-limb and duplicate-character glitches are common. Keep these negative constraints in the prompt **even after a clean render** — re-rolling can re-introduce removed elements (a stray baby, wings on Grandma, an extra leg).
- **Unicorns are four-legged animals:** always say *"four-legged unicorn, horse-like muzzle and hooves, exactly four legs, never humanoid, no human face/hands/body."* They render wrong otherwise. Front legs **end in hooves, never hands**, and unicorns have **no arms** — they don't hug/hold with an arm (they nuzzle, or just stand on four hooves). Reclining/seated poses make the front hooves look like hands and hide the legs → pose them as a **resting horse** (legs folded, hooves visible) or drape a **blanket over the legs**.
- **Clothing on a unicorn = a draped SHAWL/WRAP over the back.** The word **"dress"** turns Mom into a human-faced anthro every time. (Grandma's shawl works fine.)
- **"Elderly grandma" alone → a human granny.** Say *"elderly four-legged unicorn, NOT a human."*
- **Seated/couch poses mangle unicorn legs** → drape a blanket over the legs, or stage group/finale scenes **under bed covers** (hides anatomy entirely — see scene 6).
- **Child characters render baby-tiny** → say *"the same size as Ivy, a big kid, NOT a baby."*
- **Dad keeps rendering muscular** → *"soft-bodied, friendly, gentle rounded tummy, NOT muscular, no abs."*
- **Covers** come out portrait (~832×1248). Make the composition **top-loaded** (title + family grouped high) and **crop the top square** to 1024×1024 (PIL), keeping the title — every other book's cover has its title baked in. The chooser also shows the title as text below the image.
- Every generation is a dice roll — **view each image and re-roll** the ones with extra limbs/characters or off-model traits.

## Working with the image model (mindset)
Consistency came ~80% from constraints + composition, ~20% from the references. Internalize:
- **Refs anchor *look*, not *behavior*.** They keep colors/markings on-model; they do nothing for pose, anatomy, or proportion — those are separate fights.
- **Art-direct around weaknesses; don't out-prompt them.** When a pose keeps failing (held baby, seated unicorn → human legs), change the *staging*: blanket over the legs, family under bed covers, baby swaddled in a basket. A composition fix beats another "NOT human" clause.
- **Words carry priors.** "Dress" → human biped; "elderly grandma" → human granny; "comforting arm" → human arm. Use vocabulary congruent with the body plan (shawl, muzzle, hooves, "resting horse").
- **Every render is a dice roll, and re-rolls regress.** Review every image; change **one variable at a time**; and **never delete a guard after it passes once** — the next roll will exploit it (a stray baby, wings on Grandma, an extra leg all came back this way).
- **Use code for precision, the model for creativity.** Aspect ratio, exact framing, proportion charts → post-process deterministically (e.g. crop). Don't ask the model for pixel-exact anything.
- **Real-audience QA is gold.** Kids catch identity/anatomy violations instantly ("why does Mom have hands?"). Show a near-final pass to the actual reader before calling it done.

## Conventions / don'ts
- Keep book data in `src/App.js` (no CMS); match the existing formatting and the `/Images/` (capital I) path convention.
- Don't commit secrets — there are none in this repo (Gemini key lives in `../games/.env.local`). `.env`, `node_modules`, `build/` are gitignored.
- Reuse the recurring cast and their established markers (Ivy's star birthmark, Oliver's heart chest-patch, Shimmer's pink flower, Grandma Quinn's glasses + shawl, Mom's gold heart necklace + shawl, the baby's pink coat + gold-glowing horn).
