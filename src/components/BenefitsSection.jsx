import React from "react";
import { useTranslation } from "react-i18next";

export default function BenefitsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="relative h-[80vh] overflow-hidden flex items-center justify-center text-white text-center px-4">
      {/* فيديو الخلفية */}
      <video 
        src="https://res.cloudinary.com/dlik6kdpg/video/upload/v1752714284/knowledge-bg_afslxt.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* تغطية لونية */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* محتوى النص */}
      <div className="relative z-20 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          🌿 {t("benefits.title")}
        </h2>
        <p className={`text-lg md:text-xl leading-relaxed ${isRTL ? "rtl" : "ltr"}`}>
          {t("benefits.description")}
        </p>
      </div>
    </section>
  );
}
