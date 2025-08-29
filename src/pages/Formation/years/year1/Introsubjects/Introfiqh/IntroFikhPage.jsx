// ✅ IntroFikhPageOptimized.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Modal from '@components/global/Modal/Modal';
import fiqhJSON from '../../../../../../datastat/years/year1/fiqhstat.json';
import BooksModal from '../../BooksModal';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function IntroFikhPage() {
  const [open, setOpen] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);

  // 👉 محاور السداسي الاول (فِقْه)

  const [isModalMabadiOpen, setIsModalMabadiOpen] = useState(false);

  const mabadiList = [
    'الحد',
    'الموضوع',
    'الثمرة',
    'فضله',
    'نسبه',
    'الواضع',
    'الاسم',
    'الاستمداد',
    'حكم الشارع',
    'مسائل',
  ];

  const mabadiContent = (
    <div className="text-right leading-relaxed space-y-4">
      <p className="font-semibold text-lg text-center">
        "من حاز المبادئ فقد ملك مفاتيح العلم!"
      </p>

      <p>
        افتتح العلماء دراساتهم في مختلف العلوم الإسلامية بتحديد ما يُعرف بـ{' '}
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

  const sections = [
    {
      id: '٠١',
      title: 'علم الفقه',
      desc: 'ماهي مبادئه؟',
      onClick: () => setIsModalMabadiOpen(true), // 👉 ouvre le modal
    },
    {
      id: '٠٢',
      title: 'فقه الطهارة',
      desc: 'ماهي أحكامها',
    },
    {
      id: '٠٣',
      title: 'فقه الصلاة',
      desc: 'ماهي أحكامها',
    },
    {
      id: '٠٤',
      title: 'فقه الجنازة',
      desc: 'ماهي أحكامها',
    },
  ];

  // 👉 Définis ici le livre de cette matière (فِقْه)
  const fiqhBook = {
    id: 1,
    title: 'الفقه',
    author: 'اسم المؤلف',
    price: 'مجانا ',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/fiqh.jpg',
    pdf: '/pdf/books/fiqh.pdf',
  };
  const navigate = useNavigate();
  const { lang } = useParams();

  // Utilisation directe
  const fiqhData = fiqhJSON.fiqh;

  // ⚡ Calcul dynamique des totaux année 1
  const totalYear1 = {
    videos: fiqhData.year1.semester1.videos + fiqhData.year1.semester2.videos,
    summaryPDF:
      fiqhData.year1.semester1.summaryPDF + fiqhData.year1.semester2.summaryPDF,
    textExtraction:
      fiqhData.year1.semester1.textExtraction +
      fiqhData.year1.semester2.textExtraction,
    totalQuiz:
      fiqhData.year1.semester1.totalQuiz + fiqhData.year1.semester2.totalQuiz,
    lives: fiqhData.year1.semester1.lives + fiqhData.year1.semester2.lives,
    livesPDF:
      fiqhData.year1.semester1.livesPDF + fiqhData.year1.semester2.livesPDF,
  };

  // ⭐ État pour modals, vidéo, évaluations
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const handleRating = (rating) => {
    console.log('User clicked rating:', rating); // ✅ debug temporaire
    setUserRating(rating);
    localStorage.setItem('userRating', rating);

    const existing = JSON.parse(localStorage.getItem('allUserRatings') || '[]');
    const newRating = {
      id: Date.now(),
      rating: rating,
      date: new Date().toISOString(),
    };
    const updated = [...existing, newRating];
    localStorage.setItem('allUserRatings', JSON.stringify(updated));
    setAllRatings(updated);

    setShowThankYou(true);
    setShowRatingPrompt(false);

    setTimeout(() => {
      setShowThankYou(false);
    }, 7000);
  };
  localStorage.removeItem('userRating');
  localStorage.removeItem('popupShownDate');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [hoverRating, setHoverRating] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);

  const [showThankYou, setShowThankYou] = useState(false);

  const [isModalLessonsOpen, setIsModalLessonsOpen] = useState(false);

  const [allRatings, setAllRatings] = useState([]); // ✅ pour afficher tous les avis
  const [userRating, setUserRating] = useState(
    Number(localStorage.getItem('userRating') || 0)
  );

  useEffect(() => {
    const now = new Date().toISOString().split('T')[0];
    const lastShown = localStorage.getItem('popupShownDate');

    // Ne pas afficher s’il a déjà été montré aujourd’hui
    if (lastShown === now) setShowRatingPrompt(false);

    // ✅ Détection sortie (Exit Intent)
    const handleExitIntent = (e) => {
      if (e.clientY <= 0 && userRating === 0 && lastShown !== now) {
        setShowRatingPrompt(true);
        localStorage.setItem('popupShownDate', now);
      }
    };

    // ✅ Charger les anciens avis
    const stored = JSON.parse(localStorage.getItem('allUserRatings') || '[]');
    setAllRatings(stored);

    // Ajouter l'écouteur
    document.addEventListener('mouseleave', handleExitIntent);

    // Nettoyage à la sortie
    return () => {
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [userRating]);

  const lessonList = [
    'الدرس الأول: فضل العلم والعلماء وبعض النصائح',
    'الدرس الثاني : المراحل التي مر بها المذهب المالكي',
    'الدرس الثالث : أحكام المياه',
    'الدرس الرابع : أحكام الوضوء',
    'الدرس الخامس : فضائل ومكروهات الوضوء',
    'الدرس السادس : نواقض الوضوء والاستبراء والاستجمار',
    'الدرس السابع : أحكام الغسل',
    'الدرس الثامن : موجبات الغسل وأسباب التيمم',
    'الدرس التاسع : أحكام تتعلق بالتيمم',
    'الدرس العاشر : مندوبات ونواقض التيمم وفرائض الصلاة',
    'الدرس الحادي عشر : فرائض الصلاة وشروط أدائها',
    'الدرس الثاني عشر : ستر العورة في الصلاة وشروط وجوبها وسننها',
    'الدرس الثالث عشر : سنن الصلاة الخفيفة ومندوباتها',
    'الدرس الرابع عشر : بقية مندوبات الصلاة ومكروهاتها',
    'الدرس الخامس عشر : صلاة الجنازة',
    'الدرس السادس عشر : الصلاة على الميت وتغسيله وتكفينه ودفنه',
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

  // const mabadiList = [
  //   '📌 الحد (التعريف الاصطلاحي): الفقه هو العلم بأحكام الله الشرعية العملية المكتسبة من أدلتها التفصيلية.',
  //   '📌 الموضوع: يبحث علم الفقه في الأحكام العملية مثل الطهارة، الصلاة، المعاملات، الزواج...',
  //   '📌 الثمرة: تطبيق الشريعة في الحياة اليومية.',
  //   '📌 فضله: من أعظم العلوم الشرعية.',
  //   '📌 نسبه: ينتمي إلى العلوم الشرعية ويتفرع من أصول الفقه.',
  //   '📌 الواضع: الإمام الشافعي أول من نظّر له نظريًا شاملاً.',
  //   '📌 الاسم: يُعرف بالفقه، من الفهم والتفقه.',
  //   '📌 الاستمداد: القرآن، السنة، الإجماع، القياس.',
  //   '📌 حكم الشارع: فرض كفاية، وبعضه فرض عين.',
  //   '📌 المسائل: الطهارة، الصلاة، المعاملات، الحدود...',
  // ];
  // const mabadiContent = (
  //   <div className="text-right leading-relaxed space-y-4">
  //     <p className="font-semibold text-lg text-center">
  //       "من حاز المبادئ فقد ملك مفاتيح العلم!"
  //     </p>

  //     <p>
  //       افتتح العلماء دراساتهم في مختلف العلوم الإسلامية بتحديد ما يُعرف بـ{' '}
  //       <strong>"مبادئ العلم العشرة"</strong>، وهي الأساس المتين لفهم أي علم
  //       والتدرج فيه بثبات ويقين.
  //     </p>

  //     <p>
  //       وقد نظمها بعضهم شعراً فقال:
  //       <br />
  //       <em>
  //         الحد والموضوع ثم الثمرةُ وفضلُهُ، ونسبٌ والواضعُ،
  //         <br />
  //         والاسمُ، الاستمدادُ، حكمُ الشارعِ، مسائلٌ، والبعضُ بالبعضِ اكتفى،
  //         <br />
  //         ومن درى الجميعَ حاز الشرفا.
  //       </em>
  //     </p>

  //     <h3 className="font-bold text-blue-700">🧭 مبادئ علم الفقه:</h3>
  //     <ul className="list-disc pr-5 space-y-1">
  //       {mabadiList.map((item, index) => (
  //         <li key={index}>{item}</li>
  //       ))}
  //     </ul>

  //     <p className="mt-4">
  //       🎯 <strong>خلاصة:</strong> هذا التمهيد يُرشدك لطريق الطاعة وينظم علاقتك
  //       بالله وخلقه. هيا بنا نبدأ رحلتنا في هذا العلم المبارك.
  //     </p>
  //   </div>
  // );

  return (
    <div className="font-[Arial] max-w-6xl mx-auto p-4 space-y-6">
      {/* Navigation */}
      <section className="grid md:grid-cols-5 gap-3 text-center mt-8">
        {/* === Bouton pour ouvrir le modal livre spécifique === */}
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          📚 مقرّر المادة
        </button>

        {/* === Modal réutilisable === */}
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
          onClick={() => navigate('/ar/introfiqh-s2')}
          className="bg-purple-100 hover:bg-purple-200 text-purple-900 p-3 rounded"
        >
          🎯 أهداف السداسي الأول
        </button>
      </section>

      {/* Video + Résumé + 4 Sections */}
      <section className="grid md:grid-cols-2 gap-4 items-start">
        {/* Colonne gauche */}
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

          {/* CONTINUER */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/ar/annee/1/matiere/fiqh?semestre=1')}
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-xl mt-2"
            >
              CONTINUER LE COURS <ChevronRight className="ml-2 inline" />
            </button>
          </div>
        </div>

        {/* Colonne droite */}
        <div dir="rtl" className="bg-white py-12 text-center font-[Tajawal]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            هذا السداسي الأول يركز على 4 أجزاء رئيسية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-16">
            {sections.map((item, index) => (
              <div key={index} className="text-right">
                <div className="h-1 w-10 bg-orange-500 mb-3"></div>
                <p className="font-bold text-gray-600">{item.id}.</p>

                {/* titre cliquable */}
                <h3
                  className="text-xl font-bold text-gray-900 cursor-pointer hover:text-orange-600 transition"
                  onClick={item.onClick}
                >
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#programme"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-orange-600 transition"
            >
              مشاهدة برنامج السداسي الأول
            </a>
          </div>
        </div>
      </section>

      {/* ✅ Résumé Année 1 en dessous des deux colonnes */}
      <section className="mt-12">
        <h2 className="text-center font-bold text-xl mb-4">
          Résumé Année 1 (S1 + S2)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {/* 🟣 Text Extraction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-purple-100 p-4 rounded-xl shadow"
          >
            <p className="text-2xl font-bold">
              <CountUp end={totalYear1.textExtraction} duration={2} />
            </p>
            <p className="text-sm">Text Extraction</p>
          </motion.div>

          {/* 🟢 PDF Résumés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-green-100 p-4 rounded-xl shadow"
          >
            <p className="text-2xl font-bold">
              <CountUp end={totalYear1.summaryPDF} duration={2} />
            </p>
            <p className="text-sm">PDF résumés</p>
          </motion.div>

          {/* 🔵 Vidéos de cours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-100 p-4 rounded-xl shadow"
          >
            <p className="text-2xl font-bold">
              <CountUp end={totalYear1.videos} duration={2} />
            </p>
            <p className="text-sm">Vidéos de cours</p>
          </motion.div>

          {/* 🔴 Total Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-red-100 p-4 rounded-xl shadow"
          >
            <p className="text-2xl font-bold">
              <CountUp end={totalYear1.totalQuiz} duration={2} />
            </p>
            <p className="text-sm">Total Quiz</p>
          </motion.div>

          {/* 🟠 Live PDF */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-orange-100 p-4 rounded-xl shadow"
          >
            <p className="text-2xl font-bold">
              <CountUp end={totalYear1.livesPDF} duration={2} />
            </p>
            <p className="text-sm">ملخص اللقاء (Live PDF)</p>
          </motion.div>

          {/* 🟡 Live vidéos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-yellow-100 p-4 rounded-xl shadow"
          >
            <p className="text-2xl font-bold">
              <CountUp end={totalYear1.lives} duration={2} />
            </p>
            <p className="text-sm">Live vidéos</p>
          </motion.div>
        </div>
      </section>

      {/* Modal content */}
      {/* Modal A – Modal مبادئ علم الفقه */}
      <Modal
        isOpen={isModalMabadiOpen}
        onClose={() => setIsModalMabadiOpen(false)}
        title="Facebook"
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
                    ? 'text-yellow-400'
                    : 'text-gray-400'
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
