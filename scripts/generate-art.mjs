// Berrybook art generator — Gemini 2.5 Flash Image ("Nano Banana").
// Generates character reference sheets / scene art, attaching existing
// reference images so characters stay on-model.
//
// Usage:
//   node scripts/generate-art.mjs              # run all character jobs
//   node scripts/generate-art.mjs mom dad      # run only named jobs
//
// Key: reads GEMINI_API_KEY from env, else from ../games/.env.local
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const REFS = path.join(REPO, 'content/characters/refs');
const THUMBS = path.join(REFS, '_thumbs');
const WORLD_REFS = path.join(REPO, 'content/world/refs');
const BOOK8 = path.join(REPO, 'public/images/book8');
const BOOK9 = path.join(REPO, 'public/images/book9');
const BOOK10 = path.join(REPO, 'public/images/book10');
const ENV_FILE = path.resolve(REPO, '../games/.env.local');
const MODEL = 'gemini-2.5-flash-image';

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  try {
    const m = fs.readFileSync(ENV_FILE, 'utf8').match(/^\s*GEMINI_API_KEY\s*=\s*"?([^"\n\r]+)"?/m);
    if (m) return m[1].trim();
  } catch { /* ignore */ }
  throw new Error('GEMINI_API_KEY not found in env or ' + ENV_FILE);
}
const API_KEY = loadKey();

function imgPart(p) {
  const ext = path.extname(p).toLowerCase();
  const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
  return { inlineData: { mimeType, data: fs.readFileSync(p).toString('base64') } };
}

