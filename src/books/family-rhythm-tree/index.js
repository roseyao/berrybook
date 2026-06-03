const book = {
    id: 'family-rhythm-tree',
    title: 'The Family Rhythm Tree',
    coverImage: '/Images/book9/0-cover.png',
    scenes: {
        start: {
            title: "A New Note Tonight",
            image: "/Images/book9/0-intro.png",
            text: "In the corner of Ivy and Oliver's cottage garden stood the most magical tree in the whole village — the Rhythm Tree. Its branches always hummed with their family's song: three warm notes for Mom, two for Dad, one sparkly note for Ivy, and one bouncy flame-pop for Oliver. Hum-hum-hum… da-da… ting… POP! \"I love our song,\" Ivy said. \"POP is the best part,\" Oliver agreed, doing his bounciest flame-note dance. Just then Mom stepped onto the porch with a tired, happy smile. \"Big news, you two. Tonight, your baby sister is coming home. Her name is Hazel.\" Ivy gasped. Oliver's tail did a tiny worried wiggle. \"Will the tree know her note?\" Ivy whispered. Mom smiled. \"Trees this old? They always do.\"",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "Hazel Comes Home",
            image: "/Images/book9/1.png",
            text: "That night, the front door swung open. \"We're home!\" called Mom. Tucked in Dad's arms was a tiny pink bundle — baby Hazel. Her little horn glowed warm and gold, like a nightlight. \"She's so LITTLE,\" Ivy whispered. \"Can I breathe her a teeny flame?\" Oliver asked. The smallest flame he had ever made flickered, and Hazel's eyes opened right at him. \"She SAW me!\" Oliver gasped. By the very next morning, things felt different. Mom was tired in a new way. Dad rushed everywhere. The house had a brand new cry in it. And out in the backyard, the Rhythm Tree had gone strangely QUIET.",
            choices: [
                { text: "Ask the tree what changed", next: 'scene2A' },
                { text: "Stay close to Mom and Hazel", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Jumbled Song",
            image: "/Images/book9/2A.png",
            text: "\"Why did you go quiet?\" Ivy asked the tree. The tree hummed softly and showed them something new — a tiny, round PINK note floating gently among the others. Bloop. \"That's Hazel's note!\" Ivy said. But the other notes weren't playing in order anymore. Mom's three gold notes kept playing at strange times — sometimes in the middle of the night. Dad's silver notes hurried. Ivy's sparkly note felt smaller. Oliver's flame-pop kept popping out of turn. \"Everything is JUMBLED!\" Oliver frowned. The tree hummed back warmly. The notes were out of order — but the love in them sounded exactly the same. Strong, steady, and sure.",
            choices: [
                { text: "Continue", next: 'balloon' }
            ]
        },
        scene2B: {
            title: "Meeting Baby Hazel",
            image: "/Images/book9/2B.png",
            text: "Inside, Mom sat in the big chair with Hazel curled against her chest. \"Come meet her properly,\" Mom said softly. Hazel was IMPOSSIBLY small — tiny pink hooves, the littlest horn-glow. Something big and warm filled Ivy's chest. \"I love her already,\" she whispered. Oliver leaned in too. But then Hazel opened her mouth and — WAAAAAH! — let out the loudest cry the cottage had ever heard. Mom stood right up to walk her. Oliver's bouncy tail drooped. \"Oh,\" he said quietly. \"She kind of takes Mom WITH her, doesn't she?\" A little balloon-feeling started growing in Oliver's tummy — one he didn't have a name for yet.",
            choices: [
                { text: "Continue", next: 'balloon' }
            ]
        },
        balloon: {
            title: "Oliver's Big Balloon",
            image: "/Images/book9/3A.png",
            text: "By day three, Oliver was having the WORST day. He threw his breakfast. He said NO to everything. He knocked over Ivy's block tower on PURPOSE. \"OLIVER!\" everyone said. But inside Oliver, something kept growing bigger and bigger — like a balloon about to pop. He stomped to the Rhythm Tree and whacked the trunk with a stick. The tree didn't get angry. Instead, it played just HIS note — warm, steady, bright. POP. POP. POP. \"That's mine,\" Oliver said, surprised. \"It's still there.\" He sat down against the trunk. The balloon let out a tiny bit of air, very quietly: \"I miss Mom. Even when she's right there… I miss her.\" The tree played his orange note and Mom's gold note side by side, glowing softly together.",
            choices: [
                { text: "Continue", next: 'shrinking' }
            ]
        },
        shrinking: {
            title: "Ivy's Shrinking Note",
            image: "/Images/book9/3B.png",
            text: "Meanwhile, Ivy had decided to be SO good that everything would feel normal again. She folded laundry. She spoke in whispers. She never complained. She tried to take up the very smallest amount of space. \"What a wonderful helper!\" everyone said. But the Rhythm Tree noticed something. Ivy's sparkly note was floating very small and dim. That afternoon, Ivy crept to the tree alone. \"I'm fine,\" she told it. The tree played her note back — FULL and bright and clear. \"I said I'm FINE,\" Ivy repeated. Ting! Warm and patient and waiting. Ivy's lip wobbled. \"I love Hazel. I really do. But I also miss how it used to be sometimes. Is that bad?\" The tree played all five notes together — and Ivy's was just as bright as ever. \"My note didn't get smaller,\" she realized. \"I just stopped PLAYING it.\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "Two Kids at the Tree",
            image: "/Images/book9/4.png",
            text: "That evening, Ivy and Oliver both ended up back at the Rhythm Tree without meaning to. \"I came out here because I was MAD,\" Oliver mumbled. \"I came out here because I was trying SO HARD not to be sad,\" Ivy admitted. They looked at each other. And then, just a tiny bit, they laughed. \"My tummy has a balloon in it,\" Oliver said. \"Mom feels far away even when she's right there.\" \"My note went small,\" Ivy said. \"I thought there wasn't room for it anymore.\" Inside the cottage, Hazel was crying. Mom looked tired. Dad was washing dishes. \"We have to tell them, don't we,\" Ivy whispered. Oliver's balloon got tight again. \"What if I just… POP instead?\"",
            choices: [
                { text: "Tell Mom and Dad now", next: 'scene5A' },
                { text: "Hold it in just a little longer", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Honest Words",
            image: "/Images/book9/5A.png",
            text: "Oliver tugged Mom's sleeve. \"I have a big feeling,\" he said. Mom set down what she was doing immediately. \"Tell me.\" \"I just want YOU, the way it used to be. Even when Hazel needs you. The balloon in my tummy gets so big I almost pop.\" Mom knelt down right there. \"Oh, sweet boy. That feeling makes complete sense.\" She wrapped him up close. \"I think about you every single day. ESPECIALLY when you're having tantrums — that's when you need love the most.\" On the porch, Ivy whispered to Dad, \"I love Hazel. But I miss when it was just us. Is that allowed?\" \"That,\" said Dad, \"is one of the most honest things I've ever heard. Both feelings can be true at the same time.\"",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Balloon Pops",
            image: "/Images/book9/5B.png",
            text: "Oliver held the balloon in. So did Ivy. At dinner, Oliver's cup had a TINY bit less juice than Ivy's. Just a tiny bit. \"NOT FAIR!\" Oliver exploded, knocking his cup right over. Then crying — the biggest, loudest cry the cottage had ever heard. Mom looked exhausted. Dad knelt down. \"Oliver. Tell me why.\" \"…I just want SNUGGLES,\" Oliver wailed into Dad's chest. \"And Mom is always with Hazel.\" And then Ivy — perfect, helpful Ivy — burst into tears too, surprising herself. \"I don't even know why I'm CRYING!\" \"It's okay,\" Dad said softly. \"Tell us. We're listening.\" Two big feelings, finally out in the open.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The New Song",
            image: "/Images/book9/6.png",
            text: "Mom sat right down on the floor — not a normal Mom thing to do — and pulled Ivy and Oliver both in close. Dad sat down too. Hazel slept against Mom's shoulder. \"My love for you is not like a cookie that gets smaller when you share it,\" Mom said. \"It's like the Rhythm Tree — it just grows new branches.\" \"But how do we GET you when we need you?\" Oliver asked. \"Two magic phrases,\" Mom said. \"'I need a hug.' Or 'Can I have five minutes?' I will ALWAYS stop for those.\" \"Always,\" Dad echoed. From the backyard, the Rhythm Tree played its new song: Hum-hum-hum… da-da… ting… pop… BLOOP. Five notes. Fuller than before. \"That's what love does,\" Dad said quietly. \"It just makes more room.\"",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
