import React from 'react';
import { FiFileText, FiMessageCircle, FiStar, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <FiFileText />,
      title: t('service_1_title'),
      desc: t('service_1_desc'),
      features: t('service_1_features'),
      popular: false,
    },
    {
      icon: <FiMessageCircle />,
      title: t('service_2_title'),
      desc: t('service_2_desc'),
      features: t('service_2_features'),
      popular: false,
    },
    {
      icon: <FiStar />,
      title: t('service_3_title'),
      desc: t('service_3_desc'),
      features: t('service_3_features'),
      popular: true,
    },
  ];

  return (
    <section className="section section-services" id="services">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">{t('services_title')}</span>
          <h2>{t('services_subtitle')}</h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className={`service-card ${s.popular ? 'popular' : ''}`} key={i}>
              {s.popular && <span className="popular-badge">{t('service_popular')}</span>}
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-features">
                {s.features.map((f, j) => (
                  <li key={j}><FiCheck /> {f}</li>
                ))}
              </ul>
              <a href="#contact" className={s.popular ? 'btn-primary full' : 'btn-outline-dark full'}>
                {t('service_book')} <FiArrowRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
