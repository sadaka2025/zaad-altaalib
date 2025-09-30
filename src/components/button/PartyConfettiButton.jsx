// src/components/buttons/PartyConfettiButton.jsx
import React from 'react';
import ConfettiButton from './ConfettiButton';

export default function PartyConfettiButton({ label, ...props }) {
  return (
    <ConfettiButton
      label={label}
      theme="party"
      className={`bg-yellow-400 hover:bg-yellow-500 text-black ${props.className || ''}`}
      {...props}
    />
  );
}
