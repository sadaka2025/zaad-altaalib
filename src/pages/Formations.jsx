import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ScrollDownButton from "../components/ScrollDownButton";

export default function Formations() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* 🔹 En-tête */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">
            📚 {t("courses")}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{t("choose_level")}</p>
          <Link
            to={link("/")}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {isRTL ? `${t("back_to_home")} →` : `← ${t("back_to_home")}`}
          </Link>
        </div>

        {/* 🔹 Grille des formations */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
          <FormationCard
            image="/images/debutant.jpg"
            title={t("level1_title")}
            desc={t("level1_desc")}
            to={link("/niveau-debutant")}
          />
          <FormationCard
            image="/images/niveau2.jpg"
            title={t("level2_title")}
            desc={t("level2_desc")}
            to={link("/niveau-2")}
          />
          <FormationCard
            image="/images/intermediate.jpg"
            title={t("level3_title")}
            desc={t("level3_desc")}
            to={link("/niveau-moyen")}
          />
          <FormationCard
            image="/images/niveau4.jpg"
            title={t("level4_title")}
            desc={t("level4_desc")}
            to={link("/niveau-4")}
          />
          <FormationCard
            image="/images/avance.jpg"
            title={t("level5_title")}
            desc={t("level5_desc")}
            to={link("/niveau-avance")}
          />
        </div>
      </div>
      <ScrollToTopButton />
      <ScrollDownButton />
    </div>
  );
}

function FormationCard({ image, title, desc, to }) {
  const { t } = useTranslation();
  return (
    <Link
      to={to}
      className="block bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition hover:scale-105"
    >
      <img
        src={image}
        alt={title}
        className="rounded-md mb-4 h-48 w-full object-cover"
      />
      <h2 className="text-xl font-bold mb-2 text-blue-700">{title}</h2>
      <p className="text-gray-600 mb-4">{desc}</p>
      <div className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 inline-block">
        {t("view_content")}
      </div>
    </Link>
  );
}
