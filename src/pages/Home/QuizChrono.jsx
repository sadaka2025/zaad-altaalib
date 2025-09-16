//
import React, { useState } from 'react';
import { QUIZZES } from '../../dataquizzes/quizzes';
import { useTranslation } from 'react-i18next';

export default function QuizChrono() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(0);

  if (!QUIZZES || QUIZZES.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-bold">
        ⚠️ Erreur : fichier QUIZZES vide ou mal structuré
      </div>
    );
  }

  const year = QUIZZES[selectedYear];
  const semester = year?.semesters?.[selectedSemester];
  const subject = semester?.subjects?.[selectedSubject];

  return (
    <div className="relative min-h-screen text-white">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/intro-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 pt-10 pb-20 px-6 flex flex-col items-center">
        {/* Sélecteur Année */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {QUIZZES.map((y, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedYear(i);
                setSelectedSemester(0);
                setSelectedSubject(0);
              }}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition ${
                i === selectedYear
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {y.year}
            </button>
          ))}
        </div>

        {/* Sélecteur Semestre */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {year.semesters.map((sem, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedSemester(i);
                setSelectedSubject(0);
              }}
              className={`px-5 py-2 rounded-xl shadow-md font-semibold transition ${
                i === selectedSemester
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {sem.semester}
            </button>
          ))}
        </div>

        {/* Sélecteur Matière */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {semester.subjects.map((subj, i) => (
            <button
              key={i}
              onClick={() => setSelectedSubject(i)}
              className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
                i === selectedSubject
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {t(subj.name, { defaultValue: subj.name })}
            </button>
          ))}
        </div>

        {/* Liste des Quizzes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
          {subject?.quizzes?.map((url, i) => (
            <a
              key={i}
              href={`#quiz-${i}`}
              className="block bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-lg hover:bg-white/20 transition"
            >
              Quiz {i + 1}
            </a>
          ))}
        </div>

        {/* Affichage Quizzes */}
        <div className="mt-10 w-full max-w-5xl space-y-10">
          {subject?.quizzes?.map((url, i) => (
            <div
              key={i}
              id={`quiz-${i}`}
              className="bg-black rounded-xl shadow-lg overflow-hidden"
            >
              <iframe
                src={url}
                title={`Quiz ${i + 1}`}
                className="w-full h-[600px] border-0"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
