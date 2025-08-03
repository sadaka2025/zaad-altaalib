// ✅ IntroFikhPage.jsx avec Modal de "محتوى الدرس" et boutons vers les semestres
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Modal from "../../components/Modal";

export default function IntroFikhPage() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const [showRatingPrompt, setShowRatingPrompt] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("popupShownDate");
    const now = new Date().toISOString().split("T")[0];
    if (lastShown === now) setShowRatingPrompt(false);
  }, []);

  const handleRating = (rating) => {
    setUserRating(rating);
    setShowRatingPrompt(false);
    localStorage.setItem(
      "popupShownDate",
      new Date().toISOString().split("T")[0]
    );
    console.log("User rated:", rating);
  };

  const lessonList = [
    "الدرس الأول: فضل العلم والعلماء وبعض النصائح",
    "الدرس الثاني : المراحل التي مر بها المذهب المالكي",
    "الدرس الثالث : أحكام المياه",
    "الدرس الرابع : أحكام الوضوء",
    "الدرس الخامس : فضائل ومكروهات الوضوء",
    "الدرس السادس : نواقض الوضوء والاستبراء والاستجمار",
    "الدرس السابع : أحكام الغسل",
    "الدرس الثامن : موجبات الغسل وأسباب التيمم",
    "الدرس التاسع : أحكام تتعلق بالتيمم",
    "الدرس العاشر : مندوبات ونواقض التيمم وفرائض الصلاة",
    "الدرس الحادي عشر : فرائض الصلاة وشروط أدائها",
    "الدرس الثاني عشر : ستر العورة في الصلاة وشروط وجوبها وسننها",
    "الدرس الثالث عشر : سنن الصلاة الخفيفة ومندوباتها",
    "الدرس الرابع عشر : بقية مندوبات الصلاة ومكروهاتها",
    "الدرس الخامس عشر : صلاة الجنازة",
    "الدرس السادس عشر : الصلاة على الميت وتغسيله وتكفينه ودفنه",
  ];

  const lessonContent = (
    <ul className="space-y-2 text-right">
      {lessonList.map((title, index) => (
        <li key={index}>
          <button
            onClick={() =>
              navigate(
                `/ar/annee/1/matiere/fiqh?semestre=1&lesson=${index + 1}`
              )
            }
            className="text-blue-700 hover:underline"
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Navbar */}
      <section className="grid md:grid-cols-5 gap-3 text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          📘 محتوى الدرس
        </button>

        <button
          onClick={() => navigate("/ar/avis")}
          className="bg-yellow-200 text-yellow-900 p-3 rounded hover:bg-yellow-300"
        >
          ❓ أرسل سؤالاً
        </button>

        <button
          onClick={() => navigate("/ar/annonces")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded"
        >
          📢 الإعلانات
        </button>

        <button
          onClick={() => navigate("/ar/profavis")}
          className="bg-green-100 hover:bg-green-200 text-green-900 p-3 rounded"
        >
          🧑‍🏫 تقييم الأستاذ
        </button>

        <button
          onClick={() => navigate("/ar/introfiqh-s2")}
          className="bg-purple-100 hover:bg-purple-200 text-purple-900 p-3 rounded"
        >
          🎯 أهداف السداسي الثاني
        </button>
      </section>

      {/* Video Section */}
      <section className="grid md:grid-cols-2 gap-4 items-start">
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Intro video"
            className="w-full h-64 md:h-96"
            allowFullScreen
          />

          <div className="text-center mt-2">
            <button
              onClick={() => navigate("/ar/annee/1/matiere/fiqh?semestre=1")}
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-xl mt-2"
            >
              CONTINUER LE COURS <ChevronRight className="ml-2 inline" />
            </button>
          </div>
        </div>

        <div className="space-y-3 text-gray-800 text-justify">
          <h2 className="text-xl font-bold">
            📘 مقدمة المقرر: الفقه المالكي للسداسي الأول
          </h2>
          <p>
            إن هذا المقرر يُعدّ مدخلًا تأسيسيًا هامًا لدراسة الفقه المالكي، وهو
            يُقدَّم خصيصًا للطلبة المبتدئين بطريقة ميسّرة وشاملة، تجمع بين
            التأصيل العلمي والربط العملي.
          </p>

          <h3 className="font-semibold">🎯 أهداف المقرر:</h3>
          <ul className="list-disc pr-5">
            <li>
              التمييز بين أحكام الطهارة والصلاة في الفقه المالكي، من حيث
              الفرائض، السنن، المكروهات، والمبطلات.
            </li>
            <li>
              فهم مراتب الأدلة الشرعية التي يعتمدها المذهب المالكي في الاستدلال،
              من خلال استيعاب المراحل التاريخية التي مر بها المذهب.
            </li>
            <li>
              إتقان فقه العبادات الأساسية، مثل أحكام المياه، الوضوء، الغسل،
              التيمم، وشروط الصلاة وأركانها.
            </li>
            <li>
              معرفة الأحكام المتعلقة بصلاة الجنازة وما يرافقها من غسل وتكفين
              ودفن.
            </li>
            <li>
              التأدب بآداب طالب العلم، والاطلاع على فضل العلماء والنصائح التي
              تعين على الاستقامة في طلب العلم.
            </li>
            <li>
              الربط بين المتون الفقهية وشروحها، من خلال دراسة منظومة ابن عاشر
              وشـرح ابن المؤقت (الحبل المتين)، بما يناسب فهم الطالب المبتدئ.
            </li>
          </ul>

          <h3 className="font-semibold">📚 محاور الدروس:</h3>
          <ol className="list-decimal pr-5">
            <li>
              تمهيد علمي وتربوي: يشمل فضل العلم، ونصائح لطالب العلم، والمراحل
              التي مر بها المذهب المالكي.
            </li>
            <li>
              فقه الطهارة: يشمل أحكام المياه، الوضوء، الغسل، التيمم، والنجاسات.
            </li>
            <li>
              فقه الصلاة: يدرس شروطها، فرائضها، سننها، مكروهاتها، وأحكام سجود
              السهو.
            </li>
            <li>
              أحكام الجنازة: تتناول صلاة الجنازة، وغسل الميت، وتكفينه، ودفنه.
            </li>
          </ol>

          <p className="text-sm text-gray-600">
            💡 هذا المقرر يُعدّ خطوة أولى في تكوين طالب العلم الشرعي وفق منهج
            علمي رصين، يربط بين المتون الفقهية الأصيلة وبين الواقع التطبيقي
            اليومي للمسلم.
          </p>
        </div>
      </section>

      {/* Modal for lesson list */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="📚 قائمة دروس الفقه المالكي للسداسي الأول"
        content={lessonContent}
      />

      {/* Popup évaluation étoiles */}
      {showRatingPrompt && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg p-4 rounded-lg border w-[300px] z-50">
          <p className="text-gray-900 mb-3 font-medium text-center">
            ⭐ ما رأيك في هذا الموقع؟ قيّمنا!
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => handleRating(n)}
                className={`text-2xl cursor-pointer ${
                  userRating >= n ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
