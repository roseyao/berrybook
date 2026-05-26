# Berrybook — Ivy & Oliver: The Problem Solver Series

Interactive, branching picture-books for kids (read-aloud). Create-React-App, deployed on
Netlify. Each book is a "choose-a-path" story with one illustration + audio per scene.

> Universal engineering rules live in `~/.claude/CLAUDE.md`. This file is repo-specific.

## Where things live
- **Book data:** `src/App.js` → the `library.books` array. Each book is one object (see schema below).
- **Illustrations:** `public/images/book<N>/` (served at `/Images/book<N>/...` — note the capital `I`, matching the existing books).
- **Audio:** automatic — `netlify/functions/generate-audio.js` reads each scene's `text` on demand via **ElevenLabs**, falling back to **Gemini TTS** if ElevenLabs fails or runs out of credits (returns `{audio, mimeType}`; Gemini PCM is wrapped to WAV). Set `ELEVENLABS_API_KEY` and/or `GEMINI_API_KEY` in Netlify env (optional `GEMINI_TTS_VOICE`, default `Leda`). **New books need zero audio work.**
- **Authoring kit (`content/`):**
  - `AUTHORING.md` — the full step-by-step recipe for a new book.
  - `characters.md` — canonical recurring cast (voices + looks + reference images). **Update this when a character recurs.**
  - `consistency-bible.md` — master art/world/style bible (per-book breakdowns).
  - `characters/refs/` — character reference PNGs (+ `_thumbs/` downscaled copies) and `world/refs/`.
  - `books/<id>.md` — per-book working draft (story text + per-scene image prompts).

## How to make a new book (high level)
1. Pick the **lesson/theme** and which characters appear (default Ivy + Oliver; +Mom/Dad/Grandma Quinn/etc.). Most books introduce **one** new character.
2. **Draft the story** in `content/books/<id>.md` following `content/AUTHORING.md` (the fixed 11-entry "diamond" structure) and the voices in `content/characters.md`. **Get the text approved before art.**
3. **New character:** write a design-sheet, generate a reference image, and get it **approved** before any scenes (it's fed into every scene the character appears in).
4. **Generate art** with `scripts/generate-art.mjs` (see below). Review every image; re-roll the bad ones.
5. **Wire the book** into the `library.books` array in `src/App.js` (schema below).
6. **Deploy:** verify `CI=false npm run build`, then `git push origin main` (Netlify auto-builds).

## Book object schema (the "diamond")
11 scene entries, 3 choice points, 4 paths, all converging on one ending. Keys/wiring must match exactly:

```js
{ id: 'kebab-id', title: 'Book Title', coverImage: '/Images/book<N>/0-cover.png',
  story: {
    start:   { title, image:'/Images/book<N>/0-intro.png', text, choices:[{text, nextScene:'scene1'}] },
    scene1:  { …, choices:[→scene2A, →scene2B] },
    scene2A: { …, choices:[→scene3A, →scene3B] },   scene2B: { …, choices:[→scene3A, →scene3B] },
    scene3A: { …, choices:[{text:'Continue', nextScene:'scene4'}] },  scene3B: { … →scene4 },
    scene4:  { …, choices:[→scene5A, →scene5B] },
    scene5A: { … →scene6 },  scene5B: { … →scene6 },
    scene6:  { …, choices:[{text:'The End', nextScene:'start'}] },
  } }
```
Each scene: `{ title, image:'/Images/book<N>/<file>.png', text, choices:[{text, nextScene}] }`.
Image files: `0-cover, 0-intro, 1, 2A, 2B, 3A, 3B, 4, 5A, 5B, 6`. Keep `text` under ~1200 chars (the audio function caps payload).

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
- **Only name and attach the characters present in a scene**, and add *"only the named characters appear — no duplicates, no extra background characters."* Listing/attaching absent characters makes the model insert them.
- **Unicorns are four-legged animals:** always say *"four-legged unicorn, horse-like muzzle and hooves, exactly four legs, never humanoid, no human face/hands/body."* They render wrong otherwise.
- **Clothing on a unicorn = a draped SHAWL/WRAP over the back.** The word **"dress"** turns Mom into a human-faced anthro every time. (Grandma's shawl works fine.)
- **"Elderly grandma" alone → a human granny.** Say *"elderly four-legged unicorn, NOT a human."*
- **Seated/couch poses mangle unicorn legs** → drape a blanket over the legs, or stage group/finale scenes **under bed covers** (hides anatomy entirely — see scene 6).
- **Child characters render baby-tiny** → say *"the same size as Ivy, a big kid, NOT a baby."*
- **Dad keeps rendering muscular** → *"soft-bodied, friendly, gentle rounded tummy, NOT muscular, no abs."*
- **Covers** come out portrait (~832×1248). Make the composition **top-loaded** (title + family grouped high) and **crop the top square** to 1024×1024 (PIL), keeping the title — every other book's cover has its title baked in. The chooser also shows the title as text below the image.
- Every generation is a dice roll — **view each image and re-roll** the ones with extra limbs/characters or off-model traits.

## Conventions / don'ts
- Keep book data in `src/App.js` (no CMS); match the existing formatting and the `/Images/` (capital I) path convention.
- Don't commit secrets — there are none in this repo (Gemini key lives in `../games/.env.local`). `.env`, `node_modules`, `build/` are gitignored.
- Reuse the recurring cast and their established markers (Ivy's star birthmark, Oliver's heart chest-patch, Shimmer's pink flower, Grandma Quinn's glasses + shawl, Mom's gold heart necklace + shawl, the baby's pink coat + gold-glowing horn).
