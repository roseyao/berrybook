import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { tokenize, countWords, charToWordMap, highestLE, wordStartTime, spokenTextFromBlocks } from './readaloud';

const VOICE = 'Ivanna';  // matches scripts/record-audio.mjs default

// --- Chapter-book reader -----------------------------------------------------
// Renders a `kind: 'chapter'` book as a real turn-the-page book: a hard cover,
// then for each section a full-page illustration (the chapter opener) followed
// by the prose paginated into leaves, with spot illustrations dropped in where
// the text has `[[SPOT n]]` markers. Two-page spread on desktop, single page on
// phones (react-pageflip's page-curl handles the flip).
//
// Pagination is measured against the EXACT pixel size the page renders at (we
// drive react-pageflip in size:'fixed' mode with dimensions we compute), so
// what we measure is what the reader sees — no clipped lines, no overflow.

// Book-page typography. Kept in px (not rem/Tailwind) so the off-screen
// measurer and the real page agree to the pixel.
const TYPE = {
  fontFamily: 'Georgia, "Iowan Old Style", "Palatino Linotype", serif',
  fontSize: 18,
  lineHeight: 1.68,
  paraGap: 14,        // margin-bottom between paragraphs (px)
  padX: 38,
  padY: 40,
};
// Antique display face for the book title (loaded in public/index.html).
const TITLE_FONT = '"Cinzel Decorative", Georgia, serif';

// The ward subject without its "The Ward of " prefix, lowercased — e.g.
// "The Ward of Always More" -> "always more".
const wardSubject = (title) => (title || '').replace(/^the ward of\s+/i, '').toLowerCase();
const SPOT_WIDTH_FRAC = 0.78;  // spot image width as a fraction of the text column
const SPOT_CAPTION_GAP = 18;   // vertical space a spot reserves below itself
// Vertical space the chrome steals from the text column, so pagination doesn't
// pack a line into it: a running chapter header (top of every text page) and
// the page-number footer (bottom of every text page).
const TOP_RESERVE = 40;
const FOOTER_RESERVE = 30;

// Compute the page size from the viewport, choosing the reading mode by
// ORIENTATION (not a fixed width breakpoint):
//   - Landscape & wide enough  → two-page spread + flip (iPad landscape, desktop)
//   - Portrait / narrow        → single page + flip, Kindle-style (iPad portrait, phones)
// Page aspect is a booky ~0.72 (w/h). The `single` flag drives
// react-pageflip's `usePortrait`.
function computeDims() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const ASPECT = 0.72;
  // Spread only when the viewport is landscape AND can fit two readable pages.
  const single = !(vw > vh && vw >= 900);
  // Leave vertical room for the in-flow header (Library + bookmarks) and the
  // footer controls bar so the whole book + chrome fit the *visible* viewport
  // with nothing clipped or hanging off the edge (we size to window.innerHeight,
  // and the container is 100dvh, so the two agree on real phones).
  const maxH = vh - 132;
  if (single) {
    let h = Math.min(maxH, 820);
    let w = Math.min(vw * 0.94, h * ASPECT);
    h = w / ASPECT;
    if (h > maxH) { h = maxH; w = h * ASPECT; }
    return { w: Math.round(w), h: Math.round(h), single: true };
  }
  let h = Math.min(maxH, 800);
  let w = h * ASPECT;
  // Two pages plus a little breathing room must fit the width.
  if (w * 2 > vw * 0.96) { w = (vw * 0.96) / 2; h = w / ASPECT; }
  return { w: Math.round(w), h: Math.round(h), single: false };
}

// Parse a section's `text` + `spots` into an ordered list of content blocks.
function parseBlocks(section) {
  const blocks = [];
  const parts = (section.text || '').split(/\n\s*\n/);
  for (const raw of parts) {
    const p = raw.trim();
    if (!p) continue;
    const m = p.match(/^\[\[SPOT (\d+)\]\]$/);
    if (m) {
      const n = Number(m[1]);
      if (section.spots && section.spots[n]) blocks.push({ type: 'spot', src: section.spots[n] });
    } else {
      blocks.push({ type: 'p', text: p });
    }
  }
  return blocks;
}

// HTML for the measurer — must mirror exactly how blocks render on a real page.
function blocksToHTML(blocks, innerW) {
  const spotW = Math.round(innerW * SPOT_WIDTH_FRAC);
  return blocks.map((b) => {
    if (b.type === 'spot') {
      // Square spot vignette; reserve its height + a caption-sized gap.
      return `<div style="margin:6px auto ${SPOT_CAPTION_GAP}px;width:${spotW}px;height:${spotW}px"></div>`;
    }
    const esc = b.text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `<p style="margin:0 0 ${TYPE.paraGap}px">${esc}</p>`;
  }).join('');
}

