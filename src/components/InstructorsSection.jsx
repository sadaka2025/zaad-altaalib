import React, { useRef, useEffect, useState } from "react";
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

  useEffect(() => {
    setSwiperKey(prev => prev + 1);
  }, [i18n.language]);

  const instructors = [
    { name: t("instructor1_name"), bio: t("instructor1_bio"), image: "/images/instructor1.jpg" },
    { name: t("instructor2_name"), bio: t("instructor2_bio"), image: "/images/instructor2.jpg" },
    { name: t("instructor3_name"), bio: t("instructor3_bio"), image: "/images/instructor3.jpg" },
    { name: t("instructor4_name"), bio: t("instructor4_bio"), image: "/images/instructor4.jpg" },
    { name: t("instructor5_name"), bio: t("instructor5_bio"), image: "/images/instructor5.jpg" },
    { name: t("instructor6_name"), bio: t("instructor6_bio"), image: "/images/instructor6.jpg" },
    { name: t("instructor7_name"), bio: t("instructor7_bio"), image: "/images/instructor7.jpg" },
    { name: t("instructor8_name"), bio: t("instructor8_bio"), image: "/images/instructor8.jpg" },
    { name: t("instructor9_name"), bio: t("instructor9_bio"), image: "/images/instructor9.jpg" },
    { name: t("instructor10_name"), bio: t("instructor10_bio"), image: "/images/instructor10.jpg" },
  ];

  
  return (
    <section className="py-16 bg-white"  dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          {t("our_instructors")}
        </h2>
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
              <div className="bg-gray-100 p-6 rounded-xl text-center shadow-md">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg">{inst.name}</h3>
                <p className="text-sm text-gray-600">{inst.bio}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}