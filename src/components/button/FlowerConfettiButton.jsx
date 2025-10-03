// src/components/buttons/FlowerConfettiButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfettiButton from './ConfettiButton';

export default function FlowerConfettiButton({
  label,
  to,
  theme = 'flowers',
  children, // icône
  className = '',
  onClick,
  ...props
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      setTimeout(() => navigate(to), 800);
    }
    if (onClick) onClick();
  };

  // Classes selon le thème
  let themeClasses = '';
  switch (theme) {
    case 'green':
      themeClasses =
        'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white';
      break;
    case 'yellow':
      themeClasses =
        'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white';
      break;
    default:
      themeClasses =
        'bg-[#153f00] text-white relative overflow-hidden hover:bg-[#153f00]';
      break;
  }

  return (
    <ConfettiButton
      onClick={handleClick}
      className={`group relative flex items-center justify-center gap-3 px-12 py-4 rounded-lg font-bold text-lg shadow-lg transition-all overflow-hidden ${themeClasses} ${className}`}
      {...props}
    >
      {/* Bande animée au survol */}
      <span
        className="absolute left-0 top-0 w-[200%] h-[400%] bg-[#52b71f]
             -translate-x-[100%] -translate-y-[50%] rotate-45
             transition-transform duration-500 ease-in-out
             pointer-events-none group-hover:translate-x-[-10%]"
      ></span>

      {/* Contenu réel du bouton */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {label}
      </span>
    </ConfettiButton>
  );
}
