import React from "react";
import { useTranslation } from "react-i18next";

export default function NiveauDebutant() {
  const { t } = useTranslation();

  const subjectKeys = ["fiqh", "aqida", "tajwid", "nahw", "sirah", "hadith", "akhlaq"];

  const translatedSubjects = subjectKeys.map((key) => t(key, { defaultValue: key }));

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/zitouna-bg.jpg')" }}
    >
      <div className="bg-black/60 min-h-screen p-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
            🎓 {t("dashboard_title")}
          </h1>

          <div className="max-w-3xl mx-auto mb-6 shadow-lg rounded overflow-hidden">
            <video controls className="w-full rounded">
              <source src="...mp4" type="video/mp4" />
              {t("video_not_supported")}
            </video>
          </div>
        </div>

        <SectionSemester title={t("semester1")} subjects={translatedSubjects} />
        <SectionSemester title={t("semester2")} subjects={translatedSubjects} />
      </div>
    </div>
  );
}

function SectionSemester({ title, subjects }) {
  if (!Array.isArray(subjects)) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-center text-white mb-6 border-b border-yellow-400 pb-2">
        📘 {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {subjects.map((subject, idx) => (
          <button
            key={idx}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}
