import React, { useState } from "react"; 
import { useTranslation } from "react-i18next";
// ... autres imports

export default function DiplomaSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [modalSubject, setModalSubject] = useState(null);

  return (
    <section className="bg-white py-16 px-4 md:px-12" id="diploma-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-green-900">{t("diploma.title1")}</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{t("diploma.desc1")}</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">{t("diploma.title2")}</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{t("diploma.desc2")}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-green-800 mb-2">{t("diploma.motivational")}</h2>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("diploma.heading")}</h2>

        {/* Swiper ... */}

        {/* Modal */}
        {modalSubject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setModalSubject(null)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{modalSubject.name}</h3>
              <p className="text-gray-700 mb-6">{modalSubject.description}</p>
              <button
                onClick={() => setModalSubject(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {t("diploma.close")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
