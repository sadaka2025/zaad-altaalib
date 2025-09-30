// src/components/ConfettiButton.jsx
import React, { useRef } from 'react';
import JSConfetti from 'js-confetti';

export default function ConfettiButton({
  label,
  theme = 'flowers',
  onClick,
  className = '',
  children,
}) {
  const jsConfetti = useRef(new JSConfetti());

  const handleClick = (e) => {
    // Choix du thème
    let emojis;
    switch (theme) {
      case 'flowers':
        emojis = ['🌸', '🌺', '🌼', '🌻', '💐', '🌷', '⭐', '✨', '🌟', '💫'];
        break;
      case 'stars':
        emojis = ['⭐', '✨', '🌟', '💫'];
        break;
      case 'party':
        emojis = ['🎉', '🎊', '🎈', '🥳'];
        break;
      default:
        emojis = ['🎉', '⭐', '🌸']; // fallback mix
    }

    // Lancer les confettis
    jsConfetti.current.addConfetti({
      emojis,
      emojiSize: 40,
      confettiNumber: 60,
    });

    // Exécuter l’action d’origine
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} className={className}>
      {/* Si on fournit children → il remplace label */}
      {children || label}
    </button>
  );
}
