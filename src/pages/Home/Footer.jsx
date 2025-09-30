import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <footer
      className="relative text-white py-12 mt-10 overflow-hidden"
      style={{
        backgroundImage: `url("/images/arrierefooterr.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#5976c7ff',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Contact Button */}
        <div className="mb-6">
          <Link to="/probleme">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 mt-2 rounded">
              📥 شاركنا اقتراحك أو مشكلتك
            </button>
          </Link>
        </div>
        {/* Avis Button */}
        <div className="mb-6">
          <Link to="/avis">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 mt-2 rounded">
              📥 رايكم في منصتنا
            </button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-6 text-lg">
          <a
            href="https://facebook.com/yourgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            🔵 Facebook
          </a>
          <a
            href="https://t.me/+yourgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            🟦 Telegram
          </a>
        </div>

        {/* Rights Text */}
        <p className="text-sm text-gray-200">
          © 2025 زاد الطالب - {t('rights_reserved')}
        </p>
      </div>
    </footer>
  );
}
