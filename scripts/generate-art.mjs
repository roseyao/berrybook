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
const BOOK8 = path.join(REPO, 'public/images/book8');
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
    prompt: `Character design sheet: "Dad", a big, mature, grown-up DRAGON FATHER of Oliver — clearly an adult dad: VERY TALL (around 6 foot 4), towering and long-limbed, broad-shouldered, strong and sturdy with only a slight gentle dad belly (not chubby or round), gentle laugh-lines around the eyes, and a calm grown-up demeanor (NOT a teenager or a young dragon), a little nerdy. Warm bronzed-green scales (a little deeper and richer than Oliver's bright emerald), lighter yellow-green belly, friendly amber eyes, gentle easy smile, small rounded horns, sturdy cozy build, wings folded. He wears exactly ONE single pair of techy over-ear HEADPHONES resting around his NECK — not on his head or over his ears, just one set hanging around his neck (his signature accessory). A warm, capable, clearly grown-up dad — much larger and older than a child or teenage dragon. ${STYLE}`,
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
  'family-lineup': {
    refs: ['dad.png', 'grandma-quinn.png', 'mom.png', 'ivy.png', 'oliver.png', 'baby-sister.png'],
    out: 'family-lineup.png',
    prompt: `Group family portrait / proportion line-up, WIDE landscape composition, full bodies standing in a row on a plain pale cream background, soft watercolor children's-book style matching the attached references exactly. CRITICAL: get the relative HEIGHTS right, tallest to shortest:
1. DAD — green dragon with bronzed olive-green scales (a bit deeper than Oliver), one pair of headphones around his neck — is BY FAR the tallest and biggest, a towering grown-up, roughly TWICE the height of the children.
2. GRANDMA QUINN — elderly white unicorn, silver mane, round glasses, knitted shawl — the SECOND tallest, clearly taller than Mom.
3. MOM — golden-coated unicorn, lavender mane, small gold heart-pendant necklace — an adult, a little shorter than Grandma.
4. IVY — white unicorn, purple mane, feathered wings — a child, only SLIGHTLY taller than Oliver.
5. OLIVER — bright green dragon, orange patches, orange heart patch on chest — a child, ALMOST the same height as Ivy, just a touch shorter (NOT tiny).
Plus the newborn PINK baby unicorn (rose mane, tiny gold-glowing horn) cradled in Mom's arms — baby-sized, the smallest. The two adults and Grandma clearly tower over the two children. Every character exactly on-model to the references. Friendly and warm. No text, no words, no labels.`,
  },
};

const SCENE_STYLE = " Children's picture-book illustration, soft watercolor and colored-pencil style, warm inviting palette, gentle and child-friendly, roughly square composition. The attached images are CHARACTER REFERENCES — keep every character exactly on-model (same colors, markings, accessories, and proportions). The adults (Mom, Dad, Grandma) are clearly much taller than the two children; Ivy is slightly taller than Oliver; the newborn baby is tiny. IMPORTANT: ONLY the specific characters named in this scene appear in the image — do NOT add any duplicate characters, extra ponies, extra dragons, or any other background people/creatures. Each named character appears exactly once. All unicorns (Ivy, Mom, Grandma, and the baby) are four-legged animals standing on hooves — never humanoid, never upright on two legs, never with human hands, a human face, or a human body — each unicorn has a horse-like muzzle/snout and hooves and stands on exactly FOUR legs (never extra, duplicated, or merged limbs; they may wear simple clothing, but the face and body stay fully unicorn).";

