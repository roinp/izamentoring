import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import translations from './translations';

const LanguageContext = createContext();

// localStorage key where admin-panel edits are stored (browser-only overrides).
const STORAGE_KEY = 'izamentoring_content_overrides';

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

// Merge saved overrides on top of the default translations (per language).
function mergeTranslations(base, overrides) {
  const out = {};
  for (const lang of Object.keys(base)) {
    out[lang] = { ...base[lang], ...(overrides[lang] || {}) };
  }
  return out;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ka');
  const [overrides, setOverrides] = useState(loadOverrides);

  // The translations the whole site actually reads from = defaults + overrides.
  const data = useMemo(() => mergeTranslations(translations, overrides), [overrides]);

  // Persist overrides whenever they change.
  useEffect(() => {
    try {
      if (Object.keys(overrides).length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
      }
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [overrides]);

  const t = (key) => (data[lang] && data[lang][key] != null ? data[lang][key] : key);

  // Admin helpers ---------------------------------------------------------
  const updateField = (lng, key, value) => {
    setOverrides((prev) => ({
      ...prev,
      [lng]: { ...(prev[lng] || {}), [key]: value },
    }));
  };

  const resetField = (key) => {
    setOverrides((prev) => {
      const next = {};
      for (const lng of Object.keys(prev)) {
        const { [key]: _removed, ...rest } = prev[lng];
        next[lng] = rest;
      }
      return next;
    });
  };

  const resetAll = () => setOverrides({});

  const hasOverrides = Object.keys(overrides).some(
    (lng) => overrides[lng] && Object.keys(overrides[lng]).length > 0
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        data,
        defaults: translations,
        updateField,
        resetField,
        resetAll,
        hasOverrides,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
