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
import FiqhPage from "./pages/NiveauDebutant/semester1/fiqh/FiqhPage";
import Niveau2 from "./pages/Niveau2";
import NiveauMoyen from "./pages/NiveauMoyen";
import Niveau4 from "./pages/Niveau4";
import NiveauAvance from "./pages/NiveauAvance";
import i18n from "./i18n";
import "./i18n";

function LangRoutesWrapper() {
  const { lang } = useParams();

  useEffect(() => {
    const supportedLangs = ["fr", "ar", "en"];
    const isValidLang = supportedLangs.includes(lang);
    const selectedLang = isValidLang ? lang : "ar";

    i18n.changeLanguage(selectedLang);

    const dir = selectedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", selectedLang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="formations" element={<Formations />} />
        <Route path="niveau-debutant" element={<NiveauDebutant />} />
        <Route path="niveau-debutant/semester1/fiqh" element={<FiqhPage />} />
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
        <Route path="/" element={<Navigate to="/ar" replace />} />
        <Route path="/:lang/*" element={<LangRoutesWrapper />} />
      </Routes>
    </Router>
  );
}
