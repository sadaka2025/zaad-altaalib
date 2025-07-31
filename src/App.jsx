// SubjectPage.jsx and App.jsx have been integrated and preserved in full detail
// Use this file as a reference to update your local development setup.

// ✅ Your SubjectPage.jsx is already complete and requires no change based on your request
// ✅ Below is your App.jsx (already accurate and complete)

// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Formations from "./pages/Formations";
import NiveauDebutant from "./pages/NiveauDebutant/niveau-debutant";
import Niveau2 from "./pages/Niveau2";
import NiveauMoyen from "./pages/NiveauMoyen";
import Niveau4 from "./pages/Niveau4";
import NiveauAvance from "./pages/NiveauAvance";
import { useNavigate } from "react-router-dom";

import SubjectPage from "./features/subjects/pages/SubjectPage";

import i18n from "./i18n";
import "./i18n";

function LangRoutesWrapper() {
  const { lang } = useParams();
  useEffect(() => {
    const supportedLangs = ["fr", "ar", "en"];
    const selectedLang = supportedLangs.includes(lang) ? lang : "ar";
    i18n.changeLanguage(selectedLang);
    document.documentElement.setAttribute("lang", selectedLang);
    document.documentElement.setAttribute(
      "dir",
      selectedLang === "ar" ? "rtl" : "ltr"
    );
  }, [lang]);

  return (
    <Routes>
      {/* Pages avec Layout général */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="formations" element={<Formations />} />
        <Route path="niveau-debutant" element={<NiveauDebutant />} />

        <Route path="niveau-2" element={<Niveau2 />} />
        <Route path="niveau-moyen" element={<NiveauMoyen />} />
        <Route path="niveau-4" element={<Niveau4 />} />
        <Route path="niveau-avance" element={<NiveauAvance />} />
        {/* Redirection manuelle vers une matière */}
        <Route
          path="niveau-debutant/semester1/fiqh"
          element={
            <Navigate to={`/${lang}/annee/1/matiere/fiqh?semestre=1`} replace />
          }
        />
      </Route>

      {/* SubjectPage sans Layout (isolé) */}
      <Route
        path="annee/:year/matiere/:subjectSlug"
        element={<SubjectPage />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/ar" replace />} />
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />
      </Routes>
    </Router>
  );
}
