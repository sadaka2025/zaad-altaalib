// ✅ IntroFikhPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Modal from "@components/global/Modal/Modal";

export default function IntroFikhPage() {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const handleRating = (rating) => {
    console.log("User clicked rating:", rating); // ✅ debug temporaire
    setUserRating(rating);
    localStorage.setItem("userRating", rating);

    const existing = JSON.parse(localStorage.getItem("allUserRatings") || "[]");
    const newRating = {
      id: Date.now(),
      rating: rating,
      date: new Date().toISOString(),
    };
    const updated = [...existing, newRating];
    localStorage.setItem("allUserRatings", JSON.stringify(updated));
    setAllRatings(updated);

    setShowThankYou(true);
    setShowRatingPrompt(false);

    setTimeout(() => {
      setShowThankYou(false);
    }, 7000);
  };
  localStorage.removeItem("userRating");
  localStorage.removeItem("popupShownDate");

  const navigate = useNavigate();
  const { lang } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [hoverRating, setHoverRating] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);

  const [showThankYou, setShowThankYou] = useState(false);
  const [isModalMabadiOpen, setIsModalMabadiOpen] = useState(false);
  const [isModalLessonsOpen, setIsModalLessonsOpen] = useState(false);

  const [allRatings, setAllRatings] = useState([]); // ✅ pour afficher tous les avis
  const [userRating, setUserRating] = useState(
    Number(localStorage.getItem("userRating") || 0)
  );

  useEffect(() => {
    const now = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem("popupShownDate");

    // Ne pas afficher s’il a déjà été montré aujourd’hui
    if (lastShown === now) setShowRatingPrompt(false);

    // ✅ Détection sortie (Exit Intent)
    const handleExitIntent = (e) => {
      if (e.clientY <= 0 && userRating === 0 && lastShown !== now) {
        setShowRatingPrompt(true);
        localStorage.setItem("popupShownDate", now);
      }
    };

    // ✅ Charger les anciens avis
    const stored = JSON.parse(localStorage.getItem("allUserRatings") || "[]");
    setAllRatings(stored);

    // Ajouter l'écouteur
    document.addEventListener("mouseleave", handleExitIntent);

    // Nettoyage à la sortie
    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [userRating]);

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

  const mabadiList = [
    "📌 الحد (التعريف الاصطلاحي): الفقه هو العلم بأحكام الله الشرعية العملية المكتسبة من أدلتها التفصيلية.",
    "📌 الموضوع: يبحث علم الفقه في الأحكام العملية مثل الطهارة، الصلاة، المعاملات، الزواج...",
    "📌 الثمرة: تطبيق الشريعة في الحياة اليومية.",
    "📌 فضله: من أعظم العلوم الشرعية.",
    "📌 نسبه: ينتمي إلى العلوم الشرعية ويتفرع من أصول الفقه.",
    "📌 الواضع: الإمام الشافعي أول من نظّر له نظريًا شاملاً.",
    "📌 الاسم: يُعرف بالفقه، من الفهم والتفقه.",
    "📌 الاستمداد: القرآن، السنة، الإجماع، القياس.",
    "📌 حكم الشارع: فرض كفاية، وبعضه فرض عين.",
    "📌 المسائل: الطهارة، الصلاة، المعاملات، الحدود...",
  ];
  const mabadiContent = (
    <div className="text-right leading-relaxed space-y-4">
      <p className="font-semibold text-lg text-center">
        "من حاز المبادئ فقد ملك مفاتيح العلم!"
      </p>

      <p>
        افتتح العلماء دراساتهم في مختلف العلوم الإسلامية بتحديد ما يُعرف بـ{" "}
        <strong>"مبادئ العلم العشرة"</strong>، وهي الأساس المتين لفهم أي علم
        والتدرج فيه بثبات ويقين.
      </p>

      <p>
        وقد نظمها بعضهم شعراً فقال:
        <br />
        <em>
          الحد والموضوع ثم الثمرةُ وفضلُهُ، ونسبٌ والواضعُ،
          <br />
          والاسمُ، الاستمدادُ، حكمُ الشارعِ، مسائلٌ، والبعضُ بالبعضِ اكتفى،
          <br />
          ومن درى الجميعَ حاز الشرفا.
        </em>
      </p>

      <h3 className="font-bold text-blue-700">🧭 مبادئ علم الفقه:</h3>
      <ul className="list-disc pr-5 space-y-1">
        {mabadiList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="mt-4">
        🎯 <strong>خلاصة:</strong> هذا التمهيد يُرشدك لطريق الطاعة وينظم علاقتك
        بالله وخلقه. هيا بنا نبدأ رحلتنا في هذا العلم المبارك.
      </p>
    </div>
  );

  return (
    <div className="font-[Arial] max-w-6xl mx-auto p-4 space-y-6">
      {/* Navigation buttons */}
      <section className="grid md:grid-cols-5 gap-3 text-center mt-8">
        <button
          onClick={() => setIsModalLessonsOpen(true)}
          className="text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded shadow"
        >
          عرض محتوى الدروس
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
          🧑🏫 تقييم الأستاذ
        </button>
        <button
          onClick={() => navigate("/ar/introfiqh-s2")}
          className="bg-purple-100 hover:bg-purple-200 text-purple-900 p-3 rounded"
        >
          🎯 أهداف السداسي الثاني
        </button>
      </section>

      {/* Video */}
      <section className="grid md:grid-cols-2 gap-4 items-start">
        <div className="relative w-full max-w-3xl mx-auto">
          {!showVideo ? (
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow relative">
              <img
                src="/images/مقدمة.png"
                alt="Vidéo d’introduction"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setShowVideo(true)}
                  className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform text-2xl"
                >
                  ▶
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src="https://drive.google.com/file/d/1ZdMl-A722jg6YMeOhyoXsOBP7tqc-cSs/preview"
              title="Intro video"
              className="w-full h-64 md:h-96 rounded-lg shadow-lg"
              allowFullScreen
            />
          )}

          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/ar/annee/1/matiere/fiqh?semestre=1")}
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-xl mt-2"
            >
              CONTINUER LE COURS <ChevronRight className="ml-2 inline" />
            </button>
          </div>
        </div>

        {/* Right column content */}
        <div className="space-y-3 text-gray-800 text-justify">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold">
              📘 الفقه المالكي – السداسي الأول: من الطهارة إلى صلاة الجنازة
            </h2>
            <button
              onClick={() => setIsModalMabadiOpen(true)}
              className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded shadow"
            >
              مبادئ علم الفقه
            </button>
          </div>

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

      {/* Modal content */}
      {/* Modal A – Modal مبادئ علم الفقه */}
      <Modal
        isOpen={isModalMabadiOpen}
        onClose={() => setIsModalMabadiOpen(false)}
        title="📘 مبادئ علم الفقه"
        content={mabadiContent}
      />

      {/* Modal B – Modal محتوى الدروس */}
      <Modal
        isOpen={isModalLessonsOpen}
        onClose={() => setIsModalLessonsOpen(false)}
        title="📚 قائمة دروس الفقه المالكي للسداسي الأول"
        content={lessonContent}
      />

      {/* ✅ Popup d'évaluation étoiles */}
      {showRatingPrompt && userRating === 0 && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg p-4 rounded-lg border w-[300px] z-50">
          <p className="text-gray-900 mb-3 font-medium text-center">
            ⭐ ما رأيك في هذا الموقع؟ قيّمنا!
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => handleRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                className={`text-2xl cursor-pointer transition-colors duration-150 ${
                  (hoverRating || userRating) >= n
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Message de remerciement après vote */}
      {showThankYou && (
        <div className="fixed bottom-6 right-6 bg-green-100 text-green-900 shadow-lg p-4 rounded-lg border w-[300px] z-50 text-center text-sm">
          ✅ شكراً على تقييمك 🙏
        </div>
      )}
    </div>
  );
}
