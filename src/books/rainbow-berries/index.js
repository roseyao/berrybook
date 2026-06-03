const book = {
    id: 'rainbow-berries',
    title: 'The Missing Rainbow Berries',
    coverImage: '/Images/book1/0-cover.png',
    scenes: {
        start: {
            title: "The Berry Festival",
            image: "/Images/book1/0-intro.png",
            text: "Every summer in the Whispering Woods, magical Rainbow Berries grew in every color you could imagine — and the whole village threw a giant festival full of berry treats. \"Tomorrow's the BIG day!\" Ivy the unicorn beamed, already arranging tiny berry-shaped lanterns in perfectly straight rows. \"I cannot WAIT to taste-test the pies!\" Oliver the dragon added, bouncing on his tail. \"Pies, jams, juice, jellies, JUICE again — all of it!\" Ivy laughed. \"You're doing the taste-testing for everyone, huh?\" \"Someone has to,\" Oliver said seriously. They headed off toward the Rainbow Berry patch to bring back the first basket. And the moment they got there… something was very, very wrong.",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "Discovery at the Berry Patch",
            image: "/Images/book1/1.png",
            text: "\"Oh no!\" Ivy the Unicorn gasped. \"The Rainbow Berries are all gone! The festival is tomorrow!\" Oliver the Dragon bounced nearby, chasing a butterfly. \"Maybe they're playing hide and seek!\" he giggled, not really listening. Ivy stomped her hoof. \"Oliver, this is serious! Without Rainbow Berries, we can't make the special festival treats!\" \"No Berry Pie?\" Oliver suddenly stopped. \"We should do something! Should we look for clues or ask if anyone saw anything?\"",
            choices: [
                { text: "Look for clues", next: 'scene2A' },
                { text: "Ask forest friends", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "Following Clues",
            image: "/Images/book1/2A.png",
            text: "\"Look!\" Ivy pointed at something sparkly. \"A purple scale!\" They found a glittery trail leading into the Whispering Woods. The trees looked dark and scary. \"M-maybe we should get help,\" Ivy whispered nervously. \"The trail does loop-de-loops!\" Oliver got distracted by a stick. \"Wait, where did it go?\" They needed to work together to follow the trail.",
            choices: [
                { text: "Take a deep breath and focus", next: 'scene3A' },
                { text: "Make noise to find the way", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "Asking Around",
            image: "/Images/book1/2B.png",
            text: "Squirrel chittered: \"I saw a purple flash zoom by last night!\" Owl hooted: \"I heard munching when the moon was high. Someone was very hungry.\" Bunny bounced over: \"I found berry stems by the Crystal Cave!\" Ivy felt shy talking to everyone, but she tried her best. Oliver kept getting distracted and missing clues. \"So it's purple, hungry, and lives in a cave,\" Ivy said thoughtfully.",
            choices: [
                { text: "Go carefully to the cave", next: 'scene3A' },
                { text: "Rush to catch the thief", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "The Careful Approach",
            image: "/Images/book1/3A.png",
            text: "Ivy took a deep breath. \"Let's be calm and quiet.\" They crept toward the Crystal Cave. Inside, they heard soft crying. \"Hello?\" Ivy called gently. \"We're not angry.\" A tiny purple dragon crawled out, rainbow berry juice on her snout. \"Please don't be mad. I was just so hungry...\" \"Oh, you poor thing!\" Their anger melted away completely.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "The Rushed Approach",
            image: "/Images/book1/3B.png",
            text: "\"Let's hurry!\" Oliver shouted, making lots of noise. They stomped and crashed through the forest. A purple blur tried to hide! \"Wait!\" Ivy called. \"We just want to talk!\" A baby purple dragon tumbled out, berries rolling everywhere. \"Please don't hurt me! I didn't mean to be bad!\" \"Oh no, we scared her!\" Ivy felt terrible.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "Violet's Story",
            image: "/Images/book1/4.png",
            text: "\"I'm Violet,\" the little dragon sniffled. \"I got lost in the big storm last week. I've been so scared and alone!\" She showed them a drawing of her family. \"Dragon babies need lots of food to keep our fire warm. I'm sorry I took your berries.\" \"Your family must be so worried!\" Ivy said. \"The festival is tomorrow though,\" Oliver remembered. What should they do first?",
            choices: [
                { text: "Help find Violet's family", next: 'scene5A' },
                { text: "Fix the berry problem", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "Finding Family First",
            image: "/Images/book1/5A.png",
            text: "\"We'll help you find your family!\" Ivy decided. \"Really? After I took your berries?\" Violet's eyes sparkled with hope. They climbed the mountain, Violet on Oliver's back. Soon, two purple shapes appeared in the sky! \"MAMA! PAPA!\" Violet cried. \"Our baby!\" The dragon parents swooped down. After happy reunions, they said, \"We must repay your kindness. Dragon fire can grow berries instantly!\"",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "Solving the Berry Problem",
            image: "/Images/book1/5B.png",
            text: "\"Let's fix the berry problem first,\" Ivy decided gently. Violet showed them her stash - only half the berries were left. \"I'm so sorry.\" \"Wait!\" Ivy's horn glowed. \"Unicorn magic and dragon fire can work together! Violet, will you help?\" Working as a team, Ivy's sparkles and Violet's purple flames made new berry bushes grow instantly! \"We did it together!\" Oliver cheered. Just then two dragons swooped in yelling: “Violet!” Violet jumped with joy, “Mama, Dada!”",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Rainbow Festival",
            image: "/Images/book1/6.png",
            text: "The festival was more magical than ever! Ivy directed preparations calmly. \"That crooked banner? It's perfectly imperfect!\" Oliver stayed focused on helping. \"Look! I didn't get distracted once... well, maybe once.\" Violet lit purple lanterns with her dragon fire. \"We learned that the best solutions come when we work together,\" the friends agreed, watching the twinkling lights.",
            choices: [
                { text: "The End - Play Again!", next: 'start' }
            ]
        }
    }
};

export default book;
