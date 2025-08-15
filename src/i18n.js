import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Charger les fichiers JSON depuis /public/locales
  .use(LanguageDetector) // Détecter la langue
  .use(initReactI18next) // Connecter à React
  .init({
    supportedLngs: ["fr", "ar", "en"], // Langues supportées
    fallbackLng: "fr", // Si la langue n'est pas trouvée

    detection: {
      // ✅ L'ordre de détection met l'URL en priorité
      order: ["path", "localStorage", "cookie", "navigator", "htmlTag"],
      lookupFromPathIndex: 0, // Premier segment de l'URL => langue
      caches: ["localStorage", "cookie"], // Sauvegarde choix utilisateur
    },

    backend: {
      // Chemin vers les fichiers JSON (dans public/locales)
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    react: {
      useSuspense: false, // Évite le suspense
    },

    interpolation: {
      escapeValue: false, // React échappe déjà
    },
  });

export default i18n;
