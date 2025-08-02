import React from "react";

export default function ScrollToTopButton() {
  const handleClick = () => {
    const scrollContainer = findScrollContainer();
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const findScrollContainer = () => {
    const scrollableElements = document.querySelectorAll("*");
    for (let el of scrollableElements) {
      const hasScrollableContent = el.scrollHeight > el.clientHeight;
      const overflowYStyle = window.getComputedStyle(el).overflowY;
      const isScrollable =
        overflowYStyle !== "visible" && overflowYStyle !== "hidden";

      if (hasScrollableContent && isScrollable) {
        return el;
      }
    }
    return window;
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-32 right-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
    >
      ↑
    </button>
  );
}