async function generate({ prompt, refs = [], out, refDir = REFS, outDir = REFS }) {
  const parts = refs.map(r => imgPart(path.join(refDir, r)));
  parts.push({ text: prompt });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseModalities: ['IMAGE'] } }),
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${(await resp.text()).slice(0, 300)}`);
  const data = await resp.json();
  const img = (data?.candidates?.[0]?.content?.parts || []).find(p => p.inlineData);
  if (!img) throw new Error('No image in response: ' + JSON.stringify(data).slice(0, 300));
  const buf = Buffer.from(img.inlineData.data, 'base64');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, out), buf);
  return buf.length;
}

const STYLE = "Soft watercolor, hand-drawn colored-pencil children's book illustration style, matching the attached reference image(s) exactly for art style, linework, and palette. Plain pale cream background. Single full-body character, centered, friendly and child-friendly. No text, no words, no labels.";

const JOBS = {
  'mom': {
    refs: ['ivy.png', 'cast-cover.png'],
    out: 'mom.png',
    prompt: `Character design sheet: "Mom", a graceful, put-together adult UNICORN — the artistic boss of the family and mother of Ivy. Warm golden honey coat, elegant flowing lavender-purple mane and tail (echoing her daughter Ivy), pearlescent spiral horn, large gentle warm eyes, calm and elegant expression. She wears a simple delicate GOLD NECKLACE with a small HEART pendant (her signature accessory) and an elegant soft SHAWL/WRAP draped over her back and shoulders (NOT a dress — she stays a four-legged unicorn standing on hooves, never humanoid). Adult and motherly, taller than a child unicorn. ${STYLE}`,
  },
  'mom-pregnant': {
    refs: ['mom.png'],
    out: 'mom-pregnant.png',
    prompt: `The SAME unicorn from the reference image ("Mom"), now VERY PREGNANT, shown in side profile. Like a pregnant mare/horse, her large round pregnant belly bulges DOWNWARD on her UNDERSIDE — it hangs low and full beneath her barrel/torso, between her front and back legs. It does NOT stick out forward or from her chest; the swelling is on the bottom of her belly. Clearly heavily pregnant. Smooth fur, NO bellybutton and no navel. She stands calmly on exactly FOUR legs — correct unicorn anatomy, four legs total, no extra, duplicated, or merged limbs. Tired but happy, soft warm smile. Keep her golden coat, flowing lavender-purple mane, pearlescent spiral horn, simple gold heart necklace, and an elegant soft shawl/wrap draped over her back and shoulders, identical to the reference; she stays a four-legged unicorn (never humanoid) and her big round pregnant belly remains visible. ${STYLE}`,
  },
  'dad': {
    refs: ['oliver.png', 'cast-cover.png'],
    out: 'dad.png',
    prompt: `Character design sheet: "Dad", a big, mature, grown-up DRAGON FATHER of Oliver — clearly an adult dad: VERY TALL (around 6 foot 4), towering and long-limbed, broad-shouldered, strong and sturdy with only a slight gentle dad belly (not chubby or round), gentle laugh-lines around the eyes, and a calm grown-up demeanor (NOT a teenager or a young dragon), a little nerdy. Warm bronzed-green scales (a little deeper and richer than Oliver's bright emerald), lighter yellow-green belly, friendly amber eyes, gentle easy smile, small rounded horns, sturdy cozy build, wings folded. A warm, capable, clearly grown-up dad — much larger and older than a child or teenage dragon. ${STYLE}`,
  },
  'grandma-quinn': {
    refs: ['ivy.png', 'cast-cover.png'],
    out: 'grandma-quinn.png',
    prompt: `Character design sheet: "Grandma Quinn", a kind elderly UNICORN grandmother. White coat, silver-grey mane and tail in soft gentle waves, small round eyeglasses, a cozy knitted shawl over her shoulders, gentle laugh-lines, a warm grandmotherly smile, pearlescent spiral horn. Sweet and reassuring. ${STYLE}`,
  },
  'baby-sister': {
    refs: ['ivy.png', 'cast-cover.png'],
    out: 'baby-sister.png',
    prompt: `Character design sheet: a newborn baby UNICORN — the family's new little light. Very small, chubby newborn proportions, wobbly little legs. SOFT PINK coat (rose-petal pink), a slightly deeper ROSE-PINK short fluffy mane and tail, a tiny horn-nub that glows warm GOLD like a little nightlight, big innocent eyes with long lashes, a sweet sleepy expression, a few soft golden sparkles drifting around her, swaddled in a soft pastel blanket. She must read clearly as PINK (not white or blue). ${STYLE}`,
  },
  'captain-grumblebeard': {
    refs: ['cast-cover.png'],
    out: 'captain-grumblebeard.png',
    prompt: `Character design sheet: "Captain Grumble-Beard", an adult grizzled BEAR pirate — large, burly, weather-beaten thick brown fur with scattered patches of grey, a long messy salt-and-pepper "beard" of fur under his chin and lower jaw. He wears a black tricorne pirate hat with a small skull-and-crossbones, a black eye patch over one eye, a ratty navy-blue captain's coat draped open over his shoulders and back, a worn leather belt with a brass buckle. Hanging from his coat and a string around his neck: several DULL, TARNISHED, LIFELESS trinkets — a desaturated grey-gold coin, a chipped grey jewel, a faded medal — clearly drained of color (these are his "complaint treasures"). He stands like a real BEAR on all FOUR thick paws, body horizontal like a quadruped — NOT humanoid, NOT bipedal, NOT standing upright. Friendly underneath the gruffness — small kind dark eyes, a hint of a half-smile peeking through the beard, surprisingly gentle expression. ${STYLE}`,
  },
  'complaint-kingdom': {
    refs: ['cast-cover.png'],
    out: 'complaint-kingdom.png',
    outDir: WORLD_REFS,
    prompt: `World-asset design sheet (NO characters in this image): "The Complaint Kingdom" — a small gloomy gray stone village-and-castle at the edge of a clearing, under a perpetually overcast pewter-gray sky. Gray cobblestone main street winding through a cluster of slumped gray stone cottages with sagging tile roofs. A small modest gray castle/keep at the back with a single short tower. Withered, drooping gray pennants on a couple of poles. Everything heavily DESATURATED — only cool pewter-grays, slate-blues, and faded purple-grays — NO warm colors anywhere. No people, no animals, no faces — just the empty gloomy kingdom. Soft watercolor, storybook-charming gloomy mood (sad and a little funny, NOT scary or threatening). ${STYLE}`,
  },
  'rhythm-tree': {
    refs: ['cast-cover.png'],
    out: 'rhythm-tree.png',
    outDir: WORLD_REFS,
    prompt: `World-asset design sheet: "The Rhythm Tree" — an ancient, towering COASTAL REDWOOD standing alone in a cozy backyard, full-body three-quarter view. The trunk is tall and majestic, with reddish-brown fibrous bark and deep vertical furrows, and a flared base where it meets the ground. The crown is a soft layered conical shape made of feathery green redwood-needle sprays in gentle horizontal layers. The trunk softly glows with a warm golden light through cracks in the bark, like a gentle heartbeat. Green lawn and a few wildflowers at the base.

Floating gently among the needle layers are 5 colored musical note-orbs: 3 warm golden round orbs clustered together, 2 silver round orbs, 1 sparkly purple round orb, 1 small orange flame-shaped orb (drawn as a tiny cartoon flame), and 1 tiny soft pink round orb. Each orb has a soft glow trail.

Tree-only composition — no characters, no animals. Warm late-afternoon golden-hour light, magical and homey. ${STYLE}`,
  },
  'family-lineup': {
    refs: ['dad.png', 'grandma-quinn.png', 'mom.png', 'ivy.png', 'oliver.png', 'baby-sister.png'],
    out: 'family-lineup.png',
    prompt: `Group family portrait / proportion line-up, WIDE landscape composition, full bodies standing in a row on a plain pale cream background, soft watercolor children's-book style matching the attached references exactly. CRITICAL: get the relative HEIGHTS right, tallest to shortest:
1. DAD — green dragon with bronzed olive-green scales (a bit deeper than Oliver) — is BY FAR the tallest and biggest, a towering grown-up, roughly TWICE the height of the children.
2. GRANDMA QUINN — elderly white unicorn, silver mane, round glasses, knitted shawl — the SECOND tallest, clearly taller than Mom.
3. MOM — golden-coated unicorn, lavender mane, small gold heart-pendant necklace — an adult, a little shorter than Grandma.
4. IVY — white unicorn, purple mane, feathered wings — a child, only SLIGHTLY taller than Oliver.
5. OLIVER — bright green dragon, orange patches, orange heart patch on chest — a child, ALMOST the same height as Ivy, just a touch shorter (NOT tiny).
Plus the newborn PINK baby unicorn (rose mane, tiny gold-glowing horn) cradled in Mom's arms — baby-sized, the smallest. The two adults and Grandma clearly tower over the two children. Every character exactly on-model to the references. Friendly and warm. No text, no words, no labels.`,
  },
};

