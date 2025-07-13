import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NiveauDebutant() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">📘 السنة الأولى: مدخل إلى العلوم الشرعية</h1>
        <p className="mb-4 text-lg text-gray-700">
          في هذا المستوى، يتعرف الطالب على المبادئ الأساسية في العقيدة، الفقه، والسيرة.
        </p>
        <ul className="list-disc text-right max-w-2xl mx-auto text-gray-700">
          <li>مقدمة في العقيدة</li>
          <li>الطهارة والصلاة</li>
          <li>سيرة النبي ﷺ قبل البعثة</li>
          <li>مدخل إلى التجويد</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
