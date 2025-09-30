// src/components/buttons/StarConfettiButton.jsx
import React from 'react';
import ConfettiButton from './ConfettiButton';

export default function StarConfettiButton({ children, ...props }) {
  return (
    <ConfettiButton
      label={label}
      theme="stars"
      className={`bg-indigo-500 hover:bg-indigo-600 text-white ${props.className || ''}`}
      {...props}
    />
  );
}