const SCENE_STYLE = " Children's picture-book illustration, soft watercolor and colored-pencil style, warm inviting palette, gentle and child-friendly, roughly square composition. The attached images are CHARACTER REFERENCES — keep every character exactly on-model (same colors, markings, accessories, and proportions). The adults (Mom, Dad, Grandma) are clearly much taller than the two children; Ivy is slightly taller than Oliver; the newborn baby is tiny. IMPORTANT: ONLY the specific characters named in this scene appear in the image — do NOT add any duplicate characters, extra ponies, extra dragons, or any other background people/creatures. Each named character appears exactly once. All unicorns (Ivy, Mom, Grandma, and the baby) are four-legged animals standing on hooves — never humanoid, never upright on two legs, never with human hands, a human face, or a human body — each unicorn has a horse-like muzzle/snout and hooves and stands on exactly FOUR legs (never extra, duplicated, or merged limbs; they may wear simple clothing, but the face and body stay fully unicorn). A unicorn's front legs END IN HOOVES, never hands; unicorns have NO arms and do NOT hold, hug, or drape a 'hand' or 'arm' over anyone or anything — they nuzzle with their muzzle or simply stand/rest on all four hooves.";

// Shared world description — every Complaint Kingdom scene uses this.
const KINGDOM = "The COMPLAINT KINGDOM is a small gloomy gray stone village-and-castle, per the attached complaint-kingdom reference: gray cobblestone streets, slumped gray stone cottages with sagging roofs, a small gray castle/keep, withered gray pennants, perpetually overcast pewter sky. Everything heavily DESATURATED — only cool pewter-grays, slate-blues, and faded purple-grays — NO warm colors anywhere unless the curse is breaking.";

