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
import NiveauDebutant from "./pages/NiveauDebutant";
import Niveau2 from "./pages/Niveau2";
import NiveauMoyen from "./pages/NiveauMoyen";
import Niveau4 from "./pages/Niveau4";
import NiveauAvance from "./pages/NiveauAvance";
import i18n from "./i18n";

// ✅ Ce composant interne doit être dans un contexte de Route
function LangRoutesWrapper() {
  const { lang } = useParams();

  useEffect(() => {
    if (["fr", "ar"].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="formations" element={<Formations />} />
        <Route path="niveau-debutant" element={<NiveauDebutant />} />
        <Route path="niveau-2" element={<Niveau2 />} />
        <Route path="niveau-moyen" element={<NiveauMoyen />} />
        <Route path="niveau-4" element={<Niveau4 />} />
        <Route path="niveau-avance" element={<NiveauAvance />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection vers /fr si aucune langue n’est donnée */}
        <Route path="/" element={<Navigate to="/fr" replace />} />

        {/* ✅ Langue dynamique */}
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />
      </Routes>
    </Router>
  );
}
