// src/pages/Formations.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Formations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Navbar />

      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">📚 الدورات التكوينية</h1>
        <p className="text-lg text-gray-600 mb-4">
          اختر مستواك العلمي المناسب وابدأ رحلتك مع زاد الطالب.
        </p>

        <Link to="/" className="text-blue-600 underline hover:text-blue-800">
          ← العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
        {/* المستوى الأول: المبتدئ */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
          <img
            src="/images/debutant.jpg"
            alt="المستوى الأول"
            className="rounded-md mb-4 h-48 w-full object-cover"
          />
          <h2 className="text-xl font-bold mb-2 text-blue-700">المستوى الأول: المبتدئ</h2>
          <p className="text-gray-600 mb-4">مناسب لمن يبدأ في طلب العلم ولم يدرس من قبل.</p>
          <Link
            to="/niveau-debutant"
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            استعرض المحتوى
          </Link>
        </div>

        {/* المستوى الثاني: تأسيس اللغة */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
          <img
            src="/images/niveau2.jpg"
            alt="المستوى الثاني"
            className="rounded-md mb-4 h-48 w-full object-cover"
          />
          <h2 className="text-xl font-bold mb-2 text-blue-700">المستوى الثاني: تأسيس اللغة</h2>
          <p className="text-gray-600 mb-4">التركيز على ضبط اللغة العربية قبل الخوض في التفاصيل.</p>
          <Link
            to="/niveau-2"
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            استعرض المحتوى
          </Link>
        </div>

        {/* المستوى الثالث: متوسط */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
          <img
            src="/images/intermediate.jpg"
            alt="المستوى الثالث"
            className="rounded-md mb-4 h-48 w-full object-cover"
          />
          <h2 className="text-xl font-bold mb-2 text-blue-700">المستوى الثالث: المتوسط</h2>
          <p className="text-gray-600 mb-4">مناسب لمن درس الأساسيات ويريد التوسع في العلوم.</p>
          <Link
            to="/niveau-moyen"
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            استعرض المحتوى
          </Link>
        </div>

        {/* المستوى الرابع: تعميق الفهم */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
          <img
            src="/images/niveau4.jpg"
            alt="المستوى الرابع"
            className="rounded-md mb-4 h-48 w-full object-cover"
          />
          <h2 className="text-xl font-bold mb-2 text-blue-700">المستوى الرابع: تعميق الفهم</h2>
          <p className="text-gray-600 mb-4">مستوى التحليل والتفسير والتوسع في المصادر المعتمدة.</p>
          <Link
            to="/niveau-4"
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            استعرض المحتوى
          </Link>
        </div>

        {/* المستوى الخامس: المتقدم */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
          <img
            src="/images/avance.jpg"
            alt="المستوى الخامس"
            className="rounded-md mb-4 h-48 w-full object-cover"
          />
          <h2 className="text-xl font-bold mb-2 text-blue-700">المستوى الخامس: المتقدم</h2>
          <p className="text-gray-600 mb-4">مناسب للطلاب الذين يريدون التخصص العلمي والدعوي.</p>
          <Link
            to="/niveau-avance"
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            استعرض المحتوى
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
