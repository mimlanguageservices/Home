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
  }
};
