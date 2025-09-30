import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLang = (lang) => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentLang = pathSegments[0];

    if (["fr", "ar", "en"].includes(currentLang)) {
      pathSegments[0] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    const newPath = "/" + pathSegments.join("/");

    // 🔹 Change la langue
    i18n.changeLanguage(lang);

    // 🔹 Sauvegarde dans localStorage
    localStorage.setItem("i18nextLng", lang);

    // 🔹 Met à jour la direction RTL/LTR
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // 🔹 Navigation vers la nouvelle URL
    navigate(newPath);
  };

  // 🔹 Langue courante (sans région)
  const currentLang = i18n.language.split("-")[0];

  return (
    <div className="flex gap-2 items-center bg-white p-2 rounded shadow">
      <button
        onClick={() => switchLang("fr")}
        className={`px-3 py-1 rounded ${
          currentLang === "fr"
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-blue-700"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchLang("ar")}
        className={`px-3 py-1 rounded ${
          currentLang === "ar"
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-blue-700"
        }`}
      >
        AR
      </button>
      <button
        onClick={() => switchLang("en")}
        className={`px-3 py-1 rounded ${
          currentLang === "en"
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-blue-700"
        }`}
      >
        EN
      </button>
    </div>
  );
}
