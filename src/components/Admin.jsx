import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Admin.css';

// Simple client-side password gate. NOTE: a password in front-end code is not
// truly secure — it only keeps casual visitors out. Change it here.
const ADMIN_PASSWORD = 'izamentoring2024';
const AUTH_KEY = 'izamentoring_admin_auth';

// Friendly labels + grouping for every translation key, derived by prefix.
const GROUPS = [
  { title: 'ნავიგაცია / Navigation', match: (k) => k.startsWith('nav_') },
  { title: 'Hero', match: (k) => k.startsWith('hero_') },
  { title: 'რატომ / Why It Matters', match: (k) => k.startsWith('why_') },
  { title: 'ჩემს შესახებ / About', match: (k) => k.startsWith('about_') },
  { title: 'სერვისები / Services', match: (k) => k.startsWith('service') },
  { title: 'კონტაქტი / Contact', match: (k) => k.startsWith('contact_') },
  { title: 'Footer', match: (k) => k.startsWith('footer_') },
];

// Editor for an array field (e.g. feature lists): one item per line.
function ArrayField({ value, onChange }) {
  const [text, setText] = useState((value || []).join('\n'));

  const handleChange = (e) => {
    setText(e.target.value);
    onChange(e.target.value.split('\n'));
  };

  const handleBlur = () => {
    const cleaned = text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    setText(cleaned.join('\n'));
    onChange(cleaned);
  };

  return (
    <textarea
      className="admin-input admin-array"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      rows={Math.max(2, text.split('\n').length)}
      placeholder="თითო ელემენტი ახალ ხაზზე"
    />
  );
}

function Field({ langCode, fieldKey, value, onChange }) {
  if (Array.isArray(value)) {
    return <ArrayField value={value} onChange={onChange} />;
  }
  const isLong = typeof value === 'string' && value.length > 60;
  if (isLong) {
    return (
      <textarea
        className="admin-input"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.max(2, Math.ceil((value || '').length / 50))}
      />
    );
  }
  return (
    <input
      className="admin-input"
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Login({ onSuccess }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_KEY, '1');
      } catch {
        /* ignore */
      }
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={submit} className="admin-login-box">
        <h1>Admin</h1>
        <p>შეიყვანე პაროლი პანელზე შესასვლელად</p>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setError(false);
          }}
          placeholder="პაროლი"
          className={`admin-input ${error ? 'admin-input-error' : ''}`}
        />
        {error && <span className="admin-error">არასწორი პაროლი</span>}
        <button type="submit" className="admin-btn admin-btn-primary">
          შესვლა
        </button>
        <a href="#home" className="admin-back-link">← საიტზე დაბრუნება</a>
      </form>
    </div>
  );
}

function Editor() {
  const { data, defaults, updateField, resetAll, hasOverrides } = useLanguage();
  const [savedFlash, setSavedFlash] = useState(false);

  // Union of all keys, preserving the order they appear in the Georgian defaults.
  const keys = Array.from(
    new Set([...Object.keys(defaults.ka), ...Object.keys(defaults.en)])
  );

  const grouped = GROUPS.map((g) => ({
    title: g.title,
    keys: keys.filter((k) => g.match(k)),
  })).filter((g) => g.keys.length > 0);

  // Anything not captured by a group (safety net).
  const matched = new Set(grouped.flatMap((g) => g.keys));
  const leftover = keys.filter((k) => !matched.has(k));
  if (leftover.length) grouped.push({ title: 'სხვა / Other', keys: leftover });

  const flashSaved = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    window.location.hash = '#home';
    window.location.reload();
  };

  return (
    <div className="admin">
      <header className="admin-header">
        <div>
          <h1>კონტენტის მართვა</h1>
          <p className="admin-sub">
            ცვლილებები ინახება ამ ბრაუზერში (localStorage) და მაშინვე აისახება საიტზე.
          </p>
        </div>
        <div className="admin-actions">
          {savedFlash && <span className="admin-saved">✓ შენახულია</span>}
          <a href="#home" className="admin-btn">საიტის ნახვა</a>
          <button
            className="admin-btn"
            onClick={() => {
              if (window.confirm('ნამდვილად გსურს ყველა ცვლილების გაუქმება და საწყის ტექსტებზე დაბრუნება?')) {
                resetAll();
                flashSaved();
              }
            }}
            disabled={!hasOverrides}
          >
            ყველას განულება
          </button>
          <button className="admin-btn admin-btn-danger" onClick={logout}>
            გასვლა
          </button>
        </div>
      </header>

      <div className="admin-legend">
        <span className="admin-col-key">ველი</span>
        <span>🇬🇪 ქართული</span>
        <span>🇬🇧 English</span>
      </div>

      {grouped.map((group) => (
        <section key={group.title} className="admin-group">
          <h2>{group.title}</h2>
          {group.keys.map((key) => (
            <div className="admin-row" key={key}>
              <code className="admin-col-key">{key}</code>
              <div className="admin-col-field">
                <Field
                  langCode="ka"
                  fieldKey={key}
                  value={data.ka[key]}
                  onChange={(v) => {
                    updateField('ka', key, v);
                    flashSaved();
                  }}
                />
              </div>
              <div className="admin-col-field">
                <Field
                  langCode="en"
                  fieldKey={key}
                  value={data.en[key]}
                  onChange={(v) => {
                    updateField('en', key, v);
                    flashSaved();
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === '1';
    } catch {
      return false;
    }
  });

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <Editor />;
}

export default Admin;
