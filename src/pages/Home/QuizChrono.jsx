// src/pages/QuizChrono.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene from '../Visitors/Scene'; // ✅ importer Scene

// === Import des fichiers leçons ===
import lessonsFiqh from '@/dataIntro/years/year1/dataLesson/lessonListfiqh.json';
import lessonsHadith from '@/dataIntro/years/year1/dataLesson/lessonListhadith.json';
import lessonsAqida from '@/dataIntro/years/year1/dataLesson/lessonListaqida.json';
import lessonsAkhlaq from '@/dataIntro/years/year1/dataLesson/lessonListakhlaq.json';
import lessonsNahw from '@/dataIntro/years/year1/dataLesson/lessonListnahw.json';
import lessonsSirah from '@/dataIntro/years/year1/dataLesson/lessonListsirah.json';
import lessonsTajwid from '@/dataIntro/years/year1/dataLesson/lessonListtajwid.json';

// === Import des fichiers QUIZZES ===
import { QUIZZES_YEAR1 } from '@/dataquizzes/years/year1/quizzesYear1';

const SUBJECTS = {
  Fiqh: lessonsFiqh,
  Hadith: lessonsHadith,
  Aqida: lessonsAqida,
  Akhlaq: lessonsAkhlaq,
  Nahw: lessonsNahw,
  Sirah: lessonsSirah,
  Tajwid: lessonsTajwid,
};

const QUIZZES_BY_YEAR = {
  year1: QUIZZES_YEAR1,
};

export default function QuizChrono() {
  const [selectedYear, setSelectedYear] = useState('year1');
  const [selectedSubject, setSelectedSubject] = useState('Fiqh');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Récupérer les cours ---
  const lessons =
    SUBJECTS[selectedSubject]?.semesters?.[selectedSemester]?.lessons || [];

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.includes(searchQuery)
  );

  // --- Récupérer les quizzes associés ---
  const quizzes =
    QUIZZES_BY_YEAR[selectedYear]?.semesters
      ?.find((s) => s.semester === `Semestre ${selectedSemester}`)
      ?.subjects.find((subj) => subj.name === selectedSubject)?.quizzes || [];

  const handleLessonClick = (lesson, index) => {
    setSelectedLesson(lesson);
    setSelectedQuiz(quizzes[index]); // associer quiz au même index
  };

  // === Gestion progression ===
  const semesterProgress = useMemo(() => {
    const total = quizzes.length;
    if (total === 0) return 0;
    const completed = quizzes.filter((q) => q.completed).length;
    return Math.round((completed / total) * 100);
  }, [quizzes]);

  const globalProgress = useMemo(() => {
    const semesters = QUIZZES_BY_YEAR[selectedYear]?.semesters || [];
    let total = 0;
    let completed = 0;
    semesters.forEach((sem) => {
      sem.subjects.forEach((s) => {
        total += s.quizzes.length;
        completed += s.quizzes.filter((q) => q.completed).length;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [selectedYear]);

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
          src="https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public/videos/abstract-bg3.mp4"
          type="video/mp4"
        />
      </video>
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Ligne supérieure : filtres */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {/* Années */}
          <div className="flex flex-wrap justify-center gap-2">
            {['year1', 'year2', 'year3', 'year4', 'year5'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
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
            {Object.keys(SUBJECTS).map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-4 py-2 rounded-lg ${
                  selectedSubject === subj
                    ? 'bg-green-600 shadow-lg shadow-green-400/50'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {subj}
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
          <span className="text-6xl">👈</span>
          {/* ⚡ Texte animé */}
          <div className="flex justify-center">
            <Scene
              text="صلوا على النبي محمد ﷺ ❤️"
              className="text-[18px] font-amiri font-bold text-right"
            />{' '}
          </div>{' '}
          <span className="text-6xl">👉</span>
        </div>

        {/* Recherche + Progression globale */}
        <div className="flex flex-col items-center p-4 gap-4">
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

        {/* Deux colonnes inversées */}
        <div className="flex flex-1 gap-4 p-6">
          {/* Colonne gauche : liste des cours */}
          <div className="w-2/3 bg-black/40 backdrop-blur-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson, i) => (
              <motion.button
                key={lesson.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLessonClick(lesson, i)}
                className={`p-3 text-sm truncate rounded-xl border text-left ${
                  selectedLesson?.id === lesson.id
                    ? 'bg-green-700 border-green-400 shadow-lg'
                    : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                }`}
              >
                <h3 className="font-bold">Cours {lesson.id}</h3>
                <p>{lesson.title}</p>
              </motion.button>
            ))}
          </div>

          {/* Colonne droite : boutons actions */}
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
                disabled={!selectedQuiz}
                className="w-full px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-lg font-bold shadow-lg disabled:opacity-40"
              >
                🚀 Commencer le Quiz
              </button>

              {/* Progression semestre */}
              <button className="w-full px-4 py-3 rounded-lg bg-blue-600 font-bold">
                📊 Progression S{selectedSemester} : {semesterProgress}%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modale Quiz */}
      <AnimatePresence>
        {isModalOpen && selectedQuiz && (
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
                {/* Bloc gauche : titre + Scene animé */}
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold">
                    {selectedLesson?.title || 'Quiz'}
                  </h2>{' '}
                  👈{/* ⚡ Texte animé */}
                  <div className="flex justify-center">
                    <Scene
                      text="صلوا على النبي محمد ﷺ ❤️"
                      className="text-[18px] font-amiri font-bold text-right"
                    />{' '}
                  </div>{' '}
                  👉
                </div>

                {/* Bouton fermer */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700"
                >
                  ✖ Fermer
                </button>
              </div>

              <iframe
                src={selectedQuiz.url || selectedQuiz}
                title="Quiz"
                className="flex-1 rounded-b-2xl"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
