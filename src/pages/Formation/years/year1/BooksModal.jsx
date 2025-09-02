// src/pages/Formation/years/year1/BooksModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import Modal from '@components/global/Modal/Modal';
import ColorThief from 'colorthief';

// === Map globale des livres par clé ===
const booksMap = {
  fiqh: {
    id: 1,
    title: 'الفقه',
    author:
      'لإمام أبي محمد عبد الواحد بن أحمد بن علي بن عاشر الأنصاري: اسم المؤلف',
    price: '5 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'سيرة مؤلف كتاب : الأنصاري نسباً، الأندلسي أصلاً، نشأ بفاس التي ولد بها سنة 990هـ، وبها تلقى تعليمه. ذكر الفضيلي أنه من حفدة الشيخ أبي العباس أحمد بن محمد بن عمر ابن عاشر السلاوي المتوفى سنة 765هـ. وقد تصدَّر للتدريس والمشيخة والخطابة، وشارك في جل العلوم وخصوصاً في علم القراءات والرسم والضبط والنحو والإعراب وعلم الكلام والأصول والفقه. وتوفي بفاس سنة 1040هـ بعد مرض مفاجئ أصابه.',
    objectives:
      'أهداف هذا المقرر: متن ابن عاشر المسمى (المرشد المعين على الضروري من علوم الدين) هو كتاب للإمام عبد الواحد بن عاشر المالكي الأشعري الصوفي (ت 1040هـ = 1631م) عبارة عن منظومة في أصول الدين على مذهب الإمام مالك ضمّت 317 بيتاً من بحر الرجز في العقيدة والفقه والسلوك ، وهي منظومة ذاع صيتها وتلقتها الأمة الإسلامية بالقبول حتى اعتبرت درَّة من دُرر الفقه المالكي.\nوالمنظومة وإن كانت صغيرة الحجم، فقد جمعت أصول الدين وفروعه، مما لا يسع المسلم جهله، في أوجز لفظ، وأوضح عبارة، تقيد فيها ابن عاشر بالمذهب المالكي، ولم يخرج عن المشهور، والراجح، والمعمول به، والمنظومة كذلك لا تخلو من دليل يرتكز على الكتاب والسنة والأصول التي اعتمدها المالكية في مذهبهم، لذلك ظلت المنظومة ولا تزال المنطلق الأول لمن أراد دراسة الفقه المالكي.\nكما اتسمت العناية بالنظم من لدن العلماء بالوفرة والتنوع، إذ منهم من خصه بالشرح المطول لسائر أبواب النظم، ومنهم من أفرد أحد الأبواب الثلاثة بالشرح المستفيض أي العقيدة أو الفقه أو التصوف، ومنهم من اكتفى بالشرح المختصر، ومنهم من اتجهت عنايته إلى شرحه شرحاً إشارياً على اصطلاح أهل التصوف.\nولقد خص العلامة ابن عاشر علم الاعتقاد بكتاب مستقل من منظومته المذكورة، قصد فيه إلى بيان أمهات العقائد على مذهب الإمام المجدد أبي الحسن الأشعري (ت 324هـ)، حيث جاءت مقاصده معربة عن التوجهات الأصلية الكبرى للمذهب الأشعري، والتي ينتظمها أصل التنزيه والتعظيم مقصداً، وأصل الوسطية والاعتدال منهجاً..',
    image: '/images/books/fiqh.jpg',
    pdf: '/pdf/books/fiqh.pdf',
  },
  aqida: {
    id: 2,
    title: 'العقيدة',
    author:
      'الشيخ إبراهيم بن أحمد المارغني الزيتوني المالكي الأشعري هو أحد علماء الأشاعرة، وتوفي عام 1349هـ أو 1394هـ : اسم المؤلف',
    price: '7,200 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'مؤلف كتاب : لمحة عن الشيخ إبراهيم المارغني:\nاللقب: يُعرف أيضاً بالعَلاَمَة المُقرِئ.\nالمذهب: مالكي أشعري.\nالوفاة: تختلف المصادر في تحديد سنة وفاته، حيث تذكر بعض المصادر 1349هـ، بينما تذكر أخرى 1394هـ.\nالنشاط العلمي: اشتهر بشرح المنظومات في العقيدة، مثل منظومة العقائد الشرنوبية.',
    objectives:
      'أهداف هذا المقرر: يتسم كتاب "الشذرات الذهبية" بأنه شرح لمنظومة في العقيدة الأشعرية، ويهدف إلى توضيح مبادئ العقيدة الإسلامية.',
    image: '/images/books/aqida.jpg',
    pdf: '/pdf/books/aqida.pdf',
  },
  tajwid: {
    id: 3,
    title: 'التجويد',
    author: 'لإمام سليمان بن حسين بن محمد الجمزوري: اسم المؤلف',
    price: '5,200 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'سيرة مؤلف كتاب "تفاصيل سيرته:\nالاسم: سليمان بن حسين بن محمد الجمزوري.\nالنسبة: يُنسب إلى جمزور، وهي قرية قريبة من طنطا في مصر.\nمكان وتاريخ الولادة: ولد في طنطا في ربيع الأول من سنة 1160 هجرية تقريبًا.\nالمذهب: كان شافعي المذهب.\nالتلقب: لُقِّب بالأفندي من قبل شيخه سيدي مجاهد الأحمدي.\nالشيوخ والتتلمذ: درس على يد العديد من المشايخ.\nتاريخ الوفاة: لم تُعرف سنة وفاته بالتحديد.\nأهم مؤلفاته: تحفة الأطفال في تجويد القرآن، فتح الإقفال، الفتح الرحماني، كنز المعاني، جامع المسرة، منظومة في رواية ورش، الدر المنظوم.',
    objectives:
      'أهداف هذا المقرر: متن منظوم في علم تجويد القرآن، يُدرس في المستوى الابتدائي، اختصت بأحكام النون الساكنة والتنوين والمدود فقط، بأسلوب مبسط للطلبة المبتدئين.',
    image: '/images/books/tajwid.jpg',
    pdf: '/pdf/books/tajwid.pdf',
  },
  nahw: {
    id: 4,
    title: 'النحو',
    author: 'العالم المصري محمد الحفني ناصف: اسم المؤلف',
    price: '110 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'سيرة مؤلف كتاب:\nتاريخ الميلاد: 16 ديسمبر 1855م.\nمكان الميلاد: بركة الحج بالقليوبية.\nنشأته: توفيت والدته وهو جنين.\nالتعليم: برع في مصر.\nالرحلات: سافر إلى أوروبا، علاقات مع المستشرقين.\nعضوية: اختارته أكاديمية اللغة الفرنسية.\nمؤلفاته: "نحو الدروس النحوية".\nتوفي عام 1919م.',
    objectives:
      'أهداف هذا المقرر: تزويد المتعلم بأساس متين في قواعد النحو العربي من خلال شرح مبسط وتدريجي، مع التركيز على القواعد الأساسية للإعراب وتطبيقها.',
    image: '/images/books/nahw.jpg',
    pdf: '/pdf/books/nahw.pdf',
  },
  sirah: {
    id: 5,
    title: 'السيرة',
    author: 'الشيخ محمد الخضري بك: اسم المؤلف',
    price: '18,700 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'سيرة مؤلف كتاب:\nمن هو: عالم وباحث وخطيب مصري.\nتخصص: العلوم الشرعية والتاريخ.\nمكانته: كان مفتشاً بوزارة المعارف.\nشهرته: تبسيط العلوم.\nأعماله: "نور اليقين في سيرة سيد المرسلين".',
    objectives:
      'أهداف هذا المقرر: يتناول الكتاب السيرة النبوية بتسلسل زمني يشمل: المولد والنشأة، الطفولة، البعثة، الهجرة، الغزوات الكبرى، حجة الوداع، الوفاة.',
    image: '/images/books/sirah.jpg',
    pdf: '/pdf/books/sirah.pdf',
  },
  hadith: {
    id: 6,
    title: 'الحديث',
    author:
      'لإمام تقي الدين أبو الفتح محمد بن علي بن وهب بن مطيع القشيري المعروف بابن دقيق العيد: اسم المؤلف',
    price: '9 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'سيرة مؤلف كتاب:\nمكان الولادة: وُلد في ينبع.\nالنشأة: نشأ في قوص.\nالتعليم: دمشق والإسكندرية ثم القاهرة.\nالمناصب: قاضي مصر سنة 695هـ.\nصفاته: جمع بين فقه مالك والشافعي.\nوفاته: القاهرة.',
    objectives:
      'أهداف هذا المقرر: تيسير فهم الأحاديث النبوية وشرحها وتبيين الأحكام والفوائد المستنبطة منها، مع التأكيد على العمل بمضمونها.',
    image: '/images/books/hadith.jpg',
    pdf: '/public/PDFs/year1/pdfStudyBooks/s1/hadith/bookshadiths1.pdf',
  },
  akhlaq: {
    id: 7,
    title: 'الأخلاق',
    author: 'لإمام بدر الدين بن جماعة الكناني: اسم المؤلف',
    price: '11,500 د.ت',
    library:
      'دار الزيتونة للكتاب توفر كل الكتب والمواد المقررة للسنة الأولى من التعليم الزيتوني أسعار خاصة بطلبة العلم ودارسي المناهج الزيتونية مع خدمة التوصيل متوفرة لجميع ولايات الجمهورية',
    bio: 'سيرة مؤلف كتاب "تذكرة السامع والمتكلم" هو الإمام بدر الدين بن جماعة الكناني، واسمه بدر الدين محمد بن إبراهيم بن سعد الله بن جماعة الشافعي. اشتهر بكونه قاضياً ومفتياً وفقيهاً وأصولياً.\nمعلومات إضافية:\nاللقب: ابن جماعة.\nالمذهب: شافعي.\nالمناصب: قضاء الشام ومصر.\nتوفي سنة 733 هـ.\nأشهر كتبه: "تذكرة السامع والمتكلم".',
    objectives:
      'أهداف هذا المقرر: يشمل فضائل العلم، آداب العلماء، التخلق بالزهد، التحلي بمكارم الأخلاق، صيانة العلم، المحافظة على المندوبات والشعائر، الاجتهاد في التعلم، والاقتداء بالنبي صلى الله عليه وسلم.',
    image: '/images/books/akhlaq.jpg',
    pdf: '/pdf/books/akhlaq.pdf',
  },
};

