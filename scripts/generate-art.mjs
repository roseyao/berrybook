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

// Shared tree description — every Rhythm-Tree scene starts from this.
const TREE = "The RHYTHM TREE is an ancient, towering COASTAL REDWOOD in the cottage backyard — tall majestic trunk with reddish-brown fibrous bark and deep vertical furrows, a flared base, and a soft layered conical crown of feathery green needle sprays (NOT an oak, NOT broad leaves). Its trunk softly glows with a warm golden inner light through cracks in the bark. Five floating colored note-orbs drift gently among the needle layers: 3 warm golden round orbs (Mom), 2 silver round orbs (Dad), 1 sparkly purple round orb (Ivy), 1 small orange FLAME-SHAPED orb drawn as a tiny cartoon flame (Oliver), 1 tiny soft pink round orb (Hazel). Each orb has a soft glow trail. Match the attached rhythm-tree reference image exactly.";

const SCENES = {
  '0-cover': {
    refDir: THUMBS, outDir: BOOK9, out: '0-cover.png',
    refs: ['ivy.png', 'oliver.png', 'baby-sister.png', 'rhythm-tree.png'],
    prompt: `BOOK COVER, composed so everything sits in the UPPER part of the image (square-friendly — a top-crop to 1024x1024 must preserve the title). Across the TOP, the title in warm rounded hand-lettered glowing storybook letters with little musical notes woven through them: "Ivy & Oliver: The Family Rhythm Tree". Below the title, centered: the Rhythm Tree (a tall ancient redwood per the attached tree reference, with the five colored note-orbs drifting among its needle layers — 3 gold, 2 silver, 1 sparkly purple, 1 orange flame-shaped, 1 tiny soft pink). At the base of the tree: IVY (white child unicorn, purple mane, feathered wings, star birthmark) and OLIVER (green child dragon, orange spots, orange heart chest patch) looking up at the tree with wonder. Baby HAZEL (tiny PINK newborn unicorn, rose mane, gold-glowing horn nub) peeking out from BEHIND the trunk. At the very bottom in small lettering: "The Problem Solver Series". Warm sunset light, magical. ${TREE} Exactly ONE Ivy, ONE Oliver, ONE baby Hazel — no other characters, no duplicates.` + SCENE_STYLE,
  },
  '0-intro': {
    refDir: THUMBS, outDir: BOOK9, out: '0-intro.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'rhythm-tree.png'],
    prompt: `Cozy forest cottage backyard, warm late-afternoon golden light. The Rhythm Tree stands centered (per the attached tree reference). On the lawn: IVY (white child unicorn, purple mane, wings, star birthmark, four legs, horse muzzle/hooves, slightly taller) standing alert and excited. OLIVER (green child dragon, orange patches, orange heart chest patch, same size as Ivy, NOT a baby) mid bouncy flame-pop dance. On the cottage porch in the background, MOM (golden adult four-legged unicorn, lavender mane, gold heart necklace, soft shawl draped over her back, horse muzzle/hooves, NOT humanoid) smiling gently — she is small in frame, on the porch. ${TREE} Exactly THREE characters appear — Ivy, Oliver, Mom — no Hazel, no Dad, no duplicates.` + SCENE_STYLE,
  },
  '1': {
    refDir: THUMBS, outDir: BOOK9, out: '1.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'dad.png', 'baby-sister.png'],
    prompt: `Warm cottage interior at dusk, soft lamp light. MOM (golden adult four-legged unicorn, lavender mane, gold heart necklace, horse muzzle/hooves, NOT humanoid) seated in a large armchair like a resting horse, a soft knit blanket draped over her legs so leg anatomy reads cleanly. DAD (adult dragon, bronzed-green, silver patches, soft-bodied, NOT muscular, gentle rounded tummy) standing beside her gently holding a tiny swaddled newborn PINK baby unicorn HAZEL (rose mane, barely-there horn nub glowing warm gold). IVY (white child unicorn, purple mane, wings, star birthmark, four legs) leaning in with wonder. OLIVER (green child dragon, orange patches, heart chest patch, same size as Ivy, NOT a baby) breathing the tiniest soft golden flame toward Hazel; Hazel's eyes flickering open. Exactly FIVE characters — Mom, Dad, Hazel, Ivy, Oliver — no duplicates, no extras. Soft watercolor, tender, warm.` + SCENE_STYLE,
  },
  '2A': {
    refDir: THUMBS, outDir: BOOK9, out: '2A.png',
    refs: ['ivy.png', 'oliver.png', 'rhythm-tree.png'],
    prompt: `Same backyard as the Rhythm Tree (per the attached tree reference) but the music is in disarray — the five note-orbs swirling at odd angles in the needle canopy (3 gold floating at strange angles, 2 silver rushing, 1 purple unusually small, 1 orange flame-shaped popping out of turn, plus 1 brand-new SOFT PINK round orb — gentle, distinct, smaller than the others). The trunk still glows steady and warm — the contrast between the musical chaos and the tree's reassuring glow is the whole image. IVY (white child unicorn, purple mane, wings, star birthmark, four legs, horse muzzle/hooves) pressing one ear toward the trunk listening carefully. OLIVER (green child dragon, orange patches, heart chest patch, same size as Ivy) standing nearby, arms crossed, frowning at the swirling notes. ${TREE} Exactly TWO characters — Ivy and Oliver — no other characters, no duplicates.` + SCENE_STYLE,
  },
  '2B': {
    refDir: THUMBS, outDir: BOOK9, out: '2B.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'dad.png', 'baby-sister.png'],
    prompt: `Warm cottage interior, soft lamp light. MOM (golden adult four-legged unicorn, lavender mane, gold heart necklace, horse muzzle/hooves, NOT humanoid) seated like a resting horse in a large armchair, a soft knit blanket draped over her folded legs so anatomy reads cleanly, holding tiny HAZEL (newborn PINK unicorn, rose mane, barely-there horn nub glowing warm gold, wrapped in a soft pastel blanket) curled to her chest. IVY (white child unicorn, purple mane, wings, star birthmark, four legs) leaning in with wonder, "feeling something big and warm in her chest." OLIVER (green child dragon, orange patches, heart chest patch, same size as Ivy, NOT a baby) breathing the gentlest tiny golden flame toward Hazel; Hazel's eyes flickering open looking right at him. DAD (adult dragon, bronzed-green, silver patches, soft-bodied, NOT muscular, gentle rounded tummy) standing proudly nearby. Exactly FIVE characters — no duplicates, no extras. Tender, warm.` + SCENE_STYLE,
  },
  '3A': {
    refDir: THUMBS, outDir: BOOK9, out: '3A.png',
    refs: ['oliver.png', 'rhythm-tree.png'],
    prompt: `OLIVER (green child dragon, orange patches, orange heart chest patch, same size as Ivy in other scenes, NOT a baby) sits alone at the base of the glowing Rhythm Tree (per the attached tree reference) with a small fallen stick beside him. His expression shifts from angry to small and honest — a faint translucent soft "balloon" glows in his chest area to suggest the big feeling inside him. Beside him, a single ORANGE FLAME-SHAPED note-orb hovers warm and steady (drawn as a small cartoon flame, NOT a round ball). Above his head, that orange flame-note and a single warm gold round note (Mom's) are shown as two gentle glowing ribbons just beginning to intertwine. ${TREE} Only ONE character — Oliver. NO Ivy, NO Mom in the image, NO duplicates of Oliver, no other characters. Soft watercolor, quiet, tender, vulnerable.` + SCENE_STYLE,
  },
  '3B': {
    refDir: THUMBS, outDir: BOOK9, out: '3B.png',
    refs: ['ivy.png', 'rhythm-tree.png'],
    prompt: `Soft afternoon light at the Rhythm Tree (per the attached tree reference). IVY (white child unicorn, purple mane, wings, star birthmark, four legs, horse muzzle/hooves) stands alone at the base, posture a little TOO composed — trying to look perfectly fine. Her sparkly purple note-orb hovers just above her, drawn UNUSUALLY TINY AND DIM. In the canopy above her, the tree plays the same purple note back FULL and BIG and BRIGHT — a clear visual contrast between her dim note and the tree's bright version. All five note-orbs visible somewhere in the canopy (3 gold, 2 silver, the 1 big bright purple, 1 orange flame-shaped, 1 tiny soft pink). Ivy's composed expression beginning to crack, lip wobbling, a single honest tear forming. ${TREE} Only ONE character — Ivy. NO Oliver, no duplicates, no other characters. Quiet, emotional, honest. Soft watercolor.` + SCENE_STYLE,
  },
  '4': {
    refDir: THUMBS, outDir: BOOK9, out: '4.png',
    refs: ['ivy.png', 'oliver.png', 'rhythm-tree.png'],
    prompt: `Dusk in the cottage backyard, sky a soft pink-and-gold gradient. IVY (white child unicorn, purple mane, wings, star birthmark, four legs, horse muzzle/hooves, slightly taller) and OLIVER (green child dragon, orange patches, orange heart chest patch, same size as Ivy, NOT a baby) are sitting side by side at the base of the glowing Rhythm Tree (per the attached tree reference), leaning gently into each other, expressions tired-honest, sharing a tiny watery smile. Above them in the canopy, all five note-orbs drift gently (3 gold, 2 silver, 1 sparkly purple, 1 orange flame-shaped, 1 soft pink). In the background, a small cottage window glows warm yellow (NO figures visible in the window, just the warm glow). ${TREE} Exactly TWO characters — Ivy and Oliver — no duplicates, no other characters. Tender twilight mood, soft watercolor.` + SCENE_STYLE,
  },
  '5A': {
    refDir: THUMBS, outDir: BOOK9, out: '5A.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'dad.png'],
    prompt: `Split composition, two simultaneous moments, soft warm interior lighting. LEFT HALF — cottage kitchen: MOM (golden adult four-legged unicorn, lavender mane, gold heart necklace, horse muzzle/hooves, NOT humanoid) lowered onto the kitchen floor like a resting horse, legs folded under her with a soft blanket draped over her legs so leg anatomy reads cleanly, gently nuzzling OLIVER (green child dragon, orange patches, orange heart chest patch, same size as Ivy, NOT a baby) — Oliver leaning into her neck with relief. RIGHT HALF — cottage porch at dusk: DAD (adult dragon, bronzed-green, silver patches, soft-bodied, NOT muscular, gentle rounded tummy) seated on the porch boards beside IVY (white child unicorn, purple mane, wings, star birthmark, four legs) — Ivy leaning honestly against him. Through a small window in the background, the Rhythm Tree glows softly with all five note-orbs harmonizing. ${TREE} Exactly FOUR characters across the split — Mom, Oliver, Dad, Ivy — NO Hazel, no duplicates, no extras. Deep tender warmth, soft watercolor.` + SCENE_STYLE,
  },
  '5B': {
    refDir: THUMBS, outDir: BOOK9, out: '5B.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'dad.png'],
    prompt: `Tender dinner scene inside the cottage, warm lamp light. Layout: FOREGROUND — a low wooden tree-stump dinner table with two simple wooden seats; OLIVER (green child dragon, orange patches, orange heart chest patch, same size as Ivy, NOT a baby) at the table mid-tantrum — mouth open mid-cry, brows knit, a small wooden cup tipped sideways spilling a clear puddle of juice across the table — but his expression also hints at the small honest scared real feeling underneath the big reaction. Opposite him at the table, IVY (white child unicorn — pure WHITE coat, purple mane, feathered wings, star birthmark on shoulder, four legs, horse muzzle/hooves) sits quietly with all four hooves on the floor — she is NOT holding anything in her hooves (her front hooves rest naturally on the table edge or just stand on the floor — do NOT draw extra limbs or a "fifth leg"). On the table directly in front of Ivy, a small ceramic plate with a single slice of toast on it. Ivy's expression: startled and sad, big watery eyes, gently surprised by her own welling tears. NEAR BACKGROUND (just a few feet behind the table) — MOM and DAD standing close together side by side, watching the kids with TENDER, GENTLY CONCERNED expressions: soft worried-loving eyes, slightly furrowed brows, faint quiet smiles full of empathy — NOT happy, NOT bright, NOT cheerful, NOT alert; they look tired and softly concerned for their kids. DAD is the TALLEST character in the whole image — clearly a big grown-up. MOM is NOTICEABLY SHORTER than Dad; the top of Mom's head reaches only to Dad's shoulder (Dad is roughly a head and a half taller). Mom is a FOUR-LEGGED UNICORN — she stands like a HORSE on ALL FOUR HOOVES (front two hooves planted on the floor, back two hooves planted on the floor, body horizontal like a horse, head/neck held up, NOT upright bipedal, NOT standing on hind legs only, NOT humanoid). All four of her legs are fully visible, ending in HOOVES (not hands, not paws). Her body and chest face sideways like a horse, not forward like a person. Mom has: golden HONEY-colored coat (NOT white, NOT cream — clearly warm gold), flowing lavender mane, small gold heart necklace, soft shawl draped only over her back/shoulders (the shawl does NOT hide her legs — all four legs visible below it). She has a horse muzzle and pointed unicorn ears. DAD: tall adult dragon, standing on his two dragon legs as normal, gentle laugh-line eyes, leaning gently down toward Mom — his head/face close to hers in a soft tender pose. Dad's scales are a RICH WARM BRONZED-GREEN — deeper and a touch redder than Oliver's bright emerald, like burnished copper-green, NOT yellow-olive, NOT muted army-olive, NOT dull. Both adults clearly visible in the background, larger than the kids. Both adults clearly larger than the kids. NO baby anywhere — Hazel is asleep off-frame. Exactly FOUR characters total — Mom, Dad, Ivy, Oliver — no duplicates, no extras. Emotionally honest but warm, not scary. Soft watercolor.` + SCENE_STYLE,
  },
  '6': {
    refDir: THUMBS, outDir: BOOK9, out: '6.png',
    refs: ['ivy.png', 'oliver.png', 'mom.png', 'dad.png', 'baby-sister.png', 'rhythm-tree.png'],
    prompt: `A warm, glowing bedtime ending in a cozy cottage bedroom, deep warm lamplight. The whole family is cuddled up together in one big cozy BED, snuggled under a soft patchwork blanket pulled up high so it covers their bodies — mostly their heads, shoulders, and happy faces peek out above the covers (their legs and bodies are completely hidden under the blanket). Tucked in side by side along the bed: IVY (white child unicorn, purple mane, little feathered wings, star birthmark) on the far left, MOM (golden HONEY-colored adult unicorn — clearly warm gold not white, lavender mane, small gold heart necklace), the tiny PINK baby unicorn HAZEL (rose mane, tiny gold-glowing horn nub) fast ASLEEP with her eyes closed nestled in the middle next to Mom, DAD (a big but soft-bodied, friendly adult dragon with RICH WARM BRONZED-GREEN scales — like burnished copper-green, deeper and a touch redder than Oliver's bright emerald, NOT yellow-olive, NOT muted army-olive — with small rounded horns, NOT muscular, no defined chest muscles or abs, gentle rounded tummy), and OLIVER on the far right — Oliver is a green child dragon, bright emerald-green scales, orange patches, orange heart chest patch, **two small rounded dragon horns on his head (clearly visible above his head)**, same size as Ivy, NOT a baby. CRITICAL ANATOMY RULE: every single character's body — INCLUDING all four hooves of each unicorn, both dragon arms/claws, and Hazel's tiny limbs — stays completely TUCKED UNDER the patchwork blanket. NOBODY has any hooves, hands, paws, claws, or arms peeking out above the covers. Mom is a unicorn and has HOOVES, not hands — and her hooves are hidden under the blanket; she is NOT resting front hooves on top of the blanket and is NOT shown with anything that looks like hands. Only heads, necks, and the very top of shoulders show above the soft folded blanket. Everyone cozy, sleepy, and content with gently closed or droopy happy eyes. Soft warm lamplight. Two soft glowing word-shapes float gently in the air above the bed in warm hand-lettered storybook script: "I need a hug" on the left, "Can I have five minutes?" on the right. Through a cottage window above the headboard, the Rhythm Tree glows softly with all five note-orbs in harmony (3 gold, 2 silver, 1 sparkly purple, 1 orange flame-shaped, 1 soft pink) — per the attached tree reference. ${TREE} Exactly FIVE family members — Mom, Dad, Hazel, Ivy, Oliver — only the named family, no duplicates, no extras. A heartfelt family ending, soft watercolor.` + SCENE_STYLE,
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
