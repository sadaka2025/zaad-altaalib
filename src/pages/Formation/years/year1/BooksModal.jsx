// src/pages/Formation/years/year1/BooksModal.jsx
import React, { useState } from 'react';
import Modal from '@components/global/Modal/Modal';

// === Map globale des livres par clé ===
const booksMap = {
  fiqh: {
    id: 1,
    title: 'الفقه',
    author: 'اسم المؤلف',
    price: '100 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/fiqh.jpg',
    pdf: '/pdf/books/fiqh.pdf',
  },
  aqida: {
    id: 2,
    title: 'العقيدة',
    author: 'اسم المؤلف',
    price: '120 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/aqida.jpg',
    pdf: '/pdf/books/aqida.pdf',
  },
  tajwid: {
    id: 3,
    title: 'التجويد',
    author: 'اسم المؤلف',
    price: '90 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/tajwid.jpg',
    pdf: '/pdf/books/tajwid.pdf',
  },
  nahw: {
    id: 4,
    title: 'النحو',
    author: 'اسم المؤلف',
    price: '110 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/nahw.jpg',
    pdf: '/pdf/books/nahw.pdf',
  },
  sirah: {
    id: 5,
    title: 'السيرة',
    author: 'اسم المؤلف',
    price: '95 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/sirah.jpg',
    pdf: '/pdf/books/sirah.pdf',
  },
  hadith: {
    id: 6,
    title: 'الحديث',
    author: 'اسم المؤلف',
    price: '130 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/hadith.jpg',
    pdf: '/public/PDFs/year1/pdfStudyBooks/s1/hadith/bookshadiths1.pdf',
  },
  akhlaq: {
    id: 7,
    title: 'الأخلاق',
    author: 'اسم المؤلف',
    price: '85 د.ت',
    bio: 'سيرة قصيرة عن المؤلف...',
    objectives: 'أهداف هذا المقرر...',
    image: '/images/books/akhlaq.jpg',
    pdf: '/pdf/books/akhlaq.pdf',
  },
};

export default function BooksModal({ isOpen, onClose, subjectKey }) {
  const [selectedBook, setSelectedBook] = useState(null);

  // Si un subjectKey est fourni → récupérer seulement ce livre
  const books = subjectKey ? [booksMap[subjectKey]] : Object.values(booksMap);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedBook(null);
      }}
      title="مقررات السنة الأولى"
      content={
        selectedBook ? (
          // === Vue Détail ===
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:p-6">
            <div className="flex items-center justify-center">
              <img
                src={selectedBook.image || '/images/placeholder.png'}
                alt={selectedBook.title}
                className="w-72 h-auto shadow-lg rounded-lg"
              />
            </div>
            <div className="overflow-y-auto p-2 md:p-4 text-black">
              <h2 className="text-3xl font-extrabold mb-4 text-emerald-700">
                {selectedBook.title}
              </h2>
              <p className="mb-1">
                <span className="font-bold">عنوان الكتاب:</span>{' '}
                {selectedBook.title}
              </p>
              <p className="mb-1">
                <span className="font-bold">مؤلف الكتاب:</span>{' '}
                {selectedBook.author}
              </p>
              <p className="mb-4">
                <span className="font-bold">سعر الكتاب:</span>{' '}
                {selectedBook.price}
              </p>

              <h3 className="text-xl font-semibold mt-2 mb-2">
                سيرة مؤلف الكتاب
              </h3>
              <p className="text-gray-800">{selectedBook.bio}</p>

              <h3 className="text-xl font-semibold mt-6 mb-2">أهداف المقرر</h3>
              <p className="text-gray-800">{selectedBook.objectives}</p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                {selectedBook.pdf && (
                  <a
                    href={selectedBook.pdf}
                    download
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow"
                  >
                    ⬇️ تحميل PDF
                  </a>
                )}
                <button
                  onClick={() => setSelectedBook(null)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
                >
                  🔙 رجوع إلى القائمة
                </button>
              </div>
            </div>
          </div>
        ) : (
          // === Vue Liste ===
          <div className="space-y-6">
            {!subjectKey && (
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/zitouna-bg.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative py-8 md:py-12 text-center px-4">
                  <h2 className="text-2xl md:text-4xl font-black text-white drop-shadow">
                    مقررات السنة الأولى للسنة الدراسية 2024-2025
                  </h2>
                </div>
              </div>
            )}

            {/* === Grille === */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {books.map(
                (book) =>
                  book && (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className="relative cursor-pointer group w-40 rounded-xl overflow-hidden shadow-lg"
                    >
                      <img
                        src={book.image || '/images/placeholder.png'}
                        alt={book.title}
                        className="w-40 h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-blue-600 to-transparent opacity-0 group-hover:opacity-90 transition duration-300 flex items-center justify-center">
                        <span className="text-white font-bold text-lg drop-shadow-lg">
                          📖 اضغط للمزيد
                        </span>
                      </div>
                      <p className="text-center p-2 font-semibold bg-white">
                        {book.title}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        )
      }
    />
  );
}
