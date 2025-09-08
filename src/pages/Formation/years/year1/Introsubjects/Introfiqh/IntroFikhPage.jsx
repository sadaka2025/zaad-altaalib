// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import data from '../../../../../../datatext/years/year1/datatxtfiqh.json';
import courseDataJSON from '../../../../../../dataIntro/years/year1/dataLesson/lessonListfiqh.json';
import fiqhStats from '../../../../../../datastat/years/year1/fiqh_stats.json';

import Modal from '@components/global/Modal/Modal';
import BooksModal from '../../BooksModal';

/* ---------------------------------------------
   Effet "plume" : composant qui écrit le texte
   ligne par ligne, de droite à gauche.
--------------------------------------------- */
function TypewriterArabic({ lines = [], cps = 35, className = '' }) {
  const [displayed, setDisplayed] = useState(Array(lines.length).fill(''));
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!lines.length) return;

    let charIndex = displayed[lineIndex]?.length || 0;
    const interval = setInterval(
      () => {
        setDisplayed((prev) => {
          const copy = [...prev];
          const currentLine = lines[lineIndex] || '';
          if (charIndex < currentLine.length) {
            copy[lineIndex] = currentLine.slice(0, charIndex + 1);
            charIndex += 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              if (lineIndex + 1 < lines.length) {
                setLineIndex((idx) => idx + 1);
              }
            }, 400);
          }
          return copy;
        });
      },
      Math.max(10, 1000 / cps)
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, lines]);

  // Reset quand les lignes changent
  useEffect(() => {
    setDisplayed(Array(lines.length).fill(''));
    setLineIndex(0);
  }, [lines]);

  return (
    <div className={`space-y-3 ${className}`} dir="rtl">
      {displayed.map((ln, i) => (
        <p
          key={`line-${i}`}
          className="leading-8 text-[1.05rem] md:text-[1.15rem] tracking-wide"
          style={{
            textShadow:
              '0.03em 0.03em 0 rgba(0,0,0,0.05), -0.02em 0 0 rgba(0,0,0,0.04)',
          }}
        >
          {ln}
          {i === lineIndex && ln.length < (lines[i] || '').length && (
            <span className="inline-block w-2 h-5 align-middle bg-gray-800 ml-1 animate-pulse rounded-[1px]" />
          )}
        </p>
      ))}
    </div>
  );
}

