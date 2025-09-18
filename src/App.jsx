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

import LayoutConfigurable from './pages/Home/LayoutConfigurable';

import HomePage from './pages/Home/HomePage';
import ChatWidget from './components/ChatWidget';
import Formations from './pages/Formation/Formations';
import NiveauDebutant from './pages/Formation/years/year1/BeginnerLevel';
import QuizChrono from './pages/Home/QuizChrono';
import AvisPage from './pages/Formation/utils/AvisPage';
import QRPage from './pages/Formation/utils/QRPage';
import ProffAvisPage from './pages/Formation/utils/ProffAvisPage';
import AnnoncesPage from './pages/Formation/utils/AnnoncesPage';
import ProblemePage from './pages/Home/ProblemePage';

import Niveau2 from './pages/Formation/years/year2/LevelTwo';
import NiveauMoyen from './pages/Formation/years/year3/MediumLevel';
import Niveau4 from './pages/Formation/years/year4/LevelFour';
import NiveauAvance from './pages/Formation/years/year5/AdvancedLevel';

import SubjectPage from './pages/Formation/years/subjects/pages/SubjectPage';
// Pages Intro
import IntroFikhPage from './pages/Formation/years/year1/Introsubjects/Introfiqh/IntroFikhPage';
import IntrosirahPage from './pages/Formation/years/year1/Introsubjects/Introsirah/IntrosirahPage';
import IntroakhlaqPage from './pages/Formation/years/year1/Introsubjects/Introakhlaq/IntroakhlaqPage';
import IntroaqidaPage from './pages/Formation/years/year1/Introsubjects/Introaqida/IntroaqidaPage';
import IntrohadithPage from './pages/Formation/years/year1/Introsubjects/Introhadith/IntrohadithPage';
import IntronahwPage from './pages/Formation/years/year1/Introsubjects/Intronahw/IntronahwPage';
import IntrotajwidPage from './pages/Formation/years/year1/Introsubjects/Introtajwid/IntrotajwidPage';

import i18n from './i18n';
import './i18n';

import { useAuth } from './context/AuthContext';

// PDF components
import PdfsPage from './components/PdfsPage';
import PdfManager from './components/PdfManager';

// Blog components (simple layout)
import LyaoutArticle from './components/LyaoutArticle';
import Blog from './pages/Blog/Blog';
import ArticleDetail from './pages/Blog/ArticleDetail';
// Protection d’accès
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={`/${i18n.language || 'ar'}`} replace />;
  }
  return children;
}

// Wrapper langue
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
        {/* Pages avec Navbar */}
        <Route element={<LayoutConfigurable showNavbar={true} />}>
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

          {/* Pages Intro */}
          <Route
            path="introfiqh"
            element={
              <RequireAuth>
                <IntroFikhPage />
              </RequireAuth>
            }
          />
          <Route
            path="introsirah"
            element={
              <RequireAuth>
                <IntrosirahPage />
              </RequireAuth>
            }
          />
          <Route
            path="introakhlaq"
            element={
              <RequireAuth>
                <IntroakhlaqPage />
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
          <Route
            path="/quizchrono"
            element={
              <RequireAuth>
                <QuizChrono />
              </RequireAuth>
            }
          />
        </Route>

        {/* Pages sans Navbar */}
        <Route element={<LayoutConfigurable showNavbar={false} />}>
          <Route
            path="niveau-debutant"
            element={
              <RequireAuth>
                <NiveauDebutant />
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
        </Route>

        {/* Blog simple avec LyaoutArticle */}
        <Route
          path="blog-simple"
          element={
            <LyaoutArticle>
              <Blog />
            </LyaoutArticle>
          }
        />
        <Route
          path="/blog-simple/:id"
          element={
            <LyaoutArticle>
              <ArticleDetail />
            </LyaoutArticle>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Routes>

      {/* Widget flottant */}
      <ChatWidget apiPath="http://localhost:5000/api/ask" />
    </>
  );
}

// App global
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/ar" replace />} />

        {/* Routes avec langue */}
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />

        {/* Route directe pour PDFs */}
        <Route path="/pdf" element={<PdfsPage />} />
        <Route path="/pdf/manage" element={<PdfManager />} />

        {/* Probleme accessible sans langue */}
        <Route path="/probleme" element={<ProblemePage />} />

        {/* Blog simple indépendant */}
        <Route
          path="/blog-simple"
          element={
            <LyaoutArticle>
              <Blog />
            </LyaoutArticle>
          }
        />
        <Route
          path="/blog-simple/:id"
          element={
            <LyaoutArticle>
              <ArticleDetail />
            </LyaoutArticle>
          }
        />
      </Routes>
    </Router>
  );
}
