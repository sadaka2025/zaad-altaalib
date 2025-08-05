import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/OIP.jpeg"; // ton image locale

export default function QRPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  return (
    <div className="font-[Arial] max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6">
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
          className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
          dir="rtl"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover", // optionnel : pour que l’image couvre tout
            backgroundPosition: "center", // optionnel : pour centrer l’image
          }}
        />

        <textarea
          placeholder="نص السؤال بالتفصيل"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
          dir="rtl"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover", // optionnel : pour que l’image couvre tout
            backgroundPosition: "center", // optionnel : pour centrer l’image
          }}
        />
        <label className="block mb-4">
          <input
            type="email"
            placeholder=" لتواصل معك أدخل بريدك الإلكتروني"
            className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
            dir="rtl"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover", // optionnel : pour que l’image couvre tout
              backgroundPosition: "center", // optionnel : pour centrer l’image
            }}
          />
        </label>

        <div className="flex justify-between mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition">
            إلغاء
          </button>
          <button
            onClick={() => {
              setSent(true);
              setTimeout(() => setSent(false), 3000); // إعادة الزر لحالته الأصلية بعد 3 ثوانٍ
            }}
            className={`px-6 py-2 rounded transition ${
              sent ? "bg-green-600" : "bg-blue-700 hover:bg-blue-800"
            } text-white`}
          >
            {sent ? "✔️ تم الإرسال" : "إرسال"}
          </button>
        </div>
      </div>
    </div>
  );
}
