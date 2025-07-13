import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t mt-10 pt-6 pb-4 text-center text-sm text-gray-500 bg-white">
      <p className="mb-3">© 2025 زاد الطالب - جميع الحقوق محفوظة</p>
      <div className="flex justify-center items-center space-x-4">
        <a
          href="https://t.me/+yourgroup"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          🟦 Telegram
        </a>
        <a
          href="https://facebook.com/yourgroup"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700"
        >
          🔵 Facebook
        </a>
        <Link
          to="/contact"
          className="text-green-600 font-medium hover:underline"
        >
          📩 اتصل بنا
        </Link>
      </div>
    </footer>
  );
}
