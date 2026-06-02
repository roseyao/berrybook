// Central registry of all books. Each book lives in its own directory under
// src/books/<id>/index.js and is imported here, then validated at module load
// so any data bug fails fast (during build or first import) instead of showing
// up later as a broken story.

import validateBook from './validate';

import rainbowBerries from './rainbow-berries';
import starlightFlowers from './starlight-flowers';
import laundryDisaster from './laundry-disaster';
import backwardsDay from './backwards-day';
import gratitudeGoblin from './gratitude-goblin';
import doublingDay from './doubling-day';
import closetPortal from './closet-portal';
import littleLight from './little-light';
import familyRhythmTree from './family-rhythm-tree';
import everythingTreasure from './everything-treasure';

export const books = [
  rainbowBerries,
  starlightFlowers,
  laundryDisaster,
  backwardsDay,
  gratitudeGoblin,
  doublingDay,
  closetPortal,
  littleLight,
  familyRhythmTree,
  everythingTreasure,
];

books.forEach(validateBook);
