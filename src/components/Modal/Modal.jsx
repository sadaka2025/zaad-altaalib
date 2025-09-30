// src/components/Modal.jsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, content }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      // نحدّث الحالة حسب وجود fullscreen حاليًا
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!isOpen) return null;

  const enterFullScreen = () => {
    const contentEl = document.querySelector('.modal-content');
    if (contentEl && !document.fullscreenElement) {
      contentEl.requestFullscreen().catch((err) => {
        console.error('Erreur plein écran :', err.message);
      });
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="modal-content bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg relative p-6 scrollbar-thin scrollbar-thumb-blue-900">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-gray-600 hover:text-red-600 transition z-50"
          aria-label="Fermer la modale"
        >
          <X size={24} />
        </button>

        {/* زر ملء الشاشة */}
        {!isFullscreen && (
          <button
            onClick={enterFullScreen}
            className="absolute top-4 end-16 bg-[#00CED1]/80 hover:bg-green-700 text-white px-3 py-1 rounded shadow text-sm z-50 animate-pulse"
            aria-label="Plein écran"
          >
            ⛶ ملء الشاشة
          </button>
        )}

        {/* زر الرجوع من ملء الشاشة */}
        {isFullscreen && (
          <button
            onClick={exitFullScreen}
            className="absolute top-4 end-40 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded shadow text-sm z-50"
            aria-label="Quitter le plein écran"
          >
            🔙 رجوع
          </button>
        )}

        {/* العنوان */}
        <h2 className="text-2xl font-semibold mb-4 text-center border-b border-gray-200 pb-2">
          {title}
        </h2>

        {/* المحتوى */}
        <div className="space-y-4 text-gray-800">{content}</div>
      </div>
    </div>
  );
}
