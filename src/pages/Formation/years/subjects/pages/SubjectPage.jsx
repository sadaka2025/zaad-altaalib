import React, { useEffect, useMemo, useState } from 'react';
import Scene from '../../../../Visitors/Scene';

import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ScrollToTopButton from '../../../../../components/scroll/ScrollToTopButton';
import ScrollDownButton from '../../../../../components/scroll/ScrollDownButton';
import Modal from '../../../../../components/Modal/Modal';
import { useSubjectData } from '../hooks/useSubjectData';
import ConfettiDhikrTawakol from '../../../../../components/button/ConfettiDhikrTawakol';

export default function SubjectPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const { year = '1', subjectSlug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sem = searchParams.get('semestre') || '1';

  const { data, pending, error } = useSubjectData(year, subjectSlug);

  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [selectedTab, setSelectedTab] = useState('video');
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const tabs = data?.meta?.tabs || [];
  const tabLabels = data?.meta?.tabLabels || {};
  const semesterBlock = data?.semesters?.[sem] || {
    lessons: [],
    contentLinks: {},
  };

  const allLessons = [...(semesterBlock.lessons || [])];

  if (semesterBlock.conclusion) {
    semesterBlock.conclusion.sections.forEach((section) => {
      section.items.forEach((item) => {
        allLessons.push({
          id: item.id,
          title: item.label,
          isConclusion: true,
          tabs: item.tabs,
          tabLabels: item.tabLabels,
          links: item.links,
        });
      });
    });
  }

  useEffect(() => {
    const firstLessonId = allLessons.length > 0 ? allLessons[0].id : 1;
    setSelectedLessonId(firstLessonId);
    setSelectedTab(tabs[0] || 'video');
    setOpenSubmenus({ [firstLessonId]: true });
  }, [sem, data]);

  const selectedLesson = useMemo(() => {
    return allLessons.find((l) => String(l.id) === String(selectedLessonId));
  }, [allLessons, selectedLessonId]);

  const currentTabIndex = useMemo(() => {
    const list = selectedLesson?.isConclusion ? selectedLesson.tabs : tabs;
    return Math.max(0, list.indexOf(selectedTab));
  }, [tabs, selectedTab, selectedLesson]);

  const toggleSubmenu = (lessonId) => {
    setOpenSubmenus((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  const setSem = (newSem) => {
    searchParams.set('semestre', newSem);
    setSearchParams(searchParams, { replace: true });
  };

  const getDownloadLink = () => {
    const cid = String(selectedLessonId);
    const content = semesterBlock.contentLinks?.[cid];
    if (!content && selectedLesson?.isConclusion) {
      return selectedLesson.links?.[selectedTab];
    }
    if (!content) return null;
    if (selectedTab === 'video') return content.videoDownload;
    if (selectedTab === 'summaryPDF') return content.summaryDownload;
    if (selectedTab === 'textExtraction') return content.textExtraction;
    if (selectedTab === 'qna') return content.qna;
    return null;
  };

  const handleTabNext = () => {
    const list = selectedLesson?.isConclusion ? selectedLesson.tabs : tabs;
    const i = list.indexOf(selectedTab);
    if (i < list.length - 1) setSelectedTab(list[i + 1]);
  };

  const handleTabPrev = () => {
    const list = selectedLesson?.isConclusion ? selectedLesson.tabs : tabs;
    const i = list.indexOf(selectedTab);
    if (i > 0) setSelectedTab(list[i - 1]);
  };

  const openModalWithContent = () => {
    const link = selectedLesson?.isConclusion
      ? selectedLesson.links?.[selectedTab]
      : semesterBlock.contentLinks?.[String(selectedLessonId)]?.[selectedTab];

    const tabLabel = selectedLesson?.isConclusion
      ? selectedLesson.tabLabels?.[selectedTab]
      : tabLabels?.[selectedTab];

    setModalTitle(`${selectedLesson?.title || ''} - ${tabLabel}`);
    setModalContent(
      <iframe
        src={link}
        className="w-full h-[80vh] rounded"
        allowFullScreen
        title={selectedLesson?.title}
      />
    );
    setModalOpen(true);
  };

  if (pending) return <div className="p-6 text-center">⏳ Chargement…</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!data) return <div className="p-6 text-center">Aucune donnée.</div>;

  return (
    <>
        <ConfettiDhikrTawakol />
      <div className="flex h-screen bg-blue-50">
        {/* SIDEBAR */}
        <aside className="w-96 bg-blue-100 p-4 border-l border-blue-400 flex flex-col overflow-y-auto">
          <div className="flex flex-col gap-4">
            <h2 className="text-center font-bold text-lg">
              📚 {data.meta.title.ar} — {data.meta.title.fr}
            </h2>

            <div className="flex gap-2 justify-center">
              {['1', '2'].map((s) => (
                <button
                  key={s}
                  className={`px-3 py-1 rounded ${
                    sem === s
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-blue-700 border'
                  }`}
                  onClick={() => setSem(s)}
                >
                  S{s}
                </button>
              ))}
            </div>

            {/* Boutons alignés horizontalement */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <Link
                to="/"
                className="bg-white text-blue-700 px-3 py-2 rounded shadow hover:bg-blue-200"
              >
                🏠 Accueil
              </Link>

              <Link
                to={`/${lang}/formations`}
                className="bg-white text-blue-700 px-3 py-2 rounded shadow hover:bg-blue-200"
              >
                ← Année {year}
              </Link>

              <Link
                to={`/${lang}/intro/${year}/${subjectSlug}?semestre=${sem}`}
                className="bg-white text-blue-700 px-3 py-2 rounded shadow hover:bg-blue-200"
              >
                🎯 أهداف السداسي {sem === '1' ? 'الأول' : 'الثاني'}
              </Link>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {allLessons.map((lesson) => (
              <li key={lesson.id}>
                <button
                  onClick={() => {
                    setSelectedLessonId(lesson.id);
                    setSelectedTab((lesson.tabs || tabs)[0] || 'video');
                  }}
                  className={`w-full text-right px-2 py-2 rounded font-semibold flex justify-between items-center ${
                    String(selectedLessonId) === String(lesson.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-200 hover:bg-blue-300 text-blue-900'
                  }`}
                >
                  <span className="text-sm">{lesson.title}</span>
                  <span
                    className="text-lg cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSubmenu(lesson.id);
                    }}
                  >
                    {openSubmenus[lesson.id] ? '−' : '+'}
                  </span>
                </button>

                {openSubmenus[lesson.id] && (
                  <ul className="pl-4 mt-2 space-y-1">
                    {(lesson.tabs || tabs).map((tab) => (
                      <li key={tab}>
                        <button
                          onClick={() => {
                            setSelectedLessonId(lesson.id);
                            setSelectedTab(tab);
                          }}
                          className={`text-sm w-full text-right px-2 py-1 rounded hover:bg-blue-300 ${
                            String(selectedLessonId) === String(lesson.id) &&
                            selectedTab === tab
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {(lesson.tabLabels || tabLabels)?.[tab] || tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-y-auto relative">
          {/* HEADER */}
          <div className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow sticky top-0 z-50">
            <h1 className="text-lg font-bold">
              {data.meta.title.ar} — {data.meta.title.fr} (Année {year}) • S
              {sem}
            </h1>
            <Link
              to={`/${lang}/niveau-debutant`}
              className="bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-100"
            >
              🏠 الصفحة الرئيسية للمواد
            </Link>
          </div>

          {/* TABS NAV */}
          <div className="flex justify-between items-center p-4 bg-white border-b sticky top-[58px] z-40">
            <button
              onClick={handleTabPrev}
              disabled={currentTabIndex === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
            >
              ⏮ السابق
            </button>
            {getDownloadLink() && (
              <a
                href={getDownloadLink()}
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                target="_blank"
                rel="noreferrer"
              >
                ⬇️ تحميل
              </a>
            )}
            <button
              onClick={handleTabNext}
              disabled={
                currentTabIndex === (selectedLesson?.tabs || tabs)?.length - 1
              }
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
            >
              التالي ⏭
            </button>
          </div>

          {/* CONTENU */}
          <div className="flex-1 p-6 overflow-y-auto relative">
            <div className="bg-white shadow rounded p-4 space-y-4 relative">
              <h2 className="font-bold text-right text-blue-700 border-b pb-2">
                {(selectedLesson?.tabLabels || tabLabels)?.[selectedTab] ||
                  selectedTab}{' '}
                👈
                <Scene
                  text="صلوا على النبي محمد ﷺ ❤️"
                  className="text-[18px] font-amiri font-bold text-right"
                />
                👉
              </h2>

              <button
                onClick={openModalWithContent}
                className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
              >
                📺 Agrandir
              </button>
              <div className="w-full max-w-full h-[600px]">
                <iframe
                  src={
                    selectedLesson?.isConclusion
                      ? selectedLesson.links?.[selectedTab]
                      : semesterBlock.contentLinks?.[
                          String(selectedLessonId)
                        ]?.[selectedTab]
                  }
                  className="w-full h-full rounded border"
                  allowFullScreen
                  title="Contenu"
                />
              </div>
            </div>
          </div>

          {/* BOUTONS SCROLL */}
          <ScrollToTopButton />
          <ScrollDownButton />
        </main>

        {/* MODAL */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          content={modalContent}
        />
      </div>
    </>
  );
}
