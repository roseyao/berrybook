import React, { useState, useEffect, useRef } from 'react';

// --- Data Structure for the Library ---
// This new structure can hold multiple books.
const library = {
    books: [
        {
            id: 'rainbow-berries',
            title: 'The Missing Rainbow Berries',
            coverImage: '/Images/0-BookCover.png',
            story: {
                start: {
                    title: "The Missing Rainbow Berries",
                    image: "/Images/0-Intro.png",
                    text: "Every summer, in the Whispering Woods, magical Rainbow Berries grow in every color. When they are ripe,  everyone celebrates with a festival full of treats.  Ivy the Unicorn wants everything to be perfect for the festival, and Oliver the Dragon just wants to have fun.  But the berries vanish, can Ivy and Oliver solve the problem and save the festival? ",
                    choices: [
                        { text: "Start the Adventure!", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "Discovery at the Berry Patch",
                    image: "/Images/1-Scene.png",
                    text: "\"Oh no!\" Ivy the Unicorn gasped. \"The Rainbow Berries are all gone! The festival is tomorrow!\" Oliver the Dragon bounced nearby, chasing a butterfly. \"Maybe they're playing hide and seek!\" he giggled, not really listening. Ivy stomped her hoof. \"Oliver, this is serious! Without Rainbow Berries, we can't make the special festival treats!\" \"No Berry Pie?\" Oliver suddenly stopped. \"We should do something! Should we look for clues or ask if anyone saw anything?\"",
                    choices: [
                        { text: "Look for clues", nextScene: 'scene2A' },
                        { text: "Ask forest friends", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "Following Clues",
                    image: "/Images/2A-Scene.png",
                    text: "\"Look!\" Ivy pointed at something sparkly. \"A purple scale!\" They found a glittery trail leading into the Whispering Woods. The trees looked dark and scary. \"M-maybe we should get help,\" Ivy whispered nervously. \"The trail does loop-de-loops!\" Oliver got distracted by a stick. \"Wait, where did it go?\" They needed to work together to follow the trail.",
                    choices: [
                        { text: "Take a deep breath and focus", nextScene: 'scene3A' },
                        { text: "Make noise to find the way", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "Asking Around",
                    image: "/Images/2B-Scene.png",
                    text: "Squirrel chittered: \"I saw a purple flash zoom by last night!\" Owl hooted: \"I heard munching when the moon was high. Someone was very hungry.\" Bunny bounced over: \"I found berry stems by the Crystal Cave!\" Ivy felt shy talking to everyone, but she tried her best. Oliver kept getting distracted and missing clues. \"So it's purple, hungry, and lives in a cave,\" Ivy said thoughtfully.",
                    choices: [
                        { text: "Go carefully to the cave", nextScene: 'scene3A' },
                        { text: "Rush to catch the thief", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "The Careful Approach",
                    image: "/Images/3A.png",
                    text: "Ivy took a deep breath. \"Let's be calm and quiet.\" They crept toward the Crystal Cave. Inside, they heard soft crying. \"Hello?\" Ivy called gently. \"We're not angry.\" A tiny purple dragon crawled out, rainbow berry juice on her snout. \"Please don't be mad. I was just so hungry...\" \"Oh, you poor thing!\" Their anger melted away completely.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "The Rushed Approach",
                    image: "/Images/3B.png",
                    text: "\"Let's hurry!\" Oliver shouted, making lots of noise. They stomped and crashed through the forest. A purple blur tried to hide! \"Wait!\" Ivy called. \"We just want to talk!\" A baby purple dragon tumbled out, berries rolling everywhere. \"Please don't hurt me! I didn't mean to be bad!\" \"Oh no, we scared her!\" Ivy felt terrible.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "Violet's Story",
                    image: "/Images/4.png",
                    text: "\"I'm Violet,\" the little dragon sniffled. \"I got lost in the big storm last week. I've been so scared and alone!\" She showed them a drawing of her family. \"Dragon babies need lots of food to keep our fire warm. I'm sorry I took your berries.\" \"Your family must be so worried!\" Ivy said. \"The festival is tomorrow though,\" Oliver remembered. What should they do first?",
                    choices: [
                        { text: "Help find Violet's family", nextScene: 'scene5A' },
                        { text: "Fix the berry problem", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "Finding Family First",
                    image: "/Images/5A.png",
                    text: "\"We'll help you find your family!\" Ivy decided. \"Really? After I took your berries?\" Violet's eyes sparkled with hope. They climbed the mountain, Violet on Oliver's back. Soon, two purple shapes appeared in the sky! \"MAMA! PAPA!\" Violet cried. \"Our baby!\" The dragon parents swooped down. After happy reunions, they said, \"We must repay your kindness. Dragon fire can grow berries instantly!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "Solving the Berry Problem",
                    image: "/Images/5B.png",
                    text: "\"Let's fix the berry problem first,\" Ivy decided gently. Violet showed them her stash - only half the berries were left. \"I'm so sorry.\" \"Wait!\" Ivy's horn glowed. \"Unicorn magic and dragon fire can work together! Violet, will you help?\" Working as a team, Ivy's sparkles and Violet's purple flames made new berry bushes grow instantly! \"We did it together!\" Oliver cheered. Just then two dragons swooped in yelling: “Violet!” Violet jumped with joy, “Mama, Dada!”",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Rainbow Festival",
                    image: "/Images/6.png",
                    text: "The festival was more magical than ever! Ivy directed preparations calmly. \"That crooked banner? It's perfectly imperfect!\" Oliver stayed focused on helping. \"Look! I didn't get distracted once... well, maybe once.\" Violet lit purple lanterns with her dragon fire. \"We learned that the best solutions come when we work together,\" the friends agreed, watching the twinkling lights.",
                    choices: [
                        { text: "The End - Play Again!", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'starlight-flowers',
            title: 'The Invisible Starlight Flowers',
            coverImage: '/Images/book2/0-cover.png',
            story: {
                start: {
                    title: "The Invisible Starlight Flowers",
                    image: "/Images/book2/0-intro.png", 
                    text: "The Starlight Flowers that grant wishes only bloom once a year - tonight! But baby Shimmer accidentally made them invisible while playing with magic she's too young to control. Ivy and Oliver must work together (without fighting!) to find the flowers before midnight, all while taking care of an energetic baby unicorn who copies everything they do.",
                    choices: [
                        { text: "Start Adventure", nextScene: 'scene1' },
                    ]
                }
                scene1: {
                    title: "The Baby Unicorn Arrives",
                    image: "/Images/book2/1.png",
                    text: "\"Cousin Ivy! Cousin Ivy!\" A tiny white unicorn with a silver mane bounced into the meadow, sparkles flying everywhere. \"Shimmer!\" Ivy smiled. \"Oliver and I are going to find the Starlight Flowers tonight!\" \"My grandpa told me dragon stories about those flowers,\" Oliver said excitedly. \"They only appear when the Dragon Star aligns with—\" \"I help! I help!\" Shimmer bounced, accidentally shooting sparkles that made the nearby flowers turn invisible. \"Oopsie!\" \"Oh no!\" Ivy gasped. \"The flowers! Oliver, do your dragon stories say anything about invisible flowers?\" Oliver thought hard. \"Actually... yes! We need to work together on this one!\"",
                    choices: [
                        { text: "Oliver shares his dragon knowledge", nextScene: 'scene2A' },
                        { text: "Work out a plan together", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "Dragon Wisdom",
                    image: "/Images/book2/2A.png",
                    text: "\"In dragon lore,\" Oliver began proudly, \"invisible things can be seen with Moonlight Crystals. But there's a catch—\" \"Where do we find them?\" Ivy asked, really listening instead of taking charge. \"Dragons hide them in the Crystal Grove! My mom showed me once. But unicorn magic is needed to activate them.\" \"Dragon knowledge and unicorn magic!\" Ivy smiled. \"We really do need each other!\" \"Need each other!\" Shimmer repeated, hugging them both with her tiny hooves. \"Follow me!\" Oliver said confidently. \"I know a shortcut only dragons use!\"",
                    choices: [
                        { text: "Take Oliver's dragon shortcut", nextScene: 'scene3A' },
                        { text: "Combine both their knowledge", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "Equal Planning",
                    image: "/Images/book2/2B.png",
                    text: "\"Let's figure this out together,\" Ivy suggested. \"Oliver, you mentioned dragon stories?\" \"Yes!\" Oliver's eyes lit up. \"Dragons can sense star magic. I feel something pulling me toward the old Dragon Stones.\" \"And I know a focusing spell,\" Ivy added, \"but I've never tried it on invisible things.\" \"What if we combine them?\" Oliver suggested. \"Dragon senses to find them, unicorn magic to see them?\" \"Combine! Combine!\" Shimmer cheered, accidentally making her flower crown invisible. \"That's brilliant, Oliver!\" Ivy said, making him beam with pride.",
                    choices: [
                        { text: "Visit the Dragon Stones first", nextScene: 'scene3A' },
                        { text: "Try combining magic right away", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "Oliver Leads the Way",
                    image: "/Images/book2/3A.png",
                    text: "Oliver led them through a path only dragons knew, between two boulders that looked solid but weren't. \"Wow!\" Ivy gasped. \"I never knew this was here!\" \"Dragon secret!\" Oliver said proudly. \"My dad taught me. See those scratches? They're really an ancient dragon map!\" At the Dragon Stones, Oliver touched the largest stone. It glowed with warm orange light, and suddenly they could feel where the invisible flowers were calling. \"Oliver, you're amazing!\" Ivy said. \"I could never have found this!\" \"Amazing!\" Shimmer copied, trying to touch the stone too.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "Magical Combination",
                    image: "/Images/book2/3B.png",
                    text: "\"Let's try our magic together right now,\" Oliver suggested. \"I've been practicing my control!\" He breathed a gentle, controlled flame while Ivy added her silver sparkles. Where they mixed, rainbow colors swirled. \"It's working!\" they said together. The combined magic revealed invisible flower petals floating by! But the full flowers were still hidden. \"I think we need more power,\" Ivy said. \"Oliver, what about those Dragon Stones you mentioned?\" \"And your moon crystals!\" Oliver added. \"Together they'd be super powerful!\" \"Together! Together!\" Shimmer sang, adding her chaotic sparkles.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "The Star Map Discovery",
                    image: "/Images/book2/4.png",
                    text: "At the Dragon Stones, Oliver made an exciting discovery. \"Look! When my fire lights touches these symbols, they show a map!\" The ancient stones revealed constellation patterns. Oliver's dragon instincts helped him understand them. \"This one's the Dragon Star,\" he explained, \"and this is the Unicorn constellation. They meet... here!\" \"That's brilliant!\" Ivy said. \"But it shows two meeting places.\" One path led to Starlight Peak, the other to the Whispering Waterfalls - both sacred to dragons. \"My wish is to breathe rainbow fire!\" Shimmer announced, bouncing.",
                    choices: [
                        { text: "Go to Starlight Peak", nextScene: 'scene5A' },
                        { text: "Go to Whispering Waterfalls", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "Peak Partnership",
                    image: "/Images/book2/5A.png",
                    text: "The climb was steep, but Oliver flew ahead to scout while Ivy created magical steps. \"There's a dragon wind current here!\" Oliver called. \"If you jump at just the right spot, it'll carry you up!\" \"I trust you!\" Ivy said, leaping where Oliver pointed. The wind carried her perfectly! At the peak, Oliver's dragon eyes spotted something Ivy couldn't. \"The flowers! They're hidden in the dragon cave!\" Inside, ancient dragon magic made the invisible flowers glow. But there were only two. \"Shimmer should get one,\" they both said, then Oliver added, \"Ivy, you take the other. You trusted me today.\" \"No, Oliver, your dragon knowledge saved us! You should have it.\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "Waterfall Wisdom",
                    image: "/Images/book2/5B.png",
                    text: "At the Whispering Waterfalls, Oliver's dragon hearing picked up something special. \"The water's not just whispering,\" he realized. \"It's singing in dragon language! It says the flowers are behind the falls!\" \"But how do we get through?\" Ivy wondered. Oliver grinned. \"Dragon fire can part water! But I'll need your magic to protect Shimmer from the mist.\" Working as perfect partners, Oliver's controlled flame created a tunnel through the waterfall while Ivy's magic kept them dry. Behind the falls, two flowers glowed in the mist. \"We make a great team,\" Oliver said proudly. \"The best!\" Ivy agreed.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Perfect Wish",
                    image: "/Images/book2/6.png",
                    text: "Under the starlight, they held the two glowing flowers. \"I learned something today,\" Oliver said. \"My dragon knowledge is just as important as unicorn magic.\" \"And I learned that listening to you makes everything better,\" Ivy added. \"You had the answers all along!\" \"Let's wish together,\" Oliver suggested. \"Like we did everything today.\" They held the flower together. \"We wish to always remember that we're stronger as a team!\" The flower glowed dragon-orange and unicorn-silver, then split into three! \"Sharing made more!\" Shimmer gasped. \"Like you shared today!\" As they made their wishes under the Dragon Star and Unicorn constellation, Oliver stood tall, knowing he was truly Ivy's equal partner in every adventure.",
                    choices: [
                        { text: "The End - Play Again!", nextScene: 'start' }
                    ]
                }
            }
        }
    ]
};

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
    // This console.log will help us debug.
    // It will show the contents of the 'books' array in your browser's developer console.
    console.log("Books being sent to the bookshelf:", books);

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

// --- New Component for Viewing a Single Story ---
const StoryViewer = ({ book, onExit }) => {
    const [currentScene, setCurrentScene] = useState('start');
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const audioRef = useRef(null);

    const storyData = book.story;
    const scene = storyData[currentScene];

    const stopPlayback = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            if (audio.src && audio.src.startsWith('blob:')) URL.revokeObjectURL(audio.src);
            audio.src = '';
        }
        setIsPlaying(false);
        setIsLoading(false);
    };

    useEffect(() => {
        // Reset to the start scene when the book changes
        setCurrentScene('start');
        return () => stopPlayback();
    }, [book]);

    const handleReadAloud = async (textToRead) => {
        setErrorMessage('');
        if (isPlaying || isLoading) {
            stopPlayback();
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('/.netlify/functions/generate-audio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textToRead }),
            });
            if (!response.ok) throw new Error(await response.text() || `Request failed with status ${response.status}`);
            const data = await response.json();
            const audioBytes = atob(data.audio);
            const audioBuffer = new Uint8Array(audioBytes.length);
            for (let i = 0; i < audioBytes.length; i++) audioBuffer[i] = audioBytes.charCodeAt(i);
            const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = audioRef.current;
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
            audio.onended = () => stopPlayback();
            audio.onerror = () => {
                setErrorMessage('An error occurred while trying to play the audio.');
                stopPlayback();
            };
        } catch (error) {
            setErrorMessage(error.message || "An unknown error occurred.");
            setIsLoading(false);
        }
    };

    const handleChoice = (nextScene) => {
        stopPlayback();
        setErrorMessage('');
        if (storyData[nextScene]) {
            setCurrentScene(nextScene);
        } else {
            setCurrentScene('start');
        }
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
                        <button key={index} onClick={() => handleChoice(choice.nextScene)} className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300">
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

// --- Main App Component ---
export default function App() {
    const [selectedBookId, setSelectedBookId] = useState(null);

    const handleSelectBook = (bookId) => {
        setSelectedBookId(bookId);
    };

    const handleExitBook = () => {
        setSelectedBookId(null);
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
