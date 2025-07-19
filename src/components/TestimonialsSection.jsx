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

  // Forcer le rechargement du Swiper à chaque changement de langue
  useEffect(() => setSwiperKey(k => k + 1), [i18n.language]);

  // Extraire et sécuriser la liste des témoignages
  const rawTestimonials = t("testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : [];

  return (
    <section
      className="relative py-16 text-white overflow-hidden"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://res.cloudinary.com/dlik6kdpg/video/upload/v1752714356/background-video_egt9l5.mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white bg-opacity-10 backdrop-blur p-6 rounded-2xl shadow-xl border border-white/20">
            <Swiper
              key={swiperKey}
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop
              autoplay={{ delay: 5000 }}
              onBeforeInit={(swiper) => (swiperRef.current = swiper)}
            >
              {testimonials.map((testi, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center px-4">
                    <img
                      src={testi.image}
                      alt={testi.name}
                      className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-white"
                    />
                    <p className="text-white/90 italic mb-4">“{testi.comment}”</p>
                    <h4 className="text-lg font-semibold text-white">{testi.name}</h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4">🗣️ {t("testimonials.title")}</h2>
            <p className="text-white/80 mb-6">{t("testimonials.description")}</p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded bg-white/20 hover:bg-white/40 transition flex items-center justify-center text-xl font-bold"
              >
                ←
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded bg-white/20 hover:bg-white/40 transition flex items-center justify-center text-xl font-bold"
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
