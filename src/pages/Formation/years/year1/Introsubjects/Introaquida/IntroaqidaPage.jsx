// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import data from '../../../../../../datatext/years/year1/datatxtfiqh.json';
import courseDataJSON from '../../../../../../dataIntro/years/year1/dataLesson/lessonListfiqh.json';
import fiqhStats from '../../../../../../datastat/years/year1/fiqhstat.json';

import Modal from '@components/global/Modal/Modal';
import BooksModal from '../../BooksModal';

// ❌ AUCUNE "interface" ici → sinon erreur
// ❌ Pas de type, juste du JS

export default function IntroaqidaPage() {
  const [selectedSemester, setSelectedSemester] = useState('semester1');
  const [showVideo, setShowVideo] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalLessonsOpen, setIsModalLessonsOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [conclusion, setConclusion] = useState(null);

  const navigate = useNavigate();
  const { lang } = useParams();

  const semesterKey = selectedSemester === 'semester1' ? 's1' : 's2';
  const semesterData = data.year1.fiqh[semesterKey];

  useEffect(() => {
    const semesterIndex = selectedSemester === 'semester1' ? '1' : '2';
    const semesterCourseData = courseDataJSON.semesters[semesterIndex];
    if (semesterCourseData) {
      setLessons(semesterCourseData.lessons || []);
      setConclusion(semesterCourseData.conclusion || null);
    }
  }, [selectedSemester]);

  // 👉 on cast en any pour éviter erreurs
  const semesterStats = fiqhStats.fiqh.year1[selectedSemester] || {};
  const totalYearStats = fiqhStats.fiqh.year1.totalYear1 || {};
  const sections = Array.isArray(semesterData.lessons)
    ? semesterData.lessons
    : [];

  const handleOpenModal = (section) => {
    if (section.modal) {
      setModalData(section.modal);
      setIsModalOpen(true);
    }
  };

  const renderModalContent = (modal) => (
    <div className="text-right leading-relaxed space-y-4">
      {modal.quote && (
        <p className="font-semibold text-lg text-center">{modal.quote}</p>
      )}
      {modal.intro && <p>{modal.intro}</p>}
      {modal.poem && (
        <p>
          <em>{modal.poem}</em>
        </p>
      )}
      {modal.listTitle && (
        <h3 className="font-bold text-blue-700">{modal.listTitle}</h3>
      )}
      {modal.listItems && (
        <ul className="list-disc pr-5 space-y-1">
          {modal.listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {modal.summary && <p className="mt-4">{modal.summary}</p>}
    </div>
  );

  const goToLesson = (lessonId) => {
    navigate(
      `/ar/annee/1/matiere/fiqh?semestre=${selectedSemester === 'semester1' ? 1 : 2}&lesson=${lessonId}`
    );
    setIsModalLessonsOpen(false);
  };
  const lessonContent = (
    <div
      className="text-right space-y-3"
      style={{ backgroundImage: "url('/images/OIP.jpeg')" }}
    >
      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <button
              onClick={() => goToLesson(lesson.id)}
              className="text-blue-700 hover:underline"
            >
              {lesson.title}
            </button>
          </li>
        ))}
      </ul>

      {conclusion && (
        <div className="mt-4 border-t pt-3">
          <h2 className="font-bold mb-2 text-right">{conclusion.title}</h2>
          {conclusion.sections.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-semibold mb-2 text-right">{section.title}</h3>
              <ul className="list-disc list-inside text-right space-y-1">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => console.log('Item clicked:', item.id)}
                      className="text-blue-700 hover:underline"
                    >
                      {item.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="font-[Arial] max-w-6xl mx-auto p-4 space-y-6">
      {/* === Navigation === */}
      <section className="grid md:grid-cols-5 gap-3 text-center mt-8">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          📚 مقرّر المادة
        </button>

        <BooksModal
          isOpen={open}
          onClose={() => setOpen(false)}
          subjectKey="fiqh"
        />

        <button
          onClick={() => navigate('/ar/avis')}
          className="bg-yellow-200 text-yellow-900 p-3 rounded hover:bg-yellow-300"
        >
          ❓ أرسل سؤالاً
        </button>
        <button
          onClick={() => navigate('/ar/annonces')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded"
        >
          📢 الإعلانات
        </button>
        <button
          onClick={() => navigate('/ar/profavis')}
          className="bg-green-100 hover:bg-green-200 text-green-900 p-3 rounded"
        >
          🧑🏫 تقييم الأستاذ
        </button>
        <button
          onClick={() => navigate('/ar/niveau-debutant')}
          className="bg-purple-100 hover:bg-purple-200 text-purple-900 p-3 rounded"
        >
          رجوع الى صفحة المواد
        </button>
      </section>

      {/* === Choix semestre === */}
      <div className="flex gap-4 justify-center my-6">
        <button
          className={`px-4 py-2 rounded-lg border ${selectedSemester === 'semester1' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setSelectedSemester('semester1')}
        >
          📘 السداسي الأول
        </button>
        <button
          className={`px-4 py-2 rounded-lg border ${selectedSemester === 'semester2' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setSelectedSemester('semester2')}
        >
          📗 السداسي الثاني
        </button>
      </div>

      {/* === Video + Sections === */}
      <section className="grid md:grid-cols-2 gap-4 items-start">
        {/* Colonne gauche */}
        <div className="relative w-full max-w-3xl mx-auto">
          {semesterData.introAudio ? (
            // ✅ Cas AUDIO natif
            <audio
              src={semesterData.introAudio}
              controls
              autoPlay
              className="w-full"
            />
          ) : (
            // ✅ Cas IFRAME (Google Drive ou autre)
            <iframe
              src={semesterData.introVideo}
              title="Intro video"
              className="w-full h-64 md:h-96 rounded-lg shadow-lg"
              allowFullScreen
            />
          )}

          <div className="text-center mt-4">
            <button
              onClick={() =>
                navigate(
                  `/ar/annee/1/matiere/fiqh?semestre=${selectedSemester === 'semester1' ? 1 : 2}`
                )
              }
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-xl mt-2"
            >
              CONTINUER LE COURS <ChevronRight className="ml-2 inline" />
            </button>
          </div>
        </div>

        {/* Colonne droite */}
        <div dir="rtl" className="bg-white py-12 text-center font-[Tajawal]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            {selectedSemester === 'semester1'
              ? 'هذا السداسي الأول يركز على 4 أجزاء رئيسية'
              : 'هذا السداسي الثاني يركز على 4 أجزاء رئيسية'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-16">
            {sections.map((item, index) => (
              <div key={index} className="text-right">
                <div className="h-1 w-10 bg-orange-500 mb-3"></div>
                <p className="font-bold text-gray-600">{item.id}.</p>

                <h3
                  className={`text-xl font-bold ${item.modal ? 'cursor-pointer hover:text-orange-600 transition' : 'text-gray-900'}`}
                  onClick={() => handleOpenModal(item)}
                >
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => setIsModalLessonsOpen(true)}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-orange-600 transition"
            >
              🎯 برنامج{' '}
              {selectedSemester === 'semester1'
                ? 'السداسي الأول'
                : 'السداسي الثاني'}
            </button>

            <a
              href="#stats"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-blue-700 transition"
            >
              📊 إحصائيات{' '}
              {selectedSemester === 'semester1'
                ? 'السداسي الأول'
                : 'السداسي الثاني'}
            </a>
          </div>
        </div>
      </section>

      {/* === Résumé Statistiques === */}
      <section id="stats" className="mt-12">
        <h2 className="text-center font-bold text-xl mb-4">
          📊 Résumé{' '}
          {selectedSemester === 'semester1' ? 'Semestre 1' : 'Semestre 2'}{' '}
          (Fiqh)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {Object.entries({
            '🎥 Vidéos': semesterStats.videos || 0,
            '📄 PDF résumé': semesterStats.summaryPDF || 0,
            '📝 Quiz cours': semesterStats.quizCourse || 0,
            '📊 Quiz semestre': semesterStats.quizSemester || 0,
            '🏆 Examen final': semesterStats.finalExam || 0,
            '📚 Total Quiz': semesterStats.totalQuiz || 0,
          }).map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-blue-200 p-4 rounded-xl shadow"
            >
              <p className="text-2xl font-bold">
                <CountUp end={value} duration={2} />
              </p>
              <p className="text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === Résumé Année 1 === */}
      <section className="mt-12 bg-blue-50 p-6 rounded-xl shadow">
        <h2 className="text-center font-bold text-xl mb-4">
          📈 إحصائيات السنة كاملة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {Object.entries({
            '🎥 Vidéos': totalYearStats.videos || 0,
            '📄 PDF résumé': totalYearStats.summaryPDF || 0,
            '📝 Quiz cours': totalYearStats.quizCourse || 0,
            '📊 Quiz semestres': totalYearStats.quizSemester || 0,
            '🏆 Examens finaux': totalYearStats.finalExam || 0,
            '📚 Total Quiz': totalYearStats.totalQuiz || 0,
          }).map(([label, value], i) => (
            <div key={label} className="bg-white p-4 rounded-lg shadow">
              <p className="text-xl font-bold">{value}</p>
              <p className="text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Modals dynamiques === */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalData?.title || ''}
        content={modalData ? renderModalContent(modalData) : null}
      />

      <Modal
        isOpen={isModalLessonsOpen}
        onClose={() => setIsModalLessonsOpen(false)}
        title="📚 قائمة دروس الفقه"
        content={lessonContent}
      />
    </div>
  );
}