// Greedily pack a section's blocks into pages that fit (innerW × innerH),
// splitting an over-tall paragraph across pages word by word.
function paginateSection(section, innerW, innerH, measureEl) {
  const blocks = parseBlocks(section);
  measureEl.style.width = innerW + 'px';
  const pages = [];
  let cur = [];
  // Every text page renders a running header (top) and a page number (bottom),
  // so the text column is shorter than the raw page by both reserves.
  const cap = innerH - TOP_RESERVE - FOOTER_RESERVE;
  const fits = (bs) => {
    measureEl.innerHTML = blocksToHTML(bs, innerW);
    return measureEl.scrollHeight <= cap;
  };
  const flush = () => { if (cur.length) { pages.push(cur); cur = []; } };

  for (const block of blocks) {
    if (fits([...cur, block])) { cur.push(block); continue; }
    flush();
    if (fits([block])) { cur = [block]; continue; }
    // Single block too tall for a page. Spots can't split — give it its own
    // page anyway. Paragraphs split word by word.
    if (block.type === 'spot') { pages.push([block]); continue; }
    let acc = [];
    for (const word of block.text.split(' ')) {
      const trial = acc.length ? acc.concat(word) : [word];
      if (fits([{ type: 'p', text: trial.join(' ') }])) { acc = trial; }
      else {
        if (acc.length) pages.push([{ type: 'p', text: acc.join(' ') }]);
        acc = [word];
      }
    }
    if (acc.length) cur = [{ type: 'p', text: acc.join(' ') }];
  }
  flush();
  return pages.length ? pages : [[]];
}

// Build the full ordered page list for the whole book. Each text page also
// records its `wordBase` — the global index (within its section's spoken text)
// of its first word — so read-aloud can highlight words by absolute index and
// know which page a given word lives on.
function buildPages(book, innerW, innerH, measureEl) {
  const pages = [{ kind: 'cover', book }];
  for (const section of book.sections) {
    pages.push({ kind: 'opener', section });
    if ((section.text || '').trim()) {
      const leaves = paginateSection(section, innerW, innerH, measureEl);
      let wordBase = 0;
      leaves.forEach((blocks, i) => {
        const wordCount = blocks.reduce((n, b) => n + (b.type === 'p' ? countWords(b.text) : 0), 0);
        pages.push({ kind: 'text', section, sectionId: section.id, blocks, leaf: i, leaves: leaves.length, wordBase, wordCount });
        wordBase += wordCount;
      });
    } else {
      pages.push({ kind: 'soon', section });
    }
  }
  pages.push({ kind: 'end', book });
  // Folio numbers: number the readable pages (chapter openers + text + soon)
  // sequentially from 1, like a real book. The cover/end/blank get none.
  let folio = 0;
  for (const p of pages) {
    if (p.kind === 'opener' || p.kind === 'text' || p.kind === 'soon') p.folio = ++folio;
  }
  const totalFolios = folio;
  pages.forEach((p) => { if (p.folio) p.totalFolios = totalFolios; });
  // react-pageflip pairs pages into spreads after the cover; pad to keep the
  // back cover on its own right-hand leaf.
  if (pages.length % 2 !== 0) pages.push({ kind: 'blank' });
  return pages;
}

// A stable reading anchor for a page — { sectionId, word } (word null = a
// chapter opener / placeholder). Used to restore the reader's place across a
// repagination (resize / orientation change) instead of snapping to the cover.
function pageAnchor(p) {
  if (!p) return null;
  if (p.kind === 'text') return { sectionId: p.sectionId, word: p.wordBase };
  if (p.kind === 'opener' || p.kind === 'soon') return { sectionId: p.section.id, word: null };
  return null;
}
// Does anchor `a` (from pageAnchor) currently land on page `p`? Robust to
// repagination: a text anchor matches whichever page now holds its word.
function anchorOnPage(a, p) {
  if (!a || !p) return false;
  if (p.kind === 'opener' || p.kind === 'soon') return a.word == null && a.sectionId === p.section.id;
  if (p.kind === 'text') return a.word != null && a.sectionId === p.sectionId && a.word >= p.wordBase && a.word < p.wordBase + p.wordCount;
  return false;
}

// --- Page renderers (forwardRef — react-pageflip needs real DOM children) ---

const PAPER = '#fdf8ef';

// Running chapter header at the top of every text/soon page — small-caps
// "CHAPTER 1 · THE WARD OF ALWAYS MORE" with a hairline rule, like a real book.
function RunningHead({ section }) {
  return (
    <div style={{
      textAlign: 'center', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #ece0c8',
      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: TYPE.fontFamily,
    }}>
      <span style={{ letterSpacing: 1.5, textTransform: 'uppercase', fontSize: 10.5, color: '#b08a52' }}>
        {section.label}{' · '}{section.title}
      </span>
    </div>
  );
}

// Page (folio) number, centered at the bottom of every numbered page.
function PageNumber({ n }) {
  if (!n) return null;
  return (
    <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', fontFamily: TYPE.fontFamily, fontSize: 12, color: '#b3a489' }}>
      {n}
    </div>
  );
}

// react-pageflip owns the inline style of each page's ROOT element (it sets
// width/height/transform/etc. and wipes anything else). So the root stays bare
// and all our visual styling lives on an inner wrapper that fills it.
const Page = React.forwardRef(({ children, style, hard }, ref) => (
  <div ref={ref} className="cb-page" data-density={hard ? 'hard' : 'soft'}>
    <div
      className="cb-page-inner"
      style={{ width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box', background: PAPER, overflow: 'hidden', ...style }}
    >
      {children}
    </div>
  </div>
));

// A little ribbon tucked into a page's top-right corner to mark it bookmarked.
function BookmarkRibbon() {
  return (
    <div aria-hidden style={{
      position: 'absolute', top: 0, right: 22, width: 20, height: 30, zIndex: 5,
      background: 'linear-gradient(180deg,#d4567a,#b22f57)',
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
    }} />
  );
}

function SpotImg({ src, innerW }) {
  const w = Math.round(innerW * SPOT_WIDTH_FRAC);
  return (
    <span style={{ display: 'block', margin: `6px auto ${SPOT_CAPTION_GAP}px`, width: w, height: w }}>
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10, boxShadow: '0 2px 10px rgba(60,40,10,0.15)' }}
        onError={(e) => { e.target.style.visibility = 'hidden'; }}
      />
    </span>
  );
}

