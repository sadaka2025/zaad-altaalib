// src/components/Navbar.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ModalWithLogin from "../pages/ModalWithLogin";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth(); // ✅ ajout logout

  const [showModal, setShowModal] = useState(false);

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  const handleNavClick = (path) => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      navigate(link(path));
    }
  };

  const handleLoginSuccess = () => {
    login(); // ✅ Auth global
    setShowModal(false);
  };

  return (
    <header className="bg-[#1e3a8a] text-white py-4 shadow">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📘 زاد الطالب</h1>

        {/* Logout visible uniquement si connecté */}
        {isAuthenticated && (
          <button
            onClick={() => {
              logout();
              navigate(link("/")); // retourne à la home page
            }}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}

        {/* Navigation */}
        <nav className="flex gap-2 items-center flex-shrink-0">
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

        {/* Langue */}
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
