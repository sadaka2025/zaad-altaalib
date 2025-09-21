import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // adapte le chemin si nécessaire

export default function ProblemePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!title || !content || !email) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const { data, error } = await supabase
      .from('problems') // crée cette table dans Supabase si elle n'existe pas
      .insert([
        {
          title,
          content,
          user_email: email,
        },
      ]);

    if (error) {
      console.error('Erreur insertion:', error);
      alert('Erreur lors de l’envoi !');
    } else {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setTitle('');
      setContent('');
      setEmail('');
    }
  };

  return (
    <div
      className="font-[Arial] max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded space-y-6"
      style={{ backgroundColor: 'lightblue' }}
    >
      {/* 🔙 زر الرجوع */}
      <button
        onClick={() => navigate('/ar/intro')}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow mb-4"
      >
        🔙 رجوع
      </button>

      <h1 className="text-2xl font-bold text-center mb-4">❓ أرسل سؤالاً</h1>

      <div className="space-y-4">
        <div className="text-center text-red-600 mt-10 text-xl">
          🛠️ هذه صفحة إرسال الاقتراحات والمشاكل
        </div>

        <input
          type="text"
          placeholder="عنوان السؤال"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
          dir="rtl"
        />

        <textarea
          placeholder="نص السؤال بالتفصيل"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
          dir="rtl"
        />

        <input
          type="email"
          placeholder="لتواصل معك أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-700"
          dir="rtl"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setTitle('');
              setContent('');
              setEmail('');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition"
          >
            إلغاء
          </button>

          <button
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
  );
}
