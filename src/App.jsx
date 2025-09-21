// src/App.jsx
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './context/AuthContext';

import LoginForm from './pages/Visitors/LoginForm';
import LayoutConfigurable from './pages/Home/LayoutConfigurable';
import HomePage from './pages/Home/HomePage';
import Formations from './pages/Formation/Formations';
import NiveauDebutant from './pages/Formation/years/year1/BeginnerLevel';
import QuizChrono from './pages/Home/QuizChrono';
import AvisPage from './pages/Formation/utils/AvisPage';
import QRPage from './pages/Formation/utils/QRPage';
import AnnoncesPage from './pages/Formation/utils/AnnoncesPage';
import ProffAvisPage from './pages/Formation/utils/ProffAvisPage';
import Niveau2 from './pages/Formation/years/year2/LevelTwo';
import NiveauMoyen from './pages/Formation/years/year3/MediumLevel';
import Niveau4 from './pages/Formation/years/year4/LevelFour';
import NiveauAvance from './pages/Formation/years/year5/AdvancedLevel';
import SubjectPage from './pages/Formation/years/subjects/pages/SubjectPage';
import ChatWidget from './components/ChatWidget';
import PdfsPage from './components/PdfsPage';
import PdfManager from './components/PdfManager';
import LyaoutArticle from './components/LyaoutArticle';
import Blog from './pages/Blog/Blog';
import ArticleDetail from './pages/Blog/ArticleDetail';
import ContactPage from './pages/Home/ContactPage';
import ProblemePage from './pages/Home/ProblemePage';

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function LangRoutesWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    const supportedLangs = ['fr', 'ar', 'en'];
    const selectedLang = supportedLangs.includes(lang) ? lang : 'ar';
    i18n.changeLanguage(selectedLang);
    document.documentElement.setAttribute('lang', selectedLang);
    document.documentElement.setAttribute(
      'dir',
      selectedLang === 'ar' ? 'rtl' : 'ltr'
    );
  }, [lang, i18n]);

  return (
    <>
      <Routes>
        {/* Pages publiques */}
        <Route element={<LayoutConfigurable showNavbar={true} />}>
          <Route index element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Pages protégées */}
        <Route element={<LayoutConfigurable showNavbar={true} />}>
          <Route
            path="formations"
            element={
              <RequireAuth>
                <Formations />
              </RequireAuth>
            }
          />
          <Route
            path="avis"
            element={
              <RequireAuth>
                <AvisPage />
              </RequireAuth>
            }
          />
          <Route
            path="qr"
            element={
              <RequireAuth>
                <QRPage />
              </RequireAuth>
            }
          />
          <Route
            path="annonces"
            element={
              <RequireAuth>
                <AnnoncesPage />
              </RequireAuth>
            }
          />
          <Route
            path="profavis/:subject"
            element={
              <RequireAuth>
                <ProffAvisPage />
              </RequireAuth>
            }
          />
          <Route
            path="niveau-2"
            element={
              <RequireAuth>
                <Niveau2 />
              </RequireAuth>
            }
          />
          <Route
            path="niveau-moyen"
            element={
              <RequireAuth>
                <NiveauMoyen />
              </RequireAuth>
            }
          />
          <Route
            path="niveau-4"
            element={
              <RequireAuth>
                <Niveau4 />
              </RequireAuth>
            }
          />
          <Route
            path="niveau-avance"
            element={
              <RequireAuth>
                <NiveauAvance />
              </RequireAuth>
            }
          />
          <Route
            path="annee/:year/matiere/:subjectSlug"
            element={
              <RequireAuth>
                <SubjectPage />
              </RequireAuth>
            }
          />
          <Route
            path="/quizchrono"
            element={
              <RequireAuth>
                <QuizChrono />
              </RequireAuth>
            }
          />
        </Route>

        {/* Blog */}
        <Route element={<LyaoutArticle />}>
          <Route path="blog-simple" element={<Blog />} />
          <Route path="blog-simple/:id" element={<ArticleDetail />} />
        </Route>

        {/* PDF */}
        <Route path="/pdf" element={<PdfsPage />} />
        <Route path="/pdf/manage" element={<PdfManager />} />

        {/* Page problème */}
        <Route path="/probleme" element={<ProblemePage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Routes>

      {/* Chat Widget global */}
      <ChatWidget apiPath="http://localhost:5000/api/ask" />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/ar" replace />} />
          <Route path="/:lang/*" element={<LangRoutesWrapper />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
