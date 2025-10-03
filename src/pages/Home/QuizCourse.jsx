// src/pages/QuizCourse.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

export default function QuizCourse() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Cas 1 : query string
  const [searchParams] = useSearchParams();
  const queryJson = searchParams.get('json');

  // ✅ Cas 2 : params dynamiques
  const { year, subjectSlug, number } = useParams();

  // ✅ Déterminer le chemin du JSON
  const jsonPath = queryJson
    ? queryJson
    : year && subjectSlug && number
      ? `/dataquizCourse/years/year${year}/s1/${subjectSlug}/${subjectSlug}_course${number}.json`
      : null;

  // ✅ Charger dynamiquement le JSON
  useEffect(() => {
    async function fetchData() {
      if (!jsonPath) return;
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Fichier introuvable: ${jsonPath}`);
        const data = await res.json();
        setExamData(data);
      } catch (err) {
        console.error('Erreur chargement JSON:', err);
        setExamData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [jsonPath]);

  if (loading) return <p className="p-6">⏳ Chargement...</p>;
  if (!examData)
    return <p className="p-6 text-red-600">⚠️ Aucun quiz trouvé.</p>;

  const { questions, meta } = examData;

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = submitted
    ? questions.reduce((acc, q) => {
        const userAns = answers[q.id];
        if (
          (q.type === 'mcq' || q.type === 'truefalse' || q.type === 'fill') &&
          userAns === q.correctAnswer
        )
          return acc + 1;
        if (q.type === 'open') return acc; // questions ouvertes non notées automatiquement
        return acc;
      }, 0)
    : 0;

  const percentage = ((score / meta.totalQuestions) * 100).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{meta.title?.ar || 'Quiz'}</h1>

      {questions.map((q) => (
        <div
          key={q.id}
          className="mb-6 p-4 border rounded-lg shadow-sm bg-white"
        >
          <p className="font-semibold mb-2">
            {q.id}. {q.question}
          </p>

          {q.type === 'mcq' && (
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={idx}
                    onChange={() => handleChange(q.id, idx)}
                    disabled={submitted}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}

          {q.type === 'truefalse' && (
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value="true"
                  onChange={() => handleChange(q.id, true)}
                  disabled={submitted}
                />{' '}
                صحيح
              </label>
              <label>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value="false"
                  onChange={() => handleChange(q.id, false)}
                  disabled={submitted}
                />{' '}
                خطأ
              </label>
            </div>
          )}

          {q.type === 'fill' && (
            <input
              type="text"
              placeholder="اكتب إجابتك..."
              onChange={(e) => handleChange(q.id, e.target.value)}
              disabled={submitted}
              className="w-full border rounded p-2 mt-2"
            />
          )}

          {q.type === 'open' && (
            <textarea
              placeholder="اكتب إجابتك هنا..."
              onChange={(e) => handleChange(q.id, e.target.value)}
              disabled={submitted}
              className="w-full border rounded p-2 mt-2"
            />
          )}

          {submitted && (
            <div className="mt-2 p-2 border-t text-sm bg-gray-50">
              <p>
                <strong>الإجابة الصحيحة:</strong>{' '}
                {q.type === 'mcq'
                  ? q.options[q.correctAnswer]
                  : String(q.correctAnswer)}
              </p>
              {q.answerReason && (
                <p>
                  <strong>السبب:</strong> {q.answerReason}
                </p>
              )}
              {q.textReference && (
                <p>
                  <strong>مرجع النص:</strong> {q.textReference}
                </p>
              )}
              {q.textReferenceLink && (
                <a
                  href={`/${q.textReferenceLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-3 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  📖 Voir référence
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          onClick={handleSubmit}
        >
          تقديم الاختبار
        </button>
      ) : (
        <div className="mt-6 p-4 border rounded bg-green-100">
          <p>
            <strong>النتيجة:</strong> {score} / {meta.totalQuestions}
          </p>
          <p>
            <strong>النسبة المئوية:</strong> {percentage}%
          </p>
        </div>
      )}
    </div>
  );
}
