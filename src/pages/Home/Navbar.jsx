// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Scene from '../Visitors/Scene';
import { gsap } from 'gsap';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  ScrollText,
  Volume2,
  HeartHandshake,
  Brackets,
  BookMarked,
  CalendarDays,
  Landmark,
  Timer,
} from 'lucide-react';

import LanguageSwitcher from '../../components/global/Translation/LanguageSwitcher';
import ModalWithLogin from '../../components/global/Modal/ModalWithLogin';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { lang = 'ar' } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  const isRTL = lang.startsWith('ar');

  const [showModal, setShowModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);

  const link = (path) => `/${lang}${path.startsWith('/') ? path : '/' + path}`;

  const handleNavClick = (path) => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      navigate(link(path));
      setMobileOpen(false);
    }
  };

  const subjects = useMemo(
    () => [
      { key: 'fiqh', label: '⚖️ فقه', icon: GraduationCap },
      { key: 'sirah', label: '📜 سيرة', icon: BookOpen },
      { key: 'tajwid', label: '📖 تجويد', icon: Volume2 },
      { key: 'nahw', label: '✒️ نحو', icon: Brackets },
      { key: 'akhlaq', label: '🌿 الأخلاق', icon: HeartHandshake },
      { key: 'hadith', label: '📚 الحديث', icon: ScrollText },
      { key: 'aqida', label: '🕌 العقيدة', icon: Landmark },
    ],
    [t]
  );

  const bonus = {
    key: 'bonus',
    label: '📘 ' + t('student_board.bonus.name'),
    icon: BookMarked,
    items: t('student_board.bonus.items', { returnObjects: true }),
  };

  const years = [1, 2, 3, 4, 5];

  const pop = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, y: 6, transition: { duration: 0.15 } },
  };

  const rootRef = useRef(null);
  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setStudentMenuOpen(false);
        setActiveSubject(null);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    // cibler l'image spécifique via la classe .logo-vertical
    gsap.to('.logo-vertical', {
      rotationY: 360,
      repeat: -1,
      duration: 4,
      ease: 'linear',
      transformOrigin: 'center center',
      transformPerspective: 800,
    });
  }, []);

  return (
    <header
      className={`bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white py-4 shadow-xl font-sans sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 ${
        isRTL ? 'rtl' : ''
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1
          className="text-3xl font-extrabold flex items-center gap-2 cursor-pointer select-none text-yellow-400 drop-shadow-lg"
          onClick={() => navigate(link('/'))}
        >
          <Scene
            imageSrc="/images/logo.png"
            imageClassName="logo-vertical w-8 h-8 rounded-full [transform-style:preserve-3d] [backface-visibility:hidden]"
          />
          زاد الطالب
        </h1>

        {/* NAV Desktop */}
        <nav className="hidden md:flex gap-3 items-center" ref={rootRef}>
          <button
            onClick={() => handleNavClick('/')}
            className="px-4 py-2 rounded-xl font-bold text-yellow-400 border border-yellow-500 hover:bg-yellow-500 hover:text-slate-900 shadow-lg transition"
          >
            {t('home')}
          </button>

          {/* Student Board */}
          <div
            className="relative"
            onMouseEnter={() => setStudentMenuOpen(true)}
            onMouseLeave={() => {
              setStudentMenuOpen(false);
              setActiveSubject(null);
            }}
          >
            <button
              className="group border border-yellow-500 text-yellow-400 font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 hover:from-yellow-500 hover:to-yellow-400 hover:text-slate-900 transition-all shadow-lg flex items-center gap-2"
              onClick={() => setStudentMenuOpen((v) => !v)}
            >
              {t('student_board.title')}
              <ChevronDown
                className={`size-4 transition-transform ${studentMenuOpen ? (isRTL ? 'rotate-90' : '-rotate-90') : ''}`}
              />
            </button>

            <AnimatePresence>
              {studentMenuOpen && (
                <motion.div
                  key="subjects"
                  variants={pop}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 bg-white/90 backdrop-blur-xl text-slate-900 rounded-2xl shadow-2xl ring-1 ring-black/10 p-4 grid grid-cols-2 gap-3 w-[520px]`}
                >
                  {[...subjects, bonus].map((s) => {
                    const Icon = s.icon;
                    const isActive = activeSubject === s.key;
                    return (
                      <div key={s.key} className="relative">
                        <button
                          onMouseEnter={() => setActiveSubject(s.key)}
                          onFocus={() => setActiveSubject(s.key)}
                          className={`w-full text-start flex items-center gap-3 px-3 py-2 rounded-xl transition-all border ${
                            isActive
                              ? 'bg-yellow-50 border-yellow-400 shadow-inner'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <span className="shrink-0 inline-flex items-center justify-center rounded-xl p-2 bg-slate-100">
                            <Icon className="size-5" />
                          </span>
                          <span className="font-semibold">{s.label}</span>
                        </button>

                        {isActive && (
                          <motion.ul
                            initial={{ opacity: 0, x: isRTL ? -15 : 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRTL ? -15 : 15 }}
                            className={`absolute top-0 ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} bg-white/95 backdrop-blur-xl text-gray-900 rounded-xl shadow-xl p-3 min-w-[240px] z-50`}
                          >
                            {s.key !== 'bonus'
                              ? years.map((y) => (
                                  <li
                                    key={y}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100 cursor-pointer rounded-md whitespace-nowrap"
                                    onClick={() =>
                                      handleNavClick(
                                        `/annee/${y}/matiere/${s.key}`
                                      )
                                    }
                                  >
                                    <CalendarDays className="size-4 text-blue-500" />
                                    {t(
                                      `student_board.subjects.${s.key}.years.year${y}`
                                    )}
                                  </li>
                                ))
                              : s.items.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer rounded-md whitespace-nowrap"
                                  >
                                    {item}
                                  </li>
                                ))}
                          </motion.ul>
                        )}
                      </div>
                    );
                  })}

                  <div className="col-span-2">
                    <button
                      onClick={() => handleNavClick('/quizchrono')}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold shadow-lg hover:from-red-600 hover:to-orange-500 transition-all"
                    >
                      <Timer className="size-5" />
                      <span className="font-semibold">⏳ QuizChrono</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleNavClick('/formations')}
            className="px-4 py-2 rounded-xl font-bold text-yellow-400 border border-yellow-500 hover:bg-yellow-500 hover:text-slate-900 shadow-lg transition"
          >
            {t('courses')}
          </button>
          <button
            onClick={() => handleNavClick('/contact')}
            className="px-4 py-2 rounded-xl font-bold text-yellow-400 border border-yellow-500 hover:bg-yellow-500 hover:text-slate-900 shadow-lg transition"
          >
            {t('contact')}
          </button>
          <button
            onClick={() => handleNavClick('/blog-simple')}
            className="px-4 py-2 rounded-xl font-bold text-yellow-400 border border-yellow-500 hover:bg-yellow-500 hover:text-slate-900 shadow-lg transition flex items-center gap-2"
          >
            📰 مقالات
          </button>
        </nav>

        {/* Lang + Login */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex border border-yellow-500 text-yellow-400 font-bold px-3 py-2 rounded-xl hover:bg-yellow-500 hover:text-slate-900">
            <LanguageSwitcher />
          </div>

          {!isAuthenticated ? (
            <button
              onClick={() => setShowModal(true)}
              className="hidden md:inline-flex border border-yellow-500 text-yellow-400 font-bold px-4 py-2 rounded-xl hover:bg-yellow-500 hover:text-slate-900 ml-2"
            >
              {t('signIn')}
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate(link('/'));
              }}
              className="border border-yellow-500 text-yellow-400 font-bold px-4 py-2 rounded-xl hover:bg-yellow-500 hover:text-slate-900 ml-2"
            >
              {t('logout')}
            </button>
          )}

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-yellow-500 p-2 text-yellow-400 hover:bg-yellow-500 hover:text-slate-900 ml-2"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-slate-900 text-yellow-400 shadow-2xl p-6 space-y-4"
          >
            <button
              onClick={() => handleNavClick('/')}
              className="w-full text-start px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-slate-900"
            >
              {t('home')}
            </button>
            {subjects.map((s) => (
              <div key={s.key} className="w-full">
                <p className="px-4 py-2 font-bold">{s.label}</p>
                <ul className="pl-6 space-y-1">
                  {years.map((y) => (
                    <li
                      key={y}
                      className="px-4 py-1 hover:bg-yellow-500 hover:text-slate-900 rounded-md cursor-pointer"
                      onClick={() =>
                        handleNavClick(`/annee/${y}/matiere/${s.key}`)
                      }
                    >
                      {t(`student_board.subjects.${s.key}.years.year${y}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={() => handleNavClick('/quizchrono')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold shadow-lg hover:from-red-600 hover:to-orange-500 transition-all"
            >
              <Timer className="size-5" />
              <span>⏳ QuizChrono</span>
            </button>
            <button
              onClick={() => handleNavClick('/formations')}
              className="w-full text-start px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-slate-900"
            >
              {t('courses')}
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full text-start px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-slate-900"
            >
              {t('contact')}
            </button>
            <button
              onClick={() => handleNavClick('/blog-simple')}
              className="w-full text-start px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-slate-900 flex items-center gap-2"
            >
              📰 مقالات
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Login */}
      {showModal && (
        <ModalWithLogin
          onLoginSuccess={() => {
            login();
            setShowModal(false);
          }}
          forceOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </header>
  );
}
