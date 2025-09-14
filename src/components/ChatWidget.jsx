// src/components/ChatWidget.jsx
// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineClipboard, HiOutlineDownload } from 'react-icons/hi';
import { FaTelegramPlane, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget({
  apiPath = 'http://localhost:5000/api/ask',
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: '👋 السلام عليكم و رحمة الله و بركاته ---اطرح سؤالك، سأبحث في الوثائق.',
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

  // 🔹 Correction arabe automatique
  function fixArabicText(text) {
    return text
      .split(/\s+/)
      .map((word) =>
        /[\u0600-\u06FF]/.test(word) ? word.split('').reverse().join('') : word
      )
      .join(' ');
  }

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

      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: fixArabicText(data.answer ?? '(pas de réponse)'),
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
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Réécriture IA avec remplacement du texte
  async function handleAiRewrite(messageId, originalText, actionPrompt) {
    setLoading(true);
    try {
      const res = await fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `${actionPrompt} \n\n${originalText}`,
        }),
      });
      const data = await res.json();
      setMessages((m) =>
        m.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                text: fixArabicText(data.answer ?? '(pas de réponse)'),
              }
            : msg
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Options IA avec icônes colorées
  const rewriteOptions = [
    { label: '✍️ Améliorer la rédaction', prompt: 'Améliore ce texte :' },
    { label: '✅ Corriger orthographe', prompt: 'Corrige les fautes :' },
    {
      label: '🌍 Traduire en...',
      submenu: [
        { label: '🇬🇧 Anglais', prompt: 'Traduis en anglais :' },
        { label: '🇫🇷 Français', prompt: 'Traduis en français :' },
        { label: '🇸🇦 Arabe', prompt: 'Traduis en arabe :' },
      ],
    },
    { label: '➕ Allonger le texte', prompt: 'Développe davantage :' },
    { label: '➖ Raccourcir le texte', prompt: 'Raccourcis ce texte :' },
    { label: '✂️ Simplifier la formulation', prompt: 'Simplifie le texte :' },
  ];

  return (
    <div className="fixed right-8 bottom-8 z-50">
      <div className="flex flex-col items-end">
        {/* Floating button */}
        <button
          aria-label="Open chat"
          onClick={() => setOpen((v) => !v)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full w-16 h-16 shadow-xl flex items-center justify-center ring-2 ring-white/60 transition-transform transform hover:scale-105"
        >
          💬
        </button>

        {/* Chat window */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mt-4 w-[550px] max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <img
                  src="/images/ai-assistant-avatar.png"
                  alt="AI"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/70"
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
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="p-5 h-80 overflow-y-auto space-y-4 bg-gray-50">
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
                            src="/images/ai-assistant-avatar.png"
                            alt="ai"
                            className="w-9 h-9 rounded-full mr-3"
                          />
                          <div className="flex flex-col max-w-[85%]">
                            <div className="bg-white rounded-2xl px-4 py-3 shadow text-sm relative text-black font-bold text-justify">
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
                              {/* Partage */}
                              <div className="relative group">
                                <button
                                  className="text-purple-500 hover:text-purple-700"
                                  title="Partager"
                                >
                                  📤
                                </button>
                                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md border border-gray-200 mt-1 w-40">
                                  <a
                                    href={`https://t.me/share/url?url=&text=${encodeURIComponent(
                                      m.text
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-3 py-2 hover:bg-gray-100 text-sm"
                                  >
                                    Telegram
                                  </a>
                                  <a
                                    href={`https://wa.me/?text=${encodeURIComponent(
                                      m.text
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-3 py-2 hover:bg-gray-100 text-sm"
                                  >
                                    WhatsApp
                                  </a>
                                  <a
                                    href={`mailto:?body=${encodeURIComponent(
                                      m.text
                                    )}`}
                                    className="block px-3 py-2 hover:bg-gray-100 text-sm"
                                  >
                                    Email
                                  </a>
                                </div>
                              </div>
                              {/* Modifier */}
                              <div className="relative group">
                                <button className="text-gray-500 hover:text-blue-600">
                                  ✏️ Modifier
                                </button>
                                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md border border-gray-200 mt-1 w-64 z-50">
                                  {rewriteOptions.map((opt) =>
                                    opt.submenu ? (
                                      <div
                                        key={opt.label}
                                        className="relative group/sub"
                                      >
                                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                          {opt.label}
                                        </button>
                                        <div className="absolute left-full top-0 hidden group-hover/sub:block bg-white shadow-lg rounded-md border border-gray-200 w-48">
                                          {opt.submenu.map((sub) => (
                                            <button
                                              key={sub.label}
                                              onClick={() =>
                                                handleAiRewrite(
                                                  m.id,
                                                  m.text,
                                                  sub.prompt
                                                )
                                              }
                                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                              {sub.label}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        key={opt.label}
                                        onClick={() =>
                                          handleAiRewrite(
                                            m.id,
                                            m.text,
                                            opt.prompt
                                          )
                                        }
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                      >
                                        {opt.label}
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
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
                className="px-5 py-4 border-t border-gray-100 bg-white flex gap-3"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
