import React from 'react';
import { FiEye, FiLayers, FiShield } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

function WhyMatters() {
  const { t } = useLanguage();

  const points = [
    { icon: <FiEye />, title: t('why_point_1_title'), desc: t('why_point_1_desc') },
    { icon: <FiLayers />, title: t('why_point_2_title'), desc: t('why_point_2_desc') },
    { icon: <FiShield />, title: t('why_point_3_title'), desc: t('why_point_3_desc') },
  ];

  return (
    <section className="section section-why" id="why">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">{t('why_subtitle')}</span>
          <h2>{t('why_title')}</h2>
          <p>{t('why_text')}</p>
        </div>
        <div className="why-grid">
          {points.map((p, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyMatters;
