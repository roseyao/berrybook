const book = {
    id: 'doubling-day',
    title: 'The Magic Doubling Day',
    coverImage: '/Images/book6/0-cover.png',
    scenes: {
        start: {
            title: "The Magic Doubling Day",
            image: "/Images/book6/0-intro.png",
            text: "It's the annual Magic Doubling Day in the forest village - where sharing magically doubles joy! Ivy and Oliver are great at sharing with friends, but when it comes to sharing with EACH OTHER... that's when the fights start. \"That's MY crystal!\" \"Don't touch MY dragon game!\" When their constant fighting makes the doubling magic go backwards, they must learn that sharing with siblings is the most powerful magic of all.",
            choices: [
                { text: "Continue", next: 'scene1' }
            ]
        },
        scene1: {
            title: "The Sibling Territory War",
            image: "/Images/book6/1.png",
            text: "\"Tomorrow is Magic Doubling Day!\" Mayor Badger announced. \"Remember, the magic is strongest between those who love each other most!\" \"Can't wait to share with Bunny!\" Ivy said. \"And with Squirrel!\" Oliver added. Back home, Oliver reached for Ivy's new crystal. \"Can I see—\" \"NO! That's MINE!\" Ivy yanked it away. \"You'll get it dirty with your dragon claws!\" \"Fine! Then you can't play my new lava maze game!\" Oliver huffed, pulling his game box away. \"I didn't want to anyway!\" Ivy stomped to her side of the room. A strange purple shadow flickered between them, and suddenly their room felt colder.",
            choices: [
                { text: "Build a wall between them", next: 'scene2A' },
                { text: "Make sharing rules", next: 'scene2B' }
            ]
        },
        scene2A: {
            title: "The Great Divide",
            image: "/Images/book6/2A.png",
            text: "\"That's it!\" Ivy declared. \"We need a WALL!\" They hung a blanket down the middle of their room. \"Your side, my side. NO CROSSING!\" It felt good at first. Ivy arranged her crystals perfectly. Oliver played his games loudly. No sharing meant no fighting! But then... Oliver's ball rolled to Ivy's side. He couldn't get it. Ivy dropped her favorite crystal. It bounced to Oliver's side. They ate dinner in silence, backs to each other. The purple shadow grew darker, and their treasures seemed less fun alone. That night, they heard each other playing but couldn't see. It was the loneliest feeling ever.",
            choices: [
                { text: "Peek around the wall", next: 'scene3A' },
                { text: "Stay stubborn", next: 'scene3B' }
            ]
        },
        scene2B: {
            title: "The Sharing Schedule",
            image: "/Images/book6/2B.png",
            text: "\"Mom says we need sharing rules,\" Ivy sighed. They made a schedule: \"Ivy's crystal time: 3:00-3:30\", \"Oliver's game time: 3:30-4:00\", \"NO TOUCHING each other's stuff!\" But watching the clock wasn't fun. Oliver kept asking, \"Is it 3:30 yet?\" every two minutes. Ivy couldn't enjoy her crystals knowing she had to stop soon. When Shimmer visited, she was confused. \"Why can't you just play together?\" \"Because Oliver/Ivy ruins EVERYTHING!\" they said at the same time. Shimmer's face fell. The purple shadow between them pulsed.",
            choices: [
                { text: "Try to include Shimmer", next: 'scene3A' },
                { text: "Stick to the schedule", next: 'scene3B' }
            ]
        },
        scene3A: {
            title: "The Shimmer Effect",
            image: "/Images/book6/3A.png",
            text: "\"I'll share with YOU, Shimmer,\" Ivy said, pointedly ignoring Oliver. \"Me too!\" Oliver added, glaring at Ivy. But Shimmer did something unexpected. She took Ivy's crystal and Oliver's game piece and put them together. \"Look! Dragon guarding sparkly treasure!\" For a moment, Ivy and Oliver both leaned in. \"That's actually cool...\" Oliver admitted. \"The crystal does look like treasure...\" Ivy agreed. They almost smiled at each other, then remembered they were mad. But a tiny golden spark appeared where Shimmer had combined their toys. \"Play together?\" Shimmer asked hopefully.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene3B: {
            title: "The Magic Day Disaster",
            image: "/Images/book6/3B.png",
            text: "Magic Doubling Day arrived, but something was wrong. While other families glowed with shared joy, Ivy and Oliver's house stayed dark. They shared with friends eagerly: Ivy gave crystals to Bunny, Oliver taught Squirrel his games. But when they returned home, the purple shadow had grown HUGE. Their room was freezing cold. \"Why isn't our magic working?\" Ivy shivered. Mayor Badger appeared at their door. \"The strongest magic happens between siblings,\" he said sadly. \"But when siblings won't share, it creates... the opposite.\" The purple shadow laughed, feeding on their fighting.",
            choices: [
                { text: "Continue", next: 'scene4' }
            ]
        },
        scene4: {
            title: "The Shadow's Truth",
            image: "/Images/book6/4.png",
            text: "The purple shadow finally spoke: \"I'm the Opposite of Doubling! I grow when families don't share. And you two are my FAVORITE food!\" \"But we share!\" Ivy protested. \"Just... not with each other.\" \"Exactly!\" the shadow cackled. \"Sibling selfishness is the most delicious!\" They watched through the window as other siblings shared: Bear cubs playing with the same toy, Fox kits taking turns, Even the competitive rabbit twins sharing carrots. \"Our friends are having so much fun,\" Oliver said quietly. \"Together,\" Ivy added, her voice small. Their treasures, kept separate, looked dull and lonely compared to the golden glow outside.",
            choices: [
                { text: "Try sharing one thing", next: 'scene5A' },
                { text: "Apologize to each other", next: 'scene5B' }
            ]
        },
        scene5A: {
            title: "The First Share",
            image: "/Images/book6/5A.png",
            text: "\"Maybe...\" Ivy said slowly, \"you could hold ONE crystal. The small purple one.\" Oliver's eyes widened. \"Really? And... you could try my maze game. Just level one.\" Tentatively, they exchanged items. The moment the crystal touched Oliver's claw and the game piece touched Ivy's hoof, a BURST of golden light exploded between them! \"WHOA!\" The joy was TRIPLE what they felt sharing with friends! \"Your crystal is actually really cool!\" Oliver said, holding it up to the light. \"Your game is super creative!\" Ivy admitted, solving the first puzzle. The purple shadow shrieked and shrank. \"No! Sibling sharing is my weakness!\"",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene5B: {
            title: "The Apology Magic",
            image: "/Images/book6/5B.png",
            text: "\"I'm sorry,\" they both said at exactly the same time. \"I don't really think you'll ruin my crystals,\" Ivy admitted. \"And I don't think you're boring at games,\" Oliver added. With each apology, golden light grew between them: \"I'm sorry I never let you touch my things.\" \"I'm sorry I'm messy with your stuff.\" \"I'm sorry I built a wall.\" \"I'm sorry I didn't include you.\" The purple shadow screamed, shrinking with every word. \"Stop! Sibling forgiveness is too powerful!\" They looked at each other, really looked, and saw not an annoying sibling but their best friend.",
            choices: [
                { text: "Continue", next: 'scene6' }
            ]
        },
        scene6: {
            title: "The Strongest Magic",
            image: "/Images/book6/6.png",
            text: "With the shadow gone, Ivy and Oliver discovered the truth about Magic Doubling Day. They combined EVERYTHING: Crystals became treasure for dragon games, Games became magical with unicorn sparkles, Stories mixed dragon adventures with unicorn magic. Even their room sides merged into one amazing play space. The golden glow from their house was the brightest in the village! \"Sharing with friends is fun,\" Ivy said, teaching Oliver crystal patterns. \"But sharing with you is the BEST,\" Oliver finished, showing Ivy a new game move. Mayor Badger smiled from their doorway. \"The strongest magic isn't just sharing - it's sharing with the ones who annoy you most but love you always.\" That night, they played together until bedtime, their room glowing with the permanent golden light of sibling sharing.",
            choices: [
                { text: "The End", next: 'start' }
            ]
        }
    }
};

export default book;
