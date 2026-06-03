const book = {
    id: 'closet-portal',
    title: 'The Closet Portal Adventure',
    coverImage: '/Images/book7/0-cover.png',
    scenes: {
        start: {
            title: "The Wishing Wood Closets",
            image: "/Images/book7/0-intro.png",
            text: "Carpenter Beaver had built Ivy and Oliver brand new closets. \"Made from Wishing Wood,\" he said with a wink. \"Very rare. Take good care of them.\" Ivy's was painted purple with silver stars. Oliver's was green with orange flames. They looked perfectly normal… until the doors closed. A soft humming came from inside both of them. \"Did you HEAR that?\" Ivy whispered. Just then, two little visitors came running in — and the adventure of the day was about to begin.",
            choices: [
                { text: "Start the Adventure!", next: 'setup' }
            ]
        },
        setup: {
            title: "Two Little Visitors",
            image: "/Images/book7/1.png",
            text: "\"Pretty!\" squealed Shimmer, the tiny baby unicorn, bouncing toward Ivy's sparkly purple closet. At the same moment, Violet the little dragon flapped through the window. \"Ooh, WARM!\" she chirped, diving toward Oliver's flame-green closet. \"WAIT!\" Ivy and Oliver shouted together. But both little ones vanished inside, and the doors slammed shut behind them. Ivy and Oliver tugged. Pulled. Pushed. The doors wouldn't budge — but the humming got louder, almost like the closets were waiting. \"We have to go IN,\" Ivy realized. \"Which one first?\"",
            choices: [
                { text: "Go through Ivy's closet first", next: 'ivy-closet' },
                { text: "Go through Oliver's closet first", next: 'oliver-closet' }
            ]
        },

        // --- Ivy-first path ---
        'ivy-closet': {
            title: "Ivy's Crystal Kingdom",
            image: "/Images/book7/2A.png",
            text: "Ivy yanked open her closet — and instead of clothes there was a swirling purple portal! She and Oliver jumped through. They landed in a world of crystal puzzles… but every puzzle had a giant glowing \"INSTANT SOLVE\" button. Press it: the puzzle finished itself. Tap it: castles built themselves. No thinking, no trying. \"Where's Shimmer?\" Ivy called. They followed the sound of frustrated crying — and found her stuck inside a crystal maze with no INSTANT SOLVE button anywhere. \"Can't get out!\" Shimmer wailed. \"TOO HARD!\" The Crystal Guides chimed: \"If it's hard, just QUIT.\" Ivy stomped her hoof. \"No. We can think this through.\" Slowly, patiently, she and Oliver studied the patterns with Shimmer. Star, moon, sun… \"What comes next?\" they coached. Step by step, dead end after dead end, they made it through. Shimmer bounced out, beaming. \"Hard but WE DID IT!\"",
            choices: [
                { text: "Continue", next: 'bridge-then-oliver' }
            ]
        },
        'bridge-then-oliver': {
            title: "One Down, One to Go",
            image: "/Images/book7/4.png",
            text: "WHOOSH! Ivy and Oliver tumbled back into the bedroom with Shimmer between them, giggling and dizzy. \"Real solving FEELS good,\" Ivy said, still buzzing. \"Even though it took FOREVER.\" \"Especially because it took forever,\" Oliver agreed. Then they heard it: hummmmm. Oliver's green closet was glowing, the door rattling gently. Violet was still in there. \"My turn,\" Oliver said, his voice braver than he expected. \"Let's go get her.\"",
            choices: [
                { text: "Into Oliver's closet", next: 'oliver-second' }
            ]
        },
        'oliver-second': {
            title: "Oliver's Game Land",
            image: "/Images/book7/3B.png",
            text: "Oliver burst through his portal — and INSTANT REWARDS rained from the sky! \"YOU WIN!\" signs flashed before he'd even played. \"VIOLET!\" Oliver called. \"Help!\" came a tiny voice. Violet was stuck on a high platform. The only bridge over only appeared if someone collected FIVE golden coins — but the Game Dragons kept offering shiny toys for every coin won. \"Trade ONE coin for this SPARKLY TOY now!\" \"No,\" Oliver said, remembering Ivy's slow careful maze. \"I'm saving for Violet.\" He played a game and won a coin. \"One!\" Another. \"Two!\" By coin four the Game Dragons offered the COOLEST bubble-breathing toy dragon. Oliver's claws shook. He wanted it SO MUCH. But… \"One more for Violet.\" When coin five clicked into his pile, the bridge appeared. Violet flew straight into his arms. \"You WAITED!\" she cried. \"Even with the bubble dragon!\"",
            choices: [
                { text: "Continue", next: 'ending' }
            ]
        },

        // --- Oliver-first path ---
        'oliver-closet': {
            title: "Oliver's Game Land",
            image: "/Images/book7/2B.png",
            text: "Oliver yanked open his closet — and instead of toys there was a swirling green-and-orange portal! He and Ivy jumped through. INSTANT REWARDS rained from the sky! \"YOU WIN!\" signs flashed before they'd even played. Treasure piled up just for showing up. \"VIOLET!\" Oliver called. \"Help!\" came a tiny voice. Violet was trapped on a high platform. The bridge over only appeared if someone collected FIVE golden coins — but the Game Dragons kept offering shiny toys for every single coin won. \"Trade ONE coin for this SPARKLY TOY now!\" \"No,\" Oliver said firmly. \"I'm saving for Violet.\" He played a game, won a coin. \"One!\" Another. \"Two!\" By coin four the Game Dragons offered the BEST toy — a bubble-breathing dragon. Oliver's claws SHOOK. But… \"One more for Violet.\" When the fifth coin clinked, the bridge appeared. Violet flew straight into his arms. \"You WAITED!\" she cried. \"Even with the bubble dragon!\"",
            choices: [
                { text: "Continue", next: 'bridge-then-ivy' }
            ]
        },
        'bridge-then-ivy': {
            title: "One Down, One to Go",
            image: "/Images/book7/4.png",
            text: "WHOOSH! Oliver and Ivy tumbled back into the bedroom with Violet flapping between them. \"Saving FEELS good,\" Oliver said, still buzzing. \"Even though I really wanted that bubble dragon.\" \"Especially because of the bubble dragon,\" Ivy agreed. Then they heard it: hummmmm. Ivy's purple closet was glowing, the door rattling gently. Shimmer was still in there. \"My turn,\" Ivy said. \"Let's go get her.\"",
            choices: [
                { text: "Into Ivy's closet", next: 'ivy-second' }
            ]
        },
        'ivy-second': {
            title: "Ivy's Crystal Kingdom",
            image: "/Images/book7/3A.png",
            text: "Ivy and Oliver leapt through the purple portal. They landed in a world of crystal puzzles — but every puzzle had a giant \"INSTANT SOLVE\" button. \"Where's Shimmer?\" Ivy called. They found her stuck in a crystal maze. \"Can't get out! TOO HARD!\" she wailed. The Crystal Guides chimed: \"If it's hard, just QUIT.\" \"No,\" Ivy said, remembering how Oliver had patiently saved every coin. \"Hard is okay. Hard is HOW.\" She and Oliver studied the patterns with Shimmer. Star, moon, sun… \"What comes next?\" they coached. Step by step, dead end after dead end, they worked their way through. Shimmer bounced out, beaming. \"Hard but WE DID IT!\"",
            choices: [
                { text: "Continue", next: 'ending' }
            ]
        },

        // --- Shared ending ---
        ending: {
            title: "The Right Closets",
            image: "/Images/book7/6.png",
            text: "Back in the bedroom, both little ones were safe and the closets had gone quiet. That evening, Carpenter Beaver came back to check on his work. \"How are the closets?\" he asked, eyes twinkling. \"Mine taught me you can't INSTANT-SOLVE the hard stuff,\" Ivy said. \"Sometimes you just have to TRY.\" \"And mine taught me that waiting is hard,\" Oliver added, \"but it's how you get the things that matter.\" Beaver nodded slowly. \"Wishing Wood is sneaky like that. It gives you what you NEED, not what you ASK FOR.\" That night at dinner, Mom set the ice cream on the table. \"We could eat it now,\" she said, \"or save it for movie night tomorrow.\" Oliver took a deep breath. \"Save it. It'll be more special.\" Ivy looked at her piano. \"And I'll practice now, even though it's hard.\" Their closets hummed once, very softly, and went still. The best treasures, it turned out, were the ones worth waiting for — and the ones worth working for.",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
