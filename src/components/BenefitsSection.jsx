import React from "react";
import { useTranslation } from "react-i18next";

export default function BenefitsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white benefits-section" id="benefits-section">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <img
            src="/images/science-benefits.jpg"
            alt={t("benefits.imageAlt")}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-[#1e293b]">
            🌿 {t("benefits.title")}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t("benefits.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
