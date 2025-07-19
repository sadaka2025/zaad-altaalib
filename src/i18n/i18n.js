// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ar",           // Langue par défaut en cas d'absence
    debug: false,                // Désactive les logs en prod
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Chemin des fichiers JSON
    },
    returnObjects: true,         // Pour récupérer objets/tableaux
    interpolation: {
      escapeValue: false,        // React s'en charge
    },
    react: {
      useSuspense: false,        // Evite le suspense, plus simple pour SSR
    },
  });

export default i18n;
