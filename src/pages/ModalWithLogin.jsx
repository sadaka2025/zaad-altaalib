import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";

export default function ModalWithLogin({
  buttonLabel = "Se connecter",
  onLoginSuccess = () => {},
  forceOpen = false,
  onClose = () => {},
}) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const { login } = useAuth();

  useEffect(() => {
    setIsOpen(forceOpen);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
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
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8 flex flex-col items-center">
            <LoginForm
              onLoginSuccess={(userEmail) => {
                login();
                localStorage.setItem("userEmail", userEmail);
                if (onLoginSuccess) onLoginSuccess(userEmail);
                handleClose();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