// --- Main component ----------------------------------------------------------

export default function ChapterBook({ book, onExit }) {
  const [dims, setDims] = useState(computeDims);
  const [pages, setPages] = useState(null);
  const [pageIdx, setPageIdx] = useState(0);
  const [startPageIdx, setStartPageIdx] = useState(0);   // initial page for the (re)mounted flipbook
  const flipRef = useRef(null);
  const measureRef = useRef(null);
  // Mirrors used inside the audio rAF / flip handlers, which must read the
  // freshest value without re-binding their closures.
  const pagesRef = useRef(null);
  const pageIdxRef = useRef(0);
  const singleRef = useRef(dims.single);
  const programmaticFlipRef = useRef(false);   // a read-along page-follow turn (don't stop the audio)
  const flipAnimatingRef = useRef(false);      // a follow turn is mid-animation (don't queue another)
  const flippingRef = useRef(false);           // ANY flip is animating — pause word-highlight re-renders
  const anchorRef = useRef(null);              // current reading position, for repagination restore
  const prevBookRef = useRef(book.id);

  const innerW = dims.w - TYPE.padX * 2;
  const innerH = dims.h - TYPE.padY * 2;

  useEffect(() => { pagesRef.current = pages; }, [pages]);
  useEffect(() => { singleRef.current = dims.single; }, [dims.single]);

  // Re-compute page size on resize (debounced via rAF).
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setDims(computeDims()));
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // (Re)paginate whenever the book or the page size changes. A resize /
  // orientation change rebuilds the page list AND remounts the flipbook (its
  // key depends on the dims), so we must restore the reader's place: capture an
  // anchor before, find the page that now holds it, and start the flipbook
  // there. Without this the book snaps back to the cover on every flip between
  // portrait and landscape.
  useLayoutEffect(() => {
    if (!measureRef.current) return;
    const built = buildPages(book, innerW, innerH, measureRef.current);
    const bookChanged = prevBookRef.current !== book.id;
    prevBookRef.current = book.id;
    let idx = 0;
    if (bookChanged) {
      anchorRef.current = null;            // a new book always opens on its cover
    } else if (anchorRef.current) {
      const found = built.findIndex((p) => anchorOnPage(anchorRef.current, p));
      if (found >= 0) idx = found;
    }
    setPages(built);
    setPageIdx(idx);
    pageIdxRef.current = idx;
    setStartPageIdx(idx);
  }, [book, innerW, innerH]);

  const goNext = useCallback(() => flipRef.current?.pageFlip()?.flipNext(), []);
  const goPrev = useCallback(() => flipRef.current?.pageFlip()?.flipPrev(), []);

  // Arrow-key navigation.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, onExit]);

  // Lock the page while the reader is open: no body scroll, no rubber-band
  // overscroll, no pull-to-refresh — a stable, app-like surface. Restored on
  // exit so the library scrolls normally.
  useEffect(() => {
    const body = document.body, html = document.documentElement;
    const prev = { bodyOverflow: body.style.overflow, bodyOverscroll: body.style.overscrollBehavior, htmlOverscroll: html.style.overscrollBehavior };
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    html.style.overscrollBehavior = 'none';
    return () => {
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      html.style.overscrollBehavior = prev.htmlOverscroll;
    };
  }, []);

  // --- Read-aloud: continuous within a chapter, stop-on-manual-turn -----------
  // Pressing Read plays the chapter's recording straight through (audiobook
  // style) and the page auto-FOLLOWS the audio — we turn the page when the
  // spoken word crosses onto the next leaf, WITHOUT pausing or reloading the
  // audio, so there's no gap or pop at a page turn. A *manual* page turn stops
  // it (the audio belonged to the page you left), and where each page stopped is
  // remembered so pressing Read again resumes instead of restarting. (The live
  // TTS fallback, used only when no recording exists, stays page-scoped.)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWord, setActiveWord] = useState(null);      // global word idx within the playing section
  const [playingSectionId, setPlayingSectionId] = useState(null);
  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const userStopped = useRef(false);
  const audioCache = useRef(new Map());                    // live-TTS cache: text -> Promise<{url,alignment}>
  const playingUnitRef = useRef(null);                     // the read unit currently playing
  const resumeRef = useRef(new Map());                     // primaryIndex -> last highlighted global word
  const activeWordRef = useRef(null);                      // mirror of activeWord for event-handler reads
  const activeRef = useRef(false);                         // mirror of (isPlaying || isLoading)
  // When read-along finishes a page it turns the page itself; this holds the
  // just-finished section id so the resulting onFlip knows the turn was ours
  // (continue reading) rather than the reader's (stop). `null` = no auto-turn.
  const autoAdvanceRef = useRef(null);

  useEffect(() => { activeWordRef.current = activeWord; }, [activeWord]);
  useEffect(() => { activeRef.current = isPlaying || isLoading; }, [isPlaying, isLoading]);

  const fetchAudioChunk = (text) => {
    const cache = audioCache.current;
    if (cache.has(text)) return cache.get(text);
    const p = (async () => {
      const r = await fetch('/.netlify/functions/generate-audio', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }),
      });
      if (!r.ok) throw new Error(await r.text() || `TTS ${r.status}`);
      const data = await r.json();
      const bytes = atob(data.audio);
      const buf = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) buf[i] = bytes.charCodeAt(i);
      const blob = new Blob([buf], { type: data.mimeType || 'audio/mpeg' });
      return { url: URL.createObjectURL(blob), alignment: data.alignment || null };
    })();
    p.catch(() => cache.delete(text));
    cache.set(text, p);
    return p;
  };

  const stopWordTracking = () => { if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } };

  // The read unit = the text page(s) the reader is currently looking at (one on
  // phones, the two-page spread on desktop), with their combined global word
  // range. `null` when no text page is visible (cover/opener/end).
  const computeReadUnit = useCallback((atIdx = pageIdx) => {
    if (!pages) return null;
    const visible = dims.single ? [atIdx] : [atIdx, atIdx + 1];
    const tps = visible.map((i) => ({ i, p: pages[i] })).filter(({ p }) => p && p.kind === 'text');
    if (!tps.length) return null;
    return {
      primaryIndex: tps[0].i,
      sectionId: tps[0].p.sectionId,
      fromWord: Math.min(...tps.map(({ p }) => p.wordBase)),
      toWord: Math.max(...tps.map(({ p }) => p.wordBase + p.wordCount)),
      blocks: tps.flatMap(({ p }) => p.blocks),
    };
  }, [pages, pageIdx, dims.single]);

  const stopPlayback = useCallback(() => {
    const a = audioRef.current;
    if (a) { a.pause(); a.oncanplaythrough = null; a.onended = null; a.onerror = null; a.src = ''; }
    stopWordTracking();
    setActiveWord(null);
    activeWordRef.current = null;
    setIsPlaying(false);
    setIsLoading(false);
    setPlayingSectionId(null);
    playingUnitRef.current = null;
    autoAdvanceRef.current = null;
    programmaticFlipRef.current = false;
    flipAnimatingRef.current = false;
  }, []);

  // Finished reading a page's range. Drop its resume point (so re-reading it
  // starts at the top), then auto-turn to the next page and keep reading — the
  // resulting onFlip continues the read while it stays in this chapter, and
  // stops at the chapter break. A manual turn instead is caught by handleFlip.
  const finishPage = useCallback((primaryIndex) => {
    resumeRef.current.delete(primaryIndex);
    const finishedSection = playingUnitRef.current?.sectionId ?? null;
    stopPlayback();
    autoAdvanceRef.current = finishedSection;
    flipRef.current?.pageFlip()?.flipNext();
  }, [stopPlayback]);

  // Stopped mid-page (Stop button or a manual page turn) — remember the last
  // highlighted word so the next Read resumes from there.
  const rememberAndStop = useCallback(() => {
    const u = playingUnitRef.current;
    if (u && activeWordRef.current != null) resumeRef.current.set(u.primaryIndex, activeWordRef.current);
    userStopped.current = true;
    stopPlayback();
  }, [stopPlayback]);

  // When the spoken word `globalWord` (a section-global word index) has moved
  // past the leaf on screen, turn the page to follow it — programmatically, so
  // the audio keeps playing uninterrupted. Guarded so only one follow-turn is in
  // flight at a time (a flip takes ~700ms; a page of prose takes far longer).
  const maybeFollow = (globalWord) => {
    if (flipAnimatingRef.current) return;
    const ps = pagesRef.current;
    const sectionId = playingUnitRef.current?.sectionId;
    if (!ps || !sectionId) return;
    const tgt = ps.findIndex((p) => p.kind === 'text' && p.sectionId === sectionId
      && globalWord >= p.wordBase && globalWord < p.wordBase + p.wordCount);
    if (tgt < 0) return;
    const lastVisible = pageIdxRef.current + (singleRef.current ? 0 : 1);
    if (tgt > lastVisible) {
      programmaticFlipRef.current = true;
      flipAnimatingRef.current = true;
      flipRef.current?.pageFlip()?.flipNext();
    }
  };

  // Drive activeWord from audio.currentTime via rAF. `wordOffset` is the global
  // word index of the alignment's first word. `endTime` (seconds, or null) stops
  // playback when the range ends. `follow` true ⇒ continuous chapter playback:
  // don't stop at a page edge, turn the page to follow the audio instead.
  const startWordTracking = (alignment, wordOffset, endTime, primaryIndex, follow) => {
    stopWordTracking();
    if (!alignment) return;
    const c2w = charToWordMap(alignment.chars);
    const starts = alignment.starts;
    const tick = () => {
      const a = audioRef.current;
      if (!a || a.paused) { rafRef.current = null; return; }
      // Keep the audio rolling but DON'T touch React state while a page is
      // mid-flip: a re-render here makes react-pageflip rebuild the turning page
      // and the curl animation stutters. Resume highlighting once it settles.
      if (flippingRef.current) { rafRef.current = requestAnimationFrame(tick); return; }
      if (endTime != null && isFinite(endTime) && a.currentTime >= endTime) { finishPage(primaryIndex); return; }
      const charIdx = highestLE(starts, a.currentTime);
      const wInRange = charIdx >= 0 ? c2w[charIdx] : -1;
      const next = wInRange >= 0 ? wordOffset + wInRange : null;
      setActiveWord((prev) => (prev === next ? prev : next));
      if (follow && next != null) maybeFollow(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const beginPlayback = (src, alignment, wordOffset, startTime, endTime, primaryIndex, follow) => {
    const audio = audioRef.current;
    audio.src = src;
    audio.oncanplaythrough = async () => {
      audio.oncanplaythrough = null;   // act once
      try {
        if (isFinite(startTime) && startTime > 0) { try { audio.currentTime = startTime; } catch { /* seek unsupported */ } }
        await audio.play();
        setIsLoading(false); setIsPlaying(true);
        startWordTracking(alignment, wordOffset, endTime, primaryIndex, follow);
      } catch { stopPlayback(); }
    };
    // Continuous chapter playback ends at the chapter's natural end → just stop.
    // Page-scoped (live TTS) playback advances to the next page on end.
    audio.onended = () => { if (follow) stopPlayback(); else finishPage(primaryIndex); };
    audio.onerror = () => { if (!userStopped.current) stopPlayback(); };
  };

  // Start reading a specific read unit from its resume point (or its start).
  const playUnit = useCallback(async (unit) => {
    if (!unit) { stopPlayback(); return; }
    stopPlayback();
    userStopped.current = false;

    // Resume where this page last stopped, if within its range; else its start.
    const saved = resumeRef.current.get(unit.primaryIndex);
    const fromWord = (saved != null && saved >= unit.fromWord && saved < unit.toWord) ? saved : unit.fromWord;
    playingUnitRef.current = { ...unit, fromWord };
    setPlayingSectionId(unit.sectionId);
    setIsLoading(true);

    // FAST PATH: pre-recorded SECTION recording — seek to this page's first word
    // and play the chapter STRAIGHT THROUGH to its natural end. The page follows
    // the audio (see startWordTracking's `follow`), so there's no reload or gap
    // at a page turn; reading stops on its own at the chapter break.
    try {
      const mp3 = `/audio/${VOICE}/${book.id}/${unit.sectionId}.mp3`;
      const json = `/audio/${VOICE}/${book.id}/${unit.sectionId}.json`;
      const [head, alignResp] = await Promise.all([fetch(mp3, { method: 'HEAD' }), fetch(json)]);
      if (head.ok && alignResp.ok && !userStopped.current) {
        const alignment = await alignResp.json();
        const startTime = wordStartTime(alignment, fromWord);
        beginPlayback(mp3, alignment, 0, startTime, null, unit.primaryIndex, true);
        return;
      }
    } catch { /* fall through to live */ }
    if (userStopped.current) { stopPlayback(); return; }

    // SLOW PATH: synthesize ONLY this page's prose (one request — a page is
    // small). The alignment's word 0 is the page's first word (unit.fromWord),
    // so the recording is exactly the page and ends on its own.
    const spoken = spokenTextFromBlocks(unit.blocks);
    if (!spoken.trim()) { stopPlayback(); return; }
    let entry;
    try { entry = await fetchAudioChunk(spoken); }
    catch { if (!userStopped.current) stopPlayback(); return; }
    if (userStopped.current) { stopPlayback(); return; }
    const startTime = wordStartTime(entry.alignment, fromWord - unit.fromWord);
    beginPlayback(entry.url, entry.alignment, unit.fromWord, startTime, null, unit.primaryIndex, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopPlayback, book.id]);

  // The Read button: toggle the page on screen.
  const readCurrentPage = useCallback(() => {
    const unit = computeReadUnit();
    if (!unit) return;
    // Pressing the button while this page plays pauses it (resume saved).
    if ((isPlaying || isLoading) && playingUnitRef.current?.primaryIndex === unit.primaryIndex) {
      rememberAndStop();
      return;
    }
    playUnit(unit);
  }, [computeReadUnit, isPlaying, isLoading, rememberAndStop, playUnit]);

  // A page turn. Three kinds:
  //  1. A read-along page-FOLLOW turn (programmaticFlipRef) — the audio is still
  //     playing through this chapter; just adopt the new page and keep going.
  //  2. A live-TTS auto-advance (autoAdvanceRef) — start the next page's audio,
  //     or stop at the chapter break.
  //  3. A turn the reader made — if read-along is going, stop it.
  // Always record an anchor for the new page so a later repagination can restore
  // the reader's place instead of snapping to the cover.
  const handleFlipRef = useRef();
  handleFlipRef.current = (e) => {
    setPageIdx(e.data);
    pageIdxRef.current = e.data;
    setShowBookmarks(false);
    const a = pageAnchor(pagesRef.current?.[e.data]);
    if (a) anchorRef.current = a;

    if (programmaticFlipRef.current) {
      programmaticFlipRef.current = false;
      flipAnimatingRef.current = false;
      if (playingUnitRef.current) playingUnitRef.current.primaryIndex = e.data;  // resume key follows the page
      return;
    }
    const fromSection = autoAdvanceRef.current;
    if (fromSection != null) {
      autoAdvanceRef.current = null;
      const unit = computeReadUnit(e.data);
      if (unit && unit.sectionId === fromSection) playUnit(unit);
      else stopPlayback();
      return;
    }
    if (activeRef.current) rememberAndStop();
  };

  // Repagination (resize / orientation / book change) invalidates page indices
  // and any in-progress read — stop and drop saved resume points.
  useEffect(() => {
    resumeRef.current.clear();
    stopPlayback();
  }, [innerW, innerH, book, stopPlayback]);

  // Stop audio + free cached blob URLs on unmount.
  useEffect(() => {
    const cache = audioCache.current;
    return () => {
      stopPlayback();
      cache.forEach((p) => Promise.resolve(p).then((v) => { if (v?.url?.startsWith('blob:')) URL.revokeObjectURL(v.url); }).catch(() => {}));
      cache.clear();
    };
  }, [stopPlayback]);

  // The read unit the reader is currently looking at (for the Read button).
  const readUnit = computeReadUnit();

  // --- Bookmarks --------------------------------------------------------------
  // A bookmark is a stable anchor into the story — { sectionId, word } — not a
  // raw page index, so it survives repagination (resize / orientation / font).
  // `word` is the global word index within the section where the bookmarked page
  // begins; `null` marks a chapter opener. To turn to a bookmark we find the
  // page whose word range contains it.
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Load on book change; persist on change. Per book, in localStorage.
  useEffect(() => {
    setShowBookmarks(false);
    try {
      const raw = localStorage.getItem(`berrybook:bookmarks:${book.id}`);
      setBookmarks(raw ? JSON.parse(raw) : []);
    } catch { setBookmarks([]); }
  }, [book.id]);
  useEffect(() => {
    try { localStorage.setItem(`berrybook:bookmarks:${book.id}`, JSON.stringify(bookmarks)); } catch { /* storage full/blocked */ }
  }, [bookmarks, book.id]);

  // Does bookmark `bm` live on page `p`? (Robust to re-pagination: a text
  // bookmark matches the page whose word range now contains its word.)
  const bmOnPage = (bm, p) => {
    if (!p) return false;
    if (p.kind === 'opener') return bm.word == null && bm.sectionId === p.section.id;
    if (p.kind === 'text') return bm.word != null && bm.sectionId === p.sectionId && bm.word >= p.wordBase && bm.word < p.wordBase + p.wordCount;
    return false;
  };
  const pageBookmarked = (p) => bookmarks.some((bm) => bmOnPage(bm, p));

  // The bookmarkable page in view (a chapter opener or a text page).
  const visibleIdxs = dims.single ? [pageIdx] : [pageIdx, pageIdx + 1];
  const bmTargetIdx = pages ? visibleIdxs.find((i) => pages[i] && (pages[i].kind === 'text' || pages[i].kind === 'opener')) : undefined;
  const bmTargetPage = bmTargetIdx != null ? pages[bmTargetIdx] : null;

  const toggleBookmark = () => {
    const p = bmTargetPage;
    if (!p) return;
    setBookmarks((prev) => {
      if (prev.some((bm) => bmOnPage(bm, p))) return prev.filter((bm) => !bmOnPage(bm, p));
      const anchor = p.kind === 'opener'
        ? { sectionId: p.section.id, word: null }
        : { sectionId: p.sectionId, word: p.wordBase };
      return [...prev, anchor];
    });
  };

  // Resolve a bookmark to its current page index (or -1 if it no longer maps).
  const bookmarkPageIndex = (bm) => (pages || []).findIndex((p) => bmOnPage(bm, p));

  const goToBookmark = (bm) => {
    const idx = bookmarkPageIndex(bm);
    if (idx >= 0) flipRef.current?.pageFlip()?.flip(idx);
    setShowBookmarks(false);
  };

  // Bookmarks in reading order, resolved to their pages (dropping any that no
  // longer map), each with a label + snippet for the list.
  const resolvedBookmarks = (pages ? bookmarks.map((bm) => ({ bm, idx: bookmarkPageIndex(bm) })) : [])
    .filter((x) => x.idx >= 0)
    .sort((a, b) => a.idx - b.idx)
    .map(({ bm, idx }) => {
      const p = pages[idx];
      const firstP = p.kind === 'text' ? (p.blocks.find((b) => b.type === 'p')?.text || '') : '';
      const snippet = firstP ? (firstP.length > 56 ? firstP.slice(0, 56).trimEnd() + '…' : firstP) : 'Chapter start';
      return { bm, idx, label: p.section?.label || '', folio: p.folio, snippet };
    });

  const textPageStyle = {
    padding: `${TYPE.padY}px ${TYPE.padX}px`,
    fontFamily: TYPE.fontFamily,
    fontSize: TYPE.fontSize,
    lineHeight: TYPE.lineHeight,
    color: '#3a2f25',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const renderPage = (page, key) => {
    switch (page.kind) {
      case 'cover':
        return (
          <Page key={key} hard style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', background: '#2b2440' }}>
              <img src={page.book.coverImage} alt={page.book.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '7% 9%', textAlign: 'center' }}>
                <h1 style={{ fontFamily: TITLE_FONT, color: '#fdf3df', fontSize: Math.max(22, dims.w * 0.082), fontWeight: 900, textShadow: '0 2px 14px rgba(0,0,0,0.7)', lineHeight: 1.2, letterSpacing: 0.5 }}>
                  {page.book.title}
                </h1>
                <div style={{ fontFamily: TYPE.fontFamily, color: '#f3e9d8', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
                  <p style={{ fontStyle: 'italic', fontSize: Math.max(13, dims.w * 0.034), marginBottom: 10 }}>
                    An Ivy &amp; Oliver Adventure
                  </p>
                  <p style={{ fontSize: Math.max(11, dims.w * 0.027), lineHeight: 1.5 }}>
                    By Rose Yao and Claude
                  </p>
                  <p style={{ fontSize: Math.max(11, dims.w * 0.027), lineHeight: 1.5 }}>
                    Illustrations by Rose Yao and Gemini
                  </p>
                </div>
              </div>
            </div>
          </Page>
        );
      case 'opener': {
        const sec = page.section;
        return (
          <Page key={key} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {pageBookmarked(page) && <BookmarkRibbon />}
            {/* Classic chapter heading at the TOP, two lines, image below. */}
            <div style={{ padding: '22px 22px 18px', textAlign: 'center', fontFamily: TYPE.fontFamily, background: PAPER }}>
              <div style={{ fontFamily: TITLE_FONT, fontSize: Math.max(21, dims.w * 0.066), fontWeight: 700, color: '#6b4a28', lineHeight: 1.1, letterSpacing: 0.5 }}>
                {sec.label}
              </div>
              <div style={{ marginTop: 8, fontSize: Math.max(13, dims.w * 0.034), color: '#3a2f25', lineHeight: 1.3 }}>
                {sec.sin ? (
                  <>
                    <span style={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, color: '#8a5a2b' }}>{sec.sin}</span>
                    <span style={{ color: '#b08a52' }}>{'  —  '}</span>
                    <span style={{ fontStyle: 'italic' }}>The curse of {wardSubject(sec.title)}</span>
                  </>
                ) : (
                  <span style={{ fontStyle: 'italic' }}>{sec.title}</span>
                )}
              </div>
            </div>
            <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#efe6d4' }}>
              <img src={sec.fullImage} alt={sec.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.opacity = 0.15; }} />
            </div>
            {/* thin paper strip so the page number sits on cream, not the art */}
            <div style={{ height: 26, background: PAPER }} />
            <PageNumber n={page.folio} />
          </Page>
        );
      }
      case 'text': {
        // Highlight words by their global index within the section, but only
        // while THIS section's audio is playing.
        const highlight = playingSectionId === page.sectionId ? activeWord : null;
        let cursor = page.wordBase;
        return (
          <Page key={key} style={textPageStyle}>
            {pageBookmarked(page) && <BookmarkRibbon />}
            <RunningHead section={page.section} />
            {page.blocks.map((b, i) => {
              if (b.type === 'spot') return <SpotImg key={i} src={b.src} innerW={innerW} />;
              const toks = tokenize(b.text, cursor);
              cursor += countWords(b.text);
              return (
                <p key={i} style={{ margin: `0 0 ${TYPE.paraGap}px` }}>
                  {toks.map((t, j) => t.type === 'ws'
                    ? <span key={j}>{t.text}</span>
                    : <span key={j} style={{ borderRadius: 4, padding: '0 1px', background: t.idx === highlight ? '#ffe9a8' : 'transparent', transition: 'background-color 120ms' }}>{t.text}</span>)}
                </p>
              );
            })}
            <PageNumber n={page.folio} />
          </Page>
        );
      }
      case 'soon':
        return (
          <Page key={key} style={textPageStyle}>
            <RunningHead section={page.section} />
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 42 }}>✶</div>
                <p style={{ fontStyle: 'italic', color: '#7a6a55', marginTop: 12 }}>
                  {page.section.title} is still being written.
                </p>
                <p style={{ color: '#a07c4a', marginTop: 8, fontSize: 15 }}>Come back soon!</p>
              </div>
            </div>
            <PageNumber n={page.folio} />
          </Page>
        );
      case 'end':
        return (
          <Page key={key} hard style={{ ...textPageStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#2b2440', color: '#f3e9d8' }}>
            <div>
              <div style={{ fontSize: 40 }}>✦</div>
              <p style={{ fontFamily: TYPE.fontFamily, fontSize: 20, marginTop: 10 }}>The End — for now.</p>
            </div>
          </Page>
        );
      default:
        return <Page key={key} />;
    }
  };

  return (
    <div style={{
      height: '100dvh', maxHeight: '100dvh', width: '100%', boxSizing: 'border-box',
      background: 'linear-gradient(160deg,#3a3357,#241f38)',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
      overflow: 'hidden', touchAction: 'manipulation', WebkitUserSelect: 'none', userSelect: 'none',
    }}>
      {/* Off-screen measurer — same width/typography as a real text page. */}
      <div
        ref={measureRef}
        aria-hidden
        style={{
          position: 'fixed', left: -99999, top: 0, visibility: 'hidden',
          display: 'flow-root', boxSizing: 'content-box',
          fontFamily: TYPE.fontFamily, fontSize: TYPE.fontSize, lineHeight: TYPE.lineHeight,
        }}
      />

      {/* Header bar — in normal flow, so it never overlaps the book. */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, padding: '10px 14px 0', zIndex: 50 }}>
        <button onClick={onExit}
          style={{ background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: 999, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#3a2f25', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
          ← Library
        </button>

        {/* Bookmarks: drop a ribbon on the page in view, and jump to saved ones. */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
          {bmTargetPage && (() => {
            const on = pageBookmarked(bmTargetPage);
            return (
              <button onClick={toggleBookmark}
                title={on ? 'Remove bookmark from this page' : 'Bookmark this page'}
                style={{ background: on ? '#c2557a' : 'rgba(255,255,255,0.92)', color: on ? '#fff' : '#3a2f25', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
                {on ? '🔖 Saved' : '🔖 Bookmark'}
              </button>
            );
          })()}
          {resolvedBookmarks.length > 0 && (
            <button onClick={() => setShowBookmarks((s) => !s)}
              title="Go to a bookmark"
              style={{ background: 'rgba(255,255,255,0.92)', color: '#3a2f25', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
              Bookmarks ({resolvedBookmarks.length})
            </button>
          )}
        </div>
        {showBookmarks && resolvedBookmarks.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, zIndex: 60, width: 270, maxHeight: '60vh', overflowY: 'auto', background: '#fffdf8', borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.35)', padding: 6 }}>
            {resolvedBookmarks.map(({ bm, idx, label, folio, snippet }) => (
              <div key={`${bm.sectionId}:${bm.word}`}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8 }}>
                <button onClick={() => goToBookmark(bm)}
                  style={{ flex: 1, textAlign: 'left', background: idx === pageIdx ? '#f1e7d2' : 'transparent', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', fontFamily: TYPE.fontFamily }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#8a5a2b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {label}{folio ? ` · p.${folio}` : ''}
                  </div>
                  <div style={{ fontSize: 13, color: '#5a4a38', marginTop: 2, fontStyle: 'italic' }}>{snippet}</div>
                </button>
                <button onClick={() => setBookmarks((prev) => prev.filter((b) => !(b.sectionId === bm.sectionId && b.word === bm.word)))}
                  title="Remove bookmark"
                  style={{ background: 'transparent', border: 'none', color: '#b3a489', fontSize: 18, lineHeight: 1, cursor: 'pointer', padding: 4 }}>
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* The book — centered in the space left between header and footer. */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {pages && (
          <HTMLFlipBook
            key={`${dims.w}x${dims.h}x${dims.single}`}
            ref={flipRef}
            startPage={startPageIdx}
            width={dims.w}
            height={dims.h}
            size="fixed"
            minWidth={dims.w}
            maxWidth={dims.w}
            minHeight={dims.h}
            maxHeight={dims.h}
            usePortrait={dims.single}
            showCover={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.4}
            drawShadow={true}
            flippingTime={700}
            onFlip={(e) => handleFlipRef.current(e)}
            onChangeState={(e) => { flippingRef.current = e.data !== 'read'; }}
            className="cb-flipbook"
            style={{}}
          >
            {pages.map((p, i) => renderPage(p, i))}
          </HTMLFlipBook>
        )}
      </div>

      {/* Controls: prev · read-aloud · page · next */}
      {pages && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '12px 0 16px' }}>
          <button onClick={goPrev} disabled={pageIdx <= 0} style={ctrlBtn(pageIdx <= 0)}>‹</button>
          {(() => {
            const canRead = !!readUnit;
            const playingHere = isPlaying || isLoading;
            return (
              <button
                onClick={() => canRead && readCurrentPage()}
                disabled={!canRead}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, height: 46, padding: '0 20px', borderRadius: 999, border: 'none',
                  cursor: canRead ? 'pointer' : 'default', fontFamily: TYPE.fontFamily, fontSize: 15, fontWeight: 600,
                  color: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                  background: !canRead ? 'rgba(255,255,255,0.25)' : playingHere ? '#c2557a' : '#7b6cc4',
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{isLoading ? '…' : playingHere ? '◼' : '▶'}</span>
                {isLoading ? 'Loading' : playingHere ? 'Stop' : 'Read'}
              </button>
            );
          })()}
          <span style={{ color: '#e7ddc8', fontFamily: TYPE.fontFamily, fontSize: 13, minWidth: 78, textAlign: 'center' }}>
            {(() => {
              const cur = pages[pageIdx];
              if (cur?.folio) return `Page ${cur.folio} of ${cur.totalFolios}`;
              if (cur?.kind === 'cover') return 'Cover';
              return ' ';
            })()}
          </span>
          <button onClick={goNext} disabled={pageIdx >= pages.length - 1} style={ctrlBtn(pageIdx >= pages.length - 1)}>›</button>
        </div>
      )}

      <audio ref={audioRef} className="cb-audio" style={{ display: 'none' }} />
    </div>
  );
}

function ctrlBtn(disabled) {
  return {
    width: 46, height: 46, borderRadius: 999, border: 'none', cursor: disabled ? 'default' : 'pointer',
    background: disabled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.92)',
    color: '#3a2f25', fontSize: 24, lineHeight: '46px', boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
  };
}
