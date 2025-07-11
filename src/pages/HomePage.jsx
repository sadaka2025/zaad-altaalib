import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* 🔷 Navbar */}
      <header className="bg-[#1e3a8a] text-white py-4 shadow">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">📘 زاد الطالب</h1>
          <nav className="flex gap-2">
            <Link
              to="/"
              className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white"
            >
              الرئيسية
            </Link>
            <Link
              to="/formations"
              className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white"
            >
              الدورات التكوينية
            </Link>
            <Link
              to="/dashboard-1"
              className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white"
            >
              لوحة الطالب
            </Link>
            <Link
              to="/contact"
              className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded text-white"
            >
              اتصل بنا
            </Link>
          </nav>
        </div>
      </header>

      {/* 🔶 Hero Section */}
      <section className="bg-[#f1f5f9] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1e293b] mb-6">أهلاً بك في منصة زاد الطالب</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            افتتحت المشيخة سنة 2023 / 2024 نظام التعليم عن بعد، لمن لا يستطيع الحضور إلى قاعات الدرس من الراغبين في العلم الشرعي من داخل تونس وخارجها...<br />
            مدة الدراسة: 5 سنوات | بث أسبوعي | اختبارات عن بعد | لقاءات مباشرة شهرية.
          </p>
          <Button className="bg-blue-600 text-white px-6 py-2 text-lg rounded hover:bg-blue-700" asChild>
            <Link to="/formations">📚 استعرض الدورات التكوينية</Link>
          </Button>
        </div>
      </section>

      {/* 🔸 مميزات المنصة */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">دروس علمية منهجية</h3>
            <p className="text-gray-600">ترتيب مدروس للمواد من التأسيس إلى التمكين العلمي.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">محتوى مبسط</h3>
            <p className="text-gray-600">ملخصات، أسئلة وأجوبة، اختبارات... تسهّل المراجعة والفهم.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#0f172a]">تفاعل مع الزملاء</h3>
            <p className="text-gray-600">روابط قنوات تواصل وملاحظات تفاعلية بين الطلبة.</p>
          </div>
        </div>
      </section>

      {/* 🔻 Footer */}
      <footer className="border-t mt-10 pt-6 pb-4 text-center text-sm text-gray-500">
        <p className="mb-3">© 2025 زاد الطالب - جميع الحقوق محفوظة</p>
        <div className="flex justify-center items-center space-x-4">
          <a
            href="https://t.me/+yourgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            🟦 Telegram
          </a>
          <a
            href="https://facebook.com/yourgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            🔵 Facebook
          </a>
          <Link
            to="/contact"
            className="text-green-600 font-medium hover:underline"
          >
            📩 اتصل بنا
          </Link>
        </div>
        <div className="mt-6">
          <Button
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 mt-2"
            asChild
          >
            <Link to="/problemes">📥 شاركنا اقتراحك أو مشكلتك</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
