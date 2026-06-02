const book = {
    id: 'little-light',
    title: 'The New Little Light',
    coverImage: '/Images/book8/0-cover.png',
    scenes: {
        start: {
            title: "A Baby Is Coming",
            image: "/Images/book8/0-intro.png",
            text: "\"Big news!\" Mom smiled, resting her hooves on her round tummy. \"Soon, you two are going to have a baby sister.\" \"A real little sister? In OUR family?\" Ivy's whole face lit up. \"A... baby?\" Oliver's bounce went a little wobbly. \"Will she cry a lot? Will she take my stuff?\" Mom laughed softly, then yawned a big yawn. \"So many questions, sweet boy. And yes — Mom's extra tired. Growing a baby is big work. That's why I need so many naps now.\" Ivy gently patted the tummy. Oliver pressed his ear against it, just a little nervous. \"Helloooo in there...\" Two big kids. One tiny sister on the way. Everything was about to change.",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Long Wait",
            image: "/Images/book8/1.png",
            text: "Every day, Mom's tummy grew rounder, and Mom grew more tired. She napped on the comfy couch while Dad cooked dinner. \"When will the baby come?\" Ivy asked, for about the hundredth time. She could hardly wait. \"Soon,\" said Dad. \"Babies come when they're ready — not a moment sooner.\" Oliver chewed his claw. \"What if I'm not ready?\" he mumbled. Then, louder: \"Should we... DO something while we wait?\" \"Yes!\" said Ivy. \"We could get her room all ready... or we could find out what babies are even like!\"",
            choices: [
                { text: "Get the nursery ready", next: 'scene2A' },
                { text: "Find out what babies are like", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "Getting Ready",
            image: "/Images/book8/2A.png",
            text: "They tiptoed into the little nursery. Ivy lined up the tiny socks just so and smoothed the soft blanket. \"Let's make it really cozy for her!\" Oliver tried to help — and toppled the whole stack of diapers. \"Oopsie.\" Then he went quiet, hugging his old, worn dragon plushie. \"Ivy... this used to be MY playroom. And this was MY baby blanket.\" His tail drooped. \"What if there's no room left for ME?\" Ivy nudged him gently with her nose. \"There's ALWAYS room for you, Oliver. You're going to be her big brother.\" Just then, Mom's voice rang out — \"Kids! It's time! The baby is coming!\"",
            choices: [
                { text: "Be brave and wave goodbye", next: 'scene3A' },
                { text: "Feel sad that Mom is leaving", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "What Babies Are Like",
            image: "/Images/book8/2B.png",
            text: "\"Grandma Quinn, what are babies even LIKE?\" Oliver asked. Grandma chuckled. \"Oh, babies are wonderful. They're also very loud. They cry — a LOT. Day and night.\" \"Cry a lot?\" Oliver gulped. \"And the diapers,\" Grandma added with a wink, \"are very, VERY stinky.\" A worried little knot tied itself in Oliver's tummy. \"Loud AND stinky? And she'll need Mom and Dad all the time... what about me?\" Grandma pulled him close. \"It's alright to feel unsure, my dear. Big feelings are always allowed.\" Just then — \"Kids! It's time! The baby is coming!\"",
            choices: [
                { text: "Be brave and wave goodbye", next: 'scene3A' },
                { text: "Feel sad that Mom is leaving", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "The Big Wait",
            image: "/Images/book8/3A.png",
            text: "Mom and Dad hurried off to the hospital. \"We'll be gone two whole sleeps,\" Mom promised, \"and then we'll bring her home to you.\" Ivy waved as bravely as she could. \"We've got this, Oliver.\" To pass the two days, Grandma Quinn kept them busy. They painted a giant WELCOME banner, baked a wobbly cake, and counted the sleeps on hooves and claws. \"One sleep... and two sleeps!\" \"I miss Mom already,\" Oliver said in a small voice. \"Me too,\" said Ivy, giving him a nuzzle. \"But she's coming back — and she's bringing our sister.\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "Missing Mom",
            image: "/Images/book8/3B.png",
            text: "The house felt big and quiet without Mom and Dad. At bedtime, Ivy's chin wobbled and she felt very sad and homesick. \"I miss Mom SO much,\" she said in a small voice. \"Two whole days is forever!\" This time it was Oliver who scooted close. \"It's okay to be sad, Ivy. I miss her too.\" He gave her his bravest smile. Grandma Quinn tucked them both in and held them tight. \"Your mom and dad could never, EVER forget you. Their hearts just grew a little bigger — big enough to hold one more.\" She kissed their foreheads. \"Two sleeps, and your whole family comes home.\" Ivy let out a long breath and snuggled close to her brother.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "She's Here!",
            image: "/Images/book8/4.png",
            text: "The front door swung open. \"We're home!\" called Mom. Tucked in Dad's arms was a tiny bundle. Ivy and Oliver crept closer. Their baby sister was the littlest unicorn they had ever seen — a fluffy little pink pony with a rosy mane and a tiny horn that glowed warm, like a little nightlight. When she yawned, gentle golden sparkles drifted up. \"And look,\" said Mom. \"She brought a present for each of her big siblings.\" Dad held out a shiny medal stamped BIG BROTHER for Oliver, and a sparkly star charm that said BIG SISTER for Ivy. \"She... got US presents?\" Oliver blinked. Then — WAAAAAH! Her cry filled the house, and Oliver's nose crinkled. \"PHEW! And THAT is one seriously stinky diaper!\" Dad laughed. \"Welcome to the family. Want to help, big brother and big sister?\"",
            choices: [
                { text: "Jump in and help", next: 'scene5A' },
                { text: "Tell Mom and Dad how you feel", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Helpers",
            image: "/Images/book8/5A.png",
            text: "\"We'll help!\" said Ivy. Even Oliver took a deep breath and fetched a fresh diaper. \"For you, little sister... anything. Well — almost anything.\" Ivy hummed the same soft lullaby Mom used to hum to her, and the baby's cries melted into tiny hiccups. Then Oliver pulled his silliest dragon face — crossed eyes, puffed cheeks — and the baby gave her very first tiny smile! Warm sparkles fizzed all around her glowing horn. \"Did you SEE that? She smiled at ME!\" Oliver lit up brighter than her little horn. \"Helping isn't always easy,\" Ivy said, rocking her gently, \"but it sure does feel good.\"",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "Sharing Mom and Dad",
            image: "/Images/book8/5B.png",
            text: "That night, the baby needed Mom AND Dad at the very same time. Oliver waited... and waited. The worried little knot came right back. \"Nobody has time for ME anymore,\" he mumbled. Dad heard. He scooped Oliver up onto his big dragon knee. \"Come here, big guy. Love isn't a treasure pile that runs out when you share it. Love GROWS. There's a whole new piece — just for you.\" Right then, the fussing baby turned toward the sound of Oliver's voice... and went calm and quiet. \"Look at that,\" Mom smiled. \"She already knows her big brother.\" Ivy leaned in. \"And her big sister!\" And just like that, Oliver's knot melted clean away.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "A Little More Love",
            image: "/Images/book8/6.png",
            text: "Their family was a lot busier now. Yes, the baby cried. Yes, the diapers were stinky. And yes — they had to share Mom and Dad. But when the whole family curled up together at the end of the day, their baby sister glowed her very, very brightest, her little horn warm as a nightlight, and everyone felt cozy and full. \"Being a big sister is the most important job I've ever had,\" said Ivy proudly. Oliver hugged his BIG BROTHER medal. \"And I'm not scared anymore. Being a big brother is even better than dragon games. Don't tell the dragon games.\" Their family had grown by one tiny light — and their hearts had grown right along with her, with room to spare.",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
