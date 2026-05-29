import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

// Georgian "Five Cross Flag": central red cross + four small Bolnisi crosses.
const BolnisiCross = ({ x, y, s = 1 }) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    fill="#E8112D"
    d="M0,-10 C2,-6 6,-2 10,0 C6,2 2,6 0,10 C-2,6 -6,2 -10,0 C-6,-2 -2,-6 0,-10 Z"
  />
);

const FlagGE = () => (
  <svg viewBox="0 0 30 20" className="lang-flag">
    <rect width="30" height="20" fill="#fff" />
    <rect x="12.5" y="0" width="5" height="20" fill="#E8112D" />
    <rect x="0" y="7.5" width="30" height="5" fill="#E8112D" />
    <BolnisiCross x={6.25} y={3.75} s={0.34} />
    <BolnisiCross x={23.75} y={3.75} s={0.34} />
    <BolnisiCross x={6.25} y={16.25} s={0.34} />
    <BolnisiCross x={23.75} y={16.25} s={0.34} />
  </svg>
);

const FlagGB = () => (
  <svg viewBox="0 0 60 30" className="lang-flag">
    <rect width="60" height="30" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

const languages = [
  { code: 'ka', label: 'GE', flag: <FlagGE /> },
  { code: 'en', label: 'EN', flag: <FlagGB /> },
];

function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          iza<span>mentoring</span>
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>{t('nav_home')}</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>{t('nav_about')}</a></li>
          {/* <li><a href="#why" onClick={() => setMenuOpen(false)}>{t('nav_why')}</a></li> */}
          <li><a href="#services" onClick={() => setMenuOpen(false)}>{t('nav_services')}</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t('nav_contact')}</a></li>
        </ul>
        <div className="nav-right">
          <div className="lang-switcher">
            {languages.map((l) => (
              <button
                key={l.code}
                className={`lang-btn ${lang === l.code ? 'active' : ''}`}
                onClick={() => setLang(l.code)}
                aria-label={l.label}
              >
                <span className="lang-flag">{l.flag}</span>
                <span className="lang-code">{l.label}</span>
              </button>
            ))}
          </div>
          <a href="#contact" className="nav-cta">{t('nav_cta')}</a>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
