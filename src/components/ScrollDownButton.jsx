import React, { useEffect, useState } from "react";

export default function ScrollDownButton() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY < 100); // cache si l’utilisateur descend
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = () => {
    const section = document.getElementById("benefits-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    show && (
      <button
        onClick={scrollToSection}
        className="fixed bottom-20 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg z-50 transition transform hover:scale-110"
        title="Descendre vers la suite"
      >
        ⬇️
      </button>
    )
  );
}
