// ✅ AnnoncesPage.jsx avec bouton رجوع
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnnoncesPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 text-right space-y-6">
      <button
        onClick={() => navigate('/ar/blog-simple')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded shadow text-sm"
      >
        🔙 رجوع
      </button>
      <h1 className="text-2xl font-bold">📢 الإعلانات</h1>
      <p className="text-gray-700">
        لا توجد إعلانات حالياً. تابعنا لاحقاً لمعرفة جديد المقرر.
      </p>
    </div>
  );
}
