import { useState } from 'react';

type Answer = { q: number; value: string; label: string };
type Phase = 'quiz' | 'result';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Which best describes how you feel about your business right now?',
    options: ['Overwhelmed', 'Frustrated', 'Exhausted', 'Skeptical', 'Ready'],
  },
  {
    id: 2,
    text: 'Which best describes your revenue situation right now?',
    options: ['Volatile Revenue', 'Stuck at a Ceiling', 'Underpricing', 'Low Margins', 'Founder-Dependent'],
  },
  {
    id: 3,
    text: 'Which best describes your current systems situation?',
    options: ['Scattered Systems', 'Manual Processes', 'No Compounding IP', 'Fragile Authority', 'Leaking Deals'],
  },
  {
    id: 4,
    text: 'Which best describes your current team situation?',
    options: ['Solo (No Team)', 'Has VAs (Can\'t Delegate)', 'Team Exists (No Systems)', 'Team + Systems (Messy)', 'Ready to Scale'],
  },
];

interface ResultData {
  pillar: string;
  bottleneck: string;
  copy: string;
  color: string;
}

const RESULT_MAP: Record<string, ResultData> = {
  Overwhelmed: {
    pillar: 'Body',
    bottleneck: 'Your operations are the ceiling.',
    copy: "You're not failing — your systems are. CWK. installs the infrastructure that catches everything so you can stop running from fire to fire.",
    color: '#00E5FF',
  },
  Frustrated: {
    pillar: 'Soul',
    bottleneck: "Your effort isn't compounding.",
    copy: "You're doing the work but nothing is stacking. CWK. turns your expertise into compounding authority — IP, proof, and positioning that build over time.",
    color: '#7B61FF',
  },
  Exhausted: {
    pillar: 'Mind',
    bottleneck: 'Your decision load is too high.',
    copy: "You're rebuilding momentum every week because there's no system holding it. CWK. installs the frameworks that make momentum automatic.",
    color: '#00E5FF',
  },
  Skeptical: {
    pillar: 'Pocket',
    bottleneck: "Your revenue isn't predictable.",
    copy: "You've tried things that didn't stick. CWK. doesn't give advice and leave — we install the revenue systems and stay for the long game.",
    color: '#FB3079',
  },
  Ready: {
    pillar: 'All Four',
    bottleneck: 'You need a partner, not a consultant.',
    copy: "You already know what's broken. CWK. is your long-term business manager — we acquire a stake in your future and build alongside you.",
    color: '#7B61FF',
  },
};

const PILLAR_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Body:     { bg: 'rgba(0,229,255,0.1)',   border: 'rgba(0,229,255,0.25)',   text: '#00E5FF' },
  Soul:     { bg: 'rgba(123,97,255,0.1)',  border: 'rgba(123,97,255,0.25)',  text: '#7B61FF' },
  Mind:     { bg: 'rgba(0,229,255,0.1)',   border: 'rgba(0,229,255,0.25)',   text: '#00E5FF' },
  Pocket:   { bg: 'rgba(251,48,121,0.1)',  border: 'rgba(251,48,121,0.25)',  text: '#FB3079' },
  'All Four': { bg: 'rgba(123,97,255,0.1)', border: 'rgba(123,97,255,0.25)', text: '#7B61FF' },
};

export default function BrandMirrorQuiz() {
  const [phase, setPhase] = useState<Phase>('quiz');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  function handleSelect(option: string) {
    if (transitioning) return;

    const newAnswer: Answer = { q: question.id, value: option, label: option };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setTransitioning(false);
      }, 220);
    } else {
      setTransitioning(true);
      setTimeout(() => {
        setPhase('result');
        setTransitioning(false);
      }, 220);
    }
  }

  function handleReset() {
    setPhase('quiz');
    setCurrentQ(0);
    setAnswers([]);
    setTransitioning(false);
    setHoveredOption(null);
  }

  // Result: keyed on Q1 answer
  const q1Answer = answers[0]?.value ?? 'Overwhelmed';
  const result = RESULT_MAP[q1Answer] ?? RESULT_MAP['Overwhelmed'];
  const pillarStyle = PILLAR_COLORS[result.pillar] ?? PILLAR_COLORS['All Four'];

  if (phase === 'result') {
    return (
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.22s ease',
        }}
      >
        {/* Result card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '40px 36px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#FB3079',
              marginBottom: '20px',
            }}
          >
            Your Bottleneck
          </span>

          {/* Pillar badge */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px 14px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: pillarStyle.bg,
                border: `1px solid ${pillarStyle.border}`,
                color: pillarStyle.text,
              }}
            >
              {result.pillar}
            </span>
          </div>

          {/* Bottleneck headline */}
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#EEF0FF',
              marginBottom: '20px',
            }}
          >
            {result.bottleneck}
          </h2>

          {/* Body copy */}
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(238,240,255,0.62)',
              lineHeight: 1.65,
              marginBottom: '36px',
            }}
          >
            {result.copy}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/#waitlist"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '8px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                background: '#00E5FF',
                color: '#07090F',
                transition: 'filter 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Join the Waitlist →
            </a>
            <button
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                borderRadius: '8px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(238,240,255,0.62)',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,229,255,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = '#EEF0FF';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(238,240,255,0.62)';
              }}
            >
              Retake the Mirror
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fadeUpResult {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '2px',
          marginBottom: '40px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00E5FF, #7B61FF)',
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Step label */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(0,229,255,0.7)',
          marginBottom: '20px',
        }}
      >
        Question {currentQ + 1} of {QUESTIONS.length}
      </div>

      {/* Question card */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.22s ease',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '36px 32px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              color: '#EEF0FF',
              marginBottom: '28px',
            }}
          >
            {question.text}
          </h2>

          {/* Options */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {question.options.map(option => {
              const isHovered = hoveredOption === `${currentQ}-${option}`;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHoveredOption(`${currentQ}-${option}`)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: isHovered ? 'rgba(0,229,255,0.05)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderLeft: isHovered ? '3px solid #00E5FF' : '3px solid transparent',
                    borderRadius: '8px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    color: isHovered ? '#EEF0FF' : 'rgba(238,240,255,0.75)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
