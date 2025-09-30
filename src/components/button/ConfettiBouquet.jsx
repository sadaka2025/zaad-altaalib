import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ConfettiButton.css';

const ConfettiBouquet = ({ lesson, selected, onClick }) => {
  const btnRef = useRef(null);

  // Formes SVG des fleurs
  const flowerShapes = [
    (color) => `<circle cx="12" cy="12" r="5" fill="${color}" />`,
    (color) =>
      `<polygon points="12,2 15,10 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,10" fill="${color}" />`,
    (color) => `<ellipse cx="12" cy="12" rx="6" ry="4" fill="${color}" />`,
    (color) =>
      `<path d="M12 2 C14 8, 22 8, 12 22 C2 8, 10 8, 12 2 Z" fill="${color}" />`,
  ];

  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6FF0'];

  useEffect(() => {
    const btn = btnRef.current;
    const container = document.getElementById('confetti-container');
    if (!btn || !container) return;

    function emitFlowers() {
      const rect = btn.getBoundingClientRect();

      for (let i = 0; i < 15; i++) {
        const flower = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        flower.setAttribute('viewBox', '0 0 24 24');
        flower.setAttribute('class', 'flower-piece');

        const size = 12 + Math.random() * 14;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;

        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape =
          flowerShapes[Math.floor(Math.random() * flowerShapes.length)];
        flower.innerHTML = shape(color);

        // Position initial au centre du bouton
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;

        // Déplacement initial aléatoire
        const angle = Math.random() * 2 * Math.PI;
        const speed = 60 + Math.random() * 40;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed - 40; // un peu vers le haut

        flower.style.setProperty('--dx', `${dx}px`);
        flower.style.setProperty('--dy', `${dy}px`);
        flower.style.setProperty('--rot', `${Math.random() * 360}deg`);

        container.appendChild(flower);

        setTimeout(() => flower.remove(), 3000);
      }
    }

    btn.addEventListener('click', emitFlowers);
    return () => btn.removeEventListener('click', emitFlowers);
  }, []);

  return (
    <motion.button
      ref={btnRef}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative p-3 text-sm truncate rounded-xl border flex flex-col items-start gap-1 ${
        selected
          ? 'bg-green-700 border-green-400 shadow-lg'
          : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
      }`}
    >
      {/* Ligne principale : bouquet + titre */}
      <div className="flex items-center gap-2">
        <div className="text-2xl">💐</div>
        <h3 className="font-bold">Cours {lesson?.id}</h3>
      </div>

      {/* Description en dessous */}
      <p>{lesson?.title}</p>
    </motion.button>
  );
};

export default ConfettiBouquet;
