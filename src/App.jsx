// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Formations from "./pages/Formations";
import NiveauDebutant from "./pages/NiveauDebutant/niveau-debutant";
import IntroFikhPage from "./pages/NiveauDebutant/IntroFikhPage";
import AvisPage from "./pages/NiveauDebutant/AvisPage";
import QRPage from "./pages/NiveauDebutant/QRPage";
import AnnoncesPage from "./pages/NiveauDebutant/AnnoncesPage";
import ProfAvisPage from "./pages/NiveauDebutant/ProfAvisPage";
import Niveau2 from "./pages/Niveau2";
import NiveauMoyen from "./pages/NiveauMoyen";
import Niveau4 from "./pages/Niveau4";
import NiveauAvance from "./pages/NiveauAvance";
import SubjectPage from "./features/subjects/pages/SubjectPage";

import i18n from "./i18n";
import "./i18n";

// Composant pour protéger les pages
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={`/${i18n.language || "ar"}`} replace />;
  }
  return children;
}

// Wrapper pour gérer la langue
function LangRoutesWrapper() {
  const { lang } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const supportedLangs = ["fr", "ar", "en"];
    const selectedLang = supportedLangs.includes(lang) ? lang : "ar";
    i18n.changeLanguage(selectedLang);
    document.documentElement.setAttribute("lang", selectedLang);
    document.documentElement.setAttribute(
      "dir",
      selectedLang === "ar" ? "rtl" : "ltr"
    );
  }, [lang, i18n]);

  return (
    <Routes>
      {/* Toutes les routes avec Layout */}
      <Route element={<Layout />}>
        {/* HomePage accessible sans login */}
        <Route index element={<HomePage />} />

        {/* Pages protégées */}
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
          path="intro"
          element={
            <RequireAuth>
              <IntroFikhPage />
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
          path="profavis"
          element={
            <RequireAuth>
              <ProfAvisPage />
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

        {/* Redirection vers Fiqh semestre 1 */}
        <Route
          path="niveau-debutant/semester1/fiqh"
          element={
            <RequireAuth>
              <Navigate
                to={`/${lang}/annee/1/matiere/fiqh?semestre=1`}
                replace
              />
            </RequireAuth>
          }
        />
      </Route>

      {/* Page Subject isolée protégée */}
      <Route
        path="annee/:year/matiere/:subjectSlug"
        element={
          <RequireAuth>
            <SubjectPage />
          </RequireAuth>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
    </Routes>
  );
}

// App global avec AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/ar" replace />} />
          {/* Toutes les routes avec paramètre langue */}
          <Route path="/:lang/*" element={<LangRoutesWrapper />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
