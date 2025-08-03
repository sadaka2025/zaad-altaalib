// src/pages/ProfAvisPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfAvisPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("profFeedbacks");
    if (saved) setFeedbacks(JSON.parse(saved));
  }, []);

  const handleSend = () => {
    if (!rating) return alert("❗يرجى اختيار تقييم قبل الإرسال.");
    const newFeedback = {
      rating,
      comment,
      date: new Date().toISOString(),
    };
    const updated = [...feedbacks, newFeedback];
    setFeedbacks(updated);
    localStorage.setItem("profFeedbacks", JSON.stringify(updated));
    alert("✔️ تم إرسال تقييمك بنجاح!");
    setRating(0);
    setComment("");
  };

  const averageRating =
    feedbacks.length === 0
      ? 0
      : feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6">
      <button
        onClick={() => navigate("/ar/intro")}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded shadow text-sm"
      >
        🔙 رجوع
      </button>

      <h1 className="text-2xl font-bold text-center mb-4">🧑‍🏫 تقييم الأستاذ</h1>

      <div className="mb-4 text-center">
        <p className="text-lg">⬇️ كيف تقيّم أداء الأستاذ؟</p>
        <div className="flex justify-center gap-2 my-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={`text-3xl cursor-pointer transition ${
                rating >= n ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <label className="block mb-4">
        <span className="text-gray-700">💬 تعليقك (اختياري):</span>
        <textarea
          className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          rows={4}
          placeholder="شاركنا رأيك..."
          dir="rtl"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      <button
        onClick={handleSend}
        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded transition"
      >
        إرسال
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-center mb-2">
          📊 متوسط تقييم الأستاذ
        </h2>
        <div className="w-full bg-gray-200 rounded h-6 overflow-hidden">
          <div
            className="bg-green-500 h-full text-white text-center text-sm"
            style={{ width: `${(averageRating / 5) * 100}%` }}
          >
            {averageRating.toFixed(1)} / 5
          </div>
        </div>
      </div>

      {/* عرض جميع التقييمات */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-bold mb-2 text-right">📝 آراء الزوار:</h3>
        {feedbacks.length === 0 && (
          <p className="text-gray-500 text-center">لا توجد تقييمات بعد.</p>
        )}
        {feedbacks.map((fb, i) => (
          <div
            key={i}
            className="border rounded p-3 bg-gray-50 text-right shadow-sm relative"
          >
            <div className="text-yellow-400 text-lg">
              {"★".repeat(fb.rating)}
              {"☆".repeat(5 - fb.rating)}
            </div>
            <p className="text-gray-800 mt-1">{fb.comment}</p>
            <p className="text-sm text-gray-500 mt-1">
              🗓️ {new Date(fb.date).toLocaleDateString()}
            </p>

            {/* زر الحذف */}
            <button
              onClick={() => {
                const updated = feedbacks.filter((_, index) => index !== i);
                setFeedbacks(updated);
                localStorage.setItem("profFeedbacks", JSON.stringify(updated));
              }}
              className="absolute top-2 left-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm"
            >
              🗑️ حذف هذا التقييم
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
