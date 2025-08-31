// src/App.jsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from './pages/Home/Layout';
import HomePage from './pages/Home/HomePage';
import Formations from './pages/Formation/Formations';
import NiveauDebutant from './pages/Formation/years/year1/BeginnerLevel';
import AvisPage from './pages/Formation/utils/AvisPage';
import QRPage from './pages/Formation/utils/QRPage';
import AnnoncesPage from './pages/Formation/utils/AnnoncesPage';
import ProblemePage from './pages/Home/ProblemePage';

import Niveau2 from './pages/Formation/years/year2/LevelTwo';
import NiveauMoyen from './pages/Formation/years/year3/MediumLevel';
import Niveau4 from './pages/Formation/years/year4/LevelFour';
import NiveauAvance from './pages/Formation/years/year5/AdvancedLevel';

import SubjectPage from './pages/Formation/years/subjects/pages/SubjectPage';
// en haut
import IntroFikhPage from './pages/Formation/years/year1/Introsubjects/Introfiqh/IntroFikhPage';
import IntrosiraPage from './pages/Formation/years/year1/Introsubjects/Introsira/IntrosiraPage';
import IntroakhlakPage from './pages/Formation/years/year1/Introsubjects/Introakhlak/IntroakhlakPage';
import IntroaqidaPage from './pages/Formation/years/year1/Introsubjects/Introaquida/IntroaqidaPage';
import IntrohadithPage from './pages/Formation/years/year1/Introsubjects/Introhadith/IntrohadithPage';
import IntronahwPage from './pages/Formation/years/year1/Introsubjects/Intronahw/IntronahwPage';
import IntrotajwidPage from './pages/Formation/years/year1/Introsubjects/Introtajwid/IntrotajwidPage';

import i18n from './i18n';
import './i18n';

import { useAuth } from './context/AuthContext';

// 📂 Import du composant PDF
import PdfList from './components/PdfList';
import PdfManager from './components/PdfManager';

// ✅ Protection d’accès
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={`/${i18n.language || 'ar'}`} replace />;
  }
  return children;
}

// ✅ Wrapper langue
function LangRoutesWrapper() {
  const { lang } = useParams();
  const location = useLocation();
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
    <Routes>
      {/* Toutes les routes avec Layout */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="formations"
          element={
            <RequireAuth>
              <Formations />
            </RequireAuth>
          }
        />
        <Route
          path="niveau-debutant"
          element={
            <RequireAuth>
              <NiveauDebutant />
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

        {/* Matières dynamiques → SubjectPage */}
        <Route
          path="annee/:year/matiere/:subjectSlug"
          element={
            <RequireAuth>
              <SubjectPage />
            </RequireAuth>
          }
        />

        {/* Page Intro spécifique pour Fiqh */}
        <Route
          path="introfiqh"
          element={
            <RequireAuth>
              <IntroFikhPage />
            </RequireAuth>
          }
        />

        <Route
          path="introsira"
          element={
            <RequireAuth>
              <IntrosiraPage />
            </RequireAuth>
          }
        />
        <Route
          path="introakhlak"
          element={
            <RequireAuth>
              <IntroakhlakPage />
            </RequireAuth>
          }
        />

        <Route
          path="introaqida"
          element={
            <RequireAuth>
              <IntroaqidaPage />
            </RequireAuth>
          }
        />

        <Route
          path="introhadith"
          element={
            <RequireAuth>
              <IntrohadithPage />
            </RequireAuth>
          }
        />

        <Route
          path="intronahw"
          element={
            <RequireAuth>
              <IntronahwPage />
            </RequireAuth>
          }
        />
        <Route
          path="introtajwid"
          element={
            <RequireAuth>
              <IntrotajwidPage />
            </RequireAuth>
          }
        />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
    </Routes>
  );
}

// ✅ App global
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/ar" replace />} />

        {/* Routes avec langue */}
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />

        {/* ✅ Route directe pour PDFs, sans langue */}
        <Route path="/pdfs" element={<PdfList />} />
        <Route path="/pdfs/manage" element={<PdfManager />} />

        {/* Probleme accessible sans langue */}
        <Route path="/probleme" element={<ProblemePage />} />
      </Routes>
    </Router>
  );
}
