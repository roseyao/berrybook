import React, { useState, useEffect, useRef } from 'react';

// --- Data Structure for the Library ---
// This new structure can hold multiple books.
const library = {
    books: [
        {
            id: 'rainbow-berries',
            title: 'The Missing Rainbow Berries',
            coverImage: '/Images/0-BookCover.png',
            story: {
                start: {
                    title: "The Missing Rainbow Berries",
                    image: "/Images/0-Intro.png",
                    text: "Every summer, in the Whispering Woods, magical Rainbow Berries grow in every color. When they are ripe,  everyone celebrates with a festival full of treats.  Ivy the Unicorn wants everything to be perfect for the festival, and Oliver the Dragon just wants to have fun.  But the berries vanish, can Ivy and Oliver solve the problem and save the festival? ",
                    choices: [
                        { text: "Start the Adventure!", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "Discovery at the Berry Patch",
                    image: "/Images/1-Scene.png",
                    text: "\"Oh no!\" Ivy the Unicorn gasped. \"The Rainbow Berries are all gone! The festival is tomorrow!\" Oliver the Dragon bounced nearby, chasing a butterfly. \"Maybe they're playing hide and seek!\" he giggled, not really listening. Ivy stomped her hoof. \"Oliver, this is serious! Without Rainbow Berries, we can't make the special festival treats!\" \"No Berry Pie?\" Oliver suddenly stopped. \"We should do something! Should we look for clues or ask if anyone saw anything?\"",
                    choices: [
                        { text: "Look for clues", nextScene: 'scene2A' },
                        { text: "Ask forest friends", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "Following Clues",
                    image: "/Images/2A-Scene.png",
                    text: "\"Look!\" Ivy pointed at something sparkly. \"A purple scale!\" They found a glittery trail leading into the Whispering Woods. The trees looked dark and scary. \"M-maybe we should get help,\" Ivy whispered nervously. \"The trail does loop-de-loops!\" Oliver got distracted by a stick. \"Wait, where did it go?\" They needed to work together to follow the trail.",
                    choices: [
                        { text: "Take a deep breath and focus", nextScene: 'scene3A' },
                        { text: "Make noise to find the way", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "Asking Around",
                    image: "/Images/2B-Scene.png",
                    text: "Squirrel chittered: \"I saw a purple flash zoom by last night!\" Owl hooted: \"I heard munching when the moon was high. Someone was very hungry.\" Bunny bounced over: \"I found berry stems by the Crystal Cave!\" Ivy felt shy talking to everyone, but she tried her best. Oliver kept getting distracted and missing clues. \"So it's purple, hungry, and lives in a cave,\" Ivy said thoughtfully.",
                    choices: [
                        { text: "Go carefully to the cave", nextScene: 'scene3A' },
                        { text: "Rush to catch the thief", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "The Careful Approach",
                    image: "/Images/3A.png",
                    text: "Ivy took a deep breath. \"Let's be calm and quiet.\" They crept toward the Crystal Cave. Inside, they heard soft crying. \"Hello?\" Ivy called gently. \"We're not angry.\" A tiny purple dragon crawled out, rainbow berry juice on her snout. \"Please don't be mad. I was just so hungry...\" \"Oh, you poor thing!\" Their anger melted away completely.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "The Rushed Approach",
                    image: "/Images/3B.png",
                    text: "\"Let's hurry!\" Oliver shouted, making lots of noise. They stomped and crashed through the forest. A purple blur tried to hide! \"Wait!\" Ivy called. \"We just want to talk!\" A baby purple dragon tumbled out, berries rolling everywhere. \"Please don't hurt me! I didn't mean to be bad!\" \"Oh no, we scared her!\" Ivy felt terrible.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "Violet's Story",
                    image: "/Images/4.png",
                    text: "\"I'm Violet,\" the little dragon sniffled. \"I got lost in the big storm last week. I've been so scared and alone!\" She showed them a drawing of her family. \"Dragon babies need lots of food to keep our fire warm. I'm sorry I took your berries.\" \"Your family must be so worried!\" Ivy said. \"The festival is tomorrow though,\" Oliver remembered. What should they do first?",
                    choices: [
                        { text: "Help find Violet's family", nextScene: 'scene5A' },
                        { text: "Fix the berry problem", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "Finding Family First",
                    image: "/Images/5A.png",
                    text: "\"We'll help you find your family!\" Ivy decided. \"Really? After I took your berries?\" Violet's eyes sparkled with hope. They climbed the mountain, Violet on Oliver's back. Soon, two purple shapes appeared in the sky! \"MAMA! PAPA!\" Violet cried. \"Our baby!\" The dragon parents swooped down. After happy reunions, they said, \"We must repay your kindness. Dragon fire can grow berries instantly!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "Solving the Berry Problem",
                    image: "/Images/5B.png",
                    text: "\"Let's fix the berry problem first,\" Ivy decided gently. Violet showed them her stash - only half the berries were left. \"I'm so sorry.\" \"Wait!\" Ivy's horn glowed. \"Unicorn magic and dragon fire can work together! Violet, will you help?\" Working as a team, Ivy's sparkles and Violet's purple flames made new berry bushes grow instantly! \"We did it together!\" Oliver cheered. Just then two dragons swooped in yelling: “Violet!” Violet jumped with joy, “Mama, Dada!”",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Rainbow Festival",
                    image: "/Images/6.png",
                    text: "The festival was more magical than ever! Ivy directed preparations calmly. \"That crooked banner? It's perfectly imperfect!\" Oliver stayed focused on helping. \"Look! I didn't get distracted once... well, maybe once.\" Violet lit purple lanterns with her dragon fire. \"We learned that the best solutions come when we work together,\" the friends agreed, watching the twinkling lights.",
                    choices: [
                        { text: "The End - Play Again!", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'starlight-flowers',
            title: 'The Invisible Starlight Flowers',
            coverImage: '/Images/book2/0-cover.png',
            story: {
                start: {
                    title: "The Invisible Starlight Flowers",
                    image: '/Images/book2/0-intro.png',
                    text: "The Starlight Flowers that grant wishes only bloom once a year - tonight! But baby Shimmer accidentally made them invisible while playing with magic she's too young to control. Ivy and Oliver must work together (without fighting!) to find the flowers before midnight, all while taking care of an energetic baby unicorn who copies everything they do.",
                    choices: [
                        { text: "Start Adventure", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "The Baby Unicorn Arrives",
                    image: "/Images/book2/1.png",
                    text: "\"Cousin Ivy! Cousin Ivy!\" A tiny white unicorn with a silver mane bounced into the meadow, sparkles flying everywhere. \"Shimmer!\" Ivy smiled. \"Oliver and I are going to find the Starlight Flowers tonight!\" \"My grandpa told me dragon stories about those flowers,\" Oliver said excitedly. \"They only appear when the Dragon Star aligns with—\" \"I help! I help!\" Shimmer bounced, accidentally shooting sparkles that made the nearby flowers turn invisible. \"Oopsie!\" \"Oh no!\" Ivy gasped. \"The flowers! Oliver, do your dragon stories say anything about invisible flowers?\" Oliver thought hard. \"Actually... yes! We need to work together on this one!\"",
                    choices: [
                        { text: "Oliver shares his dragon knowledge", nextScene: 'scene2A' },
                        { text: "Work out a plan together", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "Dragon Wisdom",
                    image: "/Images/book2/2A.png",
                    text: "\"In dragon lore,\" Oliver began proudly, \"invisible things can be seen with Moonlight Crystals. But there's a catch—\" \"Where do we find them?\" Ivy asked, really listening instead of taking charge. \"Dragons hide them in the Crystal Grove! My mom showed me once. But unicorn magic is needed to activate them.\" \"Dragon knowledge and unicorn magic!\" Ivy smiled. \"We really do need each other!\" \"Need each other!\" Shimmer repeated, hugging them both with her tiny hooves. \"Follow me!\" Oliver said confidently. \"I know a shortcut only dragons use!\"",
                    choices: [
                        { text: "Take Oliver's dragon shortcut", nextScene: 'scene3A' },
                        { text: "Combine both their knowledge", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "Equal Planning",
                    image: "/Images/book2/2B.png",
                    text: "\"Let's figure this out together,\" Ivy suggested. \"Oliver, you mentioned dragon stories?\" \"Yes!\" Oliver's eyes lit up. \"Dragons can sense star magic. I feel something pulling me toward the old Dragon Stones.\" \"And I know a focusing spell,\" Ivy added, \"but I've never tried it on invisible things.\" \"What if we combine them?\" Oliver suggested. \"Dragon senses to find them, unicorn magic to see them?\" \"Combine! Combine!\" Shimmer cheered, accidentally making her flower crown invisible. \"That's brilliant, Oliver!\" Ivy said, making him beam with pride.",
                    choices: [
                        { text: "Visit the Dragon Stones first", nextScene: 'scene3A' },
                        { text: "Try combining magic right away", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "Oliver Leads the Way",
                    image: "/Images/book2/3A.png",
                    text: "Oliver led them through a path only dragons knew, between two boulders that looked solid but weren't. \"Wow!\" Ivy gasped. \"I never knew this was here!\" \"Dragon secret!\" Oliver said proudly. \"My dad taught me. See those scratches? They're really an ancient dragon map!\" At the Dragon Stones, Oliver touched the largest stone. It glowed with warm orange light, and suddenly they could feel where the invisible flowers were calling. \"Oliver, you're amazing!\" Ivy said. \"I could never have found this!\" \"Amazing!\" Shimmer copied, trying to touch the stone too.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "Magical Combination",
                    image: "/Images/book2/3B.png",
                    text: "\"Let's try our magic together right now,\" Oliver suggested. \"I've been practicing my control!\" He breathed a gentle, controlled flame while Ivy added her silver sparkles. Where they mixed, rainbow colors swirled. \"It's working!\" they said together. The combined magic revealed invisible flower petals floating by! But the full flowers were still hidden. \"I think we need more power,\" Ivy said. \"Oliver, what about those Dragon Stones you mentioned?\" \"And your moon crystals!\" Oliver added. \"Together they'd be super powerful!\" \"Together! Together!\" Shimmer sang, adding her chaotic sparkles.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "The Star Map Discovery",
                    image: "/Images/book2/4.png",
                    text: "At the Dragon Stones, Oliver made an exciting discovery. \"Look! When my fire lights touches these symbols, they show a map!\" The ancient stones revealed constellation patterns. Oliver's dragon instincts helped him understand them. \"This one's the Dragon Star,\" he explained, \"and this is the Unicorn constellation. They meet... here!\" \"That's brilliant!\" Ivy said. \"But it shows two meeting places.\" One path led to Starlight Peak, the other to the Whispering Waterfalls - both sacred to dragons. \"My wish is to breathe rainbow fire!\" Shimmer announced, bouncing.",
                    choices: [
                        { text: "Go to Starlight Peak", nextScene: 'scene5A' },
                        { text: "Go to Whispering Waterfalls", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "Peak Partnership",
                    image: "/Images/book2/5A.png",
                    text: "The climb was steep, but Oliver flew ahead to scout while Ivy created magical steps. \"There's a dragon wind current here!\" Oliver called. \"If you jump at just the right spot, it'll carry you up!\" \"I trust you!\" Ivy said, leaping where Oliver pointed. The wind carried her perfectly! At the peak, Oliver's dragon eyes spotted something Ivy couldn't. \"The flowers! They're hidden in the dragon cave!\" Inside, ancient dragon magic made the invisible flowers glow. But there were only two. \"Shimmer should get one,\" they both said, then Oliver added, \"Ivy, you take the other. You trusted me today.\" \"No, Oliver, your dragon knowledge saved us! You should have it.\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "Waterfall Wisdom",
                    image: "/Images/book2/5B.png",
                    text: "At the Whispering Waterfalls, Oliver's dragon hearing picked up something special. \"The water's not just whispering,\" he realized. \"It's singing in dragon language! It says the flowers are behind the falls!\" \"But how do we get through?\" Ivy wondered. Oliver grinned. \"Dragon fire can part water! But I'll need your magic to protect Shimmer from the mist.\" Working as perfect partners, Oliver's controlled flame created a tunnel through the waterfall while Ivy's magic kept them dry. Behind the falls, two flowers glowed in the mist. \"We make a great team,\" Oliver said proudly. \"The best!\" Ivy agreed.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Perfect Wish",
                    image: "/Images/book2/6.png",
                    text: "Under the starlight, they held the two glowing flowers. \"I learned something today,\" Oliver said. \"My dragon knowledge is just as important as unicorn magic.\" \"And I learned that listening to you makes everything better,\" Ivy added. \"You had the answers all along!\" \"Let's wish together,\" Oliver suggested. \"Like we did everything today.\" They held the flower together. \"We wish to always remember that we're stronger as a team!\" The flower glowed dragon-orange and unicorn-silver, then split into three! \"Sharing made more!\" Shimmer gasped. \"Like you shared today!\" As they made their wishes under the Dragon Star and Unicorn constellation, Oliver stood tall, knowing he was truly Ivy's equal partner in every adventure.",
                    choices: [
                        { text: "The End - Play Again!", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'laundry-disaster',
            title: 'The Laundry Day Disaster',
            coverImage: '/Images/book3/0-cover.png',
            story: {
                 start: {
                    title: "The Laundry Day Disaster",
                    image: "/Images/book3/0-intro.png",
                    text: "The village's magical laundry dryer has started eating everyone's clothes! Socks, shirts, and even Ivy's favorite purple ribbon have vanished. But when Ivy and Oliver investigate, they discover the dryer isn't mean - it's just VERY hungry and lonely. Can they find a way to help their new appliance friend while saving everyone's wardrobe?",
                    choices: [
                        { text: "Start Adventure", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "The Laundry Day Disaster",
                    image: "/Images/book3/1.png",
                    text: "\"My favorite purple ribbon!\" Ivy cried, staring at the village's magical dryer. \"It was just here!\" BURP! The big blue dryer made a satisfied sound. A purple thread hung from its door like a noodle from a messy eater's mouth. \"That's the third thing that's disappeared today!\" Oliver said. \"First Bunny's carrots-pattern socks, then Squirrel's acorn vest, and now your ribbon!\" The dryer hummed innocently, but its door handle looked suspiciously like a smile. \"We need to investigate,\" Ivy said seriously. \"Or feed it?\" Oliver suggested, making Ivy giggle despite herself.",
                    choices: [
                        { text: "Investigate the dryer carefully", nextScene: 'scene2A' },
                        { text: "Try talking to the dryer", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "Detective Work",
                    image: "/Images/book3/2A.png",
                    text: "\"Let's examine the evidence,\" Ivy said, putting on her detective mindset. Oliver peered inside the dryer. \"It's bigger in here than outside! And look - there are tunnels!\" They found sock fuzz trails leading deeper into the dryer's magical interior. Strange munching sounds echoed from within. \"HELLO?\" Ivy called. \"Is someone in there?\" \"Mmph mmph!\" came a muffled reply. \"It sounds like someone talking with their mouth full,\" Oliver observed. \"Of clothes!\"",
                    choices: [
                        { text: "Venture into the dryer", nextScene: 'scene3A' },
                        { text: "Try to lure it out with food", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "Dryer Diplomacy",
                    image: "/Images/book3/2B.png",
                    text: "\"Hello, Mr. or Ms. Dryer?\" Oliver said politely. \"Why are you eating everyone's clothes?\" The dryer's door creaked. \"Sooooo hungry,\" a rumbly voice said. \"Been drying clothes for years... never get to keep any... always spin, spin, spin, give them back...\" \"Oh my,\" Ivy said, her frustration melting. \"You're lonely AND hungry!\" \"Dragon fire keeps me warm,\" Oliver realized, \"but what keeps YOU warm?\" \"Cozy clothes...\" the dryer admitted. \"But I know it's wrong to take them. I just... wanted something soft to hug.\"",
                    choices: [
                        { text: "Help find cozy things for dryer", nextScene: 'scene3A' },
                        { text: "Teach dryer to make friends", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "The Cozy Quest",
                    image: "/Images/book3/3A.png",
                    text: "\"What if we find you your OWN cozy things?\" Ivy suggested. \"Things no one needs!\" \"Like old blankets?\" Oliver added. \"Or mismatched socks that lost their partners?\" The dryer's door opened hopefully. \"Really? My very own soft things?\" They gathered the village. \"Everyone! Bring your old, torn, or lonely socks and blankets!\" Soon a pile of cozy cast-offs appeared. The dryer hummed with joy, gently tumbling its new treasures. \"I'll never eat proper clothes again!\" it promised. \"These are perfect!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "Friendship Lessons",
                    image: "/Images/book3/3B.png",
                    text: "\"You know what's warmer than clothes?\" Oliver asked. \"Friends!\" \"But I'm just an appliance,\" the dryer said sadly. \"Who wants to be friends with a dryer?\" \"We do!\" Ivy and Oliver said together. \"And I bet others would too,\" Ivy added. \"You tell great stories while clothes tumble, you sing nice humming songs, and you're always warm and cozy!\" \"Really?\" The dryer's door brightened. \"Let's have a friendship party!\" Oliver suggested. \"Everyone can bring their laundry AND stay to chat!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "The Dryer's Gift",
                    image: "/Images/book3/4.png",
                    text: "The dryer was so happy with its new cozy collection (or new friends) that it wanted to give back. \"I've been saving something special,\" it rumbled. Opening wide, it revealed all the missing items - but they were different! Ivy's purple ribbon now sparkled with star patterns. Bunny's socks had gained flying carrots. Squirrel's vest had grown extra pockets! \"While I held them, I added magic!\" the dryer explained. \"To say sorry and thank you!\" \"Our clothes are even better now!\" everyone cheered.",
                    choices: [
                        { text: "Plan a weekly cozy donation", nextScene: 'scene5A' },
                        { text: "Make dryer the village helper", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "The Cozy Schedule",
                    image: "/Images/book3/5A.png",
                    text: "\"Every week, we'll have Cozy Collection Day!\" Ivy announced. The village loved the idea. Old socks became dryer toys, worn blankets became dryer hugs, and fabric scraps became dryer snacks. \"And in return,\" the dryer promised, \"I'll add special magic to one lucky item each week!\" Oliver's cape was first - it gained the power to never get dirty! \"Best solution ever!\" Ivy laughed. \"Practical AND magical!\" The dryer hummed its happiness, finally full of both cozy things and friendship.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "The Village Helper",
                    image: "/Images/book3/5B.png",
                    text: "\"What if the dryer became our official Village Magic Helper?\" Oliver suggested. \"Yes!\" the dryer spun excitedly. \"I could enhance work clothes with energy, make blankets extra warm, add pockets to anything!\" Ivy created a special badge: \"Honorary Village Helper - Specializing in Magical Improvements!\" The dryer wore it proudly on its door. Now, instead of stealing clothes, it waited eagerly for items to improve. \"My eating problem was really a helping problem!\" the dryer realized.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Laundry Day Party",
                    image: "/Images/book3/6.png",
                    text: "Laundry day became the village's favorite day! Music played while clothes dried, and everyone gathered to see what magic the dryer would add. \"Remember when you ate my ribbon?\" Ivy laughed, twirling her now-sparkly one. \"I was so hungry for friends,\" the dryer admitted. \"Now I'm full of them!\" \"Sometimes the hungriest hearts just need understanding,\" Oliver said wisely. \"And silly solutions work best!\" Ivy added. The dryer hummed its happy song, surrounded by friends, full of purpose, and best of all - no longer hungry for anything but friendship.",
                    choices: [
                        { text: "The End", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'backwards-day',
            title: 'The Day Everything Went Backwards',
            coverImage: '/Images/book4/0-cover.png',
            story: {
                start: {
                    title: "A Backwards Wish",
                    image: "/Images/book4/0-intro.png",
                    text: "When Ivy and Oliver wish on a 'backwards star' to skip school and never go to bed, their wish comes true in the siliest way possible! But as their backwards day unfolds, they discover that maybe school and bedtime aren't so bad after all... especially when the alternative is chaos!",
                    choices: [
                        { text: "Start the Adventure!", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "The Morning Grumbles",
                    image: "/Images/book4/1.png",
                    text: "\"I don't want to go to school!\" Ivy stomped her hoof. Her mane was messy from sleep, and her favorite purple backpack sat ignored in the corner. \"And I NEVER want to go to bed!\" Oliver yawned, then breathed a tiny grumpy flame. \"I want to play ALL night!\" Just then, a strange backwards-flying star zipped past their window. \"A backwards star!\" they gasped together. \"Quick, make a wish!\" \"We wish we never had to go to school or bed again!\" they shouted. The star sparkled and wrote \"HSIW DETNARG\" (WISH GRANTED backwards) in the sky.",
                    choices: [
                        { text: "Notice something feels weird", nextScene: 'scene2A' },
                        { text: "Celebrate no school", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "The Backwards Breakfast",
                    image: "/Images/book4/2A.png",
                    text: "\"Something feels... weird,\" Ivy said. Her horn tingled strangely. They went to breakfast, but everything was backwards! The cereal jumped OUT of their bowls. The milk poured UP into the jug. Even their words came out funny. \"!pleh ho hO\" (Oh oh help!) Oliver tried to say. Their mom walked in backwards. \"Time for bed, sleepyheads!\" she said cheerfully. But it was morning! \"The wish made EVERYTHING backwards!\" Ivy realized.",
                    choices: [
                        { text: "Try to fix it now", nextScene: 'scene3A' },
                        { text: "See what happens next", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "The Never-Ending Play Day",
                    image: "/Images/book4/2B.png",
                    text: "\"No school! No bedtime! Forever!\" They danced around happily. But soon, strange things started happening. The sun wouldn't move in the sky. The clock spun wildly backwards. Their friends were all... missing? \"Where is everyone?\" Ivy wondered. They flew to town and found all their friends frozen mid-yawn, stuck between awake and asleep. The teacher was frozen writing lessons backwards. Even the playground swings swung backwards! \"This isn't fun without friends,\" Oliver said sadly.",
                    choices: [
                        { text: "Try to wake their friends", nextScene: 'scene3A' },
                        { text: "Look for the backwards star", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "The School of Backwards",
                    image: "/Images/book4/3A.png",
                    text: "They tried to fix things, but without school, Ivy had forgotten her magic lessons! \"Was it sparkle-swish-point or point-sparkle-swish?\" she worried. Oliver tried to help but kept getting distracted. \"Without rest, my brain feels like fuzzy socks!\" They found themselves at their school, but it was running backwards. Kids were unlearning everything! \"1 + 1 = ?\" a student asked, then erased the answer. \"Now I don't know!\" \"This is terrible!\" Ivy cried. \"I NEED to know my magic!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "The Sleepless Sillies",
                    image: "/Images/book4/3B.png",
                    text: "As they searched for the star, they got tireder and tireder. But they couldn't sleep - that was their wish! Oliver started seeing flying pancakes. \"Are those real?\" Ivy walked into a tree. \"Sorry, tree! My eyes won't stay open!\" They realized all the night creatures were awake during day, and day creatures awake at night. Owls bumped into things! Butterflies flew in the dark! \"Everyone needs their sleep schedule,\" Ivy yawned. \"Even dragons need rest,\" Oliver agreed, his flames just tiny sparks now.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "Understanding the Chaos",
                    image: "/Images/book4/4.png",
                    text: "They found the backwards star stuck in the library clock tower, spinning wildly. \"Please!\" Ivy called. \"We understand now! School teaches us important things!\" \"And bedtime gives us energy for tomorrow's adventures!\" Oliver added. The star spun faster. \"YLLAER?\" (REALLY?) it twinkled. \"Really!\" they said together. \"School friends are the best friends! And bedtime stories! And cozy blankets! And learning new things! And dreams!\" \"We were silly to wish it all away,\" Ivy admitted.",
                    choices: [
                        { text: "Promise to try harder", nextScene: 'scene5A' },
                        { text: "Share what they learned", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "The Promise",
                    image: "/Images/book4/5A.png",
                    text: "\"If you fix everything,\" Ivy promised, \"I'll go to school and practice my magic properly!\" \"And I'll go to bed on time so I have energy for dragon games!\" Oliver added. \"But we might still be a LITTLE grumpy sometimes,\" Ivy admitted honestly. The star seemed to laugh, twinkling warmly. \"ESIMORPMOC TSRIF\" (FIRST COMPROMISE). \"What if,\" the star sparkled, \"school had more fun magic? And bedtime had better stories?\" \"DEAL!\" they shouted.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "The Lesson Shared",
                    image: "/Images/book4/5B.png",
                    text: "\"We learned that everything has a reason,\" Ivy told the star. \"School helps our brains grow strong!\" Oliver said. \"Just like sleep helps our bodies!\" \"Without routines, everything gets mixed up,\" Ivy added. \"Like owls in daytime!\" The star glowed brighter with each thing they shared. Their frozen friends started to move slightly. \"Structure helps magic work better,\" Ivy realized. \"That's why we practice!\" \"And rest helps dragons breathe better fire!\" Oliver demonstrated with a strong, healthy flame.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Right-Way-Round Day",
                    image: "/Images/book4/6.png",
                    text: "WHOOSH! Everything spun forward again. The sun moved properly. Clocks ticked normally. Their friends unfroze! \"School time!\" their teacher called cheerfully. This time, Ivy grabbed her backpack eagerly. \"I want to learn the new sparkle spell!\" Oliver packed his dragon snacks. \"With good sleep, I can focus better!\" That night, as they got ready for bed, they looked out the window. The backwards star winked at them. \"Thanks for the weird lesson,\" they whispered. \"Sweet dreams,\" their parents said, tucking them in. And you know what? They were.",
                    choices: [
                        { text: "The End", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'gratitude-goblin',
            title: 'The Day Everything Stopped',
            coverImage: '/Images/book5/0-cover.png',
            story: {
                start: {
                    title: "The Gratitude Goblin",
                    image: "/Images/book5/0-intro.png",
                    text: "Ivy and Oliver love their family, but they don't really notice all the things done for them. When a magical 'Gratitude Goblin' gets hungry and starts eating all the unnoticed acts of love, their perfect life starts falling apart. Grandma's visits, Mom's planning, the always-stocked snacks, the clean clothes - everything they take for granted begins to disappear!",
                    choices: [
                        { text: "Start the Adventure!", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "The Perfect Normal Day",
                    image: "/Images/book5/1.png",
                    text: "It was a typical morning. Grandma Hazel made dragon-shaped pancakes, but Ivy and Oliver were busy watching TV. \"Not hungry,\" Ivy said, not looking up. \"I'll eat later,\" Oliver mumbled, eyes on the screen. They grabbed their clean uniforms from drawers (who washed them?), rushed past the packed lunches (who made those?), and Mom reminded them about drama camp after school (who signed them up?). That night, a tiny creature no bigger than a grape appeared in their room. \"Yum, yum,\" it whispered. \"So many unnoticed gifts to eat!\" The Gratitude Goblin had found the perfect feeding ground.",
                    choices: [
                        { text: "Notice the goblin", nextScene: 'scene2A' },
                        { text: "Keep living normally", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "The Hungry Little Creature",
                    image: "/Images/book5/2A.png",
                    text: "\"What's that?\" Oliver squinted at the tiny purple thing. \"I'm a Gratitude Goblin!\" it chirped. \"I eat unnoticed love. And WOW, your house is a BUFFET!\" \"Unnoticed love?\" Ivy asked. \"Oh yes! Like those pancakes Grandma made that you didn't eat. MUNCH! Or that laundry that magically appears clean. CHOMP! Or those camps someone planned. GOBBLE!\" With each bite, the goblin grew bigger, and things started disappearing! \"Wait!\" Ivy cried, but the goblin was already feasting on years of taken-for-granted moments.",
                    choices: [
                        { text: "Try to stop the goblin", nextScene: 'scene3A' },
                        { text: "Watch what it eats", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "The Slow Disappearance",
                    image: "/Images/book5/2B.png",
                    text: "The next morning was weird. No breakfast smell. No clean clothes in drawers. No packed lunches. \"Mom, where's breakfast?\" Ivy called. \"Grandma, my dragon shirt isn't clean!\" Oliver whined. But no one answered. They found Grandma sitting quietly, looking confused. Mom was at her computer, but the screen was blank. \"I... I was planning something,\" Mom said vaguely. \"But I can't remember what.\" Their after-school snacks? Gone. The ice cream freezer? Empty. Their summer camp schedules? Blank paper. Something was very wrong.",
                    choices: [
                        { text: "Investigate the house", nextScene: 'scene3A' },
                        { text: "Try to remember yesterday", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "The Goblin's Feast",
                    image: "/Images/book5/3A.png",
                    text: "Following the trail of missing things, they found the Gratitude Goblin - now the size of a basketball! \"Look at my feast!\" it laughed, showing them its collection: Every uneaten special breakfast, Every unnoticed load of clean laundry, Every ignored packed lunch, Every forgotten \"thanks\" for camps and activities, Every assumed ice cream trip, Every expected snack in the cabinet. \"You never noticed,\" the goblin burped, \"so now they're MINE!\" \"But we need those things!\" Oliver protested. \"Really? You sure didn't act like it,\" the goblin grinned.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "The Memory Fog",
                    image: "/Images/book5/3B.png",
                    text: "They tried to remember all the normal things from yesterday, but everything was foggy. \"Didn't Grandma make... something?\" Ivy struggled. \"And Mom was planning... what was it?\" Oliver frowned. They found a photo album, but the pictures were fading. There was Grandma cooking - but what? There was Mom at the computer - planning what? Their drawers full - of what? A purple shadow laughed from the corner. \"Can't miss what you never noticed!\" \"We DID notice!\" Ivy insisted. But as she tried to list things, she realized... had they ever said thank you? Had they ever really looked?",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "The Realization",
                    image: "/Images/book5/4.png",
                    text: "\"Think!\" Ivy said urgently. \"What did we have yesterday that's gone today?\" They closed their eyes and really tried to remember: \"Grandma made dragon pancakes... and unicorn ones for me,\" Oliver recalled slowly. \"Mom said something about drama camp costing... wait, she PAID for that?\" Ivy's eyes widened. \"Our clothes are always clean...\" \"There's always snacks after school...\" \"Ice cream appears after dinner...\" \"Grandma ALWAYS cooks when she visits...\" \"Mom planned our WHOLE summer...\" The Gratitude Goblin stopped chewing. \"Uh oh. They're NOTICING.\"",
                    choices: [
                        { text: "Say it all out loud", nextScene: 'scene5A' },
                        { text: "Show appreciation immediately", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "The Gratitude Avalanche",
                    image: "/Images/book5/5A.png",
                    text: "\"GRANDMA!\" they ran to find her. \"We remember! You make special breakfasts EVERY morning when you visit!\" \"MOM!\" They hugged her. \"You planned our whole summer! Drama camp! Art camp! Swimming!\" They ran through the house, calling out everything: \"Thank you for ALWAYS having snacks!\" \"Thank you for clean clothes EVERY DAY!\" \"Thank you for ice cream after dinner!\" \"Thank you for packed lunches!\" With each recognition, the Gratitude Goblin shrank. \"No! My food!\" Things started reappearing - the pancake flipper, the camp schedules, the laundry detergent, the snack cabinet refilled. \"We're sorry we never noticed,\" they said, meaning it.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "The Action Plan",
                    image: "/Images/book5/5B.png",
                    text: "\"We need to SHOW them we notice!\" Ivy declared. They sprang into action: Oliver set the table for Grandma's breakfast, waiting to eat WITH her. Ivy helped sort laundry, amazed at how much there was. They looked at Mom's computer - five different camp websites open! They counted the snacks in the cabinet - \"There's like 20 kinds!\" \"Grandma,\" Oliver said at breakfast, \"these dragon pancakes are amazing. How do you make the wings?\" \"Mom,\" Ivy said, \"can you show me how you planned our summer? That must have taken forever!\" The Gratitude Goblin shrieked and shrank with every sincere word.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Visible Life",
                    image: "/Images/book5/6.png",
                    text: "From that day on, Ivy and Oliver lived in the same house, but saw it differently. \"Thanks for breakfast, Grandma,\" became their morning routine. They still didn't always finish it, but they NOTICED it. \"Mom, this camp was awesome!\" they'd report. \"Thanks for finding it!\" \"Clean uniform - yes!\" Oliver would cheer, knowing it didn't clean itself. The Gratitude Goblin? It shrunk so small it had to find another house - one where kids didn't notice their good fortune. \"You know what's weird?\" Ivy said one day. \"Nothing actually changed except us noticing.\" \"Yeah,\" Oliver agreed, munching his after-school snack. \"We always had it this good. We just... see it now.\" And they did. Every packed lunch. Every washed sock. Every planned activity. Every ice cream trip. Every single act of love.",
                    choices: [
                        { text: "The End", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'doubling-day',
            title: 'The Magic Doubling Day',
            coverImage: '/Images/book6/0-cover.png',
            story: {
                start: {
                    title: "The Magic Doubling Day",
                    image: "/Images/book6/0-intro.png",
                    text: "It's the annual Magic Doubling Day in the forest village - where sharing magically doubles joy! Ivy and Oliver are great at sharing with friends, but when it comes to sharing with EACH OTHER... that's when the fights start. \"That's MY crystal!\" \"Don't touch MY dragon game!\" When their constant fighting makes the doubling magic go backwards, they must learn that sharing with siblings is the most powerful magic of all.",
                    choices: [
                        { text: "Continue", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "The Sibling Territory War",
                    image: "/Images/book6/1.png",
                    text: "\"Tomorrow is Magic Doubling Day!\" Mayor Badger announced. \"Remember, the magic is strongest between those who love each other most!\" \"Can't wait to share with Bunny!\" Ivy said. \"And with Squirrel!\" Oliver added. Back home, Oliver reached for Ivy's new crystal. \"Can I see—\" \"NO! That's MINE!\" Ivy yanked it away. \"You'll get it dirty with your dragon claws!\" \"Fine! Then you can't play my new lava maze game!\" Oliver huffed, pulling his game box away. \"I didn't want to anyway!\" Ivy stomped to her side of the room. A strange purple shadow flickered between them, and suddenly their room felt colder.",
                    choices: [
                        { text: "Build a wall between them", nextScene: 'scene2A' },
                        { text: "Make sharing rules", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "The Great Divide",
                    image: "/Images/book6/2A.png",
                    text: "\"That's it!\" Ivy declared. \"We need a WALL!\" They hung a blanket down the middle of their room. \"Your side, my side. NO CROSSING!\" It felt good at first. Ivy arranged her crystals perfectly. Oliver played his games loudly. No sharing meant no fighting! But then... Oliver's ball rolled to Ivy's side. He couldn't get it. Ivy dropped her favorite crystal. It bounced to Oliver's side. They ate dinner in silence, backs to each other. The purple shadow grew darker, and their treasures seemed less fun alone. That night, they heard each other playing but couldn't see. It was the loneliest feeling ever.",
                    choices: [
                        { text: "Peek around the wall", nextScene: 'scene3A' },
                        { text: "Stay stubborn", nextScene: 'scene3B' }
                    ]
                },
                scene2B: {
                    title: "The Sharing Schedule",
                    image: "/Images/book6/2B.png",
                    text: "\"Mom says we need sharing rules,\" Ivy sighed. They made a schedule: \"Ivy's crystal time: 3:00-3:30\", \"Oliver's game time: 3:30-4:00\", \"NO TOUCHING each other's stuff!\" But watching the clock wasn't fun. Oliver kept asking, \"Is it 3:30 yet?\" every two minutes. Ivy couldn't enjoy her crystals knowing she had to stop soon. When Shimmer visited, she was confused. \"Why can't you just play together?\" \"Because Oliver/Ivy ruins EVERYTHING!\" they said at the same time. Shimmer's face fell. The purple shadow between them pulsed.",
                    choices: [
                        { text: "Try to include Shimmer", nextScene: 'scene3A' },
                        { text: "Stick to the schedule", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "The Shimmer Effect",
                    image: "/Images/book6/3A.png",
                    text: "\"I'll share with YOU, Shimmer,\" Ivy said, pointedly ignoring Oliver. \"Me too!\" Oliver added, glaring at Ivy. But Shimmer did something unexpected. She took Ivy's crystal and Oliver's game piece and put them together. \"Look! Dragon guarding sparkly treasure!\" For a moment, Ivy and Oliver both leaned in. \"That's actually cool...\" Oliver admitted. \"The crystal does look like treasure...\" Ivy agreed. They almost smiled at each other, then remembered they were mad. But a tiny golden spark appeared where Shimmer had combined their toys. \"Play together?\" Shimmer asked hopefully.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "The Magic Day Disaster",
                    image: "/Images/book6/3B.png",
                    text: "Magic Doubling Day arrived, but something was wrong. While other families glowed with shared joy, Ivy and Oliver's house stayed dark. They shared with friends eagerly: Ivy gave crystals to Bunny, Oliver taught Squirrel his games. But when they returned home, the purple shadow had grown HUGE. Their room was freezing cold. \"Why isn't our magic working?\" Ivy shivered. Mayor Badger appeared at their door. \"The strongest magic happens between siblings,\" he said sadly. \"But when siblings won't share, it creates... the opposite.\" The purple shadow laughed, feeding on their fighting.",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "The Shadow's Truth",
                    image: "/Images/book6/4.png",
                    text: "The purple shadow finally spoke: \"I'm the Opposite of Doubling! I grow when families don't share. And you two are my FAVORITE food!\" \"But we share!\" Ivy protested. \"Just... not with each other.\" \"Exactly!\" the shadow cackled. \"Sibling selfishness is the most delicious!\" They watched through the window as other siblings shared: Bear cubs playing with the same toy, Fox kits taking turns, Even the competitive rabbit twins sharing carrots. \"Our friends are having so much fun,\" Oliver said quietly. \"Together,\" Ivy added, her voice small. Their treasures, kept separate, looked dull and lonely compared to the golden glow outside.",
                    choices: [
                        { text: "Try sharing one thing", nextScene: 'scene5A' },
                        { text: "Apologize to each other", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "The First Share",
                    image: "/Images/book6/5A.png",
                    text: "\"Maybe...\" Ivy said slowly, \"you could hold ONE crystal. The small purple one.\" Oliver's eyes widened. \"Really? And... you could try my maze game. Just level one.\" Tentatively, they exchanged items. The moment the crystal touched Oliver's claw and the game piece touched Ivy's hoof, a BURST of golden light exploded between them! \"WHOA!\" The joy was TRIPLE what they felt sharing with friends! \"Your crystal is actually really cool!\" Oliver said, holding it up to the light. \"Your game is super creative!\" Ivy admitted, solving the first puzzle. The purple shadow shrieked and shrank. \"No! Sibling sharing is my weakness!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "The Apology Magic",
                    image: "/Images/book6/5B.png",
                    text: "\"I'm sorry,\" they both said at exactly the same time. \"I don't really think you'll ruin my crystals,\" Ivy admitted. \"And I don't think you're boring at games,\" Oliver added. With each apology, golden light grew between them: \"I'm sorry I never let you touch my things.\" \"I'm sorry I'm messy with your stuff.\" \"I'm sorry I built a wall.\" \"I'm sorry I didn't include you.\" The purple shadow screamed, shrinking with every word. \"Stop! Sibling forgiveness is too powerful!\" They looked at each other, really looked, and saw not an annoying sibling but their best friend.",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Strongest Magic",
                    image: "/Images/book6/6.png",
                    text: "With the shadow gone, Ivy and Oliver discovered the truth about Magic Doubling Day. They combined EVERYTHING: Crystals became treasure for dragon games, Games became magical with unicorn sparkles, Stories mixed dragon adventures with unicorn magic. Even their room sides merged into one amazing play space. The golden glow from their house was the brightest in the village! \"Sharing with friends is fun,\" Ivy said, teaching Oliver crystal patterns. \"But sharing with you is the BEST,\" Oliver finished, showing Ivy a new game move. Mayor Badger smiled from their doorway. \"The strongest magic isn't just sharing - it's sharing with the ones who annoy you most but love you always.\" That night, they played together until bedtime, their room glowing with the permanent golden light of sibling sharing.",
                    choices: [
                        { text: "The End", nextScene: 'start' }
                    ]
                }
            }
        },
        {
            id: 'closet-portal',
            title: 'The Closet Portal Adventure',
            coverImage: '/Images/book7/0-cover.png',
            story: {
                start: {
                    title: "The Closet Portal Adventure",
                    image: "/Images/book7/0-intro.png",
                    text: "When Ivy and Oliver get new closets built in their tree house, they discover the closets are MAGICAL PORTALS! But when Shimmer toddles into Ivy's closet and Violet flies into Oliver's closet, they disappear into different magical worlds! Now Ivy and Oliver must journey through their own closets to rescue their little friends - but the closet worlds reflect their personalities in the wildest ways!",
                    choices: [
                        { text: "Start Adventure", nextScene: 'scene1' }
                    ]
                },
                scene1: {
                    title: "The New Closets Arrive",
                    image: "/Images/book7/1.png",
                    text: "\"Your new closets are special,\" said Carpenter Beaver, wiping his brow. \"Made from Wishing Wood - very rare!\" Ivy's closet was painted purple with silver stars. Oliver's was green with orange flames. They looked perfectly normal... until the doors were closed. A soft humming came from inside. \"Did you hear that?\" Ivy asked. Just then, Shimmer toddled in. \"Pretty!\" she squealed, running toward Ivy's closet. And Violet flapped through the window. \"Ooh, warm!\" she chirped, diving toward Oliver's closet. \"WAIT!\" Ivy and Oliver shouted. But both little ones vanished inside. The closet doors slammed shut and wouldn't open!",
                    choices: [
                        { text: "Follow Ivy into her closet", nextScene: 'scene2A' },
                        { text: "Follow Oliver into his closet", nextScene: 'scene2B' }
                    ]
                },
                scene2A: {
                    title: "Ivy's Perfect Crystal Kingdom",
                    image: "/Images/book7/2A.png",
                    text: "Ivy yanked open her closet door and gasped. Instead of clothes, there was a swirling portal! \"Shimmer needs me!\" She jumped through. She landed in a world of crystal puzzles and building challenges - but everything had an \"INSTANT SOLVE\" button. Press it, and castles built themselves. Tap it, and puzzles solved instantly. No thinking, no trying, no effort needed! \"Shimmer?\" Ivy called. \"Where are you?\" She heard frustrated crying. There was Shimmer, stuck in a crystal maze with no instant button! \"Can't get out!\" Shimmer wailed. \"Too hard!\" Crystal Guides appeared. \"Why struggle? Use instant solution!\" \"But there IS no button for this!\" Ivy said. \"Then give up. If it's hard, it's not worth doing,\" they chimed. Ivy felt uncomfortable. That didn't sound right...",
                    choices: [
                        { text: "Try to solve the maze", nextScene: 'scene3A' },
                    ]
                },
                scene2B: {
                    title: "Oliver's Dragon Game Land",
                    image: "/Images/book7/2B.png",
                    text: "Oliver burst through his closet portal and found himself in a dragon's paradise of INSTANT rewards! \"CONGRATULATIONS!\" signs flashed everywhere. \"YOU WIN!\" before he even played. Treasure poured from the sky just for showing up. Every game gave prizes immediately - no waiting, no earning, just constant rewards! \"VIOLET!\" he roared, distracted by the raining gold. \"Help!\" came a tiny voice. Violet was trapped on a platform surrounded by \"instant win\" games. \"I can't get down! The only bridge appears if you save 5 golden coins, but everyone keeps spending them right away!\" Oliver looked at his hand. One golden coin! \"Just need 5?\" Oliver counted on his claws. \"One... two... three... four... FIVE!\" A shiny toy dragon appeared. \"Trade your coin for this! NOW!\" \"But I only have one,\" Oliver said. \"I need... more.\" The Game Dragons laughed. \"Why wait? Shiny toy NOW! Saving is boring!\"",
                    choices: [
                        { text: "Save coins for Violet", nextScene: 'scene3B' }
                    ]
                },
                scene3A: {
                    title: "Ivy Solves It Slowly",
                    image: "/Images/book7/3A.png",
                    text: "\"No instant button means it's impossible,\" the Crystal Guides insisted. \"No,\" Ivy said firmly. \"It means we need to THINK.\" She studied the maze. It was complex, with sliding walls and pattern locks. Her fingers itched for an easy solution, but there wasn't one. \"Come on, Shimmer. Let's work through this together. First, what do you see?\" \"Scary walls!\" Shimmer whimpered. \"Look closer. See? The walls have patterns. Star, moon, sun. What comes next?\" \"Um... star again?\" \"Yes! You're getting it!\" Ivy guided patiently. Each step took time. Some paths were dead ends. They had to backtrack, try again. The Crystal Guides watched in confusion. \"But you're... struggling. Why not quit?\" \"Because,\" Ivy said, helping Shimmer through another patient attempt, \"the best things take effort. Real solving isn't instant.\" After many tries, they solved it! Shimmer bounced out, beaming. \"We did it! Hard but WE DID IT!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene3B: {
                    title: "Oliver Learns to Wait",
                    image: "/Images/book7/3B.png",
                    text: "Oliver almost traded his coin for the toy - then stopped. \"But Violet needs 5 coins...\" \"Don't wait!\" a Game Dragon tempted. \"Shiny toy NOW!\" Oliver squeezed his coin. The toy was SO cool. But Violet looked SO scared. \"How do I get more coins?\" he asked. \"Win games! Here's one coin!\" They gave him another. Now he had 2! \"Two!\" Oliver counted proudly. A sparkly ball appeared. \"Trade 2 coins for this!\" \"No... need 5 for Violet.\" He played another game. \"Three!\" A light-up sword appeared. \"Only 3 coins!\" Oliver looked at Violet. \"Sorry sword. Still need more.\" He won another coin. \"Four! Almost there!\" The BEST toy appeared - a dragon that breathed bubbles! \"Trade 4 coins NOW!\" Oliver's hands shook. He wanted it SO MUCH. But... \"One more for Violet.\" When he got 5 coins, the bridge appeared! Violet flew into his arms! \"You waited for me!\" she cried. \"Even with the bubble dragon!\"",
                    choices: [
                        { text: "Continue", nextScene: 'scene4' }
                    ]
                },
                scene4: {
                    title: "The Closet Crossover",
                    image: "/Images/book7/4.png",
                    text: "Back in their room, Ivy and Oliver tumbled out of their closets at the same time - but they weren't alone! Ivy came out with Shimmer AND a reformed Crystal Guide who wanted to learn about \"effort and patience.\" Oliver emerged with Violet AND a Game Dragon who was amazed by \"the power of waiting.\" \"Our closets connected!\" they realized. \"My world was full of instant solutions,\" Ivy said, still thinking. \"No one wanted to try if it was hard.\" \"And mine was all instant rewards!\" Oliver said. \"No one saved for anything important!\" Their mom called: \"Kids! I bought ice cream for dessert, but if you eat it now, we won't have any for movie night tomorrow!\" Old Oliver would have wanted it NOW. But he looked at Violet and remembered waiting for 100 coins. \"Let's save it for movie night,\" he said, surprising everyone. \"It'll be more special tomorrow.\" Ivy smiled. \"And I'll practice my piano now, even though it's not instantly fun.\" The Crystal Guide and Game Dragon exchanged notes: \"Delayed gratification... makes rewards sweeter?\"",
                    choices: [
                        { text: "Keep the portals secret", nextScene: 'scene5A' },
                        { text: "Share with friends", nextScene: 'scene5B' }
                    ]
                },
                scene5A: {
                    title: "The Secret Club",
                    image: "/Images/book7/5A.png",
                    text: "\"This should be our secret,\" Ivy whispered. \"Our special place!\" They made a pact with Shimmer and Violet - the Closet Portal Club! Every week they'd explore together. They discovered: A Backwards World where you walked on ceilings, A Bubble World where everything bounced, A Music World where every step made a note. \"Best secret ever!\" Violet giggled, now brave enough for any adventure. \"Closet club! Closet club!\" Shimmer chanted. Their new closets weren't just for clothes - they were doorways to infinite adventures!",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene5B: {
                    title: "The Portal Playdate",
                    image: "/Images/book7/5B.png",
                    text: "\"Let's invite everyone!\" Oliver said excitedly. Soon their room was full of friends, each discovering their perfect closet world: Bunny found Garden World with infinite carrots, Squirrel discovered Acorn Palace, Even Mayor Badger found Organized Office World! The closets created a portal for each visitor based on their dreams! \"This is amazing!\" everyone cheered. But the best part was when portals mixed - Bunny's gardens grew in Dragon Land, Oliver's games appeared in Crystal Kingdom. Everyone's worlds became richer by sharing!",
                    choices: [
                        { text: "Continue", nextScene: 'scene6' }
                    ]
                },
                scene6: {
                    title: "The Perfect Closets",
                    image: "/Images/book7/6.png",
                    text: "That night, Carpenter Beaver returned to check on his work. \"How are the closets?\" he asked with a knowing wink. \"They showed us what we needed to learn,\" Ivy said, organizing her closet properly. \"Mine taught me that instant and easy isn't always better.\" \"And mine showed me that waiting makes things more special,\" Oliver added. \"I saved 5 whole coins for Violet! One, two, three, four, FIVE!\" The Game Dragon had given Oliver a special coin jar with numbers on it. \"For your world. When you want something NOW, count how many you need to save!\" Violet nodded. \"Oliver didn't buy the bubble dragon even though he REALLY wanted it!\" \"That must have been hard,\" Beaver said. \"SO hard,\" Oliver admitted, still counting on his claws. \"But saving Violet was better than any toy!\" As they fell asleep, their closets hummed softly. Through Oliver's portal, Dragon Game Land was transforming - dragons were learning to count and save coins instead of spending them right away. Because the best treasures - like helping friends - are worth waiting for, even if you can only count to five!",
                    choices: [
                        { text: "The End", nextScene: 'start' }
                    ]
                }
            }
        }
    ]
};

// --- UI Components ---

const SoundIcon = ({ isLoading, isPlaying }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        {isLoading ? <path d="M21.5 2v6h-6M2.5 22v-6h6M2 12h2a8 8 0 0 1 16 0h2" className="animate-spin origin-center" /> : isPlaying ? <rect x="6" y="6" width="12" height="12"></rect> : <polygon points="5 3 19 12 5 21 5 3"></polygon>}
    </svg>
);

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <div className="p-3 my-4 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm"><strong>Error:</strong> {message}</div>;
};

// --- New Component for the Bookshelf ---
const BookSelection = ({ books, onSelectBook }) => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Choose a Story</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map(book => (
                    <div key={book.id} className="cursor-pointer group" onClick={() => onSelectBook(book.id)}>
                        <div className="rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                            <img src={book.coverImage} alt={book.title} className="w-full h-auto object-cover" />
                        </div>
                        <h2 className="mt-4 text-center text-lg font-semibold text-slate-700 group-hover:text-purple-600">{book.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- New Component for Viewing a Single Story ---
const StoryViewer = ({ book, onExit }) => {
    const [currentScene, setCurrentScene] = useState(() => {
        // On initial load, try to get the saved scene for this specific book
        return localStorage.getItem(`storybook-scene-${book.id}`) || 'start';
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const audioRef = useRef(null);
    const userStoppedPlayback = useRef(false);

    const storyData = book.story;
    const scene = storyData[currentScene];

    const stopPlayback = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            if (audio.src && audio.src.startsWith('blob:')) URL.revokeObjectURL(audio.src);
            audio.oncanplaythrough = null;
            audio.onended = null;
            audio.onerror = null;
            audio.src = '';
        }
        setIsPlaying(false);
        setIsLoading(false);
    };

    useEffect(() => {
        // When the component unmounts (e.g., exiting book), clean up audio
        return () => stopPlayback();
    }, []);

    const handleReadAloud = async (textToRead) => {
        setErrorMessage('');
        if (isPlaying || isLoading) {
            userStoppedPlayback.current = true;
            stopPlayback();
            return;
        }
        
        userStoppedPlayback.current = false;
        setIsLoading(true);

        try {
            const response = await fetch('/.netlify/functions/generate-audio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textToRead }),
            });
            if (!response.ok) throw new Error(await response.text() || `Request failed with status ${response.status}`);
            const data = await response.json();
            const audioBytes = atob(data.audio);
            const audioBuffer = new Uint8Array(audioBytes.length);
            for (let i = 0; i < audioBytes.length; i++) audioBuffer[i] = audioBytes.charCodeAt(i);
            const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = audioRef.current;
            audio.src = audioUrl;

            audio.oncanplaythrough = async () => {
                try {
                    await audio.play();
                    setIsLoading(false);
                    setIsPlaying(true);
                } catch (playError) {
                    setErrorMessage(`Playback failed: ${playError.message}.`);
                    stopPlayback();
                }
            };

            audio.onended = () => {
                stopPlayback();
            };

            audio.onerror = (e) => {
                if (userStoppedPlayback.current) {
                    userStoppedPlayback.current = false; // Reset flag
                    return; // Don't show an error if the user stopped it.
                }
                console.error("Audio playback error:", e.target.error);
                setErrorMessage('An error occurred while trying to play the audio.');
                stopPlayback();
            };
        } catch (error) {
            setErrorMessage(error.message || "An unknown error occurred.");
            setIsLoading(false);
        }
    };

    const handleChoice = (nextScene) => {
        stopPlayback();
        setErrorMessage('');
        if (storyData[nextScene]) {
            // Save the new scene to localStorage for this book
            localStorage.setItem(`storybook-scene-${book.id}`, nextScene);
            setCurrentScene(nextScene);
        } else {
            // If the scene doesn't exist, it's an error or the end. Go back to start.
            localStorage.removeItem(`storybook-scene-${book.id}`);
            setCurrentScene('start');
        }
    };

    return (
        <div>
            <div className="w-full">
                <img src={scene.image} alt={scene.title} className="w-full h-auto" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/fecaca/9ca3af?text=Image+Not+Found'; }} />
            </div>
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-left flex-1 mr-4">{scene.title}</h1>
                    <button onClick={() => handleReadAloud(scene.text)} disabled={isLoading} className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isPlaying ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'} ${isLoading ? 'bg-slate-400 cursor-not-allowed' : ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                        <SoundIcon isLoading={isLoading} isPlaying={isPlaying} />
                        {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Read'}
                    </button>
                </div>
                <ErrorMessage message={errorMessage} />
                <p className="text-slate-600 text-base md:text-lg leading-relaxed my-6 text-center">{scene.text}</p>
                <div className="flex flex-col items-center space-y-4">
                    {scene.choices.map((choice, index) => (
                        <button key={index} onClick={() => handleChoice(choice.nextScene)} className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300">
                            {choice.text}
                        </button>
                    ))}
                    {/* Add a button to go back to the library */}
                    <button onClick={onExit} className="mt-4 text-sm text-slate-500 hover:text-purple-600">
                        &larr; Back to Library
                    </button>
                </div>
            </div>
            <audio ref={audioRef} />
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    // On initial load, try to get the last selected book ID from localStorage
    const [selectedBookId, setSelectedBookId] = useState(() => {
        return localStorage.getItem('storybook-selectedBookId') || null;
    });

    const handleSelectBook = (bookId) => {
        // When a book is selected, save its ID to localStorage
        localStorage.setItem('storybook-selectedBookId', bookId);
        setSelectedBookId(bookId);
    };

    const handleExitBook = () => {
        // When exiting, clear the saved book and scene for that book
        if (selectedBookId) {
            localStorage.removeItem(`storybook-scene-${selectedBookId}`);
        }
        localStorage.removeItem('storybook-selectedBookId');
        setSelectedBookId(null);
    };

    const selectedBook = selectedBookId ? library.books.find(b => b.id === selectedBookId) : null;

    return (
        <div className="bg-slate-100 font-sans min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out">
                {selectedBook ? (
                    <StoryViewer book={selectedBook} onExit={handleExitBook} />
                ) : (
                    <BookSelection books={library.books} onSelectBook={handleSelectBook} />
                )}
            </div>
        </div>
    );
}
