import React, { useState } from 'react';
import { FiLinkedin, FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';

const EMAIL = 'Abashidzeiza9@gmail.com';
const PHONE = '+995 593 160 197';
const LINKEDIN = 'https://www.linkedin.com/in/iza-abashidze-4b0709234/';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const contactItems = [
    {
      icon: <FiMail />,
      title: t('contact_email_title'),
      text: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: <FiPhone />,
      title: t('contact_phone_title'),
      text: PHONE,
      href: `tel:${PHONE.replace(/\s/g, '')}`,
    },
    {
      icon: <FiLinkedin />,
      title: t('contact_linkedin_title'),
      text: t('contact_linkedin_text'),
      href: LINKEDIN,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const fd = new FormData();
      fd.append('Name', formData.name);
      fd.append('Email', formData.email);
      fd.append('Phone', formData.phone);
      fd.append('Subject', formData.subject);
      fd.append('Message', formData.message);
      fd.append('_subject', `izamentoring — ${formData.subject || 'New contact request'}`);
      fd.append('_template', 'table');
      fd.append('_captcha', 'false');

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      console.log('FormSubmit response:', res.status, data);

      const successful = data.success === 'true' || data.success === true;
      const activationPending = !successful && /activat|confirm/i.test(data.message || '');

      if (successful) {
        alert(t('contact_success'));
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else if (activationPending) {
        alert(t('contact_activate'));
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      alert(`${t('contact_error')}\n\n${err.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section section-contact" id="contact">
      <div className="container">
        <div className="section-title">
          {/* <span className="eyebrow">{t('contact_title')}</span> */}
          <h2>{t('contact_subtitle')}</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {contactItems.map((item, index) => (
              <a
                className="contact-item"
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </a>
            ))}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder={t('contact_name')}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact_email')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder={t('contact_phone')}
                value={formData.phone}
                onChange={handleChange}
              />
              {/* <input
                type="text"
                name="subject"
                placeholder={t('contact_subject')}
                value={formData.subject}
                onChange={handleChange}
              /> */}
            </div>
            <textarea
              name="message"
              placeholder={t('contact_message')}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn-primary" disabled={sending}>
              {sending ? t('contact_sending') : t('contact_send')} <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
