import { useEffect } from 'react';

/**
 * Paw prints left behind the cursor, like a dog walking: single beige paws,
 * alternating left and right so they form a diagonal track, turned the way you walked, then fading.
 * The paw is the top paw of the 🐾 emoji, coloured beige (/cursor/paw.png).
 * Only the two newest prints stay on screen, so with the cursor there are never more than three paws.
 * The cursor itself is set in global.css. Only on laptops with a mouse.
 */
const STEP = 46; // px between prints
const SIDE = 9; // px left/right of the path
// The paw's toes point slightly left of straight up; this turns them straight
const PAW_TILT = 16;
const MAX_PRINTS = 2;

const PawTrail: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let last: { x: number; y: number } | null = null;
    let left = true;
    const prints: HTMLImageElement[] = [];

    const drop = (x: number, y: number, angle: number) => {
      const side = left ? -SIDE : SIDE;
      left = !left;
      const el = document.createElement('img');
      el.src = '/cursor/paw.png';
      el.alt = '';
      el.className = 'paw-print';
      el.setAttribute('aria-hidden', 'true');
      el.style.left = `${x + Math.cos(angle + Math.PI / 2) * side}px`;
      el.style.top = `${y + Math.sin(angle + Math.PI / 2) * side}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 90 + PAW_TILT}deg)`;
      document.body.appendChild(el);
      prints.push(el);
      while (prints.length > MAX_PRINTS) prints.shift()?.remove();
      window.setTimeout(() => {
        el.remove();
        const i = prints.indexOf(el);
        if (i >= 0) prints.splice(i, 1);
      }, 550);
    };

    const onMove = (e: MouseEvent) => {
      if (!last) {
        last = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (Math.hypot(dx, dy) >= STEP) {
        drop(last.x, last.y, Math.atan2(dy, dx));
        last = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      prints.forEach((p) => p.remove());
    };
  }, []);

  return null;
};

export default PawTrail;
