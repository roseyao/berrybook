# Authoring a New Problem Solver Book (in Claude Code)

This is the repeatable recipe for creating a new book *with Claude Code* — no API/automation
needed. The goal: every book is structurally identical and stays on-voice / on-model.

**To start, tell Claude:** "Make a new Problem Solver book about `<theme/lesson>`."

## Inputs
- **Lesson/theme** (required) — the one thing the book teaches (e.g. honesty, patience, asking for help).
- **Title** (optional — Claude proposes one).
- **Cast** — recurring characters used (default: Ivy + Oliver; add Violet/Shimmer as needed).
- **New character?** — most books introduce exactly one (a Goblin/Dryer/Shadow-type figure).

## Spec to follow
- Voices & looks: [characters.md](characters.md). Full detail + worlds: [consistency-bible.md](consistency-bible.md).
- Ivy and Oliver are **equal co-protagonists**. Each ends with visible growth tied to the lesson.
- Reading level: ages ~4–7, read-aloud. Warm, gentle, never scary even at night. Happy ending on every path.

## Locked story structure (the "diamond")
11 scene entries, 3 choice points, 4 paths, all converging to one ending. Keys and wiring **must**
match exactly so it drops into `App.js`:

| key | role | image file | choices → nextScene |
|------|------|-----------|---------------------|
| `start`  | intro / hook | `0-intro.png`  | 1 button → `scene1` |
| `scene1` | opening problem | `1.png` | 2 buttons → `scene2A`, `scene2B` |
| `scene2A`| path A | `2A.png` | 2 buttons → `scene3A`, `scene3B` |
| `scene2B`| path B | `2B.png` | 2 buttons → `scene3A`, `scene3B` |
| `scene3A`| path A cont. | `3A.png` | 1 "Continue" → `scene4` |
| `scene3B`| path B cont. | `3B.png` | 1 "Continue" → `scene4` |
| `scene4` | convergence (meet new character) | `4.png` | 2 buttons → `scene5A`, `scene5B` |
| `scene5A`| resolution A | `5A.png` | 1 "Continue" → `scene6` |
| `scene5B`| resolution B | `5B.png` | 1 "Continue" → `scene6` |
| `scene6` | ending / lesson landed | `6.png` | 1 "The End" → `start` |

Plus a cover: `0-cover.png`. Choice button text should be a short, kid-facing action
("Look for clues", "Ask forest friends").

## Per-scene content
Each scene = one `text` block (a few short lines of dialogue/narration, in character) + a `title`.
Keep `text` under ~1200 characters (the read-aloud function caps the payload).

## Image prompt + references (for the art step)
For every scene write a detailed `imagePrompt` in the house style: open with
"Children's book watercolor illustration:", describe the setting, then each character with their
key on-model markers (Oliver's heart patch, Shimmer's pink flower, etc.), then mood/light.
Note **which reference images** to attach when generating: the recurring refs in
`characters/refs/` for any character present, plus the approved new-character ref.

## New character protocol
1. Write a **design-sheet prompt** (look, size/stages, palette, personality-in-visuals).
2. Generate one **reference image** (Gemini) → **review/approve before any scenes**.
3. Save the approved ref with the book; feed it into every scene the character appears in.
4. If it ever recurs, promote it into `characters.md` + `characters/refs/`.

## Output targets (what we produce per book)
1. **Story breakdown** appended to [consistency-bible.md](consistency-bible.md), matching the
   existing per-book format (theme, growth goals, per-scene Text / Image Prompt / Choice).
2. **Runnable book object** added to the `library.books` array in [../src/App.js](../src/App.js):
   ```js
   {
     id: 'kebab-id',
     title: 'Book Title',
     coverImage: '/Images/bookN/0-cover.png',
     story: { start: {…}, scene1: {…}, /* …scene6 */ }
   }
   ```
   Each scene: `{ title, image: '/Images/bookN/<file>', text, choices: [{ text, nextScene }] }`.
3. **Images** generated later into `public/images/bookN/` with the filenames above.

## Review checkpoints
1. Story text approved → 2. New-character ref approved → 3. Scene art approved → 4. Wired into `App.js`.
