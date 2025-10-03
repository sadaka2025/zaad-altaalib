import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Scene from '../Visitors/Scene'; // ✅ importer Scene

import FlowerConfettiButton from '../../components/button/FlowerConfettiButton';

export default function HeroSection() {
  const { t } = useTranslation();
  const { lang } = useParams();

  const link = (path) => `/${lang}${path.startsWith('/') ? path : '/' + path}`;

  // 🔹 Parallax / zoom
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, -30]); // léger décalage vertical
  const scale = useTransform(scrollY, [0, 300], [1, 1.03]); // zoom léger

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Force direction to LTR for Carousel */}
      <div dir="ltr">
        <motion.div style={{ y, scale }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
            showArrows={false}
            swipeable={false}
            emulateTouch={false}
            stopOnHover={false}
          >
            <div>
              <img
                src="/images/carousel1.jpg"
                alt="formation 1"
                className="h-[80vh] w-full object-cover"
              />
            </div>
            <div>
              <img
                src="/images/carousel2.jpg"
                alt="formation 2"
                className="h-[80vh] w-full object-cover"
              />
            </div>
            <div>
              <img
                src="/images/carousel3.jpg"
                alt="formation 3"
                className="h-[80vh] w-full object-cover"
              />
            </div>
          </Carousel>
        </motion.div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div
          className="container  mx-auto px-4 text-white max-w-3xl text-center 
                  flex flex-col justify-between py-[10%] h-full space-y-8"
        >
          {/* 🔹 Texte animé avec flèches */}
          <div className="flex justify-center items-center gap-6">
            <span className="text-6xl">👈</span>
            <Scene
              text="صلوا على النبي محمد ﷺ ❤️"
              className="text-4xl md:text-5xl font-amiri font-bold text-center"
            />
            <span className="text-6xl">👉</span>
          </div>

          {/* 🔹 Titre principal */}
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            🌟 {t('hero_title')}
          </h1>

          {/* 🔹 Description */}
          <p className="text-lg">{t('hero_description')}</p>

          {/* 🔹 Bouton avec effet fleurs */}
          <Link to={link('/formations')} className="mx-auto">
            <FlowerConfettiButton
              label={`📚 ${t('explore_courses')}`}
              theme="بسم الله الرحمن الرحيم"
              className="w-full md:w-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
