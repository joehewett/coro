import { useEffect } from 'react';
import { PAW_SVG } from './pawPath';

/**
 * Wolf paw prints left on the "floor" behind the mouse, like Coro's 🐾.
 * Left and right prints alternate along the path, point the way you walked, then fade.
 * Only on laptops with a mouse.
 */
const STEP = 44; // px between prints
const SIDE = 10; // px left/right of the path

const PawTrail: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let last: { x: number; y: number } | null = null;
    let left = true;

    const drop = (x: number, y: number, angle: number) => {
      const side = left ? -SIDE : SIDE;
      left = !left;
      const px = x + Math.cos(angle + Math.PI / 2) * side;
      const py = y + Math.sin(angle + Math.PI / 2) * side;
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      el.setAttribute('viewBox', '0 0 32 32');
      el.setAttribute('class', 'paw-print');
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = PAW_SVG;
      el.style.left = `${px}px`;
      el.style.top = `${py}px`;
      // Toes point the way you are walking
      el.style.transform = `rotate(${(angle * 180) / Math.PI + 90}deg)`;
      document.body.appendChild(el);
      window.setTimeout(() => el.remove(), 1700);
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
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
};

export default PawTrail;
