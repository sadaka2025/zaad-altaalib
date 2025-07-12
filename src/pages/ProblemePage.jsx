import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-[#1e3a8a] text-white py-4 shadow">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">📘 زاد الطالب</h1>
          <nav className="flex gap-2">
            <Link to="/">الرئيسية</Link>
            <Link to="/formations">الدورات التكوينية</Link>
            <Link to="/dashboard-1">لوحة الطالب</Link>
            <Link to="/contact">اتصل بنا</Link>
          </nav>
        </div>
      </header>

      <section className="text-center py-10">
        <h2 className="text-4xl font-bold mb-6">مرحبًا بك في منصة زاد الطالب</h2>
        <p className="text-lg mb-8">
          محتوى تعليمي شامل عن بُعد لجميع الطلبة
        </p>
        <Link
          to="/problemes"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded inline-block"
        >
          📥 شاركنا اقتراحك أو مشكلتك
        </Link>
      </section>
    </div>
  );
}
