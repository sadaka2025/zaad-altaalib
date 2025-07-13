
import React from 'react';

const years = [
  { title: 'السنة الأولى', link: '/year1' },
  { title: 'السنة الثانية', link: '/year2' },
  { title: 'السنة الثالثة', link: '/year3' },
  { title: 'السنة الرابعة', link: '/year4' },
  { title: 'السنة الخامسة', link: '/year5' },
];

export default function Formations() {
  return (
    <main className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {years.map((year, idx) => (
        <div key={idx} className="bg-white shadow-lg rounded-xl overflow-hidden">
          <img
            src={`https://source.unsplash.com/400x200/?books,study,education&sig=${idx}`}
            alt={year.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{year.title}</h2>
            <a
              href={year.link}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              تصفح الدروس
            </a>
          </div>
        </div>
      ))}
    </main>
  );
}
