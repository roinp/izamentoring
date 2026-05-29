import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

function About() {
  const { t } = useLanguage();
  const features = t('about_features');

  return (
    <section className="section section-about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img
              src={`${process.env.PUBLIC_URL}/iza.jpg`}
              alt={t('about_img_alt')}
            />
            {/* <div className="about-badge">
              <h3>10+</h3>
              <p>{t('about_badge')}</p>
            </div> */}
          </div>
          <div className="about-text">
            <span className="eyebrow">{t('about_title')}</span>
            <h2>{t('about_subtitle')}</h2>
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            <div className="about-features">
              {features.map((f, i) => (
                <div className="about-feature" key={i}>
                  <FiCheckCircle className="icon" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
