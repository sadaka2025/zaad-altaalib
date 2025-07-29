import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../../../../components/ScrollToTopButton";
import ScrollDownButton from "../../../../components/ScrollDownButton";
import Modal from "../../../../components/Modal";

const lessons = [
  { id: 1, title: "الدرس الاول: فضل العلم و العلماء و بعض النصائح" },
  { id: 2, title: "الدرس الثاني: مكانة الفقه و بعض آداب الطلب" },
  { id: 3, title: "الدرس الثالث: أقسام الطهارة و أحكام المياه" },
  { id: 4, title: "الدرس الرابع: النجاسات و كيفية إزالتها" },
  { id: 5, title: "الدرس الخامس: السواك و خصال الفطرة" },
  { id: 6, title: "الدرس السادس: الوضوء و فرائضه و سننه" },
  { id: 7, title: "الدرس السابع: نواقض الوضوء و مكروهاته" },
  { id: 8, title: "الدرس الثامن: الغسل و موجباته و صفته" },
  { id: 9, title: "الدرس التاسع: التيمم و شروطه و مبطلاته" },
  { id: 10, title: "الدرس العاشر: أحكام الحيض و النفاس" },
  { id: 11, title: "الدرس الحادي عشر: شروط الصلاة و أركانها" },
  { id: 12, title: "الدرس الثاني عشر: واجبات الصلاة و مكروهاتها" },
  { id: 13, title: "الدرس الثالث عشر: مبطلات الصلاة و بعض الأخطاء الشائعة" },
  { id: 14, title: "📚 الخاتمة العامة" },
];

const contentLinks = {
  1: {
    video: "https://drive.google.com/file/d/1EjwP4LRAk-taGDUn3KbHihGrcSVxUH6V/preview",
    videoDownload:
      "https://drive.google.com/uc?export=download&id=1EjwP4LRAk-taGDUn3KbHihGrcSVxUH6V",
    summaryPDF: "https://drive.google.com/file/d/19hvIoHdS-6lfxLJf1XR2xBwwDLJTSfge/preview",
    summaryDownload:
      "https://drive.google.com/uc?export=download&id=19hvIoHdS-6lfxLJf1XR2xBwwDLJTSfge",
    textExtraction: "https://docs.google.com/document/d/1Yg08EwjxFTEuxs6s5FkoysY7KNtNZ7sTkQysTZ72nhI",
    qna: "https://docs.google.com/document/d/1KTXCUvsbAnvVYkNrG4mVSMDHwqA7IpuqSCkWLftrYtk",
  },
};

const tabs = ["video", "summaryPDF", "textExtraction", "qna"];
const tabLabels = {
  video: "🎥 فيديو الدرس",
  summaryPDF: "📝 مختصر الدرس",
  textExtraction: "📄 استخراج النصوص من الفيديو",
  qna: "📘 تلخيص الدرس في شكل سؤال و جواب (QCM)",
};

export default function FiqhPage() {
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [selectedTab, setSelectedTab] = useState("video");
  const [openSubmenus, setOpenSubmenus] = useState({ 1: true }); // Par défaut, premier ouvert
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);
  const currentTabIndex = tabs.indexOf(selectedTab);

  const handleTabNext = () => {
    if (currentTabIndex < tabs.length - 1) setSelectedTab(tabs[currentTabIndex + 1]);
  };

  const handleTabPrev = () => {
    if (currentTabIndex > 0) setSelectedTab(tabs[currentTabIndex - 1]);
  };

  const getDownloadLink = () => {
    const content = contentLinks[selectedLessonId];
    if (!content) return null;
    if (selectedTab === "video") return content.videoDownload;
    if (selectedTab === "summaryPDF") return content.summaryDownload;
    if (selectedTab === "textExtraction") return content.textExtraction;
    if (selectedTab === "qna") return content.qna;
    return null;
  };

  const openModalWithContent = () => {
    const content = contentLinks[selectedLessonId];
    if (!content) return;

    let modalBody = null;

    switch (selectedTab) {
      case "video":
        modalBody = (
          <iframe
            src={content.video}
            className="w-full h-[80vh] rounded"
            allowFullScreen
            title="Video Lesson Enlarged"
          />
        );
        break;

      case "summaryPDF":
        modalBody = (
          <iframe
            src={content.summaryPDF}
            className="w-full h-[80vh] rounded"
            allowFullScreen
            title="Summary PDF Enlarged"
          />
        );
        break;

      case "textExtraction":
        modalBody = (
          <a
            href={content.textExtraction}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            عرض مستند استخراج النصوص (فتح في نافذة جديدة)
          </a>
        );
        break;

      case "qna":
        modalBody = (
          <a
            href={content.qna}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            عرض تلخيص الأسئلة و الأجوبة (فتح في نافذة جديدة)
          </a>
        );
        break;

      default:
        modalBody = null;
    }

    setModalTitle(`${selectedLesson.title} - ${tabLabels[selectedTab]}`);
    setModalContent(modalBody);
    setModalOpen(true);
  };
 const toggleSubmenu = (lessonId) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };
  const [openLessonId, setOpenLessonId] = useState(null);

