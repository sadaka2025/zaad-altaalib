import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ModalWithLogin from "../pages/ModalWithLogin";
import LogoAnimated from "../pages/LogoAnimated";

export default function Navbar() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Charger la valeur au montage
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  const handleNavClick = (path) => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      navigate(link(path));
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Sauvegarde persistante
    setShowModal(false);
  };

  return (
    <header className="bg-[#1e3a8a] text-white shadow relative">
      <div className="container mx-auto px-6 flex justify-between items-center min-h-[120px] relative z-10 flex-row-reverse">
        {/* Logo */}
        <div className="absolute right-[80px] top-[35%] -translate-y-1/2">
          <LogoAnimated />
        </div>

        {/* Navigation */}
        <nav className="flex gap-2 mr-[220px] items-center">
          <button
            onClick={() => handleNavClick("/")}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-white text-lg"
          >
            {t("home")}
          </button>
          <button
            onClick={() => handleNavClick("/formations")}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-white text-lg"
          >
            {t("courses")}
          </button>
          <button
            onClick={() => handleNavClick("/dashboard-1")}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-white text-lg"
          >
            {t("dashboard")}
          </button>
          <button
            onClick={() => handleNavClick("/contact")}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-white text-lg"
          >
            {t("contact")}
          </button>
        </nav>

        {/* Langues */}
        <div className="ml-4">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Modale */}
      {showModal && (
        <ModalWithLogin
          onLoginSuccess={handleLoginSuccess}
          forceOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </header>
  );
}
