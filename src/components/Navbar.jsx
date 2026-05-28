import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const FlagGE = () => (
  <svg viewBox="0 0 30 20" className="lang-flag">
    <rect width="30" height="20" fill="#fff"/>
    <rect x="13" y="0" width="4" height="20" fill="#E8112D"/>
    <rect x="0" y="8" width="30" height="4" fill="#E8112D"/>
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

const FlagRU = () => (
  <svg viewBox="0 0 30 20" className="lang-flag">
    <rect width="30" height="7" fill="#fff"/>
    <rect y="7" width="30" height="6" fill="#0039A6"/>
    <rect y="13" width="30" height="7" fill="#D52B1E"/>
  </svg>
);

const languages = [
  { code: 'ka', label: 'GE', flag: <FlagGE /> },
  { code: 'en', label: 'EN', flag: <FlagGB /> },
  { code: 'ru', label: 'RU', flag: <FlagRU /> },
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
          iza<span>con</span>
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>{t('nav_home')}</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>{t('nav_about')}</a></li>
          <li><a href="#why" onClick={() => setMenuOpen(false)}>{t('nav_why')}</a></li>
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
