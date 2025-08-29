import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';

export default function LayoutConfigurable() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="flex flex-col min-h-screen bg-white text-gray-800"
    >
      {/* ✅ Navbar visible sur toutes les pages */}
      <Navbar />

      {/* Contenu principal */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
}
