// "The Six Curses of the Lost Kingdom" — a CHAPTER book (kind: 'chapter'),
// not a branching picture-book. It reads linearly as a real turn-the-page book:
// a prologue, six chapters (one per curse/ward), and an epilogue.
//
// Schema for chapter books (see src/books/validate.js):
//   { id, title, kind: 'chapter', coverImage, sections: [...] }
// Each section is:
//   { id, label, title, fullImage, spots: [url, url], text }
// - `fullImage` is the chapter's big opening illustration (its own page).
// - `spots` are the smaller in-text illustrations, dropped in wherever the
//   `text` contains a `[[SPOT 0]]` / `[[SPOT 1]]` marker (on its own line).
// - `text` is the prose, paragraphs separated by blank lines. The reader
//   paginates it into book pages at runtime.
//
// Images live in public/images/book11/ (served at /Images/book11/...). Until
// the art is generated they 404 and the reader shows a soft placeholder.

const IMG = '/Images/book11';

const prologue = {
  id: 'prologue',
  label: 'Prologue',
  title: 'The Attic',
  fullImage: `${IMG}/prologue-kitchen.png`,
  spots: [`${IMG}/prologue-book.png`, `${IMG}/prologue-courtyard.png`],
  text: `The rain had been falling since breakfast and showed no signs of stopping.

Ivy sat at the kitchen table of the summer house, drawing a map of nowhere in particular. Outside, the trees dripped. Inside, something was about to happen — she could feel it the way you feel a thunderstorm before it arrives.

Oliver was at the counter. Mama was at the counter too, doing something with crackers and cheese and the little wooden board he liked.

"Here, bug," Mama said, and set the plate down in front of him. "Snack."

Oliver looked at the plate.

Something shifted behind his eyes — something that had nothing to do with crackers at all.

"I DON'T WANT THAT," he said. Very loudly. "I WANT SOMETHING ELSE."

The kitchen went very quiet.

Ivy put down her pencil.

Mama set down the wooden board slowly. She turned around. Her voice, when it came, was calm and quiet and careful.

"Hey," she said. "Please don't yell at me. I'm trying to help you."

Oliver stared at the floor. His small fists were balled at his sides. Tiny agitated puffs of orange flame escaped from his mouth whether he wanted them to or not.

"You need to go upstairs," Mama said. "And think about what happened."

For a moment nobody moved. Then Oliver exploded, crocodile tears rolled down his face as he stomped angrily and in a heartbroken voice, he said "YOU DON'T LOVE ME" and turned and went upstairs.

Ivy listened to his footsteps on the stairs. She looked at Mama, who looked tired and sad. Dad appeared in the doorway from the other room, looked at Mama, looked at Ivy. Mama gave him a small shake of her head. Everything's okay. Just a storm passing through.

Ivy picked up her pencil. Put it down again.

She waited a few minutes. Then she went upstairs too.

She found him in the attic.

Not on purpose — she'd gone to find him in his room, but his door was open and he wasn't there, and then she'd noticed the attic ladder was down. Oliver almost never went in the attic. It smelled like old wood and cedar and something she couldn't quite name — dusty and sweet and very old.

He was sitting cross-legged on the floor in the far corner, staring at something in his lap.

"Oliver," she said.

He looked up. His eyes were dry but his scales had that tight look they got when he was holding something in. In his lap was a book — heavy and dark, the cover made of something that wasn't quite leather.

"I found it," he said. "Behind that board. It was loose."

Ivy crossed the attic. Six symbols were pressed into the cover in a circle, each one different, each one glowing with a faint light that definitely hadn't been there before. In the center, in letters so old they were hard to read:

The Six Curses of the Lost Kingdom

[[SPOT 0]]

"I was going to open it," Oliver said. "But then I thought maybe I should wait for you."

Ivy looked at him. She thought about the kitchen. About Mama's voice, careful and quiet. About what it cost someone to stay that calm.

"Mama loves you and was trying to help," she said. "You should go say sorry. When we go back down."

"I know," he said. He looked at the book. "What do you think this is?"

Ivy knew, in the way you sometimes know things, that she should say I don't know, let's put it back and go downstairs.

She sat down next to him and opened it.

The pages were blank. All of them — blank, and faintly warm, and the symbols on the cover were glowing brighter now, one after another, like something waking up, and the attic felt like it was tilting slightly —

"Ivy," Oliver said.

"I see it."

"Should we—"

"Don't touch the—"

Oliver touched it.

The symbols blazed. The pages began turning on their own — faster and faster, a sound like wind through leaves, and the warm light was everywhere now and the attic floor was gone and they were falling, grabbing for each other in the brightness —

And then they landed.

A courtyard.

[[SPOT 1]]

Stone towers rose around them, wrapped in vines that had gone gray and dry. Fountains stood silent, their basins cracked. Six paths led outward from where they stood, each one disappearing into a different garden — and each garden was wrong in a different way. One too full, spilling over with things. One completely bare. One so perfectly still it made Ivy's chest feel strange, like something had just stopped in the middle of a breath and never started again.

The sky couldn't decide what color to be.

Oliver picked himself up from the cobblestones. He looked around with the expression he saved for thunderstorms and very surprising presents.

"What's happening? Where are we?" he asked, a slight tremble in his voice.

Ivy looked down. The book was still in her hands, cover glowing softly, all six symbols lit. She turned it over. On the back, in the same old difficult lettering, was a sentence she hadn't noticed before:

All six must be freed before you may go home.

She looked up at the six paths.

"I don't know exactly," she said. "But there are six paths, so I think we have to explore all of them." She held up the book. "One for each symbol."

Oliver looked at the paths. Then he looked at her.

"I'm scared, Ivy. We do this together?" he said.

Ivy thought about Mama's voice in the kitchen. Please don't yell at me. I'm trying to help you. She thought about Oliver waiting for her before he opened the book.

"Together," she said, and held Oliver's hand in hers.

They picked the path closest to them and walked into the first ward.`,
};

