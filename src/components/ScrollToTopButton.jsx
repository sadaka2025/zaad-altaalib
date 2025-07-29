import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const main = document.querySelector(".main-scrollable");
    const toggleVisibility = () => {
      if (main) setIsVisible(main.scrollTop > 300);
    };
    if (main) main.addEventListener("scroll", toggleVisibility);
    return () => {
      if (main) main.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const main = document.querySelector(".main-scrollable");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition transform hover:scale-110"
        title="Retour en haut"
      >
        ⬆️
      </button>
    )
  );
}
