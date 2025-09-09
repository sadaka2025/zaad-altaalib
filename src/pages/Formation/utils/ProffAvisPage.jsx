// src/pages/ProffAvisPage.jsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProffAvisPage() {
  const navigate = useNavigate();
  const { subject } = useParams(); // 👈 récupère "fiqh", "nahw", etc. depuis l’URL

  // États pour le JSON et l'instructeur
  const [data, setData] = useState(null);
  const [instructor, setInstructor] = useState(null);

  // États pour les avis
  const [feedbacks, setFeedbacks] = useState([]);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [showCV, setShowCV] = useState(false);

  // Charger le JSON et sélectionner l'instructeur correspondant au subject
  useEffect(() => {
    fetch('/locales/ar/translation.json')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur de chargement JSON');
        return res.json();
      })
      .then((json) => {
        setData(json);

        // Trouver l'instructeur correspondant
        const instr = json.instructors.find((inst) => inst.subject === subject);
        setInstructor(instr || null);
      })
      .catch((err) => console.error(err));
  }, [subject]);

  // Charger les avis depuis localStorage (clé unique par matière)
  useEffect(() => {
    const saved = localStorage.getItem(`profFeedbacks_${subject}`);
    if (saved) setFeedbacks(JSON.parse(saved));
  }, [subject]);

  if (!instructor) return <p>⏳ تحميل بيانات الأستاذ...</p>; // fallback si pas trouvé

  // Calcul moyenne
  const averageRating =
    feedbacks.length === 0
      ? 0
      : feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) => feedbacks.filter((f) => f.rating === star).length
  );

  // Vérification email
  const verifyEmail = async () => {
    if (
      visitorEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)
    ) {
      alert('❗ يرجى إدخال بريد إلكتروني صالح أو تركه فارغًا.');
      setMessage('');
      return;
    }
    if (!visitorEmail.trim()) {
      setMessage('');
      return;
    }
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=84e1421241314d25a7b82d45fc7ed2ac&email=${visitorEmail}`
      );
      const data = response.data;
      if (data.is_valid_format.value && data.is_smtp_valid.value) {
        setMessage('✅ Email valide et actif.');
      } else {
        setMessage('❌ Email invalide أو n’existe pas.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur lors de la vérification.');
    }
  };

  // Envoyer avis
  const handleSend = () => {
    if (!visitorName.trim()) {
      alert('❗ يرجى كتابة اسمك قبل الإرسال.');
      return;
    }
    if (!rating) {
      alert('❗ يرجى اختيار تقييم قبل الإرسال.');
      return;
    }
    if (!comment.trim()) {
      alert('❗ يرجى كتابة تعليق.');
      return;
    }
    const newFeedback = {
      visitorName,
      visitorEmail,
      rating,
      comment,
      date: new Date().toISOString(),
    };
    const updated = [...feedbacks, newFeedback];
    setFeedbacks(updated);
    localStorage.setItem(`profFeedbacks_${subject}`, JSON.stringify(updated));
    alert('✔️ تم إرسال تقييمك بنجاح!');
    setVisitorName('');
    setVisitorEmail('');
    setRating(0);
    setComment('');
  };

  // Supprimer un avis
  const handleDeleteFeedback = (index) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
      const updated = feedbacks.filter((_, i) => i !== index);
      setFeedbacks(updated);
      localStorage.setItem(`profFeedbacks_${subject}`, JSON.stringify(updated));
      alert('🗑️ تم حذف التقييم.');
    }
  };

  // Supprimer tous les avis
  const handleClearRatings = () => {
    if (window.confirm('هل أنت متأكد من حذف جميع التقييمات؟')) {
      localStorage.removeItem(`profFeedbacks_${subject}`);
      setFeedbacks([]);
      alert('🗑️ تم حذف جميع التقييمات.');
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-4 bg-gradient-to-br from-sky-100 via-sky-200 to-white"
      dir="rtl"
    >
      <div className="font-[Arial] max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-8">
        <button
          onClick={() => navigate(`/ar/intro${subject}`)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded shadow text-sm"
        >
          🔙 رجوع
        </button>

        {/* Présentation de l'instructeur */}
        <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-sky-100 to-white p-4 rounded shadow mb-8">
          <img
            src={instructor.image}
            alt={instructor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-300 mb-4 md:mb-0 md:mr-6"
          />

          <div className="text-right flex-1">
            <h2 className="text-2xl font-bold text-sky-800 mb-1">
              {instructor.name}
            </h2>
            <p className="text-sky-700 font-semibold">
              🟊 معدل التقييم الحالي:{' '}
              <span className="text-sky-900 text-lg">
                {feedbacks.length === 0
                  ? ' لا يوجد تقييم بعد'
                  : `${averageRating.toFixed(1)} / 5`}
              </span>
            </p>
            <div className="flex justify-end mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`text-2xl ${
                      averageRating >= n ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowCV(!showCV)}
              className="mt-3 text-sm text-blue-700 underline hover:text-blue-900"
            >
              📄 عرض السيرة الذاتية
            </button>
            {showCV && (
              <div className="mt-4 whitespace-pre-line text-sm text-gray-700 bg-gray-100 p-3 rounded shadow">
                {instructor.cv}
              </div>
            )}
          </div>
        </div>
        {/* Section avis visiteurs */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">⬇️ كيف تقيّم أداء الأستاذ؟</h2>
          <input
            type="text"
            placeholder="اكتب اسمك هنا..."
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="w-full border rounded p-2 mt-1 text-right placeholder-gray-700"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني (اختياري)"
            value={visitorEmail}
            onChange={(e) => setVisitorEmail(e.target.value)}
            onBlur={verifyEmail}
            className="w-full border rounded p-2 mt-1 text-right placeholder-gray-700"
          />
          <p>{message}</p>
          <div className="flex justify-center gap-2 my-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setRating(n)}
                className={`text-4xl cursor-pointer ${rating >= n ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-lg text-green-700 font-semibold">
              تقييمك: {rating} / 5
            </p>
          )}
          <textarea
            rows={4}
            placeholder="شاركنا رأيك..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 mt-1 text-right placeholder-gray-700"
          ></textarea>
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4"
          >
            📤 أرسل التقييم
          </button>
        </div>

        {/* Section statistiques */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-right">📊 آراء الطلاب:</h3>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold">{averageRating.toFixed(1)}</p>
              <div className="text-yellow-400 text-xl">
                {'★'.repeat(Math.round(averageRating))}
                {'☆'.repeat(5 - Math.round(averageRating))}
              </div>
              <p>مجموع {feedbacks.length} تقييم</p>
            </div>
            <div className="flex-1 w-full space-y-1">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-2 w-full">
                  <span className="text-yellow-500">★ {star}</span>
                  <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full"
                      style={{
                        width:
                          feedbacks.length === 0
                            ? '0%'
                            : `${(ratingCounts[i] / feedbacks.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {ratingCounts[i]} تقييم
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commentaires visiteurs */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-right">📝 آراء الزوار:</h3>
          <p className="text-sm text-gray-600 text-right">
            كل التقييمات المرسلة محفوظة هنا بشكل دائم.
          </p>
          {feedbacks.length === 0 && (
            <p className="text-gray-500 text-center">لا توجد تقييمات بعد.</p>
          )}
          {feedbacks.map((fb, i) => (
            <div
              key={i}
              className="border rounded p-3 bg-gray-50 text-right shadow-sm relative"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-yellow-400 text-lg">
                  {'★'.repeat(fb.rating)}
                  {'☆'.repeat(5 - fb.rating)}
                </div>
                <p className="text-sm font-bold">{fb.visitorName}</p>
              </div>
              <p className="text-gray-800 mt-1">{fb.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                🗓️ {new Date(fb.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDeleteFeedback(i)}
                className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
