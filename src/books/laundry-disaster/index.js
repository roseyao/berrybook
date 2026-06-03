const book = {
    id: 'laundry-disaster',
    title: 'The Laundry Day Disaster',
    coverImage: '/Images/book3/0-cover.png',
    scenes: {
         start: {
            title: "The Laundry Day Disaster",
            image: "/Images/book3/0-intro.png",
            text: "The village's magical laundry dryer has started eating everyone's clothes! Socks, shirts, and even Ivy's favorite purple ribbon have vanished. But when Ivy and Oliver investigate, they discover the dryer isn't mean - it's just VERY hungry and lonely. Can they find a way to help their new appliance friend while saving everyone's wardrobe?",
            choices: [
                { text: "Start Adventure", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Laundry Day Disaster",
            image: "/Images/book3/1.png",
            text: "\"My favorite purple ribbon!\" Ivy cried, staring at the village's magical dryer. \"It was just here!\" BURP! The big blue dryer made a satisfied sound. A purple thread hung from its door like a noodle from a messy eater's mouth. \"That's the third thing that's disappeared today!\" Oliver said. \"First Bunny's carrots-pattern socks, then Squirrel's acorn vest, and now your ribbon!\" The dryer hummed innocently, but its door handle looked suspiciously like a smile. \"We need to investigate,\" Ivy said seriously. \"Or feed it?\" Oliver suggested, making Ivy giggle despite herself.",
            choices: [
                { text: "Investigate the dryer carefully", next: 'scene2A' },
                { text: "Try talking to the dryer", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "Detective Work",
            image: "/Images/book3/2A.png",
            text: "\"Let's examine the evidence,\" Ivy said, putting on her detective mindset. Oliver peered inside the dryer. \"It's bigger in here than outside! And look - there are tunnels!\" They found sock fuzz trails leading deeper into the dryer's magical interior. Strange munching sounds echoed from within. \"HELLO?\" Ivy called. \"Is someone in there?\" \"Mmph mmph!\" came a muffled reply. \"It sounds like someone talking with their mouth full,\" Oliver observed. \"Of clothes!\"",
            choices: [
                { text: "Venture into the dryer", next: 'scene3A' },
                { text: "Try to lure it out with food", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "Dryer Diplomacy",
            image: "/Images/book3/2B.png",
            text: "\"Hello, Mr. or Ms. Dryer?\" Oliver said politely. \"Why are you eating everyone's clothes?\" The dryer's door creaked. \"Sooooo hungry,\" a rumbly voice said. \"Been drying clothes for years... never get to keep any... always spin, spin, spin, give them back...\" \"Oh my,\" Ivy said, her frustration melting. \"You're lonely AND hungry!\" \"Dragon fire keeps me warm,\" Oliver realized, \"but what keeps YOU warm?\" \"Cozy clothes...\" the dryer admitted. \"But I know it's wrong to take them. I just... wanted something soft to hug.\"",
            choices: [
                { text: "Help find cozy things for dryer", next: 'scene3A' },
                { text: "Teach dryer to make friends", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "The Cozy Quest",
            image: "/Images/book3/3A.png",
            text: "\"What if we find you your OWN cozy things?\" Ivy suggested. \"Things no one needs!\" \"Like old blankets?\" Oliver added. \"Or mismatched socks that lost their partners?\" The dryer's door opened hopefully. \"Really? My very own soft things?\" They gathered the village. \"Everyone! Bring your old, torn, or lonely socks and blankets!\" Soon a pile of cozy cast-offs appeared. The dryer hummed with joy, gently tumbling its new treasures. \"I'll never eat proper clothes again!\" it promised. \"These are perfect!\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "Friendship Lessons",
            image: "/Images/book3/3B.png",
            text: "\"You know what's warmer than clothes?\" Oliver asked. \"Friends!\" \"But I'm just an appliance,\" the dryer said sadly. \"Who wants to be friends with a dryer?\" \"We do!\" Ivy and Oliver said together. \"And I bet others would too,\" Ivy added. \"You tell great stories while clothes tumble, you sing nice humming songs, and you're always warm and cozy!\" \"Really?\" The dryer's door brightened. \"Let's have a friendship party!\" Oliver suggested. \"Everyone can bring their laundry AND stay to chat!\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Dryer's Gift",
            image: "/Images/book3/4.png",
            text: "The dryer was so happy with its new cozy collection (or new friends) that it wanted to give back. \"I've been saving something special,\" it rumbled. Opening wide, it revealed all the missing items - but they were different! Ivy's purple ribbon now sparkled with star patterns. Bunny's socks had gained flying carrots. Squirrel's vest had grown extra pockets! \"While I held them, I added magic!\" the dryer explained. \"To say sorry and thank you!\" \"Our clothes are even better now!\" everyone cheered.",
            choices: [
                { text: "Plan a weekly cozy donation", next: 'scene5A' },
                { text: "Make dryer the village helper", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Cozy Schedule",
            image: "/Images/book3/5A.png",
            text: "\"Every week, we'll have Cozy Collection Day!\" Ivy announced. The village loved the idea. Old socks became dryer toys, worn blankets became dryer hugs, and fabric scraps became dryer snacks. \"And in return,\" the dryer promised, \"I'll add special magic to one lucky item each week!\" Oliver's cape was first - it gained the power to never get dirty! \"Best solution ever!\" Ivy laughed. \"Practical AND magical!\" The dryer hummed its happiness, finally full of both cozy things and friendship.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Village Helper",
            image: "/Images/book3/5B.png",
            text: "\"What if the dryer became our official Village Magic Helper?\" Oliver suggested. \"Yes!\" the dryer spun excitedly. \"I could enhance work clothes with energy, make blankets extra warm, add pockets to anything!\" Ivy created a special badge: \"Honorary Village Helper - Specializing in Magical Improvements!\" The dryer wore it proudly on its door. Now, instead of stealing clothes, it waited eagerly for items to improve. \"My eating problem was really a helping problem!\" the dryer realized.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Laundry Day Party",
            image: "/Images/book3/6.png",
            text: "Laundry day became the village's favorite day! Music played while clothes dried, and everyone gathered to see what magic the dryer would add. \"Remember when you ate my ribbon?\" Ivy laughed, twirling her now-sparkly one. \"I was so hungry for friends,\" the dryer admitted. \"Now I'm full of them!\" \"Sometimes the hungriest hearts just need understanding,\" Oliver said wisely. \"And silly solutions work best!\" Ivy added. The dryer hummed its happy song, surrounded by friends, full of purpose, and best of all - no longer hungry for anything but friendship.",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
