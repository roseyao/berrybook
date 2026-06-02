import React, { useState, useEffect, useRef } from 'react';
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
    const audioRef = useRef(null);
    const userStoppedPlayback = useRef(false);
    // Cache of text -> Promise<objectURL>, so each scene's audio is fetched once
    // (background prefetch + replays become instant).
    const audioCache = useRef(new Map());

    // Fetch (or reuse) TTS audio for some text; resolves to a playable object URL.
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
            return URL.createObjectURL(blob);
        })();
        p.catch(() => cache.delete(text)); // on failure, allow a later retry
        cache.set(text, p);
        return p;
    };

    const scenes = book.scenes;
    const scene = scenes[currentScene];

    const stopPlayback = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.oncanplaythrough = null;
            audio.onended = null;
            audio.onerror = null;
            audio.src = '';
        }
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
            cache.forEach((p) => Promise.resolve(p).then((url) => {
                if (typeof url === 'string' && url.startsWith('blob:')) URL.revokeObjectURL(url);
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

        const chunks = splitIntoChunks(textToRead);
        if (!chunks.length) { setIsLoading(false); return; }
        const audio = audioRef.current;

        // Play one chunk, then chain to the next when it ends so the scene reads
        // straight through while later chunks are still being fetched.
        const playFrom = async (i) => {
            let audioUrl;
            try {
                audioUrl = await fetchAudio(chunks[i]); // instant if prefetched/cached
            } catch (error) {
                if (userStoppedPlayback.current) return;
                setErrorMessage(error.message || "An unknown error occurred.");
                stopPlayback();
                return;
            }
            if (userStoppedPlayback.current) return; // stopped while fetching

            // Warm the next chunk so the hand-off is seamless.
            if (chunks[i + 1]) fetchAudio(chunks[i + 1]).catch(() => {});

            audio.src = audioUrl;
            audio.oncanplaythrough = async () => {
                try {
                    await audio.play();
                    setIsLoading(false);
                    setIsPlaying(true);
                } catch (playError) {
                    setErrorMessage(`Playback failed: ${playError.message}.`);
                    stopPlayback();
                }
            };

            audio.onended = () => {
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

    const handleChoice = (nextSceneId) => {
        stopPlayback();
        setErrorMessage('');
        setCurrentScene(scenes[nextSceneId] ? nextSceneId : 'start');
    };

    return (
        <div>
            <div className="w-full">
                <img src={scene.image} alt={scene.title} className="w-full h-auto" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/fecaca/9ca3af?text=Image+Not+Found'; }} />
            </div>
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-left flex-1 mr-4">{scene.title}</h1>
                    <button onClick={() => handleReadAloud(scene.text)} disabled={isLoading} className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isPlaying ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'} ${isLoading ? 'bg-slate-400 cursor-not-allowed' : ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                        <SoundIcon isLoading={isLoading} isPlaying={isPlaying} />
                        {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Read'}
                    </button>
                </div>
                <ErrorMessage message={errorMessage} />
                <p className="text-slate-600 text-base md:text-lg leading-relaxed my-6 text-center">{scene.text}</p>
                <div className="flex flex-col items-center space-y-4">
                    {scene.choices.map((choice, index) => (
                        <button key={index} onClick={() => handleChoice(choice.next)} className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300">
                            {choice.text}
                        </button>
                    ))}
                    {/* Add a button to go back to the library */}
                    <button onClick={onExit} className="mt-4 text-sm text-slate-500 hover:text-purple-600">
                        &larr; Back to Library
                    </button>
                </div>
            </div>
            <audio ref={audioRef} />
        </div>
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

    return (
        <div className="bg-slate-100 font-sans min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out">
                {selectedBook ? (
                    <StoryViewer book={selectedBook} onExit={handleExitBook} />
                ) : (
                    <BookSelection books={library.books} onSelectBook={handleSelectBook} />
                )}
            </div>
        </div>
    );
}