const chapter1 = {
  id: 'ch1',
  label: 'Chapter 1',
  title: 'The Ward of Always More',
  sin: 'Gluttony',
  fullImage: `${IMG}/ch1-peach-tree.png`,
  spots: [`${IMG}/ch1-feast-tables.png`, `${IMG}/ch1-theo-freed.png`],
  text: `The path from the courtyard sloped gently downward, and the smell reached them before anything else did.

It came in waves — first something warm and cinnamony, then sugar, then fruit so ripe it was almost gone sour underneath. Something that made Ivy's nose wrinkle even as her mouth watered.

"Do you smell that?" Oliver said.

"Yes," Ivy said carefully.

"It smells AMAZING."

Ivy wasn't sure amazing was exactly the word she would have used.

The garden opened around them like a fever dream of plenty.

[[SPOT 0]]

Tables stretched in every direction, draped in silk that had gone sticky with spilled things. On them: towers of cakes with too many layers. Fruit piled so high it cascaded onto the stone ground. Bowls of sweets in colours that were almost right. Jars of honey with spoons still in them. Bread that steamed gently even though there was no oven anywhere in sight.

And other things too — things that weren't food at all.

Shelves sagging under trophies. Towers of gold stars and ribbons and certificates with nobody's name filled in. Stacks of games still in their boxes. Screens flickering with shows that nobody was watching, one after another, the sound bleeding together into a low meaningless hum. Piles of drawings stamped GOOD JOB and AMAZING and WELL DONE, over and over, in handwriting that somehow all looked the same.

Everything looked extraordinary.

Everything looked like it had been there a little too long.

"We probably shouldn't—" Ivy started.

Oliver had already picked up something small and purple and put it in his mouth.

"Oliver."

"It's good," he said, mouth full. He picked up another. "Really good. Try one."

Ivy looked at the small purple things. She picked one up, sniffed it, took the tiniest possible bite.

It was, she had to admit, extremely good. Sweet and cold and somehow exactly what she'd wanted without knowing she'd wanted it.

She reached for another.

Then stopped.

I just had one, she thought. I don't need another one. I just had one.

It took more effort than it should have to put it down.

She wiped her hand on her side and looked at Oliver, who was already three things further along the table and reaching for a fourth.

"Oliver. Don't go too far."

"I'm not going far, I'm just—" he picked up something golden and bit into it — "oh, this one's even better, Ivy, try this one—"

They walked deeper into the garden. The tables went on further than they should have. The silk got stickier. The colours of everything were just slightly brighter than colours had any right to be. Ivy kept her hands clasped in front of her now, which helped. Mostly.

She noticed, without quite meaning to, that nothing she'd tasted had made her feel full. And every time Oliver finished something he immediately wanted whatever was next, his eyes already moving before he'd swallowed. Like the eating and the wanting had come completely apart from each other.

Something is wrong here, she thought.

This time she held onto the thought.

And then they saw the peach tree.

It grew at the centre of the garden — the only living thing, pushing straight up through the stone ground as though the entire kingdom had been built around it. Its branches were heavy with fruit, round and golden-pink, and the smell coming off it was extraordinary. Not too-sweet. Not wrong at the edges like everything else. Just — perfect. The way a peach smells in the very best moment of summer, the kind of smell that makes you feel like everything is going to be fine.

"Oh," said Oliver.

"Oh," said Ivy.

They both moved toward it without quite deciding to.

Ivy reached up for the lowest branch. The fruit was warm under her fingers, yielding slightly, sweet-smelling and —

She heard Oliver bite into one.

She turned around.

Oliver had juice running down his chin and his eyes had gone very wide and his expression was the one he got when something was so good it almost hurt.

"Ivy," he said. "Ivy, this is the best thing I have ever eaten in my entire life."

"Oliver, wait—"

He was already reaching for another.

"Just one more," he said. "Just — one more and then I'll stop, I promise, just—"

And then Ivy saw his hands.

The edges of his fingers — where they wrapped around the second peach — were wrong. Not wrong like hurt. Wrong like almost not there. Like looking at him through water. His scales were still green, his eyes still amber, but his outline — the shape of him — was beginning to blur at the edges. Like a drawing left out in the rain.

"Oliver," she said. Sharply this time.

He looked up. Something in her voice reached him.

"What?"

"Look at your hands."

He looked.

The peach dropped.

The fading had crept from his fingertips to his knuckles, and while they stood there watching it moved further — up past his wrists, slow and steady, like something coming in with the tide. Through the blurred edges of his fingers Ivy could see — faintly, horribly — the stone ground behind him.

"Ivy." His voice had gone very small.

"I know." She grabbed his arm — still solid, still warm, still him — and held on. "I've got you. Don't reach for anything else. Don't touch anything."

"I don't — I wasn't trying to—" He swallowed. "I didn't even decide to pick up the second one. My hand just—"

"I know," she said again. "It's this place. It's what it does."

He stared at his hands. His breathing had gone quick and shallow, the way it did when he was frightened but trying not to show it. A small agitated puff of flame escaped before he could stop it.

Ivy kept hold of his arm and turned toward the base of the peach tree.

She had been hearing the sound since they'd approached — wet and steady and endless, coming from somewhere deep in the roots — but she hadn't let herself look. Now she looked.

It was enormous.

Or it had become enormous — it was impossible to say what size it had started as. It spread across the roots of the peach tree like something that had been sitting in the same place for a very long time, pulsing gently, translucent, its edges soft and slow. Through its sides — Ivy made herself keep looking — you could see things. Half-eaten things. Objects. A ribbon, still bright. A trophy, tilted sideways. Colours that might once have been food. Everything it had ever taken in, still visible inside it, as though nothing had ever truly been enough.

The ground around it was completely bare. There was nothing left.

Its mouth hung open anyway.

Reaching. Eating. The same motion, over and over, even though there was nothing there. Like it had forgotten how to stop. Like stopping was something that happened to other creatures, not to it.

Oliver made a small sound beside her.

"Is that what I was—"

"No," Ivy said firmly. "But it's what you were starting to become."

She looked at the creature's eyes — two small points of dim light, floating somewhere deep inside. Not hungry. Not angry. Just exhausted. The eyes of someone who had been reaching for so long they could no longer remember why they'd started, or what they'd been looking for, or what it would feel like to stop.

She took a step closer.

"Hello," she said.

The eyes moved. Toward her voice.

"Can you hear me in there?"

Nothing. The reaching motion continued.

"I think there's a kid in there," she said, quietly, to Oliver as much as to herself. "And I think they've been in there for a very long time." She crouched down to the level of those tired eyes. "I'm not going to pretend I know what that feels like. But I need your help. My brother — he's starting to—" she glanced back at Oliver's hands, still fading at the edges — "I need you to tell him what it's like. From the inside. I think you're the only one who can."

Silence.

The wet steady sound.

Then — so faint Ivy wasn't sure she'd heard it — something shifted.

The silence stretched.

Then — so slowly it was almost nothing — the reaching motion stopped.

Just for a moment. Just long enough for Ivy to hold her breath.

The eyes moved toward her again. Something in them was trying. Like a word on the tip of a tongue that had forgotten it ever had one.

"Take your time," Ivy said quietly.

Oliver hadn't moved. He was watching the creature's eyes with an expression Ivy couldn't quite read — not scared anymore. Something else. Something more careful.

The sound that came first wasn't a word. It was just air. A long slow breath, like something surfacing from very deep water.

Then, thin and strange and very far away:

"I remember it started with the cake."

Oliver sat down cross-legged on the stone ground, right in front of the big sad blob. Like he was settling in. Like he understood this was going to take a while and that was okay.

"What kind of cake, Blobby?" Oliver asked.

Ivy looked at Oliver. It was exactly the right question. She wouldn't have thought of it.

The blob's eyes moved toward Oliver's voice.

"Birthday cake. My birthday. I had one piece and it was so good. So I had another. And another. And then it was gone and the good feeling went with it." A pause. "And I just kept thinking — if I had more. Just more. I'd feel that way again."

"Did you?"

"For a second. Each time, just for a second. But the second kept getting shorter. And the wanting kept getting bigger." The voice steadied, rising up through whatever the creature had become like something remembering how to swim. "Then it was Paw Patrol. Just one more episode. Just one more. I'd stop after this one, I promised myself — but the next one was already starting and it was easier to keep watching than to stop."

Oliver said nothing. He was very still.

"Then it was presents. I'd open one and before I'd even looked at it properly I was already thinking about the next one. I had a robot dinosaur." A long pause. "I wanted it so badly. And then I had it and it was good for a moment and then I wanted two. And when I had two I wanted three. Even though I never even played with the first one." The voice dropped. "I didn't take care of it. I didn't appreciate it. I just — needed the next one."

A silence.

"I can't even remember what it felt like to really want something. To wait for it. To finally get it and actually play with it and take care of it and have it be — enough."

The voice was barely a whisper.

"The wanting took all of that away."

The garden was very quiet.

Oliver was looking at the half-eaten peach on the ground in front of him.

Ivy watched Oliver's face. She could see it — the thing Blobby was describing. She could see Oliver feeling it right now. The wanting already building again, even now, even after everything they'd just seen. His eyes kept moving toward the peach tree. His hand had shifted, almost without him noticing, a few inches closer to the fruit on the ground.

"Oliver," she said softly.

He looked up.

"I know," he said. His voice was strange. "I can feel it. He's right. I finished the peach and it was the best thing I've ever eaten and I'm already—" he stopped. Looked at his hands, still fading at the edges. "I'm already not thinking about how good it was. I'm just thinking about the next one."

He was quiet for a moment.

"That's the curse," he said. Not a question.

"Yes," Blobby's voice said. "That's the curse."

Oliver looked at the peach tree. The fruit glowed golden-pink in the strange light, perfect and fragrant, the best smell in the entire garden. He could have another one. He could reach out right now and have another one and it would be extraordinary and he knew that and knowing it made the wanting worse not better.

He looked at his hands.

Then he picked up the half-eaten peach from the ground. The one he'd dropped. He looked at it for a long moment — the bite mark, the juice still on the skin, the perfect golden flesh.

He took one small careful bite.

Chewed it slowly.

All the way through. Actually tasted it.

Put it down on the root of the tree. Gently. Like he was putting something to rest.

"That was enough," he said quietly. "That was actually really, really good. And that — that is enough."

The fading stopped.

Between one breath and the next, the blur at his edges sharpened back into the familiar clear lines of him — green scales, orange patches, exactly himself, solid and warm and completely there.

He let out a long breath.

In the roots of the tree, something changed.

The creature went very still. The reaching motion — that endless, exhausted, automatic reaching — slowed. Hesitated.

Stopped.

"He stopped," Blobby's voice said. Barely a whisper. Full of something that sounded almost like wonder. "He just — he stopped."

"Yes," Ivy said.

"How."

"I just decided the good thing I already had was enough," Oliver said. "Instead of thinking about the next one." He paused. "It was hard though."

A long silence.

"I don't know if I can," Blobby said.

"You've been doing the hard thing alone for a really long time," Ivy said. "You don't have to do this part alone."

Another silence. Longer.

Then — slowly, from somewhere at the very centre of the creature — something began to change. Not the edges. The middle. A warmth spreading outward, the translucent mass losing its shape, the endless reaching motion dissolving like a habit finally broken, the ribbon and the trophy and all the half-consumed things inside it gently, slowly, fading—

The fog burned off in the light.

[[SPOT 1]]

And sitting in the roots of the peach tree, blinking, was a small hedgehog.

He had round dark eyes and soft brown spines and the expression of someone waking up somewhere completely unexpected after a very long sleep. He looked at his hands — small, solid, completely his own. He looked at the bare ground around him. At the peach tree. At Ivy and Oliver.

"Oh," he said.

"Hello," said Oliver.

The hedgehog opened and closed his hands slowly. Looked at them like he was making sure they were real.

"I remember," he said softly. "I remember what I actually like." His brow furrowed, like he was finding his way back to something room by room. "Tomato soup. The kind with the swirly cream on top." A small wondering smile. "And drawing maps of places that don't exist. And when my dad does all the different voices when he reads to me at night." The smile faded into something quieter. "I forgot all of that. How did I forget all of that?"

"You were too busy wanting the next thing," Ivy said gently.

He nodded slowly. Then he looked at Oliver with something very serious in his eyes.

"You stopped," he said.

"Yeah," Oliver said.

"That was really brave."

Oliver looked at the ground. "You stopped too."

"I had help." The hedgehog was quiet for a moment, looking at them both — this unicorn and this dragon who had come from somewhere else and crouched down in the roots of the peach tree and stayed. Something in his face settled, like a knot finally coming loose.

He sat up a little straighter.

"My name is Theo," he said. Like picking up something precious he'd nearly lost forever. "My name is Theo and I want to go home."

Above them, the first symbol on the book's cover blazed bright gold — then settled into a warm, steady glow.

Ivy reached out her hand. Theo looked at it for a moment. Then he took it. And between one breath and the next he was gone — back to tomato soup, back to imaginary maps, back to his dad doing all the voices — and the garden exhaled around them, the towers of cake going grey, the silk going still, the screens finally, finally dark.

Oliver stood up slowly. He looked at the peach tree. The fruit was already losing its glow, fading back to something ordinary. Just peaches. Just a tree.

"I still kind of want one," he said honestly.

"I know," Ivy said.

"But I don't need one."

"No."

He thought about the robot dinosaur. About opening something and already wanting the next thing before you'd even looked at what you had. He looked at his hands — sharp-edged, solid, green, exactly right.

"Is it going to be like that every time?" he asked. "That hard?"

Ivy looked at the book. The first symbol glowed quietly. Five remained dark.

"Probably harder," she said.

Oliver made a face.

Then he held out his hand. She took it.

"Okay," he said. "Let's go."`,
};

