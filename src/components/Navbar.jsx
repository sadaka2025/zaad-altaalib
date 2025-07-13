import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-blue-800 text-white py-4 shadow">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📘 زاد الطالب</h1>
        <nav className="flex gap-2">
          <Link to="/" className="hover:underline">الرئيسية</Link>
          <Link to="/formations" className="hover:underline">الدورات</Link>
          <Link to="/contact" className="hover:underline">اتصل بنا</Link>
        </nav>
      </div>
    </header>
  );
}
