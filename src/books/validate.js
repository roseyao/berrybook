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
