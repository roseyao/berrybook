import React, { useState, useEffect, useRef, useMemo } from 'react';
// --- Library: each book lives in src/books/<id>/index.js, validated on import.
import { books } from './books';
const library = { books };


// --- UI Components ---

const SoundIcon = ({ isLoading, isPlaying }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        {isLoading ? <path d="M21.5 2v6h-6M2.5 22v-6h6M2 12h2a8 8 0 0 1 16 0h2" className="animate-spin origin-center" /> : isPlaying ? <rect x="6" y="6" width="12" height="12"></rect> : <polygon points="5 3 19 12 5 21 5 3"></polygon>}
    </svg>
);

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <div className="p-3 my-4 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"><strong>Error:</strong> {message}</div>;
};

// --- New Component for the Bookshelf ---
const BookSelection = ({ books, onSelectBook }) => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Choose a Story</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map(book => (
                    <div key={book.id} className="cursor-pointer group" onClick={() => onSelectBook(book.id)}>
                        <div className="rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                            <img src={book.coverImage} alt={book.title} className="w-full h-auto object-cover" />
                        </div>
                        <h2 className="mt-4 text-center text-lg font-semibold text-slate-700 group-hover:text-purple-600">{book.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Word-highlighting helpers (used by phase 3 read-aloud) ---

// Tokenize displayed text into render tokens. Words get a globally-numbered
// `idx` so the playing chunk's alignment can highlight them by index.
// Whitespace is emitted verbatim so layout stays identical.
const tokenizeForDisplay = (text) => {
    const tokens = [];
    let idx = 0;
    for (const part of (text || '').split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) tokens.push({ type: 'ws', text: part });
        else tokens.push({ type: 'word', text: part, idx: idx++ });
    }
    return tokens;
};

// Given an ElevenLabs alignment's `chars` array, build an index from each
// character position to its word position within the chunk. Whitespace
// characters map to -1.
const charToWordMap = (chars) => {
    const out = new Array(chars.length);
    let w = -1;
    let inWord = false;
    for (let i = 0; i < chars.length; i++) {
        if (/\s/.test(chars[i])) { inWord = false; out[i] = -1; }
        else { if (!inWord) { w++; inWord = true; } out[i] = w; }
    }
    return out;
};

const countWords = (s) => ((s || '').match(/\S+/g) || []).length;

// Binary search: highest index in `arr` whose value is <= `t` (or -1).
const highestLE = (arr, t) => {
    let lo = 0, hi = arr.length - 1, best = -1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] <= t) { best = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    return best;
};

// Split scene text into small speakable chunks (roughly sentence-sized, keeping
// trailing quotes/brackets attached). Reading is generated and played chunk by
// chunk so the first words start fast instead of waiting on the whole scene.
const splitIntoChunks = (text) => {
    const sentences = ((text || '').match(/\S[^.!?]*[.!?]+["'”’)\]]*|\S[^.!?]*$/g) || [])
        .map((s) => s.trim())
        .filter(Boolean);
    if (sentences.length <= 1) return [(text || '').trim()].filter(Boolean);

    const chunks = [];
    for (const s of sentences) {
        const last = chunks[chunks.length - 1];
        // Keep the first chunk short so the very first audio returns quickly;
        // pack the rest to avoid firing lots of tiny TTS requests.
        const cap = chunks.length <= 1 ? 90 : 220;
        if (!last || (last + ' ' + s).length > cap) chunks.push(s);
        else chunks[chunks.length - 1] = last + ' ' + s;
    }
    return chunks;
};

// --- URL state helpers (book / scene as query params, shareable) ---
const readURL = () => {
    const params = new URLSearchParams(window.location.search);
    return { book: params.get('book') || null, scene: params.get('scene') || null };
};

const writeURL = ({ book, scene }) => {
    const params = new URLSearchParams();
    if (book) params.set('book', book);
    if (scene) params.set('scene', scene);
    const qs = params.toString();
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', next);
};

// --- New Component for Viewing a Single Story ---
const StoryViewer = ({ book, onExit }) => {
    const [currentScene, setCurrentScene] = useState(() => {
        const urlScene = readURL().scene;
        const candidate = urlScene || 'start';
        return book.scenes[candidate] ? candidate : 'start';
    });

    // Keep URL in sync with the current scene (so refresh/share lands here).
    useEffect(() => {
        writeURL({ book: book.id, scene: currentScene === 'start' ? null : currentScene });
    }, [book.id, currentScene]);

    // Respond to browser back/forward — re-read the scene from the URL.
    useEffect(() => {
        const onPop = () => {
            const { scene } = readURL();
            const next = scene && book.scenes[scene] ? scene : 'start';
            setCurrentScene(next);
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, [book]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // Highlighted-word index during read-aloud (null when nothing's playing).
    const [activeWord, setActiveWord] = useState(null);
    const audioRef = useRef(null);
    const userStoppedPlayback = useRef(false);
    // requestAnimationFrame handle for the word-tracking loop.
    const rafRef = useRef(null);
    // Ref attached to the currently-active word span so we can scroll it into view.
    const activeWordRef = useRef(null);
    // Cache of text -> Promise<{ url, alignment? }>. Each scene's audio is
    // fetched once (background prefetch + replays become instant); alignment
    // comes back from ElevenLabs and drives per-word highlighting.
    const audioCache = useRef(new Map());

    // Fetch (or reuse) TTS audio for some text. Resolves to
    // { url, alignment? } where alignment has { chars, starts, ends }.
    const fetchAudio = (text) => {
        const cache = audioCache.current;
        if (cache.has(text)) return cache.get(text);
        const p = (async () => {
            const response = await fetch('/.netlify/functions/generate-audio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error(await response.text() || `Request failed with status ${response.status}`);
            const data = await response.json();
            const bytes = atob(data.audio);
            const buf = new Uint8Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) buf[i] = bytes.charCodeAt(i);
            const blob = new Blob([buf], { type: data.mimeType || 'audio/mpeg' });
            return { url: URL.createObjectURL(blob), alignment: data.alignment || null };
        })();
        p.catch(() => cache.delete(text)); // on failure, allow a later retry
        cache.set(text, p);
        return p;
    };

    const scenes = book.scenes;
    const scene = scenes[currentScene];

    // Stop the per-frame loop that updates the active word.
    const stopWordTracking = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    };

    const stopPlayback = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.oncanplaythrough = null;
            audio.onended = null;
            audio.onerror = null;
            audio.src = '';
        }
        stopWordTracking();
        setActiveWord(null);
        setIsPlaying(false);
        setIsLoading(false);
    };

    // Prefetch so Read starts fast: every chunk of the current scene (gapless
    // playback) and just the first chunk of each choice target (fast next read).
    useEffect(() => {
        if (!scene) return;
        splitIntoChunks(scene.text).forEach((c) => fetchAudio(c).catch(() => {}));
        (scene.choices || []).forEach((c) => {
            const next = scenes[c.next];
            const [first] = next && next.text ? splitIntoChunks(next.text) : [];
            if (first) fetchAudio(first).catch(() => {});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScene]);

    useEffect(() => {
        const cache = audioCache.current;
        // On unmount (e.g. exiting the book), stop audio and free all cached object URLs.
        return () => {
            stopPlayback();
            cache.forEach((p) => Promise.resolve(p).then((v) => {
                if (v?.url?.startsWith('blob:')) URL.revokeObjectURL(v.url);
            }).catch(() => {}));
            cache.clear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReadAloud = async (textToRead) => {
        setErrorMessage('');
        if (isPlaying || isLoading) {
            userStoppedPlayback.current = true;
            stopPlayback();
            return;
        }

        userStoppedPlayback.current = false;
        setIsLoading(true);

        const audio = audioRef.current;

        // Drive activeWord from audio.currentTime via rAF. No-op when alignment
        // is missing (Gemini fallback), in which case audio plays without
        // highlighting.
        const startWordTracking = (alignment, wordOffset) => {
            stopWordTracking();
            if (!alignment) { setActiveWord(null); return; }
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

        // FAST PATH: try the pre-recorded scene file (saved by
        // scripts/record-audio.mjs to /audio/<voice>/<book>/<scene>.{mp3,json}).
        // Static fetch is ~50ms; no chunking needed. Voice is hardcoded for
        // now; voice-switching can be added later by threading a voice prop
        // down to this component.
        const VOICE = 'Ivanna';
        try {
            const audioUrl = `/audio/${VOICE}/${book.id}/${currentScene}.mp3`;
            const alignUrl = `/audio/${VOICE}/${book.id}/${currentScene}.json`;
            const [headResp, alignResp] = await Promise.all([
                fetch(audioUrl, { method: 'HEAD' }),
                fetch(alignUrl),
            ]);
            if (headResp.ok && alignResp.ok && !userStoppedPlayback.current) {
                const alignment = await alignResp.json();
                audio.src = audioUrl;
                audio.oncanplaythrough = async () => {
                    try {
                        await audio.play();
                        setIsLoading(false);
                        setIsPlaying(true);
                        startWordTracking(alignment, 0);
                    } catch (playError) {
                        setErrorMessage(`Playback failed: ${playError.message}.`);
                        stopPlayback();
                    }
                };
                audio.onended = () => { stopWordTracking(); stopPlayback(); };
                audio.onerror = () => {
                    if (userStoppedPlayback.current) { userStoppedPlayback.current = false; return; }
                    setErrorMessage('An error occurred while trying to play the audio.');
                    stopPlayback();
                };
                return;
            }
        } catch { /* fall through to live chunked path */ }
        if (userStoppedPlayback.current) return;

        // SLOW PATH: live TTS via Netlify function, chunked so first audio
        // starts before the rest is ready.
        const chunks = splitIntoChunks(textToRead);
        if (!chunks.length) { setIsLoading(false); return; }

        // Word offset of each chunk's first word within the full scene text.
        const chunkWordStarts = [];
        let acc = 0;
        for (const c of chunks) { chunkWordStarts.push(acc); acc += countWords(c); }

        // Play one chunk, then chain to the next when it ends so the scene reads
        // straight through while later chunks are still being fetched.
        const playFrom = async (i) => {
            let entry;
            try {
                entry = await fetchAudio(chunks[i]); // instant if prefetched/cached
            } catch (error) {
                if (userStoppedPlayback.current) return;
                setErrorMessage(error.message || "An unknown error occurred.");
                stopPlayback();
                return;
            }
            if (userStoppedPlayback.current) return; // stopped while fetching

            // Warm the next chunk so the hand-off is seamless.
            if (chunks[i + 1]) fetchAudio(chunks[i + 1]).catch(() => {});

            audio.src = entry.url;
            audio.oncanplaythrough = async () => {
                try {
                    await audio.play();
                    setIsLoading(false);
                    setIsPlaying(true);
                    startWordTracking(entry.alignment, chunkWordStarts[i]);
                } catch (playError) {
                    setErrorMessage(`Playback failed: ${playError.message}.`);
                    stopPlayback();
                }
            };

            audio.onended = () => {
                stopWordTracking();
                if (i + 1 < chunks.length) playFrom(i + 1);
                else stopPlayback();
            };

            audio.onerror = (e) => {
                if (userStoppedPlayback.current) {
                    userStoppedPlayback.current = false; // Reset flag
                    return; // Don't show an error if the user stopped it.
                }
                console.error("Audio playback error:", e.target.error);
                setErrorMessage('An error occurred while trying to play the audio.');
                stopPlayback();
            };
        };

        playFrom(0);
    };

    // Tokens for the displayed scene text — memoized so we don't re-tokenize
    // on every activeWord change.
    const displayTokens = useMemo(() => tokenizeForDisplay(scene.text), [scene.text]);

    // Keep the active word in view, but only nudge the scroll when it's
    // actually outside (or near the edge of) the visible area. Without this
    // gate, every word triggers a fresh smooth-scroll and they fight each
    // other for ~300ms, causing visible jitter.
    useEffect(() => {
        if (activeWord == null) return;
        const el = activeWordRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Leave generous margins so we only scroll when the word is genuinely
        // near a viewport edge (within 20% of top/bottom). The sticky image
        // covers up to 45vh on small screens, so the comfortable reading band
        // is roughly the lower 55% of the viewport.
        const topPad = Math.max(vh * 0.5, 200);
        const bottomPad = Math.max(vh * 0.2, 100);
        if (r.top < topPad || r.bottom > vh - bottomPad) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    }, [activeWord]);

    const handleChoice = (nextSceneId) => {
        stopPlayback();
        setErrorMessage('');
        setCurrentScene(scenes[nextSceneId] ? nextSceneId : 'start');
    };

    // Layout:
    //   Portrait / below lg — sticky image at top, page scrolls beneath it.
    //   lg+ landscape       — image fills left half of the card, text fills
    //                         right half with its own scroll.
    return (
        <>
            <div className="sticky top-0 z-10 bg-white rounded-t-2xl overflow-hidden lg:static lg:rounded-t-none lg:rounded-l-2xl lg:w-1/2 lg:h-full lg:flex-shrink-0 lg:flex lg:items-start lg:justify-center">
                <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-auto max-h-[45vh] object-cover lg:max-h-full lg:h-auto lg:w-auto lg:max-w-full lg:object-contain"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/fecaca/9ca3af?text=Image+Not+Found'; }}
                />
            </div>
            <div className="p-6 md:p-8 lg:w-1/2 lg:h-full lg:overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-left flex-1 mr-4">{scene.title}</h1>
                    <button onClick={() => handleReadAloud(scene.text)} disabled={isLoading} className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isPlaying ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'} ${isLoading ? 'bg-slate-400 cursor-not-allowed' : ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                        <SoundIcon isLoading={isLoading} isPlaying={isPlaying} />
                        {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Read'}
                    </button>
                </div>
                <ErrorMessage message={errorMessage} />
                <p className="text-slate-700 text-base md:text-lg leading-relaxed my-6">
                    {displayTokens.map((tok, i) => {
                        if (tok.type === 'ws') return <span key={i}>{tok.text}</span>;
                        const isActive = tok.idx === activeWord;
                        return (
                            <span
                                key={i}
                                ref={isActive ? activeWordRef : null}
                                className={`rounded-md px-0.5 transition-colors duration-150 ${isActive ? 'bg-yellow-200' : 'bg-transparent'}`}
                            >
                                {tok.text}
                            </span>
                        );
                    })}
                </p>
                <div className="flex flex-col items-center space-y-4">
                    {scene.choices.map((choice, index) => (
                        <button key={index} onClick={() => handleChoice(choice.next)} className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300">
                            {choice.text}
                        </button>
                    ))}
                    <button onClick={onExit} className="mt-4 text-sm text-slate-500 hover:text-purple-600">
                        &larr; Back to Library
                    </button>
                </div>
            </div>
            <audio ref={audioRef} className="hidden" />
        </>
    );
};

// Warm the TTS function (and its upstream connection) with a tiny throwaway
// request so the one-time cold start happens while the reader is still on the
// library screen, instead of stalling their first "Read".
const warmTts = () => {
    fetch('/.netlify/functions/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'Hi' }),
    }).catch(() => {});
};

// --- Main App Component ---
export default function App() {
    // Kick off the TTS warm-up once, as early as possible.
    useEffect(() => { warmTts(); }, []);

    // URL is the source of truth for which book is open — supports shareable links.
    const [selectedBookId, setSelectedBookId] = useState(() => {
        const { book } = readURL();
        return book && library.books.some(b => b.id === book) ? book : null;
    });

    // Respond to browser back/forward — re-read the book id from the URL.
    useEffect(() => {
        const onPop = () => {
            const { book } = readURL();
            setSelectedBookId(book && library.books.some(b => b.id === book) ? book : null);
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
    }, []);

    // If we landed with an unknown ?book=... value, clear it from the URL on mount.
    useEffect(() => {
        const { book } = readURL();
        if (book && !library.books.some(b => b.id === book)) writeURL({});
    }, []);

    const handleSelectBook = (bookId) => {
        setSelectedBookId(bookId);
        writeURL({ book: bookId });
    };

    const handleExitBook = () => {
        setSelectedBookId(null);
        writeURL({});
    };

    const selectedBook = selectedBookId ? library.books.find(b => b.id === selectedBookId) : null;

    // Two top-level layouts. Library = centered card on a tall page.
    // Book viewer = full-viewport on lg (so side-by-side panels can each scroll
    // independently), stacked on smaller screens (image sticks at top while
    // text scrolls underneath).
    if (selectedBook) {
        return (
            <div className="bg-slate-100 font-sans min-h-screen lg:h-screen lg:overflow-hidden p-2 lg:p-4">
                <div className="bg-white w-full max-w-4xl mx-auto rounded-2xl shadow-2xl lg:max-w-6xl lg:h-full lg:flex lg:overflow-hidden">
                    <StoryViewer book={selectedBook} onExit={handleExitBook} />
                </div>
            </div>
        );
    }
    return (
        <div className="bg-slate-100 font-sans min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out">
                <BookSelection books={library.books} onSelectBook={handleSelectBook} />
            </div>
        </div>
    );
}
