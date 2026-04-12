import { useState, useRef } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'duplicate' | 'invalid' | 'server-error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES: Record<FormState, { text: string; color: string } | null> = {
  idle:          null,
  loading:       null,
  success:       { text: "You're in. We'll reach out when it's your turn.", color: '#00E396' },
  duplicate:     { text: "You're already on the list. We haven't forgotten you.", color: '#00E5FF' },
  invalid:       { text: 'Please enter a valid email address.', color: '#FF4444' },
  'server-error': { text: 'Something went wrong. Try again in a moment.', color: '#FF7A30' },
};

export default function WaitlistForm() {
  const [state, setState] = useState<FormState>('idle');
  const emailRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = emailRef.current?.value.trim() ?? '';
    const honeypot = honeypotRef.current?.value ?? '';

    // Honeypot: silently succeed to fool bots
    if (honeypot.length > 0) {
      setState('success');
      return;
    }

    // Client-side email validation
    if (!EMAIL_REGEX.test(email)) {
      setState('invalid');
      return;
    }

    setState('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setState('duplicate');
      } else if (res.status === 422) {
        setState('invalid');
      } else if (!res.ok) {
        setState('server-error');
      } else {
        setState('success');
        if (emailRef.current) emailRef.current.value = '';
      }
    } catch {
      setState('server-error');
    }
  }

  const msg = MESSAGES[state];
  const isTerminal = state === 'success' || state === 'duplicate';

  return (
    <div className="waitlist-wrap">
      {!isTerminal && (
        <form onSubmit={handleSubmit} className="waitlist-form" noValidate>
          {/* Honeypot — hidden from real users */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              ref={honeypotRef}
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="waitlist-input-row">
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="waitlist-input"
              disabled={state === 'loading'}
            />
            <button
              type="submit"
              className="waitlist-btn"
              disabled={state === 'loading'}
            >
              {state === 'loading' ? (
                <span className="spinner" aria-label="Submitting…" />
              ) : (
                'Join the Waitlist →'
              )}
            </button>
          </div>
        </form>
      )}

      {msg && (
        <p
          className="waitlist-msg"
          style={{ color: msg.color }}
          role="alert"
          aria-live="polite"
        >
          {isTerminal && <span className="msg-dot" style={{ background: msg.color }} />}
          {msg.text}
        </p>
      )}

      <style>{`
        .waitlist-wrap {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
        }

        .waitlist-form {
          position: relative;
        }

        .waitlist-input-row {
          display: flex;
          gap: 8px;
        }

        .waitlist-input {
          flex: 1;
          height: 48px;
          padding: 0 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: #EEF0FF;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .waitlist-input::placeholder {
          color: rgba(238, 240, 255, 0.32);
        }

        .waitlist-input:focus {
          border-color: #00E5FF;
          box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.2);
        }

        .waitlist-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .waitlist-btn {
          height: 48px;
          padding: 0 22px;
          background: linear-gradient(90deg, #00E5FF, #7B61FF);
          color: #07090F;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: filter 0.2s ease, transform 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
        }

        .waitlist-btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }

        .waitlist-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .waitlist-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(7, 9, 15, 0.3);
          border-top-color: #07090F;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .waitlist-msg {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          animation: fadeUpMsg 0.3s both;
        }

        .msg-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @keyframes fadeUpMsg {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .waitlist-input-row {
            flex-direction: column;
          }
          .waitlist-btn {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
}
