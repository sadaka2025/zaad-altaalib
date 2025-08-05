// src/pages/AvisPage.jsx
import React from "react";

export default function AvisPage() {
  return (
    <div className="font-[Arial] max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        ✨ Donnez votre avis
      </h1>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Votre avis :</span>
          <textarea
            className="w-full border rounded-lg p-2 mt-1"
            rows={4} // ✅ number
            placeholder="Exprimez votre opinion ici..."
          ></textarea>
        </label>

        <label className="block">
          <span className="text-gray-700">Nom (facultatif) :</span>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Votre nom"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
