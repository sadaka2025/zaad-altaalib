// Dans TestimonialsSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialsSection() {
  const { i18n, t } = useTranslation();
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [i18n.language]);

  const testimonials = t("testimonials.items", { returnObjects: true });

  return (
    <section className="py-16 bg-white" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Témoignages */}
          <div className="bg-violet-100 p-6 rounded-xl shadow-lg">
            <Swiper
              key={swiperKey}
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              onBeforeInit={(swiper) => (swiperRef.current = swiper)}
            >
              {testimonials.map((testi, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center px-4">
                    <img
                      src={testi.image}
                      alt={testi.name}
                      className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-violet-300"
                    />
                    <p className="text-gray-800 italic mb-4">“{testi.comment}”</p>
                    <h4 className="text-lg font-semibold text-violet-800">{testi.name}</h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Texte + boutons */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🗣️ {t("testimonials.title")}
            </h2>
            <p className="text-gray-600 mb-6">{t("testimonials.description")}</p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-500 text-white hover:bg-violet-600 transition"
              >
                ←
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-500 text-white hover:bg-violet-600 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
