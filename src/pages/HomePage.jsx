import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import InstructorsSection from "../components/InstructorsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ScrollDownButton from "../components/ScrollDownButton";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.language === "ar";

  // ✅ لضمان تغيير الاتجاه في <html> أيضًا
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <div className={`min-h-screen bg-white text-gray-800 ${isRTL ? "font-arabic" : ""}`}>

      <Helmet>
        <html lang={i18n.language} />
        <title>{t("seo_home_title")}</title>
        <meta name="description" content={t("seo_home_description")} />
      </Helmet>

      <HeroSection />
      <BenefitsSection />
      <InstructorsSection />
      <TestimonialsSection />
      <ScrollToTopButton />
      <ScrollDownButton />
    </div>
  );
}
