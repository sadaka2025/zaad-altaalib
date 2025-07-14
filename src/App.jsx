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

function LangRoutesWrapper() {
  const { lang } = useParams();

  useEffect(() => {
    const supportedLangs = ["fr", "ar", "en"];
    if (supportedLangs.includes(lang)) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage("fr"); // fallback
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
        {/* 🔁 Redirection vers une langue par défaut */}
        <Route path="/" element={<Navigate to="/fr" replace />} />

        {/* ✅ Route avec langue dynamique */}
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />
      </Routes>
    </Router>
  );
}
