import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <footer className="border-t mt-10 pt-6 pb-4 text-center text-sm text-gray-500">
      {/* 📥 Contact Button */}
      <div className="mb-4">
        <Link to={`/${lang}/problemes`}>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 mt-2">
            📥 {t("report_issue")}
          </button>
        </Link>
      </div>

      {/* 🌐 Social Links */}
      <div className="flex justify-center items-center space-x-4 mb-3">
        <a
          href="https://facebook.com/yourgroup"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700"
        >
          🔵 Facebook
        </a>
        <a
          href="https://t.me/+yourgroup"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          🟦 Telegram
        </a>
      </div>

      {/* 🧾 Rights Text */}
      <p>© 2025 زاد الطالب - {t("rights_reserved")}</p>
    </footer>
  );
}
