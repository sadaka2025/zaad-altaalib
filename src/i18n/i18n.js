// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // ✅ charge les fichiers dynamiquement
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // ✅ fichiers JSON dans /public/locales
  .use(LanguageDetector) // ✅ auto-détection navigateur + localStorage
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    debug: true,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // 📂 dans public/locales/fr/...
    },
  });

export default i18n;