const chapter2 = {
  id: 'ch2',
  label: 'Chapter 2',
  title: 'The Ward of Not Fair',
  sin: 'Envy',
  fullImage: `${IMG}/ch2-comparing-garden.png`,
  spots: [`${IMG}/ch2-beccas-pile.png`, `${IMG}/ch2-ivys-pencils.png`],
  text: `The courtyard shimmered back into view around them.

Ivy looked down at the book. The first symbol glowed warm and solid on the cover. The page fell open on its own — and where there had been nothing before, words had appeared in that ancient careful script.

This curse is called Gluttony.

It is the curse of always wanting more. More cake, more toys, more trophies, more attention — no matter how much you already have. The wanting never fills the hole. And slowly, it swallows everything else — the joy of waiting, the pleasure of having, the ability to say: this is enough.

You broke this curse, brave Oliver, when you set down the peach. When you took one small careful bite and let it be enough. Not because there wasn't more. But because you chose to be content.

Remember this. The curse of Gluttony is patient. It will find you again — in the next thing, and the thing after that. But now you know its name. And you know what breaks it.

Choose enough. And mean it.

The book closed softly. Oliver was quiet for a moment, thinking about the robot dinosaur. About the peach. About the second one he hadn't taken.

"I know its name now," he said.

"Yes," Ivy said. "That helps."

She looked up at the courtyard. Around them, something had shifted — one of the cracked fountains was making a sound now. Barely a trickle. But something.

Five paths remained.

The smell hit them differently this time — not overwhelming sweetness but something more precise. Something almost familiar. Like a birthday party, Ivy thought. Like someone's house on a special occasion.

The path opened into a garden that was, at first glance, perfectly pleasant.

Two of everything.

Two chairs at a round table, facing each other across a cheerful yellow cloth. Two place settings, two cups, two slices of cake on two plates. Two piles of presents wrapped in bright paper, sitting on two separate pedestals. Two clusters of stuffed animals, soft and bright. Two candy bags, striped and full.

And on each item, a small neat label.

OLIVER. IVY. OLIVER. IVY.

"Oh," said Oliver, looking around with great satisfaction. "They knew we were coming." He dropped into his chair and counted his presents. "One, two, three." Then he looked over at Ivy's pedestal. "You've got — oh. Two." He picked up his candy bag and gave it a shake. It was bigger than hers. Noticeably. "Huh," he said. "Mine's bigger."

And there it was.

Ivy felt it rise up in her chest, quick and hot, the way it always did. He has three and I have two. His bag is bigger. It's not fair. Why does he always—

She opened her mouth to say it.

And then she stopped.

Because she had felt this exact feeling before. She knew its shape. She knew exactly where it went.

"Oh," she said slowly. "Oh, I know this one."

Oliver looked up from his candy. "Know what?"

"This feeling." Ivy put her small candy bag down, very deliberately, like setting down something hot. "The not-fair feeling. The counting one." She looked at him. "Remember when Mom sat us both down? After the popsicle fight, when we were both yelling not fair?"

Oliver's eyes went wide. "Stop counting," he said. "Start seeing." He said it like a password he'd suddenly remembered.

"Be grateful for what you have," Ivy said. "Because the counting never stops. There's always going to be someone with more." She looked around the garden — at the two of everything, the careful labels, the candy bag that had been made just slightly bigger on purpose. "This whole place is built to make us count. That's the trap. That's the curse."

Oliver looked at his three presents. Then at her two. Then he grinned.

"Oooo," he said. "We are not falling for this one."

"We are not falling for this one," Ivy agreed.

And here is the strange thing. The moment they decided not to play, the garden seemed to lean in closer. Oliver's candy bag swelled a little bigger, just to tempt them. A fourth present appeared on his pedestal with a soft pop. The cake on his plate quietly grew an extra layer.

Ivy laughed. "It's trying really hard."

"Have the extra present," Oliver said grandly, and tipped it off his pedestal onto the grass. "I don't even want it. I want my own three. They're mine, and that's enough." He paused, rather pleased with himself. "Hey. That's the peach one. From the last garden."

"They're kind of the same," Ivy said. "Always wanting more. Wanting what someone else has. They both make you forget to just — have your own thing. And be glad about it."

She picked up one of her own two presents, ready to open it, ready to be glad it was hers —

And there was a cold tap on her shoulder.

Ivy turned around.

Hovering just behind her — just off the ground, pale and wispy, trailing a faint cold mist — was a rabbit. Or what had been a rabbit. She was small and slight and translucent, her long ears drifting as though moved by a breeze that wasn't there. Her eyes were large and sad and fixed on Ivy with a kind of desperate confusion.

"How," the rabbit whispered. "How are you not fading? Everybody fades here."

Ivy looked down at her own hands. Solid. White. Completely there.

"We almost did," Ivy said honestly. "We felt it start. But we've met this one before." She crouched down to the little ghost's level, slow and careful, the way you'd come up to a bird that might startle. "Who are you? What happened to you?"

The rabbit stared at her, as though a unicorn crouching in the grass and asking questions in a normal voice was the strangest thing she had seen in a very long time.

"My name is Becca," she said at last.

"Hi, Becca," said Ivy. "Take your time."

And slowly, it came out.

"I have ten brothers and sisters," Becca said. "I'm the second oldest. Mama was always asking me to help. To be patient. To be nice to the little ones." A pause. "And mostly I tried. But the little ones always got the first slice of carrot cake. And when their stuffies wore out they got new ones. I got told I was too old for new stuffies."

Ivy said nothing. Ivy just listened.

"I kept thinking — it's not fair. Every meal, every birthday, every time Mama said Becca, help me. Becca, be patient. Becca, you understand." Becca's voice was barely there. "And I did understand. But it still hurt."

Oliver had come to crouch beside Ivy. Quietly. Both of them now, low in the grass, looking at the little ghost.

"And the more I thought it," Becca went on, "the more I faded. Because while I was busy counting what everyone else had, I stopped tasting my own cake. I stopped noticing my own stuffies. I stopped feeling any of the good things that were actually mine." Becca looked down at her own translucent paws. "Everything I had went grey and far away. Not because anyone took it. Because I stopped seeing it. And by the end I couldn't even hold my own things anymore."

"We can help," Ivy said. "I think. If you'll let us."

Becca looked between them. "How? You don't even have that much." She glanced at Ivy's pedestal — counting, even now, the way she always did. "Your pile's small. Smaller than his."

"I know," Ivy said. And Ivy smiled, because it didn't hurt the way it would have ten minutes ago. "Watch."

Ivy picked up one of her two presents and opened it. Inside was a small notebook, the kind with a clasp, a tiny unicorn pressed into the cover. Her name — IVY — in small neat letters on the first page.

"Oh," Ivy said softly. And meant it.

Ivy picked up the second present and opened it slowly. A set of coloured pencils — twelve of them, each a different shade of purple. Every shade of her favourite colour she'd ever seen, and some she hadn't.

[[SPOT 1]]

Ivy held them up so they caught the light.

"These are mine," Ivy said. "There are only two presents. His pile is bigger. And they're still the most beautiful things I have ever seen, and I don't care even a tiny bit what's sitting on his pedestal." Ivy looked at Becca. "That's the whole trick. You stop looking at everyone else's pile. And you look at your own."

Becca stared at the pencils. Something flickered across her ghostly face.

"But I don't have anything," Becca whispered.

"Are you sure?" Ivy said gently. "Have you ever actually looked?"

Becca went very still. Then, slowly, Becca turned toward the small pile behind her — the one she had never once looked at. The one with her own name on it.

[[SPOT 0]]

It was there.

A small pile. Not as large as Oliver's. Not even as large as Ivy's. But there — a worn stuffy, a little grey rabbit loved to softness. A handwritten note, folded small. A single slice of carrot cake on a tiny plate, real and fragrant.

Becca drifted toward it. Reached out and touched the stuffy — and her hand didn't go through it. It was solid under her fingers.

Her eyes filled with something.

"Mama made the note," she whispered. "I can tell from the handwriting."

She picked it up. Opened it. Read it silently. Whatever it said made her go very still — and then, so quietly, she smiled.

"She says she sees me," Becca said. "She says she knows it's hard being the one who helps. She says she's proud of me."

The ghostliness lifted. Not all at once — in patches, like fog burning off, the warm solid rabbit underneath returning bit by bit. Her ears straightened. Her eyes cleared. Her feet touched the ground for the first time.

She stood there, completely real, looking at the note in her hands.

Oliver had gone very quiet in the way he went quiet when something was too big for words.

"Are you okay?" Ivy asked.

Becca looked up. Something in her face had changed entirely — lighter, younger, like something clenched for a very long time had finally let go.

"I forgot she saw me," she said simply. "I was so busy looking at everyone else's things that I forgot she saw me."

She looked at Ivy and Oliver — this unicorn with her purple pencils and this small dragon sitting cross-legged on the ground — and she stood up a little straighter.

"My name is Becca," she said. Clear and certain. "My name is Becca and I want to go home and eat carrot cake with my family."

Oliver grinned. "That sounds really good actually."

Above them, the second symbol on the book blazed gold and settled into its steady glow.

Ivy held out her hand. Becca looked at it, then at the note still in her other hand, then took it. And between one breath and the next she was gone — back to the carrot cake, back to the worn stuffy, back to her mama who saw her — and the garden around them went quiet and grey and still.

Ivy stood in the dimming garden, her purple pencils in one hand, the notebook tucked under her arm.

"I'm keeping these," she said.

"Obviously," said Oliver.

"I almost fell for it," Ivy admitted. "Right at the start. I felt the whole thing start up — he's got more, it's not fair, all of it." Ivy looked at her pencils. "It comes up so fast."

"But you caught it," Oliver said.

"We caught it." Ivy bumped him gently with her shoulder. "Mom's thing works. The grateful thing. The stop-counting-and-start-seeing thing."

"I'm telling her she was right," Oliver said. "She'll like that."

"She will," Ivy said.

The courtyard shimmered back around them. Two symbols glowed steady on the book's cover. The second fountain had joined the first, both trickling quietly now. The sky had settled on something — not quite blue, not quite gold, but trying.

Four paths remained dark.

The book was already opening in Ivy's hands.`,
};

