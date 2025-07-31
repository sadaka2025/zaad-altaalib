// src/components/ScrollDownButton.jsx
import React from "react";

export default function ScrollDownButton() {
  const handleScrollDown = () => {
    const aside = document.querySelector("aside");
    if (aside) aside.scrollTo({ top: aside.scrollHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollDown}
      className="bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600"
    >
      ⬇️
    </button>
  );
}
