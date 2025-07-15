import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.language === "ar";

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  return (
    <div className="min-h-screen bg-white text-gray-800" dir={isRTL ? "rtl" : "ltr"}>
      {/* ✅ Helmet بدون dir */}
      <Helmet>
        <html lang={i18n.language} />
        <title>{t("seo_home_title")}</title>
        <meta name="description" content={t("seo_home_description")} />
      </Helmet>

      {/* ✅ Hero Section */}
      <section className="bg-[#f1f5f9] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1e293b] mb-6">
            {t("hero_title")}
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t("hero_description")}
          </p>
          <div className="text-center">
            <Link to={link("/formations")}>
              <button className="bg-blue-600 text-white px-6 py-2 text-lg rounded hover:bg-blue-700">
                📚 {t("explore_courses")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">
              {t("feature1_title")}
            </h3>
            <p className="text-gray-600">{t("feature1_desc")}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">
              {t("feature2_title")}
            </h3>
            <p className="text-gray-600">{t("feature2_desc")}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">
              {t("feature3_title")}
            </h3>
            <p className="text-gray-600">{t("feature3_desc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
