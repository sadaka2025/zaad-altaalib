// src/pages/ProblemePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // عدل هذا المسار إذا لزم الأمر

export default function ProblemePage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      console.log("Message sent:", message);
      setSent(true);
      setMessage("");
      setTimeout(() => navigate("/"), 3000); // يعود إلى الرئيسية بعد 3 ثوانٍ
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-800 text-center">
          📥 شارك اقتراحك أو مشكلتك
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed text-center">
          إذا كنت طالبًا وترغب في إيصال مشكلتك أو اقتراحك، يرجى نسخ جزء من النقاش أو الرسائل التي ترى أنها تعبّر عن مشكلة يواجهها الطلبة، اقتراح لتحسين الدراسة أو استفسار متكرر. الصق المحتوى في الخانة أدناه.
        </p>

        {sent && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
            ✅ تم إرسال رسالتك بنجاح. سيتم التعامل معها قريبًا بإذن الله.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="📝 اكتب هنا مشكلتك أو اقتراحك..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <Button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
          >
            📤 إرسال الاقتراح أو المشكلة
          </Button>
        </form>

        <div className="mt-10 text-sm text-gray-500">
          <h2 className="text-md font-semibold text-gray-700 mb-2">ماذا سنقوم به بعد ذلك؟</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>✅ استخراج المطالب والاقتراحات الأساسية للطلبة</li>
            <li>✅ تلخيص أبرز المشكلات المتكررة</li>
            <li>✅ إعداد تقرير واضح ومنظم يمكن تقديمه للإدارة</li>
            <li>✅ صياغة ردود مناسبة ومحترمة للمقترحات أو التساؤلات المطروحة</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
