import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import InstructorsSection from "../components/InstructorsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ScrollDownButton from "../components/ScrollDownButton";
import DiplomaSection from "../components/DiplomaSection";

// import Modal from "./Modal1";
// import LoginPage from "./LoginPage";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      console.log("Aucun email trouvé → ouverture modal après 2s");
      const timer = setTimeout(() => {
        setModalOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.log("Email trouvé :", email, "→ modal fermée");
      setModalOpen(false);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    console.log("Connexion réussie → fermeture modal");
    localStorage.setItem("userEmail", email); // 🔹 Enregistre le vrai email
    setModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen bg-sky-100 text-gray-800 ${
        isRTL ? "font-arabic" : ""
      }`}
    >
      {/* Modal
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </Modal> */}

      <Helmet>
        <html lang={i18n.language} />
        <title>{t("seo_home_title")}</title>
        <meta name="description" content={t("seo_home_description")} />
      </Helmet>

      {/* Sections */}
      <div className="mb-8">
        <HeroSection />
      </div>

      <div className="mb-8">
        <BenefitsSection />
      </div>

      <div className="mb-8">
        <DiplomaSection />
      </div>

      <div className="mb-8">
        <InstructorsSection />
      </div>

      <div className="mb-8">
        <TestimonialsSection />
      </div>

      <ScrollToTopButton />
      <ScrollDownButton />
    </div>
  );
}