// Fonction utilitaire pour choisir un texte contrastant
const getContrastingColor = ([r, g, b]) => {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? '#000000' : '#ffffff';
};

export default function BooksModal({ isOpen, onClose, subjectKey }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBio, setShowBio] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);

  const books = subjectKey ? [booksMap[subjectKey]] : Object.values(booksMap);

  const lineStyle = {
    display: 'inline-block',
    maxHeight: '1.2em',
    overflow: 'hidden',
    verticalAlign: 'bottom',
    transition: 'max-height 0.3s ease',
  };

  const expandedStyle = {
    maxHeight: '500px',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedBook(null);
        setShowBio(false);
        setShowObjectives(false);
      }}
      title="مقررات السنة الأولى"
      content={
        selectedBook ? (
          // === Vue détaillée ===
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:p-6 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow z-10"
            >
              🔙 رجوع
            </button>

            <div className="flex flex-col items-center justify-center">
              <img
                src={selectedBook.image || '/images/placeholder.png'}
                alt={selectedBook.title}
                className="w-72 h-auto shadow-lg rounded-lg"
              />
            </div>

            <div className="overflow-y-auto p-2 md:p-4 text-black">
              <h2 className="text-3xl font-extrabold mb-4 text-emerald-700 flex items-center justify-between">
                <span>{selectedBook.title}</span>
                {selectedBook.pdf && (
                  <a
                    href={selectedBook.pdf}
                    download
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow text-sm"
                  >
                    ⬇️ تحميل الكتاب PDF
                  </a>
                )}
              </h2>
              <p className="mb-1">
                <span className="font-bold">عنوان الكتاب:</span>{' '}
                {selectedBook.title}
              </p>
              <p className="whitespace-pre-line text-justify">
                <span className="font-bold">مؤلف الكتاب:</span>{' '}
                {selectedBook.author}
              </p>

              <p className="mb-4">
                <span className="font-bold">سعر الكتاب:</span>{' '}
                {selectedBook.price}
              </p>
              <p className="whitespace-pre-line text-justify">
                <span className="font-bold">مكتبة :</span>{' '}
                {selectedBook.library}
              </p>

              <h3 className="font-bold whitespace-pre-line text-justify">
                سيرة مؤلف الكتاب
              </h3>
              <div className="flex items-center gap-2">
                <p
                  className="whitespace-pre-line text-justify"
                  dir="rtl"
                  style={{ ...lineStyle, ...(showBio ? expandedStyle : {}) }}
                >
                  {selectedBook.bio}
                </p>

                <button
                  onClick={() => setShowBio(!showBio)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg shadow text-sm whitespace-nowrap"
                >
                  {showBio ? 'اخفاء' : ' ✨عرض المزيد'}
                </button>
              </div>

              <h3 className="font-bold whitespace-pre-line text-justify">
                أهداف المقرر
              </h3>
              <div className="flex items-center gap-2">
                <p
                  className="text-gray-800"
                  style={{
                    ...lineStyle,
                    ...(showObjectives ? expandedStyle : {}),
                  }}
                >
                  {selectedBook.objectives}
                </p>
                <button
                  onClick={() => setShowObjectives(!showObjectives)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg shadow text-sm whitespace-nowrap"
                >
                  {showObjectives ? 'اخفاء' : 'عرض المزيد'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // === Vue grille ===
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/zitouna-bg.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative py-8 md:py-12 text-center px-4">
                {/* Titre principal */}
                <p className="text-2xl md:text-4xl font-black text-[#FFD700] mb-2">
                  “✨ مقررات السنة الأولى للسنة الدراسية 2024-2025”
                </p>

                {/* Texte d’instruction */}
                <p className="inline-block px-4 py-2 bg-[#00CED1]/80 text-black font-bold rounded-lg animate-pulse">
                  📚 اكتشف تفاصيل الكتاب – انقر على الصورة
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {books.map((book) =>
                book ? (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => setSelectedBook(book)}
                  />
                ) : null
              )}
            </div>
          </div>
        )
      }
    />
  );
}

