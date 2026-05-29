import React from 'react';
import { FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

const EMAIL = 'Abashidzeiza9@gmail.com';
const PHONE = '+995 593 160 197';
const LINKEDIN = 'https://www.linkedin.com/in/iza-abashidze-4b0709234/';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>iza<span>mentoring</span></h3>
          <p>{t('footer_desc')}</p>
          <div className="footer-socials">
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href={`mailto:${EMAIL}`} aria-label="Email"><FiMail /></a>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} aria-label="Phone"><FiPhone /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>{t('footer_quick_links')}</h4>
          <ul>
            <li><a href="#home">{t('nav_home')}</a></li>
            <li><a href="#about">{t('nav_about')}</a></li>
            <li><a href="#services">{t('nav_services')}</a></li>
            <li><a href="#contact">{t('nav_contact')}</a></li>
          </ul>
        </div>
        {/* <div className="footer-col">
          <h4>{t('footer_contact')}</h4>
          <ul>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a></li>
            <li><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
