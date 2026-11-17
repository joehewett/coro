import { useEffect } from 'react';

/**
 * Coro's cursor: the 🐾 emoji itself, and a trail of 🐾 prints behind it
 * that point the way you walked and then fade.
 * A thin light glow keeps the dark paws visible on the black pages.
 * Only on laptops with a mouse.
 */
const PAWS = '🐾';
const STEP = 48; // px between prints
const SIDE = 8; // px left/right of the path

/** Draw the emoji onto a small canvas and return it as an image the browser can use as a cursor */
const emojiCursor = (size: number) => {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  if (!g) return null;
  g.font = `${Math.round(size * 0.78)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = 'rgba(255,255,255,0.95)';
  g.shadowBlur = 2;
  // A few passes build a soft light outline around the paws
  for (let i = 0; i < 3; i++) g.fillText(PAWS, size / 2, size / 2 + 1);
  return c.toDataURL('image/png');
};

const PawTrail: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    // Cursor: 🐾 everywhere, slightly bigger over anything clickable
    const normal = emojiCursor(30);
    const big = emojiCursor(38);
    let style: HTMLStyleElement | null = null;
    if (normal && big) {
      style = document.createElement('style');
      style.textContent = `
        html, html * { cursor: url(${normal}) 15 15, auto; }
        a, a *, button, button *, [role="button"], .cursor-pointer, .cursor-pointer *, label, select, summary {
          cursor: url(${big}) 19 19, pointer !important;
        }`;
      document.head.appendChild(style);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => style?.remove();
    }

    // Trail of prints
    let last: { x: number; y: number } | null = null;
    let left = true;

    const drop = (x: number, y: number, angle: number) => {
      const side = left ? -SIDE : SIDE;
      left = !left;
      const el = document.createElement('span');
      el.className = 'paw-print';
      el.setAttribute('aria-hidden', 'true');
      el.textContent = PAWS;
      el.style.left = `${x + Math.cos(angle + Math.PI / 2) * side}px`;
      el.style.top = `${y + Math.sin(angle + Math.PI / 2) * side}px`;
      // The emoji's toes point up and to the right; turn them the way you walked
      el.style.transform = `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 45}deg)`;
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
    return () => {
      window.removeEventListener('mousemove', onMove);
      style?.remove();
    };
  }, []);

  return null;
};

export default PawTrail;
