// src/components/ScrollToTopButton.jsx
import React from "react";

export default function ScrollToTopButton() {
  const handleScrollTop = () => {
    const aside = document.querySelector("aside");
    if (aside) aside.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollTop}
      className="bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600"
    >
      ⬆️
    </button>
  );
}
