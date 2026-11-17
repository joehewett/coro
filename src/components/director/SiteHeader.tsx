import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ColorLetters from './ColorLetters';

/**
 * Top menu for the director side of the site, in the colourful "THE END" letters.
 * With hideOverHero, on laptops it stays hidden while the TV fills the screen
 * (the TV has its own menu) and slides in once you scroll past it.
 * On phones it is always there, above the TV.
 */
const SiteHeader: React.FC<{ hideOverHero?: boolean }> = ({ hideOverHero = false }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(!hideOverHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (hideOverHero) setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hideOverHero]);

  const goTo = (id: string) => {
    setOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = 'font-end text-xl leading-none hover:scale-110 transition-transform';

  const links = (
    <>
      <button onClick={() => goTo('films')} className={linkClass}><ColorLetters text="Films" /></button>
      <button onClick={() => goTo('about')} className={linkClass}><ColorLetters text="About" offset={2} /></button>
      <button onClick={() => goTo('contact')} className={linkClass}><ColorLetters text="Contact" offset={4} /></button>
      <Link to="/more" onClick={() => setOpen(false)} className={linkClass}><ColorLetters text="More of me" offset={1} /></Link>
    </>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/60 to-transparent'
      } ${pastHero ? '' : 'sm:-translate-y-full sm:opacity-0 sm:pointer-events-none'}`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between">
        <Link to="/" aria-label="Home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/coro_text.png" alt="Coro" style={{ height: 26, width: 'auto' }} />
        </Link>

        <nav className="hidden md:flex items-center gap-10">{links}</nav>

        <button className="md:hidden font-end text-xl leading-none" onClick={() => setOpen(!open)} aria-expanded={open}>
          <ColorLetters text={open ? 'Close' : 'Menu'} />
        </button>
      </div>

      {open && <nav className="md:hidden flex flex-col items-start gap-6 px-6 pb-8">{links}</nav>}
    </header>
  );
};

export default SiteHeader;
