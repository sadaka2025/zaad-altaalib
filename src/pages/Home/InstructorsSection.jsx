import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSafeTranslateArray from "../../utils/useSafeTranslateArray";

export default function InstructorsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [swiperKey, setSwiperKey] = useState(0);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Mise à jour du slider quand la langue change
  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  // Evite erreur en SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sécurisation : récupère la liste ou un tableau vide
  const instructors = useSafeTranslateArray("instructors");

  if (!isClient) return null;

  const closeModal = () => setSelectedInstructor(null);

  return (
    <section className="py-16 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          {t("our_instructors")}
        </h2>

        {instructors.length > 0 ? (
          <Swiper
            key={swiperKey}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            navigation
            dir={isRTL ? "rtl" : "ltr"}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {instructors.map((inst, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-gray-100 p-6 rounded-xl text-center shadow-md h-full flex flex-col justify-between">
                  <div>
                    <img
                      src={inst.image}
                      alt={inst.name}
                      className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg">{inst.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{inst.bio}</p>
                  </div>
                  {inst.cv?.trim() && (
                    <button
                      className="mt-4 text-blue-600 underline text-sm"
                      onClick={() => setSelectedInstructor(inst)}
                    >
                      {t("view_cv")}
                    </button>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">
            {t("no_instructors_available")}
          </p>
        )}

        {/* Modal */}
        {selectedInstructor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-lg text-right overflow-y-auto max-h-[80vh] relative">
              <h3 className="text-xl font-bold mb-4">
                {selectedInstructor.name}
              </h3>
              <p className="whitespace-pre-wrap text-sm text-gray-700 mb-6">
                {selectedInstructor.cv || t("no_cv_available")}
              </p>
              <div className="text-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