// === Composant BookCard avec ColorThief + effet zoom/parallax ===
const BookCard = ({ book, onClick }) => {
  const imgRef = useRef(null);
  const [dominantColor, setDominantColor] = useState([107, 114, 128]);
  const [contrastColor, setContrastColor] = useState('#fff');

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      extractColor();
    } else {
      img.addEventListener('load', extractColor);
      return () => img.removeEventListener('load', extractColor);
    }
  }, [book.image]);

  const extractColor = () => {
    try {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(imgRef.current);
      setDominantColor(color);
      setContrastColor(getContrastingColor(color));
    } catch (err) {
      console.warn('ColorThief error:', err);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group w-40 rounded-xl overflow-hidden shadow-lg"
    >
      {/* Image avec effet zoom/parallax */}
      <img
        ref={imgRef}
        src={book.image || '/images/placeholder.png'}
        alt={book.title}
        crossOrigin="anonymous"
        className="w-40 h-56 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-90 transition duration-300 flex items-center justify-center"
        style={{ backgroundColor: `rgb(${dominantColor.join(',')})` }}
      >
        <span
          className="font-bold font-black text-center drop-shadow-lg animate-pulse"
          style={{ color: contrastColor }}
        >
          📚 اكتشف تفاصيل الكتاب
        </span>
      </div>
      <p className="text-center p-2 font-semibold bg-white">{book.title}</p>
    </div>
  );
};
