import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <footer
      className="text-white py-12 mt-10"
      style={{
        backgroundImage: `url("/images/footer-bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#4b0082", // fallback
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* 📥 Contact Button */}
        <div className="mb-6">
          <Link to={`/${lang}/problemes`}>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 mt-2 rounded">
              📥 {t("report_issue")}
            </button>
          </Link>
        </div>

        {/* 🌐 Social Links */}
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

        {/* 🧾 Rights Text */}
        <p className="text-sm text-gray-200">
          © 2025 زاد الطالب - {t("rights_reserved")}
        </p>
      </div>
    </footer>
  );
}
