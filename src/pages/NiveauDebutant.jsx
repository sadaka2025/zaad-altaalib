import React from "react";
import { useTranslation } from "react-i18next";

export default function NiveauDebutant() {
  const { t } = useTranslation();

  const subjects = [
    { key: "fiqh" },
    { key: "aqida" },
    { key: "tajwid" },
    { key: "nahw" },
    { key: "sirah" },
    { key: "hadith" },
    { key: "akhlaq" },
  ];

  const renderTable = (titleKey, semester) => (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700">{t(titleKey)}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((subject, index) => (
          <button
            key={`${semester}-${index}`}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            {t(subject.key)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-10">
          🏫 {t("dashboard_title")}
        </h1>
        {renderTable("semester1", "S1")}
        {renderTable("semester2", "S2")}
      </div>
    </div>
  );
}
