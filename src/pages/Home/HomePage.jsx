import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import HeroSection from './HeroSection';
import BenefitsSection from './BenefitsSection';
import InstructorsSection from './InstructorsSection';
import TestimonialsSection from './TestimonialsSection';
import ScrollToTopButton from '@components/global/scroll/ScrollToTopButton';
import ScrollDownButton from '@components/global/scroll/ScrollDownButton';
import DiplomaSection from './DiplomaSection';
import Footer from './Footer';
import StatsSection from './StatsSection';

export default function HomePage() {
  const stats = {
    totalEntrepreneurs: 1741,
    participants: 708,
    positiveReviews: 100,
    questions: 3000,
    videos: 60,
    videosDetail: '42 + 18 sur le groupe',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      console.log('Aucun email trouvé → ouverture modal après 2s');
      const timer = setTimeout(() => {
        setModalOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.log('Email trouvé :', email, '→ modal fermée');
      setModalOpen(false);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    console.log('Connexion réussie → fermeture modal');
    localStorage.setItem('userEmail', email);
    setModalOpen(false);
  };

  // Animation framer-motion compatible JS/TS
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // pas d'ease pour éviter erreurs TS
  };

  return (
    <div
      className={`min-h-screen bg-sky-100 text-gray-800 ${
        isRTL ? 'font-arabic' : ''
      }`}
    >
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('seo_home_title')}</title>
        <meta name="description" content={t('seo_home_description')} />
      </Helmet>

      {/* Sections animées */}
      <motion.section
        className="mb-12"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HeroSection />
      </motion.section>

      <motion.section
        className="mb-12"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BenefitsSection />
      </motion.section>

      <motion.section
        className="mb-12"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DiplomaSection />
      </motion.section>

      <motion.section
        className="mb-12"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <InstructorsSection />
      </motion.section>

      <motion.section
        className="mb-12"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TestimonialsSection />
      </motion.section>

      <motion.section
        className="mb-12"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <StatsSection stats={stats} />
      </motion.section>

      <ScrollToTopButton />
      <ScrollDownButton />

      <Footer />
    </div>
  );
}
