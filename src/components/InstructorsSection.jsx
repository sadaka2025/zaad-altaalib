import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function InstructorsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [swiperKey, setSwiperKey] = useState(0);
  const [modalData, setModalData] = useState(null);

  useEffect(() => setSwiperKey((k) => k + 1), [i18n.language]);

  const instructorsRaw = t("instructors.instructors", { returnObjects: true });
const instructors = t("instructors", { returnObjects: true });


  return (
    <section className="py-16 bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
  {t("our_instructors")}
</h2>


        {instructors.length === 0 ? (
          <p className="text-gray-500">{t("no_instructors_available")}</p>
        ) : (
          <Swiper
            key={swiperKey}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
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
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg">{inst.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{inst.bio}</p>
                  <button
                    onClick={() => setModalData(inst)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t("view_cv")}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-xl max-w-xl mx-4 relative">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">{modalData.name}</h3>
            <div className="text-gray-700 space-y-2 whitespace-pre-line">
              {modalData.cv}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
