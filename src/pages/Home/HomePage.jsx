// src/pages/Home/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';
import ModalWithLogin from '../../components/Modal/ModalWithLogin';

import HeroSection from './HeroSection';
import BenefitsSection from './BenefitsSection';
import InstructorsSection from './InstructorsSection';
import TestimonialsSection from './TestimonialsSection';
import ScrollToTopButton from '@components/scroll/ScrollToTopButton';
import ScrollDownButton from '@components/scroll/ScrollDownButton';
import DiplomaSection from './DiplomaSection';
import Footer from './Footer';
import StatsSection from './StatsSection';
import merge_stats_5years from '../../datastat/years/merge_stats_5years.json';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.language === 'ar';

  const { isAuthenticated, loading } = useAuth();

  // ✅ Gérer RTL
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // ✅ Hybride : ouvrir modal uniquement au premier passage
  useEffect(() => {
    if (loading) return;

    const alreadyVisited = localStorage.getItem('alreadyVisited');
    if (!isAuthenticated && !alreadyVisited) {
      setModalOpen(true); // ouvre une seule fois
      localStorage.setItem('alreadyVisited', 'true');
    }
  }, [isAuthenticated, loading]);

  const handleLoginSuccess = () => {
    setModalOpen(false);
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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
        <StatsSection statsJson={merge_stats_5years} />
      </motion.section>

      {/* ✅ Bouton manuel toujours dispo si pas connecté */}
      {!isAuthenticated && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
          >
            {t('login_button', 'Se connecter')}
          </button>
        </div>
      )}

      {/* ✅ Modal */}
      {modalOpen && (
        <ModalWithLogin
          forceOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <ScrollToTopButton />
      <ScrollDownButton />
      <Footer />
    </div>
  );
}
