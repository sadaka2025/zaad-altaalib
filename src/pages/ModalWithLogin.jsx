import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext"; // ✅ Import du contexte global

export default function ModalWithLogin({
  buttonLabel = "Se connecter",
  onLoginSuccess = () => {},
  forceOpen = false,
  onClose = () => {},
}) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const { login } = useAuth(); // ✅ Utilisation du login global

  useEffect(() => {
    setIsOpen(forceOpen);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Bouton affiché uniquement si on utilise le composant seul */}
      {!forceOpen && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {buttonLabel}
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleClose}
          ></div>

          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8 flex flex-col items-center text-black">
            <h1 className="text-xl font-bold text-gray-800 mb-2">InsideBox</h1>
            <p className="text-gray-500 mb-6">Sign up to InsideBox</p>

            <div className="w-full">
              <LoginForm
                onLoginSuccess={(userData) => {
                  console.log("Connexion réussie :", userData);
                  localStorage.setItem("userEmail", userData); // 🔹 Sauvegarde email
                  login(); // ✅ Authentification globale immédiate
                  if (onLoginSuccess) onLoginSuccess(userData);
                  handleClose(); // ✅ Fermer la modale
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
