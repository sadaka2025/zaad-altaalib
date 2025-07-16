import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HeroSection() {
  const { t } = useTranslation();
  const { lang } = useParams();

  const link = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

  return (
    <section className="relative h-[80vh] overflow-hidden">
  {/* Force direction to LTR for Carousel */}
  <div dir="ltr">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={5000}
      showArrows={false}
      swipeable={false}
      emulateTouch={false}
      stopOnHover={false}
    >
      <div>
        <img
          src="/images/carousel1.jpg"
          alt="formation 1"
          className="h-[80vh] w-full object-cover"
        />
      </div>
      <div>
        <img
          src="/images/carousel2.jpg"
          alt="formation 2"
          className="h-[80vh] w-full object-cover"
        />
      </div>
      <div>
        <img
          src="/images/carousel3.jpg"
          alt="formation 3"
          className="h-[80vh] w-full object-cover"
        />
      </div>
    </Carousel>
  </div>

  {/* Overlay content */}
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
    <div className="container mx-auto px-4 text-white max-w-3xl text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
        🌟 {t("hero_title")}
      </h1>
      <p className="text-lg mb-6">{t("hero_description")}</p>
      <Link to={link("/formations")}>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition">
          📚 {t("explore_courses")}
        </button>
      </Link>
    </div>
  </div>
</section>

  );
}
