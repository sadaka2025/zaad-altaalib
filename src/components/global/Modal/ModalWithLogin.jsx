import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../../../pages/Home/LoginForm';

export default function ModalWithLogin({
  buttonLabel = 'Se connecter',
  onLoginSuccess = () => {},
  forceOpen = false,
  onClose = () => {},
}) {
  const [isOpen, setIsOpen] = useState(forceOpen);

  useEffect(() => {
    setIsOpen(forceOpen);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const modalContent = isOpen && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose}></div>

      {/* Vidéo en arrière-plan pleine fenêtre */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/videos/bg-login.mp4" type="video/mp4" />
      </video>

      {/* Modal central */}
      <div className="relative z-10 w-[35%] min-w-[350px] max-w-[700px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Logo en vidéo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="mb-6"
          style={{
            width: '80%', // même largeur que le logo
            height: '20%', // même hauteur que le logo
            objectFit: 'contain', // pour garder les proportions
          }}
        >
          <source src="/videos/logo.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        {/* LoginForm */}
        <LoginForm onLoginSuccess={onLoginSuccess} />

        {/* Footer juridique */}
        <div className="mt-6 text-center text-xs text-gray-400">
          En vous connectant, vous acceptez nos{' '}
          <a href="/terms" className="underline">
            Conditions d’utilisation
          </a>{' '}
          et notre{' '}
          <a href="/privacy" className="underline">
            Politique de confidentialité
          </a>
          .
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!forceOpen && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          {buttonLabel}
        </button>
      )}
      {isOpen && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
}
