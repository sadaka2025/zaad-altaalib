import React from "react";

export default function ScrollDownButton() {
  const scrollToBottom = () => {
    const main = document.querySelector(".main-scrollable");
    if (main) main.scrollTo({ top: main.scrollHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToBottom}
      className="fixed bottom-20 right-6 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg z-50 transition transform hover:scale-110"
      title="Descendre vers le bas"
    >
      ⬇️
    </button>
  );
}
