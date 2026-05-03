// CWK. Archetypes Assessment data + scoring.
// Source: BIZ_05.1_Archetypes_Assessment_PRD_v3 + Archetypes.pdf + Questions and Scoring.pdf.

export type Letter = 'A' | 'B' | 'C' | 'D' | 'E';
export type ArchetypeKey = 'explorer' | 'committer' | 'builder' | 'operator' | 'sovereign';
export type Pillar = 'soul' | 'mind' | 'body' | 'pocket' | 'revenue';

export interface QuestionOption {
  letter: Letter;
  text: string;
}

export interface Question {
  id: string;
  pillar: Pillar;
  pillarLabel: string;
  prompt: string;
  options: QuestionOption[];
  scored: boolean; // false for Q5 revenue band
}

export interface Archetype {
  key: ArchetypeKey;
  letter: Letter;
  level: number;
  name: string;
  eyebrow: string;
  tagline: string;
  feel: string;          // What this stage feels like
  happening: string;     // What is actually happening
  working: string;       // What is working
  mindMine: string;      // What is costing you (red block)
  oneMove: string;       // One-week action
  environment: string;   // Ideal Next Environment
  routing: 'waitlist' | 'powerups';
  primaryCta: { label: string; href: string };
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    pillar: 'soul',
    pillarLabel: 'Soul',
    prompt: 'When you think about what you are building, which of these is most honest right now?',
    scored: true,
    options: [
      { letter: 'A', text: 'I am still figuring out what I want to build. Nothing is locked in and I am not sure which direction to go.' },
      { letter: 'B', text: 'I have a direction. I know what I want to do. I just have not proven it works yet.' },
      { letter: 'C', text: 'I have something working but it is all over the place. Some months are great. Some are terrifying.' },
      { letter: 'D', text: 'I know exactly what I am building. Revenue is consistent. The problem now is how we run it internally.' },
      { letter: 'E', text: 'The business runs. My job now is deciding what comes next.' },
    ],
  },
  {
    id: 'q2',
    pillar: 'mind',
    pillarLabel: 'Mind',
    prompt: 'When something goes wrong in your business, what actually happens?',
    scored: true,
    options: [
      { letter: 'A', text: 'I get overwhelmed and do not know where to start.' },
      { letter: 'B', text: 'I have a plan but I second-guess it constantly.' },
      { letter: 'C', text: 'I react fast but the fix rarely sticks. The same problem comes back.' },
      { letter: 'D', text: 'I solve it but it takes me being involved in everything to make that happen.' },
      { letter: 'E', text: 'My team handles most of it. I step in only when it is truly strategic.' },
    ],
  },
  {
    id: 'q3',
    pillar: 'body',
    pillarLabel: 'Body',
    prompt: 'How is your physical machine performing right now?',
    scored: true,
    options: [
      { letter: 'A', text: 'I am running on no sleep, no routine, and pure will. It is not sustainable.' },
      { letter: 'B', text: 'I have good intentions but I am inconsistent. Some weeks are good. Most are not.' },
      { letter: 'C', text: 'I function but I can feel the cost. There is a low-grade exhaustion that does not go away.' },
      { letter: 'D', text: 'I am managing it. Not perfect but stable enough that it is not the main problem.' },
      { letter: 'E', text: 'My body is an asset. I train, sleep, and eat with intention and I protect it.' },
    ],
  },
  {
    id: 'q4',
    pillar: 'pocket',
    pillarLabel: 'Pocket',
    prompt: 'Which of these describes your revenue right now?',
    scored: true,
    options: [
      { letter: 'A', text: 'I have not made real money from this yet. Nothing has been proven.' },
      { letter: 'B', text: 'I have made some money. A client here and there. But nothing is repeatable.' },
      { letter: 'C', text: 'Money comes in but I cannot predict it. Big month, dead month. No pattern.' },
      { letter: 'D', text: 'Revenue is consistent. I know roughly what is coming in. The problem is not the money, it is everything else.' },
      { letter: 'E', text: 'The business generates revenue whether I show up or not. I am past survival.' },
    ],
  },
  {
    id: 'q5',
    pillar: 'revenue',
    pillarLabel: 'Revenue band',
    prompt: 'Last question. What did your business actually bring in over the last 12 months?',
    scored: false,
    options: [
      { letter: 'A', text: 'Under $10K' },
      { letter: 'B', text: '$10K to $50K' },
      { letter: 'C', text: '$50K to $150K' },
      { letter: 'D', text: '$150K to $500K' },
      { letter: 'E', text: '$500K and above' },
    ],
  },
];

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  explorer: {
    key: 'explorer',
    letter: 'A',
    level: 1,
    name: 'Explorer',
    eyebrow: 'Stage 01 · Pre-proof',
    tagline: 'Total beginner. No idea what is happening yet. That is okay.',
    feel: 'Wide open and slightly terrifying. You have something pulling at you but nothing proven yet. Some days feel like possibility. Other days feel like everyone else figured out something you have not.',
    happening: 'You are not behind. You are at the beginning. The business does not exist in any real form yet and that is not a problem. It means you have not wasted time going in the wrong direction. The only danger right now is mistaking preparation for progress.',
    working: 'Your curiosity. Your openness. The fact that you have not committed to the wrong thing yet. That is an asset, not a liability.',
    mindMine: 'Getting ready to get ready. Courses, branding, research, more planning. None of that is the work. The work is one real conversation with one real human about one real thing you can offer them.',
    oneMove: 'Pick one thing. Pick one person. Have one real conversation before the week is over. That is the entire job right now.',
    environment: 'CWK. Sandbox. No pressure. No performance expectations. Just the space to figure out what direction is actually yours.',
    routing: 'waitlist',
    primaryCta: { label: 'Join the Waitlist →', href: '/#waitlist' },
  },
  committer: {
    key: 'committer',
    letter: 'B',
    level: 2,
    name: 'Committer',
    eyebrow: 'Stage 02 · Conviction without proof',
    tagline: 'Has a direction. Trying to prove it is real.',
    feel: 'Motivated but impatient. You are doing the work. The evidence is just slow to arrive. You know what you want to build. You just cannot tell yet if the market agrees.',
    happening: 'You are in the gap between conviction and proof. That gap is uncomfortable because nothing has been confirmed by the market yet. You second-guess the offer, the positioning, the price because no one has said yes in a way that makes it feel real.',
    working: 'You have a direction. That is more than most people have. You are past exploring and into committing. The clarity is there. What is missing is the evidence.',
    mindMine: 'Preparation replacing proof. The brand looks good. The offer is written. The website is almost ready. But you have not had the conversation that tells you if any of it actually lands. Talking to real humans is the only thing that closes this gap.',
    oneMove: 'Pick one offer. Pick one person. Have one real conversation before the week ends. A real conversation where you say what you do and they tell you whether they need it.',
    environment: 'CWK. Sandbox with a target. By the end you know whether the thing works or needs to change.',
    routing: 'powerups',
    primaryCta: { label: 'Book a Power Up →', href: '/power-ups' },
  },
  builder: {
    key: 'builder',
    letter: 'C',
    level: 3,
    name: 'Builder',
    eyebrow: 'Stage 03 · Proof without structure',
    tagline: 'Revenue exists. But it swings all over the place. That is the signal.',
    feel: 'Busy and behind at the same time. You are doing a lot and some of it is working but you cannot tell which parts. There is a low-grade exhaustion underneath everything that you have mostly stopped mentioning to people.',
    happening: 'You have proof. Clients have paid you. The thing is real. But nothing is stable because you have not built a system that makes results happen reliably. The volatility is not a talent problem. It is a structure problem. Every good month feels like luck because without a system underneath it, it was.',
    working: 'The fact that you have proof at all. You figured out how to generate revenue without a system. That is harder than it sounds. The skill is real. What is missing is the scaffolding around it.',
    mindMine: 'Chasing the spike. When a good month happens you try to copy it. But you cannot manually reproduce what you did not systematically create. So next month starts from zero again and the cycle continues.',
    oneMove: 'Track every dollar that came in over the last 90 days. Write down exactly where each one came from. Find the pattern. If there is no pattern, that is the answer. Start there.',
    environment: 'The Lab. Focused tools that find the structural cause of the revenue swings and build what needs to be built to stabilise them.',
    routing: 'waitlist',
    primaryCta: { label: 'Join the Waitlist →', href: '/#waitlist' },
  },
  operator: {
    key: 'operator',
    letter: 'D',
    level: 4,
    name: 'Operator',
    eyebrow: 'Stage 04 · Stable, founder-bound',
    tagline: 'Revenue is consistent. Now the business has to grow up.',
    feel: 'The money anxiety is mostly gone but a new kind of weight has arrived. You are the answer to every question inside the business. Even when you try to hand things off they come back. You are good at your work but tired of being indispensable.',
    happening: 'You built a business that works because you are holding it together. Every decision runs through you. Every problem lands on your plate. The business has outgrown its original structure and you are the bottleneck inside it.',
    working: 'Revenue is consistent. The offer is proven. The clients are real. You are not in survival mode anymore. That is the result of real work and it matters. The machine exists. It just still needs you as the engine.',
    mindMine: 'Staying inside the machine instead of working on it. You are so good at solving problems that problems keep coming to you. Every time you step in you delay the moment the business learns to run without you.',
    oneMove: 'Write down every recurring decision you make in a week. Find the ones someone else could make with a clear process. Pick one and write that process this week. One at a time.',
    environment: 'The Lab. Team structure, internal culture, and documented process so the business can breathe without you at the centre of everything.',
    routing: 'powerups',
    primaryCta: { label: 'Book a Power Up →', href: '/power-ups' },
  },
  sovereign: {
    key: 'sovereign',
    letter: 'E',
    level: 5,
    name: 'Sovereign',
    eyebrow: 'Stage 05 · Past survival',
    tagline: 'The business runs. Now we build the full operating system.',
    feel: 'Spacious but searching. The urgency is gone and something quieter has taken its place. You are proud of what you built. You are also asking bigger questions about who you are becoming now that the hardest part is behind you.',
    happening: 'You built it. The business generates revenue whether you show up or not. You have a team, a process, and a reputation that compounds. You work because you choose to, not because you have to. The hard part is behind you. The question now is what this is all actually for and what comes next.',
    working: 'Everything you spent years building. The systems hold. The team delivers. The revenue is real and consistent. You are operating from a position almost no founder ever reaches. That is not nothing. That is the whole game.',
    mindMine: 'Drift. When the urgency of survival is gone, decisions start getting made from habit or boredom instead of intention. You do not fear failure anymore. What you are navigating now is legacy.',
    oneMove: 'Write one sentence describing what you want this business to look like in three years. If you cannot write it clearly and quickly, that is the only work that matters right now.',
    environment: 'Command Center Installation. The full system install. Everything you have built gets encoded into a real operating system so the business becomes a true asset, not just an income.',
    routing: 'waitlist',
    primaryCta: { label: 'Join the Waitlist →', href: '/#waitlist' },
  },
};

