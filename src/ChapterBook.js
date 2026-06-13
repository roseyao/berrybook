import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { tokenize, countWords, charToWordMap, highestLE, splitIntoChunks, spokenTextFromBlocks } from './readaloud';

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
  // Leave vertical room for the controls bar + the floating Library button.
  const maxH = vh - 96;
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
  const flipRef = useRef(null);
  const measureRef = useRef(null);

  const innerW = dims.w - TYPE.padX * 2;
  const innerH = dims.h - TYPE.padY * 2;

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

  // (Re)paginate whenever the book or the page size changes.
  useLayoutEffect(() => {
    if (!measureRef.current) return;
    setPages(buildPages(book, innerW, innerH, measureRef.current));
    setPageIdx(0);
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

  // --- Read-aloud (per-section audio + per-word highlight + auto page-turn) ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWord, setActiveWord] = useState(null);      // global word idx within the playing section
  const [playingSectionId, setPlayingSectionId] = useState(null);
  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const userStopped = useRef(false);
  const audioCache = useRef(new Map());                    // live-TTS chunk cache: text -> Promise<{url,alignment}>
  const sectionPagesRef = useRef([]);                      // [{pageIndex, wordBase, wordCount}] for the playing section

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

  const stopPlayback = useCallback(() => {
    const a = audioRef.current;
    if (a) { a.pause(); a.oncanplaythrough = null; a.onended = null; a.onerror = null; a.src = ''; }
    stopWordTracking();
    setActiveWord(null);
    setIsPlaying(false);
    setIsLoading(false);
    setPlayingSectionId(null);
  }, []);

  // Drive activeWord from audio.currentTime via rAF. `wordOffset` is the global
  // index of the alignment's first word within the section.
  const startWordTracking = (alignment, wordOffset) => {
    stopWordTracking();
    if (!alignment) { return; }
    const c2w = charToWordMap(alignment.chars);
    const starts = alignment.starts;
    const tick = () => {
      const a = audioRef.current;
      if (!a || a.paused) { rafRef.current = null; return; }
      const charIdx = highestLE(starts, a.currentTime);
      const wInRange = charIdx >= 0 ? c2w[charIdx] : -1;
      const next = wInRange >= 0 ? wordOffset + wInRange : null;
      setActiveWord((prev) => (prev === next ? prev : next));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const readSection = useCallback(async (section) => {
    if (!section || !(section.text || '').trim()) return;
    // Toggle off if this section is already playing/loading.
    if ((isPlaying || isLoading) && playingSectionId === section.id) {
      userStopped.current = true;
      stopPlayback();
      return;
    }
    stopPlayback();
    userStopped.current = false;

    // Text pages of this section + their global word ranges, in reading order.
    const secPages = (pages || [])
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => p.kind === 'text' && p.sectionId === section.id)
      .map(({ p, i }) => ({ pageIndex: i, wordBase: p.wordBase, wordCount: p.wordCount }));
    sectionPagesRef.current = secPages;
    if (!secPages.length) return;

    setPlayingSectionId(section.id);
    setIsLoading(true);
    // Jump to the section's first text page so the read starts where the eye is.
    flipRef.current?.pageFlip()?.flip(secPages[0].pageIndex);

    const blocks = parseBlocks(section);
    const spoken = spokenTextFromBlocks(blocks);
    const audio = audioRef.current;

    // FAST PATH: pre-recorded section file (instant, free). One mp3 + alignment
    // for the whole section; word offset 0.
    try {
      const mp3 = `/audio/${VOICE}/${book.id}/${section.id}.mp3`;
      const json = `/audio/${VOICE}/${book.id}/${section.id}.json`;
      const [head, alignResp] = await Promise.all([fetch(mp3, { method: 'HEAD' }), fetch(json)]);
      if (head.ok && alignResp.ok && !userStopped.current) {
        const alignment = await alignResp.json();
        audio.src = mp3;
        audio.oncanplaythrough = async () => {
          try { await audio.play(); setIsLoading(false); setIsPlaying(true); startWordTracking(alignment, 0); }
          catch { stopPlayback(); }
        };
        audio.onended = () => stopPlayback();
        audio.onerror = () => { if (!userStopped.current) stopPlayback(); };
        return;
      }
    } catch { /* fall through to live */ }
    if (userStopped.current) { stopPlayback(); return; }

    // SLOW PATH: live TTS via Netlify function, chunked so the first words start
    // before the rest is fetched. Each chunk's global word offset is tracked.
    const chunks = splitIntoChunks(spoken);
    if (!chunks.length) { stopPlayback(); return; }
    const chunkWordStarts = [];
    let acc = 0;
    for (const c of chunks) { chunkWordStarts.push(acc); acc += countWords(c); }

    const playFrom = async (i) => {
      let entry;
      try { entry = await fetchAudioChunk(chunks[i]); }
      catch { if (!userStopped.current) stopPlayback(); return; }
      if (userStopped.current) return;
      if (chunks[i + 1]) fetchAudioChunk(chunks[i + 1]).catch(() => {});
      audio.src = entry.url;
      audio.oncanplaythrough = async () => {
        try { await audio.play(); setIsLoading(false); setIsPlaying(true); startWordTracking(entry.alignment, chunkWordStarts[i]); }
        catch { stopPlayback(); }
      };
      audio.onended = () => { stopWordTracking(); if (i + 1 < chunks.length) playFrom(i + 1); else stopPlayback(); };
      audio.onerror = () => { if (!userStopped.current) stopPlayback(); };
    };
    playFrom(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, isPlaying, isLoading, playingSectionId, stopPlayback, book.id]);

  // Auto-turn the page to follow the highlighted word while reading.
  useEffect(() => {
    if (activeWord == null) return;
    const target = sectionPagesRef.current.find((sp) => activeWord >= sp.wordBase && activeWord < sp.wordBase + sp.wordCount);
    if (!target) return;
    const visible = dims.single ? [pageIdx] : [pageIdx, pageIdx + 1];
    if (!visible.includes(target.pageIndex)) {
      flipRef.current?.pageFlip()?.flip(target.pageIndex);
    }
  }, [activeWord, pageIdx, dims.single]);

  // Stop audio + free cached blob URLs on unmount.
  useEffect(() => {
    const cache = audioCache.current;
    return () => {
      stopPlayback();
      cache.forEach((p) => Promise.resolve(p).then((v) => { if (v?.url?.startsWith('blob:')) URL.revokeObjectURL(v.url); }).catch(() => {}));
      cache.clear();
    };
  }, [stopPlayback]);

  // The section the reader is currently looking at (for the Read button).
  const currentSection = pages && pages[pageIdx] ? pages[pageIdx].section : null;

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
      case 'opener':
        return (
          <Page key={key} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative', background: '#efe6d4' }}>
              <img src={page.section.fullImage} alt={page.section.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.opacity = 0.15; }} />
            </div>
            <div style={{ padding: '16px 24px 26px', textAlign: 'center', fontFamily: TYPE.fontFamily, background: PAPER }}>
              <div style={{ letterSpacing: 2, textTransform: 'uppercase', fontSize: 12, color: '#a07c4a' }}>{page.section.label}</div>
              <div style={{ fontSize: Math.max(18, dims.w * 0.052), fontWeight: 700, color: '#3a2f25', marginTop: 4 }}>{page.section.title}</div>
            </div>
            <PageNumber n={page.folio} />
          </Page>
        );
      case 'text': {
        // Highlight words by their global index within the section, but only
        // while THIS section's audio is playing.
        const highlight = playingSectionId === page.sectionId ? activeWord : null;
        let cursor = page.wordBase;
        return (
          <Page key={key} style={textPageStyle}>
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#3a3357,#241f38)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
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

      <button onClick={onExit}
        style={{ position: 'fixed', top: 14, left: 16, zIndex: 50, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: 999, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#3a2f25', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.25)' }}>
        ← Library
      </button>

      {pages && (
        <HTMLFlipBook
          key={`${dims.w}x${dims.h}x${dims.single}`}
          ref={flipRef}
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
          onFlip={(e) => setPageIdx(e.data)}
          className="cb-flipbook"
          style={{}}
        >
          {pages.map((p, i) => renderPage(p, i))}
        </HTMLFlipBook>
      )}

      {/* Controls: prev · read-aloud · page · next */}
      {pages && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14 }}>
          <button onClick={goPrev} disabled={pageIdx <= 0} style={ctrlBtn(pageIdx <= 0)}>‹</button>
          {(() => {
            const canRead = !!(currentSection && (currentSection.text || '').trim());
            const playingHere = isPlaying || isLoading;
            return (
              <button
                onClick={() => canRead && readSection(currentSection)}
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
