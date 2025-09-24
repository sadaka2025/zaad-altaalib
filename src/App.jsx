// src/App.jsx
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LayoutConfigurable from './pages/Home/LayoutConfigurable';
import HomePage from './pages/Home/HomePage';
import ChatWidget from './components/ChatWidget';

// Pages Formation
import Formations from './pages/Formation/Formations';
import NiveauDebutant from './pages/Formation/years/year1/BeginnerLevel';
import Niveau2 from './pages/Formation/years/year2/LevelTwo';
import NiveauMoyen from './pages/Formation/years/year3/MediumLevel';
import Niveau4 from './pages/Formation/years/year4/LevelFour';
import NiveauAvance from './pages/Formation/years/year5/AdvancedLevel';
import SubjectPage from './pages/Formation/years/subjects/pages/SubjectPage';

// Pages utils
import QuizChrono from './pages/Home/QuizChrono';
import AvisPage from './pages/Formation/utils/AvisPage';
import QRPage from './pages/Formation/utils/QRPage';
import ProffAvisPage from './pages/Formation/utils/ProffAvisPage';
import AnnoncesPage from './pages/Formation/utils/AnnoncesPage';
import ProblemePage from './pages/Home/ProblemePage';
import ContactPage from './pages/Home/ContactPage';

// Intros
import IntroFikhPage from './pages/Formation/years/year1/Introsubjects/Introfiqh/IntroFikhPage';
import IntrosirahPage from './pages/Formation/years/year1/Introsubjects/Introsirah/IntrosirahPage';
import IntroakhlaqPage from './pages/Formation/years/year1/Introsubjects/Introakhlaq/IntroakhlaqPage';
import IntroaqidaPage from './pages/Formation/years/year1/Introsubjects/Introaqida/IntroaqidaPage';
import IntrohadithPage from './pages/Formation/years/year1/Introsubjects/Introhadith/IntrohadithPage';
import IntronahwPage from './pages/Formation/years/year1/Introsubjects/Intronahw/IntronahwPage';
import IntrotajwidPage from './pages/Formation/years/year1/Introsubjects/Introtajwid/IntrotajwidPage';

// Divers
import i18n from './i18n';
import './i18n';

import { AuthProvider, useAuth } from './context/AuthContext';
import PdfsPage from './components/PdfsPage';
import PdfManager from './components/PdfManager';
import LyaoutArticle from './components/LyaoutArticle';
import Blog from './pages/Blog/Blog';
import ArticleDetail from './pages/Blog/ArticleDetail';
import LoginForm from './pages/Visitors/LoginForm';

// --- RequireAuth corrigé ---
function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
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
        <Route element={<LayoutConfigurable showNavbar={true} />}>
          <Route index element={<HomePage />} />

          {/* Formation */}
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
            path="quizchrono"
            element={
              <RequireAuth>
                <QuizChrono />
              </RequireAuth>
            }
          />
        </Route>

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

        {/* Blog */}
        <Route
          path="blog-simple"
          element={
            <LyaoutArticle>
              <Blog />
            </LyaoutArticle>
          }
        />
        <Route
          path="blog-simple/:id"
          element={
            <LyaoutArticle>
              <ArticleDetail />
            </LyaoutArticle>
          }
        />

        <Route path="/contact" element={<ContactPage />} />
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

          {/* Login */}
          <Route path="/login" element={<LoginForm />} />

          {/* PDF / Problème */}
          <Route path="/pdf" element={<PdfsPage />} />
          <Route path="/pdf/manage" element={<PdfManager />} />
          <Route path="/probleme" element={<ProblemePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
