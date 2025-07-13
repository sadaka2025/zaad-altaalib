// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">مرحبا بك في منصة زاد الطالب</h1>
      <Link to="/formations">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          استعرض الدورات التكوينية
        </button>
      </Link>
    </div>
  );
}