// Captain reminder — every scene with him reuses this so we don't drift.
const CAPTAIN = "CAPTAIN GRUMBLE-BEARD is a large grizzled adult BEAR pirate, per the attached captain-grumblebeard reference: weather-beaten thick brown fur with grey patches, a long messy salt-and-pepper beard under his chin, a black tricorne pirate hat with a tiny skull-and-crossbones, a black eye patch over one eye, a ratty navy-blue captain's coat draped open over his shoulders/back, a worn leather belt with a brass buckle. DULL TARNISHED grey trinkets hang from his coat — a faded medal, a desaturated grey-gold coin (his 'complaint treasures') — they only gleam bright at the very end when the curse breaks. Stands upright on his hind paws like a pirate (bipedal, anthropomorphic bear). Surprisingly kind eyes hidden under bushy brows.";

const SCENES = {
  '0-cover': {
    refDir: THUMBS, outDir: BOOK10, out: '0-cover.png',
    refs: ['ivy.png', 'oliver.png', 'complaint-kingdom.png'],
    prompt: `BOOK COVER, composed so everything sits in the UPPER part of the image (square-friendly — a top-crop to 1024x1024 must preserve the title). Across the TOP, the title in bold hand-lettered storybook GOLDEN letters with tiny gold-coin decorations woven through: "Ivy & Oliver: The Everything Treasure". Below the title, centered: IVY (white child unicorn, four legs, purple mane, feathered wings, star birthmark, slightly taller) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, slightly shorter) each holding a glowing GOLDEN COMPASS. Around and between them, half-faded faintly-glowing "everyday treasure" items floating ghost-like — a popsicle, a cookie, a TV remote, a small storybook — each wreathed in a soft golden aura. BACKGROUND LEFT: a small dark gloomy gray stone Complaint Kingdom silhouette (per the attached complaint-kingdom reference). BACKGROUND RIGHT: a warm golden-lit forest cottage. At the very bottom in small lettering: "The Problem Solver Series". Exactly TWO characters — Ivy and Oliver — no humans, no duplicates, no Captain in frame. Soft watercolor, whimsical and adventurous.` + SCENE_STYLE,
  },
  '0-intro': {
    refDir: THUMBS, outDir: BOOK10, out: '0-intro.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'baby-sister.png'],
    prompt: `Cozy forest cottage interior, warm afternoon golden light. IVY (white child unicorn, four legs, purple mane, wings, star birthmark, slightly taller) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy, NOT a baby) face each other across a low tree-stump table, both with exaggerated whiny pouty expressions. Floating cartoon speech bubbles around them: "NOT FAIR!" "NOT FAIR!" "NOT FAIR!" with tiny icons of a popsicle, a TV remote, and a cookie. In the BACKGROUND, MOM (golden HONEY adult unicorn, lavender mane, gold heart necklace, soft shawl draped over her back, four-legged horse stance, horse muzzle, NOT humanoid) standing with a tired-loving sigh, tiny HAZEL (pink baby unicorn, rose mane, gold-glowing horn nub, swaddled) curled to her side. On the wall behind everyone, a picture frame tilted slightly, with a soft golden glow leaking from behind it (hinting at the magic map about to appear). Exactly FOUR characters — Ivy, Oliver, Mom, Hazel — no Dad, no Captain, no duplicates, no humans. Soft watercolor, gently humorous mood.` + SCENE_STYLE,
  },
  '1': {
    refDir: THUMBS, outDir: BOOK10, out: '1.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png'],
    prompt: `Cozy forest cottage interior, warm afternoon light. IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy, NOT a baby) face each other with exaggerated whiny expressions, both pointing accusingly. Multiple cartoon speech bubbles overhead: "NOT FAIR — bigger popsicle!" "NOT FAIR — more TV time!" "NOT FAIR — corner piece of cake!" Tiny visual icons of a popsicle, a cake slice, and a TV remote drawn near the bubbles. MOM (golden HONEY four-legged unicorn, lavender mane, gold heart necklace, soft shawl over her back, four-legged horse stance, NOT humanoid) in the background looking tiredly amused. A dusty old folded TREASURE MAP dramatically falling mid-air from behind a tilted wall picture frame, soft golden glow trailing behind it. Both kids' eyes catching the map mid-whine — pivoting from anger to wonder. Exactly THREE characters — Ivy, Oliver, Mom — no Hazel, no Dad, no Captain, no duplicates, no humans. Forest cottage details: wooden walls, round windows, tree-stump furniture. Soft watercolor, gently humorous.` + SCENE_STYLE,
  },
  '2A': {
    refDir: THUMBS, outDir: BOOK10, out: '2A.png',
    refs: ['ivy.png', 'oliver.png', 'captain-grumblebeard.png', 'complaint-kingdom.png'],
    prompt: `Edge of the gloomy Complaint Kingdom at the end of a forest path (per the attached complaint-kingdom reference). The whole scene is mostly DESATURATED and gray — the kids are right at the gate so the kingdom's curse is already taking hold around them. The forest and trees AROUND the gate are washed out and grayed down (muted desaturated grays and slate-greens, NOT lush bright green); only the very back of the forest, far behind them, holds a faint memory of warmer color, while the kingdom ahead through the gate is fully gloomy gray. The overall palette of the IMAGE skews cool and pewter-gray. THREE distinct characters stand together at the kingdom gate, ALL THREE clearly visible side-by-side in the frame — none omitted: (1) IVY on the LEFT — a white child unicorn (four legs, purple mane, feathered wings, star birthmark on shoulder), standing on her four hooves, sneaky-greedy expression, with a small floating thought-bubble above her head reading "more for ME". (2) OLIVER in the MIDDLE right next to Ivy — a bright EMERALD-GREEN child DRAGON (orange round patches, an orange heart patch on his chest, two small rounded horns on his head, dragon tail, small wings, same size as Ivy — NOT a baby), standing on his two dragon legs, sneaky-greedy expression, with his OWN small floating thought-bubble above his head reading "more for ME". OLIVER MUST appear in the scene — he is RIGHT BESIDE Ivy and clearly visible. (3) CAPTAIN GRUMBLE-BEARD on the RIGHT, standing bipedal at the gate gesturing them in (per the attached captain reference: grizzled adult bear pirate, tricorne pirate hat with tiny skull, black eye patch, ratty navy captain's coat, salt-and-pepper beard, brass-buckle belt). Hanging from the Captain's coat: dull tarnished grey trinkets, a faded medal, a desaturated grey-gold coin. ${KINGDOM} ${CAPTAIN} Exactly THREE characters total — Ivy, Oliver, AND Captain Grumble-Beard — all three visible in frame, no other characters, no duplicates, no humans. Do NOT omit Oliver. Soft watercolor, gloomy but storybook-charming.` + SCENE_STYLE,
  },
  '2B': {
    refDir: THUMBS, outDir: BOOK10, out: '2B.png',
    refs: ['ivy.png', 'oliver.png'],
    prompt: `Sunny meadow at the edge of the Whispering Wood, warm forest cottage colors. A dusty old folded TREASURE MAP unrolled on the grass between IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy, NOT a baby). Both gesturing and arguing — cartoon speech bubbles overhead: "I FOUND it!" "I can READ it!" Tally marks and scribbled "rules" floating around the map. The map itself emitting a strange soft golden glow, brighter where they argue, almost like it's amused. Forest cottage visible faintly in the far background; the gloomy gray Complaint Kingdom just barely visible on the distant horizon (per the attached complaint-kingdom reference — small and far). Exactly TWO characters — Ivy and Oliver — no other characters, no duplicates, no humans. Soft watercolor, gently comedic.` + SCENE_STYLE,
  },
  '3A': {
    refDir: THUMBS, outDir: BOOK10, out: '3A.png',
    refs: ['ivy.png', 'oliver.png', 'captain-grumblebeard.png', 'complaint-kingdom.png'],
    prompt: `Inside a small gray castle room in the Complaint Kingdom (per the attached complaint-kingdom reference for palette and stone-walled architecture — desaturated cool gray palette throughout). PRINCESS POUT — a young animal princess, specifically a small young FOX KIT (reddish-brown fur dulled by the kingdom's curse to muted gray-pink, big sad eyes, a tiny tarnished gold crown on her head) — sits forlornly on the gray stone floor amid LITERAL MOUNTAINS of toys piled high all around her to nearly the ceiling (stuffed animals, dolls, wooden blocks, kites, balls, dollhouses, hoops). EVERY single toy is rendered in DULL, LIFELESS GRAY-AND-FADED colors with NO joy in any of them — no warm color anywhere in the toys. IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy) peek in from the doorway, mouths slightly open with wonder turning slowly to dawning self-recognition. CAPTAIN GRUMBLE-BEARD stands behind them at the doorway watching knowingly (per the attached captain reference). ${KINGDOM} ${CAPTAIN} Exactly FOUR characters — Captain, Ivy, Oliver, Princess Pout — no duplicates, no humans, no extras. Soft watercolor, desaturated cool palette.` + SCENE_STYLE,
  },
  '3B': {
    refDir: THUMBS, outDir: BOOK10, out: '3B.png',
    refs: ['ivy.png', 'oliver.png', 'captain-grumblebeard.png', 'complaint-kingdom.png'],
    prompt: `Inside a long gray castle banquet hall (per the attached complaint-kingdom reference) — gray stone walls, gray banners, overcast pewter light through tall narrow windows. A long heavy wooden banquet table laden with a MASSIVE feast — but every single dish rendered in DULL, LIFELESS GRAY AND DESATURATED TAN colors, no warm food tones, no appetizing color, no joy. DUKE GRUMBLE — a very large grumpy adult brown bear in a tarnished velvet noble's collar (no pirate hat, no eye patch — clearly NOT the Captain) — sits glumly at the head of the table, glumly mid-chew, expression sour and bored despite the abundance. IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy) standing partway down the hall, mouths slightly agape, taking it in. CAPTAIN GRUMBLE-BEARD stands beside them as the host (per the attached captain reference: distinct from Duke Grumble by his eye patch, tricorne pirate hat with skull, ratty navy coat, and salt-and-pepper beard). In the distant background, COUNT COMPARE — a tall thin GIRAFFE in a long deep-velvet vest — peeks jealously around a far doorway at the Duke's table. ${KINGDOM} ${CAPTAIN} Exactly FIVE characters — Captain, Ivy, Oliver, Duke Grumble, Count Compare — Duke and the Captain are BOTH bears but must be visually distinct (Duke = noble collar no hat; Captain = pirate tricorne + eye patch). No duplicates, no humans. Soft watercolor, desaturated gloomy palette.` + SCENE_STYLE,
  },
  '4': {
    refDir: THUMBS, outDir: BOOK10, out: '4.png',
    refs: ['ivy.png', 'oliver.png', 'captain-grumblebeard.png', 'complaint-kingdom.png'],
    prompt: `Gray cobblestone town square in the Complaint Kingdom (per the attached complaint-kingdom reference) — gray stone buildings, overcast pewter sky. CAPTAIN GRUMBLE-BEARD sits gently on a low gray stone wall at child's eye-level, looking at Ivy and Oliver with surprisingly kind eyes (a soft warm twinkle visible). IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy, NOT a baby) stand facing him side by side, ears pink with embarrassment, tails drooping, faces caught in dawning self-recognition. Small ghostly thought-clouds above their heads showing tiny gray-toned scenes of themselves whining at home — a popsicle, a TV remote, a cake corner. ${KINGDOM} ${CAPTAIN} Exactly THREE characters — Captain, Ivy, Oliver — no duplicates, no humans, no extras. Soft watercolor, tender and quietly humorous.` + SCENE_STYLE,
  },
  '5A': {
    refDir: THUMBS, outDir: BOOK10, out: '5A.png',
    refs: ['ivy.png', 'oliver.png', 'captain-grumblebeard.png', 'complaint-kingdom.png'],
    prompt: `SPLIT COMPOSITION inside a treasure room of the Complaint Kingdom (per the attached complaint-kingdom reference — gray stone walls in the background, treasure chests around). TOP PANEL: IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy, NOT a baby) both lunging at a single large white DIAMOND between them — the diamond mid-transformation visibly turning gray and crumbly, cracking apart in their grasp. Their expressions: shock and dismay. BOTTOM PANEL: same room, calmer moment. Oliver holds a glowing RUBY that is blazing BRILLIANT WARM RED light. Ivy stands close, expression softening from forced politeness to genuine warmth, with a small floating speech-arc rising from "Hmph…" (smaller) to "That's… pretty" (medium) to "I'm GLAD you found a nice one!" (bright) — and the ruby visibly brighter at each. CAPTAIN GRUMBLE-BEARD watches from the side with an amused half-smile. Other treasures around the room: some glowing brightly, some still dull gray. ${KINGDOM} ${CAPTAIN} Exactly THREE characters across the split — Captain, Ivy, Oliver — no duplicates, no humans. Soft watercolor.` + SCENE_STYLE,
  },
  '5B': {
    refDir: THUMBS, outDir: BOOK10, out: '5B.png',
    refs: ['ivy.png', 'oliver.png', 'captain-grumblebeard.png', 'complaint-kingdom.png'],
    prompt: `Quiet corner of the gray Complaint Kingdom (per the attached complaint-kingdom reference). CAPTAIN GRUMBLE-BEARD sits low and gentle on a flat gray stone, paws together, surprisingly kind expression (per the attached captain reference). IVY (white child unicorn, four legs, purple mane, wings, star birthmark) and OLIVER (green child dragon, orange patches, orange heart chest patch, small rounded horns, same size as Ivy, NOT a baby) sit side by side facing him, ears drooping with shame, faces honest and open. Small floating gray-toned thought bubbles around their heads showing their old whining habits: a popsicle, TV time, a cake slice. In the sky just above the gray rooftops behind the Captain, a tiny golden hint of WARM color is creeping in — the very first crack of color returning to the cursed kingdom. ${KINGDOM} ${CAPTAIN} Exactly THREE characters — Captain, Ivy, Oliver — no duplicates, no humans, no extras. Soft watercolor, quiet and emotional.` + SCENE_STYLE,
  },
  '6': {
    refDir: THUMBS, outDir: BOOK10, out: '6.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'dad.png', 'baby-sister.png'],
    prompt: `Cozy forest cottage bedroom at night, deep warm lamplight. The whole family is cuddled up together in one big cozy BED, snuggled under a soft patchwork blanket pulled up high so it covers their bodies — only their heads, shoulders, and happy faces peek out above the covers (legs and bodies completely hidden under the blanket; NOBODY has any hooves, hands, paws, claws, or arms peeking out above the covers). Tucked in side by side along the bed left to right: IVY (white child unicorn, purple mane, little feathered wings, star birthmark) on the far left holding open a small storybook propped between her and the others, MOM (golden HONEY adult unicorn — clearly warm gold not white, lavender mane, small gold heart necklace), tiny HAZEL (pink baby unicorn, rose mane, gold-glowing horn nub) fast ASLEEP nestled in the middle, DAD (a big but soft-bodied friendly bronzed-green adult dragon — NOT muscular, gentle rounded tummy, small rounded horns), and OLIVER (green child dragon, bright emerald-green, orange patches, orange heart chest patch, two small rounded horns clearly visible, same size as Ivy, NOT a baby) on the far right mid-funny-voice with mouth open in a comical pose. Two small glowing GOLDEN COMPASSES float gently in the air above the bed, each needle pointed straight down at the family pile. Through a small cottage window above the headboard, the brightened Complaint Kingdom now glows with warm golden silhouettes in the distance (curse broken). Exactly FIVE family members — Mom, Dad, Hazel, Ivy, Oliver — only the named family, no Captain in this frame, no duplicates, no humans. A heartfelt warm-golden family ending, soft watercolor.` + SCENE_STYLE,
  },
};

async function main() {
  const args = process.argv.slice(2);
  let table = JOBS, argNames = args;
  if (args[0] === 'scenes') { table = SCENES; argNames = args.slice(1); }
  const names = argNames.length ? argNames : Object.keys(table);
  for (const name of names) {
    const job = table[name];
    if (!job) { console.log(`?? unknown job: ${name}`); continue; }
    process.stdout.write(`-> ${name} ... `);
    try {
      const bytes = await generate(job);
      console.log(`OK  ${job.out}  (${Math.round(bytes / 1024)} KB)`);
    } catch (e) {
      console.log(`FAIL  ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }
}
main();