const chapter3 = {
  id: 'ch3',
  label: 'Chapter 3',
  title: 'The Ward of Lazy Bum',
  sin: 'Sloth',
  fullImage: `${IMG}/ch3-swamp.png`,
  spots: [`${IMG}/ch3-bedroom.png`, `${IMG}/ch3-maverick-freed.png`],
  text: `The courtyard shimmered back around them. Two symbols glowed steadily on the book's cover. The two fountains trickled quietly beside each other. The sky had settled on something — not quite blue, not quite gold, but warmer than before.

The book fell open in Ivy's hands.

This curse is called Envy — and its younger sister is Jealousy.

Envy is wanting what someone else has. Jealousy is feeling like what they have somehow makes yours less. Together they whisper the same thing: not fair, not fair, not fair. They count everything. They measure everything. And the more you listen to them, the less you can taste your own cake or feel how soft your own stuffies are.

You broke this curse, brave ones, the moment you recognised it — when you remembered what Mom taught you, set down the counting, and chose to see your own treasure instead of someone else's. And then you did the bravest thing of all: you turned around and helped Becca see hers.

Remember this. Envy and Jealousy are patient. They will find you again — every time you start counting instead of seeing, every time not fair feels louder than thank you. But now you know their names. And you know what breaks them.

Stop counting. Start seeing.

The book closed. Ivy held it quietly, thinking about the purple pencils. About Becca's face when she read the note.

Oliver was looking at the third path. Something about it was making his eyes go soft and heavy in a very specific way.

"Oliver," Ivy said.

"Mmm?"

"Don't get any ideas."

"I don't have any ideas," he said. "I'm just looking."

Ivy took his arm and they stepped onto the path together.

It wasn't a garden this time.

It was their bedroom.

Not exactly — not precisely — but close enough to make Ivy's breath catch. The same two beds, one with purple bedding, one with green. The same bookshelf, slightly too full. The same window with the same light coming through it. The same general atmosphere of things that had been meant to be put away and hadn't quite got there yet.

[[SPOT 0]]

Oliver's bed looked extraordinarily comfortable.

"Oh," said Oliver.

"Don't," said Ivy.

"I'm just—"

"Don't."

Oliver didn't. For approximately four seconds. Then he crossed the room in six steps and fell backwards onto his bed with an expression of profound relief.

"I'm just resting for a second," he said to the ceiling.

"We just got here."

"I know. I'm very tired though." He reached sideways without looking and picked up a snack from the bedside table — there was a small pile of them, just sitting there — and ate it. Then he put the wrapper down on the bed beside him. Then he looked at the ceiling some more.

"Oliver," Ivy said, in the voice she used when she was keeping herself very calm. "Can we focus please. What's our job right now?"

"Mmm." He reached for another snack.

"Oliver."

"I'm focusing. I'm focusing while resting." He finished the snack and dropped the wrapper on the floor. He looked at his empty hands. "I want water."

"There's a cup on the shelf."

"Can you get it?"

"No."

"It's very far."

The shelf was four steps away. Ivy looked at him. He looked at the ceiling.

"It's too hard," he said.

"Getting a cup of water is not too hard, Oliver."

"It's a lot of steps though."

Ivy looked around the room. Something was beginning to feel off — the same prickling unease she'd felt in the other gardens, that sense of something wrong underneath the pleasant surface. The room was messy. Not their normal messy. Messier. Like things had been accumulating for a very long time without anyone doing anything about them.

"Oliver," she said. "Something is wrong here. I need you to get up and help me look around."

"In a minute."

"Now, Oliver."

"It's too much work," he said. Not lazily — genuinely. Like the words were just a fact about the world. "It's too hard. I'll do it in a minute."

He reached for another snack.

And Ivy noticed, with a cold feeling in her stomach, that the edges of his green scales had gone slightly — dull. Slightly grey-green. She told herself it was the light.

"Oliver." She kept her voice steady. "Our job right now is to find the cursed kid and break the curse. That's why we're here. Can you please get up and help me."

"You're doing really well though," Oliver said encouragingly from the bed. "You don't need me."

"I do need you," Ivy said. She put down what she was holding and looked at him properly. "Just because I can do something doesn't mean I want to do it alone. Or that it's fair that I have to." A pause. "I want to do it together."

Oliver looked at the ceiling.

Then at Ivy.

Something in his face shifted — not dramatic, just quiet. Like a small thing landing.

"Okay," he said. And didn't get up yet. But something had changed.

"Oliver. Please. Get. Up."

"In a minute," he said. "I'll do it in a minute. I'm just — I'm tired. It's been a long day. We've already broken two curses. That's a lot. I think we deserve a rest."

Ivy looked at him on the bed. She looked at the wrapper on the floor. She looked at the cup on the shelf, still sitting there. She looked at the room — at the mess accumulating, at the things waiting to be put away, at the homework on the desk with nothing done on it.

She picked up the wrapper.

She got the cup of water.

She started putting things away.

She told herself she was just tidying while she looked for the cursed kid. She told herself she wasn't doing the thing she always did. She told herself Oliver would get up in a minute like he said.

Oliver did not get up in a minute.

He got more comfortable. His scales were definitely greener — a darker, boggier green. His outline had gone slightly soft. He reached for another snack and his arm moved slowly, slowly, slower than arms should move.

"Oliver," Ivy said. More urgent now. "Something is actually wrong. Look at your arm."

"Mmm," said Oliver.

The light in the room had changed. The warm familiar window-light had gone grey-green. The floor felt softer underfoot. Something smelled like mud and old leaves.

"Oliver." Ivy dropped what she was holding. "Oliver, I can't do this by myself. Something is really wrong. I need you to get up RIGHT NOW."

Oliver turned his head slowly on the pillow. His eyes were very heavy. "Just... five more minutes," he said. "I'll help in five more minutes. You're doing great though."

The floor buckled softly.

The bookshelf sprouted moss.

The bedding turned grey and damp and the window went dark and the room — their room, their familiar safe room — dissolved into something else entirely.

A swamp.

Ivy stood in the middle of it, completely solid, completely herself, looking around.

Bog water crept across the floor. Thick grey-green fog rolled in from the corners. The beds had become mounds of moss. The bookshelf was barely visible under the vines. Everything smelled like deep still water and things that had stopped moving a long time ago.

Oliver was in the corner.

He was a swamp creature.

Not completely — not yet — but most of the way there. Draped in moss, slow, grey-green from snout to tail, his bright amber eyes barely visible through the murk. He was still holding a snack. He was still, against all odds, eating it.

And on the other side of the swamp, half hidden behind a rotting log, hunched something enormous and still and draped in so much moss it was almost invisible. Two dark eyes peered out from the murk. A small panda hand, visible through the moss, clutched a piece of paper — a drawing, half-finished, held close.

Oliver saw it at the exact moment it saw him.

"MONSTER!!!" Oliver screamed.

"MONSTER!!!" screamed Maverick.

Ivy walked calmly between them.

"Hi," she said to Maverick. "What's your name? What happened to you?"

Maverick stared at her.

He had the expression of someone who had been alone in a swamp for a very long time and had forgotten that other people existed and was now having considerable difficulty processing the reality of a small white unicorn standing in his bog asking him questions in a normal tone of voice.

"I—" he started.

"Take your time," Ivy said.

"She's very calm," Oliver said from his corner, in a slightly awed voice. He was looking at his own mossy hands now with dawning horror.

Maverick looked from Ivy to Oliver. His eyes settled on Oliver — on the moss, the slow movement, the bog water dripping from his wings.

"You look like me," he said. Very quietly.

"I'm not—" Oliver started. Then stopped. Looked at himself properly. "Oh," he said. "Oh no."

"Yeah," said Maverick.

They regarded each other across the swamp in a silence of mutual recognition.

Ivy sat down on a mossy log and waited.

"What happened to you?" she asked Maverick again. Gently.

Maverick was quiet for a long moment. When he spoke his voice was slow and low, like something that had forgotten how to move at regular speed.

"It started because the bed was warm," he said. "That's all. The bed was warm and getting up was cold and Mama would make breakfast anyway. So I stayed."

Oliver said nothing. He was listening.

"Then it was the homework. It was hard and Papa would help if I waited long enough. So I waited." A pause. "And then it was everything. Cleaning my room. Getting my own water. Getting dressed. All of it — too hard, too much, someone else would do it." The voice dropped lower. "And they did. They always did. So I just... stopped trying."

"What happened then?" Ivy asked.

"One day nobody came." Maverick looked at his mossy hands. "And I didn't know how to start anymore. I'd forgotten. I'd waited so long for someone else that I forgot I could do things myself." A long silence. "And by then everything felt impossible. Even the small things. Even getting up." He paused. "The swamp was already comfortable. And I didn't know how to leave it."

He looked at the half-finished drawing in his hand.

"I was drawing my family," he said. "Before. I never finished it."

Oliver had been getting slowly, quietly, to his feet.

It wasn't dramatic. He didn't announce it. He just — stood up. Moss falling from his scales, his outline sharpening slightly, his amber eyes clearing.

"I'll help you finish it," he said.

Maverick looked at him. "It's hard."

"It's a drawing," Oliver said. "I'll help." He looked at Ivy. "Can I use your pencils?"

Ivy looked at her purple pencils. She'd used exactly none of them so far. She held them out without a word.

Oliver took them and crossed the swamp to Maverick. He sat down beside him in the bog water without hesitating, not minding the wet, and held out his hand for the drawing.

Maverick looked at him for a long moment.

Then he handed it over.

Oliver smoothed the drawing out on a flat piece of log and looked at it seriously. A panda family. Most of them finished. Two outlines barely started — a little brother and Maverick himself.

"Who's this one?" Oliver asked, pointing to the smaller outline.

"My little brother."

"What does he look like?"

And Maverick described him. Slowly at first, then more steadily — the round ears, the black patches, the way he always had something in his hands, the gap in his teeth. Oliver drew, tongue between his teeth, asking questions as he went. Like this? Bigger? What about the ears? Every few strokes he'd hold it up and Maverick would lean forward and look and say a little more like this and Oliver would adjust with great seriousness.

Ivy watched from her log.

She watched Oliver — who had said it's too hard twenty minutes ago, who had lain on a mossy bed eating snacks while she put things away — bent over a drawing in a swamp, completely focused, asking the exact right questions.

She didn't say anything. She just watched.

When the little brother was done Oliver moved to the last outline.

"This is you?" he said.

"Yes."

"What do you look like?"

Maverick was quiet for a moment. "I've forgotten a bit," he said.

"That's okay," Oliver said. "I'll draw a panda and you tell me what's wrong."

He drew. Round ears, white face, black patches, small round nose, sleepy eyes. He held it up.

Maverick looked at it for a long time.

"The eyes are right," he said quietly. "I do have sleepy eyes."

"Good sleepy or sad sleepy?" Oliver asked.

Maverick thought about it. Really thought about it.

"I think they used to be good sleepy," he said. "I think they could be again."

Oliver nodded and added the very smallest suggestion of a smile to the face. He held the finished drawing up — the whole family, every panda present, complete.

"That's a good drawing," he said. "You started it. We finished it. That counts."

Something changed.

The bog water began to recede. The fog thinned. The moss fell away in slow quiet patches and underneath — a small panda. Round black ears. White face. Black patches around sleepy eyes that were, just slightly, good sleepy rather than sad sleepy.

He sat up.

He looked at the drawing.

He looked at it for a long time.

[[SPOT 1]]

"I did that," he said softly. "We did that." Something moved through his face — surprise first, then something warmer. "That feels really good. I forgot it felt like that."

"What does it feel like?" Oliver asked.

Maverick thought about it carefully.

"Like I'm real," he said. "Like I'm actually here."

He looked at Oliver — really looked, taking in the fading moss, the clearing scales, the pencils still in his hand.

"You got up," he said. "You were almost all the way in the swamp and you got up and did the thing."

Oliver looked at his hands. The moss was almost gone now. His scales were bright green again, his outline sharp, his amber eyes clear.

"It wasn't that hard," he said. Then paused. "I mean. It kind of was. But." He looked at the drawing. "It was worth it."

Maverick sat up very straight.

"My name is Maverick," he said. Clear and certain and wide awake. "My name is Maverick and I have a lot of things to finish."

"Same," said Oliver.

Above them the third symbol blazed gold and held.

Ivy held out her hand. Maverick looked at the drawing one more time — the whole family, complete, his sleepy-eyed face in the corner — and then he took it. And between one breath and the next he was gone, back to the warm bed he'd actually earned, back to the homework and the breakfast and the family waiting — and the swamp receded entirely, the room reassembling itself around them, familiar and messy and completely real.

Oliver stood in the middle of it.

He picked up the snack wrapper from the floor.

He put it in the bin.

He got himself a glass of water from the shelf.

Ivy watched all of this without saying a word.

"Don't," Oliver said.

"I didn't say anything."

"You were thinking something."

"I was thinking it's nice to have my pencils back," Ivy said.

Oliver drank his water. It tasted, he thought, much better than water usually did. Maybe because he'd got it himself.

The courtyard settled back around them. Three symbols glowing now. Three fountains trickling. The sky warm gold and certain.

Three paths remained.

The book was already opening.`,
};
// Chapters 4–6 + epilogue are outlined but not yet written; the reader shows a
// gentle "coming soon" page for any section whose text is empty.
const chapter4 = {
  id: 'ch4',
  label: 'Chapter 4',
  title: 'The Ward of Never Nice',
  sin: 'Meanness',
  fullImage: `${IMG}/ch4-prickly.png`,
  spots: [`${IMG}/ch4-playfort.png`, `${IMG}/ch4-pip-freed.png`],
  text: `The courtyard shimmered back around them. Three symbols glowed steadily on the book's cover now, and three fountains trickled together. The sky had warmed another shade.

The book fell open in Ivy's hands.

This curse is called Sloth.

Sloth is the curse of too hard, too much, not now, someone else will do it. It tells you every problem is too big to begin — so you don't begin. You wait. You wait for someone else to get up and do the hard thing for you. And the longer you wait, the more you forget you could have done it yourself.

You broke this curse, brave Oliver, when you stopped waiting and became a problem solver. When you got up out of the cold bog, picked up the pencils, and finished the drawing yourself — not because it was easy, but because a problem solver doesn't wait around for someone else to fix the hard thing. They get up. They figure it out. They do it themselves.

Remember this. Sloth is patient. It is waiting in every warm bed and every hard worksheet and every "in a minute, someone else can do it." But now you know its name. And you know what beats it.

Get up. Solve it yourself.

The book closed softly. Oliver looked rather pleased with himself.

"I solved it myself," he said. "I'm a problem solver."

"You are," Ivy agreed. "You really are."

They looked at the fourth path. From where they stood it just looked like — somewhere to play.

"Together?" said Ivy.

"Together," said Oliver, and took her hoof, and they stepped onto the fourth path.

It was the best place they had ever seen. The path opened out and there it was — a play-fort to end all play-forts. Rope bridges and ladders and a slide that curled around twice. A sandpit. A swing that went all the way up to the sky. Buckets of toys. A whole castle of cushions, waiting to be knocked down.

"WHOA," said Oliver.

[[SPOT 0]]

They ran in. And for a little while it was wonderful. They climbed and slid and swung and built a tower out of cushions and knocked it down. Ivy laughed so hard she got the hiccups.

Then a small voice spoke. Right by Oliver's ear. Soft and friendly and close.

Poke her, it said.

Oliver didn't really decide to. His finger just sort of — did it. He poked Ivy in the arm.

"Hey," said Ivy.

Oliver laughed. It had been, for some reason, extremely funny. The little voice by his ear seemed to laugh too. Do it again, it said. So Oliver poked her again.

"Oliver. Stop it."

He felt something then — a tiny prickle on the back of his own hand, like a splinter going in the wrong way. He didn't look down. The voice was already whispering something sillier, and it was so funny he had to say it.

"You smell like a poopy head!" Oliver announced.

He waited for Ivy to laugh. Ivy did not laugh.

The small voice had come to Ivy's side too. Quiet. Reasonable. It pointed out, gently, that Oliver was being a pain. That she'd been having a much nicer time before he started poking. That she didn't have to let him play with her at all if he was going to be like that.

The voice was right, Ivy thought. That was the worst part. It felt completely right.

"Fine," Ivy said, climbing up onto the cushion castle. "You can't play with me, then."

Something prickled on her shoulder. She ignored it.

"I don't care," said Oliver. But his face did a small flinch. "I've got my own fort anyway. A better one." He grabbed an armful of toys and held them up, bragging the way he did. "And I've got more than you! Look! I got way more!"

A prickle ran up his arm. He still didn't look.

"I don't even want to play with you," Ivy said. The mean thing was right there, easy, and saying it felt like scratching an itch. "I don't like you anymore."

The garden went very quiet.

Oliver stood there with his armful of toys. And Ivy watched his face fall, and heard the words hanging in the air where she'd put them — I don't like you anymore — and her stomach dropped.

But Oliver didn't fire one back.

He put the toys down. He took a breath, the careful kind. And then he said something Ivy did not expect.

"I know you don't really mean that," Oliver said.

Ivy blinked. "What?"

"You're my sister. And you love me. So I know you don't really mean it — I think this place is making us mean." He swallowed. "So I'm not going to believe it." A pause, and then, smaller and braver: "But it still made my tummy hurt. So please don't say it again. Okay?"

And a quill — one of the long grey ones bristling all over Oliver — loosened, and fell, and vanished before it hit the ground.

Ivy stared at him. He hadn't poked back. He hadn't said anything mean at all. He'd just — decided she still loved him, even when she was being awful, and asked her, kindly, to stop.

"I don't mean it," Ivy said, and her voice cracked. "I don't — you're my favorite person in the whole world, and I said the meanest thing, and I'm so sorry."

A quill fell off her shoulder.

"It's okay," said Oliver. "It's the curse." He looked at his own spikes. "But I don't know how to make the rest fall off."

Ivy thought about it. Looked at her brother — bristling all over, and still, somehow, not being mean back.

"I think," she said slowly, "sorry isn't the only kind thing. I think you can also just — tell someone what's good about them."

So she did.

"You're the funnest person I know," Ivy said. "You make me laugh even when I'm trying to be grumpy. And you always know where to find the very best rocks — the smooth ones and the sparkly ones. Nobody finds them like you do. You're brave and you're silly and you're my best friend. That's what's true about you. Not the mean stuff. That."

Oliver's whole face changed. It opened up, lit from the inside, and he smiled so wide his spikes shivered — and three of them dropped off at once.

And here is the thing Ivy hadn't expected: watching Oliver's face go bright like that made something go warm and bright in her own chest too. Making him feel good felt good. It felt better than the mean thing ever had — better and bigger, and it lasted.

"Your turn," Ivy said. "Tell me a true good thing."

"You're the best," Oliver said at once. "You make the most beautiful drawings, and the coolest Legos, and you're the best big sister in the whole world — to me, and to Hazel." He grinned. "And you let me play with you. Mostly."

Ivy laughed — and felt three of her own quills go.

It was only then, with most of their spikes gone and their green and white showing through again, that they noticed they were not alone.

In the far corner of the play-fort, where the warm light didn't reach, something enormous sat very still. It was made entirely of quills — thousands of them, long and grey and sharp, layered so thickly that whatever was underneath hadn't been seen, by anyone, in a very long time. Two small eyes watched them from deep inside.

"Hello," said Ivy.

The bristly creature flinched. "Go away," it said, rough and sharp. "Don't come close. You'll get hurt."

Ivy and Oliver looked at each other — because they had just learned something about mean words.

"I don't think you really want us to go," Ivy said gently. "I think you're scared we'll leave like everybody else. So you're telling us to go first." She sat down, a little way off. "But we're not going to. Is it okay if we stay?"

The eyes blinked. Like nobody had ever seen through it before.

For a long moment the bristly creature said nothing. Then, slowly, it began to talk — more to the floor than to them.

"It started so small," it said. "A poke. A funny mean name. Telling someone they couldn't play. And everyone would laugh, or I'd feel big for a second. Bigger than whoever I poked. And I liked it. That little big feeling." A pause. "But it never stayed. It got smaller every time, so I had to be meaner to get it back. 'You can't sit here.' 'I don't want to be your friend.' 'Go away.' And every single time I said a mean thing, a new spike grew."

"And then?" Ivy asked gently.

"And then I was all spikes. And nobody could get near me without getting poked, so they stopped trying. Every one of them. And I told myself — good. I don't need anybody." A silence. "But I wasn't fine. I was so lonely. I'd made myself into a thing nobody could hug. And I forgot how to be soft. I don't know how to stop. The spikes just grow."

Ivy and Oliver got up — the last few quills and all — and went and sat right next to the bristly creature. Close.

"You'll get poked," it warned.

"That's okay," said Oliver. "We don't mind a little poke. I poke Ivy all the time. I'm working on it."

The creature made a sound that was almost a laugh.

"Can I tell you something true?" Ivy said. "Something good about you?"

The creature went very still.

"When we walked in, you let us play in your whole fort," Ivy said. "The slide, the swings, all of it. You'd been sitting here alone for so long, and you still shared everything you had the second we arrived. That's one of the kindest things anyone's ever done for me. You've got so much kind still in you. I can see it from here."

For a long moment, nothing.

Then the bristly creature began, very quietly, to cry — and with every tear, a quill loosened and fell.

"Nobody's said a good thing about me," it whispered, "in such a long time. I forgot the good things were even in there."

"They're in there," said Oliver. "We can see them."

The creature looked at the two of them — sitting close, not leaving, telling it true good things — and it did the hardest, bravest thing it had done in years. It found a good thing, and gave it away.

"You came and sat by the prickliest thing in the whole kingdom," it said, "just so it wouldn't be alone. That's the kindest thing I've ever seen." A shaky breath. "Thank you. Thank you for staying."

And the quills came off in a soft grey rain, faster and faster, the great bristling shape growing smaller and softer and rounder —

[[SPOT 1]]

— until sitting in the corner of the play-fort, blinking in the warm light, was a small round porcupine. She had soft dark eyes and a snub little nose and quills that lay flat and gentle down her back, the way quills are supposed to. She looked at Ivy and Oliver sitting right beside her — right beside her, nobody poked, nobody gone.

"You stayed," she said.

"We stayed," said Oliver.

The porcupine touched one of her own quills, soft now. "I remember being kind," she said wonderingly. "Little. Before the big feeling. I used to make people smile and it felt so warm." She looked up. "How did I forget the warm feeling was better than the big feeling?"

"Mean feels big for a second," Ivy said. "But it leaves you all alone."

"And kind feels warm for a long time," said Oliver. "And the best part —" he looked at Ivy, surprised to be figuring it out as he said it — "when you make somebody else smile, it makes you feel good too. Both of you. At the same time."

The porcupine smiled — a real one, the first in the longest time. And Ivy felt it warm her chest all over again.

The porcupine sat up very straight. "My name is Pip," she said. Clear and certain. "My name is Pip. And I have a lot of good things to start telling people — starting with the ones I was mean to."

"That's a really good problem to solve," said Oliver. And meant it.

Above them, the fourth symbol blazed bright gold — then settled into a warm, steady glow.

Ivy held out her open hand. Pip looked at it — an open hand, nothing prickly about it — and took it. And between one breath and the next she was gone, back to all the people she was going to make smile.

Ivy and Oliver stood in the gentle wreck of the cushion castle, quills gone, exactly themselves.

Oliver reached over and, instead of poking Ivy, held her hoof. "I really do like you," he said. "I was being the curse."

"I know. And I knew you didn't mean the pokes," Ivy said. "You're just silly. I love that you're silly." She squeezed his hoof. "And the next time I say something like I don't like you anymore — you did exactly the right thing. You knew I didn't mean it. Because I love you. Even when I'm being awful."

"You can't take mean words back," Oliver said wisely. "Mom says. But you can say sorry, and do better, and say a good thing instead."

"Then I'm sorry," said Ivy. "And here's a good thing instead: there's nobody in any kingdom I'd rather do this with than you."

Oliver beamed — another little warm thing, passed back and forth between them.

The courtyard shimmered back around them. Four symbols glowed steady on the book's cover now. A fourth fountain joined the others, all of them singing quietly together. The sky was very nearly its proper blue.

Two paths remained dark.

The book was already opening in Ivy's hands.`,
};
const chapter5 = {
  id: 'ch5',
  label: 'Chapter 5',
  title: 'The Ward of Right Now',
  sin: 'Impatience',
  fullImage: `${IMG}/ch5-frozen.png`,
  spots: [`${IMG}/ch5-thaw.png`, `${IMG}/ch5-wren-freed.png`],
  text: `The courtyard shimmered back around them. Four symbols glowed steadily on the book's cover now, and four fountains sang together. The sky was nearly its proper blue.

The book fell open in Ivy's hands.

This curse is called Meanness. It is the curse of the little poke, the funny mean name, the "you can't play" — it feels big for a second, but the big feeling never stays, so you get meaner to get it back, until you are all spikes and nobody can come close. You broke it, brave ones, when you stopped being mean to each other and told each other the true good things instead — when you found that making someone smile feels warmer, and lasts longer, than making them small. Say the kind thing. It comes back warm.

The book closed softly.

"Two paths left," Oliver said.

"Two." Ivy looked at the fifth. It didn't howl or glow — it was just quiet, completely quiet, like a held breath. They took hands and stepped onto it.

They stepped into a house, and the house was holding still. Not empty — full, a family in the middle of a busy evening — except everyone had stopped, frozen exactly where they were, like someone had pressed pause on the whole world.

A mama stood at a high chair, a spoon of something orange held an inch from a baby's open mouth. The baby's face was scrunched mid-cry, one fat tear stopped halfway down its cheek. At the sink a papa stood with his hands in the dishwater, a soapy plate held still, suds hanging in the air. On a desk, papers sat half-sorted under a hand that wasn't moving.

And there were things in the middle of becoming, too. On the stove, a pot of soup hung frozen mid-bubble. Through the oven window, a cake sat half-risen — stopped halfway up, never to finish. And on the windowsill, in a jar, a crystal that had clearly been growing for days — a little glittering tower of it — was frozen mid-sparkle.

Everything in the whole house was caught partway to good. And none of it could finish. The clock had stopped with its second hand pointing straight up.

"Hello?" Ivy said. Her voice sounded very loud. Nobody answered. Nobody could.

Oliver found a pile of blocks — a half-built tower, knocked over. He sat and built. Three, four, five — it fell. "Aw." Again. Six — fell. By the third time the tight hot frustrated thing was back in his chest. "Someone FIX this," he said to the frozen room. "HELP me, I need help RIGHT NOW."

A voice answered — soft, close, agreeable, the first voice in the silent house. "Then wake him up. Make him help you. You're more important than some plate. Just make it about you. Me first."

Then Oliver's nose found the oven. "Is that CAKE?" He wanted it, immediately, entirely. "Take it," the voice purred. "Why wait for it to bake? Have it now." "It's not done," said Ivy. "It's all gooey in the middle. It needs to bake." "But I want it NOW," said Oliver — and even as he said it, he heard how it sounded.

Ivy had wanted to dance — tried a turn she'd been working on, wobbled, fell, tried again, fell. "I just want to get it RIGHT." The voice came to her ear: "So make her help you. Forget the baby. The baby can wait. Your turn. Me first." And the crystal on the sill — she wanted it so badly. "Smash the jar, take it now." But half-grown, it would only ever be small and dull. Left to grow, it would become something you could keep your whole life.

Ivy looked at the frozen mama, the spoon, the baby with its mouth open and its one stopped tear. And something about that stopped tear made her pause.

"Oliver. Look. Everything here is stuck halfway. The baby half-fed. The cake half-baked. The crystal half-grown. Nothing can finish — because time stopped." She looked around at the bubble that never popped, the cake that never rose, the tear that never fell. "Somebody wanted everything now so badly they froze time to grab it all. But you can't grab a cake before it bakes, or a crystal before it grows, or a turn before it's your turn. Those things need time. And they froze the time. So now nothing can ever become good — not for them, not for anybody."

"The voice wants us to do it too," Oliver said. "Have it all now."

"Yeah. But the baby was first — the baby needs the food before I need the dance. And the cake's not ready, and the crystal's not ready, and yelling won't make them ready." She breathed. "Mom says it both ways, doesn't she. Be patient — I'll help you when I finish what I'm doing. And the other one. Some things just take time. The crystal won't grow any faster if you yell at it."

"I always hated both of those," Oliver admitted.

"Me too. But look where right now gets you." She gestured at the frozen, stuck, partway house. "Right now stops everything."

So Ivy did the bravest, most patient thing. She turned away from the frozen mama — away from making it about her — and said out loud, to the quiet house: "It's okay. The baby can go first. And the cake can take its time. I'll wait."

And something... ticked.

The clock. The second hand moved — one tick — and kept going. The spoon slid the last inch to the baby's mouth; the baby ate, its face unscrunched, the stopped tear finished rolling and dropped, and the baby gave a wet, happy hiccup. The plate slid into the rack; the suds popped. And in the oven the cake rose the rest of the way and turned gold, and the warm smell of it filled the house; on the windowsill the crystal grew and grew and threw little rainbows across the wall; the soup bubbled over.

Everything that had needed time finally got its time. The whole house came unstuck at once — warm and full and moving and alive — just because two kids had been willing not to have everything right now.

[[SPOT 0]]

"Whoa," Oliver breathed. And then, without anyone fixing it for him, he tried his tower once more — slower, while he waited his turn — five, six, seven, eight, and it stayed. He'd done it himself. "...Whoa," he said again, quieter.

It was only then that they saw her — at the center of the room, where the freeze had been thickest, a small bird, bright feathers gone dull, beak open wide, wrapped in a last shell of frost, frozen mid-shout. But her eyes were awake, and watching, full of something like panic.

"How did you DO that?" the bird said, the frost cracking as she spoke.

"What happened to you?" Ivy asked gently, sitting nearby.

The bird's beak trembled. "I couldn't wait for anything. Not my turn — and not anything that took time, either. I'd dig up the seeds to see if they'd grown. I'd pull the cake out before it baked, and it was always gooey and wrong. I'd shake the crystal jar to make it hurry, and it never grew at all." She drooped. "And my turn — I couldn't wait for that either. I was the littlest. I got fed first, helped first, everyone came when I called, and I thought that was what mattering felt like. Being first. Right now."

"And then?"

"Then there were other needs. Other people who needed things too. And I had to wait. And waiting felt like being forgotten — like if I wasn't first, I didn't matter at all. So I got louder. Me first. Me now. Right NOW. Until —" she looked at the house that had been frozen — "everyone stopped. And every growing thing stopped. And I got my wish. Everything, right now, all for me."

Her voice went tiny. "And it was the loneliest thing in the world. Because nothing good comes the second you want it — good things need time — so when I stopped the time, nothing good could come at all. The cake never baked. The crystal never grew. My turn never came. And there was no one left to be first in front of, because they were all frozen, waiting on me, forever." She folded in. "I'd rather wait my turn in a warm house full of people than be first in a frozen empty one. But I didn't know how to let it go."

"You just did the hardest part," Ivy said. "You said you'd rather wait."

"It's scary, though," the bird whispered. "If I let the baby go first — if I let anything take its time — what if my turn never comes? What if they forget me?"

"They won't," said Oliver, working it out. "Your turn comes. That's the deal. You be patient, and it comes. I thought Mom said it just to get rid of me, but —" he looked at his tower, tall, that he'd built himself while he waited — "she always did come. Every time. The waiting just felt long."

"And while you wait," Ivy said, "you find out you can do more yourself than you thought. I fixed my own dance. Oliver built his own tower. And the cake baked, and the crystal grew, all on their own, the whole time we waited. Waiting isn't nothing happening. Waiting is when everything good actually happens."

The bird looked at the warm, moving house — the fed baby, the golden cake, the sparkling crystal, the papa drying his hands and turning, ready now for a small bird who had waited.

"Okay," the bird said, shaking. "Okay. I'll wait my turn. The baby first. Then me. I can wait."

The last shell of frost cracked and fell away, and her dull feathers flushed bright again — every colour, warm and alive.

[[SPOT 1]]

She took a breath — her first un-frozen breath in a long, long time. "My name is Wren," she said, clear and bright. "My name is Wren. And I'm going to wait my turn. And it's going to come."

Right on cue, the grown-up at the sink crouched down, smiling, and said — to Wren, whose turn it now was — "There you are. Sorry to keep you waiting, little one. What did you need?"

Wren's whole face lit up. Her turn had come. It had been there all along, just on the other side of the waiting.

Above them, the fifth symbol blazed bright gold, then settled into a warm, steady glow. Ivy held out her hand; Wren — patiently, happily — waited for Ivy to be ready, then took it, and between one breath and the next was gone, back into the warm and moving house, back into a turn that was finally, truly hers.

"I built that myself," Oliver said, still not over it. "And I waited for it."

"You did both," said Ivy.

Oliver thought about it. "When we get home, Hazel's going to need Mom a lot. Babies do. I'm going to have to wait my turn a lot." He sighed — the sigh of someone facing something genuinely hard. "And Mom's making that cake that takes forever. The one you can't open the oven on." He brightened, slightly. "But it's really good when it's done."

"Worth the wait," said Ivy, laughing.

"I'm going to practice," Oliver said. "The waiting. The long kind and the short kind."

"Me too."

The courtyard shimmered back around them. Five symbols glowed steady on the book's cover. A fifth fountain rose and joined the others. The sky was almost, almost the truest blue.

One path remained dark. And from it, far off, came a low and angry howl.

The book was already opening in Ivy's hands.`,
};
const chapter6 = {
  id: 'ch6',
  label: 'Chapter 6',
  title: 'The Ward of the Screaming Tantrum',
  sin: 'Anger',
  fullImage: `${IMG}/ch6-storm.png`,
  spots: [`${IMG}/ch6-eye.png`, `${IMG}/ch6-felix-freed.png`],
  text: `The courtyard had changed. Five symbols glowed steadily on the book's cover now, and five fountains sang together, loud and bright. The grey vines had loosened; the sky was almost its proper blue. Only one path stayed dark.

The book fell open in Ivy's hands.

This curse is called Impatience. It is the curse of right now — I want it now, do it for me now, me first. But the good things can't come right now: your turn, the baby's feeding, the cake, the crystal — they all need time to become good. Demand them right now and you only freeze them halfway, and nothing can ever finish. You broke this curse, brave ones, when you waited — when you let the baby go first, and let the cake take its time, and learned the secret: waiting isn't nothing happening. Waiting is when the good things become good. Wait your turn. It always comes.

The book closed softly.

"One path left," Oliver said quietly. Of all the paths, it was the only one that made a sound — a low, far-off howl, like wind that had been angry for a very long time.

"The last one." Ivy didn't take his hoof right away. "Ready?"

"No," said Oliver, honestly. Then he took her hoof anyway. "But together."

"Together."

They stepped onto the sixth path.

The howl became a roar.

The sixth ward was a storm — not a rain storm, a furious one, a tantrum of a storm, wind tearing every direction at once, leaves and toys and broken things flying past, the sky ripped into ragged grey and bruised purple. It was almost impossible to stand. It was completely impossible to think. And it did something the other wards hadn't: it reached straight inside them and went looking for the angry place.

Ivy felt it first. There was a little stage just ahead, warm light on it like a spotlight — a perfect place to dance, and she loved to dance. She started toward it — and her ballet shoes, on her feet a second ago, were gone. Bare hooves. She looked up, and there on the stage was her favorite unicorn, the soft purple one she'd had forever — and as she reached for it the wind snatched it away into the grey.

Something hot and tight rose up in Ivy's chest. "That's not FAIR. I just want to DANCE. Why won't anything just — WORK —" The wind tore another thing away, and a gust whipped up around her, her own little storm feeding the big one.

Oliver was getting it too. A voice had started up by his ear — patient, repeating, the kind that asks you the same thing over and over. "Use your fork, Oliver. Oliver, use your fork. Your fork. Use your —"

"I'm TRYING," Oliver said, and he was, his claws fumbling a fork that kept turning the wrong way. "I keep getting it wrong — stop TELLING me —"

The voice changed, reasonable now. "You can have oatmeal, or you can have yogurt. Which one?"

"I don't WANT oatmeal," Oliver said, climbing. "I don't WANT yogurt. I want — I —" his breath went short and hot, a puff of flame escaping. "I DON'T WANT EITHER ONE!"

The words came out exactly the way they had in the kitchen, a hundred years ago, at the very beginning. And just like in the kitchen, they didn't help. The choices were still oatmeal or yogurt. Nothing changed — except the storm around him doubled.

The two little storms, Ivy's and Oliver's, were being dragged toward the big one in the center, the way small whirlwinds get pulled into a hurricane. Ivy was shouting at the sky. Oliver was breathing fire at a fork. Neither could hear the other. Neither could think. They were being sucked, fast, toward the roaring grey heart of the ward.

And it was Ivy — spinning past him toward the center — who grabbed Oliver's arm and shouted the one thing that made it through.

"OLIVER. We have to CALM DOWN."

"I CAN'T —"

"You CAN. Mom's thing — calm down FIRST, then solve the problem! We can't fix anything in here!"

Somewhere under the rage, Oliver heard it. Calm down first, then solve the problem. He'd heard Mom say it a hundred times. He had never once tried it in the actual middle of being mad.

He tried it now. It was so hard — the angriest part of him did not want to calm down, it wanted to scream and throw the fork and win. But Ivy was holding his arm and saying it with him: "Breathe. Just breathe. Let it come down."

So they stood in the screaming wind and they breathed. Ivy stopped shouting at the sky. Oliver stopped breathing fire and just — breathed. In. Out. The hot tight thing in his chest was still there, but it stopped getting bigger. And then, slowly, like a wave that's finished rising, it began, just a little, to come down. And as it came down — they could think again.

"Okay," Ivy said, still breathing careful. "The problem. What's the actual problem."

"You couldn't find your unicorn. Or your dance shoes."

"And you didn't like your breakfast." Ivy almost laughed, even there. "Those are just... problems. We solve problems." She looked at the little stage. "I don't even need special shoes to dance. I can dance in bare hooves. I've done it a hundred times." And she did — a few steps, right there in the wind — and the storm around her dropped a little more.

Oliver looked at the fork. The voice was still going, patient. Oatmeal or yogurt. And instead of screaming at it, he tried the thing. "Could I... have toast?" he asked. Calm. Out loud. "I don't want oatmeal or yogurt. But I'd have toast."

A pause. "Toast is fine," said the voice.

Oliver stared. "...That's it? I could just ASK?"

Their two little storms had almost died now. And in the new quiet — the big storm still roaring ahead but no longer pulling at them — Ivy said the harder thing. The thing Mom always asked.

"Oliver. The fork voice. What was it trying to do?"

"Boss me. Make me feel bad for getting it wrong."

"Was it, though?" Ivy said gently. "Or was it trying to help you eat? Help you learn the fork?"

Oliver went very quiet. Because when he actually thought about it — when he wasn't inside the storm — the voice had never once sounded mean. It had sounded like Mom. Patient. Saying his name. Trying, five times, ten times, to help him with something hard, getting tired but never, ever going away. Use your fork, Oliver. It wasn't an attack. It had never been an attack. It was someone who loved him, helping him with a thing he kept getting wrong, and not giving up.

"Oh," Oliver said, very softly. "She was trying to help me."

And that was when the big storm screamed — the loudest, most heartbroken sound either of them had ever heard. And through the wind, for the first time, they could see into the eye of it, where something small was curled up, screaming and screaming, the storm pouring out of it without end.

They made their way in, slow, leaning into the wind, holding onto each other, until they reached the quiet, terrible eye. In it was a creature so worn out from screaming that its voice had gone to rags.

"Go AWAY," it shrieked. "Everyone always — nobody ever — it's not FAIR —"

"Hey," Ivy said gently. "We're not going away."

The scream cracked. "You don't understand. Nothing ever goes the way I want. Everyone's always telling me what to do. I HATE my choices. And every time, it gets so big and so hot I can't make it stop, so I just SCREAM —"

"And then what happens?" Ivy asked.

"...Nothing," it said, very small. "Nothing happens. The thing I wanted is still gone. The people are still gone. Nothing ever gets fixed — it just gets louder. And then I'm alone in here. And the storm never stops, because I never —" the ragged voice broke — "I never learned how to make it stop."

It pulled in on itself. "I yelled at my mom. The last time. She was just trying to get my shoes on, and I got so mad I yelled that she didn't love me. And then the storm got so big I couldn't see her anymore. And I never got to take it back."

Oliver's chest went tight — but not with anger this time. Because he had said that exact thing. In a kitchen. To a mom who was only trying to give him a snack. You don't love me. He knew precisely how this creature felt, all the way to the bottom.

"Listen," Oliver said, and he crouched right down into the eye of the storm. "It's a storm. That's all it is. And here's the thing nobody tells you — it passes. If you stop feeding it. If you breathe and let it come down. It always passes. You've just never let it."

"I can't," the creature wept. "It's too big."

"We'll do it with you," said Ivy. "Breathe. In. Out. Let it come down."

And the three of them, in the screaming eye of the worst storm in the kingdom, breathed. In. Out. The creature shaking, the wind howling — and then, for the first time in longer than it could remember, the storm slowed.

[[SPOT 0]]

"Now," Ivy said softly. "Your mom. When she asked you to put your shoes on. What was she trying to do?"

"...Get me out the door. Get me to school." Its eyes went wide, and wet. "She wasn't being mean. She was trying to help me. She loved me. She was right there loving me the whole time, and I told her she didn't."

"She still does," Oliver said. "I promise. The yelling doesn't use it up. Being mad doesn't make them stop loving you. It's still there when the storm passes. It's always still there."

And the storm passed.

Not slowly, at the end — all at once, like a held breath finally let go. The wind dropped, the grey tore open, warm light poured down, the roaring stopped, and there was, at last, quiet.

[[SPOT 1]]

Sitting in the sudden stillness, blinking, worn out, was a small fox. Russet-red, white-tipped tail, big dark eyes still wet, ears flat with how tired it was.

"It's quiet," the fox said, like it could hardly believe it. "It actually — stopped."

"It always could," said Ivy.

The fox looked at its own paws, at the calm sky. "I forgot it passes. I thought if I was that mad, it meant something was really wrong and I had to make everyone see how wrong, RIGHT NOW — but it just passes. If you let it. And then you can actually fix the thing. And the people telling me stuff were mostly just... trying to help."

"That's the whole thing," said Oliver.

"It'll come back, though," the fox said. "The big mad. Tomorrow."

"Yeah. Mine too," said Oliver. "It's not gone forever. You just — when it comes, you breathe, you let it pass, and then you solve the problem. And you ask what they were trying to do." He smiled a little. "I've got a lot of practicing to do, honestly."

The fox almost laughed — a small, real, un-stormy sound, and sat up very straight. "My name is Felix," it said, clear and calm, no storm in it at all. "My name is Felix. And the first thing I'm going to do is go tell my mom I'm sorry. And that I know she loves me."

Oliver's throat did something complicated. "Yeah," he said quietly. "Me too."

Above them the sixth and last symbol blazed bright gold — and as it caught, all six flared together into a ring of warm light, and held.

Ivy held out her hand. Felix took it — calm, and sure — and between one breath and the next he was gone, back to a mom who was, this very second, still loving him, exactly as Oliver had promised.

And then the kingdom changed. It started in the courtyard and rushed outward — the grey vines bursting into green and flower, all six fountains leaping up clear and singing together, the sky finishing its turn, edge to edge, the truest blue. One by one the six wrong gardens came right. The Lost Kingdom wasn't lost anymore.

The book went warm in Ivy's hands. She turned it over. Where the old hard letters had said All six must be freed before you may go home, the words had changed. Now they said, simply:

Well done. Go home.

A door of warm light opened where the sixth path had been.

Oliver looked at it. Then at Ivy. He was thinking, she could tell, about a kitchen, and a snack, and a thing he'd said.

"When we get home," Oliver said, "I have to say sorry to Mom. For real. She was just trying to give me a snack, and I told her she didn't love me. And she was right there. Loving me."

"She was," Ivy said softly. "She still is. She's probably downstairs right now."

Oliver took a breath — the good kind, the kind that lets something come down. "Okay," he said. "Let's go home."

And hoof in hand, the unicorn and the dragon stepped together into the warm and waiting light.`,
};
const epilogue = {
  id: 'epilogue', label: 'Epilogue', title: 'Home',
  fullImage: `${IMG}/epilogue-full.png`, spots: [], text: '',
};

const book = {
  id: 'six-curses',
  title: 'The Six Curses of the Lost Kingdom',
  kind: 'chapter',
  coverImage: `${IMG}/0-cover.png`,
  sections: [
    prologue,
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
    chapter6,
    epilogue,
  ],
};

export default book;
