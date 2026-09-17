import { useEffect, useState } from 'react';

const links = [
  ['jewelry', 'Jewelry & Accessories'], ['journals', 'Journals & Books'], ['bottles', 'Water Bottles'],
  ['gift-boxes', 'Gift Boxes'], ['watches', 'Wristwatches'],
] as const;

export function StickyNav({ onBuy }: { onBuy: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('jewelry');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const current = links.map(([id]) => document.getElementById(id)).find((section) => section && section.getBoundingClientRect().top <= 120 && section.getBoundingClientRect().bottom > 120);
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#top" className="logo" aria-label="Customry home">Customry</a>
      <nav className={open ? 'nav__links nav__links--open' : 'nav__links'} aria-label="Collections">
        {links.map(([id, label]) => <button key={id} className={active === id ? 'is-active' : ''} type="button" onClick={() => go(id)}>{label}</button>)}
      </nav>
      <button className="button button--solid nav__cta" type="button" onClick={onBuy}>Buy</button>
      <button className="nav__menu" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '×' : 'Menu'}</button>
    </header>
  );
}
