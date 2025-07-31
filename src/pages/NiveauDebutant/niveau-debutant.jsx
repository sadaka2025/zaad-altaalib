import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export default function NiveauDebutant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  // Slugs "sources de vérité" -> correspondent aux noms de fichiers JSON: {slug}_data_s1s2.json
  const subjectKeys = useMemo(
    () => ["fiqh", "aqida", "tajwid", "nahw", "sirah", "hadith", "akhlaq"],
    []
  );

  // Traductions pour affichage
  const translatedSubjects = subjectKeys.map((key) => t(key, { defaultValue: key }));

  // Helper: naviguer vers SubjectPage (année 1 ici)
  const navigateToSubject = (subjectSlug, semesterNumber /* 1 | 2 */) => {
    // URL vers la page générique
    navigate(`/${lang}/annee/1/matiere/${subjectSlug}?semestre=${semesterNumber}`);
  };

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
              <source
                src="https://res.cloudinary.com/dlik6kdpg/video/upload/v1752794147/%D9%83%D9%84%D9%85%D8%A9_%D8%AA%D8%B1%D8%AD%D8%A7%D8%A8%D9%8A%D8%A9_%D9%84%D9%81%D8%B6%D9%8A%D9%84%D8%A9_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D8%A7%D9%84%D8%AF%D9%83%D9%80%D8%AA%D9%88%D8%B1_%D9%85%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D9%86%D9%8A%D8%B1_%D8%A7%D9%84%D9%80%D9%83%D9%80%D9%80%D9%85%D9%80%D9%80%D9%86%D8%AA%D8%B1_%D8%B1%D8%A6%D9%80%D9%80%D9%80%D9%80%D9%8A%D8%B3_%D9%85%D8%B4%D9%8A%D8%AE%D8%A9_%D8%AC%D8%A7%D9%85%D8%B9_%D8%A7%D9%84%D8%B2%D9%8A%D8%AA%D9%88%D9%86%D8%A9_%D8%A7%D9%84%D9%85%D8%B9%D9%85%D9%88%D8%B1_v40lhe.mp4"
                type="video/mp4"
              />
              {t("video_not_supported")}
            </video>
          </div>
        </div>

        {/* Semester 1 -> ouvre SubjectPage avec ?semestre=1 */}
        <SectionSemester
          title={t("semester1")}
          subjects={translatedSubjects}
          subjectKeys={subjectKeys}
          onClick={(subjectKey) => navigateToSubject(subjectKey, 1)}
        />

        {/* Semester 2 -> ouvre SubjectPage avec ?semestre=2 */}
        <SectionSemester
          title={t("semester2")}
          subjects={translatedSubjects}
          subjectKeys={subjectKeys}
          onClick={(subjectKey) => navigateToSubject(subjectKey, 2)}
        />
      </div>
    </div>
  );
}

/**
 * @param {{ title: string, subjects: string[], subjectKeys: string[], onClick?: (subjectKey: string)=>void }} props
 */
function SectionSemester({ title, subjects, subjectKeys, onClick }) {
  if (!Array.isArray(subjects)) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-center text-white mb-6 border-b border-yellow-400 pb-2">
        📘 {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {subjects.map((label, idx) => {
          const slug = subjectKeys[idx]; // correspondance 1-1 entre label traduit et slug
          return (
            <button
              key={slug}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-lg"
              onClick={() => onClick?.(slug)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
