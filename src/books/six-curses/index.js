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
  fullImage: `${IMG}/ch1-peach-tree.png`,
  spots: [`${IMG}/ch1-feast-tables.png`, `${IMG}/ch1-theo-freed.png`],
  text: `The path from the courtyard sloped gently downward, and the smell reached them before anything else did.

It came in waves — first something warm and cinnamony, then sugar, then fruit so ripe it was almost gone sour underneath. Something that made Ivy's nose wrinkle even as her mouth watered.

"Do you smell that?" Oliver said.

"Yes," Ivy said carefully.

"It smells INCREDIBLE."

Ivy wasn't sure incredible was exactly the word she would have used.

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

He had juice running down his chin and his eyes had gone very wide and his expression was the one he got when something was so good it almost hurt.

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

Oliver sat down cross-legged on the stone ground. Like he was settling in. Like he understood this was going to take a while and that was okay.

"What kind of cake?" he asked.

Ivy looked at him. It was exactly the right question. She wouldn't have thought of it.

The creature's eyes moved toward Oliver's voice.

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

Ivy watched his face. She could see it — the thing Theo was describing. She could see Oliver feeling it right now. The wanting already building again, even now, even after everything they'd just seen. His eyes kept moving toward the peach tree. His hand had shifted, almost without him noticing, a few inches closer to the fruit on the ground.

"Oliver," she said softly.

He looked up.

"I know," he said. His voice was strange. "I can feel it. He's right. I finished the peach and it was the best thing I've ever eaten and I'm already—" he stopped. Looked at his hands, still fading at the edges. "I'm already not thinking about how good it was. I'm just thinking about the next one."

He was quiet for a moment.

"That's the curse," he said. Not a question.

"Yes," Theo's voice said. "That's the curse."

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

"He stopped," Theo's voice said. Barely a whisper. Full of something that sounded almost like wonder. "He just — he stopped."

"Yes," Ivy said.

"How."

"I just decided the good thing I already had was enough," Oliver said. "Instead of thinking about the next one." He paused. "It was hard though."

A long silence.

"I don't know if I can," Theo said.

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

"I had help." Theo was quiet for a moment, looking at them both — this unicorn and this dragon who had come from somewhere else and crouched down in the roots of the peach tree and stayed. Something in his face settled, like a knot finally coming loose.

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

"Oh," said Oliver, looking around with great satisfaction. "They knew we were coming."

Ivy looked around more slowly.

Something felt off. She couldn't say what exactly. Everything looked fine. Everything looked perfectly, carefully, deliberately fine.

"I suppose," she said.

Oliver had already dropped into his chair and was examining his presents with great interest. "One, two, three," he counted happily. He looked over at Ivy's pedestal. "You've got — oh. Two." He shrugged. "Cool."

Ivy sat down in her chair.

She looked at her two presents.

She looked at his three.

It's fine, she told herself. It doesn't matter. It's fine.

She picked up her fork and tried a bite of cake. It was good. She barely tasted it.

Oliver had moved on to the candy bags. He picked his up, hefted it, gave it a satisfied shake. It was large and full and made a very pleasing rustling sound.

Ivy picked up hers.

It was smaller. Noticeably. She turned it over in her hands. Same stripes. Different size.

"Oliver," she said carefully. "Is your candy bag bigger than mine?"

Oliver looked at both bags with genuine scientific interest. "Yeah," he said. "A bit."

"Why?"

He thought about it. "Don't know." He held his out. "Want some?"

"No," Ivy said. Her voice was very controlled. "I don't want some of yours. I want my bag to be the same size."

"Oh." Oliver considered this. "That does seem a bit unfair." He said it the way you say something is mildly interesting, then went back to his candy.

Ivy put her bag down.

She looked at the cake. Took another bite. Still couldn't taste it.

She noticed, without meaning to, that Oliver's slice was slightly larger than hers. Just slightly. Just enough.

The stuffed animals were next. Oliver had four — a bear, a fox, a small elephant, and something fluffy and blue that Ivy couldn't identify. They were all soft and bright-eyed and new-looking.

Ivy had three. A rabbit, a hedgehog, and an owl. All fine. All perfectly nice.

One less.

"Oliver," she said. Her voice had developed an edge. "You have four stuffies."

"Mmm." He was already introducing them to each other.

"I have three."

"Okay." He held up the fluffy blue thing. "What do you think this is? I think it might be a cloud."

"Oliver. Are you listening to me? You have MORE."

He looked up. Looked at her pile, then his. "Oh. Yeah." He held out the cloud. "Here, have the cloud."

"I don't WANT the cloud, Oliver, that's not the—" she stopped. Breathed. "It's not about the cloud. It's about the fact that my pile has less and yours has more and it's NOT FAIR."

The last two words came out louder than she intended.

Oliver blinked.

Something in the garden brightened slightly. Like a light turning up. Ivy didn't notice.

Her stuffies, she didn't notice either, had gone slightly grey.

The presents were the worst.

Oliver tore into his with great enthusiasm, making appreciative sounds at each one. Ivy sat with her two in front of her, not opening them, just looking at them. Then looking at his three. Then back at hers.

Two.

He had three and she had two and that was one more than her and someone had decided that was how it should be and it was WRONG and UNFAIR and—

"Ivy." Oliver was standing in front of her, holding something out. "Here. Have one of mine. I don't mind."

"I DON'T WANT ONE OF YOURS."

He stepped back.

"I want my OWN third present," Ivy said. Her voice was shaking now. "I want the same as you. I want it to be FAIR. Why does he get more? Why do I always get less? It's NOT FAIR, Oliver, it's NOT—"

She stopped.

There was a cold tap on her shoulder.

She spun around.

Hovering just behind her — just off the ground, pale and wispy, trailing a faint cold mist — was a rabbit. Or what had been a rabbit. She was small and slight and translucent, her long ears drifting slightly as though moved by a breeze that wasn't there. Her eyes were large and sad and completely focused on Ivy.

She had been right there the whole time. Ivy hadn't seen her once. She'd been too busy looking at Oliver's pile.

"Who are you?" Ivy said. "Why are you—" she gestured at the ghostliness — "like that?"

The rabbit looked at her steadily.

"You are too," she said.

Ivy laughed — a short sharp sound. "No I'm not, I'm perfectly—" She looked at Oliver.

Oliver's face said everything.

"Yeah, Ivy," he said quietly. "She's right. You are."

Ivy looked down at her hands.

They were pale. Not pale like she was cold. Pale like the light was going through them. She could see the yellow tablecloth through her fingers. She lifted one hand and looked at it against the sky and could see, faintly, the shapes of clouds on the other side.

She was almost see-through.

"What—" her voice came out very small. "What happened to me?"

She looked at her presents. They were grey and translucent, the bright paper faded to almost nothing. Her candy bag barely there. Her stuffies pale shadows of themselves, the colours washed out, the softness somehow visible but unreachable.

"What happened to us?" she whispered, looking at the ghost rabbit.

The rabbit drifted closer. She looked at Ivy the way someone looks at a person they understand completely.

"I have ten brothers and sisters," she said. "I'm the second oldest. Mama was always asking me to help. To be patient. To be nice to the little ones." A pause. "And mostly I tried. But the little ones always got the first slice of carrot cake. And when their stuffies wore out they got new ones. I got told I was too old for new stuffies."

Ivy said nothing. She was listening.

"I kept thinking — it's not fair. Every meal, every birthday, every time Mama said Becca, help me. Becca, be patient. Becca, you understand." Her voice was barely a whisper. "And I did understand. But it still hurt."

Oliver had sat down on the ground. Quietly. Not interrupting.

"But here's what happened," Becca said. "While I was saying not fair — I stopped tasting my cake. I stopped noticing how soft my stuffies were. I stopped feeling any of the good things I actually had. All I could think about was how everything compared. How much more they had. How little I had."

[[SPOT 0]]

She looked at her own pile — the one labeled BECCA, sitting untouched, unlooked-at, the whole time they'd been there.

"All the joy just went. Everything I had went grey and ghostly." She paused. "Not because it was taken from me. Because I stopped seeing it."

The garden was very quiet.

Ivy looked at her pale translucent hands. At her grey presents. At her faded stuffies.

"So how do we break this?" she said. Her voice cracked slightly. "I don't want to be a ghost. I miss Mama and Dad. I miss—" she looked at Oliver and her voice broke completely — "I can actually see through you from here."

"That's you, Ivy," Oliver said gently. "You're the see-through one."

"I know." She pressed her pale hands together. "I don't want this. I want to go home."

Becca looked at her own pile again. "I wish I knew how," she said quietly. "If I knew I wouldn't still be here."

A silence.

Then Oliver's face did the thing it did when something was clicking into place. That particular expression — brow furrowed, mouth slightly open, eyes going somewhere internal.

"You know how Mama always says that thing?" he said slowly. "When we say not fair? She always says—" he paused, making sure he had it right — "be grateful for what you have."

Nobody spoke.

"I always thought that was just something grownups say," he added honestly.

Ivy looked at him. Then at her grey presents. Then at her pale hands.

She reached out and picked up one of her presents.

It was lighter than she expected. The paper, grey and ghostly as it was, crinkled softly under her fingers. She looked at it for a long moment — really looked, not comparing, just seeing. A small present with a pale ribbon. Hers. Actually hers.

She opened it.

Inside was a small notebook, the kind with a clasp. The cover had a tiny unicorn pressed into it. Her name — IVY — in small neat letters on the first page.

Something in her chest loosened.

"Oh," she said softly.

She picked up the second present. Opened it slowly. A set of coloured pencils — twelve of them, each a different shade of purple. Every shade of her favourite colour she'd ever seen and some she hadn't.

[[SPOT 1]]

She looked at them for a long time.

"These are really beautiful," she said. Not to Oliver. Not to Becca. Just out loud. Just naming it. Just seeing it.

"They are," Oliver said.

The colour came back first. A warmth spreading from her hands outward, the purple deepening in her mane, her coat going from pale grey back to white, her edges sharpening back into the familiar clear lines of herself. She watched her stuffies brighten — the rabbit's eyes going dark and shiny, the hedgehog going warm brown, the owl getting its colours back.

Her candy bag fattened and brightened in her hands.

She was solid. She was herself. She was completely, entirely there.

She looked at Becca.

"Your pile," she said. "Have you ever actually looked at it?"

Becca turned toward it slowly. As if it might not be there.

It was there.

A small pile. Not as large as Oliver's or Ivy's. But there. A worn stuffy — a little grey rabbit, loved to softness. A handwritten note, folded small. A single slice of carrot cake on a tiny plate, real and fragrant.

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

She looked at him. At his solid green scales and his orange patches and his round amber eyes looking back at her, completely there, completely himself.

"I could see through you," she said. "When I was fading. I could see the garden behind you and I thought — what if I just kept going and couldn't come back."

"I kept trying to get your attention," Oliver said. "You couldn't hear me."

"I know." She looked at her hands — solid, white, exactly right. "I was so loud about not fair that I couldn't hear anything else."

Oliver thought about this with great seriousness.

"Mama's thing works," he said finally. "The grateful thing."

"Yeah," Ivy said. "It does."

The courtyard shimmered back around them. Two symbols glowed steady on the book's cover. The second fountain had joined the first, both trickling quietly now. The sky had settled on something — not quite blue, not quite gold, but trying.

Four paths remained dark.

The book was already opening in Ivy's hands.`,
};

// Chapters 3–6 + epilogue are outlined but not yet written. They're included so
// the table of contents shows the full arc; the reader renders a gentle
// "coming soon" page for any section whose text is empty.
const chapter3 = {
  id: 'ch3', label: 'Chapter 3', title: 'The Ward of Lazy Bum',
  fullImage: `${IMG}/ch3-full.png`, spots: [], text: '',
};
const chapter4 = {
  id: 'ch4', label: 'Chapter 4', title: 'The Ward of Never Share',
  fullImage: `${IMG}/ch4-full.png`, spots: [], text: '',
};
const chapter5 = {
  id: 'ch5', label: 'Chapter 5', title: 'The Ward of Always Right',
  fullImage: `${IMG}/ch5-full.png`, spots: [], text: '',
};
const chapter6 = {
  id: 'ch6', label: 'Chapter 6', title: 'The Ward of Screaming Tantrum',
  fullImage: `${IMG}/ch6-full.png`, spots: [], text: '',
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
