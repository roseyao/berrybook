const book = {
    id: 'backwards-day',
    title: 'The Day Everything Went Backwards',
    coverImage: '/Images/book4/0-cover.png',
    scenes: {
        start: {
            title: "A Backwards Wish",
            image: "/Images/book4/0-intro.png",
            text: "When Ivy and Oliver wish on a 'backwards star' to skip school and never go to bed, their wish comes true in the siliest way possible! But as their backwards day unfolds, they discover that maybe school and bedtime aren't so bad after all... especially when the alternative is chaos!",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Morning Grumbles",
            image: "/Images/book4/1.png",
            text: "\"I don't want to go to school!\" Ivy stomped her hoof. Her mane was messy from sleep, and her favorite purple backpack sat ignored in the corner. \"And I NEVER want to go to bed!\" Oliver yawned, then breathed a tiny grumpy flame. \"I want to play ALL night!\" Just then, a strange backwards-flying star zipped past their window. \"A backwards star!\" they gasped together. \"Quick, make a wish!\" \"We wish we never had to go to school or bed again!\" they shouted. The star sparkled and wrote \"HSIW DETNARG\" (WISH GRANTED backwards) in the sky.",
            choices: [
                { text: "Notice something feels weird", next: 'scene2A' },
                { text: "Celebrate no school", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Backwards Breakfast",
            image: "/Images/book4/2A.png",
            text: "\"Something feels... weird,\" Ivy said. Her horn tingled strangely. They went to breakfast, but everything was backwards! The cereal jumped OUT of their bowls. The milk poured UP into the jug. Even their words came out funny. \"!pleh ho hO\" (Oh oh help!) Oliver tried to say. Their mom walked in backwards. \"Time for bed, sleepyheads!\" she said cheerfully. But it was morning! \"The wish made EVERYTHING backwards!\" Ivy realized.",
            choices: [
                { text: "Try to fix it now", next: 'scene3A' },
                { text: "See what happens next", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "The Never-Ending Play Day",
            image: "/Images/book4/2B.png",
            text: "\"No school! No bedtime! Forever!\" They danced around happily. But soon, strange things started happening. The sun wouldn't move in the sky. The clock spun wildly backwards. Their friends were all... missing? \"Where is everyone?\" Ivy wondered. They flew to town and found all their friends frozen mid-yawn, stuck between awake and asleep. The teacher was frozen writing lessons backwards. Even the playground swings swung backwards! \"This isn't fun without friends,\" Oliver said sadly.",
            choices: [
                { text: "Try to wake their friends", next: 'scene3A' },
                { text: "Look for the backwards star", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "The School of Backwards",
            image: "/Images/book4/3A.png",
            text: "They tried to fix things, but without school, Ivy had forgotten her magic lessons! \"Was it sparkle-swish-point or point-sparkle-swish?\" she worried. Oliver tried to help but kept getting distracted. \"Without rest, my brain feels like fuzzy socks!\" They found themselves at their school, but it was running backwards. Kids were unlearning everything! \"1 + 1 = ?\" a student asked, then erased the answer. \"Now I don't know!\" \"This is terrible!\" Ivy cried. \"I NEED to know my magic!\"",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "The Sleepless Sillies",
            image: "/Images/book4/3B.png",
            text: "As they searched for the star, they got tireder and tireder. But they couldn't sleep - that was their wish! Oliver started seeing flying pancakes. \"Are those real?\" Ivy walked into a tree. \"Sorry, tree! My eyes won't stay open!\" They realized all the night creatures were awake during day, and day creatures awake at night. Owls bumped into things! Butterflies flew in the dark! \"Everyone needs their sleep schedule,\" Ivy yawned. \"Even dragons need rest,\" Oliver agreed, his flames just tiny sparks now.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "Understanding the Chaos",
            image: "/Images/book4/4.png",
            text: "They found the backwards star stuck in the library clock tower, spinning wildly. \"Please!\" Ivy called. \"We understand now! School teaches us important things!\" \"And bedtime gives us energy for tomorrow's adventures!\" Oliver added. The star spun faster. \"YLLAER?\" (REALLY?) it twinkled. \"Really!\" they said together. \"School friends are the best friends! And bedtime stories! And cozy blankets! And learning new things! And dreams!\" \"We were silly to wish it all away,\" Ivy admitted.",
            choices: [
                { text: "Promise to try harder", next: 'scene5A' },
                { text: "Share what they learned", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Promise",
            image: "/Images/book4/5A.png",
            text: "\"If you fix everything,\" Ivy promised, \"I'll go to school and practice my magic properly!\" \"And I'll go to bed on time so I have energy for dragon games!\" Oliver added. \"But we might still be a LITTLE grumpy sometimes,\" Ivy admitted honestly. The star seemed to laugh, twinkling warmly. \"ESIMORPMOC TSRIF\" (FIRST COMPROMISE). \"What if,\" the star sparkled, \"school had more fun magic? And bedtime had better stories?\" \"DEAL!\" they shouted.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Lesson Shared",
            image: "/Images/book4/5B.png",
            text: "\"We learned that everything has a reason,\" Ivy told the star. \"School helps our brains grow strong!\" Oliver said. \"Just like sleep helps our bodies!\" \"Without routines, everything gets mixed up,\" Ivy added. \"Like owls in daytime!\" The star glowed brighter with each thing they shared. Their frozen friends started to move slightly. \"Structure helps magic work better,\" Ivy realized. \"That's why we practice!\" \"And rest helps dragons breathe better fire!\" Oliver demonstrated with a strong, healthy flame.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Right-Way-Round Day",
            image: "/Images/book4/6.png",
            text: "WHOOSH! Everything spun forward again. The sun moved properly. Clocks ticked normally. Their friends unfroze! \"School time!\" their teacher called cheerfully. This time, Ivy grabbed her backpack eagerly. \"I want to learn the new sparkle spell!\" Oliver packed his dragon snacks. \"With good sleep, I can focus better!\" That night, as they got ready for bed, they looked out the window. The backwards star winked at them. \"Thanks for the weird lesson,\" they whispered. \"Sweet dreams,\" their parents said, tucking them in. And you know what? They were.",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
