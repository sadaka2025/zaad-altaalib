import React, { useState } from "react"; 
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Données des matières avec description
const subjects = [
  { name: "قرآن وتجويده", icon: "📖", description: "إتقان التجويد يُمكن الطالب من فهم كلام الله وتلاوته بشكل سليم..." },
  { name: "العقيدة", icon: "🫿", description: "علم العقيدة هو الأساس الذي يُبنى عليه الإيمان الصحيح..." },
  { name: "الفقه", icon: "⚖️", description: "علم الفقه هو العلم الذي يختص بمعرفة الأحكام الشرعية العملية..." },
  { name: "النحو", icon: "✍️", description: "إتقان علم النحو يجعل الطالب قادرًا على فهم النصوص الشرعية..." },
  { name: "الصرف", icon: "🔤", description: "علم الصرف هو العلم الذي يهتم بدراسة بنية الكلمة العربية..." },
  { name: "الإملاء", icon: "📝", description: "علم الإملاء يهتم بتعليم قواعد الكتابة الصحيحة..." },
  { name: "الحديث", icon: "🗣️", description: "يُمكن الطالب من كتابة النصوص بشكل صحيح يعكس الفهم..." },
  { name: "السيرة", icon: "🌟", description: "تُعَدُّ السيرة النبوية مادة أساسية في الدراسات الإسلامية..." },
  { name: "الأخلاق", icon: "❤️", description: "الأخلاق تُعدّ ركيزة أساسية في تكوين طالب العلم الشرعي..." },
  { name: "المنطق", icon: "🧠", description: "المنطق هو علم يبحث في قواعد التفكير السليم..." },
  { name: "الأدب", icon: "📚", description: "الأدب العربي هو سجل حي يعكس تاريخ الأمة..." },
  { name: "أصول الفقه", icon: "📐", description: "أصول الفقه هو العلم الذي يُعنى بدراسة القواعد..." },
  { name: "البلاغة", icon: "📢", description: "البلاغة هي العلم الذي يُعنى بإيصال المعاني بأجمل أسلوب..." },
  { name: "مصطلح الحديث", icon: "📖", description: "علم الحديث هو العلم الذي يهتم بجمع وتصنيف روايات..." },
  { name: "التفسير", icon: "🔍", description: "علم التفسير هو العلم الذي يهتم بفهم وتأويل معاني..." },
  { name: "الفرائض", icon: "📊", description: "الفرائض في العلوم الشرعية تعني أحكام الميراث والقسمة..." },
  { name: "أحاديث الأحكام", icon: "📜", description: "أحاديث الأحكام هي مجموعة الأحاديث النبوية التي تتناول الأحكام..." },
  { name: "آيات الأحكام", icon: "🛔", description: "آيات الأحكام هي الآيات القرآنية التي تتناول الأحكام الشرعية..." },
  { name: "فن الدعوة والخطابة", icon: "🎧", description: "فن الدعوة والخطابة هو مهارة الاتصال الفعال باستخدام الكلمات..." },
  { name: "الفرق الإسلامية", icon: "🧽", description: "الفرق الإسلامية هي الجماعات أو المذاهب التي تفرعت عن الإسلام..." },
];

export default function DiplomaSection() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [modalSubject, setModalSubject] = useState(null);

  return (
    <section className="bg-white py-16 px-4 md:px-12" id="diploma-section">
      <div className="max-w-6xl mx-auto">
        {/* Blocs descriptifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-green-900">شهادة الأهلية</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              شهادة الأهلية هي إحدى الشهادات الأساسية التي تمنحها مؤسسات التعليم الزيتوني، وتمثل مرحلة متقدمة في السلم التعليمي الزيتوني. يحصل الطالب على هذه الشهادة بعد اجتياز برنامج دراسي مكثف يركز على العلوم الشرعية، اللغة العربية، والعلوم المساعدة مثل المنطق والبلاغة. تعد شهادة التحصيل دليلًا على إتقان الطالب للمقررات الأساسية التي تؤهله للانتقال إلى مستويات أعلى من الدراسة الزيتونية. وتشمل المناهج المتبعة في هذه المرحلة دراسات معمقة للفقه، التفسير، الحديث، والنحو، مما يعكس التزام جامع الزيتونة بتخريج طلبة على دراية راسخة بالمبادئ الإسلامية.
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">شهادة التحصيل</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              تُعتبر شهادة التحصيل الخطوة التالية في مسار التعليم الزيتوني، وتُمنح للطالب بعد أن يُثبت استيعابه المتقدم للعلوم الشرعية والأدبية وإتقانه لمهارات البحث والتحليل. تؤهل هذه الشهادة الطالب للقيام بوظائف التدريس أو الإرشاد الديني، وتُعد بمثابة اعتراف رسمي بكفاءته العلمية وقدرته على الإسهام في المجالين الأكاديمي والدعوي. يتم التركيز خلال هذه المرحلة على التخصص في الفقه المقارن، أصول الفقه، علوم الحديث، إضافة إلى تعزيز قدرات الطالب في تفسير النصوص الشرعية بما يتناسب مع المستجدات المعاصرة.
            </p>
          </div>
        </div>

        {/* Titre motivant */}
        <h2 className="text-xl font-semibold text-center text-green-800 mb-2">
          ✨ كن من رواد العلم، وابدأ رحلتك مع هذه العلوم المباركة ✨
        </h2>
        <h2 className="text-2xl font-bold mb-6 text-center">
          المواد المطلوبة للحصول على الشهادات
        </h2>

        {/* Carrousel Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {subjects.map((s, idx) => (
            <SwiperSlide key={idx}>
              <button
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 w-full"
                onClick={() => setModalSubject(s)}
              >
                <div className="text-5xl mb-3">{s.icon}</div>
                <h4 className="text-lg font-bold text-blue-900">{s.name}</h4>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal d'information */}
        {modalSubject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setModalSubject(null)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{modalSubject.name}</h3>
              <p className="text-gray-700 mb-6">{modalSubject.description}</p>
              <button
                onClick={() => setModalSubject(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}