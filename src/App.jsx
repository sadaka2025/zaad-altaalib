import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ProblemePage from './pages/ProblemePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/problemes" element={<ProblemePage />} />
        {/* أضف أي صفحات أخرى عند الحاجة */}
      </Routes>
    </Router>
  );
}

