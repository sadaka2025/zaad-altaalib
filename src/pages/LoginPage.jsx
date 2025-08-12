import React, { useState } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage({ onLoginSuccess }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Inscription</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onLoginSuccess) onLoginSuccess(email);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
