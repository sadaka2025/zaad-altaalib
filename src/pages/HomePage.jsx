// src/pages/HomePage.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const { lang } = useParams();

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 🔶 Hero Section */}
      <section className="bg-[#f1f5f9] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e293b] mb-6">{t('hero_title')}</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">{t('hero_description')}</p>
          <Link to={link("/formations")}>
            <button className="bg-blue-600 text-white px-6 py-2 text-lg rounded hover:bg-blue-700">
              📚 {t('explore_courses')}
            </button>
          </Link>
        </div>
      </section>

      {/* 🔸 Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">{t('feature1_title')}</h3>
            <p className="text-gray-600">{t('feature1_desc')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">{t('feature2_title')}</h3>
            <p className="text-gray-600">{t('feature2_desc')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">{t('feature3_title')}</h3>
            <p className="text-gray-600">{t('feature3_desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
