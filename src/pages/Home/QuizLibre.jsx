// src/pages/QuizLibre.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Scene from '../Visitors/Scene';
import ConfettiBouquet from '../../components/button/ConfettiBouquet';
import ConfettiDhikrTawakol from '../../components/button/ConfettiDhikrTawakol';
import { useNavigate } from 'react-router-dom';

// === Import des données subjects.json ===
import subjectsDataYear1 from '../../dataIntro/years/year1/subjects.json';
import subjectsDataYear2 from '../../dataIntro/years/year2/subjects.json';
import subjectsDataYear3 from '../../dataIntro/years/year3/subjects.json';
import subjectsDataYear4 from '../../dataIntro/years/year4/subjects.json';
import subjectsDataYear5 from '../../dataIntro/years/year5/subjects.json';

const YEARS_DATA = {
  year1: subjectsDataYear1,
  year2: subjectsDataYear2,
  year3: subjectsDataYear3,
  year4: subjectsDataYear4,
  year5: subjectsDataYear5,
};

export default function QuizLibre() {
  const [selectedYear, setSelectedYear] = useState('year1');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedQuizPath, setSelectedQuizPath] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const subjects = YEARS_DATA[selectedYear]?.subjects || [];
  const subject =
    subjects.find((s) => s.title === selectedSubject) || subjects[0];

  // Récupération des cours
  const lessons =
    subject?.semesters?.[selectedSemester]?.lessons?.map((lesson) => ({
      ...lesson,
      quizPath: `/dataquizCourse/years/${selectedYear}/s${selectedSemester}/${subject.slug}/${subject.slug}_course${lesson.id}.json`,
    })) || [];

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // === Progressions ===
  const semesterProgress = useMemo(() => {
    const total = lessons.length;
    if (total === 0) return 0;
    const completed = lessons.filter((l) => l.completed).length;
    return Math.round((completed / total) * 100);
  }, [lessons]);

  const globalProgress = useMemo(() => {
    let total = 0;
    let completed = 0;
    subjects.forEach((s) => {
      Object.values(s.semesters).forEach((sem) => {
        total += sem.lessons.length;
        completed += sem.lessons.filter((l) => l.completed).length;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [subjects]);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setSelectedQuizPath(lesson.quizPath);
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Vidéo de fond */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public/videos/abstract-bg2.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Ligne supérieure : filtres */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {/* Années */}
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(YEARS_DATA).map((year) => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedSubject(null);
                }}
                className={`px-4 py-2 rounded-lg ${
                  selectedYear === year
                    ? 'bg-blue-600 shadow-lg shadow-blue-400/50'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {year.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Matières */}
          <div className="flex flex-wrap justify-center gap-2">
            {subjects.map((subj) => (
              <button
                key={subj.slug}
                onClick={() => setSelectedSubject(subj.title)}
                className={`px-4 py-2 rounded-lg ${
                  selectedSubject === subj.title
                    ? 'bg-green-600 shadow-lg shadow-green-400/50'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {subj.title}
              </button>
            ))}
          </div>

          {/* Semestres */}
          <div className="flex justify-center gap-2">
            {['1', '2'].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-4 py-2 rounded-lg ${
                  selectedSemester === sem
                    ? 'bg-purple-600 shadow-lg shadow-purple-400/50'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Semestre {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Recherche + progression */}
        <div className="flex flex-col items-center p-4 gap-4">
          {/* 🔙 Bouton retour en haut à droite */}
          <button
            onClick={() => navigate(-1)}
            className="absolute  right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow text-sm z-50"
            aria-label="رجوع"
          >
            🔙 رجوع
          </button>
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 w-full max-w-md text-center"
          />
          <div className="w-full max-w-md">
            <div className="h-4 bg-gray-700 rounded-lg overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${globalProgress}%` }}
              ></div>
            </div>
            <p className="text-center mt-1 text-sm">
              Progression globale : {globalProgress}%
            </p>
          </div>
        </div>

        {/* Deux colonnes */}
        <div className="flex flex-1 gap-4 p-6">
          {/* Liste des cours */}
          <div className="w-2/3 bg-black/40 backdrop-blur-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => (
              <ConfettiBouquet
                key={lesson.id}
                lesson={lesson}
                onClick={() => handleLessonClick(lesson)}
                className={`p-3 text-sm truncate rounded-xl border text-left ${
                  selectedLesson?.id === lesson.id
                    ? 'bg-green-700 border-green-400 shadow-lg'
                    : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                }`}
              >
                <h3 className="font-bold">Cours {lesson.id}</h3>
                <p>{lesson.title}</p>
              </ConfettiBouquet>
            ))}
          </div>

          {/* Boutons actions */}
          <div className="w-1/3 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl p-6 shadow-2xl border border-green-500/30 relative">
            <div className="absolute inset-0 rounded-2xl border-2 border-green-400/50 animate-pulse"></div>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <button className="w-full px-4 py-3 rounded-lg bg-gray-800 text-lg font-bold shadow-lg">
                {selectedLesson
                  ? selectedLesson.title
                  : 'Sélectionnez un cours'}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!selectedQuizPath}
                className="w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-lg font-bold shadow-lg disabled:opacity-40"
              >
                🚀 Commencer le Quiz
              </button>

              <button className="w-full px-4 py-3 rounded-lg bg-blue-600 font-bold">
                📊 Progression S{selectedSemester} : {semesterProgress}%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modale Quiz */}
      <AnimatePresence>
        {isModalOpen && selectedQuizPath && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl shadow-2xl w-[90%] h-[90%] relative flex flex-col"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold">
                    {selectedLesson?.title || 'Quiz'}
                  </h2>
                  👈
                  <Scene
                    text="صلوا على النبي محمد ﷺ ❤️"
                    className="text-[18px] font-amiri font-bold text-right"
                  />
                  👉
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700"
                >
                  ✖ Fermer
                </button>
              </div>

              <iframe
                src={`/quiz-course?json=${encodeURIComponent(selectedQuizPath)}`}
                title="Quiz"
                className="flex-1 rounded-b-2xl"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confettis */}
      <ConfettiDhikrTawakol />
      <div
        id="confetti-container"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />
    </div>
  );
}
