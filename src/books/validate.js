// Validates a book's scene graph. Throws on the first problem found, since
// books are static data and bugs should fail loudly during build/dev rather
// than show up as a broken story for a reader.
//
// Rules:
//   - `id`, `title`, `coverImage`, `scenes` are required.
//   - `scenes.start` must exist (it's the entry point every book renders first).
//   - Every scene needs `title`, `image`, `text`, `choices`.
//   - Each choice needs `text` and `next`.
//   - Every `next` must resolve to a scene id that exists in `scenes`.
//   - Every scene must be reachable from `start`. (Unreachable scenes are
//     almost always a typo'd choice target left behind.)

export default function validateBook(book) {
  const where = `book "${book?.id ?? '<unknown>'}"`;
  if (!book || typeof book !== 'object') throw new Error(`${where}: not an object`);
  // Chapter books (kind: 'chapter') are a linear, turn-the-page format with a
  // different shape than branching picture-books — validate them separately.
  if (book.kind === 'chapter') return validateChapterBook(book, where);
  for (const k of ['id', 'title', 'coverImage', 'scenes']) {
    if (!book[k]) throw new Error(`${where}: missing required field "${k}"`);
  }
  const { scenes } = book;
  if (!scenes.start) throw new Error(`${where}: missing required scene "start"`);

  // Per-scene shape checks.
  for (const [sceneId, scene] of Object.entries(scenes)) {
    const sw = `${where}, scene "${sceneId}"`;
    for (const k of ['title', 'image', 'text', 'choices']) {
      if (scene[k] === undefined || scene[k] === null) throw new Error(`${sw}: missing "${k}"`);
    }
    if (!Array.isArray(scene.choices)) throw new Error(`${sw}: "choices" must be an array`);
    scene.choices.forEach((c, i) => {
      const cw = `${sw}, choices[${i}]`;
      if (!c || typeof c !== 'object') throw new Error(`${cw}: not an object`);
      if (!c.text) throw new Error(`${cw}: missing "text"`);
      if (!c.next) throw new Error(`${cw}: missing "next"`);
      if (!scenes[c.next]) throw new Error(`${cw}: "next: ${c.next}" does not exist in scenes`);
    });
  }

  // Reachability — BFS from start. Anything unvisited is dead code.
  const reachable = new Set(['start']);
  const queue = ['start'];
  while (queue.length) {
    const s = queue.shift();
    for (const c of scenes[s].choices) {
      if (!reachable.has(c.next)) {
        reachable.add(c.next);
        queue.push(c.next);
      }
    }
  }
  const unreachable = Object.keys(scenes).filter((s) => !reachable.has(s));
  if (unreachable.length) {
    throw new Error(`${where}: unreachable scenes from start: ${unreachable.join(', ')}`);
  }
}

// Chapter-book rules:
//   - `id`, `title`, `coverImage`, `sections` are required.
//   - `sections` is a non-empty array; each needs `id`, `label`, `title`.
//   - section ids are unique (the reader uses them as React keys / TOC anchors).
//   - `spots` (if present) is an array; every `[[SPOT n]]` marker in `text`
//     must have a matching `spots[n]`, and vice-versa, so no marker renders an
//     empty image and no illustration is silently dropped. Empty `text`
//     (an unwritten chapter) is allowed — the reader shows a "coming soon" page.
function validateChapterBook(book, where) {
  for (const k of ['id', 'title', 'coverImage', 'sections']) {
    if (!book[k]) throw new Error(`${where}: missing required field "${k}"`);
  }
  if (!Array.isArray(book.sections) || book.sections.length === 0) {
    throw new Error(`${where}: "sections" must be a non-empty array`);
  }
  const seen = new Set();
  for (const [i, sec] of book.sections.entries()) {
    const sw = `${where}, sections[${i}]`;
    for (const k of ['id', 'label', 'title']) {
      if (!sec[k]) throw new Error(`${sw}: missing "${k}"`);
    }
    if (seen.has(sec.id)) throw new Error(`${sw}: duplicate section id "${sec.id}"`);
    seen.add(sec.id);
    const spots = sec.spots || [];
    if (!Array.isArray(spots)) throw new Error(`${sw}: "spots" must be an array`);
    const markers = [...(sec.text || '').matchAll(/\[\[SPOT (\d+)\]\]/g)].map((m) => Number(m[1]));
    for (const n of markers) {
      if (!spots[n]) throw new Error(`${sw}: [[SPOT ${n}]] marker has no matching spots[${n}]`);
    }
    spots.forEach((_, n) => {
      if (!markers.includes(n)) throw new Error(`${sw}: spots[${n}] is never placed by a [[SPOT ${n}]] marker`);
    });
  }
}
