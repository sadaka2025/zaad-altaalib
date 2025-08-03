import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QRPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6">
      {/* 🔙 زر الرجوع */}
      <button
        onClick={() => navigate("/ar/intro")}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow mb-4"
      >
        🔙 رجوع
      </button>
      <h1 className="text-2xl font-bold text-center mb-4">❓ أرسل سؤالاً</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="عنوان السؤال"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="rtl"
        />

        <textarea
          placeholder="نص السؤال بالتفصيل"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 border px-4 py-2 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="rtl"
        />

        <div className="flex justify-between mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition">
            إلغاء
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition">
            إرسال السؤال
          </button>
        </div>
      </div>
    </div>
  );
}
