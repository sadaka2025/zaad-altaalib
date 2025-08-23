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

import Layout from "./pages/Home/Layout";
import HomePage from "./pages/Home/HomePage";
import Formations from "./pages/Formation/Formations";
import NiveauDebutant from "./pages/Formation/years/year1/BeginnerLevel";
import IntroFikhPage from "./pages/Formation/years/year1/Introsubjects/Introfiqh/IntroFikhPage";
import AvisPage from "./pages/Formation/utils/AvisPage";
import QRPage from "./pages/Formation/utils/QRPage";
import AnnoncesPage from "./pages/Formation/utils/AnnoncesPage";
import ProfAvisPage from "./pages/Formation/years/year1/Introsubjects/Introfiqh/ProfAvisPage";
import Niveau2 from "./pages/Formation/years/year2/LevelTwo";
import NiveauMoyen from "./pages/Formation/years/year3/MediumLevel";
import Niveau4 from "./pages/Formation/years/year4/LevelFour";
import NiveauAvance from "./pages/Formation/years/year5/AdvancedLevel";
import SubjectPage from "./pages/Formation/years/subjects/pages/SubjectPage";
import i18n from "./i18n";
import "./i18n";

import { useAuth } from "./context/AuthContext";

// ✅ Composant pour protéger les pages
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={`/${i18n.language || "ar"}`} replace />;
  }
  return children;
}

// ✅ Wrapper pour gérer la langue
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

        {/* Exemple redirection : niveau débutant fiqh → route générique */}
        <Route
          path="niveau-debutant/semester1/fiqh"
          element={
            <Navigate to={`/${lang}/annee/1/matiere/fiqh?semestre=1`} replace />
          }
        />
      </Route>

      {/* ✅ Route générique pour toutes les années/matières */}
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

// ✅ App global (AuthProvider est déjà dans main.jsx)
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/ar" replace />} />
        {/* Toutes les routes avec paramètre langue */}
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />
      </Routes>
    </Router>
  );
}
