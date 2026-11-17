import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Top menu for the director side of the site.
 * Transparent over the hero, turns solid black once you scroll.
 */
const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass =
    'whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors';

  const links = (
    <>
      <button onClick={() => goTo('films')} className={linkClass}>Films</button>
      <button onClick={() => goTo('about')} className={linkClass}>About</button>
      <button onClick={() => goTo('contact')} className={linkClass}>Contact</button>
      <Link to="/more" onClick={() => setOpen(false)} className={linkClass}>More of me</Link>
    </>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
        <Link to="/" aria-label="Home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/coro_text.png" alt="Coro" style={{ height: 26, width: 'auto' }} />
        </Link>

        <nav className="hidden md:flex items-center gap-10">{links}</nav>

        <button
          className="md:hidden text-[11px] uppercase tracking-[0.25em] text-white/80"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col items-start gap-6 px-6 pb-8">{links}</nav>
      )}
    </header>
  );
};

export default SiteHeader;
