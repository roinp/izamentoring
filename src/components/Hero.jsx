import React from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          {/* <span className="hero-tagline">izamentoring — career consulting</span> */}
          <h1>
            {t('hero_title_1')} <span className="accent">{t('hero_title_highlight')}</span> {t('hero_title_2')}
          </h1>
          {/* <p>{t('hero_subtitle')}</p> */}
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              {t('hero_btn_primary')} <FiArrowRight />
            </a>
            {/* <a href="#services" className="btn-outline">{t('hero_btn_secondary')}</a> */}
          </div>
          <div className="hero-bullets">
            <span><FiCheck /> CV / LinkedIn</span>
            <span><FiCheck /> Interview prep</span>
            <span><FiCheck /> Personal mentoring</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src={`${process.env.PUBLIC_URL}/2222.jpeg`}
              alt="izamentoring workspace"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
