import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Modal from "@components/global/Modal/Modal";
import ScrollToTopButton from "@components/global/scroll/ScrollToTopButton";
import ScrollDownButton from "@components/global/scroll/ScrollDownButton";

export default function NiveauDebutant() {
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const subjectKeys = [
    "fiqh",
    "aqida",
    "tajwid",
    "nahw",
    "sirah",
    "hadith",
    "akhlaq",
  ];
  const translatedSubjects = subjectKeys.map((key) =>
    t(key, { defaultValue: key })
  );

  return (
    <div
      className="bg-cover bg-center text-white pt-4 min-h-screen flex flex-col items-center"
      style={{ backgroundImage: "url('/images/zitouna-bg.jpg')" }}
    >
      <div className="bg-black/70 p-4 flex flex-col items-center justify-start w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center mb-6">
          🎓 {t("dashboard_title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Bloc Vidéo */}
          <div className="w-full max-w-4xl mb-6">
            <h2 className="text-white text-2xl font-bold mb-2 text-center">
              🎓 كلمة افتتاحية بمناسبة بداية السنة الدراسية
            </h2>

            <div className="relative">
              <iframe
                className="w-full rounded-lg shadow-lg aspect-video"
                src="https://res.cloudinary.com/dlik6kdpg/video/upload/v1752794147/%D9%83%D9%84%D9%85%D8%A9_%D8%AA%D8%B1%D8%AD%D8%A7%D8%A8%D9%8A%D8%A9_%D9%84%D9%81%D8%B6%D9%8A%D9%84%D8%A9_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D8%A7%D9%84%D8%AF%D9%83%D9%80%D8%AA%D9%88%D8%B1_%D9%85%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D9%86%D9%8A%D8%B1_%D8%A7%D9%84%D9%80%D9%83%D9%80%D9%80%D9%85%D9%80%D9%80%D9%86%D8%AA%D8%B1_%D8%B1%D8%A6%D9%80%D9%80%D9%80%D9%80%D9%8A%D8%B3_%D9%85%D8%B4%D9%8A%D8%AE%D8%A9_%D8%AC%D8%A7%D9%85%D8%B9_%D8%A7%D9%84%D8%B2%D9%8A%D8%AA%D9%88%D9%86%D8%A9_%D8%A7%D9%84%D9%85%D8%B9%D9%85%D9%88%D8%B1_v40lhe.mp4"
                title="كلمة افتتاحية"
                allowFullScreen
              ></iframe>

              <button
                onClick={() => setShowModal(true)}
                className="absolute bottom-2 end-2 bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded shadow text-sm"
              >
                ⛶ تكبير
              </button>
            </div>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="🎓 كلمة افتتاحية بمناسبة بداية السنة الدراسية"
              content={
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://res.cloudinary.com/dlik6kdpg/video/upload/v1752794147/%D9%83%D9%84%D9%85%D8%A9_%D8%AA%D8%B1%D8%AD%D8%A7%D8%A8%D9%8A%D8%A9_%D9%84%D9%81%D8%B6%D9%8A%D9%84%D8%A9_%D8%A7%D9%84%D8%B4%D9%8A%D8%AE_%D8%A7%D9%84%D8%AF%D9%83%D9%80%D8%AA%D9%88%D8%B1_%D9%85%D9%80%D9%80%D9%80%D9%80%D9%80%D9%80%D9%86%D9%8A%D8%B1_%D8%A7%D9%84%D9%80%D9%83%D9%80%D9%80%D9%85%D9%80%D9%80%D9%86%D8%AA%D8%B1_%D8%B1%D8%A6%D9%80%D9%80%D9%80%D9%80%D9%8A%D8%B3_%D9%85%D8%B4%D9%8A%D8%AE%D8%A9_%D8%AC%D8%A7%D9%85%D8%B9_%D8%A7%D9%84%D8%B2%D9%8A%D8%AA%D9%88%D9%86%D8%A9_%D8%A7%D9%84%D9%85%D8%B9%D9%85%D9%88%D8%B1_v40lhe.mp4"
                    title="كلمة افتتاحية"
                    allowFullScreen
                  ></iframe>
                </div>
              }
            />
          </div>

          {/* Bloc Semestres */}
          <div className="flex flex-col gap-8 max-h-[500px] overflow-y-auto pr-2">
            <SectionSemester
              title={t("semester1")}
              subjects={translatedSubjects}
              subjectKeys={subjectKeys}
              semesterNumber={1}
            />
            <SectionSemester
              title={t("semester2")}
              subjects={translatedSubjects}
              subjectKeys={subjectKeys}
              semesterNumber={2}
            />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
      <ScrollDownButton />
    </div>
  );
}

function SectionSemester({ title, subjects, subjectKeys, semesterNumber }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handleClick = (subjectKey) => {
    navigate(
      `/${lang}/annee/1/matiere/${subjectKey}?semestre=${semesterNumber}`
    );
  };

  if (!Array.isArray(subjects)) return null;

  return (
    <div className="bg-black/30 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-center text-yellow-300 mb-4">
        📘 {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {subjects.map((subject, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(subjectKeys[idx])}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl shadow-md transition"
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}
