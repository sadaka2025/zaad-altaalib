// src/components/buttons/FlowerConfettiButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfettiButton from './ConfettiButton';

export default function FlowerConfettiButton({
  label,
  to,
  theme = 'flowers',
  ...props
}) {
  const navigate = useNavigate();

  return (
    <ConfettiButton
      label={label}
      theme={theme}
      onClick={() => {
        if (to) {
          setTimeout(() => navigate(to), 800);
        }
      }}
      className={`px-6 py-3 rounded-lg bg-yellow-400 text-black text-lg font-semibold hover:bg-yellow-500 transition mt-4 ${props.className || ''}`}
      {...props}
    />
  );
}
