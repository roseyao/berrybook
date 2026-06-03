const book = {
    id: 'family-rhythm-tree',
    title: 'The Family Rhythm Tree',
    coverImage: '/Images/book9/0-cover.png',
    scenes: {
        start: {
            title: "Every Family Has a Song",
            image: "/Images/book9/0-intro.png",
            text: "Every family has a song. Some families sing theirs in the car. Some hum theirs at bedtime. Ivy and Oliver's family was lucky — theirs lived in their backyard. In the corner of their cottage garden stood the most magical tree in the whole village: the Rhythm Tree. Ancient and wise, its branches always hummed with their family's song — a colored note for every heart at home. Hum-hum-hum… da-da… ting… pop! \"That's Mom, Dad, me, and Oliver,\" Ivy explained proudly. \"POP is the best part,\" Oliver added, doing his bounciest flame-note dance. Just then Mom stepped onto the porch with a tired, happy smile. \"Big news, you two. Tonight, your baby sister is coming home. Her name is Hazel.\" Ivy gasped. Oliver's tail did a tiny worried wiggle. \"Will the tree know her note?\" Ivy whispered. Mom smiled. \"Trees this old? They always do.\"",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Old Song",
            image: "/Images/book9/1.png",
            text: "In the backyard of their forest cottage stood the most magical tree in the whole village. The Rhythm Tree was ancient and wise, its branches always humming with the family's song. Ivy knew the song by heart. Three notes for Mom, two for Dad, one bright sparkly note for her, and one bouncy flame note for Oliver. Hum-hum-hum… da-da… ting… pop! \"I love our song,\" Ivy said, leaning against its trunk after school. \"Me too!\" Oliver agreed, doing his bouncy flame note dance. But that night, everything changed. Baby Hazel came home. The Rhythm Tree went quiet.",
            choices: [
                { text: "Ask the tree what changed", next: 'scene2A' },
                { text: "Go inside to see baby Hazel", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Jumbled Song",
            image: "/Images/book9/2A.png",
            text: "\"Why did you go quiet?\" Ivy asked the tree. The tree hummed softly and showed them something new — a tiny, soft, round pink note floating gently among the others. Bloop. \"That's Hazel's note!\" Ivy said. But the notes weren't playing in order anymore. Mom's three notes kept playing at strange times — sometimes in the middle of the night. Dad's notes rushed and hurried. Ivy's sparkly note felt smaller. Oliver's flame note kept popping out of turn. \"Everything is jumbled!\" Oliver frowned. The tree hummed back warmly: \"New rhythms take time. But listen carefully… do the love notes sound different?\" They listened hard. And no — the love notes were exactly the same. Strong and steady and sure.",
            choices: [
                { text: "Oliver stomps off feeling angry", next: 'scene3A' },
                { text: "Ivy tries to fix the song", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "Meeting Baby Hazel",
            image: "/Images/book9/2B.png",
            text: "Inside the cottage, Mom sat in the big chair with a tiny pink bundle. \"Come meet Hazel,\" Mom said softly. Baby Hazel was impossibly small. Her little pink horn was barely a nub. She made the tiniest sounds. \"She's so little,\" Ivy whispered, feeling something big and warm in her chest. \"Can I breathe a tiny flame near her?\" Oliver asked hopefully. \"Just a very tiny one,\" Dad said. Oliver breathed the gentlest flame he'd ever made. Hazel's eyes flickered open, looking right at him. \"She saw me!\" Oliver gasped. But that night, when Hazel cried and everything changed, a big feeling started growing in Oliver's tummy that he couldn't name.",
            choices: [
                { text: "Oliver wanders off feeling something big", next: 'scene3A' },
                { text: "Ivy decides to be the perfect helper", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "Oliver's Big Balloon",
            image: "/Images/book9/3A.png",
            text: "By day three, Oliver was having the WORST day. He threw his breakfast. He said NO to everything. He knocked over Ivy's block tower on purpose. \"OLIVER!\" everyone said. But inside Oliver, something kept growing bigger and bigger, like a balloon about to pop. He went to the Rhythm Tree and hit it with a stick. The tree didn't get angry. Instead, it played just his note — warm and steady and bright. Pop! \"That's my note,\" Oliver said, surprised. \"It's still there.\" The tree played it again and again, just for him. Oliver sat down against the trunk and finally let the balloon feeling out quietly: \"I miss Mom. Even when she's right there, I miss her.\" The tree played something new — his note and Mom's note together, intertwined and beautiful.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "Ivy's Shrinking Note",
            image: "/Images/book9/3B.png",
            text: "Ivy decided to be SO good that everything would feel normal again. She helped with laundry. She spoke in whispers. She never complained. She made sure to take up as little space as possible. \"What a wonderful helper!\" everyone said. But the Rhythm Tree noticed something. Ivy's sparkly note had gone very very small, like it was trying not to take up space. One afternoon, while Mom napped with Hazel, Ivy crept to the tree alone. \"I'm fine,\" she told it. The tree played her note back. Ting! Full and bright and clear. \"I said I'm FINE,\" Ivy repeated. Ting! Warm and patient and waiting. Ivy's lip wobbled. \"I love Hazel. I really do. But I also miss how it used to be sometimes. Is that bad?\" The tree answered by playing all five notes together — and Ivy's note was just as bright and clear as ever. \"My note didn't get smaller,\" she realized. \"I just stopped playing it.\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "Two Kids at the Tree",
            image: "/Images/book9/4.png",
            text: "That evening, both Ivy and Oliver ended up back at the Rhythm Tree without meaning to. \"I came out here because I was MAD,\" Oliver mumbled. \"I came out here because I was trying SO HARD not to be sad,\" Ivy admitted. They looked at each other. And then, just a tiny bit, they laughed. \"My tummy has a balloon in it,\" Oliver said. \"Mom feels far away even when she's right there.\" \"My note went small,\" Ivy said. \"I thought there wasn't room for it anymore.\" Inside the cottage, Hazel was crying. Mom looked tired. Dad was washing dishes. The Rhythm Tree played its jumbled new song — five notes still finding their order. \"We have to tell Mom and Dad, don't we?\" Ivy whispered. Oliver's balloon got tight again. \"What if I just… pop instead?\"",
            choices: [
                { text: "Tell Mom and Dad now", next: 'scene5A' },
                { text: "Hold it in just a little longer", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Honest Feelings",
            image: "/Images/book9/5A.png",
            text: "Oliver found Mom in the kitchen and tugged her sleeve. \"I have a big feeling,\" he said, remembering what the tree showed him. Mom put down what she was doing immediately. \"Tell me.\" \"I just want YOU to play with me how you used to — playgrounds and adventures and morning snuggles. Even when Hazel needs you.\" Mom knelt down right there. \"Oh Oliver. That feeling makes complete sense.\" She hugged him for a long time. \"I think about you every single day. Your laugh. Your silly self. I love you always.\" \"Even during tantrums?\" he asked into her neck. \"ESPECIALLY during tantrums. That's when you need love the most.\" And Ivy found Dad on the porch. \"I love Hazel… but I also miss when it was just us. Is that okay to feel?\" \"That's one of the most honest things I've ever heard,\" Dad said, pulling her close. \"Both feelings can be true at the same time.\" From the backyard, the Rhythm Tree played all five notes — fuller and richer than ever before.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Big Explosion",
            image: "/Images/book9/5B.png",
            text: "Oliver kept his balloon feeling inside for three more days. Then at dinner, his cup had less juice than Ivy's. Just a tiny bit less. \"NOT FAIR!\" he exploded, knocking the whole cup over. Then screaming. Then the biggest tantrum in the history of tantrums. Mom, exhausted, tried to stay calm. Dad stepped in. \"Oliver. Why did you do that?\" \"THE JUICE!\" Oliver screamed. Then more quietly: \"…the juice.\" Then very, very quietly: \"…I just want snuggles and Mom's always feeding Hazel.\" There it was. The real feeling. Small and scared and true. And Ivy, who had been perfectly helpful for two weeks, suddenly burst into tears for no reason at pizza night. \"I don't even know why I'm crying!\" she sobbed. \"It's okay, tell us,\" Dad said. Two unexploded balloons. Finally out in the open.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "Mom's Answer & The New Song",
            image: "/Images/book9/6.png",
            text: "Mom appeared in the hallway, Hazel asleep in her arms. Her eyes were tired but full of something else — deep, endless, unbreakable love. She sat right down on the floor, which was not a normal Mom thing to do. \"Come here. Both of you.\" Oliver scrambled into her side. Ivy folded in carefully on the other. \"My love for you is not like a cookie that gets smaller when you share it,\" Mom said. \"It's like the Rhythm Tree — it just grows new branches.\" \"But how do we get you when we need you?\" Oliver asked. \"Simple. Just say: 'I need a hug' or 'Can I have five minutes?' Those are magic words in our family. I will always, always stop for those.\" \"Always?\" Oliver checked. \"Always,\" Mom and Dad said together. Things didn't become perfect overnight. But Oliver started saying his big feelings before they exploded. Ivy let herself be six — loud, silly, full-sized. And from the backyard, the Rhythm Tree played its new song: Hum-hum-hum… da-da… ting… pop… bloop. Five notes. Fuller than before. \"That's what love does,\" Dad said quietly. \"It just makes more room.\"",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
