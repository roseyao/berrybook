const book = {
    id: 'closet-portal',
    title: 'The Closet Portal Adventure',
    coverImage: '/Images/book7/0-cover.png',
    scenes: {
        start: {
            title: "The Closet Portal Adventure",
            image: "/Images/book7/0-intro.png",
            text: "When Ivy and Oliver get new closets built in their tree house, they discover the closets are MAGICAL PORTALS! But when Shimmer toddles into Ivy's closet and Violet flies into Oliver's closet, they disappear into different magical worlds! Now Ivy and Oliver must journey through their own closets to rescue their little friends - but the closet worlds reflect their personalities in the wildest ways!",
            choices: [
                { text: "Start Adventure", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The New Closets Arrive",
            image: "/Images/book7/1.png",
            text: "\"Your new closets are special,\" said Carpenter Beaver, wiping his brow. \"Made from Wishing Wood - very rare!\" Ivy's closet was painted purple with silver stars. Oliver's was green with orange flames. They looked perfectly normal... until the doors were closed. A soft humming came from inside. \"Did you hear that?\" Ivy asked. Just then, Shimmer toddled in. \"Pretty!\" she squealed, running toward Ivy's closet. And Violet flapped through the window. \"Ooh, warm!\" she chirped, diving toward Oliver's closet. \"WAIT!\" Ivy and Oliver shouted. But both little ones vanished inside. The closet doors slammed shut and wouldn't open!",
            choices: [
                { text: "Follow Ivy into her closet", next: 'scene2A' },
                { text: "Follow Oliver into his closet", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "Ivy's Perfect Crystal Kingdom",
            image: "/Images/book7/2A.png",
            text: "Ivy yanked open her closet door and gasped. Instead of clothes, there was a swirling portal! \"Shimmer needs me!\" She jumped through. She landed in a world of crystal puzzles and building challenges - but everything had an \"INSTANT SOLVE\" button. Press it, and castles built themselves. Tap it, and puzzles solved instantly. No thinking, no trying, no effort needed! \"Shimmer?\" Ivy called. \"Where are you?\" She heard frustrated crying. There was Shimmer, stuck in a crystal maze with no instant button! \"Can't get out!\" Shimmer wailed. \"Too hard!\" Crystal Guides appeared. \"Why struggle? Use instant solution!\" \"But there IS no button for this!\" Ivy said. \"Then give up. If it's hard, it's not worth doing,\" they chimed. Ivy felt uncomfortable. That didn't sound right...",
            choices: [
                { text: "Try to solve the maze", next: 'scene3A' },
            ]
        },
        scene2B: {
            title: "Oliver's Dragon Game Land",
            image: "/Images/book7/2B.png",
            text: "Oliver burst through his closet portal and found himself in a dragon's paradise of INSTANT rewards! \"CONGRATULATIONS!\" signs flashed everywhere. \"YOU WIN!\" before he even played. Treasure poured from the sky just for showing up. Every game gave prizes immediately - no waiting, no earning, just constant rewards! \"VIOLET!\" he roared, distracted by the raining gold. \"Help!\" came a tiny voice. Violet was trapped on a platform surrounded by \"instant win\" games. \"I can't get down! The only bridge appears if you save 5 golden coins, but everyone keeps spending them right away!\" Oliver looked at his hand. One golden coin! \"Just need 5?\" Oliver counted on his claws. \"One... two... three... four... FIVE!\" A shiny toy dragon appeared. \"Trade your coin for this! NOW!\" \"But I only have one,\" Oliver said. \"I need... more.\" The Game Dragons laughed. \"Why wait? Shiny toy NOW! Saving is boring!\"",
            choices: [
                { text: "Save coins for Violet", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "Ivy Solves It Slowly",
            image: "/Images/book7/3A.png",
            text: "\"No instant button means it's impossible,\" the Crystal Guides insisted. \"No,\" Ivy said firmly. \"It means we need to THINK.\" She studied the maze. It was complex, with sliding walls and pattern locks. Her fingers itched for an easy solution, but there wasn't one. \"Come on, Shimmer. Let's work through this together. First, what do you see?\" \"Scary walls!\" Shimmer whimpered. \"Look closer. See? The walls have patterns. Star, moon, sun. What comes next?\" \"Um... star again?\" \"Yes! You're getting it!\" Ivy guided patiently. Each step took time. Some paths were dead ends. They had to backtrack, try again. The Crystal Guides watched in confusion. \"But you're... struggling. Why not quit?\" \"Because,\" Ivy said, helping Shimmer through another patient attempt, \"the best things take effort. Real solving isn't instant.\" After many tries, they solved it! Shimmer bounced out, beaming. \"We did it! Hard but WE DID IT!\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "Oliver Learns to Wait",
            image: "/Images/book7/3B.png",
            text: "Oliver almost traded his coin for the toy - then stopped. \"But Violet needs 5 coins...\" \"Don't wait!\" a Game Dragon tempted. \"Shiny toy NOW!\" Oliver squeezed his coin. The toy was SO cool. But Violet looked SO scared. \"How do I get more coins?\" he asked. \"Win games! Here's one coin!\" They gave him another. Now he had 2! \"Two!\" Oliver counted proudly. A sparkly ball appeared. \"Trade 2 coins for this!\" \"No... need 5 for Violet.\" He played another game. \"Three!\" A light-up sword appeared. \"Only 3 coins!\" Oliver looked at Violet. \"Sorry sword. Still need more.\" He won another coin. \"Four! Almost there!\" The BEST toy appeared - a dragon that breathed bubbles! \"Trade 4 coins NOW!\" Oliver's hands shook. He wanted it SO MUCH. But... \"One more for Violet.\" When he got 5 coins, the bridge appeared! Violet flew into his arms! \"You waited for me!\" she cried. \"Even with the bubble dragon!\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Closet Crossover",
            image: "/Images/book7/4.png",
            text: "Back in their room, Ivy and Oliver tumbled out of their closets at the same time - but they weren't alone! Ivy came out with Shimmer AND a reformed Crystal Guide who wanted to learn about \"effort and patience.\" Oliver emerged with Violet AND a Game Dragon who was amazed by \"the power of waiting.\" \"Our closets connected!\" they realized. \"My world was full of instant solutions,\" Ivy said, still thinking. \"No one wanted to try if it was hard.\" \"And mine was all instant rewards!\" Oliver said. \"No one saved for anything important!\" Their mom called: \"Kids! I bought ice cream for dessert, but if you eat it now, we won't have any for movie night tomorrow!\" Old Oliver would have wanted it NOW. But he looked at Violet and remembered waiting for 100 coins. \"Let's save it for movie night,\" he said, surprising everyone. \"It'll be more special tomorrow.\" Ivy smiled. \"And I'll practice my piano now, even though it's not instantly fun.\" The Crystal Guide and Game Dragon exchanged notes: \"Delayed gratification... makes rewards sweeter?\"",
            choices: [
                { text: "Keep the portals secret", next: 'scene5A' },
                { text: "Share with friends", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Secret Club",
            image: "/Images/book7/5A.png",
            text: "\"This should be our secret,\" Ivy whispered. \"Our special place!\" They made a pact with Shimmer and Violet - the Closet Portal Club! Every week they'd explore together. They discovered: A Backwards World where you walked on ceilings, A Bubble World where everything bounced, A Music World where every step made a note. \"Best secret ever!\" Violet giggled, now brave enough for any adventure. \"Closet club! Closet club!\" Shimmer chanted. Their new closets weren't just for clothes - they were doorways to infinite adventures!",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Portal Playdate",
            image: "/Images/book7/5B.png",
            text: "\"Let's invite everyone!\" Oliver said excitedly. Soon their room was full of friends, each discovering their perfect closet world: Bunny found Garden World with infinite carrots, Squirrel discovered Acorn Palace, Even Mayor Badger found Organized Office World! The closets created a portal for each visitor based on their dreams! \"This is amazing!\" everyone cheered. But the best part was when portals mixed - Bunny's gardens grew in Dragon Land, Oliver's games appeared in Crystal Kingdom. Everyone's worlds became richer by sharing!",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Perfect Closets",
            image: "/Images/book7/6.png",
            text: "That night, Carpenter Beaver returned to check on his work. \"How are the closets?\" he asked with a knowing wink. \"They showed us what we needed to learn,\" Ivy said, organizing her closet properly. \"Mine taught me that instant and easy isn't always better.\" \"And mine showed me that waiting makes things more special,\" Oliver added. \"I saved 5 whole coins for Violet! One, two, three, four, FIVE!\" The Game Dragon had given Oliver a special coin jar with numbers on it. \"For your world. When you want something NOW, count how many you need to save!\" Violet nodded. \"Oliver didn't buy the bubble dragon even though he REALLY wanted it!\" \"That must have been hard,\" Beaver said. \"SO hard,\" Oliver admitted, still counting on his claws. \"But saving Violet was better than any toy!\" As they fell asleep, their closets hummed softly. Through Oliver's portal, Dragon Game Land was transforming - dragons were learning to count and save coins instead of spending them right away. Because the best treasures - like helping friends - are worth waiting for, even if you can only count to five!",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
