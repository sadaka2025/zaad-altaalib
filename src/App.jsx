import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Formations from "./pages/Formations";
import NiveauDebutant from "./pages/NiveauDebutant";
import Niveau2 from "./pages/Niveau2";
import NiveauMoyen from "./pages/NiveauMoyen";
import Niveau4 from "./pages/Niveau4";
import NiveauAvance from "./pages/NiveauAvance";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formations" element={<Formations />} />

        {/* 📘 روابط المستويات */}
        <Route path="/niveau-debutant" element={<NiveauDebutant />} />
        <Route path="/niveau-2" element={<Niveau2 />} />
        <Route path="/niveau-moyen" element={<NiveauMoyen />} />
        <Route path="/niveau-4" element={<Niveau4 />} />
        <Route path="/niveau-avance" element={<NiveauAvance />} />
      </Routes>
    </Router>
  );
}
