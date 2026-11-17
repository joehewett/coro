import React, { useEffect, useRef, useState } from 'react';

/**
 * Coro's personal cursor: a small dot with a soft ring that trails behind it.
 * Over links the ring grows. Over anything with data-cursor="Watch" (film stills)
 * it opens into a circle with that word inside.
 * Only shown on laptops with a mouse; phones keep their normal touch behaviour.
 */
const Cursor: React.FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<'default' | 'link' | 'label'>('default');
  const [text, setText] = useState('');
  const [hidden, setHidden] = useState(true);

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
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setHidden(false);
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      const el = e.target as HTMLElement | null;
      const labelled = el?.closest('[data-cursor]') as HTMLElement | null;
      if (labelled) {
        setMode('label');
        setText(labelled.dataset.cursor || '');
      } else if (el?.closest('a, button, [role="button"], .cursor-pointer')) {
        setMode('link');
      } else {
        setMode('default');
      }
    };
    const onLeave = () => setHidden(true);

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
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

  const ringSize = mode === 'label' ? 96 : mode === 'link' ? 48 : 30;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300${
        mode === 'label' ? '' : ' mix-blend-difference'
      }`}
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <div ref={ring} className="absolute top-0 left-0" style={{ willChange: 'transform' }}>
        <div
          className="flex items-center justify-center rounded-full border border-white text-white transition-all duration-300 ease-out"
          style={{
            width: ringSize,
            height: ringSize,
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            background: mode === 'label' ? 'white' : 'transparent',
          }}
        >
          {mode === 'label' && (
            <span className="font-wide text-[9px] tracking-[0.3em] uppercase text-black pl-[0.3em]">{text}</span>
          )}
        </div>
      </div>
      <div ref={dot} className="absolute top-0 left-0" style={{ willChange: 'transform' }}>
        <div
          className="rounded-full bg-white transition-opacity duration-200"
          style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3, opacity: mode === 'label' ? 0 : 1 }}
        />
      </div>
    </div>
  );
};

export default Cursor;
