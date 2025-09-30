//
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Confettipluie from '../../../components/button/Confettipluie';
import { supabase } from '../../../supabaseClient';

const subjects = [
  {
    key: 'nahw',
    label: 'النحو',
    bgImage: '/images/nahw.jpeg',
    introRoute: 'intronahw',
  },
  {
    key: 'fiqh',
    label: 'الفقه',
    bgImage: '/images/fiqh.jpeg',
    introRoute: 'introfiqh',
  },
  {
    key: 'sirah',
    label: 'السيرة',
    bgImage: '/images/sirah.jpeg',
    introRoute: 'introsirah',
  },
  {
    key: 'aqida',
    label: 'العقيدة',
    bgImage: '/images/aqida.jpeg',
    introRoute: 'introaqida',
  },
  {
    key: 'tajwid',
    label: 'التجويد',
    bgImage: '/images/tajwid.jpeg',
    introRoute: 'introtajwid',
  },
  {
    key: 'akhlaq',
    label: 'الأخلاق',
    bgImage: '/images/akhlaq.jpeg',
    introRoute: 'introakhlaq',
  },
  {
    key: 'hadith',
    label: 'الحديث',
    bgImage: '/images/hadith.jpeg',
    introRoute: 'introhadith',
  },
];

export default function AvisPage() {
  const navigate = useNavigate();
  const { lang = 'ar', subject } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const subjectInfo = subjects.find((s) => s.key === subject) || {
    label: 'المادة',
    bgImage: '/images/default.jpeg',
    introRoute: null,
  };

  const handleBack = () => {
    if (subjectInfo.introRoute) {
      navigate(`/${lang}/${subjectInfo.introRoute}`);
      return;
    }
    navigate(-1);
  };

  const handleSend = async () => {
    if (!title || !content || !email) {
      alert('الرجاء ملء جميع الحقول');
      return;
    }

    try {
      // 1️⃣ Stockage dans Supabase
      const { error } = await supabase
        .from('questions') // table "questions" créée dans Supabase
        .insert([{ title, content, email, subject: subjectInfo.key }]);
      if (error) throw error;

      // 2️⃣ Envoi d'email via endpoint Node.js
      await fetch('http://localhost:5000/send-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          email,
          subject: subjectInfo.label,
        }),
      });

      // Réinitialisation et feedback
      setSent(true);
      setTitle('');
      setContent('');
      setEmail('');
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إرسال السؤال');
    }
  };

  return (
    <>
      <Confettipluie />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="relative z-10 max-w-4xl mx-auto mt-20 p-20 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg">
          <button
            type="button"
            onClick={handleBack}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow mb-4"
          >
            🔙 رجوع
          </button>

          <h1 className="text-2xl font-bold text-center mb-4">
            ❓ رأيكم يهمنا
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="رايكم في منصتنا"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
              dir="rtl"
              style={{
                backgroundImage: `url(${subjectInfo.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <textarea
              placeholder="رايكم  بالتفصيل"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
              dir="rtl"
              style={{
                backgroundColor: `url(${subjectInfo.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <input
              type="email"
              placeholder="لتواصل معك أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
              dir="rtl"
              style={{
                backgroundImage: `url(${subjectInfo.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition"
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setEmail('');
                }}
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleSend}
                className={`px-6 py-2 rounded transition ${
                  sent ? 'bg-green-600' : 'bg-blue-700 hover:bg-blue-800'
                } text-white`}
              >
                {sent ? '✔️ تم الإرسال' : 'إرسال'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
