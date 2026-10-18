// Additions to reading-data.js: two longer passages, extra question types, and timed-test membership
(function () {
  const R = window.PRACTICE_READING;
  const byId = id => R.find(s => s.id === id);

  byId("R1").questions.push(
    { type: "Title", q: "Which would be the best title for the passage?", o: ["How to Fall Asleep Faster", "Why Sleep Matters", "The Dangers of Phones", "Growing Taller at Night"], a: 1, why: "The passage explains the important jobs sleep does for the body and the brain." },
    { type: "Not/Except", q: "All of the following are mentioned as jobs of sleep EXCEPT", o: ["helping muscles and bones heal", "strengthening the immune system", "sorting information in the brain", "making people feel hungry"], a: 3, why: "Hunger is never mentioned." }
  );
  byId("R2").questions.push(
    { type: "Reference", q: "In paragraph 2, the word \"them\" refers to", o: ["the streets", "people going home from work", "Nadia's classmates", "her bags"], a: 1, why: "She had to push past the people going home from work." }
  );
  byId("R4").questions.push(
    { type: "Not/Except", q: "All of the following are true of corals EXCEPT that they", o: ["are animals", "build reefs", "can make food from sunlight without any help", "live together with algae"], a: 2, why: "The algae use sunlight to make food and share it with the coral; corals do not do this alone." }
  );
  byId("R5").questions.push(
    { type: "Title", q: "Which would be the best title for this essay?", o: ["Teenagers and Their Phones", "The Case for a Later School Start", "Why Sports Are Important", "How Schools Raise Attendance"], a: 1, why: "The essay argues that schools should start later." }
  );

  R.push(
    {
      id: "R7", title: "The Story of Chocolate", kind: "Informational article", level: "B2",
      text: [
        "Chocolate is one of the world's favorite treats, but few people who enjoy a bar of it know where it comes from. The story begins more than three thousand years ago in Central and South America, where people first discovered that the seeds of the cacao tree could be turned into food.",
        "For most of history, chocolate was not eaten at all. The ancient Maya and, later, the Aztecs ground the seeds into a paste and mixed it with water, chili peppers, and spices to make a bitter drink. It was so valuable that the Aztecs sometimes used cacao seeds as money. Only wealthy people and warriors were allowed to drink it.",
        "Chocolate reached Europe in the 1500s, when Spanish explorers brought it home. The Spanish found the drink too bitter, so they added sugar and honey. Soon chocolate became fashionable among the nobility of Spain, France, and England, but it remained expensive because it took so much work to make.",
        "Everything changed in the 1800s. Inventors developed machines that could press the seeds, separate the fat, and mix the paste with milk and sugar. In 1847, a British company produced the first solid chocolate bar. A few decades later, a Swiss chocolate maker created milk chocolate, which was smoother and sweeter than anything before it. Chocolate was no longer a luxury for the rich; ordinary people could enjoy it too.",
        "Today, most of the world's cacao is grown in West Africa, and millions of farmers depend on it for their income. Sadly, many of these farmers earn very little, which is why more consumers are choosing chocolate made with fair-trade practices."
      ],
      questions: [
        { type: "Title", q: "Which is the best title for the passage?", o: ["The Journey of a Favorite Treat", "How to Grow Cacao Trees", "Why Chocolate Is Bad for You", "The Aztec Empire"], a: 0, why: "The passage follows chocolate from ancient times to today." },
        { type: "Detail", q: "How did the Maya and Aztecs prepare chocolate?", o: ["They baked it into bars", "They ground the seeds and mixed them with water, chili peppers, and spices", "They ate the seeds raw", "They mixed it with milk and sugar"], a: 1, why: "Paragraph 2 describes a bitter drink made from ground seeds, water, chili peppers, and spices." },
        { type: "Vocabulary", q: "The word \"valuable\" in paragraph 2 is closest in meaning to", o: ["worth a lot", "dangerous", "common", "bitter"], a: 0, why: "The Aztecs even used the seeds as money." },
        { type: "Detail", q: "Why did the Spanish add sugar and honey to chocolate?", o: ["It was too expensive", "They found it too bitter", "They wanted to sell it as medicine", "It was too thick"], a: 1, why: "The Spanish found the drink too bitter." },
        { type: "Reference", q: "In paragraph 3, the word \"it\" in \"it remained expensive\" refers to", o: ["Europe", "the nobility", "chocolate", "honey"], a: 2, why: "The sentence is about chocolate." },
        { type: "Not/Except", q: "All of the following are mentioned as changes in the 1800s EXCEPT", o: ["machines that could press the seeds", "the first solid chocolate bar", "the creation of milk chocolate", "the arrival of chocolate in Europe"], a: 3, why: "Chocolate reached Europe in the 1500s." },
        { type: "Inference", q: "What can be inferred about chocolate before the 1800s?", o: ["Everyone could buy it", "Ordinary people probably could not afford it", "It was always sweet", "It was made only in Africa"], a: 1, why: "It was expensive and mostly for wealthy people." },
        { type: "Purpose", q: "Why does the author mention fair-trade chocolate in the last paragraph?", o: ["To show that chocolate is unhealthy", "To suggest that consumers can help farmers who earn little", "To explain how milk chocolate is made", "To prove that cacao grows only in Africa"], a: 1, why: "Many farmers earn very little, so more consumers choose fair-trade chocolate." }
      ]
    },
    {
      id: "R8", title: "The Piano Lesson", kind: "Narrative story", level: "B2",
      text: [
        "Every Thursday at four o'clock, Eli walked up the narrow stairs to Mrs. Alvarez's apartment for his piano lesson. He had been taking lessons for two years, but he still felt a knot in his stomach each time he sat down at the old brown piano. Today the knot was bigger than usual. The school talent show was only a week away, and he had promised his grandmother that he would play.",
        "\"Let's hear the piece,\" said Mrs. Alvarez gently. Eli took a deep breath and began. His fingers stumbled in the third line, and he stopped. \"Sorry,\" he muttered, staring at his hands. \"I always make a mistake there.\"",
        "Mrs. Alvarez did not frown. Instead, she smiled and sat down beside him. \"Do you know what my teacher told me when I was your age?\" she asked. \"She said that a mistake is only a mistake if you stop. If you keep going, the audience thinks it's part of the music.\" Eli laughed in spite of himself.",
        "\"Now, play it again,\" she said, \"but this time, don't stop, whatever happens.\" Eli placed his hands on the keys. He still stumbled in the third line, but this time he kept going, and when he reached the final note, he realized that the knot in his stomach had disappeared. Mrs. Alvarez clapped. \"That,\" she said, \"is how a musician plays.\"",
        "On the way home, Eli hummed the melody. For the first time, he was actually looking forward to the talent show."
      ],
      questions: [
        { type: "Main idea", q: "What is the story mainly about?", o: ["A boy learns not to stop when he makes a mistake", "A boy decides to quit piano", "A teacher plans a talent show", "A grandmother visits a school"], a: 0, why: "Eli learns from his teacher to keep playing after a mistake." },
        { type: "Detail", q: "Why did Eli feel more nervous than usual today?", o: ["He had not practiced", "The talent show was a week away", "Mrs. Alvarez was angry", "The piano was broken"], a: 1, why: "The talent show was only a week away, and he had promised his grandmother." },
        { type: "Vocabulary", q: "The word \"stumbled\" in paragraph 2 is closest in meaning to", o: ["made a mistake while moving", "fell down", "rested", "played loudly"], a: 0, why: "His fingers made a mistake in the third line." },
        { type: "Inference", q: "How does Mrs. Alvarez feel about Eli's mistake?", o: ["Disappointed", "Understanding and supportive", "Angry", "Bored"], a: 1, why: "She did not frown; she smiled and sat beside him." },
        { type: "Purpose", q: "Why does Mrs. Alvarez tell the story about her teacher?", o: ["To show she was a better student", "To help Eli think differently about mistakes", "To change the subject", "To tell Eli to quit"], a: 1, why: "The teacher's advice changes how Eli sees mistakes." },
        { type: "Reference", q: "In the last sentence of paragraph 4, \"That\" refers to", o: ["the piano", "Eli's playing without stopping", "the talent show", "the third line"], a: 1, why: "She is praising how Eli kept going." },
        { type: "Detail", q: "How does Eli feel at the end of the story?", o: ["Still very nervous", "Hopeful and excited", "Angry at himself", "Tired"], a: 1, why: "He hums on the way home and looks forward to the talent show." }
      ]
    }
  );

  // Timed reading test: six texts, mixed types
  ["R1", "R3", "R4", "R5", "R7", "R8"].forEach(id => { byId(id).test = true; });
})();
