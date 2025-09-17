// src/components/ChatWidget.jsx
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineClipboard, HiOutlineDownload } from 'react-icons/hi';
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Dictionnaire avatars par matière (français)
const subjectAvatars = {
  fiqh: '/images/instructor3.jpg',
  aqida: '/images/instructor6.jpg',
  tajwid: '/images/instructor7.jpg',
  nahw: '/images/instructor5.jpg',
  sirah: '/images/instructor10.jpg',
  hadith: '/images/instructor1.jpg',
  akhlaq: '/images/instructor2.jpg',
  default: '/images/ai-assistant-avatar.png',
};

// Mapping mots arabes → matière
const subjectKeywords = {
  fiqh: ['فقه', 'صلاة', 'طهارة', 'زكاة', 'صوم', 'حج', 'معاملات', 'عبادات'],
  aqida: ['عقيدة', 'إيمان', 'توحيد', 'شرك', 'كفر', 'إلحاد'],
  tajwid: ['تجويد', 'قراءة', 'مخارج', 'أحكام التجويد'],
  nahw: ['نحو', 'إعراب', 'قواعد', 'جملة', 'فاعل', 'مفعول'],
  sirah: ['سيرة', 'نبوية', 'غزوة', 'هجرة', 'مولد النبي'],
  hadith: ['حديث', 'أحاديث', 'إسناد', 'رواية', 'صحيح البخاري', 'مسلم'],
  akhlaq: ['أخلاق', 'معاملة', 'بر الوالدين', 'أمانة', 'صدق', 'أدب'],
};

// Détection via mots-clés arabes
function detectSubject(question) {
  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    if (keywords.some((kw) => question.includes(kw))) {
      return subject;
    }
  }
  return 'default';
}

// Fallback : détection via les sources JSON
function detectSubjectFromSources(sources) {
  if (!sources || sources.length === 0) return 'default';
  const txt = JSON.stringify(sources);
  if (txt.includes('fiqh')) return 'fiqh';
  if (txt.includes('aqida')) return 'aqida';
  if (txt.includes('nahw')) return 'nahw';
  if (txt.includes('sirah')) return 'sirah';
  if (txt.includes('hadith')) return 'hadith';
  if (txt.includes('akhlaq')) return 'akhlaq';
  if (txt.includes('tajwid')) return 'tajwid';
  return 'default';
}

export default function ChatWidget({
  apiPath = 'http://localhost:5000/api/ask',
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // agrandir/réduire
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: '👋 السلام عليكم و رحمة الله و بركاته ---اطرح سؤالك، سأبحث في الوثائق.',
      subject: 'default',
      sources: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e?.preventDefault();
    const question = input.trim();
    if (!question) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: question,
      sources: [],
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // Détection : d'abord par mots arabes, sinon fallback sur sources
      let detectedSubject = detectSubject(question);
      if (detectedSubject === 'default') {
        detectedSubject = detectSubjectFromSources(data.chunks);
      }

      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: data.answer ?? '(pas de réponse)',
        subject: detectedSubject,
        sources: data.chunks || [],
      };

      setMessages((m) => [...m, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 2,
          role: 'assistant',
          text: '❌ Erreur: impossible de récupérer la réponse.',
          subject: 'default',
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <div className="flex flex-col items-end">
        {/* Bouton principal */}
        <button
          aria-label="Open chat"
          onClick={() => setOpen((v) => !v)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-16 h-16 shadow-xl flex items-center justify-center ring-2 ring-white/60 transition-transform transform hover:scale-105"
        >
          💬
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 ${
                expanded ? 'w-[800px] h-[650px]' : 'w-[550px] h-[500px]'
              } max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <img
                  src="/images/ai-assistant-avatar.png"
                  alt="AI"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white/70"
                />
                <div>
                  <div className="font-semibold text-base">Assistant AI</div>
                  <div className="text-xs text-white/80">
                    <p
                      style={{
                        color: 'yellow',
                        fontWeight: 'bold',
                        fontFamily: 'Arial',
                      }}
                    >
                      إجابات مستندة إلى وثائقك (الدرس + قرار السداسي + محتوى
                      الملتقيات المباشرة)
                    </p>
                  </div>
                </div>

                {/* Fermer */}
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-gray-50">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      className={
                        m.role === 'user'
                          ? 'flex justify-end'
                          : 'flex items-start'
                      }
                    >
                      {m.role === 'assistant' && (
                        <>
                          <img
                            src={
                              subjectAvatars[m.subject] ||
                              subjectAvatars.default
                            }
                            alt="ai"
                            className="w-16 h-16 rounded-full mr-3"
                          />
                          <div className="flex flex-col max-w-[85%]">
                            <div className="bg-white rounded-2xl px-4 py-3 shadow text-sm relative text-black font-bold text-justify whitespace-pre-line">
                              {m.text}
                            </div>

                            {/* Actions sous le texte */}
                            <div className="flex gap-3 mt-2 text-sm items-center">
                              <button
                                onClick={() =>
                                  navigator.clipboard.writeText(m.text)
                                }
                                className="text-blue-500 hover:text-blue-700"
                                title="Copier"
                              >
                                <HiOutlineClipboard size={20} />
                              </button>
                              <button
                                onClick={() => {
                                  const blob = new Blob([m.text], {
                                    type: 'text/plain;charset=utf-8',
                                  });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = 'reponse.txt';
                                  a.click();
                                  URL.revokeObjectURL(url);
                                }}
                                className="text-green-500 hover:text-green-700"
                                title="Télécharger"
                              >
                                <HiOutlineDownload size={20} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {m.role === 'user' && (
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-4 py-2 shadow text-sm max-w-[75%]">
                          {m.text}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </AnimatePresence>

                {loading && (
                  <div className="text-sm text-gray-500 italic">
                    … en cours de traitement
                  </div>
                )}
              </div>

              {/* Input */}
              <form
                onSubmit={handleSend}
                className="px-5 py-3 border-t border-gray-100 bg-white flex gap-3 items-center"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="مرحبًا — اطرح سؤالك..."
                  className="flex-1 px-4 py-3 rounded-full ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm shadow-sm text-black font-bold"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 px-5 py-2 rounded-full text-sm shadow transform hover:scale-105"
                  style={{
                    color: 'yellow',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                  }}
                >
                  إرسال
                </button>
              </form>

              {/* Zone de partage + agrandir/réduire */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-gray-50">
                {/* Partage */}
                <div className="flex gap-4 text-lg">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    title="Partager sur Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Regarde ça !')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-700"
                    title="Partager sur Telegram"
                  >
                    <FaTelegramPlane />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                    title="Partager sur WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href={`mailto:?subject=Découvre ce lien&body=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                    title="Partager par Email"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                    title="Partager sur LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Regarde ça !')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700"
                    title="Partager sur Twitter (X)"
                  >
                    <FaTwitter />
                  </a>
                </div>

                {/* Bouton agrandir/réduire */}
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="ml-auto px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                  title={expanded ? 'Réduire le widget' : 'Agrandir le widget'}
                >
                  {expanded ? '🔽 Réduire' : '🔼 Agrandir'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