const toggleLesson = (id) => {
  setOpenLessonId((prevId) => (prevId === id ? null : id));
};


 return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="w-96 bg-blue-100 p-4 border-l border-blue-400 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-blue-100 hover:scrollbar-thumb-blue-700 scrollbar-thin scrollbar-thumb-blue-900 main-scrollable">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <ScrollToTopButton />
            <ScrollDownButton />
          </div>

          <h2 className="text-center font-bold text-lg">📚 قائمة الدروس</h2>
          <Link
            to="/"
            className="block w-full text-center bg-white text-blue-700 px-3 py-2 rounded shadow hover:bg-blue-200"
          >
            🏠 الرجوع للرئيسية
          </Link>
        </div>

        <ul className="mt-6 space-y-2">
          {lessons.map((lesson) => (
  <li key={lesson.id}>
    <button
      onClick={() => {
        setSelectedLessonId(lesson.id);
        setSelectedTab("video");
      }}
      className={`w-full text-right px-2 py-2 rounded font-semibold flex justify-between items-center ${
        selectedLessonId === lesson.id
          ? "bg-blue-500 text-white"
          : "bg-blue-200 hover:bg-blue-300 text-blue-900"
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
        {openSubmenus[lesson.id] ? "−" : "+"}
      </span>
    </button>

    {openSubmenus[lesson.id] && (
      <ul className="pl-4 mt-2 space-y-1">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => {
                setSelectedLessonId(lesson.id);
                setSelectedTab(tab);
              }}
              className={`text-sm w-full text-right px-2 py-1 rounded hover:bg-blue-300 ${
                selectedLessonId === lesson.id && selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-900"
              }`}
            >
              {tabLabels[tab]}
            </button>
          </li>
        ))}
      </ul>
    )}
  </li>
))}

        </ul>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto relative">
        <div className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow sticky top-0 z-50">
          <h1 className="text-lg font-bold">{selectedLesson?.title}</h1>
          <Link to="/" className="bg-white text-blue-700 px-4 py-1 rounded shadow hover:bg-blue-100">
            🏠 الصفحة الرئيسية
          </Link>
        </div>

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
            disabled={currentTabIndex === tabs.length - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
          >
            التالي ⏭
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-100">
  <div className="bg-white shadow rounded p-4 space-y-4 relative">
    <h2 className="font-bold text-right text-blue-700 border-b pb-2">{tabLabels[selectedTab]}</h2>

    {/* 📺 Bouton Agrandir */}
    <button
      onClick={openModalWithContent}
      className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow transition"
      aria-label="Agrandir le contenu"
    >
      📺 Agrandir
    </button>

    {/* Affichage central, cadré pour sidebar */}
    {selectedTab === "video" && (
      <div className="w-full max-w-full h-[320px]">
        <iframe
          src={contentLinks[selectedLessonId]?.video}
          className="w-full h-full rounded"
          allowFullScreen
          title="lesson video"
        />
      </div>
    )}

    {selectedTab === "summaryPDF" && (
      <div className="w-full max-w-full h-[320px]">
        <iframe
          src={contentLinks[selectedLessonId]?.summaryPDF}
          className="w-full h-full rounded"
          allowFullScreen
          title="lesson summary"
        />
      </div>
    )}

    {selectedTab === "textExtraction" && (
      <a
        href={contentLinks[selectedLessonId]?.textExtraction}
        className="text-blue-600 underline text-right block"
        target="_blank"
        rel="noreferrer"
      >
        عرض مستند استخراج النصوص
      </a>
    )}

    {selectedTab === "qna" && (
      <a
        href={contentLinks[selectedLessonId]?.qna}
        className="text-blue-600 underline text-right block"
        target="_blank"
        rel="noreferrer"
      >
        عرض تلخيص الأسئلة و الأجوبة
      </a>
    )}
  </div>
</div>

      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} content={modalContent} />
    </div>
  );
}


