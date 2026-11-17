import React from 'react';

/**
 * Colourful cut-out letters, like the "THE END" card Coro sent:
 * each letter its own colour, a little tilted and bouncing off the line,
 * with the first letter of each word bigger.
 * Use with the `font-end` class.
 */
const COLORS = ['#f77fbe', '#29b6f6', '#4caf50', '#ff9800', '#f0245a', '#19c3b8'];
const TILT = [-4, 3, -2, 5, -3, 2, 4, -5];
const LIFT = [0, -0.06, 0.04, -0.03, 0.07, -0.05, 0.02];

const ColorLetters: React.FC<{ text: string; offset?: number; className?: string }> = ({
  text,
  offset = 0,
  className = '',
}) => {
  let n = offset;
  return (
    <span className={`inline-block whitespace-nowrap uppercase ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => {
        if (ch === ' ') return <span key={i} aria-hidden="true">&nbsp;</span>;
        const first = i === 0 || text[i - 1] === ' ';
        const k = n++;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block"
            style={{
              color: COLORS[k % COLORS.length],
              transform: `translateY(${LIFT[k % LIFT.length]}em) rotate(${TILT[k % TILT.length]}deg)`,
              fontSize: first ? '1.25em' : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
};

export default ColorLetters;
