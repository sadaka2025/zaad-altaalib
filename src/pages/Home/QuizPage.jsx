// src/pages/Home/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Pencil } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import './QuizCarousel.css';
import FlowerConfettiButton from '../../components/button/FlowerConfettiButton';

export default function QuizPage() {
  const { lang } = useParams();
  const navigate = useNavigate();

  const slides = [
    {
      h1: 'كيف تحرك الفكر و توقظ القلب  ؟   ',
      h3: 'أقوى طرق التعلم ليست الإلقاء المجرد، وإنما الحوار التفاعلي ',
      video: '/videos/Quiz/Quiz1.mp4',
      quiz: '/ar/quizchrono',
    },
    {
      h1: 'عليك بالمنهج الرباني في التعليم',
      h3: '🌿  مدرسة سيدنا جبريل عليه السلام في التعلم  بالسؤال والجواب',
      video: '/videos/Quiz/Quiz2.mp4',
      quiz: '/ar/quiz-libre',
    },
    {
      h1: 'مدرسة خالدة 🚀',
      h3: '🌿 تربية على حسن السؤال، وحسن الاستماع، وحسن الجواب ',
      image: '/videos/Quiz/Quiz4.jpg',
      quiz: '/ar/quizchrono',
    },
    {
      h1: 'ابدأ رحلتك الآن 🚀',
      h3: '🌿 أسمى أسلوب في التربية والتعليم، ألا وهو أسلوب السؤال والجواب',
      image: '/videos/Quiz/Quiz5.jpg',
      quiz: '/ar/quiz-libre',
    },
    {
      h1: '📝 Quiz التقييم 🎯 اختبر نفسك',
      h3: 'اختبر نفسك بطريقة تفاعلية',
      image: '/videos/Quiz/Quiz3.jpg',
      quiz: '/ar/quizchrono',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  // Typing effect
  useEffect(() => {
    const fullText = slides[currentSlide].h1;
    let i = 0;
    setDisplayedText('');
    const typing = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 60);
    return () => clearInterval(typing);
  }, [currentSlide]);

  // Auto slide changer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (path) => navigate(path);

  return (
    <section className="h-screen w-full relative overflow-hidden">
      {/* Arrière-plan vidéo ou image */}
      {slides.map((slide, idx) =>
        slide.video ? (
          <video
            key={idx}
            src={slide.video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0'
            }`}
            autoPlay
            loop
            muted
          />
        ) : (
          <img
            key={idx}
            src={slide.image}
            alt="slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0'
            }`}
          />
        )
      )}

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Contenu centré */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20 text-white">
        <motion.h1
          key={currentSlide}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: '"Arabic Typesetting", serif' }}
        >
          {displayedText}
        </motion.h1>

        <motion.h3
          key={`desc-${currentSlide}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-2xl mb-10"
          style={{ fontFamily: '"Arabic Typesetting", serif' }}
        >
          {slides[currentSlide].h3}
        </motion.h3>

        {/* Boutons FlowerConfettiButton centrés */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-xl justify-center">
          <FlowerConfettiButton
            theme="green"
            onClick={() => handleNavClick(slides[currentSlide].quiz)}
            className="w-full md:w-auto px-12 py-5 text-lg"
          >
            <Clock className="w-6 h-6" />⏳ QuizChrono
          </FlowerConfettiButton>

          <FlowerConfettiButton
            theme="yellow"
            onClick={() => handleNavClick('/ar/quiz-libre')}
            className="w-full md:w-auto px-12 py-5 text-lg"
          >
            <Pencil className="w-6 h-6" />
            📝 QuizLibre
          </FlowerConfettiButton>
        </div>
      </div>
    </section>
  );
}
