const book = {
    id: 'gratitude-goblin',
    title: 'The Day Everything Stopped',
    coverImage: '/Images/book5/0-cover.png',
    scenes: {
        start: {
            title: "The Gratitude Goblin",
            image: "/Images/book5/0-intro.png",
            text: "Ivy and Oliver love their family, but they don't really notice all the things done for them. When a magical 'Gratitude Goblin' gets hungry and starts eating all the unnoticed acts of love, their perfect life starts falling apart. Grandma's visits, Mom's planning, the always-stocked snacks, the clean clothes - everything they take for granted begins to disappear!",
            choices: [
                { text: "Start the Adventure!", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Perfect Normal Day",
            image: "/Images/book5/1.png",
            text: "It was a typical morning. Grandma Quinn made dragon-shaped pancakes, but Ivy and Oliver were busy watching TV. \"Not hungry,\" Ivy said, not looking up. \"I'll eat later,\" Oliver mumbled, eyes on the screen. They grabbed their clean uniforms from drawers (who washed them?), rushed past the packed lunches (who made those?), and Mom reminded them about drama camp after school (who signed them up?). That night, a tiny creature no bigger than a grape appeared in their room. \"Yum, yum,\" it whispered. \"So many unnoticed gifts to eat!\" The Gratitude Goblin had found the perfect feeding ground.",
            choices: [
                { text: "Notice the goblin", next: 'scene2A' },
                { text: "Keep living normally", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Hungry Little Creature",
            image: "/Images/book5/2A.png",
            text: "\"What's that?\" Oliver squinted at the tiny purple thing. \"I'm a Gratitude Goblin!\" it chirped. \"I eat unnoticed love. And WOW, your house is a BUFFET!\" \"Unnoticed love?\" Ivy asked. \"Oh yes! Like those pancakes Grandma made that you didn't eat. MUNCH! Or that laundry that magically appears clean. CHOMP! Or those camps someone planned. GOBBLE!\" With each bite, the goblin grew bigger, and things started disappearing! \"Wait!\" Ivy cried, but the goblin was already feasting on years of taken-for-granted moments.",
            choices: [
                { text: "Try to stop the goblin", next: 'scene3A' },
                { text: "Watch what it eats", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "The Slow Disappearance",
            image: "/Images/book5/2B.png",
            text: "The next morning was weird. No breakfast smell. No clean clothes in drawers. No packed lunches. \"Mom, where's breakfast?\" Ivy called. \"Grandma, my dragon shirt isn't clean!\" Oliver whined. But no one answered. They found Grandma sitting quietly, looking confused. Mom was at her computer, but the screen was blank. \"I... I was planning something,\" Mom said vaguely. \"But I can't remember what.\" Their after-school snacks? Gone. The ice cream freezer? Empty. Their summer camp schedules? Blank paper. Something was very wrong.",
            choices: [
                { text: "Investigate the house", next: 'scene3A' },
                { text: "Try to remember yesterday", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "The Goblin's Feast",
            image: "/Images/book5/3A.png",
            text: "Following the trail of missing things, they found the Gratitude Goblin - now the size of a basketball! \"Look at my feast!\" it laughed, showing them its collection: Every uneaten special breakfast, Every unnoticed load of clean laundry, Every ignored packed lunch, Every forgotten \"thanks\" for camps and activities, Every assumed ice cream trip, Every expected snack in the cabinet. \"You never noticed,\" the goblin burped, \"so now they're MINE!\" \"But we need those things!\" Oliver protested. \"Really? You sure didn't act like it,\" the goblin grinned.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "The Memory Fog",
            image: "/Images/book5/3B.png",
            text: "They tried to remember all the normal things from yesterday, but everything was foggy. \"Didn't Grandma make... something?\" Ivy struggled. \"And Mom was planning... what was it?\" Oliver frowned. They found a photo album, but the pictures were fading. There was Grandma cooking - but what? There was Mom at the computer - planning what? Their drawers full - of what? A purple shadow laughed from the corner. \"Can't miss what you never noticed!\" \"We DID notice!\" Ivy insisted. But as she tried to list things, she realized... had they ever said thank you? Had they ever really looked?",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Realization",
            image: "/Images/book5/4.png",
            text: "\"Think!\" Ivy said urgently. \"What did we have yesterday that's gone today?\" They closed their eyes and really tried to remember: \"Grandma made dragon pancakes... and unicorn ones for me,\" Oliver recalled slowly. \"Mom said something about drama camp costing... wait, she PAID for that?\" Ivy's eyes widened. \"Our clothes are always clean...\" \"There's always snacks after school...\" \"Ice cream appears after dinner...\" \"Grandma ALWAYS cooks when she visits...\" \"Mom planned our WHOLE summer...\" The Gratitude Goblin stopped chewing. \"Uh oh. They're NOTICING.\"",
            choices: [
                { text: "Say it all out loud", next: 'scene5A' },
                { text: "Show appreciation immediately", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The Gratitude Avalanche",
            image: "/Images/book5/5A.png",
            text: "\"GRANDMA!\" they ran to find her. \"We remember! You make special breakfasts EVERY morning when you visit!\" \"MOM!\" They hugged her. \"You planned our whole summer! Drama camp! Art camp! Swimming!\" They ran through the house, calling out everything: \"Thank you for ALWAYS having snacks!\" \"Thank you for clean clothes EVERY DAY!\" \"Thank you for ice cream after dinner!\" \"Thank you for packed lunches!\" With each recognition, the Gratitude Goblin shrank. \"No! My food!\" Things started reappearing - the pancake flipper, the camp schedules, the laundry detergent, the snack cabinet refilled. \"We're sorry we never noticed,\" they said, meaning it.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Action Plan",
            image: "/Images/book5/5B.png",
            text: "\"We need to SHOW them we notice!\" Ivy declared. They sprang into action: Oliver set the table for Grandma's breakfast, waiting to eat WITH her. Ivy helped sort laundry, amazed at how much there was. They looked at Mom's computer - five different camp websites open! They counted the snacks in the cabinet - \"There's like 20 kinds!\" \"Grandma,\" Oliver said at breakfast, \"these dragon pancakes are amazing. How do you make the wings?\" \"Mom,\" Ivy said, \"can you show me how you planned our summer? That must have taken forever!\" The Gratitude Goblin shrieked and shrank with every sincere word.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Visible Life",
            image: "/Images/book5/6.png",
            text: "From that day on, Ivy and Oliver lived in the same house, but saw it differently. \"Thanks for breakfast, Grandma,\" became their morning routine. They still didn't always finish it, but they NOTICED it. \"Mom, this camp was awesome!\" they'd report. \"Thanks for finding it!\" \"Clean uniform - yes!\" Oliver would cheer, knowing it didn't clean itself. The Gratitude Goblin? It shrunk so small it had to find another house - one where kids didn't notice their good fortune. \"You know what's weird?\" Ivy said one day. \"Nothing actually changed except us noticing.\" \"Yeah,\" Oliver agreed, munching his after-school snack. \"We always had it this good. We just... see it now.\" And they did. Every packed lunch. Every washed sock. Every planned activity. Every ice cream trip. Every single act of love.",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
