import React, { useEffect, useRef, useState } from 'react';

/**
 * Coro's cursor: a little mariquita (ladybird).
 * She walks behind the mouse, turning to face where she is going.
 * When she lands on something you can click, she turns upright and spreads her wings.
 * Only on laptops with a mouse; phones keep normal touch behaviour.
 */
const SIZE = 22; // px on screen, about the size of a normal cursor
// The head tip in the 40x40 drawing. It sits right on the mouse point.
const HEAD_X = 20;
const HEAD_Y = 3;

const Cursor: React.FC = () => {
  const bug = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<'default' | 'link'>('default');
  const [hidden, setHidden] = useState(true);
  const [walking, setWalking] = useState(false);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let angle = 0;
    let first = true;
    let raf = 0;
    let lastWalking = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (first) {
        pos.x = target.x;
        pos.y = target.y;
        first = false;
      }
      setHidden(false);

      const el = e.target as HTMLElement | null;
      if (el?.closest('a, button, [role="button"], .cursor-pointer')) {
        setMode('link');
      } else {
        setMode('default');
      }
    };
    const onLeave = () => setHidden(true);

    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      pos.x += dx * 0.28;
      pos.y += dy * 0.28;
      const dist = Math.hypot(dx, dy);

      // Face the direction of travel; sit upright when she has landed on something.
      let want = angle;
      if (modeRef.current !== 'default') want = 0;
      else if (dist > 2) want = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      let diff = ((want - angle + 540) % 360) - 180;
      angle += diff * 0.15;

      const isWalking = dist > 2 && modeRef.current === 'default';
      if (isWalking !== lastWalking) {
        lastWalking = isWalking;
        setWalking(isWalking);
      }

      if (bug.current) {
        bug.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  const open = mode !== 'default';
  const scale = SIZE / 40;

  return (
    <div
      aria-hidden="true"
      className={`mariquita pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300${
        open ? ' is-open' : ''
      }${walking ? ' is-walking' : ''}`}
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <div ref={bug} className="absolute top-0 left-0" style={{ willChange: 'transform' }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 40 40"
          style={{
            position: 'absolute',
            left: -HEAD_X * scale,
            top: -HEAD_Y * scale,
            overflow: 'visible',
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.45))',
          }}
        >
          {/* Legs */}
          <g className="legs legs-a" stroke="#8a7f70" strokeWidth="1.3" strokeLinecap="round" fill="none">
            <path d="M12 17 L6 14" />
            <path d="M11 25 L4 25" />
            <path d="M12 32 L6 36" />
          </g>
          <g className="legs legs-b" stroke="#8a7f70" strokeWidth="1.3" strokeLinecap="round" fill="none">
            <path d="M28 17 L34 14" />
            <path d="M29 25 L36 25" />
            <path d="M28 32 L34 36" />
          </g>

          {/* Flying wings, hidden under the shell until she opens up */}
          <g className="hindwings">
            <ellipse className="hw hw-l" cx="11" cy="27" rx="6" ry="13" fill="rgba(245,236,215,0.55)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
            <ellipse className="hw hw-r" cx="29" cy="27" rx="6" ry="13" fill="rgba(245,236,215,0.55)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
          </g>

          {/* Body */}
          <ellipse cx="20" cy="24" rx="9.5" ry="12" fill="#111" stroke="rgba(245,236,215,0.35)" strokeWidth="0.6" />

          {/* Head, antennae and eyes */}
          <path d="M17.5 6 Q15 2 12.5 1.5 M22.5 6 Q25 2 27.5 1.5" stroke="#8a7f70" strokeWidth="1" fill="none" strokeLinecap="round" />
          <circle cx="12.5" cy="1.5" r="1" fill="#8a7f70" />
          <circle cx="27.5" cy="1.5" r="1" fill="#8a7f70" />
          <ellipse cx="20" cy="10" rx="6" ry="5" fill="#111" stroke="rgba(245,236,215,0.45)" strokeWidth="0.6" />
          <circle cx="17.3" cy="9" r="1.3" fill="#f5ecd7" />
          <circle cx="22.7" cy="9" r="1.3" fill="#f5ecd7" />

          {/* Red shell, two halves that swing open */}
          <g className="shell shell-l">
            <path d="M20 13 C12 13 9.5 20 9.5 25 C9.5 31 13.5 36.5 20 37 Z" fill="#d7262b" />
            <circle cx="15" cy="20" r="2.2" fill="#111" />
            <circle cx="13.6" cy="28" r="2" fill="#111" />
            <circle cx="17.6" cy="32.5" r="1.4" fill="#111" />
            <path d="M14 16.5 C12.5 18 12 19.5 11.8 21" stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>
          <g className="shell shell-r">
            <path d="M20 13 C28 13 30.5 20 30.5 25 C30.5 31 26.5 36.5 20 37 Z" fill="#d7262b" />
            <circle cx="25" cy="20" r="2.2" fill="#111" />
            <circle cx="26.4" cy="28" r="2" fill="#111" />
            <circle cx="22.4" cy="32.5" r="1.4" fill="#111" />
          </g>
          <path className="seam" d="M20 13.5 L20 36.5" stroke="#111" strokeWidth="0.8" />
        </svg>

      </div>
    </div>
  );
};

export default Cursor;