const SCENES = {
  '0-cover': {
    refDir: THUMBS, outDir: BOOK8, out: '0-cover.png',
    refs: ['mom.png', 'dad.png', 'ivy.png', 'oliver.png', 'baby-sister.png'],
    prompt: `BOOK COVER. At the top, the title in warm rounded hand-lettered storybook letters: "The New Little Light". At the very bottom in smaller letters: "The Problem Solver Series". Center: IVY (white child unicorn, purple mane, feathered wings) and OLIVER (green child dragon, orange spots, orange heart patch on chest) leaning together lovingly over a tiny swaddled newborn baby sister — a tiny PINK unicorn with a rose mane and a tiny gold-glowing horn. Just behind them, MOM (golden adult unicorn, lavender mane, small gold heart necklace) and DAD (a big but friendly, soft-bodied bronzed-green adult dragon with a gentle rounded tummy — NOT muscular, no six-pack abs — and headphones around his neck) smiling warmly. The whole family glowing softly together, cozy and magical. There is exactly ONE unicorn child (Ivy) and exactly ONE dragon child (Oliver, a GREEN DRAGON — NOT a unicorn); do not draw two unicorn children.` + SCENE_STYLE,
  },
  '0-intro': {
    refDir: THUMBS, outDir: BOOK8, out: '0-intro.png',
    refs: ['mom-pregnant.png', 'ivy.png', 'oliver.png'],
    prompt: `Cozy sunlit living room. MOM, a golden adult unicorn (lavender mane, small gold heart necklace), is RECLINING on a comfy couch so her VERY LARGE, round PREGNANT belly is clearly visible and obvious — she is heavily pregnant and the big rounded belly is a clear focus of the scene. IVY (white child unicorn, purple mane, wings) beaming with excitement beside the couch. OLIVER (green child dragon, orange spots, orange heart chest patch) gently pressing one ear against Mom's big pregnant belly to listen, curious but a little unsure. Warm afternoon light, tender and joyful.` + SCENE_STYLE,
  },
  '1': {
    refDir: THUMBS, outDir: BOOK8, out: '1.png',
    refs: ['mom-pregnant.png', 'dad.png', 'ivy.png', 'oliver.png'],
    prompt: `Homey living room, daytime. MOM, a golden adult four-legged unicorn (lavender mane, gold heart necklace, a soft shawl over her back) with a big round pregnant belly, napping peacefully curled on a comfy couch, a cozy blanket tucked over her whole lower body and legs so only her head, neck, shoulders, and round pregnant belly show above the blanket, with one normal unicorn head and a single pair of ears. In the kitchen behind, DAD, a tall bronzed-green adult dragon with headphones around his neck, stirring a pot. IVY (white unicorn, purple mane, wings) sitting patiently holding a little calendar. OLIVER (green dragon child, orange spots, orange heart chest patch), about the same size as Ivy, lying on his tummy on the rug with his chin propped on his paws, looking bored and a bit anxious (normal dragon anatomy, head facing forward). Cozy, gentle waiting mood.` + SCENE_STYLE,
  },
  '2A': {
    refDir: THUMBS, outDir: BOOK8, out: '2A.png',
    refs: ['ivy.png', 'oliver.png'],
    prompt: `A small pastel NURSERY with a wooden crib. IVY (white unicorn, purple mane, wings) happily smoothing a tiny blanket and arranging little baby socks, content. OLIVER (green dragon, orange spots, orange heart chest patch) beside a toppled stack of diapers, hugging a worn little dragon plushie, ears and tail drooping, looking wistful and worried. A few old toys in a basket nearby. Soft window light, a bittersweet tender mood.` + SCENE_STYLE,
  },
  '2B': {
    refDir: THUMBS, outDir: BOOK8, out: '2B.png',
    refs: ['grandma-quinn.png', 'ivy.png', 'oliver.png'],
    prompt: `Cozy farmhouse kitchen. GRANDMA QUINN, an elderly unicorn (white coat, silver-grey mane, round glasses, knitted shawl), much taller than the children, talking gently to them. OLIVER (green dragon, orange spots, heart chest patch) gulping nervously and pinching his nose at the thought of stinky diapers, worried. IVY (white unicorn, purple mane, wings) listening with curious excitement. Warm reassuring light, a gentle touch of humor.` + SCENE_STYLE,
  },
  '3A': {
    refDir: THUMBS, outDir: BOOK8, out: '3A.png',
    refs: ['grandma-quinn.png', 'ivy.png', 'oliver.png'],
    prompt: `A bright, hopeful scene in a cozy room. GRANDMA QUINN is an ELDERLY UNICORN — a four-legged unicorn with a spiral horn, white coat, silver-grey mane, round glasses, and a knitted shawl. She is a UNICORN, absolutely NOT a human or person, with hooves not hands. She stands proudly beside a low table holding a lopsided decorated cake, watching over IVY (white unicorn, purple mane, wings) and OLIVER (green dragon, orange spots, heart chest patch) who help her. A big colorful paper banner strung above clearly spells the full word "WELCOME". Warm, busy, hopeful.` + SCENE_STYLE,
  },
  '3B': {
    refDir: THUMBS, outDir: BOOK8, out: '3B.png',
    refs: ['grandma-quinn.png', 'ivy.png', 'oliver.png'],
    prompt: `A dim, quiet bedroom at night, soft moonlight through the window. TWO children are tucked in side by side under the covers of one bed: OLIVER (green dragon, orange spots, orange heart chest patch) with a very tiny faint worried flame, looking worried and missing his mom, AND right beside him IVY (white unicorn, purple mane, wings) with slightly watery eyes. GRANDMA QUINN (elderly white unicorn, silver mane, glasses, shawl) leaning over the bed, tucking BOTH children in and hugging them warmly, glowing with warmth. Make sure BOTH the green dragon boy and the white winged unicorn girl are clearly visible in the bed. Tender and comforting.` + SCENE_STYLE,
  },
  '4': {
    refDir: THUMBS, outDir: BOOK8, out: '4.png',
    refs: ['mom.png', 'dad.png', 'baby-sister.png', 'ivy.png', 'oliver.png'],
    prompt: `Warm entryway, the family just home from the hospital. DAD (tall bronzed-green adult dragon, headphones around neck) gently cradling a tiny swaddled newborn PINK baby unicorn (rose mane, tiny gold-glowing horn) with little golden sparkles. MOM — a four-legged UNICORN with a horse-like muzzle and hooves, standing on all four legs beside Dad and smiling down at the baby. She has a unicorn face and a unicorn body (absolutely NOT a human face or human body); she simply wears a soft shawl draped over her back. Golden coat, lavender mane, gold heart necklace, no longer pregnant. On a small side table, two little wrapped gift boxes. IVY (white unicorn, purple mane, wings) and OLIVER (green dragon, orange spots, heart chest patch) creeping close in wonder; OLIVER pinching his nose as the baby begins to cry. Joyful, funny, brimming with love.` + SCENE_STYLE,
  },
  '5A': {
    refDir: THUMBS, outDir: BOOK8, out: '5A.png',
    refs: ['ivy.png', 'oliver.png', 'baby-sister.png'],
    prompt: `A cozy room. IVY (white unicorn, purple mane, wings) gently rocking and humming to the tiny PINK baby unicorn (rose mane, gold-glowing horn), whose crying is softening. OLIVER (green dragon, orange spots, heart chest patch) pulling a goofy crossed-eyes silly face, and the baby giving her very first tiny smile, warm golden sparkles fizzing around her little glowing horn. A fresh diaper set aside nearby. Warm and sweet, the quiet joy of helping.` + SCENE_STYLE,
  },
  '5B': {
    refDir: THUMBS, outDir: BOOK8, out: '5B.png',
    refs: ['dad.png', 'mom.png', 'baby-sister.png', 'ivy.png', 'oliver.png'],
    prompt: `A tender nighttime moment in warm golden lamplight. DAD (tall bronzed-green adult dragon, headphones) sits on the couch with a comforting arm around OLIVER. OLIVER (green dragon CHILD, orange spots, orange heart chest patch) is the SAME SIZE as Ivy — a big kid, definitely NOT a baby and NOT tiny — sitting up beside Dad and leaning into him, with a brave little wobbly smile. He is NOT crying and has no tears. MOM (golden four-legged unicorn standing on hooves, lavender mane, gold heart necklace) curled up nearby with the tiny PINK baby unicorn nestled against her, the baby turning calmly toward Oliver with a soft glow. IVY (white unicorn, purple mane, wings) leaning in close. Warm, reassuring, intimate — love growing.` + SCENE_STYLE,
  },
  '6': {
    refDir: THUMBS, outDir: BOOK8, out: '6.png',
    refs: ['mom.png', 'dad.png', 'ivy.png', 'oliver.png', 'baby-sister.png'],
    prompt: `A warm, glowing bedtime ending. The whole family is cuddled up together in one big cozy BED, snuggled under a soft patchwork blanket pulled up so it covers their bodies — mostly their heads, shoulders, and happy faces peek out above the covers (their legs and bodies are hidden under the blanket). Tucked in side by side: IVY (white unicorn, purple mane, little wings), MOM (golden unicorn, lavender mane, gold heart necklace), the tiny PINK baby unicorn (rose mane, gold-glowing horn) fast ASLEEP with her eyes closed nestled in the middle, DAD (big bronzed-green dragon, headphones around his neck), and OLIVER (green dragon child, orange spots, orange heart chest patch). Everyone cozy, sleepy, and content, with gently closed or droopy happy eyes. Soft warm lamplight. A heartfelt family ending.` + SCENE_STYLE,
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
