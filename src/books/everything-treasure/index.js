const book = {
    id: 'everything-treasure',
    title: 'The Everything Treasure',
    coverImage: '/Images/book10/0-cover.png',
    scenes: {
        start: {
            title: "The \"Not Fair\" Family",
            image: "/Images/book10/0-intro.png",
            text: "Ivy and Oliver had a problem. Not a tiny problem. A LOUD problem. \"Not FAIR!\" Ivy said when Oliver got the bigger pancake. \"Not FAIR!\" Oliver said when Ivy got the window seat. \"Not FAIR! Not FAIR! NOT FAIR!\" they whined about everything, from the popsicles to the storybooks to who Hazel smiled at first. Mom sighed her tiredest sigh. \"What's our rule about whining?\" \"No whining,\" they mumbled — and then kept right on whining. But the cottage walls had been listening. And on the wall behind a picture frame, something old and dusty began to glow… A real, actual treasure map was about to fall right into their afternoon. And before the day was over, they'd meet a grumpy pirate bear who knew EXACTLY what to do about kids who couldn't stop saying \"not fair.\"",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Not Fair Festival",
            image: "/Images/book10/1.png",
            text: "\"It's NOT FAIR!\" Ivy whined as Oliver got the bigger popsicle. \"You always get the better one!\" Oliver whined back, even though his was perfectly good. \"NOT FAIR you got more TV time!\" Ivy added in her whiniest voice. \"NOT FAIR you got the corner piece of cake!\" Oliver whined louder. Mom sighed her tiredest sigh. \"What's our rule about whining?\" \"No whining,\" they mumbled, but kept going. \"NOT FAIR! NOT FAIR! NOT FAIR!\" they whined together about everything. Just then, a dusty old map fell from behind a picture frame. It showed a path through the Whispering Wood to something marked \"ULTIMATE TREASURE — WARNING: CURSED IF FOUGHT OVER.\" \"Real treasure!\" they gasped, temporarily stopping their whining. \"Maybe we'll FINALLY get something fair!\" Ivy declared. \"Without any whining about who gets what!\" Oliver agreed. They snuck out while Mom was busy with Hazel, already planning how to split their treasure without fighting.",
            choices: [
                { text: "Follow the map immediately, plans be darned", next: 'scene2A' },
                { text: "Plan how to split the treasure first", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Greed Path",
            image: "/Images/book10/2A.png",
            text: "They rushed into the forest, each secretly planning to grab the biggest share. \"I should get more because I'm OLDER!\" Ivy thought. \"I should get more because I'm SMALLEST!\" Oliver thought. The map led them out of the Whispering Wood and to the gates of a gloomy little kingdom where everyone looked miserable despite having lots of stuff. \"Welcome to the Complaint Kingdom!\" announced Captain Grumble-Beard, a big grizzled bear pirate covered in dull, lifeless treasures that clinked sadly when he moved. \"Here, everyone gets exactly what they deserve based on their complaints!\" \"Perfect!\" Ivy and Oliver said together. The Captain raised one bushy grey eyebrow, almost like he was hiding a tiny smile, and waved them inside. \"Then welcome, my whiny little friends. Right this way.\"",
            choices: [
                { text: "Look around for Princess Pout's treasure first", next: 'scene3A' },
                { text: "Follow the smell of the royal feast", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "The Planning Session",
            image: "/Images/book10/2B.png",
            text: "\"Let's be SMART about this,\" Ivy said. \"We need rules for fair splitting.\" \"I get first pick because I FOUND the map!\" Oliver declared. \"I get first pick because I can READ the map!\" Ivy countered. They spent a whole hour arguing about fairness while the map glowed strangely in the sunlight. \"FINE! We'll take turns!\" Ivy finally said. \"But what if there's an odd number of treasures?\" Oliver worried. \"Then we'll… we'll…\" They looked at each other, realizing they were already fighting over treasure they hadn't even FOUND yet! The map's glow grew brighter, almost like it was laughing. \"Maybe we should just go find it first?\" Oliver suggested. But they were both already secretly planning how to get the better half. By the time they finally reached the gates of the Complaint Kingdom, a grizzled bear pirate was waiting with one bushy grey eyebrow raised. \"Took you long enough, my little squabblers. Right this way.\"",
            choices: [
                { text: "Look around for Princess Pout's treasure first", next: 'scene3A' },
                { text: "Follow the smell of the royal feast", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "Princess Pout and the Joyless Toys",
            image: "/Images/book10/3A.png",
            text: "Captain Grumble-Beard led them down a gray cobblestone street to a small, slumped castle. \"This here is Princess Pout,\" he announced, \"richest little princess in the whole kingdom.\" Princess Pout, a tiny fox in a slightly tarnished crown, sat on the floor surrounded by literal MOUNTAINS of toys. Stuffed animals, dolls, blocks, kites — piled to the ceiling. But everything was gray. And dull. And… not fun. \"I have the MOST toys,\" Princess Pout sighed. \"But they're no fun. I keep thinking about what the kids in the next kingdom have.\" \"How many toys do you have?\" Ivy asked, doing the math. \"All of them,\" Princess Pout said sadly. \"And you're STILL not happy?\" Oliver gasped. The Princess shook her tarnished crown. \"There's always one more I don't have yet.\" Ivy looked at Oliver. Oliver looked at Ivy. They had a funny little flutter in their tummies — like maybe, just maybe, they'd seen that face before. In a mirror. After cake.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "Duke Grumble's Tasteless Feast",
            image: "/Images/book10/3B.png",
            text: "Captain Grumble-Beard led them past gloomy gray houses and through a great hall, where a massive feast was laid out on a long table. \"This here is Duke Grumble,\" the Captain announced. \"Has the finest food in the whole kingdom.\" Duke Grumble was a very large bear in a tarnished noble's collar, glumly chewing on a roast. Plates of cake, pies, dumplings, and roast vegetables stretched the length of the table. But everything looked gray. Even the cake. Even the gravy. \"I have the MOST food,\" Duke Grumble moaned, around a mouthful. \"But it tastes like NOTHING. Because I keep thinking about other people's desserts.\" \"All of THIS tastes like nothing?\" Oliver gasped, staring at the feast. \"All of it.\" Duke Grumble pushed a plate away mournfully. Just then, Count Compare — a very tall giraffe in a long velvet vest — wandered in, peered jealously at the Duke's pile, sighed, \"Mine's bigger, but it doesn't matter,\" and wandered out again. Ivy and Oliver had that funny tummy-flutter again. They might, possibly, just barely, have once whined a tiny bit about cake portions.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Captain's Mirror",
            image: "/Images/book10/4.png",
            text: "Back outside in the gray town square, Ivy and Oliver were very, very quiet. \"This place is TERRIBLE,\" Ivy finally whispered. \"Everyone has so much,\" Oliver agreed, \"but they're all so SAD.\" Captain Grumble-Beard sat down heavily on a low stone wall and looked at them with surprisingly kind eyes. \"Ah, you've discovered our curse, little ones. When you whine about other people's treasure, your own becomes worthless. When you fight over good things, they lose their magic.\" \"But we don't whine THAT much!\" Ivy protested. The Captain raised one bushy grey eyebrow. \"Don't you, now? 'Not FAIR he got the bigger piece!' 'Not FAIR she got more TV time!' 'Not FAIR! Not FAIR! Not fair!' All. Day. Long.\" He said it in EXACTLY Ivy's whine. Then EXACTLY Oliver's whine. Ivy and Oliver looked at each other. Their ears went pink. Their tails drooped. They had heard those voices a LOT. From very close by. Like, from inside their own mouths.",
            choices: [
                { text: "Deny they're really like that", next: 'scene5A' },
                { text: "Admit they whine a lot", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Treasure Test",
            image: "/Images/book10/5A.png",
            text: "\"We're NOT like that!\" Ivy insisted. \"We share!\" \"Prove it,\" said the Captain, amused, leading them into a room full of glittering treasures. \"Take what you want. But remember — fighting makes it worthless.\" Ivy immediately reached for the biggest diamond. Oliver grabbed for the same one. \"I saw it first!\" Ivy declared. \"I touched it first!\" Oliver shot back. The diamond instantly turned gray and crumbly in their hooves and claws. \"Hmm,\" the Captain said. \"Let's try again. This time, maybe try being HAPPY when the other finds something nice?\" They approached a chest of rubies. Oliver picked up a beautiful red stone. \"Oh,\" Ivy said, her first instinct being jealousy. Then she forced herself to add, \"That's… pretty.\" The ruby glowed a little brighter. \"I'm… glad you found a nice one,\" Ivy said, meaning it more. The ruby BLAZED with brilliant red light! Oliver gasped. Then it was his turn. Ivy found a glowing blue sapphire and lifted it shyly. Oliver took a big dragon breath and said, \"WOW. That one is so YOU.\" The sapphire shone like a tiny little star. Their first real magic. Together.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Hard Truth",
            image: "/Images/book10/5B.png",
            text: "Ivy's ears drooped lower. \"We… we DO whine a lot.\" \"A LOT,\" Oliver admitted. \"About everything the other one gets.\" \"And how does that make you feel?\" asked the Captain, surprisingly gently. \"Terrible,\" Ivy said. \"Even when I get what I want, I'm thinking about what Oliver got.\" \"I'm never HAPPY,\" Oliver realized. \"There's always something to whine about.\" The Captain nodded his big grizzled head. \"That, my little squabblers, is the curse. Whining about someone else's good fortune steals the joy from your own. But there's an antidote…\" \"What?\" they asked eagerly. \"Genuine happiness for others. When you truly celebrate someone else's treasure, ALL treasure becomes more valuable.\" \"Even when Oliver gets the bigger cookie?\" Ivy asked. \"ESPECIALLY then,\" the Captain said with a kind smile. \"Joy shared grows STRONGER, not weaker.\" Ivy and Oliver sat very still and let that sink in. Outside, very faintly, a tiny edge of color crept back into one corner of the gray sky.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "Breaking the Curse, Finding the Real Treasure",
            image: "/Images/book10/6.png",
            text: "\"Let's TRY,\" Ivy said. \"Really try.\" They practiced right there in the gray town square. When Oliver found a tarnished golden coin in the cobblestones, instead of wanting one too, Ivy cheered: \"WOW! That's the SHINIEST one!\" The coin blazed with light — and a matching one appeared at Ivy's hooves. When Ivy found a crystal that hummed a tiny song, Oliver said: \"That's SO cool! Play us a tune!\" The crystal's music grew sweeter, and a tiny harmonizing crystal appeared at Oliver's feet. They spent the whole afternoon helping the kingdom. Princess Pout learned to say \"I'm happy for YOU!\" instead of \"I want THAT!\" Her toys burst into brilliant colors. Duke Grumble complimented Count Compare's vest, and his feast came back vibrant and delicious. Even Captain Grumble-Beard's dull trinkets started gleaming gold. \"Take these,\" he said warmly, pressing a small golden COMPASS into each of their hooves and claws. \"These point toward treasure. But I think you already know the real secret.\" They raced home through the Whispering Wood, practicing the whole way: \"I'm GLAD you're faster!\" \"I'm GLAD you remember the path!\" Even the trees seemed brighter. They burst through the cottage door just as Mom and Dad were reading baby Hazel a bedtime story. Their old selves would have whined \"NOT FAIR she gets a story!\" Instead: \"Hazel's getting a story! That's so NICE!\" Ivy said, and meant it. \"Can we help read?\" Oliver added. Soon all five were piled together — Ivy reading words, Oliver doing the funny voices, Dad doing the sound effects, Mom laughing, Hazel giggling at everything. Their compasses spun wildly, then pointed straight at the family pile. \"Found it,\" they whispered together. \"The best treasure of all.\"",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
