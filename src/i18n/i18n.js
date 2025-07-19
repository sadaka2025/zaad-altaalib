// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // charge les fichiers JSON dynamiquement
  .use(LanguageDetector) // détecte la langue du navigateur ou de localStorage
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr', // Langue par défaut
    debug: false,
    interpolation: {
      escapeValue: false // nécessaire avec React
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // dossier public/locales/fr/translation.json etc.
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
