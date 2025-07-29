// src/components/Modal.jsx
import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg relative p-6 scrollbar-thin scrollbar-thumb-blue-900">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-gray-600 hover:text-red-600 transition"
          aria-label="Fermer la modale"
        >
          <X size={24} />
        </button>

        {/* Titre */}
        <h2 className="text-2xl font-semibold mb-4 text-center border-b border-gray-200 pb-2">
          {title}
        </h2>

        {/* Contenu */}
        <div className="space-y-4 text-gray-800">{content}</div>
      </div>
    </div>
  );
}
