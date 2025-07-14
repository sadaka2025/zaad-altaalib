import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher"; // ✅ ici

export default function Navbar() {
  const { lang } = useParams();
  const { t } = useTranslation();

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  return (
    <header className="bg-[#1e3a8a] text-white py-4 shadow">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📘 زاد الطالب</h1>
        <nav className="flex gap-2">
          <Link to={link("/")} className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white">
            {t("home")}
          </Link>
          <Link to={link("/formations")} className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white">
            {t("courses")}
          </Link>
          <Link to={link("/dashboard-1")} className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white">
            {t("dashboard")}
          </Link>
          <Link to={link("/contact")} className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white">
            {t("contact")}
          </Link>
        </nav>

        {/* ✅ Langue ici */}
        <div className="ml-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
