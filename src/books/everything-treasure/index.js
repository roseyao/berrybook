const book = {
    id: 'everything-treasure',
    title: 'The Everything Treasure',
    coverImage: '/Images/book10/0-cover.png',
    scenes: {
        start: {
            title: "The Not Fair Festival",
            image: "/Images/book10/0-intro.png",
            text: "Ivy and Oliver had a problem. A LOUD problem. \"NOT FAIR!\" Ivy whined as Oliver got the bigger popsicle. \"You always get the better one!\" Oliver whined back, even though his was perfectly good. \"NOT FAIR you got more TV time!\" Ivy added. \"NOT FAIR you got the corner piece of cake!\" Oliver whined louder. Mom sighed her tiredest sigh. \"What's our rule about whining?\" \"No whining,\" they mumbled — and then kept right on whining. Just then, a dusty old map fell from behind a picture frame. It showed a path through the Whispering Wood to something marked \"ULTIMATE TREASURE — WARNING: CURSED IF FOUGHT OVER.\" \"REAL treasure!\" they gasped. \"Maybe we'll finally get something FAIR!\" Ivy declared. They snuck out while Mom was busy with Hazel — already planning, secretly, how to grab the bigger half.",
            choices: [
                { text: "Follow the map immediately", next: 'scene2A' },
                { text: "Plan how to split the treasure first", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Greed Path",
            image: "/Images/book10/2A.png",
            text: "They rushed into the forest, each secretly planning to grab the biggest share. \"I should get more because I'm OLDER!\" Ivy thought. \"I should get more because I'm SMALLEST!\" Oliver thought. The map led them out of the Whispering Wood to the gates of a gloomy little kingdom where everyone looked miserable despite having LOTS of stuff. \"Welcome to the Complaint Kingdom!\" announced Captain Grumble-Beard, a big grizzled bear pirate covered in dull, lifeless treasures that clinked sadly when he moved. \"Here, everyone gets exactly what they deserve based on their complaints!\" \"Perfect!\" Ivy and Oliver said together. The Captain raised one bushy grey eyebrow, almost like he was hiding a tiny smile. \"Then welcome, my whiny little friends. Right this way.\"",
            choices: [
                { text: "Continue", next: 'kingdom-tour' }
            ]
        },
        scene2B: {
            title: "The Planning Session",
            image: "/Images/book10/2B.png",
            text: "\"Let's be SMART about this,\" Ivy said. \"We need rules for fair splitting.\" \"I get first pick because I FOUND the map!\" Oliver declared. \"I get first pick because I can READ the map!\" Ivy countered. They spent a WHOLE HOUR arguing about fairness while the map glowed strangely in the sunlight. \"FINE! We'll take turns!\" Ivy finally said. \"But what if there's an odd number of treasures?\" Oliver worried. \"Then we'll… we'll…\" They looked at each other and realized they were already fighting over treasure they hadn't even FOUND yet. The map glowed brighter, almost like it was laughing. By the time they finally reached the gates of the Complaint Kingdom, a grizzled bear pirate was waiting with one bushy grey eyebrow raised. \"Took you long enough, my little squabblers. Right this way.\"",
            choices: [
                { text: "Continue", next: 'kingdom-tour' }
            ]
        },
        'kingdom-tour': {
            title: "The Tour",
            image: "/Images/book10/3A.png",
            text: "Captain Grumble-Beard led them down a gray cobblestone street. First stop: Princess Pout, a tiny fox in a tarnished crown, sitting on the floor surrounded by literal MOUNTAINS of toys piled to the ceiling. But every toy was GRAY. Dull. Joyless. \"I have the MOST toys,\" Princess Pout sighed. \"But they're no fun. I keep thinking about what the kids in the next kingdom have.\" Next stop: Duke Grumble's great banquet hall. A massive feast stretched the length of the table — but every dish looked gray and tasteless. \"I have the MOST food,\" Duke Grumble moaned, glumly mid-chew. \"But it tastes like NOTHING. I keep thinking about other people's desserts.\" Just then, Count Compare — a very tall giraffe in a long velvet vest — peered in, sighed, \"Mine's bigger, but it doesn't matter,\" and wandered off. Ivy looked at Oliver. Oliver looked at Ivy. They had a funny little flutter in their tummies — like maybe, just maybe, they'd seen those faces before. In a mirror. After cake.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Captain's Mirror",
            image: "/Images/book10/4.png",
            text: "Back outside in the gray town square, Ivy and Oliver were very, very quiet. \"This place is TERRIBLE,\" Ivy finally whispered. \"Everyone has so much,\" Oliver agreed, \"but they're all so SAD.\" Captain Grumble-Beard sat down heavily on a low stone wall and looked at them with surprisingly kind eyes. \"Ah, you've discovered our curse, little ones. When you whine about other people's treasure, your own becomes worthless.\" \"But we don't whine THAT much!\" Ivy protested. The Captain raised one bushy grey eyebrow. \"Don't you, now? 'Not FAIR he got the bigger piece!' 'Not FAIR she got more TV time!' 'Not FAIR! Not FAIR! Not fair!' All. Day. Long.\" He said it in EXACTLY Ivy's whine. Then EXACTLY Oliver's. Their ears went pink. Their tails drooped. They had heard those voices a LOT. From very close by. Like, from inside their own mouths.",
            choices: [
                { text: "Deny they're really like that", next: 'scene5A' },
                { text: "Admit they whine a lot", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Treasure Test",
            image: "/Images/book10/5A.png",
            text: "\"We're NOT like that!\" Ivy insisted. \"We share!\" \"Prove it,\" said the Captain, amused, leading them into a room full of glittering treasures. \"Take what you want. But remember — fighting makes it worthless.\" Ivy immediately reached for the biggest diamond. Oliver grabbed for the same one. \"I saw it first!\" \"I touched it first!\" The diamond instantly turned gray and crumbly in their hooves and claws. \"Hmm,\" the Captain said. \"Let's try again. Maybe try being HAPPY when the other finds something nice?\" Oliver picked up a beautiful red ruby. \"Oh,\" Ivy said, jealousy first. Then she forced herself: \"That's… pretty.\" The ruby glowed brighter. \"I'm… glad you found a nice one,\" Ivy said, meaning it more. The ruby BLAZED with brilliant red light. Then it was Oliver's turn — he saw Ivy pick up a shy blue sapphire. \"WOW. That one is SO YOU.\" The sapphire shone like a tiny star. Their first real magic. Together.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Hard Truth",
            image: "/Images/book10/5B.png",
            text: "Ivy's ears drooped lower. \"We… we DO whine a lot.\" \"A LOT,\" Oliver admitted. \"About everything the other one gets.\" \"And how does that make you feel?\" asked the Captain, surprisingly gently. \"Terrible,\" Ivy said. \"Even when I get what I want, I'm thinking about what Oliver got.\" \"I'm never HAPPY,\" Oliver realized. \"There's always something to whine about.\" The Captain nodded his big grizzled head. \"That, my little squabblers, is the curse. Whining about someone else's good fortune steals the joy from your own. But there's an antidote.\" \"What?\" they asked eagerly. \"Genuine happiness for OTHERS. Celebrate someone else's treasure and ALL treasure becomes more valuable.\" \"Even when Oliver gets the bigger cookie?\" Ivy asked. \"ESPECIALLY then,\" the Captain said with a kind smile. \"Joy shared grows STRONGER, not weaker.\" Outside, very faintly, a tiny edge of color crept back into one corner of the gray sky.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "Breaking the Curse",
            image: "/Images/book10/6.png",
            text: "\"Let's TRY,\" Ivy said. \"Really try.\" When Oliver found a tarnished coin, instead of wanting one too, Ivy cheered: \"WOW! That's the SHINIEST one!\" The coin blazed — and a matching one appeared at Ivy's hooves. When Ivy found a crystal that hummed a tiny song, Oliver said: \"That's so COOL! Play us a tune!\" A tiny harmonizing crystal appeared at Oliver's feet. Princess Pout learned to say \"I'm HAPPY for you!\" — her toys burst into color. Duke Grumble complimented Count Compare's vest, and his feast came back warm and delicious. Even Captain Grumble-Beard's dull trinkets started gleaming gold. \"Take these,\" he said warmly, pressing a small golden COMPASS into each of their hooves and claws. \"These point toward treasure. But I think you already know the real secret.\" They raced home through the Whispering Wood: \"I'm GLAD you're faster!\" \"I'm GLAD you remember the path!\" Even the trees seemed brighter.",
            choices: [
                { text: "Continue", next: 'scene7' }
            ]
        },
        scene7: {
            title: "The Best Treasure",
            image: "/Images/book10/7.png",
            text: "They burst through the cottage door just as Mom and Dad were reading Hazel a bedtime story. Their old selves would have whined \"NOT FAIR she gets a story!\" Instead: \"Hazel's getting a story! That's so NICE!\" Ivy said, and meant it. \"Can we help read?\" Oliver added. Soon all five were piled together — Ivy reading words, Oliver doing the funny voices, Dad doing the sound effects, Mom laughing, Hazel giggling at everything. Their compasses spun wildly, then pointed straight at the family pile. \"Found it,\" they whispered together. \"The best treasure of all.\"",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
