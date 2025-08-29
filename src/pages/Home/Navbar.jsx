// src/components/Navbar.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/global/Translation/LanguageSwitcher";

import ModalWithLogin from "../../components/global/Modal/ModalWithLogin";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

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
    login();
    setShowModal(false);
  };

  return (
    <header className="bg-[#1e3a8a] text-white py-4 shadow font-sans sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(link("/"))}
          style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
        >
          <span
            role="img"
            aria-label="mosquée"
            className="text-yellow-400 text-3xl"
          >
            🕌
          </span>
          زاد الطالب
        </h1>

        {/* Liens navbar */}
        <nav className="flex gap-4 items-center">
          {["/", "/formations", "/dashboard-1", "/contact"].map((path, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(path)}
              className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded hover:bg-yellow-500 hover:text-white transition"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {t(["home", "courses", "dashboard", "contact"][i])}
            </button>
          ))}
        </nav>

        {/* Traduction + Actions */}
        <div className="flex items-center gap-3">
          {/* Traduction */}
          <div
            className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded hover:bg-yellow-500 hover:text-white transition"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <LanguageSwitcher />
          </div>

          {/* Actions Auth */}
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => setShowModal(true)}
                className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded hover:bg-yellow-500 hover:text-white transition"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {t("signIn")}
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded hover:bg-yellow-500 hover:text-white transition"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {t("getStarted")}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate(link("/"));
              }}
              className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded hover:bg-yellow-500 hover:text-white transition"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {t("logout")}
            </button>
          )}
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
