const book = {
    id: 'starlight-flowers',
    title: 'The Invisible Starlight Flowers',
    coverImage: '/Images/book2/0-cover.png',
    scenes: {
        start: {
            title: "The Night the Flowers Bloom",
            image: '/Images/book2/0-intro.png',
            text: "Once a year — and only once a year — the magical Starlight Flowers bloomed. And whoever found one got to make a real, true WISH. \"And tonight is the night!\" Ivy whispered to Oliver, practically glowing with excitement. \"I've been planning my wish for MONTHS.\" \"I haven't picked mine yet,\" Oliver admitted. \"Maybe… RAINBOW dragon-fire? Or pancakes that float?\" Just then, a tiny voice piped up from behind a flower: \"COUSIN IVY! COUSIN IVY!\" Out bounced their littlest cousin — Shimmer, the baby unicorn, sparkles flying everywhere she stepped. \"I help! I HELP!\" she squealed. The trouble was: Shimmer was still learning to control her magic.",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Baby Unicorn Arrives",
            image: "/Images/book2/1.png",
            text: "\"Cousin Ivy! Cousin Ivy!\" A tiny white unicorn with a silver mane bounced into the meadow, sparkles flying everywhere. \"Shimmer!\" Ivy smiled. \"Oliver and I are going to find the Starlight Flowers tonight!\" \"My grandpa told me dragon stories about those flowers,\" Oliver said excitedly. \"They only appear when the Dragon Star aligns with—\" \"I help! I help!\" Shimmer bounced, accidentally shooting sparkles that made the nearby flowers turn invisible. \"Oopsie!\" \"Oh no!\" Ivy gasped. \"The flowers! Oliver, do your dragon stories say anything about invisible flowers?\" Oliver thought hard. \"Actually... yes! We need to work together on this one!\"",
            choices: [
                { text: "Oliver shares his dragon knowledge", next: 'scene2A' },
                { text: "Work out a plan together", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "Dragon Wisdom",
            image: "/Images/book2/2A.png",
            text: "\"In dragon lore,\" Oliver began proudly, \"invisible things can be seen with Moonlight Crystals. But there's a catch—\" \"Where do we find them?\" Ivy asked, really listening instead of taking charge. \"Dragons hide them in the Crystal Grove! My mom showed me once. But unicorn magic is needed to activate them.\" \"Dragon knowledge and unicorn magic!\" Ivy smiled. \"We really do need each other!\" \"Need each other!\" Shimmer repeated, hugging them both with her tiny hooves. \"Follow me!\" Oliver said confidently. \"I know a shortcut only dragons use!\"",
            choices: [
                { text: "Take Oliver's dragon shortcut", next: 'scene3A' },
                { text: "Combine both their knowledge", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "Equal Planning",
            image: "/Images/book2/2B.png",
            text: "\"Let's figure this out together,\" Ivy suggested. \"Oliver, you mentioned dragon stories?\" \"Yes!\" Oliver's eyes lit up. \"Dragons can sense star magic. I feel something pulling me toward the old Dragon Stones.\" \"And I know a focusing spell,\" Ivy added, \"but I've never tried it on invisible things.\" \"What if we combine them?\" Oliver suggested. \"Dragon senses to find them, unicorn magic to see them?\" \"Combine! Combine!\" Shimmer cheered, accidentally making her flower crown invisible. \"That's brilliant, Oliver!\" Ivy said, making him beam with pride.",
            choices: [
                { text: "Visit the Dragon Stones first", next: 'scene3A' },
                { text: "Try combining magic right away", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "Oliver Leads the Way",
            image: "/Images/book2/3A.png",
            text: "Oliver led them through a path only dragons knew, between two boulders that looked solid but weren't. \"Wow!\" Ivy gasped. \"I never knew this was here!\" \"Dragon secret!\" Oliver said proudly. \"My dad taught me. See those scratches? They're really an ancient dragon map!\" At the Dragon Stones, Oliver touched the largest stone. It glowed with warm orange light, and suddenly they could feel where the invisible flowers were calling. \"Oliver, you're amazing!\" Ivy said. \"I could never have found this!\" \"Amazing!\" Shimmer copied, trying to touch the stone too.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "Magical Combination",
            image: "/Images/book2/3B.png",
            text: "\"Let's try our magic together right now,\" Oliver suggested. \"I've been practicing my control!\" He breathed a gentle, controlled flame while Ivy added her silver sparkles. Where they mixed, rainbow colors swirled. \"It's working!\" they said together. The combined magic revealed invisible flower petals floating by! But the full flowers were still hidden. \"I think we need more power,\" Ivy said. \"Oliver, what about those Dragon Stones you mentioned?\" \"And your moon crystals!\" Oliver added. \"Together they'd be super powerful!\" \"Together! Together!\" Shimmer sang, adding her chaotic sparkles.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Star Map Discovery",
            image: "/Images/book2/4.png",
            text: "At the Dragon Stones, Oliver made an exciting discovery. \"Look! When my fire lights touches these symbols, they show a map!\" The ancient stones revealed constellation patterns. Oliver's dragon instincts helped him understand them. \"This one's the Dragon Star,\" he explained, \"and this is the Unicorn constellation. They meet... here!\" \"That's brilliant!\" Ivy said. \"But it shows two meeting places.\" One path led to Starlight Peak, the other to the Whispering Waterfalls - both sacred to dragons. \"My wish is to breathe rainbow fire!\" Shimmer announced, bouncing.",
            choices: [
                { text: "Go to Starlight Peak", next: 'scene5A' },
                { text: "Go to Whispering Waterfalls", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "Peak Partnership",
            image: "/Images/book2/5A.png",
            text: "The climb was steep, but Oliver flew ahead to scout while Ivy created magical steps. \"There's a dragon wind current here!\" Oliver called. \"If you jump at just the right spot, it'll carry you up!\" \"I trust you!\" Ivy said, leaping where Oliver pointed. The wind carried her perfectly! At the peak, Oliver's dragon eyes spotted something Ivy couldn't. \"The flowers! They're hidden in the dragon cave!\" Inside, ancient dragon magic made the invisible flowers glow. But there were only two. \"Shimmer should get one,\" they both said, then Oliver added, \"Ivy, you take the other. You trusted me today.\" \"No, Oliver, your dragon knowledge saved us! You should have it.\"",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "Waterfall Wisdom",
            image: "/Images/book2/5B.png",
            text: "At the Whispering Waterfalls, Oliver's dragon hearing picked up something special. \"The water's not just whispering,\" he realized. \"It's singing in dragon language! It says the flowers are behind the falls!\" \"But how do we get through?\" Ivy wondered. Oliver grinned. \"Dragon fire can part water! But I'll need your magic to protect Shimmer from the mist.\" Working as perfect partners, Oliver's controlled flame created a tunnel through the waterfall while Ivy's magic kept them dry. Behind the falls, two flowers glowed in the mist. \"We make a great team,\" Oliver said proudly. \"The best!\" Ivy agreed.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Perfect Wish",
            image: "/Images/book2/6.png",
            text: "Under the starlight, they held the two glowing flowers. \"I learned something today,\" Oliver said. \"My dragon knowledge is just as important as unicorn magic.\" \"And I learned that listening to you makes everything better,\" Ivy added. \"You had the answers all along!\" \"Let's wish together,\" Oliver suggested. \"Like we did everything today.\" They held the flower together. \"We wish to always remember that we're stronger as a team!\" The flower glowed dragon-orange and unicorn-silver, then split into three! \"Sharing made more!\" Shimmer gasped. \"Like you shared today!\" As they made their wishes under the Dragon Star and Unicorn constellation, Oliver stood tall, knowing he was truly Ivy's equal partner in every adventure.",
            choices: [
                { text: "The End - Play Again!", next: 'start' }
            ]
        }
    }
};

export default book;
