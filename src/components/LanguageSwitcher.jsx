import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLang = (lang) => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const currentLang = pathSegments[0];

    // Si le premier segment est une langue connue, on le remplace
    if (["fr", "ar"].includes(currentLang)) {
      pathSegments[0] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    const newPath = "/" + pathSegments.join("/");
    i18n.changeLanguage(lang);
    navigate(newPath);
  };

  return (
    <div className="flex gap-2 items-center bg-white p-2 rounded shadow">
      <button
        onClick={() => switchLang("fr")}
        className={`px-3 py-1 rounded ${i18n.language === "fr" ? "bg-blue-700 text-white" : "bg-gray-200 text-blue-700"}`}
      >
        FR
      </button>
      <button
        onClick={() => switchLang("ar")}
        className={`px-3 py-1 rounded ${i18n.language === "ar" ? "bg-blue-700 text-white" : "bg-gray-200 text-blue-700"}`}
      >
        AR
      </button>
    </div>
  );
}