export default function IntroFikhPage() {
  const navigate = useNavigate();
  const { lang } = useParams();

  // ✅ lecture paramètre ?semestre=1|2
  const [searchParams] = useSearchParams();
  const semestreParam = searchParams.get('semestre') || '1';

  // ✅ initialiser selon l’URL
  const [selectedSemester, setSelectedSemester] = useState(
    semestreParam === '1' ? 'semester1' : 'semester2'
  );

  const [open, setOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false); // Modal statistiques
  const [isModalLessonsOpen, setIsModalLessonsOpen] = useState(false); // Modal programme (liste des leçons)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false); // ✅ Nouveau : Modal contenu de section (JSON modal)
  const [modalData, setModalData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [conclusion, setConclusion] = useState(null);

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

  const semesterStats = fiqhStats.fiqh.year1[selectedSemester] || {};
  const totalYearStats = fiqhStats.fiqh.year1.totalYear1 || {};
  const sections = Array.isArray(semesterData.lessons)
    ? semesterData.lessons
    : [];

  // ✅ Correction : ouvrir le modal de CONTENU, pas le modal des statistiques
  const handleOpenModal = (section) => {
    if (section.modal) {
      setModalData(section.modal);
      setIsLessonModalOpen(true);
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
              className="text-blue-800 hover:underline font-medium"
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
                      className="text-blue-800 hover:underline"
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

  /* -------------------------------------------------------
     Lignes pour le texte "plume".
     - Si ton JSON contient year1.fiqh[sk].introTextLines, on l’utilise.
     - Sinon, on fabrique un court texte à partir des sections.
  ------------------------------------------------------- */
  const typewriterLines = useMemo(() => {
    const fromData = semesterData?.introTextLines;
    if (Array.isArray(fromData) && fromData.length) return fromData;

    const isS1 = selectedSemester === 'semester1';
    const header = isS1
      ? 'في هذا السداسي الأوّل، نمضي خطوة بخطوة لفهم مبادئ الفقه وتطبيقاته اليومية.'
      : 'في هذا السداسي الثاني، نواصل البناء بإتقان الأبواب المتقدمة وربط العلم بالعمل.';

    const body = (sections || [])
      .slice(0, 4)
      .map((s, i) => `المحور ${i + 1}: ${s?.title || '—'}.`);

    const tail = isS1
      ? 'هدفنا ترسيخ الأصول وتسهيل التدرّج، مع برنامج واضح وتمارين عملية.'
      : 'نركّز هنا على التثبيت والمراجعة، مع تقييمات مرحلية وتقويم نهائي.';

    return [header, ...body, tail];
  }, [sections, semesterData, selectedSemester]);

  return (
    <div className="font-[Arial] max-w-6xl mx-auto p-4 space-y-6">
      {/* === Navigation (fixe) === */}
      <section className="grid md:grid-cols-5 gap-3 text-center mt-8">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 shadow-md"
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
          className="px-4 py-2 rounded-lg font-bold shadow-md"
          style={{
            backgroundColor: '#fef3c7',
            color: '#3b2f1b',
            border: '1px solid #d6b370',
          }}
        >
          ❓ أرسل سؤالاً
        </button>
        <button
          onClick={() => navigate('/ar/annonces')}
          className="px-4 py-2 rounded-lg font-bold shadow-md"
          style={{
            backgroundColor: '#fef3c7',
            color: '#3b2f1b',
            border: '1px solid #d6b370',
          }}
        >
          📢 الإعلانات
        </button>
        <button
          onClick={() => navigate('/ar/profavis')}
          className="px-4 py-2 rounded-lg font-bold shadow-md"
          style={{
            backgroundColor: '#fef3c7',
            color: '#3b2f1b',
            border: '1px solid #d6b370',
          }}
        >
          🧑🏫 تقييم الأستاذ
        </button>
        <button
          onClick={() => navigate('/ar/niveau-debutant')}
          className="px-4 py-2 rounded-lg font-bold shadow-md"
          style={{
            backgroundColor: '#eee1c9',
            color: '#3b2f1b',
            border: '1px solid #d6b370',
          }}
        >
          ← رجوع الى صفحة المواد
        </button>
      </section>

      {/* === Choix semestre === */}
      <div className="flex gap-4 justify-center my-6">
        <button
          className={`px-4 py-2 rounded-lg border font-bold ${
            selectedSemester === 'semester1'
              ? 'bg-blue-800 text-white border-blue-900'
              : 'bg-[#fef3c7] text-[#3b2f1b] border-[#d6b370]'
          }`}
          onClick={() => {
            setSelectedSemester('semester1');
            navigate(`/${lang}/introfiqh?semestre=1`);
          }}
        >
          📘 السداسي الأول
        </button>
        <button
          className={`px-4 py-2 rounded-lg border font-bold ${
            selectedSemester === 'semester2'
              ? 'bg-blue-800 text-white border-blue-900'
              : 'bg-[#fef3c7] text-[#3b2f1b] border-[#d6b370]'
          }`}
          onClick={() => {
            setSelectedSemester('semester2');
            navigate(`/${lang}/introfiqh?semestre=2`);
          }}
        >
          📗 السداسي الثاني
        </button>
      </div>

      {/* === Boutons liés au semestre === */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          onClick={() => setIsModalLessonsOpen(true)}
          className="px-6 py-3 rounded-lg font-bold hover:brightness-110 shadow-md"
          style={{
            backgroundImage: "url('/images/parchment.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#3b2f1b',
            border: '1px solid rgba(60,45,25,0.35)',
          }}
        >
          🎯 برنامج{' '}
          {selectedSemester === 'semester1'
            ? 'السداسي الأول'
            : 'السداسي الثاني'}
        </button>

        <button
          onClick={() => setIsStatsModalOpen(true)}
          className="px-6 py-3 rounded-lg font-bold hover:brightness-110 shadow-md"
          style={{
            backgroundImage: "url('/images/parchment.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#3b2f1b',
            border: '1px solid rgba(60,45,25,0.35)',
          }}
        >
          📊 إحصائيات{' '}
          {selectedSemester === 'semester1'
            ? 'السداسي الأول'
            : 'السداسي الثاني'}
        </button>

        <button
          onClick={() =>
            navigate(
              `/ar/annee/1/matiere/fiqh?semestre=${selectedSemester === 'semester1' ? 1 : 2}`
            )
          }
          className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 shadow-md"
        >
          ▶️ CONTINUE COURSE <ChevronRight className="ml-2 inline" />
        </button>
      </div>

      {/* === TV Split: Gauche vidéo | Droite cadre + parchemin + plume === */}
      <section className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Colonne gauche : vidéo / audio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-3xl mx-auto"
        >
          {semesterData.introAudio ? (
            <audio
              src={semesterData.introAudio}
              controls
              autoPlay
              className="w-full"
            />
          ) : (
            <div className="rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.25)] ring-1 ring-black/10">
              <iframe
                src={semesterData.introVideo}
                title="Intro video"
                className="w-full h-64 md:h-[420px]"
                allowFullScreen
              />
            </div>
          )}
        </motion.div>

        {/* Colonne droite : cadre moderne + carte parchemin avec animation plume */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Cadre "TV" moderne */}
          <div className="bg-neutral-900/95 rounded-2xl p-4 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-4">
              {selectedSemester === 'semester1'
                ? 'هذا السداسي الأول يركّز على 4 أجزاء رئيسية'
                : 'هذا السداسي الثاني يركّز على 4 أجزاء رئيسية'}
            </h2>

            {/* Carte Parchemin */}
            <div
              className="rounded-xl md:rounded-2xl shadow-inner p-4 md:p-6"
              style={{
                backgroundImage: "url('/images/parchment.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 2px 40px rgba(0,0,0,0.25)',
                border: '1px solid rgba(60,45,25,0.35)',
                color: '#2a2216',
              }}
              dir="rtl"
            >
              {/* Animation plume */}
              <TypewriterArabic
                lines={typewriterLines}
                cps={45}
                className="font-[Tajawal] italic"
              />

              {/* 4 parties (sections) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                {sections.map((item, index) => (
                  <div key={index} className="text-right">
                    <div className="h-1 w-10 bg-orange-600/80 mb-2"></div>
                    <p className="font-bold text-gray-700">{item.id}.</p>

                    <h3
                      className={`text-lg font-bold ${
                        item.modal
                          ? 'cursor-pointer hover:text-orange-700 transition'
                          : 'text-gray-900'
                      }`}
                      onClick={() => handleOpenModal(item)}
                      style={{ textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-700/90 text-sm mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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
          }).map(([label, value]) => (
            <div key={label} className="bg-white p-4 rounded-lg shadow">
              <p className="text-xl font-bold">{value}</p>
              <p className="text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Modals dynamiques === */}
      {/* Modal Statistiques (semestre) */}
      <Modal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        title={`📊 Résumé ${selectedSemester === 'semester1' ? 'Semestre 1' : 'Semestre 2'}`}
        content={
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="bg-blue-100 p-4 rounded-xl shadow"
              >
                <p className="text-2xl font-bold">
                  <CountUp end={value} duration={2} />
                </p>
                <p className="text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        }
      />

      {/* Modal Programme (leçons) */}
      <Modal
        isOpen={isModalLessonsOpen}
        onClose={() => setIsModalLessonsOpen(false)}
        title="📚 قائمة دروس الفقه"
        content={lessonContent}
      />

      {/* ✅ Nouveau : Modal CONTENU de section (s1/s2 -> section.modal du JSON) */}
      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title="📖 محتوى الدرس"
        content={modalData ? renderModalContent(modalData) : null}
      />
    </div>
  );
}
