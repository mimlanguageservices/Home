// Learn Skills mini lessons (Language Form & Meaning). Key = slug of the topic name on the Learn Skills page.
// Sections: rules (explanation), examples, mistakes, guided (word bank, ___ = blank), toefl (4 options, a = index of the answer),
// challenge (paragraph with {1}..{n} blanks, a = index of the answer). <mark> highlights the target words.
window.LESSONS = {
  'too-enough-so-and-such': {
    title: 'Too, enough, so and such',
    group: 'Connecting and comparing',
    intro: 'These four words tell us <b>how much</b> of something there is, and whether that amount is a problem, just right or very strong.',
    rules: [
      { word: 'too', meaning: 'more than is good or needed. It usually shows a <b>problem</b>.',
        patterns: ['too + adjective / adverb', 'too much + uncountable noun · too many + plural noun', 'too … (for someone) to + verb'],
        example: 'The box is <mark>too</mark> heavy for me to lift.' },
      { word: 'enough', meaning: 'as much as is needed. <b>Not enough</b> = less than is needed.',
        patterns: ['adjective / adverb + enough', 'enough + noun', '… enough (for someone) to + verb'],
        example: 'She is old <mark>enough</mark> to ride the bus alone.' },
      { word: 'so', meaning: 'makes an adjective or adverb <b>stronger</b>. Often followed by a result with <i>that</i>.',
        patterns: ['so + adjective / adverb', 'so much + uncountable noun · so many + plural noun', 'so … that + result'],
        example: 'The movie was <mark>so</mark> funny that we laughed for hours.' },
      { word: 'such', meaning: 'also makes something <b>stronger</b>, but it goes before a <b>noun</b>.',
        patterns: ['such a / an + (adjective) + singular noun', 'such + (adjective) + plural or uncountable noun', 'such … that + result'],
        example: 'It was <mark>such a</mark> funny movie that we laughed for hours.' }
    ],
    tip: '<b>Quick check:</b> Is there a noun after it? Use <b>such</b> (such a nice day). No noun, just an adjective? Use <b>so</b> (so nice). Remember: <b>enough</b> goes <i>after</i> adjectives but <i>before</i> nouns.',
    examples: [
      { s: 'The soup is <mark>too</mark> hot to eat right now.', note: 'too + adjective + to + verb: we can\'t eat it yet.' },
      { s: 'Is the water warm <mark>enough</mark> to swim in?', note: 'adjective + enough: is it warm as much as we need?' },
      { s: 'We don\'t have <mark>enough</mark> chairs for everyone.', note: 'enough + noun: fewer chairs than we need.' },
      { s: 'Lina was <mark>so</mark> tired that she fell asleep on the bus.', note: 'so + adjective + that + result.' },
      { s: 'It was <mark>such a</mark> beautiful day that we had lunch in the park.', note: 'such a + adjective + noun + that + result.' }
    ],
    mistakes: [
      { wrong: 'He isn\'t enough old to drive.', right: 'He isn\'t old enough to drive.', why: '<b>Enough</b> goes after an adjective.' },
      { wrong: 'It was so a good game.', right: 'It was such a good game.', why: 'Before <b>a / an</b> + noun, use <b>such</b>.' },
      { wrong: 'The test was such difficult.', right: 'The test was so difficult.', why: '<b>Such</b> needs a noun. With only an adjective, use <b>so</b>.' },
      { wrong: 'I\'m too happy to see you!', right: 'I\'m so happy to see you!', why: '<b>Too</b> means there is a problem. For a strong positive feeling, use <b>so</b> or <b>very</b>.' },
      { wrong: 'There are too much people here.', right: 'There are too many people here.', why: 'Use <b>many</b> with plural nouns (people, cars) and <b>much</b> with uncountable nouns (time, water).' },
      { wrong: 'She speaks too fast for understand.', right: 'She speaks too fast for me to understand.', why: 'The pattern is <b>too … for someone to + verb</b>.' }
    ],
    guided: {
      bank: ['too', 'enough', 'so', 'such', 'such a'],
      items: [
        { s: 'This T-shirt is ___ small for me. I need a bigger size.', a: 'too', why: 'It is more than is good (a problem): <b>too</b> + adjective.' },
        { s: 'Are you tall ___ to reach the top shelf?', a: 'enough', why: 'adjective + <b>enough</b> + to + verb.' },
        { s: 'The concert was ___ loud that my ears hurt.', a: 'so', why: '<b>so</b> + adjective + that + result.' },
        { s: 'Mateo is ___ kind person. Everyone likes him.', a: 'such a', why: '<b>such a</b> + adjective + singular noun (person).' },
        { s: 'They are ___ good friends that they talk every day.', a: 'such', why: '<b>such</b> + adjective + plural noun (friends). No "a" with plural nouns.' }
      ]
    },
    toefl: [
      { q: 'The bridge was closed because the river was ___ high for cars to cross safely.', o: ['enough', 'such', 'too', 'so much'], a: 2, why: 'The high river is a problem: <b>too</b> high (for cars) to cross.' },
      { q: 'Ana didn\'t buy the shoes because she didn\'t have ___.', o: ['enough money', 'money enough', 'too money', 'so money'], a: 0, why: '<b>Enough</b> goes before a noun: enough money.' },
      { q: 'The hike was ___ that we needed three breaks.', o: ['such long', 'too long that', 'long enough', 'so long'], a: 3, why: '<b>So</b> + adjective + that + result. We do not use "too ... that".' },
      { q: 'It was ___ that nobody wanted to go outside.', o: ['so a cold morning', 'such a cold morning', 'such cold morning', 'too cold morning'], a: 1, why: '<b>Such a</b> + adjective + singular noun.' },
      { q: 'The museum is ___ to visit in one day. You need at least two days.', o: ['big enough', 'such big', 'too big', 'so big'], a: 2, why: 'One day is not possible, so it is a problem: <b>too</b> big to visit. "Big enough" would mean one day is possible.' }
    ],
    challenge: {
      title: 'A Day at the Gold Museum',
      text: 'Last Saturday, my class went on a field trip to the Gold Museum in Bogotá. The bus left at 6:00 a.m., which was {1} early for most of us, and half the class slept on the way. The museum was {2} big that we could not see everything in one morning. There were {3} beautiful objects that I took more than a hundred photos. Our guide spoke {4} fast for some students, so our teacher asked her to slow down. At lunch, there wasn\'t {5} time to eat and visit the gift shop, so I chose the gift shop! It was {6} amazing day that I want to go back with my family.',
      blanks: [
        { o: ['enough', 'too', 'such', 'so much'], a: 1, why: 'Too early = a problem (half the class slept).' },
        { o: ['such', 'too', 'so', 'enough'], a: 2, why: '<b>So</b> + adjective + that + result.' },
        { o: ['so', 'such', 'too', 'enough'], a: 1, why: '<b>Such</b> + adjective + plural noun (objects).' },
        { o: ['too', 'enough', 'such', 'so much'], a: 0, why: 'Too fast (for some students) = a problem, so the teacher asked her to slow down.' },
        { o: ['too', 'so', 'such', 'enough'], a: 3, why: 'Not <b>enough</b> time = less time than they needed.' },
        { o: ['so an', 'such', 'so', 'such an'], a: 3, why: '<b>Such an</b> + adjective starting with a vowel sound + singular noun.' }
      ]
    }
  },

  'prepositions': {
    title: `Prepositions`,
    group: `Connecting and comparing`,
    intro: `Prepositions are small words like <b>in</b>, <b>on</b>, <b>at</b> and <b>for</b>. They show <b>time</b>, <b>place</b> and <b>movement</b>, and many words have a preposition that always goes with them.`,
    rules: [
      { word: `Time: at / on / in`, meaning: `From small to big: <b>at</b> an exact time, <b>on</b> a day, <b>in</b> a longer period.`,
        patterns: [`at + clock time · at night · at noon`, `on + days and dates (on Monday, on May 3)`, `in + months, years, seasons (in July, in 2025) · in the morning`],
        example: `My birthday is <mark>on</mark> May 3, and the party starts <mark>at</mark> 4:00.` },
      { word: `Place: at / on / in`, meaning: `<b>at</b> a point, <b>on</b> a surface, <b>in</b> inside a space.`,
        patterns: [`at + a point or building (at the door, at school)`, `on + a surface (on the table, on the wall)`, `in + inside a space (in the box, in Bogotá)`],
        example: `The keys are <mark>on</mark> the table <mark>in</mark> the kitchen.` },
      { word: `Movement`, meaning: `These show <b>where something goes</b>.`,
        patterns: [`to (a place) · into (enter) · out of (leave)`, `across (from one side to the other)`, `through (inside, from one end to the other) · along · past`],
        example: `We walked <mark>across</mark> the bridge and <mark>into</mark> the park.` },
      { word: `Word partners`, meaning: `Many adjectives and verbs <b>always</b> use the same preposition. Learn them together.`,
        patterns: [`good at · interested in · afraid of · proud of`, `depend on · listen to · wait for · arrive at / in`, `thank someone for · look for · belong to`],
        example: `She is good <mark>at</mark> math and interested <mark>in</mark> science.` }
    ],
    tip: `<b>Quick check for time:</b> exact time → <b>at</b> (at 3:00), day or date → <b>on</b> (on Friday), month, year or season → <b>in</b> (in March). Spanish uses <i>en</i> for all three, so be careful! Learn word partners as one chunk: <i>depend on</i>, not <i>depend of</i>.`,
    examples: [
      { s: `We have English <mark>on</mark> Tuesdays and Thursdays.`, note: `on + days of the week.` },
      { s: `The museum opens <mark>at</mark> 9:00 <mark>in</mark> the morning.`, note: `at + clock time; in + part of the day.` },
      { s: `There is a map of Colombia <mark>on</mark> the wall.`, note: `on = touching a surface.` },
      { s: `The cat ran <mark>through</mark> the garden and <mark>under</mark> the car.`, note: `through = in one side and out the other.` },
      { s: `Many students are afraid <mark>of</mark> speaking in public.`, note: `afraid + of (+ -ing form).` }
    ],
    mistakes: [
      { wrong: `I was born in May 5.`, right: `I was born on May 5.`, why: `A date (month + day) takes <b>on</b>. A month alone takes <b>in</b>: in May.` },
      { wrong: `See you in Monday!`, right: `See you on Monday!`, why: `Days of the week take <b>on</b>.` },
      { wrong: `She is very good in English.`, right: `She is very good at English.`, why: `The partner of <i>good</i> is <b>at</b>: good at English, good at soccer.` },
      { wrong: `We arrived to the airport late.`, right: `We arrived at the airport late.`, why: `<b>Arrive at</b> a place (at the airport) or <b>in</b> a city or country (in Bogotá). Never <i>arrive to</i>.` },
      { wrong: `I'm waiting my friend.`, right: `I'm waiting for my friend.`, why: `The partner of <i>wait</i> is <b>for</b>.` },
      { wrong: `It depends of the weather.`, right: `It depends on the weather.`, why: `In Spanish it is <i>depende de</i>, but in English it is <b>depend on</b>.` }
    ],
    guided: {
      bank: [`in`, `on`, `at`, `for`, `of`],
      items: [
        { s: `The concert starts ___ 7:30 tonight.`, a: `at`, why: `An exact clock time takes <b>at</b>.` },
        { s: `We usually go to the beach ___ December.`, a: `in`, why: `A month takes <b>in</b>.` },
        { s: `There is a big map ___ the wall of our classroom.`, a: `on`, why: `A surface (the wall) takes <b>on</b>.` },
        { s: `Thank you ___ your help with my homework!`, a: `for`, why: `<b>Thank someone for</b> something.` },
        { s: `My little brother is afraid ___ the dark.`, a: `of`, why: `The partner of <i>afraid</i> is <b>of</b>.` }
      ]
    },
    toefl: [
      { q: `The school library is closed ___ Sundays and public holidays.`, o: [`in`, `at`, `on`, `by`], a: 2, why: `Days take <b>on</b>: on Sundays.` },
      { q: `Lucas is very interested ___ robots, so he joined the science club.`, o: [`on`, `in`, `at`, `for`], a: 1, why: `The partner of <i>interested</i> is <b>in</b>.` },
      { q: `To get to the station, walk ___ the bridge and turn left.`, o: [`across`, `between`, `among`, `during`], a: 0, why: `<b>Across</b> = from one side to the other.` },
      { q: `Whether we play the final match depends ___ the weather.`, o: [`from`, `of`, `with`, `on`], a: 3, why: `<b>Depend on</b> something.` },
      { q: `Please put your bags ___ the shelf above your seat.`, o: [`in`, `on`, `at`, `to`], a: 1, why: `A shelf is a surface: <b>on</b> the shelf.` }
    ],
    challenge: {
      title: `My First Day at a New School`,
      text: `I will never forget my first day at my new school. It was {1} a rainy Monday in February. I arrived {2} the school gate at 7:15, but I was so nervous that I stayed {3} my mom's car for ten more minutes. Finally, I walked {4} the main door. In my first class, a girl named Sara sat {5} me and showed me where everything was. "Don't worry," she said. "Everyone here is very good {6} making new friends." She was right!`,
      blanks: [
        { o: [`in`, `on`, `at`, `by`], a: 1, why: `A day (a rainy Monday) takes <b>on</b>.` },
        { o: [`to`, `in`, `on`, `at`], a: 3, why: `<b>Arrive at</b> a place: at the school gate.` },
        { o: [`on`, `at`, `in`, `into`], a: 2, why: `She stayed inside the car: <b>in</b> the car.` },
        { o: [`through`, `across`, `along`, `among`], a: 0, why: `In one side and out the other: <b>through</b> the door.` },
        { o: [`between`, `among`, `next to`, `behind of`], a: 2, why: `<b>Next to</b> = beside. <i>Between</i> needs two people, and we say <i>behind</i>, not <i>behind of</i>.` },
        { o: [`in`, `at`, `on`, `for`], a: 1, why: `<b>Good at</b> + -ing form: good at making friends.` }
      ]
    }
  },

  'conjunctions': {
    title: `Conjunctions`,
    group: `Connecting and comparing`,
    intro: `Conjunctions join two ideas in one sentence. Each one shows how the ideas are connected: <b>adding</b>, <b>contrast</b>, <b>reason</b>, <b>result</b>, <b>time</b> or <b>condition</b>.`,
    rules: [
      { word: `and · but · or · so`, meaning: `The four most common joining words.`,
        patterns: [`and = adds information`, `but = shows a contrast`, `or = gives a choice · so = shows a result`],
        example: `I was tired, <mark>so</mark> I went to bed early.` },
      { word: `because · although`, meaning: `<b>because</b> gives a reason. <b>although</b> (or <b>even though</b>) shows a surprising contrast.`,
        patterns: [`main idea + because + reason`, `Although + idea, + surprising result`, `even though = a stronger although`],
        example: `<mark>Although</mark> it was raining, we played soccer.` },
      { word: `Time and condition`, meaning: `These tell us <b>when</b> or <b>under what condition</b> something happens.`,
        patterns: [`when · while · before · after · until`, `if = on the condition that`, `unless = if … not`],
        example: `You can't play <mark>unless</mark> you finish your homework.` },
      { word: `Pairs`, meaning: `Some conjunctions come in <b>pairs</b>. Use the correct partner.`,
        patterns: [`both … and`, `either … or · neither … nor`, `not only … but also`],
        example: `<mark>Both</mark> my sister <mark>and</mark> I play the guitar.` }
    ],
    tip: `<b>Ask what the second idea does:</b> adds (and), contrasts (but, although), gives a reason (because), shows a result (so) or a condition (if, unless). Use only <b>one</b> joining word: never <i>although … but</i> or <i>because … so</i> in the same sentence.`,
    examples: [
      { s: `I wanted to go to the party, <mark>but</mark> I had too much homework.`, note: `but = contrast.` },
      { s: `We stayed inside <mark>because</mark> it was very windy.`, note: `because + reason.` },
      { s: `Do you want juice <mark>or</mark> water?`, note: `or = a choice.` },
      { s: `<mark>Although</mark> the test was difficult, most students passed.`, note: `although = a surprising contrast.` },
      { s: `You won't get better <mark>unless</mark> you practice every day.`, note: `unless = if you don't.` }
    ],
    mistakes: [
      { wrong: `Although it was cold, but we went swimming.`, right: `Although it was cold, we went swimming.`, why: `<b>Although</b> already shows the contrast. Do not add <i>but</i>.` },
      { wrong: `Because I was sick, so I stayed home.`, right: `Because I was sick, I stayed home.`, why: `Use <b>because</b> or <b>so</b>, not both.` },
      { wrong: `Unless you don't study, you will fail.`, right: `Unless you study, you will fail.`, why: `<b>Unless</b> already means <i>if not</i>.` },
      { wrong: `Neither Ana or Pablo came to class.`, right: `Neither Ana nor Pablo came to class.`, why: `<b>Neither</b> goes with <b>nor</b>. <b>Either</b> goes with <b>or</b>.` },
      { wrong: `Both Tomás or Lisa are coming.`, right: `Both Tomás and Lisa are coming.`, why: `<b>Both</b> goes with <b>and</b>.` },
      { wrong: `I like pizza, and I don't like pasta.`, right: `I like pizza, but I don't like pasta.`, why: `Two opposite ideas need a contrast word: <b>but</b>.` }
    ],
    guided: {
      bank: [`and`, `but`, `or`, `so`, `because`],
      items: [
        { s: `I studied hard, ___ I passed the test.`, a: `so`, why: `Passing is the result of studying: <b>so</b>.` },
        { s: `Would you like rice ___ potatoes with your chicken?`, a: `or`, why: `A choice between two things: <b>or</b>.` },
        { s: `The movie was long, ___ it was very exciting.`, a: `but`, why: `Long (negative) and exciting (positive) are a contrast: <b>but</b>.` },
        { s: `Mateo was late ___ he missed the bus.`, a: `because`, why: `Missing the bus is the reason: <b>because</b>.` },
        { s: `We bought bread, cheese ___ fruit for the picnic.`, a: `and`, why: `Adding the last thing in a list: <b>and</b>.` }
      ]
    },
    toefl: [
      { q: `___ it was very cold, the children played outside all afternoon.`, o: [`Because`, `Although`, `Unless`, `So`], a: 1, why: `Playing outside in the cold is surprising: <b>Although</b>.` },
      { q: `You can't use the computer lab ___ a teacher is with you.`, o: [`unless`, `because`, `although`, `so`], a: 0, why: `<b>Unless</b> = if a teacher is not with you.` },
      { q: `Neither my parents ___ my grandparents have been to Europe.`, o: [`or`, `and`, `nor`, `but`], a: 2, why: `<b>Neither</b> … <b>nor</b>.` },
      { q: `The road was closed, ___ we had to take a different route.`, o: [`because`, `although`, `unless`, `so`], a: 3, why: `Taking another route is the result: <b>so</b>.` },
      { q: `My phone rang ___ I was taking a shower.`, o: [`during`, `while`, `unless`, `so that`], a: 1, why: `<b>While</b> + a clause (I was taking). <i>During</i> is followed by a noun: during my shower.` }
    ],
    challenge: {
      title: `A Rainy Soccer Match`,
      text: `Our team had a big soccer match on Saturday. The sky was dark {1} we left home, and soon it started to rain. The coach said we could play {2} there was no thunder. {3} the field was wet and muddy, we played very well. In the first half, {4} our team nor the other team scored. In the second half, Tomás ran down the field {5} kicked the ball into the net! We won 1-0. We were all very dirty, {6} we were also very happy.`,
      blanks: [
        { o: [`unless`, `when`, `although`, `so`], a: 1, why: `<b>When</b> = at the time that we left.` },
        { o: [`as long as`, `even though`, `because of`, `so that`], a: 0, why: `<b>As long as</b> = only if (there was no thunder).` },
        { o: [`Because`, `Unless`, `So`, `Although`], a: 3, why: `Playing well on a muddy field is surprising: <b>Although</b>.` },
        { o: [`either`, `both`, `neither`, `not`], a: 2, why: `<b>Neither</b> … <b>nor</b>: no team scored.` },
        { o: [`but`, `and`, `or`, `so`], a: 1, why: `Two actions one after the other: ran <b>and</b> kicked.` },
        { o: [`so`, `because`, `or`, `but`], a: 3, why: `Dirty and happy are a contrast: <b>but</b>.` }
      ]
    }
  },

  'comparatives-and-superlatives': {
    title: `Comparatives and superlatives`,
    group: `Connecting and comparing`,
    intro: `We use <b>comparatives</b> to compare two things (taller, more interesting) and <b>superlatives</b> to say one thing is number one in a group (the tallest, the most interesting).`,
    rules: [
      { word: `Short adjectives`, meaning: `One syllable, and two syllables ending in <b>-y</b>: add <b>-er</b> / <b>the -est</b>.`,
        patterns: [`tall → taller → the tallest`, `big → bigger → the biggest (double the last letter)`, `happy → happier → the happiest (y → i)`],
        example: `Mount Everest is <mark>the highest</mark> mountain in the world.` },
      { word: `Long adjectives`, meaning: `Most adjectives with two or more syllables: use <b>more</b> / <b>the most</b>.`,
        patterns: [`beautiful → more beautiful → the most beautiful`, `expensive → more expensive → the most expensive`, `less / the least = the opposite`],
        example: `This book is <mark>more interesting</mark> than the movie.` },
      { word: `Irregular`, meaning: `These change completely. Learn them by heart.`,
        patterns: [`good → better → the best`, `bad → worse → the worst`, `far → farther → the farthest · much / many → more → the most`],
        example: `My cold is <mark>worse</mark> today than yesterday.` },
      { word: `Other patterns`, meaning: `Use these words with comparisons.`,
        patterns: [`comparative + than`, `the + superlative + in / of`, `as + adjective + as (equal) · not as … as`],
        example: `Sofía is <mark>as tall as</mark> her mother.` }
    ],
    tip: `<b>Two things?</b> Use a comparative + <b>than</b>. <b>One in a group?</b> Use <b>the</b> + superlative. Never use both forms together: not <i>more taller</i>, not <i>the most fastest</i>.`,
    examples: [
      { s: `A cheetah is <mark>faster than</mark> a horse.`, note: `short adjective + -er + than.` },
      { s: `This is <mark>the most expensive</mark> phone in the store.`, note: `the most + long adjective + in.` },
      { s: `My grades are <mark>better</mark> this year than last year.`, note: `good → better.` },
      { s: `Today is <mark>the hottest</mark> day of the year so far.`, note: `hot → the hottest (double t).` },
      { s: `Our classroom is <mark>not as big as</mark> the library.`, note: `not as … as = smaller.` }
    ],
    mistakes: [
      { wrong: `She is more taller than me.`, right: `She is taller than me.`, why: `Use <b>-er</b> or <b>more</b>, never both.` },
      { wrong: `This is the most fastest car.`, right: `This is the fastest car.`, why: `Use <b>-est</b> or <b>the most</b>, never both.` },
      { wrong: `My house is biger than yours.`, right: `My house is bigger than yours.`, why: `Short adjectives ending in one vowel + one consonant double the last letter: big → bigger.` },
      { wrong: `This test is more easy than the last one.`, right: `This test is easier than the last one.`, why: `Two-syllable adjectives ending in <b>-y</b> change to <b>-ier</b>: easy → easier.` },
      { wrong: `He is the better player in our class.`, right: `He is the best player in our class.`, why: `One person in a group needs the superlative: <b>the best</b>.` },
      { wrong: `My bike is as fast than yours.`, right: `My bike is as fast as yours.`, why: `The pattern is <b>as</b> … <b>as</b>.` }
    ],
    guided: {
      bank: [`better`, `the best`, `bigger`, `more`, `the most`],
      items: [
        { s: `An elephant is ___ than a horse.`, a: `bigger`, why: `Two animals + than: comparative <b>bigger</b>.` },
        { s: `This is ___ delicious cake I have ever eaten!`, a: `the most`, why: `One cake compared with all others: <b>the most</b> + long adjective.` },
        { s: `Your English is ___ than it was last year.`, a: `better`, why: `good → <b>better</b> + than.` },
        { s: `For me, science is ___ interesting than history.`, a: `more`, why: `Long adjective + than: <b>more</b> interesting.` },
        { s: `Valeria is ___ swimmer on our team.`, a: `the best`, why: `One person in a group: <b>the best</b>.` }
      ]
    },
    toefl: [
      { q: `The Amazon is one of ___ rivers in the world.`, o: [`the longest`, `longer`, `the longer`, `most long`], a: 0, why: `One of a group "in the world": superlative <b>the longest</b>.` },
      { q: `Walking to school takes ___ time than taking the bus.`, o: [`much`, `more`, `most`, `the most`], a: 1, why: `Comparing two ways + than: <b>more</b> time.` },
      { q: `This year's festival was ___ than last year's.`, o: [`badder`, `more bad`, `worse`, `the worst`], a: 2, why: `bad → <b>worse</b> (irregular) + than.` },
      { q: `My little brother is not ___ as I am.`, o: [`taller`, `the tallest`, `tall`, `as tall`], a: 3, why: `The pattern is <b>not as</b> + adjective + <b>as</b>.` },
      { q: `Of all the planets, Jupiter is ___.`, o: [`bigger`, `the biggest`, `the bigger`, `more big`], a: 1, why: `"Of all the planets" = one in a group: <b>the biggest</b>.` }
    ],
    challenge: {
      title: `Comparing Two Cities`,
      text: `Last year, my family visited two cities: Medellín and Cartagena. Medellín is in the mountains, so it is {1} than Cartagena, and the weather there is cooler. Cartagena is on the coast, and it was {2} city I have ever visited; it was 34 degrees every day! Cartagena was also {3} expensive than Medellín, especially the hotels. However, I think its beaches are {4} beautiful in Colombia. My sister liked Medellín {5} than Cartagena because of its parks and cable cars. For me, the food in both cities was {6} delicious as my grandmother's cooking, and that is a big compliment!`,
      blanks: [
        { o: [`more high`, `the highest`, `higher`, `high`], a: 2, why: `Two cities + than: high → <b>higher</b>.` },
        { o: [`the hottest`, `hotter`, `the hotter`, `most hot`], a: 0, why: `One city compared with all the cities I have visited: <b>the hottest</b>.` },
        { o: [`most`, `the most`, `much`, `more`], a: 3, why: `Long adjective + than: <b>more</b> expensive.` },
        { o: [`more`, `the most`, `most`, `the more`], a: 1, why: `The beaches compared with all others "in Colombia": <b>the most</b> beautiful.` },
        { o: [`more good`, `the best`, `well`, `better`], a: 3, why: `Like + better + than: <b>better</b> (irregular).` },
        { o: [`as`, `so`, `more`, `than`], a: 0, why: `The pattern is <b>as</b> + adjective + <b>as</b>.` }
      ]
    }
  },

  'linking-expressions': {
    title: `Linking expressions`,
    group: `Connecting and comparing`,
    intro: `Linking expressions connect the meaning of <b>two sentences</b>. They usually come at the start of the second sentence, followed by a comma: <i>However, …</i> They show whether we are <b>adding</b>, <b>contrasting</b>, giving a <b>result</b> or an <b>example</b>.`,
    rules: [
      { word: `Adding`, meaning: `Give one more idea of the same kind.`,
        patterns: [`In addition, …`, `Moreover, … · Also, …`, `Besides + noun (Besides the cost, …)`],
        example: `The park is beautiful. <mark>In addition</mark>, it is free.` },
      { word: `Contrast`, meaning: `Show that the next idea is different or surprising.`,
        patterns: [`However, …`, `On the other hand, …`, `Instead, … (= in place of that)`],
        example: `I wanted pizza. <mark>However</mark>, the restaurant was closed.` },
      { word: `Result`, meaning: `Show what happened because of the first idea.`,
        patterns: [`As a result, …`, `Therefore, …`, `For this reason, …`],
        example: `It rained all night. <mark>As a result</mark>, the game was canceled.` },
      { word: `Examples and opinion`, meaning: `Give an example, or say what you think.`,
        patterns: [`For example, … · For instance, …`, `In my opinion, …`, `Finally, … · In conclusion, …`],
        example: `Some animals, <mark>for example</mark> bears, sleep all winter.` }
    ],
    tip: `<b>Read both sentences first.</b> Then decide: is the second one adding, contrasting, a result or an example? Remember the punctuation: a <b>period</b> (or semicolon) before, and a <b>comma</b> after: <i>It was late. However, we kept playing.</i>`,
    examples: [
      { s: `Bikes are cheap. <mark>In addition</mark>, they are good for the environment.`, note: `adding a second advantage.` },
      { s: `Paula studied for weeks. <mark>Therefore</mark>, she felt ready for the exam.`, note: `result.` },
      { s: `The museum was full. <mark>Instead</mark>, we went to the park.`, note: `instead = in place of the museum.` },
      { s: `Many fruits, <mark>for example</mark> mangoes and papayas, grow in Colombia.`, note: `for example + examples.` },
      { s: `City life is exciting. <mark>On the other hand</mark>, it can be very noisy.`, note: `contrast: a good point, then a bad point.` }
    ],
    mistakes: [
      { wrong: `It was late, however we kept playing.`, right: `It was late. However, we kept playing.`, why: `<b>However</b> starts a new sentence (or comes after a semicolon) and is followed by a comma.` },
      { wrong: `In the other hand, the city is expensive.`, right: `On the other hand, the city is expensive.`, why: `The expression is <b>on</b> the other hand.` },
      { wrong: `In addition of soccer, I play basketball.`, right: `In addition to soccer, I play basketball.`, why: `<b>In addition to</b> + noun.` },
      { wrong: `Besides of the cost, the trip is very long.`, right: `Besides the cost, the trip is very long.`, why: `In Spanish we say <i>además de</i>, but in English <b>besides</b> has no <i>of</i>.` },
      { wrong: `I was tired. Therefore, I went to bed late.`, right: `I was tired. Therefore, I went to bed early.`, why: `<b>Therefore</b> shows a logical result. Going to bed late is not a result of being tired.` },
      { wrong: `She loves sports. For example, she is good at math.`, right: `She loves sports. For example, she plays tennis and volleyball.`, why: `After <b>for example</b>, give an example of the first idea.` }
    ],
    guided: {
      bank: [`However`, `Therefore`, `In addition`, `For example`, `Instead`],
      items: [
        { s: `The test was very difficult. ___, everyone passed.`, a: `However`, why: `Passing a difficult test is a surprising contrast: <b>However</b>.` },
        { s: `Our bus broke down. ___, we arrived two hours late.`, a: `Therefore`, why: `Arriving late is the result: <b>Therefore</b>.` },
        { s: `The hotel has a big pool. ___, breakfast is free.`, a: `In addition`, why: `A second good thing about the hotel: <b>In addition</b>.` },
        { s: `I didn't watch TV last night. ___, I read a book.`, a: `Instead`, why: `Reading took the place of watching TV: <b>Instead</b>.` },
        { s: `Some sports need very little equipment. ___, you only need a ball to play soccer.`, a: `For example`, why: `Soccer is an example of the first idea: <b>For example</b>.` }
      ]
    },
    toefl: [
      { q: `Our team practiced every day. ___, we won the championship.`, o: [`However`, `Instead`, `As a result`, `For example`], a: 2, why: `Winning is the result of practicing: <b>As a result</b>.` },
      { q: `Smartphones are very useful. ___, they can be a distraction in class.`, o: [`On the other hand`, `In addition`, `Therefore`, `For instance`], a: 0, why: `A good point, then a bad point: <b>On the other hand</b>.` },
      { q: `There are many easy ways to save water. ___, you can take shorter showers.`, o: [`However`, `For example`, `Instead`, `As a result`], a: 1, why: `Shorter showers are an example of a way to save water.` },
      { q: `The café was closed, so we made sandwiches at home ___.`, o: [`however`, `therefore`, `in addition`, `instead`], a: 3, why: `Sandwiches at home took the place of the café: <b>instead</b>.` },
      { q: `The new library is bigger than the old one. ___, it has a café and a computer room.`, o: [`Therefore`, `However`, `Moreover`, `Instead`], a: 2, why: `More good things about the library: <b>Moreover</b> (= in addition).` }
    ],
    challenge: {
      title: `Should Students Wear Uniforms?`,
      text: `Many schools in Colombia ask students to wear uniforms, and some people think this is a good idea. {1}, uniforms make all students look equal, so nobody feels bad about their clothes. {2}, families save money because they do not need to buy many different outfits. {3}, other people believe uniforms are boring. They say students should be able to show their personality. Last year, our school let students wear their own clothes every Friday. {4}, everyone was happier on Fridays. Some students wanted to stop wearing uniforms completely. {5}, the school decided to keep the uniform but ask students to help design a new, more modern one. {6}, this is the best solution for everyone.`,
      blanks: [
        { o: [`However`, `For example`, `Instead`, `As a result`], a: 1, why: `Looking equal is an example of why uniforms are a good idea: <b>For example</b>.` },
        { o: [`In addition`, `However`, `Instead`, `Therefore`], a: 0, why: `A second advantage: <b>In addition</b>.` },
        { o: [`Therefore`, `In addition`, `For example`, `On the other hand`], a: 3, why: `Now the opposite opinion: <b>On the other hand</b>.` },
        { o: [`However`, `Instead`, `As a result`, `For instance`], a: 2, why: `Being happier was the result of wearing their own clothes: <b>As a result</b>.` },
        { o: [`Instead`, `In addition`, `For example`, `As a result`], a: 0, why: `The school did something different from stopping uniforms: <b>Instead</b>.` },
        { o: [`For instance`, `In my opinion`, `Instead`, `As a result`], a: 1, why: `The writer gives a personal view: <b>In my opinion</b>.` }
      ]
    }
  },

  'verb-tenses': {
    title: `Verb tenses`,
    group: `Verbs and voice`,
    intro: `The tense of a verb tells us <b>when</b> something happens and whether it is <b>finished</b>, <b>in progress</b> or <b>connected to now</b>. In the test, look for time words like <i>yesterday</i>, <i>since</i> or <i>now</i>: they tell you which tense you need.`,
    rules: [
      { word: `Present`, meaning: `<b>Simple</b> for habits and facts. <b>Continuous</b> for what is happening now.`,
        patterns: [`I / you / we / they play · he / she / it plays`, `am / is / are + -ing (now, at the moment)`, `every day · usually · always → present simple`],
        example: `She <mark>walks</mark> to school every day, but today she <mark>is taking</mark> the bus.` },
      { word: `Past`, meaning: `<b>Simple</b> for finished actions. <b>Continuous</b> for an action in progress at a past time.`,
        patterns: [`played · went (yesterday, last week, ago, in 2010)`, `was / were + -ing (in progress)`, `past continuous + when + past simple (interrupted)`],
        example: `I <mark>was reading</mark> when the lights <mark>went</mark> out.` },
      { word: `Present perfect`, meaning: `A past action <b>connected to now</b>: life experience, or something that started in the past and continues.`,
        patterns: [`have / has + past participle (seen, lived, eaten)`, `for + period · since + starting point`, `already · yet · ever · never · just`],
        example: `We <mark>have lived</mark> in Chía since 2020.` },
      { word: `Future and past perfect`, meaning: `<b>will</b> for decisions and predictions, <b>be going to</b> for plans. <b>Past perfect</b> for an action <b>before</b> another past action.`,
        patterns: [`will + verb · am / is / are going to + verb`, `had + past participle`, `by the time · already · before (past perfect)`],
        example: `When we arrived, the movie <mark>had</mark> already <mark>started</mark>.` }
    ],
    tip: `<b>Find the time words:</b> <i>yesterday, ago, last</i> → past simple · <i>since, for, already, yet, ever</i> → present perfect · <i>now, at the moment</i> → present continuous · <i>tomorrow, next</i> → future. After <b>did</b>, <b>does</b> and <b>do</b>, always use the base verb: <i>Did you go?</i>`,
    examples: [
      { s: `My father <mark>works</mark> at a hospital.`, note: `present simple: a fact about his life.` },
      { s: `Shh! The baby <mark>is sleeping</mark>.`, note: `present continuous: happening right now.` },
      { s: `We <mark>visited</mark> the Salt Cathedral last Sunday.`, note: `past simple: finished (last Sunday).` },
      { s: `I <mark>have</mark> never <mark>seen</mark> snow.`, note: `present perfect: life experience up to now.` },
      { s: `Look at those dark clouds. It <mark>is going to</mark> rain.`, note: `be going to: a prediction from what we can see.` }
    ],
    mistakes: [
      { wrong: `I have seen that movie yesterday.`, right: `I saw that movie yesterday.`, why: `<b>Yesterday</b> is a finished time, so use the past simple.` },
      { wrong: `We live here since 2019.`, right: `We have lived here since 2019.`, why: `<b>Since</b> + a starting point needs the present perfect.` },
      { wrong: `Did you went to the party?`, right: `Did you go to the party?`, why: `After <b>did</b>, use the base verb (go, not went).` },
      { wrong: `I am knowing the answer.`, right: `I know the answer.`, why: `Verbs of thinking and feeling (know, like, want, need) are not usually used with -ing.` },
      { wrong: `When I arrived, they already left.`, right: `When I arrived, they had already left.`, why: `They left <b>before</b> I arrived: past perfect (had left).` },
      { wrong: `Tomorrow I visit my grandmother, I think.`, right: `Tomorrow I will visit my grandmother, I think.`, why: `A prediction or decision about the future uses <b>will</b>.` }
    ],
    guided: {
      bank: [`goes`, `went`, `is going`, `has gone`, `was going`],
      items: [
        { s: `Every Sunday, my grandmother ___ to church.`, a: `goes`, why: `A habit (every Sunday) + she: present simple <b>goes</b>.` },
        { s: `Last summer, my family ___ to Santa Marta.`, a: `went`, why: `<b>Last summer</b> is finished: past simple <b>went</b>.` },
        { s: `Look! Our teacher ___ into the principal's office right now.`, a: `is going`, why: `<b>Right now</b>: present continuous <b>is going</b>.` },
        { s: `My uncle ___ to the gym every day since January.`, a: `has gone`, why: `<b>Since January</b> (up to now): present perfect <b>has gone</b>.` },
        { s: `I ___ to call you, but my phone battery died.`, a: `was going`, why: `<b>Was going to</b> = a past plan that did not happen.` }
      ]
    },
    toefl: [
      { q: `Lucía ___ the piano since she was six years old.`, o: [`plays`, `is playing`, `has played`, `played`], a: 2, why: `<b>Since</b> + starting point: present perfect <b>has played</b>.` },
      { q: `While we ___ dinner, the electricity went out.`, o: [`were having`, `had`, `have`, `are having`], a: 0, why: `An action in progress, interrupted in the past: past continuous <b>were having</b>.` },
      { q: `By the time the firefighters arrived, the fire ___ out.`, o: [`has gone`, `had gone`, `goes`, `is going`], a: 1, why: `The fire went out <b>before</b> they arrived: past perfect <b>had gone</b>.` },
      { q: `I think it ___ sunny tomorrow, so let's go to the park.`, o: [`is`, `was`, `has been`, `will be`], a: 3, why: `A prediction about <b>tomorrow</b>: <b>will be</b>.` },
      { q: `My cousins ___ to visit us last weekend.`, o: [`have come`, `came`, `come`, `are coming`], a: 1, why: `<b>Last weekend</b> is finished: past simple <b>came</b>.` }
    ],
    challenge: {
      title: `A Letter from Grandpa`,
      text: `Dear Sofía,\n\nThank you for your letter. I {1} it three times since it arrived because it made me so happy! Your grandmother and I are fine. Last week, we {2} to the market in Zipaquirá and bought fresh cheese. While we {3} home, it started to rain, so we stopped at a café. Right now, I {4} this letter at the kitchen table, and your grandmother is making soup. Next month, we {5} you in Chía for your birthday. I hope you {6} your present!\n\nLove,\nGrandpa`,
      blanks: [
        { o: [`read`, `have read`, `was reading`, `am reading`], a: 1, why: `<b>Since it arrived</b> (up to now): present perfect <b>have read</b>.` },
        { o: [`have gone`, `go`, `went`, `were going`], a: 2, why: `<b>Last week</b> is finished: past simple <b>went</b>.` },
        { o: [`were walking`, `are walking`, `have walked`, `walk`], a: 0, why: `In progress when the rain started: past continuous <b>were walking</b>.` },
        { o: [`write`, `wrote`, `have written`, `am writing`], a: 3, why: `<b>Right now</b>: present continuous <b>am writing</b>.` },
        { o: [`visited`, `are going to visit`, `have visited`, `were visiting`], a: 1, why: `A plan for <b>next month</b>: <b>are going to visit</b>.` },
        { o: [`liked`, `have liked`, `will like`, `were liking`], a: 2, why: `The present is in the future: <b>will like</b>.` }
      ]
    }
  },

  'subject-verb-agreement': {
    title: `Subject–verb agreement`,
    group: `Verbs and voice`,
    intro: `The verb must <b>agree</b> with its subject. A singular subject needs a singular verb (<i>she plays</i>, <i>it is</i>), and a plural subject needs a plural verb (<i>they play</i>, <i>they are</i>). The hard part is finding the real subject.`,
    rules: [
      { word: `The basic rule`, meaning: `In the present, <b>he / she / it</b> verbs end in <b>-s</b>.`,
        patterns: [`he / she / it plays · I / you / we / they play`, `is / are · was / were`, `has / have · does / do`],
        example: `My brother <mark>plays</mark> soccer, and my sisters <mark>play</mark> tennis.` },
      { word: `Find the real subject`, meaning: `Words between the subject and the verb do <b>not</b> change it.`,
        patterns: [`The box of books is heavy. (the box)`, `One of my friends lives in Cali. (one)`, `The teacher, with her students, is outside. (the teacher)`],
        example: `<mark>The color</mark> of the flowers <mark>is</mark> beautiful.` },
      { word: `Special subjects`, meaning: `Some subjects are always singular, and some are always plural.`,
        patterns: [`everyone · somebody · nobody · each · every → singular`, `homework · information · money · news → singular`, `people · police · children → plural`],
        example: `<mark>Everyone</mark> in my class <mark>has</mark> a tablet.` },
      { word: `Joined subjects and "there"`, meaning: `Two subjects with <b>and</b> are plural. After <b>there</b>, look at the noun that follows.`,
        patterns: [`Ana and Pablo are … (plural)`, `neither … nor / either … or → agree with the nearer subject`, `there is + singular · there are + plural`],
        example: `<mark>There are</mark> twenty students in the room.` }
    ],
    tip: `<b>Cover the extra words</b> between the subject and the verb, then ask: who or what does the action? One → <b>-s</b> verb (is, has, was, plays). More than one → no -s (are, have, were, play).`,
    examples: [
      { s: `The students in my class <mark>are</mark> very friendly.`, note: `the students = plural.` },
      { s: `Each of the players <mark>has</mark> a number.`, note: `each = singular.` },
      { s: `My homework <mark>is</mark> on the table.`, note: `homework is uncountable = singular.` },
      { s: `Pablo and Ana <mark>live</mark> near the park.`, note: `two people joined with and = plural.` },
      { s: `There <mark>is</mark> a library next to our school.`, note: `there is + a singular noun.` }
    ],
    mistakes: [
      { wrong: `She don't like coffee.`, right: `She doesn't like coffee.`, why: `He / she / it uses <b>does</b> and <b>doesn't</b>.` },
      { wrong: `One of my friends live in Cali.`, right: `One of my friends lives in Cali.`, why: `The subject is <b>one</b> (singular), not <i>friends</i>.` },
      { wrong: `Everybody are here.`, right: `Everybody is here.`, why: `<b>Everybody</b> and <b>everyone</b> are singular.` },
      { wrong: `There is many people at the concert.`, right: `There are many people at the concert.`, why: `<b>People</b> is plural: <b>there are</b>.` },
      { wrong: `The informations are very useful.`, right: `The information is very useful.`, why: `<b>Information</b> is uncountable: no -s and a singular verb.` },
      { wrong: `The people is very kind.`, right: `The people are very kind.`, why: `<b>People</b> is plural.` }
    ],
    guided: {
      bank: [`is`, `are`, `has`, `have`, `were`],
      items: [
        { s: `The news about the storm ___ very bad.`, a: `is`, why: `<b>News</b> is singular, even with an -s.` },
        { s: `My parents ___ a small bakery in Chía.`, a: `have`, why: `My parents = they: <b>have</b>.` },
        { s: `Everyone in my family ___ a bicycle.`, a: `has`, why: `<b>Everyone</b> is singular: <b>has</b>.` },
        { s: `The children in the park ___ playing with a ball.`, a: `are`, why: `<b>Children</b> is plural: <b>are</b>.` },
        { s: `Last night, the stars ___ very bright.`, a: `were`, why: `Past + plural (the stars): <b>were</b>.` }
      ]
    },
    toefl: [
      { q: `The list of names ___ on the classroom door.`, o: [`are`, `is`, `were`, `have`], a: 1, why: `The subject is <b>the list</b> (singular), not <i>names</i>.` },
      { q: `Neither the teacher nor the students ___ the answer.`, o: [`knows`, `is knowing`, `know`, `has known`], a: 2, why: `With <b>neither … nor</b>, the verb agrees with the nearer subject (the students): <b>know</b>.` },
      { q: `Each of the rooms in the hotel ___ a balcony.`, o: [`have`, `are having`, `were`, `has`], a: 3, why: `<b>Each</b> is singular: <b>has</b>.` },
      { q: `There ___ some milk in the fridge.`, o: [`is`, `are`, `were`, `have`], a: 0, why: `<b>Milk</b> is uncountable: <b>there is</b>.` },
      { q: `My best friend and I ___ the same birthday.`, o: [`has`, `have`, `is having`, `was`], a: 1, why: `Two people joined with <b>and</b> = plural: <b>have</b>.` }
    ],
    challenge: {
      title: `Our School Garden`,
      text: `Our school {1} a small garden behind the gym. The students in the environment club {2} care of it every week. Each of the club members {3} a special job. For example, Mateo waters the plants, and Laura and Sara {4} the vegetables when they are ready. There {5} tomatoes, lettuce and herbs in the garden. The information about each plant {6} written on a small sign next to it.`,
      blanks: [
        { o: [`have`, `has`, `are having`, `were`], a: 1, why: `<b>Our school</b> = it: <b>has</b>.` },
        { o: [`takes`, `is taking`, `take`, `has taken`], a: 2, why: `The subject is <b>the students</b> (plural): <b>take</b>.` },
        { o: [`have`, `are`, `were`, `has`], a: 3, why: `<b>Each</b> is singular: <b>has</b>.` },
        { o: [`pick`, `picks`, `is picking`, `has picked`], a: 0, why: `<b>Laura and Sara</b> = they: <b>pick</b>.` },
        { o: [`is`, `was`, `are`, `has`], a: 2, why: `<b>There are</b> + plural nouns (tomatoes, herbs).` },
        { o: [`are`, `is`, `were`, `have`], a: 1, why: `<b>Information</b> is uncountable: <b>is</b>.` }
      ]
    }
  },

  'infinitives-and-gerunds': {
    title: `Infinitives and gerunds`,
    group: `Verbs and voice`,
    intro: `When one verb follows another, the second verb is either a <b>gerund</b> (-ing: <i>swimming</i>) or an <b>infinitive</b> (to + verb: <i>to swim</i>). The first verb decides which one you need.`,
    rules: [
      { word: `Verb + -ing`, meaning: `These verbs are followed by the <b>-ing</b> form.`,
        patterns: [`enjoy · finish · mind · avoid`, `keep · practice · suggest · miss`, `give up · can't stand`],
        example: `I <mark>enjoy reading</mark> comics.` },
      { word: `Verb + to + verb`, meaning: `These verbs are followed by the <b>infinitive</b>.`,
        patterns: [`want · need · decide · hope`, `plan · promise · learn · agree`, `manage · offer · would like`],
        example: `We <mark>decided to stay</mark> home.` },
      { word: `After prepositions`, meaning: `After a preposition, always use <b>-ing</b>. The -ing form can also be the subject of a sentence.`,
        patterns: [`interested in learning · good at drawing`, `before leaving · without saying · thank you for helping`, `Swimming is fun. (subject)`],
        example: `Thank you for <mark>helping</mark> me.` },
      { word: `To for purpose and "stop"`, meaning: `Use <b>to</b> + verb to say <b>why</b>. Some verbs change meaning.`,
        patterns: [`I went to the store to buy milk. (why)`, `stop + to = stop in order to do something`, `stop + -ing = not do it anymore`],
        example: `She went to the library <mark>to study</mark>.` }
    ],
    tip: `<b>Two quick checks:</b> after a <b>preposition</b> (in, at, of, for, about, without, before, after) use <b>-ing</b>. To say <b>why</b>, use <b>to</b> + verb, never <i>for</i> + verb. Careful: in <i>look forward to</i>, <i>to</i> is a preposition: <i>I look forward to seeing you.</i>`,
    examples: [
      { s: `My brother <mark>finished doing</mark> his homework at nine.`, note: `finish + -ing.` },
      { s: `I <mark>want to learn</mark> French next year.`, note: `want + to + verb.` },
      { s: `<mark>Riding</mark> a bike is good exercise.`, note: `-ing form as the subject.` },
      { s: `She is good at <mark>drawing</mark> animals.`, note: `preposition (at) + -ing.` },
      { s: `We stopped <mark>to buy</mark> water on the way.`, note: `stop + to = stop in order to buy.` }
    ],
    mistakes: [
      { wrong: `I enjoy to play video games.`, right: `I enjoy playing video games.`, why: `<b>Enjoy</b> is followed by -ing.` },
      { wrong: `She wants going to the beach.`, right: `She wants to go to the beach.`, why: `<b>Want</b> is followed by to + verb.` },
      { wrong: `He left without say goodbye.`, right: `He left without saying goodbye.`, why: `After a preposition (without), use -ing.` },
      { wrong: `I'm looking forward to see you.`, right: `I'm looking forward to seeing you.`, why: `In <b>look forward to</b>, "to" is a preposition, so use -ing.` },
      { wrong: `I went to the store for buy milk.`, right: `I went to the store to buy milk.`, why: `To say why, use <b>to</b> + verb (Spanish <i>para</i> = English <i>to</i>).` },
      { wrong: `My mom suggested to buy a new backpack.`, right: `My mom suggested buying a new backpack.`, why: `<b>Suggest</b> is followed by -ing.` }
    ],
    guided: {
      bank: [`to call`, `calling`, `to buy`, `buying`, `to meet`],
      items: [
        { s: `I promise ___ you when I get home.`, a: `to call`, why: `<b>Promise</b> + to + verb.` },
        { s: `Thank you for ___ me last night. I really needed to talk.`, a: `calling`, why: `After a preposition (for): -ing.` },
        { s: `We went to the bakery ___ some bread.`, a: `to buy`, why: `To say why we went: <b>to</b> + verb.` },
        { s: `My mom suggested ___ a new backpack before school starts.`, a: `buying`, why: `<b>Suggest</b> + -ing.` },
        { s: `I hope ___ your family soon.`, a: `to meet`, why: `<b>Hope</b> + to + verb.` }
      ]
    },
    toefl: [
      { q: `My father gave up ___ coffee last year.`, o: [`to drink`, `drinking`, `drink`, `drank`], a: 1, why: `<b>Give up</b> (= stop) is followed by -ing.` },
      { q: `Students are not allowed ___ phones during the test.`, o: [`using`, `use`, `to use`, `used`], a: 2, why: `<b>Be allowed</b> + to + verb.` },
      { q: `Mateo is very interested in ___ how computers work.`, o: [`to learn`, `learn`, `learned`, `learning`], a: 3, why: `After a preposition (in): -ing.` },
      { q: `We arrived early ___ good seats at the concert.`, o: [`to get`, `getting`, `for get`, `got`], a: 0, why: `To say why: <b>to</b> + verb.` },
      { q: `Please remember ___ the lights before you leave.`, o: [`turning off`, `to turn off`, `turn off`, `turned off`], a: 1, why: `<b>Remember to</b> do something = don't forget to do it. <i>Remember turning off</i> means you have a memory of it.` }
    ],
    challenge: {
      title: `Learning to Skate`,
      text: `Last year, I decided {1} how to skateboard. At first, I was afraid of {2}, so I practiced on the grass. My older cousin offered {3} me, and he suggested {4} a helmet and knee pads. After many weeks, I finally managed {5} from one end of the park to the other without falling. Now I really enjoy {6} with my friends every weekend.`,
      blanks: [
        { o: [`learning`, `learn`, `to learn`, `learned`], a: 2, why: `<b>Decide</b> + to + verb.` },
        { o: [`falling`, `to fall`, `fall`, `fell`], a: 0, why: `After a preposition (of): -ing.` },
        { o: [`helping`, `help`, `helped`, `to help`], a: 3, why: `<b>Offer</b> + to + verb.` },
        { o: [`to wear`, `wearing`, `wear`, `wore`], a: 1, why: `<b>Suggest</b> + -ing.` },
        { o: [`skating`, `skate`, `to skate`, `skated`], a: 2, why: `<b>Manage</b> + to + verb.` },
        { o: [`to skate`, `skating`, `skate`, `skated`], a: 1, why: `<b>Enjoy</b> + -ing.` }
      ]
    }
  },

  'active-and-passive-voice': {
    title: `Active and passive voice`,
    group: `Verbs and voice`,
    intro: `In an <b>active</b> sentence, the subject <b>does</b> the action. In a <b>passive</b> sentence, the subject <b>receives</b> the action. The passive is very common in the test, especially in notices and articles.`,
    rules: [
      { word: `How to make it`, meaning: `Passive = a form of <b>be</b> + the <b>past participle</b>.`,
        patterns: [`Active: Gabo wrote the book.`, `Passive: The book was written by Gabo.`, `be + past participle (made, written, built, sent)`],
        example: `The book <mark>was written</mark> by Gabriel García Márquez.` },
      { word: `Passive in every tense`, meaning: `Only <b>be</b> changes. The past participle stays the same.`,
        patterns: [`is / are + made (present) · was / were + made (past)`, `will be made · has / have been made`, `can / must / should be made`],
        example: `Coffee <mark>is grown</mark> in many parts of Colombia.` },
      { word: `When to use it`, meaning: `When <b>who</b> does the action is unknown, not important or obvious.`,
        patterns: [`My bike was stolen. (we don't know who)`, `The streets are cleaned every day. (not important who)`, `by + person only when it is important`],
        example: `My bike <mark>was stolen</mark> last night.` },
      { word: `Choosing in the test`, meaning: `Ask: does the subject <b>do</b> the action or <b>receive</b> it?`,
        patterns: [`does it → active (The workers clean the windows.)`, `receives it → passive (The windows are cleaned.)`, `then choose the right tense of be`],
        example: `The windows <mark>are cleaned</mark> every Friday.` }
    ],
    tip: `<b>Two checks:</b> (1) Does the subject do the action or receive it? Receives → passive. (2) Which tense? Change only <b>be</b> (is, was, will be, has been). The main verb is always the <b>past participle</b>: built, not build; stolen, not stole.`,
    examples: [
      { s: `English <mark>is spoken</mark> in many countries.`, note: `present passive: is + spoken.` },
      { s: `The new library <mark>was opened</mark> last month.`, note: `past passive: was + opened.` },
      { s: `Your test results <mark>will be sent</mark> by email.`, note: `future passive: will be + sent.` },
      { s: `The cake <mark>has been eaten</mark>! Who ate it?`, note: `present perfect passive: has been + eaten.` },
      { s: `Phones <mark>must be turned off</mark> during the exam.`, note: `modal passive: must be + turned off.` }
    ],
    mistakes: [
      { wrong: `The bridge was build in 1990.`, right: `The bridge was built in 1990.`, why: `After <b>be</b>, use the past participle: built.` },
      { wrong: `My wallet stole on the bus.`, right: `My wallet was stolen on the bus.`, why: `The wallet did not steal; it received the action: <b>was stolen</b>.` },
      { wrong: `The homework must finish by Monday.`, right: `The homework must be finished by Monday.`, why: `The homework doesn't finish itself: <b>must be finished</b>.` },
      { wrong: `The letters was sent yesterday.`, right: `The letters were sent yesterday.`, why: `<b>Be</b> agrees with the subject: the letters → were.` },
      { wrong: `The museum is visit by many tourists.`, right: `The museum is visited by many tourists.`, why: `Use the past participle: visited.` },
      { wrong: `The window was broken from the ball.`, right: `The window was broken by the ball.`, why: `The one who does the action comes after <b>by</b>.` }
    ],
    guided: {
      bank: [`is made`, `are made`, `was built`, `were built`, `will be held`],
      items: [
        { s: `This chair ___ of recycled plastic.`, a: `is made`, why: `Present + singular (this chair): <b>is made</b>.` },
        { s: `The pyramids of Egypt ___ thousands of years ago.`, a: `were built`, why: `Past (years ago) + plural (the pyramids): <b>were built</b>.` },
        { s: `The concert ___ in the main square next Saturday.`, a: `will be held`, why: `Future (next Saturday): <b>will be held</b>.` },
        { s: `Our school ___ in 1985.`, a: `was built`, why: `Past (1985) + singular (our school): <b>was built</b>.` },
        { s: `Arepas ___ with corn flour.`, a: `are made`, why: `A fact (present) + plural (arepas): <b>are made</b>.` }
      ]
    },
    toefl: [
      { q: `The winners of the contest ___ next Friday.`, o: [`will announce`, `will be announced`, `announced`, `are announcing`], a: 1, why: `The winners receive the action, in the future: <b>will be announced</b>.` },
      { q: `The streets ___ every morning by city workers.`, o: [`clean`, `are cleaning`, `are cleaned`, `cleaned`], a: 2, why: `The streets receive the action (by city workers): <b>are cleaned</b>.` },
      { q: `This letter ___ in 1950 and was found in our attic last year.`, o: [`was written`, `wrote`, `has written`, `is writing`], a: 0, why: `A letter cannot write; it receives the action in the past: <b>was written</b>.` },
      { q: `Students ___ to bring calculators to the math test.`, o: [`allow`, `are allowing`, `allowed`, `are allowed`], a: 3, why: `Students receive permission: <b>are allowed</b>.` },
      { q: `The injured player ___ to the hospital after the game.`, o: [`took`, `was taken`, `has taken`, `taking`], a: 1, why: `The player did not take anyone; someone took him: <b>was taken</b>.` }
    ],
    challenge: {
      title: `The Story of a T-shirt`,
      text: `Have you ever wondered how your T-shirt {1}? First, cotton {2} on farms in warm countries. When the plants are ready, the cotton {3} by machines. Then it is cleaned and turned into thread. After that, the thread {4} into cloth in a factory. Finally, the cloth is cut and sewn, and the T-shirts {5} to stores all over the world. Next time you buy a T-shirt, remember that it {6} by many different people before it reached you!`,
      blanks: [
        { o: [`made`, `makes`, `has made`, `was made`], a: 3, why: `The T-shirt receives the action: <b>was made</b>.` },
        { o: [`is grown`, `grown`, `is growing to`, `has grow`], a: 0, why: `Farmers grow cotton; the cotton receives the action: <b>is grown</b>.` },
        { o: [`picks`, `is picked`, `is picking`, `picked`], a: 1, why: `By machines = passive: <b>is picked</b>.` },
        { o: [`weaves`, `is weaving`, `is woven`, `wove`], a: 2, why: `The thread receives the action: <b>is woven</b> (weave → woven).` },
        { o: [`send`, `are sending`, `sent`, `are sent`], a: 3, why: `Plural (the T-shirts) + passive: <b>are sent</b>.` },
        { o: [`touched`, `was touched`, `has touch`, `is touching`], a: 1, why: `By many people = passive, in the past: <b>was touched</b>.` }
      ]
    }
  },

  'relative-clauses': {
    title: `Relative clauses`,
    group: `Sentence structure`,
    intro: `A relative clause gives more information about a noun. It starts with a <b>relative pronoun</b> (<i>who, which, that, whose, where, when</i>). The noun just before it tells you which word to use.`,
    rules: [
      { word: `who · which · that`, meaning: `<b>who</b> for people, <b>which</b> for things and animals, <b>that</b> for people or things.`,
        patterns: [`the girl who sits next to me`, `the bus which goes to Chía`, `the movie that we watched`],
        example: `The girl <mark>who</mark> sits next to me is from Cali.` },
      { word: `whose · where · when`, meaning: `<b>whose</b> shows possession, <b>where</b> a place, <b>when</b> a time.`,
        patterns: [`the boy whose dog won (his dog)`, `the town where I was born`, `the day when we met`],
        example: `That's the boy <mark>whose</mark> dog won the prize.` },
      { word: `With or without commas`, meaning: `No commas = information we <b>need</b>. Commas = <b>extra</b> information.`,
        patterns: [`The students who passed got a prize. (only those students)`, `My sister, who lives in Bogotá, is a doctor. (extra)`, `after a comma: who or which, never that`],
        example: `My sister, <mark>who</mark> lives in Bogotá, is a doctor.` },
      { word: `Leaving it out`, meaning: `You can leave out <i>who / which / that</i> when it is the <b>object</b> of the clause.`,
        patterns: [`the book (that) I read`, `the people (who) we met`, `NOT when it is the subject: the man who called (needed)`],
        example: `The movie <mark>(that)</mark> we saw was great.` }
    ],
    tip: `<b>Look at the noun before the blank:</b> a person → <b>who</b>; a thing → <b>which</b> or <b>that</b>; a place → <b>where</b>; a time → <b>when</b>; someone's thing → <b>whose</b>. After a comma, never use <b>that</b>. Don't repeat the pronoun: not <i>the book that I read it</i>.`,
    examples: [
      { s: `A dentist is a doctor <mark>who</mark> takes care of teeth.`, note: `who = a person (a doctor).` },
      { s: `Arepas are a food <mark>which</mark> is popular in Colombia and Venezuela.`, note: `which = a thing (a food).` },
      { s: `This is the park <mark>where</mark> we played as children.`, note: `where = a place.` },
      { s: `I have a friend <mark>whose</mark> father is a pilot.`, note: `whose = possession (my friend's father).` },
      { s: `Cartagena, <mark>which</mark> is on the Caribbean coast, is very hot.`, note: `extra information between commas: which.` }
    ],
    mistakes: [
      { wrong: `The man which lives next door is a teacher.`, right: `The man who lives next door is a teacher.`, why: `For people, use <b>who</b> (or that).` },
      { wrong: `The book that I read it was great.`, right: `The book that I read was great.`, why: `<b>That</b> already refers to the book. Don't add <i>it</i>.` },
      { wrong: `My city, that is very old, is beautiful.`, right: `My city, which is very old, is beautiful.`, why: `After a comma, use <b>which</b> or <b>who</b>, never <i>that</i>.` },
      { wrong: `I know a boy who he speaks four languages.`, right: `I know a boy who speaks four languages.`, why: `<b>Who</b> is already the subject. Don't add <i>he</i>.` },
      { wrong: `The girl who her bike was stolen is sad.`, right: `The girl whose bike was stolen is sad.`, why: `To show possession, use <b>whose</b>.` },
      { wrong: `This is the school where I study in.`, right: `This is the school where I study.`, why: `<b>Where</b> already means "in which". Don't add <i>in</i>.` }
    ],
    guided: {
      bank: [`who`, `which`, `whose`, `where`, `when`],
      items: [
        { s: `My uncle is a chef ___ works in a famous restaurant.`, a: `who`, why: `A chef is a person: <b>who</b>.` },
        { s: `I lost the watch ___ my grandfather gave me.`, a: `which`, why: `A watch is a thing: <b>which</b>.` },
        { s: `Do you remember the day ___ we met?`, a: `when`, why: `A day is a time: <b>when</b>.` },
        { s: `This is the café ___ we eat empanadas every Friday.`, a: `where`, why: `A café is a place: <b>where</b>.` },
        { s: `Sara is the student ___ painting won first prize.`, a: `whose`, why: `Her painting = possession: <b>whose</b>.` }
      ]
    },
    toefl: [
      { q: `The museum ___ we visited last week has a new dinosaur exhibit.`, o: [`who`, `where`, `which`, `whose`], a: 2, why: `We visited the museum (a thing, the object): <b>which</b>. <i>Where</i> would need "we went to".` },
      { q: `Students ___ finish early may leave the room.`, o: [`who`, `which`, `whose`, `where`], a: 0, why: `Students are people: <b>who</b>.` },
      { q: `Bogotá, ___ is the capital of Colombia, is more than 2,600 meters above sea level.`, o: [`that`, `which`, `who`, `where`], a: 1, why: `Extra information after a comma about a thing (a city as the subject): <b>which</b>.` },
      { q: `I'd like to live in a city ___ there are many parks.`, o: [`which`, `who`, `that`, `where`], a: 3, why: `In that city there are parks: <b>where</b>.` },
      { q: `The scientist ___ discovery changed medicine won a famous prize.`, o: [`who`, `whose`, `which`, `that`], a: 1, why: `The scientist's discovery: <b>whose</b>.` }
    ],
    challenge: {
      title: `Grandma's Photo Album`,
      text: `Last weekend, my grandmother showed me an old photo album {1} she keeps in her bedroom. The first photo showed the house {2} she was born. Next to it was a picture of her best friend, Elena, {3} family lived on the same street. My grandmother told me about the day {4} the two girls got lost in the market. There was also a photo of a man {5} was wearing a big hat. "That is your great-grandfather," she said, "the man {6} taught me to dance."`,
      blanks: [
        { o: [`who`, `which`, `where`, `whose`], a: 1, why: `An album is a thing: <b>which</b>.` },
        { o: [`which`, `when`, `where`, `who`], a: 2, why: `She was born in the house (a place): <b>where</b>.` },
        { o: [`who`, `which`, `that`, `whose`], a: 3, why: `Elena's family = possession: <b>whose</b>.` },
        { o: [`when`, `where`, `which`, `who`], a: 0, why: `The day = a time: <b>when</b>.` },
        { o: [`which`, `who`, `whose`, `where`], a: 1, why: `A man is a person: <b>who</b>.` },
        { o: [`whose`, `where`, `who`, `which`], a: 2, why: `The man (a person) taught me: <b>who</b>.` }
      ]
    }
  },

  'conditional-sentences': {
    title: `Conditional sentences`,
    group: `Sentence structure`,
    intro: `Conditional sentences use <b>if</b> to talk about a situation and its result. The verb forms tell us if the situation is a <b>fact</b>, <b>real and possible</b>, <b>imaginary</b>, or something in the <b>past</b> that did not happen.`,
    rules: [
      { word: `Zero conditional`, meaning: `Facts and things that are <b>always</b> true.`,
        patterns: [`If + present, present`, `If you heat ice, it melts.`, `if = when (every time)`],
        example: `If you heat ice, it <mark>melts</mark>.` },
      { word: `First conditional`, meaning: `A <b>real</b> possibility in the future.`,
        patterns: [`If + present, will + verb`, `If it rains, we will stay home.`, `unless = if … not`],
        example: `If it <mark>rains</mark> tomorrow, we <mark>will stay</mark> home.` },
      { word: `Second conditional`, meaning: `An <b>imaginary</b> or unlikely situation, now or in the future.`,
        patterns: [`If + past, would + verb`, `If I were you, I would … (advice)`, `could = would be able to`],
        example: `If I <mark>won</mark> the lottery, I <mark>would buy</mark> a house for my parents.` },
      { word: `Third conditional`, meaning: `The <b>past</b>: something that did not happen, and its result.`,
        patterns: [`If + had + past participle,`, `would have + past participle`, `If I had known, I would have come.`],
        example: `If we <mark>had left</mark> earlier, we <mark>wouldn't have missed</mark> the bus.` }
    ],
    tip: `<b>Never put will or would in the if part:</b> not <i>If it will rain</i>. Match the pairs: <b>present + will</b> (real future), <b>past + would</b> (imaginary), <b>had + past participle + would have</b> (the past). With <i>I / he / she</i>, the test often uses <b>were</b>: <i>If I were you</i>.`,
    examples: [
      { s: `If you mix blue and yellow, you <mark>get</mark> green.`, note: `zero conditional: always true.` },
      { s: `If you <mark>study</mark>, you <mark>will pass</mark> the test.`, note: `first conditional: a real possibility.` },
      { s: `If I <mark>were</mark> you, I <mark>would ask</mark> the teacher.`, note: `second conditional: advice.` },
      { s: `If dogs <mark>could</mark> talk, what <mark>would</mark> they say?`, note: `second conditional: imaginary.` },
      { s: `If I <mark>had known</mark> about the party, I <mark>would have gone</mark>.`, note: `third conditional: I didn't know, so I didn't go.` }
    ],
    mistakes: [
      { wrong: `If it will rain, we will stay home.`, right: `If it rains, we will stay home.`, why: `After <b>if</b>, use the present for the future, not <i>will</i>.` },
      { wrong: `If I would have money, I would travel.`, right: `If I had money, I would travel.`, why: `Don't use <b>would</b> in the if part. Use the past: had.` },
      { wrong: `If I am rich, I would buy a boat.`, right: `If I were rich, I would buy a boat.`, why: `<b>Would</b> goes with the past in the if part: were.` },
      { wrong: `If I was you, I would study more.`, right: `If I were you, I would study more.`, why: `For advice, the correct form is <b>If I were you</b>.` },
      { wrong: `If you will heat water, it boils.`, right: `If you heat water, it boils.`, why: `For facts, use the present in both parts.` },
      { wrong: `If she had studied, she would pass.`, right: `If she had studied, she would have passed.`, why: `A past situation (had studied) needs <b>would have</b> + past participle.` }
    ],
    guided: {
      bank: [`rains`, `rained`, `will`, `would`, `had`],
      items: [
        { s: `If it ___ tomorrow, the game will be canceled.`, a: `rains`, why: `First conditional: if + present (<b>rains</b>), will + verb.` },
        { s: `If I win the race, I ___ tell everyone!`, a: `will`, why: `Real future: if + present, <b>will</b> + verb.` },
        { s: `If I had wings, I ___ fly to the moon.`, a: `would`, why: `Imaginary (I don't have wings): past, <b>would</b> + verb.` },
        { s: `If it ___ more in the desert, more plants would grow there.`, a: `rained`, why: `Imaginary + would: if + past (<b>rained</b>).` },
        { s: `If we ___ brought an umbrella, we wouldn't have gotten wet.`, a: `had`, why: `The past (we didn't bring one): if + <b>had</b> + past participle.` }
      ]
    },
    toefl: [
      { q: `If you ___ water to 100 degrees, it boils.`, o: [`heat`, `will heat`, `heated`, `would heat`], a: 0, why: `A fact: present in both parts (<b>heat</b> … boils).` },
      { q: `If I ___ you, I would apologize to her.`, o: [`am`, `will be`, `were`, `have been`], a: 2, why: `Advice: <b>If I were you</b>, I would …` },
      { q: `We ___ to the beach on Saturday if the weather is nice.`, o: [`would go`, `will go`, `went`, `had gone`], a: 1, why: `Real future (if + present): <b>will go</b>.` },
      { q: `If Lucas had set his alarm, he ___ late for school.`, o: [`won't be`, `wasn't`, `isn't`, `wouldn't have been`], a: 3, why: `The past (had set): <b>would have</b> + past participle.` },
      { q: `If my grandparents lived closer, I ___ them every weekend.`, o: [`would visit`, `will visit`, `visited`, `had visited`], a: 0, why: `Imaginary (they don't live close): if + past, <b>would</b> + verb.` }
    ],
    challenge: {
      title: `Planning a Picnic`,
      text: `My friends and I are planning a picnic for Saturday. If the weather {1} good, we will meet at the park at 11:00. If it rains, we {2} watch movies at Laura's house instead. Laura says, "If I {3} a bigger TV, it would be more fun!" Last time, Tomás forgot his ball. If he {4} it, we could have played soccer. This time, he says he {5} bring two balls if he remembers. Honestly, if I {6} the organizer, I would make a checklist for everyone!`,
      blanks: [
        { o: [`will be`, `is`, `would be`, `were`], a: 1, why: `Real future + will: if + present (<b>is</b>).` },
        { o: [`would`, `had`, `will`, `are`], a: 2, why: `If + present (rains): <b>will</b> + verb.` },
        { o: [`have`, `would have`, `will have`, `had`], a: 3, why: `Imaginary + would: if + past (<b>had</b>).` },
        { o: [`had brought`, `brought`, `has brought`, `would bring`], a: 0, why: `The past (he didn't bring it) + could have: <b>had brought</b>.` },
        { o: [`would`, `will`, `had`, `is`], a: 1, why: `A real future (if he remembers): <b>will</b>.` },
        { o: [`am`, `will be`, `were`, `had been`], a: 2, why: `Imaginary (I am not the organizer) + would: <b>were</b>.` }
      ]
    }
  },

  'modal-verbs': {
    title: `Modal verbs`,
    group: `Sentence structure`,
    intro: `Modal verbs (<i>can, could, must, should, may, might</i>) add meaning to another verb: <b>ability</b>, <b>rules</b>, <b>advice</b>, <b>possibility</b> or <b>permission</b>. They are always followed by the <b>base verb</b>.`,
    rules: [
      { word: `Ability`, meaning: `What someone is able to do.`,
        patterns: [`can / can't (now)`, `could / couldn't (past)`, `be able to (any tense)`],
        example: `My sister <mark>can</mark> speak three languages.` },
      { word: `Rules and necessity`, meaning: `What is necessary, not allowed, or not necessary.`,
        patterns: [`must / have to = it is necessary`, `mustn't = it is NOT allowed`, `don't have to = it is NOT necessary`],
        example: `You <mark>mustn't</mark> run in the halls.` },
      { word: `Advice`, meaning: `What is a good or bad idea.`,
        patterns: [`should / shouldn't + verb`, `ought to + verb`, `You should … / You shouldn't …`],
        example: `You <mark>should</mark> drink more water.` },
      { word: `Possibility and permission`, meaning: `What is possible, and asking for permission.`,
        patterns: [`may / might / could = maybe`, `Can I …? (informal) · May I …? (polite)`, `can't = impossible (That can't be true!)`],
        example: `It <mark>might</mark> rain this afternoon.` }
    ],
    tip: `<b>After a modal, use the base verb:</b> <i>can swim</i>, not <i>can to swim</i> or <i>can swims</i>. Modals never add -s: <i>he must</i>, not <i>he musts</i>. Be careful: <b>mustn't</b> = not allowed, but <b>don't have to</b> = not necessary.`,
    examples: [
      { s: `I <mark>can't</mark> find my keys anywhere.`, note: `can't = not able.` },
      { s: `All visitors <mark>must</mark> sign in at the front desk.`, note: `must = a rule.` },
      { s: `You <mark>don't have to</mark> wear a uniform on Fridays.`, note: `don't have to = not necessary (but you can).` },
      { s: `You <mark>should</mark> see a doctor about that cough.`, note: `should = advice.` },
      { s: `Take an umbrella. It <mark>might</mark> rain later.`, note: `might = maybe.` }
    ],
    mistakes: [
      { wrong: `She can to swim very well.`, right: `She can swim very well.`, why: `After a modal, use the base verb without <i>to</i>.` },
      { wrong: `He musts finish his homework.`, right: `He must finish his homework.`, why: `Modals never add -s.` },
      { wrong: `You mustn't come tomorrow. It's a holiday.`, right: `You don't have to come tomorrow. It's a holiday.`, why: `It is not necessary (not forbidden): <b>don't have to</b>.` },
      { wrong: `Do you can help me?`, right: `Can you help me?`, why: `In questions, the modal goes before the subject. No <i>do</i>.` },
      { wrong: `You should to rest.`, right: `You should rest.`, why: `<b>Should</b> + base verb, without <i>to</i>.` },
      { wrong: `Yesterday I can't go to the party.`, right: `Yesterday I couldn't go to the party.`, why: `In the past, use <b>could / couldn't</b>.` }
    ],
    guided: {
      bank: [`can`, `must`, `should`, `might`, `don't have to`],
      items: [
        { s: `It's the law. Drivers ___ stop at red lights.`, a: `must`, why: `A law = necessary: <b>must</b>.` },
        { s: `It's Saturday tomorrow, so you ___ get up early.`, a: `don't have to`, why: `No school = not necessary: <b>don't have to</b>.` },
        { s: `You look tired. You ___ go to bed early tonight.`, a: `should`, why: `Advice: <b>should</b>.` },
        { s: `My grandfather is 80, but he ___ still ride a bike.`, a: `can`, why: `Ability: <b>can</b>.` },
        { s: `I'm not sure yet, but I ___ visit my cousins this weekend.`, a: `might`, why: `"Not sure" = maybe: <b>might</b>.` }
      ]
    },
    toefl: [
      { q: `Students ___ use their phones during the exam. It is against the rules.`, o: [`mustn't`, `don't have to`, `should`, `can`], a: 0, why: `Against the rules = not allowed: <b>mustn't</b>.` },
      { q: `When I was five, I ___ already read short books.`, o: [`can`, `could`, `must`, `should`], a: 1, why: `Ability in the past: <b>could</b>.` },
      { q: `You ___ bring food to the party. We already have plenty.`, o: [`mustn't`, `can't`, `don't have to`, `shouldn't`], a: 2, why: `There is enough food, so it is not necessary: <b>don't have to</b>.` },
      { q: `It's very cold outside. You ___ wear a warm jacket.`, o: [`might`, `can`, `must to`, `should`], a: 3, why: `Advice: <b>should</b>. (<i>Must to</i> is not correct.)` },
      { q: `Excuse me, ___ I borrow your pencil?`, o: [`should`, `may`, `must`, `have to`], a: 1, why: `Polite permission: <b>May I</b> …?` }
    ],
    challenge: {
      title: `Rules for the Field Trip`,
      text: `Our class is going to the Botanical Garden on Friday. Here are the rules. All students {1} wear their school uniform. You {2} bring money, because lunch is included. You {3} touch the plants in the greenhouse; some of them are poisonous! It {4} rain in the afternoon, so you {5} bring a raincoat. If you get lost, you {6} call the teacher's number on your badge.`,
      blanks: [
        { o: [`might`, `must`, `don't have to`, `can't`], a: 1, why: `A rule for everyone: <b>must</b>.` },
        { o: [`mustn't`, `should`, `don't have to`, `must`], a: 2, why: `Lunch is included, so money is not necessary: <b>don't have to</b>.` },
        { o: [`don't have to`, `should`, `might`, `mustn't`], a: 3, why: `The plants are poisonous: it is not allowed (<b>mustn't</b>).` },
        { o: [`might`, `must`, `should`, `has to`], a: 0, why: `Maybe it will rain: <b>might</b>.` },
        { o: [`mustn't`, `should`, `can't`, `don't have to`], a: 1, why: `Good advice: <b>should</b>.` },
        { o: [`must to`, `should to`, `can to`, `can`], a: 3, why: `Modal + base verb, without <i>to</i>: <b>can</b> call.` }
      ]
    }
  },

  'noun-clauses': {
    title: `Noun clauses`,
    group: `Sentence structure`,
    intro: `A noun clause is a small sentence <b>inside</b> a bigger sentence. It often starts with <b>that</b>, a question word (<i>what, where, why, how</i>) or <b>if / whether</b>. The most important rule: inside a sentence, questions use <b>statement word order</b>.`,
    rules: [
      { word: `that`, meaning: `After verbs like <i>think, know, say, hope, believe</i> and after <i>I'm sure</i>.`,
        patterns: [`I think (that) she is right.`, `She said (that) she was tired.`, `I'm sure (that) you will win.`],
        example: `I know <mark>that</mark> you are busy.` },
      { word: `Question words`, meaning: `A question inside a sentence uses <b>statement</b> order and no <i>do / does / did</i>.`,
        patterns: [`Where is the bank? → Can you tell me where the bank is?`, `What does he want? → I don't know what he wants.`, `who · what · where · when · why · how`],
        example: `Can you tell me <mark>where the bank is</mark>?` },
      { word: `if / whether`, meaning: `For <b>yes / no</b> questions inside a sentence.`,
        patterns: [`Is it open? → I wonder if it is open.`, `whether … or not`, `She asked if I liked pizza.`],
        example: `I wonder <mark>whether</mark> it will rain tomorrow.` },
      { word: `what = the thing that`, meaning: `<b>What</b> can begin a clause that acts like a noun, even as the subject.`,
        patterns: [`What I need is a long vacation.`, `I didn't understand what she said.`, `NOT: the thing what`],
        example: `<mark>What</mark> I need is a long vacation.` }
    ],
    tip: `<b>Inside a bigger sentence, a question becomes a statement:</b> subject first, then the verb, and no <i>do / does / did</i>. Not <i>I don't know where does she live</i>, but <i>I don't know where she lives</i>. For yes / no questions, use <b>if</b> or <b>whether</b>.`,
    examples: [
      { s: `I'm sure <mark>that</mark> you will love Cartagena.`, note: `that + a full sentence.` },
      { s: `Do you know <mark>what time it is</mark>?`, note: `statement order: it is (not "is it").` },
      { s: `Nobody knows <mark>where the cat went</mark>.`, note: `no "did": where the cat went.` },
      { s: `The teacher asked <mark>if</mark> we had finished.`, note: `a yes / no question inside a sentence: if.` },
      { s: `<mark>What</mark> she said made everyone laugh.`, note: `What she said = the thing that she said.` }
    ],
    mistakes: [
      { wrong: `Can you tell me where is the station?`, right: `Can you tell me where the station is?`, why: `Inside a sentence, use statement order: subject + verb.` },
      { wrong: `I don't know what does he want.`, right: `I don't know what he wants.`, why: `No <i>does</i> inside the sentence, and add -s to the verb.` },
      { wrong: `She asked me did I like pizza.`, right: `She asked me if I liked pizza.`, why: `A yes / no question inside a sentence needs <b>if</b> or <b>whether</b>.` },
      { wrong: `I wonder when will the bus arrive.`, right: `I wonder when the bus will arrive.`, why: `Statement order: the bus will arrive.` },
      { wrong: `Do you know how much costs this?`, right: `Do you know how much this costs?`, why: `Subject (this) before the verb (costs).` },
      { wrong: `The thing what I need is a pen.`, right: `What I need is a pen.`, why: `Use <b>What</b> alone, or <b>The thing that</b>. Not <i>the thing what</i>.` }
    ],
    guided: {
      bank: [`that`, `what`, `where`, `if`, `why`],
      items: [
        { s: `I'm sure ___ you will enjoy the movie.`, a: `that`, why: `<b>I'm sure that</b> + a full sentence.` },
        { s: `Can you tell me ___ the bathroom is?`, a: `where`, why: `Asking about a place: <b>where</b> + statement order.` },
        { s: `I don't understand ___ the teacher means.`, a: `what`, why: `The thing that the teacher means: <b>what</b>.` },
        { s: `Ask your mom ___ you can come to the party.`, a: `if`, why: `A yes / no question (Can I come?): <b>if</b>.` },
        { s: `Nobody knows ___ Pablo was so quiet today.`, a: `why`, why: `Asking for a reason: <b>why</b>.` }
      ]
    },
    toefl: [
      { q: `Could you tell me ___?`, o: [`when does the library open`, `when the library opens`, `when opens the library`, `the library opens when`], a: 1, why: `Statement order, no <i>does</i>: <b>when the library opens</b>.` },
      { q: `I'm not sure ___ I can come to your party.`, o: [`whether`, `what`, `that`, `which`], a: 0, why: `A yes / no idea (Can I come?): <b>whether</b>.` },
      { q: `___ you told me yesterday really helped me.`, o: [`That`, `Which`, `What`, `If`], a: 2, why: `The thing that you told me: <b>What</b>.` },
      { q: `The tourist asked ___.`, o: [`where was the museum`, `where is the museum`, `the museum where was`, `where the museum was`], a: 3, why: `Statement order in the past: <b>where the museum was</b>.` },
      { q: `Everyone knows ___ exercise is good for your health.`, o: [`what`, `that`, `if`, `whose`], a: 1, why: `<b>Know that</b> + a full sentence.` }
    ],
    challenge: {
      title: `Lost in Lima`,
      text: `When my family visited Lima, we got lost on the first day. My dad wasn't sure {1} we should turn left or right. My mom asked a woman {2} the hotel was. The woman said {3} it was only ten minutes away. Then she asked us {4} we were from. When we said Colombia, she smiled and told us {5} she loved Colombian music. {6} I learned that day is that people are kind everywhere.`,
      blanks: [
        { o: [`what`, `whether`, `that`, `where`], a: 1, why: `Left or right? = a choice: <b>whether</b> … or.` },
        { o: [`what`, `that`, `where`, `if`], a: 2, why: `Asking about a place: <b>where</b> the hotel was.` },
        { o: [`what`, `if`, `where`, `that`], a: 3, why: `<b>Said that</b> + a full sentence.` },
        { o: [`where`, `what`, `that`, `if`], a: 0, why: `"Where are you from?" inside a sentence: <b>where</b> we were from.` },
        { o: [`what`, `that`, `whether`, `where`], a: 1, why: `<b>Told us that</b> + a full sentence.` },
        { o: [`That`, `Which`, `What`, `If`], a: 2, why: `The thing that I learned: <b>What</b>.` }
      ]
    }
  },

  'word-order': {
    title: `Word order`,
    group: `Sentence structure`,
    intro: `English word order is stricter than Spanish word order. Most sentences follow the same pattern, questions have their own order, and small words like <i>always</i> and <i>very well</i> have fixed places.`,
    rules: [
      { word: `Basic sentence`, meaning: `Subject + Verb + Object + Place + Time.`,
        patterns: [`S + V + O: My brother plays soccer.`, `+ place: in the park`, `+ time: every Saturday (time usually at the end)`],
        example: `My brother plays soccer <mark>in the park every Saturday</mark>.` },
      { word: `Questions`, meaning: `The helper verb (<i>do, does, did, is, can, will</i>) comes <b>before</b> the subject.`,
        patterns: [`(Question word) + helper + subject + verb`, `Where do you live? · Did you go?`, `Is she ready? · Can you help me?`],
        example: `<mark>Where do you</mark> live?` },
      { word: `Frequency words`, meaning: `<i>always, usually, often, sometimes, never</i> go <b>before</b> the main verb but <b>after</b> <i>be</i>.`,
        patterns: [`I always walk to school.`, `She is never late.`, `"very well" and "very much" go at the end`],
        example: `She <mark>is always</mark> on time, and she <mark>never forgets</mark> her homework.` },
      { word: `Adjectives`, meaning: `Adjectives go <b>before</b> the noun. With more than one, opinion comes first.`,
        patterns: [`a red car (not a car red)`, `opinion → size → age → color → origin → material`, `a beautiful old wooden table`],
        example: `We ate at a <mark>beautiful old wooden</mark> table.` }
    ],
    tip: `<b>Remember S-V-O-P-T:</b> Subject, Verb, Object, Place, Time. Don't put words between the verb and its object: not <i>I like very much pizza</i>, but <i>I like pizza very much</i>. In questions, the helper verb goes <b>before</b> the subject.`,
    examples: [
      { s: `We ate lunch <mark>at a restaurant yesterday</mark>.`, note: `verb + object + place + time.` },
      { s: `<mark>Did you finish</mark> your project?`, note: `question: helper (did) + subject + verb.` },
      { s: `I <mark>usually walk</mark> to school.`, note: `frequency word before the main verb.` },
      { s: `They <mark>are never</mark> late.`, note: `frequency word after be.` },
      { s: `She bought a <mark>beautiful blue</mark> dress.`, note: `opinion before color, both before the noun.` }
    ],
    mistakes: [
      { wrong: `I like very much pizza.`, right: `I like pizza very much.`, why: `Don't separate the verb and its object. <b>Very much</b> goes at the end.` },
      { wrong: `She speaks very well English.`, right: `She speaks English very well.`, why: `Verb + object + <b>very well</b>.` },
      { wrong: `Where you live?`, right: `Where do you live?`, why: `Questions need a helper verb before the subject.` },
      { wrong: `I go always to school by bus.`, right: `I always go to school by bus.`, why: `Frequency words go <b>before</b> the main verb.` },
      { wrong: `We have a house white.`, right: `We have a white house.`, why: `Adjectives go <b>before</b> the noun.` },
      { wrong: `I every day play the guitar.`, right: `I play the guitar every day.`, why: `Time expressions usually go at the <b>end</b>.` }
    ],
    guided: {
      bank: [`is always`, `always eat`, `did you`, `do you`, `very well`],
      items: [
        { s: `My grandmother ___ cheerful.`, a: `is always`, why: `With <i>be</i>, the frequency word goes after it: <b>is always</b>.` },
        { s: `We ___ breakfast at home.`, a: `always eat`, why: `The frequency word goes before the main verb: <b>always eat</b>.` },
        { s: `Where ___ go last summer?`, a: `did you`, why: `Past question: <b>did</b> + subject + verb.` },
        { s: `How often ___ play video games these days?`, a: `do you`, why: `Present question: <b>do</b> + subject + verb.` },
        { s: `Juan speaks English ___.`, a: `very well`, why: `<b>Very well</b> goes after the object, at the end.` }
      ]
    },
    toefl: [
      { q: `My little brother ___ his vegetables.`, o: [`never eats`, `eats never`, `never eat`, `is never eat`], a: 0, why: `Frequency word before the main verb, and he → eat<b>s</b>: <b>never eats</b>.` },
      { q: `___ to the museum last weekend?`, o: [`You did go`, `Went you`, `Did you go`, `Did you went`], a: 2, why: `Past question: <b>Did</b> + subject + base verb.` },
      { q: `Laura bought ___ for her mother's birthday.`, o: [`a scarf red beautiful`, `a beautiful red scarf`, `a red beautiful scarf`, `a scarf beautiful red`], a: 1, why: `Opinion (beautiful) → color (red) → noun.` },
      { q: `We play ___.`, o: [`every Saturday soccer in the park`, `in the park soccer every Saturday`, `soccer every Saturday the park`, `soccer in the park every Saturday`], a: 3, why: `Object + place + time.` },
      { q: `The children ___ in the garden.`, o: [`are playing happily`, `happily are playing`, `are happily play`, `playing are happily`], a: 0, why: `Helper + verb (-ing), then the adverb: <b>are playing happily</b>.` }
    ],
    challenge: {
      title: `My Saturday`,
      text: `On Saturdays, I {1} at 8:00, which is later than on school days. After breakfast, my sister and I {2} near our house. My sister {3} the ball, but she is a great goalkeeper. In the afternoon, we {4}. My grandmother always makes {5} for us. Before we leave, she asks, "{6} next Saturday?"`,
      blanks: [
        { o: [`wake up usually`, `usually wake up`, `usually wakes up`, `up wake usually`], a: 1, why: `Frequency word before the verb: <b>usually wake up</b>.` },
        { o: [`play in the park soccer`, `soccer play in the park`, `play soccer in the park`, `in the park play soccer`], a: 2, why: `Verb + object + place: <b>play soccer in the park</b>.` },
        { o: [`kicks never`, `never kick`, `does never kick`, `never kicks`], a: 3, why: `Frequency word before the verb, she → kick<b>s</b>: <b>never kicks</b>.` },
        { o: [`visit our grandparents by bus`, `by bus visit our grandparents`, `visit by bus our grandparents`, `our grandparents visit by bus`], a: 0, why: `Verb + object first, then how: <b>visit our grandparents by bus</b>.` },
        { o: [`a chocolate delicious cake`, `a delicious chocolate cake`, `a cake chocolate delicious`, `a delicious cake chocolate`], a: 1, why: `Opinion (delicious) + type (chocolate) + noun.` },
        { o: [`You will come`, `Come you will`, `Will you come`, `Will come you`], a: 2, why: `Question: helper (<b>Will</b>) + subject + verb.` }
      ]
    }
  },

  'parts-of-speech': {
    title: `Parts of speech`,
    group: `Words and word forms`,
    intro: `Every word in a sentence has a job. <b>Nouns</b> name things, <b>verbs</b> show actions, <b>adjectives</b> describe nouns and <b>adverbs</b> describe actions. In the test, the words around a blank tell you which kind of word is missing.`,
    rules: [
      { word: `Nouns`, meaning: `People, places, things and ideas. Pronouns (she, it, them) can replace them.`,
        patterns: [`a / the / my / this + noun`, `adjective + noun (a big house)`, `after a preposition (in the house)`],
        example: `The <mark>library</mark> has a new <mark>computer</mark>.` },
      { word: `Verbs`, meaning: `Actions or states. Every sentence needs one.`,
        patterns: [`subject + verb (She runs.)`, `can / will / to + verb (can swim, to learn)`, `is / has + verb form (is running, has finished)`],
        example: `We <mark>visited</mark> the museum on Saturday.` },
      { word: `Adjectives and adverbs`, meaning: `Adjectives describe <b>nouns</b>. Adverbs describe <b>verbs</b> (how, when, how often), often with -ly.`,
        patterns: [`adjective + noun (a quiet room)`, `be / look / seem + adjective (It looks easy.)`, `verb + adverb (speak quietly)`],
        example: `The <mark>quiet</mark> girl spoke <mark>quietly</mark>.` },
      { word: `Small connecting words`, meaning: `Prepositions, conjunctions and determiners connect and introduce other words.`,
        patterns: [`preposition + noun (in the box, after lunch)`, `conjunction + clause (because it was raining)`, `determiner + noun (a, the, some, every)`],
        example: `We stayed <mark>in</mark> the house <mark>because</mark> it was raining.` }
    ],
    tip: `<b>Look at the words just before and after the blank.</b> After <i>the / a / my</i> → probably a <b>noun</b>. After <i>can / will / to</i> → a <b>verb</b>. Before a noun → an <b>adjective</b>. Describing <i>how</i> someone does something → an <b>adverb</b>.`,
    examples: [
      { s: `My <mark>teacher</mark> gave us a <mark>difficult</mark> test.`, note: `teacher = noun · difficult = adjective before a noun.` },
      { s: `The children <mark>laughed</mark> at the clown.`, note: `laughed = verb (the action).` },
      { s: `Tomás runs very <mark>quickly</mark>.`, note: `quickly = adverb: how he runs.` },
      { s: `She seems <mark>happy</mark> today.`, note: `happy = adjective after seem.` },
      { s: `The <mark>beauty</mark> of the mountains surprised us.`, note: `beauty = noun after the.` }
    ],
    mistakes: [
      { wrong: `She is a very beauty girl.`, right: `She is a very beautiful girl.`, why: `Before a noun (girl), we need an <b>adjective</b>: beautiful.` },
      { wrong: `He drives very careful.`, right: `He drives very carefully.`, why: `To describe how he drives (a verb), use an <b>adverb</b>.` },
      { wrong: `I want to success in life.`, right: `I want to succeed in life.`, why: `After <b>to</b>, we need a <b>verb</b>: succeed.` },
      { wrong: `The weather is very sun today.`, right: `The weather is very sunny today.`, why: `After <i>is very</i>, we need an <b>adjective</b>: sunny.` },
      { wrong: `My dream is to become a science.`, right: `My dream is to become a scientist.`, why: `A person is a <b>noun</b> for people: scientist.` },
      { wrong: `The celebrate was amazing.`, right: `The celebration was amazing.`, why: `After <b>the</b>, we need a <b>noun</b>: celebration.` }
    ],
    guided: {
      bank: [`noun`, `verb`, `adjective`, `adverb`, `preposition`],
      items: [
        { s: `In "The <b>library</b> opens at nine," the word in bold is a(n) ___.`, a: `noun`, why: `<b>Library</b> is a place, after "the": a noun.` },
        { s: `In "We <b>swam</b> in the lake," the word in bold is a(n) ___.`, a: `verb`, why: `<b>Swam</b> is the action: a verb.` },
        { s: `In "It was a <b>cold</b> morning," the word in bold is a(n) ___.`, a: `adjective`, why: `<b>Cold</b> describes the noun morning: an adjective.` },
        { s: `In "She answered <b>politely</b>," the word in bold is a(n) ___.`, a: `adverb`, why: `<b>Politely</b> tells us how she answered: an adverb.` },
        { s: `In "The cat is <b>under</b> the table," the word in bold is a(n) ___.`, a: `preposition`, why: `<b>Under</b> shows place before a noun: a preposition.` }
      ]
    },
    toefl: [
      { q: `The museum has a large ___ of old coins.`, o: [`collect`, `collective`, `collection`, `collected`], a: 2, why: `After <i>a large</i>, we need a noun: <b>collection</b>.` },
      { q: `Please speak ___. The baby is sleeping.`, o: [`quiet`, `quietly`, `quietness`, `quiets`], a: 1, why: `How to speak (a verb): adverb <b>quietly</b>.` },
      { q: `The view from the mountain was absolutely ___.`, o: [`beauty`, `beautify`, `beautifully`, `beautiful`], a: 3, why: `After <i>was</i>, we need an adjective: <b>beautiful</b>.` },
      { q: `Our coach wants us to ___ harder before the final.`, o: [`train`, `training`, `trainer`, `trained`], a: 0, why: `After <b>to</b>, we need the base verb: <b>train</b>.` },
      { q: `Everyone was surprised by the ___ of the storm.`, o: [`strong`, `strength`, `strongly`, `strengthen`], a: 1, why: `After <b>the</b>, we need a noun: <b>strength</b>.` }
    ],
    challenge: {
      title: `The School Concert`,
      text: `Last Friday, our school held its annual {1}. The music teacher, Mr. Hale, had prepared the students very {2}. The first song was slow and {3}, and some parents cried. Then the drummers {4} the audience with a fast rhythm. At the end, the principal thanked everyone for their {5}. It was a {6} night that nobody will forget.`,
      blanks: [
        { o: [`celebrate`, `celebration`, `celebrated`, `celebratory`], a: 1, why: `After <i>its annual</i>, we need a noun: <b>celebration</b>.` },
        { o: [`careful`, `care`, `carefully`, `careless`], a: 2, why: `How he prepared them (a verb): adverb <b>carefully</b>.` },
        { o: [`peace`, `peacefully`, `pacify`, `peaceful`], a: 3, why: `After <i>was slow and</i>, we need an adjective: <b>peaceful</b>.` },
        { o: [`surprised`, `surprise`, `surprising`, `surprisingly`], a: 0, why: `The drummers did an action in the past: verb <b>surprised</b>.` },
        { o: [`helpful`, `help`, `helpfully`, `helped`], a: 1, why: `After <i>their</i>, we need a noun: <b>help</b>.` },
        { o: [`wonder`, `wonderfully`, `wonderful`, `wondered`], a: 2, why: `Before the noun <i>night</i>, we need an adjective: <b>wonderful</b>.` }
      ]
    }
  },

  'word-forms': {
    title: `Word forms`,
    group: `Words and word forms`,
    intro: `Many English words change their <b>ending</b> to become a noun, a verb, an adjective or an adverb: <i>decide → decision</i>, <i>use → useful</i>, <i>calm → calmly</i>. If you know the endings, you can choose the right form quickly.`,
    rules: [
      { word: `Noun endings`, meaning: `Things, ideas and people.`,
        patterns: [`-tion / -sion · -ment (decision, movement)`, `-ness · -ity (happiness, ability)`, `-er / -or / -ist (teacher, actor, artist)`],
        example: `Her <mark>kindness</mark> surprised everyone.` },
      { word: `Verb endings`, meaning: `These endings often turn an adjective or noun into a verb.`,
        patterns: [`-ize (modern → modernize)`, `-en (wide → widen · short → shorten)`, `-ify · -ate (simple → simplify · active → activate)`],
        example: `The city wants to <mark>widen</mark> the road.` },
      { word: `Adjective endings`, meaning: `These describe nouns.`,
        patterns: [`-ful / -less (useful, useless)`, `-ous (dangerous, famous)`, `-able / -ible · -al · -ive (enjoyable, natural, creative)`],
        example: `This app is very <mark>useful</mark>.` },
      { word: `Adverb ending -ly`, meaning: `Adjective + <b>-ly</b> = adverb. Watch the spelling.`,
        patterns: [`calm → calmly · careful → carefully`, `happy → happily (y → i) · gentle → gently`, `good → well (irregular)`],
        example: `He answered <mark>calmly</mark>.` }
    ],
    tip: `<b>First decide which kind of word fits the blank</b> (noun, verb, adjective or adverb). Then choose the option with the right <b>ending</b>: nouns often end in <i>-tion, -ment, -ness</i>; adjectives in <i>-ful, -ous, -able, -ive</i>; adverbs in <i>-ly</i>.`,
    examples: [
      { s: `We need to make a <mark>decision</mark> today.`, note: `decide → decision (a noun after "a").` },
      { s: `Plastic can be <mark>harmful</mark> to sea animals.`, note: `harm → harmful (an adjective after "be").` },
      { s: `The city plans to <mark>modernize</mark> the old train station.`, note: `modern → modernize (a verb after "to").` },
      { s: `Gabriel García Márquez is a <mark>famous</mark> writer.`, note: `fame → famous (an adjective before a noun).` },
      { s: `The baby slept <mark>peacefully</mark> all night.`, note: `peaceful → peacefully (an adverb).` }
    ],
    mistakes: [
      { wrong: `She has a lot of creative.`, right: `She has a lot of creativity.`, why: `After <i>a lot of</i>, we need a noun: creativ<b>ity</b>.` },
      { wrong: `The movie was very enjoy.`, right: `The movie was very enjoyable.`, why: `After <i>was very</i>, we need an adjective: enjoy<b>able</b>.` },
      { wrong: `He is a very danger driver.`, right: `He is a very dangerous driver.`, why: `Before a noun, we need an adjective: danger<b>ous</b>.` },
      { wrong: `Thank you for your kindly help.`, right: `Thank you for your kind help.`, why: `Before a noun (help), use the adjective <b>kind</b>, not the adverb.` },
      { wrong: `We had a long discuss about it.`, right: `We had a long discussion about it.`, why: `After <i>a long</i>, we need a noun: discuss<b>ion</b>.` },
      { wrong: `She sings beautifuly.`, right: `She sings beautifully.`, why: `<b>-ful + -ly = -fully</b>, with two l's.` }
    ],
    guided: {
      bank: [`success`, `succeed`, `successful`, `successfully`, `unsuccessful`],
      items: [
        { s: `Hard work is the key to ___.`, a: `success`, why: `After a preposition (to), we need a noun: <b>success</b>.` },
        { s: `If you practice every day, you will ___.`, a: `succeed`, why: `After <b>will</b>, we need a verb: <b>succeed</b>.` },
        { s: `My aunt is a very ___ businesswoman.`, a: `successful`, why: `Before a noun, we need an adjective: <b>successful</b>.` },
        { s: `The rocket was ___ launched last night.`, a: `successfully`, why: `Describing how it was launched: adverb <b>successfully</b>.` },
        { s: `Our first try was ___, so we tried again.`, a: `unsuccessful`, why: `It did not work: <b>un</b>successful (not successful).` }
      ]
    },
    toefl: [
      { q: `The ___ of the new bridge took three years.`, o: [`construct`, `constructive`, `construction`, `constructed`], a: 2, why: `After <b>the</b>, we need a noun: <b>construction</b>.` },
      { q: `Be ___ when you cross the street.`, o: [`care`, `careful`, `carefully`, `carefulness`], a: 1, why: `After <b>be</b>, we need an adjective: <b>careful</b>.` },
      { q: `The scientist made an important ___ about dinosaurs.`, o: [`discover`, `discovered`, `discoverer`, `discovery`], a: 3, why: `After <i>an important</i>, we need a noun for a thing: <b>discovery</b>.` },
      { q: `The team played ___ and won the cup.`, o: [`brilliantly`, `brilliant`, `brilliance`, `brillianter`], a: 0, why: `How they played: adverb <b>brilliantly</b>.` },
      { q: `Too much sugar can ___ your teeth.`, o: [`weak`, `weaken`, `weakness`, `weakly`], a: 1, why: `After <b>can</b>, we need a verb: <b>weaken</b> (-en makes a verb).` }
    ],
    challenge: {
      title: `A New Hobby`,
      text: `Last year, I started taking {1} classes. At first, I was very {2}, and my photos were not good. But my teacher was patient and {3}. She showed me how to use light and shadow {4}. Now I feel more {5} about my photos, and I even won a small {6} at school.`,
      blanks: [
        { o: [`photograph`, `photographic`, `photography`, `photographer`], a: 2, why: `The subject of the classes: <b>photography</b>.` },
        { o: [`nervous`, `nerve`, `nervously`, `nervousness`], a: 0, why: `After <i>was very</i>, we need an adjective: <b>nervous</b>.` },
        { o: [`encourage`, `encouragement`, `encouragingly`, `encouraging`], a: 3, why: `After <i>was patient and</i>, we need an adjective: <b>encouraging</b>.` },
        { o: [`effect`, `effectively`, `effective`, `effectiveness`], a: 1, why: `How to use light: adverb <b>effectively</b>.` },
        { o: [`confidence`, `confidently`, `confident`, `confide`], a: 2, why: `After <i>feel more</i>, we need an adjective: <b>confident</b>.` },
        { o: [`compete`, `competitive`, `competitor`, `competition`], a: 3, why: `You win a thing (a noun): <b>competition</b>.` }
      ]
    }
  },

  'pronouns-and-possessives': {
    title: `Pronouns and possessives`,
    group: `Words and word forms`,
    intro: `Pronouns replace nouns so we don't repeat them. The right pronoun depends on its <b>job</b> in the sentence: doing the action, receiving it, or showing who something belongs to.`,
    rules: [
      { word: `Subject and object`, meaning: `<b>Subject</b> pronouns do the action. <b>Object</b> pronouns receive it or come after a preposition.`,
        patterns: [`I · you · he · she · it · we · they (subject)`, `me · you · him · her · it · us · them (object)`, `between you and me · for them`],
        example: `<mark>She</mark> called <mark>me</mark> yesterday.` },
      { word: `Possessives`, meaning: `<b>my, your, his, her</b> … go before a noun. <b>mine, yours, his, hers</b> … stand alone.`,
        patterns: [`my · your · his · her · its · our · their + noun`, `mine · yours · his · hers · ours · theirs (alone)`, `This is my bag. It's mine.`],
        example: `This is <mark>my</mark> bag. That one is <mark>yours</mark>.` },
      { word: `'s and of`, meaning: `Use <b>'s</b> for people and animals. Use <b>of</b> for most things.`,
        patterns: [`Ana's book · my brother's bike`, `the students' books (plural + ')`, `the children's toys · the end of the movie`],
        example: `This is my <mark>brother's</mark> bike.` },
      { word: `-self and its / it's`, meaning: `<b>-self / -selves</b> when the subject and object are the same person. <b>its</b> = belonging to it; <b>it's</b> = it is.`,
        patterns: [`myself · yourself · himself · herself · itself`, `ourselves · yourselves · themselves`, `its tail (possession) · it's late (it is)`],
        example: `The cat cleaned <mark>itself</mark>.` }
    ],
    tip: `<b>Ask:</b> is the word doing the action (I, she, they) or receiving it (me, her, them)? Before a noun, use <i>my, her, their</i>; alone, use <i>mine, hers, theirs</i>. Never write <i>it's</i> for possession: <b>its</b> = belonging to it.`,
    examples: [
      { s: `Laura and <mark>I</mark> went to the market.`, note: `subject: Laura and I went.` },
      { s: `The teacher gave <mark>us</mark> extra homework.`, note: `object: the teacher gave (to) us.` },
      { s: `Is this pencil <mark>yours</mark>?`, note: `possessive pronoun alone, no noun after it.` },
      { s: `The <mark>children's</mark> playground is next to the school.`, note: `irregular plural (children) + 's.` },
      { s: `The dog wagged <mark>its</mark> tail.`, note: `its = belonging to the dog.` }
    ],
    mistakes: [
      { wrong: `Me and my friend went to the park.`, right: `My friend and I went to the park.`, why: `The subject needs <b>I</b>, and it's polite to put yourself last.` },
      { wrong: `This book is my.`, right: `This book is mine.`, why: `With no noun after it, use <b>mine</b>.` },
      { wrong: `The dog hurt it's leg.`, right: `The dog hurt its leg.`, why: `Possession = <b>its</b>. <i>It's</i> means "it is".` },
      { wrong: `Her and me are best friends.`, right: `She and I are best friends.`, why: `Subjects need subject pronouns: <b>She and I</b>.` },
      { wrong: `The book of Juan is on the table.`, right: `Juan's book is on the table.`, why: `For people, use <b>'s</b>. (Spanish <i>el libro de Juan</i> = Juan's book.)` },
      { wrong: `They enjoyed theirselves.`, right: `They enjoyed themselves.`, why: `The correct form is <b>themselves</b>.` }
    ],
    guided: {
      bank: [`him`, `his`, `hers`, `its`, `themselves`],
      items: [
        { s: `I saw Pedro at the mall and said hello to ___.`, a: `him`, why: `After a preposition (to): object pronoun <b>him</b>.` },
        { s: `Pedro forgot ___ umbrella at school.`, a: `his`, why: `Before a noun (umbrella): <b>his</b>.` },
        { s: `That isn't my jacket. It's Sara's. It's ___.`, a: `hers`, why: `Alone, with no noun after it: <b>hers</b>.` },
        { s: `The company changed ___ logo last year.`, a: `its`, why: `Belonging to the company (it): <b>its</b>.` },
        { s: `The students organized the whole party by ___.`, a: `themselves`, why: `<b>By themselves</b> = without help.` }
      ]
    },
    toefl: [
      { q: `My sister and ___ are going to Cartagena next week.`, o: [`me`, `I`, `mine`, `myself`], a: 1, why: `Part of the subject: <b>I</b>.` },
      { q: `Can you help ___ with this heavy box?`, o: [`I`, `my`, `me`, `mine`], a: 2, why: `After the verb (help): object pronoun <b>me</b>.` },
      { q: `These aren't our seats. ___ are in the next row.`, o: [`Ours`, `Our`, `Us`, `We`], a: 0, why: `With no noun after it: <b>Ours</b> (= our seats).` },
      { q: `The bird built ___ nest in our tree.`, o: [`it's`, `it`, `itself`, `its`], a: 3, why: `Belonging to the bird: <b>its</b>.` },
      { q: `All the ___ backpacks were left in the classroom.`, o: [`student's`, `students'`, `students`, `student`], a: 1, why: `Many students (plural) + possession: <b>students'</b>.` }
    ],
    challenge: {
      title: `Moving Day`,
      text: `Last Saturday, my family moved to a new apartment. My dad and {1} carried the heavy boxes. My little brother wanted to carry {2} own box, so we gave him a small one. Our neighbors, the Ruiz family, came to help {3}. Their daughter, Sofía, said, "If you need anything, just ask. {4} is the green door at the end of the hall." Our cat was nervous and hid under the bed all day. It didn't even eat {5} food! In the evening, we ordered pizza and enjoyed {6} on the balcony.`,
      blanks: [
        { o: [`me`, `I`, `my`, `mine`], a: 1, why: `Part of the subject: <b>I</b>.` },
        { o: [`him`, `he`, `his`, `himself`], a: 2, why: `Before a noun (own box): <b>his</b>.` },
        { o: [`us`, `our`, `we`, `ours`], a: 0, why: `After the verb (help): object pronoun <b>us</b>.` },
        { o: [`Our`, `Us`, `We`, `Ours`], a: 3, why: `Standing alone (= our apartment): <b>Ours</b>.` },
        { o: [`it's`, `its`, `it`, `itself`], a: 1, why: `Belonging to the cat: <b>its</b>.` },
        { o: [`us`, `ourself`, `ourselves`, `our`], a: 2, why: `We enjoyed (we) = <b>ourselves</b>.` }
      ]
    }
  },

  'adjectives-and-adverbs': {
    title: `Adjectives and adverbs`,
    group: `Words and word forms`,
    intro: `Adjectives describe <b>people and things</b> (a <i>careful</i> driver). Adverbs describe <b>actions</b> (she drives <i>carefully</i>). The test also checks feeling words (<i>bored / boring</i>) and tricky pairs like <i>good / well</i>.`,
    rules: [
      { word: `Adjective or adverb?`, meaning: `Adjective + noun. Verb + adverb (often adjective + <b>-ly</b>).`,
        patterns: [`a careful driver → drives carefully`, `a quick answer → answered quickly`, `easy → easily · gentle → gently`],
        example: `She is a <mark>careful</mark> driver. She drives <mark>carefully</mark>.` },
      { word: `After linking verbs`, meaning: `After <b>be, look, feel, seem, sound, taste, smell</b>, use an <b>adjective</b>.`,
        patterns: [`The soup smells delicious.`, `You look tired.`, `That sounds great!`],
        example: `The soup smells <mark>delicious</mark>.` },
      { word: `-ed or -ing?`, meaning: `<b>-ed</b> = how a person feels. <b>-ing</b> = the thing that causes the feeling.`,
        patterns: [`I am bored. The class is boring.`, `interested / interesting`, `tired / tiring · surprised / surprising`],
        example: `The movie was <mark>exciting</mark>, so we were very <mark>excited</mark>.` },
      { word: `Tricky words`, meaning: `Some adverbs are irregular, and some -ly words have a different meaning.`,
        patterns: [`good (adjective) → well (adverb)`, `fast · hard · early · late (same form)`, `hardly = almost not · lately = recently`],
        example: `He plays the guitar <mark>well</mark>.` }
    ],
    tip: `<b>Ask what the word describes.</b> A person or thing → adjective. An action → adverb (often -ly). After <i>be, look, feel, seem, taste, smell, sound</i> → adjective. For feelings: people <b>feel -ed</b>, things <b>are -ing</b>.`,
    examples: [
      { s: `The test was <mark>easy</mark>, so I finished it <mark>easily</mark>.`, note: `easy describes the test; easily describes finished.` },
      { s: `You look <mark>tired</mark>. Did you sleep well?`, note: `adjective after look.` },
      { s: `Math is <mark>interesting</mark> when the teacher explains it well.`, note: `-ing: math causes the interest.` },
      { s: `Our team worked <mark>hard</mark> all season.`, note: `hard is also an adverb (no -ly).` },
      { s: `I could <mark>hardly</mark> hear the music.`, note: `hardly = almost not.` }
    ],
    mistakes: [
      { wrong: `I am very boring in this class.`, right: `I am very bored in this class.`, why: `How a person feels: <b>-ed</b> (bored).` },
      { wrong: `She speaks English very good.`, right: `She speaks English very well.`, why: `To describe an action, use the adverb <b>well</b>.` },
      { wrong: `This cake tastes deliciously.`, right: `This cake tastes delicious.`, why: `After <b>taste</b>, use an adjective.` },
      { wrong: `He works very hardly.`, right: `He works very hard.`, why: `The adverb is <b>hard</b>. <i>Hardly</i> means "almost not".` },
      { wrong: `The news was very surprised.`, right: `The news was very surprising.`, why: `The news causes the feeling: <b>-ing</b>.` },
      { wrong: `Please drive slow near the school.`, right: `Please drive slowly near the school.`, why: `How to drive (a verb): adverb <b>slowly</b>.` }
    ],
    guided: {
      bank: [`good`, `well`, `bored`, `boring`, `hard`],
      items: [
        { s: `My grandmother is a ___ cook.`, a: `good`, why: `Before a noun (cook): adjective <b>good</b>.` },
        { s: `My grandmother cooks very ___.`, a: `well`, why: `How she cooks (an action): adverb <b>well</b>.` },
        { s: `This TV show is so ___. Let's watch something else.`, a: `boring`, why: `The show causes the feeling: <b>boring</b>.` },
        { s: `I'm ___. There is nothing to do!`, a: `bored`, why: `How a person feels: <b>bored</b>.` },
        { s: `If you study ___, you will pass.`, a: `hard`, why: `The adverb for "with a lot of effort" is <b>hard</b>.` }
      ]
    },
    toefl: [
      { q: `The children waited ___ for the show to begin.`, o: [`patient`, `patiently`, `patience`, `patients`], a: 1, why: `How they waited (an action): adverb <b>patiently</b>.` },
      { q: `The flowers in the garden smell ___.`, o: [`wonderfully`, `wonder`, `wonderful`, `wondered`], a: 2, why: `After <b>smell</b>, use an adjective: <b>wonderful</b>.` },
      { q: `We were ___ to hear that our teacher was leaving.`, o: [`surprised`, `surprising`, `surprise`, `surprisingly`], a: 0, why: `How we felt: <b>surprised</b>.` },
      { q: `The problem was so difficult that I could ___ understand it.`, o: [`hard`, `hardly`, `harder`, `hardest`], a: 1, why: `<b>Hardly</b> = almost not.` },
      { q: `Mateo is a ___ runner. He won the race easily.`, o: [`fastly`, `fasting`, `fastness`, `fast`], a: 3, why: `Before a noun: adjective <b>fast</b>. (<i>Fastly</i> is not a word.)` }
    ],
    challenge: {
      title: `My Class Presentation`,
      text: `Last week, I gave a presentation about volcanoes in my science class. I was a little {1} before I started, but my friends said my topic was {2}. I explained my experiment {3}, and my classmates listened {4}. My teacher said my results were very {5}. When she gave me the highest grade in the class, I was {6}!`,
      blanks: [
        { o: [`nervously`, `nervous`, `nerve`, `nervousness`], a: 1, why: `After <i>was a little</i>: adjective <b>nervous</b>.` },
        { o: [`interested`, `interest`, `interesting`, `interestingly`], a: 2, why: `The topic causes the feeling: <b>interesting</b>.` },
        { o: [`clear`, `clearness`, `clearest`, `clearly`], a: 3, why: `How I explained: adverb <b>clearly</b>.` },
        { o: [`carefully`, `careful`, `care`, `cared`], a: 0, why: `How they listened: adverb <b>carefully</b>.` },
        { o: [`impressing`, `impressive`, `impressed`, `impress`], a: 1, why: `The results cause the feeling: <b>impressive</b>.` },
        { o: [`amazing`, `amaze`, `amazed`, `amazingly`], a: 2, why: `How I felt: <b>amazed</b>.` }
      ]
    }
  },

  'articles-and-determiners': {
    title: `Articles and determiners`,
    group: `Words and word forms`,
    intro: `Small words like <b>a, an, the, some, any, much</b> and <b>many</b> come before nouns. They tell us if a thing is general or specific, and how much or how many there is.`,
    rules: [
      { word: `a / an`, meaning: `One thing, not a specific one, or mentioned for the first time. Also for jobs.`,
        patterns: [`a + consonant sound (a book, a university)`, `an + vowel sound (an apple, an hour)`, `jobs: She is a doctor.`],
        example: `I saw <mark>an</mark> elephant and <mark>a</mark> giraffe.` },
      { word: `the`, meaning: `A <b>specific</b> thing: already mentioned, the only one, or clear from the situation.`,
        patterns: [`second mention: I bought a book. The book …`, `only one: the sun, the moon, the internet`, `superlatives and rivers: the best, the Amazon`],
        example: `I bought a book. <mark>The</mark> book is about Colombia.` },
      { word: `No article`, meaning: `For things <b>in general</b> (plural or uncountable), and with most names, meals, sports and subjects.`,
        patterns: [`Dogs are friendly. · Water is important.`, `Colombia · Bogotá · breakfast · lunch`, `play soccer · study math`],
        example: `We play <mark>soccer</mark> after <mark>lunch</mark>.` },
      { word: `How much and how many`, meaning: `Different words for countable and uncountable nouns.`,
        patterns: [`some (positive) · any (negative and questions)`, `many + plural · much + uncountable`, `a few + plural · a little + uncountable`],
        example: `There are <mark>a few</mark> apples but only <mark>a little</mark> milk.` }
    ],
    tip: `One of many, first mention? → <b>a / an</b>. We know exactly which one? → <b>the</b>. Talking about things in general? → <b>no article</b>. Choose <b>a</b> or <b>an</b> by the first <b>sound</b>, not the letter: <i>an hour</i>, <i>a uniform</i>. Spanish uses <i>la / el</i> more than English: <i>la vida</i> = <i>life</i>.`,
    examples: [
      { s: `My uncle is <mark>an</mark> engineer.`, note: `jobs take a / an; engineer starts with a vowel sound.` },
      { s: `<mark>The</mark> sun rises in the east.`, note: `there is only one sun.` },
      { s: `I don't have <mark>any</mark> money left.`, note: `any in negative sentences.` },
      { s: `The Magdalena is <mark>the</mark> most important river in Colombia.`, note: `superlative and river name: the.` },
      { s: `We need <mark>a few</mark> eggs and <mark>a little</mark> sugar.`, note: `a few + plural · a little + uncountable.` }
    ],
    mistakes: [
      { wrong: `She is teacher.`, right: `She is a teacher.`, why: `Jobs need <b>a / an</b> (Spanish <i>es profesora</i> = she is a teacher).` },
      { wrong: `I have an university class today.`, right: `I have a university class today.`, why: `University starts with a "you" sound: <b>a</b> university.` },
      { wrong: `The life is beautiful.`, right: `Life is beautiful.`, why: `Things in general take <b>no article</b> (Spanish <i>la vida</i>).` },
      { wrong: `I don't have some money.`, right: `I don't have any money.`, why: `In negative sentences, use <b>any</b>.` },
      { wrong: `How much people came to the party?`, right: `How many people came to the party?`, why: `<b>People</b> is countable: <b>many</b>.` },
      { wrong: `I play the soccer every day.`, right: `I play soccer every day.`, why: `Sports take <b>no article</b>.` }
    ],
    guided: {
      bank: [`a`, `an`, `the`, `any`, `much`],
      items: [
        { s: `Can you wait ___ hour for me?`, a: `an`, why: `Hour starts with a vowel sound (the h is silent): <b>an</b>.` },
        { s: `I need ___ new pair of shoes.`, a: `a`, why: `One, not a specific one, consonant sound: <b>a</b>.` },
        { s: `Sorry, I don't have ___ brothers or sisters.`, a: `any`, why: `Negative sentence + plural: <b>any</b>.` },
        { s: `Please close ___ door. It's cold in here.`, a: `the`, why: `We both know which door: <b>the</b>.` },
        { s: `How ___ sugar do you want in your coffee?`, a: `much`, why: `Sugar is uncountable: <b>how much</b>.` }
      ]
    },
    toefl: [
      { q: `My cousin wants to be ___ astronaut.`, o: [`a`, `an`, `the`, `some`], a: 1, why: `A job + vowel sound: <b>an</b> astronaut.` },
      { q: `___ moon looks very big tonight.`, o: [`A`, `An`, `The`, `Some`], a: 2, why: `There is only one moon: <b>The</b>.` },
      { q: `There aren't ___ chairs in the classroom.`, o: [`much`, `a`, `a little`, `any`], a: 3, why: `Negative + plural: <b>any</b>.` },
      { q: `We need ___ more volunteers for the beach cleanup.`, o: [`a few`, `a little`, `much`, `an`], a: 0, why: `Volunteers is plural and countable: <b>a few</b>.` },
      { q: `How ___ water should we bring on the hike?`, o: [`many`, `much`, `few`, `a lot`], a: 1, why: `Water is uncountable: <b>how much</b>.` }
    ],
    challenge: {
      title: `A Trip to the Beach`,
      text: `Last December, my family took {1} trip to Santa Marta. We stayed in {2} small hotel near the beach. {3} hotel had a pool, but we preferred the sea. Every morning, we ate {4} eggs and fresh fruit for breakfast. One day, my brother saw {5} iguana sleeping on a rock! We didn't have {6} problems during the whole trip.`,
      blanks: [
        { o: [`an`, `a`, `the`, `some`], a: 1, why: `One trip, first mention, consonant sound: <b>a</b>.` },
        { o: [`an`, `the`, `a`, `any`], a: 2, why: `First mention of the hotel: <b>a</b>.` },
        { o: [`A`, `An`, `Some`, `The`], a: 3, why: `Second mention, we know which hotel: <b>The</b>.` },
        { o: [`some`, `a`, `an`, `much`], a: 0, why: `An amount of a plural noun (eggs): <b>some</b>.` },
        { o: [`a`, `an`, `the`, `some`], a: 1, why: `Iguana starts with a vowel sound: <b>an</b>.` },
        { o: [`some`, `much`, `any`, `a`], a: 2, why: `Negative + plural: <b>any</b>.` }
      ]
    }
  },

  'synonyms-and-antonyms': {
    title: `Synonyms and antonyms`,
    group: `Vocabulary`,
    intro: `<b>Synonyms</b> are words with a similar meaning (<i>big / large</i>). <b>Antonyms</b> are opposites (<i>hot / cold</i>). The test often asks which word is "closest in meaning", so knowing synonyms is very useful.`,
    rules: [
      { word: `Synonyms`, meaning: `Words that mean almost the same thing.`,
        patterns: [`big · large · huge (very big)`, `begin · start · happy · glad`, `difficult · hard · angry · mad`],
        example: `The test was <mark>difficult</mark>. It was really <mark>hard</mark>.` },
      { word: `Antonyms`, meaning: `Words with the opposite meaning.`,
        patterns: [`hot ↔ cold · arrive ↔ leave`, `always ↔ never · ancient ↔ modern`, `cheap ↔ expensive · empty ↔ full`],
        example: `The first question was easy, but the last one was <mark>difficult</mark>.` },
      { word: `Opposites with prefixes`, meaning: `Some prefixes mean "not".`,
        patterns: [`un- (unhappy, unusual)`, `dis- (dislike, disagree)`, `im- / in- (impossible, incorrect)`],
        example: `It's <mark>impossible</mark> to finish this in one hour.` },
      { word: `Similar but different`, meaning: `Some pairs look similar but are used differently.`,
        patterns: [`say something · tell someone`, `look at · see · watch TV`, `borrow (from) · lend (to) · miss the bus`],
        example: `Can you <mark>tell</mark> me the answer?` }
    ],
    tip: `<b>For "closest in meaning" questions:</b> put each option in place of the word and read the sentence again. The right answer keeps the same meaning. For opposites, check the prefix: <i>un-, dis-, im-</i> often mean "not". Careful with Spanish <i>prestar</i> (lend / borrow) and <i>perder</i> (lose / miss).`,
    examples: [
      { s: `The hotel room was <mark>huge</mark>, much bigger than our room at home.`, note: `huge = very big.` },
      { s: `Please <mark>begin</mark> the test now. You can <mark>start</mark> with any question.`, note: `begin and start are synonyms.` },
      { s: `The shop opens at nine and <mark>closes</mark> at six.`, note: `open ↔ close are antonyms.` },
      { s: `I'm sorry, but I <mark>disagree</mark> with you.`, note: `dis- + agree = not agree.` },
      { s: `My grandfather <mark>told</mark> us a story about the war.`, note: `tell + a person (us).` }
    ],
    mistakes: [
      { wrong: `She said me the answer.`, right: `She told me the answer.`, why: `<b>Tell</b> + a person. <b>Say</b> + something (She said the answer).` },
      { wrong: `I saw TV last night.`, right: `I watched TV last night.`, why: `We <b>watch</b> TV, movies and games.` },
      { wrong: `Can you borrow me your pen?`, right: `Can you lend me your pen?`, why: `<b>Lend</b> = give for a short time. <b>Borrow</b> = take for a short time.` },
      { wrong: `I lost the bus this morning.`, right: `I missed the bus this morning.`, why: `You <b>miss</b> a bus, a class or a chance. You <b>lose</b> things like keys.` },
      { wrong: `The opposite of "happy" is "inhappy".`, right: `The opposite of "happy" is "unhappy".`, why: `The prefix for happy is <b>un-</b>.` },
      { wrong: `This exercise is unpossible.`, right: `This exercise is impossible.`, why: `The prefix for possible is <b>im-</b>.` }
    ],
    guided: {
      bank: [`start`, `finish`, `huge`, `tiny`, `lend`],
      items: [
        { s: `The opposite of "begin" is ___.`, a: `finish`, why: `begin ↔ <b>finish</b>.` },
        { s: `A word that means the same as "begin" is ___.`, a: `start`, why: `begin = <b>start</b>.` },
        { s: `The elephant was ___, much bigger than I expected.`, a: `huge`, why: `Much bigger = <b>huge</b> (very big).` },
        { s: `The ant was so ___ that I almost didn't see it.`, a: `tiny`, why: `Hard to see = <b>tiny</b> (very small).` },
        { s: `Can you ___ me your eraser? I forgot mine.`, a: `lend`, why: `Give it to me for a short time: <b>lend</b>.` }
      ]
    },
    toefl: [
      { q: `The word "angry" is closest in meaning to ___.`, o: [`mad`, `sad`, `tired`, `calm`], a: 0, why: `angry = <b>mad</b>.` },
      { q: `The opposite of "ancient" is ___.`, o: [`old`, `modern`, `famous`, `broken`], a: 1, why: `ancient (very old) ↔ <b>modern</b>.` },
      { q: `The museum was so crowded that we could barely move. "Crowded" means ___.`, o: [`empty`, `quiet`, `full of people`, `dark`], a: 2, why: `We could barely move = <b>full of people</b>.` },
      { q: `Lina was delighted with her birthday present. "Delighted" means ___.`, o: [`disappointed`, `confused`, `worried`, `very happy`], a: 3, why: `delighted = <b>very happy</b>.` },
      { q: `This math problem is ___; nobody in the class can solve it.`, o: [`impossible`, `unpossible`, `inpossible`, `dispossible`], a: 0, why: `The opposite of possible is <b>impossible</b>.` }
    ],
    challenge: {
      title: `Two Very Different Brothers`,
      text: `My brothers, Andrés and Felipe, are twins, but they are completely {1}. Andrés is noisy and loves parties. Felipe, on the other hand, is {2} and prefers to read at home. Andrés gets up late, but Felipe always wakes up {3}. Andrés thinks math is boring; Felipe finds it {4}. When Andrés needs money, he asks Felipe to {5} him some. Felipe always says yes, because even though they are different, they are best friends and never {6}.`,
      blanks: [
        { o: [`similar`, `different`, `same`, `identical`], a: 1, why: `The rest of the text shows how they are not alike: <b>different</b>.` },
        { o: [`loud`, `angry`, `quiet`, `busy`], a: 2, why: `"On the other hand" = the opposite of noisy: <b>quiet</b>.` },
        { o: [`late`, `lately`, `slow`, `early`], a: 3, why: `The opposite of late: <b>early</b>.` },
        { o: [`fascinating`, `dull`, `tiring`, `terrible`], a: 0, why: `The opposite of boring: <b>fascinating</b>.` },
        { o: [`borrow`, `lend`, `steal`, `owe`], a: 1, why: `Felipe gives money for a short time: <b>lend</b>.` },
        { o: [`agree`, `laugh`, `argue`, `help`], a: 2, why: `Best friends never <b>argue</b> (fight with words).` }
      ]
    }
  },

  'collocations': {
    title: `Collocations`,
    group: `Vocabulary`,
    intro: `Collocations are words that naturally <b>go together</b>, like <i>make a mistake</i> or <i>heavy rain</i>. Other words may mean the same, but they sound wrong to English speakers. Many collocations are different from Spanish, so learn them as chunks.`,
    rules: [
      { word: `make or do?`, meaning: `<b>make</b> = create or produce. <b>do</b> = tasks and work.`,
        patterns: [`make a mistake · a decision · friends · noise · a cake`, `do homework · the dishes · exercise · your best`, `do someone a favor`],
        example: `Did you <mark>do</mark> your homework, or did you <mark>make</mark> excuses?` },
      { word: `take · have · get`, meaning: `These verbs form many everyday expressions.`,
        patterns: [`take a photo · a shower · a bus · a break`, `have breakfast · fun · a party · a good time`, `get ready · lost · better · a cold`],
        example: `Let's <mark>take</mark> a photo in front of the cathedral!` },
      { word: `Adjective + noun`, meaning: `Some adjectives go with certain nouns.`,
        patterns: [`heavy rain · heavy traffic (not strong)`, `strong wind · strong coffee`, `high price · high temperature`],
        example: `There was <mark>heavy</mark> traffic this morning.` },
      { word: `Fixed expressions`, meaning: `Learn these as complete phrases.`,
        patterns: [`pay attention · tell the truth · tell a lie`, `keep a secret · break a promise`, `catch a cold · be 13 years old`],
        example: `Please <mark>pay</mark> attention to the instructions.` }
    ],
    tip: `<b>Don't translate word by word from Spanish.</b> We <b>make</b> a decision (not <i>take</i>), we <b>take</b> a photo (not <i>make</i>), we <b>have</b> a party (not <i>make</i>), there is <b>heavy</b> rain (not <i>strong</i>), and you <b>are</b> 13 years old (not <i>have</i>).`,
    examples: [
      { s: `We need to <mark>make a decision</mark> by Friday.`, note: `make a decision (Spanish: tomar una decisión).` },
      { s: `I <mark>do my homework</mark> right after school.`, note: `do + homework.` },
      { s: `We <mark>had a great time</mark> at the party.`, note: `have a good / great time.` },
      { s: `There was <mark>heavy rain</mark> all night.`, note: `heavy rain, not strong rain.` },
      { s: `My little brother can't <mark>keep a secret</mark>.`, note: `keep a secret.` }
    ],
    mistakes: [
      { wrong: `I need to take a decision.`, right: `I need to make a decision.`, why: `In English, you <b>make</b> a decision.` },
      { wrong: `Can you make me a favor?`, right: `Can you do me a favor?`, why: `You <b>do</b> someone a favor.` },
      { wrong: `We did a lot of noise.`, right: `We made a lot of noise.`, why: `You <b>make</b> noise.` },
      { wrong: `Let's make a photo.`, right: `Let's take a photo.`, why: `You <b>take</b> a photo.` },
      { wrong: `There was strong rain yesterday.`, right: `There was heavy rain yesterday.`, why: `Rain is <b>heavy</b>, not strong.` },
      { wrong: `I have 13 years.`, right: `I am 13 years old.`, why: `For age, use <b>be</b> … years old (Spanish <i>tengo 13 años</i>).` }
    ],
    guided: {
      bank: [`make`, `do`, `take`, `have`, `pay`],
      items: [
        { s: `Don't worry if you ___ a mistake. Everyone does!`, a: `make`, why: `<b>Make</b> a mistake.` },
        { s: `I always ___ the dishes after dinner.`, a: `do`, why: `<b>Do</b> the dishes (a task).` },
        { s: `Can you ___ a photo of us?`, a: `take`, why: `<b>Take</b> a photo.` },
        { s: `Let's ___ a party for Sara's birthday!`, a: `have`, why: `<b>Have</b> a party (not <i>make</i>).` },
        { s: `Please ___ attention. This is important.`, a: `pay`, why: `<b>Pay</b> attention.` }
      ]
    },
    toefl: [
      { q: `You should ___ your best on the test tomorrow.`, o: [`make`, `do`, `take`, `have`], a: 1, why: `<b>Do</b> your best.` },
      { q: `The match was canceled because of ___ rain.`, o: [`strong`, `heavy`, `big`, `large`], a: 1, why: `<b>Heavy</b> rain.` },
      { q: `It's important to always ___ the truth.`, o: [`say`, `speak`, `tell`, `talk`], a: 2, why: `<b>Tell</b> the truth.` },
      { q: `My grandmother ___ a cold, so she is staying in bed.`, o: [`took`, `did`, `made`, `caught`], a: 3, why: `<b>Catch</b> a cold → caught a cold.` },
      { q: `We ___ a lot of fun at the water park.`, o: [`had`, `made`, `did`, `took`], a: 0, why: `<b>Have</b> fun → had fun.` }
    ],
    challenge: {
      title: `Our Class Trip`,
      text: `On Friday, our class went to the water park. Before we left, our teacher asked us to {1} attention to the safety rules. Then we {2} the bus. The trip was long because there was {3} traffic on the highway. At the park, we {4} a lot of photos and {5} friends with students from another school. It was the best day of the year, and we all {6} a great time.`,
      blanks: [
        { o: [`make`, `pay`, `do`, `take`], a: 1, why: `<b>Pay</b> attention.` },
        { o: [`made`, `did`, `took`, `had`], a: 2, why: `<b>Take</b> the bus → took.` },
        { o: [`strong`, `big`, `high`, `heavy`], a: 3, why: `<b>Heavy</b> traffic.` },
        { o: [`took`, `made`, `did`, `had`], a: 0, why: `<b>Take</b> photos → took.` },
        { o: [`did`, `made`, `took`, `had`], a: 1, why: `<b>Make</b> friends → made.` },
        { o: [`made`, `did`, `had`, `took`], a: 2, why: `<b>Have</b> a great time → had.` }
      ]
    }
  },

  'phrasal-verbs': {
    title: `Phrasal verbs`,
    group: `Vocabulary`,
    intro: `A phrasal verb is a verb + a small word like <i>up, out, off, on, after</i>. Together they have a <b>new meaning</b>: <i>give up</i> means "stop trying", which has nothing to do with giving.`,
    rules: [
      { word: `New meanings`, meaning: `The meaning is often different from the verb alone.`,
        patterns: [`give up = stop trying`, `look after = take care of`, `find out = discover · put off = postpone`],
        example: `Don't <mark>give up</mark>! You can do it.` },
      { word: `Everyday phrasal verbs`, meaning: `These are used all the time at home and at school.`,
        patterns: [`turn on / off · turn up / down (volume)`, `put on / take off (clothes)`, `wake up · get up · pick up`],
        example: `Please <mark>turn off</mark> the lights when you leave.` },
      { word: `Where the object goes`, meaning: `With many phrasal verbs, a <b>pronoun</b> (it, them, her) must go in the middle.`,
        patterns: [`turn off the TV · turn the TV off`, `turn it off (not turn off it)`, `pick them up · put it on`],
        example: `Your jacket is on the floor. <mark>Pick it up</mark>, please.` },
      { word: `Three-word phrasal verbs`, meaning: `Some have two small words. Learn them as one unit.`,
        patterns: [`run out of = have none left`, `get along with = have a good relationship with`, `come up with = think of · look forward to = be excited about`],
        example: `We <mark>ran out of</mark> milk, so I went to the store.` }
    ],
    tip: `<b>Read the whole sentence</b> and choose the meaning that fits the situation: <i>look for</i> (search), <i>look after</i> (take care of), <i>look into</i> (investigate) and <i>look forward to</i> (be excited about) are all very different. With pronouns, put the pronoun in the middle: <i>turn it off</i>.`,
    examples: [
      { s: `My grandmother <mark>looks after</mark> my little cousin on weekends.`, note: `look after = take care of.` },
      { s: `I just <mark>found out</mark> that the test was moved to Monday.`, note: `find out = discover.` },
      { s: `<mark>Put on</mark> your coat. It's cold outside.`, note: `put on = start wearing.` },
      { s: `We <mark>ran out of</mark> paper, so we couldn't print the project.`, note: `run out of = have none left.` },
      { s: `I <mark>get along with</mark> all my classmates.`, note: `get along with = have a good relationship.` }
    ],
    mistakes: [
      { wrong: `Turn off it, please.`, right: `Turn it off, please.`, why: `A pronoun goes in the <b>middle</b>: turn it off.` },
      { wrong: `I'm looking after my keys. Have you seen them?`, right: `I'm looking for my keys. Have you seen them?`, why: `<b>Look for</b> = search. <b>Look after</b> = take care of.` },
      { wrong: `She gave up to eat sugar.`, right: `She gave up eating sugar.`, why: `<b>Give up</b> + -ing.` },
      { wrong: `Please put off your shoes.`, right: `Please take off your shoes.`, why: `<b>Take off</b> = remove clothes. <b>Put off</b> = postpone.` },
      { wrong: `We ran out milk.`, right: `We ran out of milk.`, why: `The full phrasal verb is <b>run out of</b>.` },
      { wrong: `Can you pick me at 5:00?`, right: `Can you pick me up at 5:00?`, why: `The phrasal verb is <b>pick up</b>, with the pronoun in the middle.` }
    ],
    guided: {
      bank: [`look after`, `look for`, `give up`, `find out`, `run out of`],
      items: [
        { s: `Can you ___ my dog while I'm on vacation?`, a: `look after`, why: `Take care of the dog: <b>look after</b>.` },
        { s: `Can you help me ___ my phone? I can't find it.`, a: `look for`, why: `Search for it: <b>look for</b>.` },
        { s: `The puzzle was very hard, but I didn't ___.`, a: `give up`, why: `I didn't stop trying: <b>give up</b>.` },
        { s: `I want to ___ what time the museum opens.`, a: `find out`, why: `Discover the information: <b>find out</b>.` },
        { s: `We always ___ popcorn before the movie ends!`, a: `run out of`, why: `We have none left: <b>run out of</b>.` }
      ]
    },
    toefl: [
      { q: `Please ___ your shoes before you come inside.`, o: [`take off`, `put on`, `turn off`, `give up`], a: 0, why: `Remove your shoes: <b>take off</b>.` },
      { q: `I ___ my older brother very well; we never fight.`, o: [`get up`, `get along with`, `get out`, `get over`], a: 1, why: `Have a good relationship: <b>get along with</b>.` },
      { q: `The meeting was ___ until next week because the teacher was sick.`, o: [`turned off`, `put on`, `put off`, `taken off`], a: 2, why: `Postponed: <b>put off</b>.` },
      { q: `Our team ___ a great idea for the science fair.`, o: [`ran out of`, `gave up`, `looked after`, `came up with`], a: 3, why: `Thought of an idea: <b>came up with</b>.` },
      { q: `Could you ___ the music? I can't hear the teacher.`, o: [`turn down`, `turn up`, `turn on`, `turn into`], a: 0, why: `Make it quieter: <b>turn down</b>. (Turn up = louder.)` }
    ],
    challenge: {
      title: `Saving the Class Garden`,
      text: `Our class garden was in trouble. The plants were dying, and we didn't know why. Our teacher asked us to {1} the problem. After some research, we {2} that the plants weren't getting enough water. So we {3} a plan: each student would {4} the garden for one week. At first, some students wanted to {5}, but we kept going. Now the garden is beautiful, and we are {6} planting new flowers next month.`,
      blanks: [
        { o: [`look after`, `look into`, `look like`, `look up to`], a: 1, why: `Investigate the problem: <b>look into</b>.` },
        { o: [`gave up`, `turned down`, `found out`, `ran out of`], a: 2, why: `We discovered the reason: <b>found out</b>.` },
        { o: [`ran out of`, `put off`, `took off`, `came up with`], a: 3, why: `We thought of a plan: <b>came up with</b>.` },
        { o: [`look after`, `look for`, `look into`, `look out`], a: 0, why: `Take care of the garden: <b>look after</b>.` },
        { o: [`find out`, `give up`, `turn on`, `put on`], a: 1, why: `Stop trying: <b>give up</b>.` },
        { o: [`looking after`, `looking for`, `looking forward to`, `looking into`], a: 2, why: `Excited about the future: <b>looking forward to</b>.` }
      ]
    }
  },

  'word-families': {
    title: `Word families`,
    group: `Vocabulary`,
    intro: `A word family is a group of words that share the same <b>root</b>: <i>create, creation, creative, creatively, creator</i>. If you know one member, you can understand the others. <b>Prefixes</b> at the start of a word also change its meaning.`,
    rules: [
      { word: `One root, many words`, meaning: `The same root can become a verb, a noun, an adjective and an adverb.`,
        patterns: [`create · creation · creative · creatively`, `decide · decision · decisive`, `succeed · success · successful · successfully`],
        example: `The <mark>creator</mark> of this game is very <mark>creative</mark>.` },
      { word: `Prefixes change meaning`, meaning: `A prefix at the start adds a new meaning.`,
        patterns: [`re- = again (rewrite, rebuild)`, `mis- = wrongly (misunderstand, misspell)`, `un- / dis- / im- = not · pre- = before`],
        example: `I had to <mark>rewrite</mark> my essay.` },
      { word: `Words for people`, meaning: `Some endings make words for people and their jobs.`,
        patterns: [`-er / -or (teacher, actor, inventor)`, `-ist (scientist, artist, journalist)`, `-ian (musician, librarian)`],
        example: `My aunt is a <mark>musician</mark> in an orchestra.` },
      { word: `Spelling changes`, meaning: `Sometimes the root changes when the word changes.`,
        patterns: [`decide → decision · explain → explanation`, `long → length · strong → strength · wide → width`, `true → truth · deep → depth`],
        example: `Can you give me an <mark>explanation</mark>?` }
    ],
    tip: `<b>Learn new words with their families:</b> <i>decide, decision, decisive</i>. In the test, all four options are often from the same family, so the question is really "which form fits here?" Use prefixes to guess meaning: <b>re-</b> = again, <b>mis-</b> = wrongly, <b>un- / dis- / im-</b> = not.`,
    examples: [
      { s: `Scientists <mark>invented</mark> a new medicine. The <mark>invention</mark> will help millions.`, note: `invent (verb) → invention (noun).` },
      { s: `I <mark>misunderstood</mark> the question, so my answer was wrong.`, note: `mis- = wrongly.` },
      { s: `The <mark>length</mark> of the river is about 1,500 kilometers.`, note: `long → length (spelling change).` },
      { s: `My cousin wants to be a <mark>journalist</mark>.`, note: `-ist = a person (journal → journalist).` },
      { s: `Please <mark>reread</mark> the instructions carefully.`, note: `re- = again.` }
    ],
    mistakes: [
      { wrong: `I need to make a decide.`, right: `I need to make a decision.`, why: `After <i>a</i>, use the noun: <b>decision</b>.` },
      { wrong: `He is a very good musicist.`, right: `He is a very good musician.`, why: `The person word for music is <b>musician</b>.` },
      { wrong: `The long of the table is two meters.`, right: `The length of the table is two meters.`, why: `The noun of <i>long</i> is <b>length</b>.` },
      { wrong: `Can you give me an explain?`, right: `Can you give me an explanation?`, why: `The noun of <i>explain</i> is <b>explanation</b>.` },
      { wrong: `She is very creativity.`, right: `She is very creative.`, why: `After <i>is very</i>, use the adjective: <b>creative</b>.` },
      { wrong: `I unagree with you.`, right: `I disagree with you.`, why: `The opposite prefix for agree is <b>dis-</b>.` }
    ],
    guided: {
      bank: [`explain`, `explanation`, `misunderstood`, `rewrite`, `strength`],
      items: [
        { s: `Can you ___ the rules of the game to me?`, a: `explain`, why: `After <i>can you</i>, we need the verb: <b>explain</b>.` },
        { s: `The teacher's ___ was very clear.`, a: `explanation`, why: `After <i>the teacher's</i>, we need the noun: <b>explanation</b>.` },
        { s: `I ___ the instructions, so I did the wrong exercise.`, a: `misunderstood`, why: `<b>Mis-</b> = wrongly: I understood them wrongly.` },
        { s: `Your essay has many mistakes. Please ___ it.`, a: `rewrite`, why: `<b>Re-</b> = again: write it again.` },
        { s: `Lifting weights improves your ___.`, a: `strength`, why: `The noun of <i>strong</i> is <b>strength</b>.` }
      ]
    },
    toefl: [
      { q: `Thomas Edison is famous for his many ___.`, o: [`invents`, `inventions`, `inventive`, `inventor`], a: 1, why: `After <i>his many</i>, we need a plural noun for things: <b>inventions</b>.` },
      { q: `My older sister is studying to become a ___.`, o: [`science`, `scientific`, `scientist`, `scientifically`], a: 2, why: `A person: <b>scientist</b>.` },
      { q: `The story was so ___ that nobody believed it.`, o: [`believe`, `belief`, `believable`, `unbelievable`], a: 3, why: `Nobody believed it = not believable: <b>unbelievable</b>.` },
      { q: `What is the ___ of this room? We need to buy a carpet.`, o: [`width`, `wide`, `widely`, `widen`], a: 0, why: `After <b>the</b>, we need the noun of wide: <b>width</b>.` },
      { q: `I'm sorry I'm late. I ___ the time of the meeting.`, o: [`reread`, `misread`, `read`, `unread`], a: 1, why: `I read it wrongly, so I was late: <b>misread</b>.` }
    ],
    challenge: {
      title: `A Young Inventor`,
      text: `Valentina is only fourteen, but she is already an {1}. Last year, she {2} a small machine that cleans plastic from rivers. Her {3} won first prize in a national science contest. The judges said her idea was very {4}. At first, many people thought it was {5} for a teenager to build such a machine. But Valentina proved them wrong with her hard work and {6}.`,
      blanks: [
        { o: [`invent`, `invention`, `inventor`, `inventive`], a: 2, why: `A person who invents: <b>inventor</b>.` },
        { o: [`design`, `designer`, `designing`, `designed`], a: 3, why: `A past action (last year): verb <b>designed</b>.` },
        { o: [`creation`, `create`, `creative`, `creator`], a: 0, why: `The thing she made (after <i>her</i>): noun <b>creation</b>.` },
        { o: [`origin`, `original`, `originally`, `originality`], a: 1, why: `After <i>was very</i>: adjective <b>original</b>.` },
        { o: [`possible`, `possibility`, `impossible`, `possibly`], a: 2, why: `People doubted her ("proved them wrong"): <b>impossible</b>.` },
        { o: [`determined`, `determine`, `determinedly`, `determination`], a: 3, why: `After <i>her hard work and</i>, we need a noun: <b>determination</b>.` }
      ]
    }
  },

  'context-clues': {
    title: `Context clues`,
    group: `Vocabulary`,
    mistakesIntro: `Each pair shows a wrong guess students often make about a new word, and the correct meaning.`,
    intro: `You don't need to know every word to understand a text. The words and sentences <b>around</b> a new word often give you clues to its meaning. This skill helps in every part of the test, especially vocabulary questions in Reading.`,
    rules: [
      { word: `Definition clues`, meaning: `The sentence explains the word for you.`,
        patterns: [`… , which means …`, `… , or … (A herbivore, or plant eater, …)`, `commas or dashes around an explanation`],
        example: `A <mark>herbivore</mark>, an animal that eats only plants, never hunts.` },
      { word: `Example clues`, meaning: `Examples show what the word includes.`,
        patterns: [`such as …`, `for example … · like …`, `including …`],
        example: `Citrus fruits, <mark>such as</mark> oranges and lemons, have a lot of vitamin C.` },
      { word: `Contrast clues`, meaning: `An opposite helps you guess the meaning.`,
        patterns: [`but … · however …`, `unlike … · although …`, `instead of … · on the other hand …`],
        example: `Unlike his <mark>timid</mark> sister, Pablo talks to everyone.` },
      { word: `Situation clues`, meaning: `The whole situation tells you what the word must mean.`,
        patterns: [`What happened before?`, `What happened after?`, `What would make sense here?`],
        example: `After running for two hours, the runners were <mark>exhausted</mark>.` }
    ],
    tip: `<b>When you meet a new word, don't stop.</b> Look for a definition (<i>or, which means</i>), examples (<i>such as, like</i>), an opposite (<i>but, unlike, however</i>) or the situation. Then put your guess in place of the word and check that the sentence still makes sense.`,
    examples: [
      { s: `The <mark>tortoise</mark>, a land turtle that can live for over 100 years, moves very slowly.`, note: `definition clue between commas.` },
      { s: `Some <mark>reptiles</mark>, such as snakes and lizards, live in the desert.`, note: `example clue: such as.` },
      { s: `My brother is very <mark>generous</mark>, but my cousin never shares anything.`, note: `contrast clue: generous = likes to share.` },
      { s: `The room was <mark>immaculate</mark>; there wasn't a single bit of dust anywhere.`, note: `the second part explains it: completely clean.` },
      { s: `After the long hike, we were so <mark>famished</mark> that we ate three plates of rice.`, note: `situation clue: famished = very hungry.` }
    ],
    mistakes: [
      { wrong: `"Unlike her talkative brother, Ana is reserved." Reserved means talkative.`, right: `Reserved means quiet; she doesn't talk much.`, why: `<b>Unlike</b> shows a contrast, so the meaning is the opposite of talkative.` },
      { wrong: `"The soup was scalding, so I waited before eating it." Scalding means cold.`, right: `Scalding means very hot.`, why: `You wait before eating soup when it is too hot.` },
      { wrong: `"Mammals, such as whales, dogs and humans, feed milk to their babies." Mammals are sea animals.`, right: `Mammals are animals that feed milk to their babies.`, why: `Look at <b>all</b> the examples, not just the first one.` },
      { wrong: `"The path was treacherous, with loose rocks and steep drops." Treacherous means beautiful.`, right: `Treacherous means dangerous.`, why: `Loose rocks and steep drops are dangers.` },
      { wrong: `"She was elated, or extremely happy, when she won." Elated means surprised.`, right: `Elated means extremely happy.`, why: `<b>Or</b> after a comma often gives the definition.` },
      { wrong: `"He was reluctant to jump into the cold water, so he stood there for ten minutes." Reluctant means excited.`, right: `Reluctant means not wanting to do something.`, why: `He waited a long time, which shows he did not want to jump.` }
    ],
    guided: {
      bank: [`tired`, `shy`, `hungry`, `dangerous`, `hurt`],
      items: [
        { s: `After the marathon, the runners were exhausted and lay down on the grass. "Exhausted" means very ___.`, a: `tired`, why: `They lay down after a marathon: very <b>tired</b>.` },
        { s: `Unlike her outgoing sister, Clara is timid and rarely speaks in class. "Timid" means ___.`, a: `shy`, why: `Unlike = the opposite of outgoing: <b>shy</b>.` },
        { s: `We hadn't eaten since breakfast, so by dinner we were starving. "Starving" means very ___.`, a: `hungry`, why: `No food all day: very <b>hungry</b>.` },
        { s: `The road was hazardous because of the ice, so the police closed it. "Hazardous" means ___.`, a: `dangerous`, why: `The police closed it because of ice: <b>dangerous</b>.` },
        { s: `The newborn kitten was fragile, so we held it very gently. "Fragile" means easily ___.`, a: `hurt`, why: `We held it gently: it can be easily <b>hurt</b>.` }
      ]
    },
    toefl: [
      { q: `Hummingbirds are tiny; the smallest one weighs less than a coin. "Tiny" means ___.`, o: [`very small`, `very fast`, `colorful`, `loud`], a: 0, why: `Lighter than a coin: <b>very small</b>.` },
      { q: `The museum's ancient pottery, some of it 3,000 years old, is impressive. "Ancient" means ___.`, o: [`modern`, `very old`, `broken`, `expensive`], a: 1, why: `3,000 years old: <b>very old</b>.` },
      { q: `Although the instructions seemed complex, the game was actually very easy to learn. "Complex" means ___.`, o: [`simple`, `short`, `complicated`, `boring`], a: 2, why: `<b>Although</b> … easy shows the opposite: <b>complicated</b>.` },
      { q: `In "Carbohydrates, such as rice, bread and potatoes, give us energy," an example of a carbohydrate is ___.`, o: [`fish`, `eggs`, `cheese`, `bread`], a: 3, why: `The examples after <b>such as</b> include <b>bread</b>.` },
      { q: `Mateo was furious when his brother broke his new tablet; he shouted for ten minutes. "Furious" means ___.`, o: [`very angry`, `very sad`, `a little tired`, `surprised`], a: 0, why: `He shouted for ten minutes: <b>very angry</b>.` }
    ],
    challenge: {
      title: `The Mysterious Island`,
      text: `Last summer, my uncle took me by boat to a small island near Cartagena. The island was {1}; nobody had lived there for many years. The water around it was so {2} that we could see fish swimming near the bottom. We walked along a {3} path; it went up and down the hills and turned left and right many times. In the middle of the island, we found the {4} of an old house. Only a few walls were still standing. My uncle, who usually talks a lot, was {5}; he didn't say a word for a long time. When the sun began to set, we returned to the boat, tired but {6}, because it had been an amazing day.`,
      blanks: [
        { o: [`crowded`, `deserted`, `popular`, `busy`], a: 1, why: `Nobody had lived there: <b>deserted</b> (empty of people).` },
        { o: [`muddy`, `dirty`, `clear`, `cloudy`], a: 2, why: `We could see the fish at the bottom: <b>clear</b>.` },
        { o: [`straight`, `wide`, `flat`, `winding`], a: 3, why: `It turned left and right many times: <b>winding</b>.` },
        { o: [`ruins`, `roof`, `garden`, `owner`], a: 0, why: `Only a few walls were standing: the <b>ruins</b>.` },
        { o: [`noisy`, `silent`, `angry`, `hungry`], a: 1, why: `He didn't say a word: <b>silent</b>.` },
        { o: [`disappointed`, `bored`, `delighted`, `frightened`], a: 2, why: `It had been an amazing day: <b>delighted</b> (very happy).` }
      ]
    }
  }
};