export const LETTER_TO_ARCHETYPE: Record<Letter, ArchetypeKey> = {
  A: 'explorer',
  B: 'committer',
  C: 'builder',
  D: 'operator',
  E: 'sovereign',
};

export const LEVEL_TO_LETTER: Letter[] = ['A', 'B', 'C', 'D', 'E'];

export interface ScoreResult {
  raw: ArchetypeKey;
  final: ArchetypeKey;
  mindsetGap: boolean;
  counts: Record<Letter, number>;
}

/**
 * Score the assessment.
 * @param answers tuple of [Q1, Q2, Q3, Q4, Q5] letters.
 */
export function score(answers: [Letter, Letter, Letter, Letter, Letter]): ScoreResult {
  const [q1, q2, q3, q4, q5] = answers;
  const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  ([q1, q2, q3, q4]).forEach((a) => { counts[a]++; });

  // Find the letter(s) with the highest count.
  let maxCount = 0;
  let winners: Letter[] = [];
  (['A', 'B', 'C', 'D', 'E'] as Letter[]).forEach((l) => {
    if (counts[l] > maxCount) {
      maxCount = counts[l];
      winners = [l];
    } else if (counts[l] === maxCount) {
      winners.push(l);
    }
  });

  // Tie-breaker: Q1 (Soul) wins if it is among the tied letters.
  let rawLetter: Letter;
  if (winners.length === 1) {
    rawLetter = winners[0];
  } else if (winners.includes(q1)) {
    rawLetter = q1;
  } else {
    rawLetter = winners[0];
  }
  const raw: ArchetypeKey = LETTER_TO_ARCHETYPE[rawLetter];

  // Q5 revenue modifier — drops one level when revenue is two or more levels below raw archetype.
  const levelOf: Record<Letter, number> = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  const rawLevel = levelOf[rawLetter];
  const revLevel = levelOf[q5];
  let finalLetter: Letter = rawLetter;
  let mindsetGap = false;
  if (rawLevel - revLevel >= 2) {
    const newLevel = Math.max(1, rawLevel - 1);
    finalLetter = LEVEL_TO_LETTER[newLevel - 1];
    mindsetGap = true;
  }
  const final: ArchetypeKey = LETTER_TO_ARCHETYPE[finalLetter];

  return { raw, final, mindsetGap, counts };
}
