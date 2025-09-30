// src/components/Modal/ModalWithLogin.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../pages/Visitors/LoginForm';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { MdOutlineHighlightOff } from 'react-icons/md';

export default function ModalWithLogin({
  buttonLabel = 'Se connecter',
  forceOpen = false,
  onClose = () => {},
}) {
  const [isOpen, setIsOpen] = useState(forceOpen);

  useEffect(() => {
    setIsOpen(forceOpen);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleLoginSuccess = (email) => {
    setIsOpen(false);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose}></div>

      {/* Vidéo arrière-plan */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source
          src="https://ariqdghgxknuvowhgftt.supabase.co/storage/v1/object/public/videos/vecteezy_animated-flying-through-the-stars-and-blue-and-red-in-space_8079146.mp4"
          type="video/mp4"
        />
      </video>

      {/* Neon Login */}
      <div className="relative z-10 w-[90%] max-w-3xl flex items-center justify-center">
        {/* Spheres décoratives */}
        <div
          className="absolute w-[280px] h-[280px] top-[1%] left-[1%] 
             rounded-full bg-gradient-radial from-[#ff00ff] to-[#9d00ff] 
             opacity-70 animate-float-sphere1"
        ></div>

        <div
          className="absolute w-[220px] h-[220px] bottom-[10%] right-[15%] 
             rounded-full bg-gradient-radial from-[#00ffcc] to-[#0099ff] 
             opacity-70 animate-float-sphere2"
        ></div>

        <div
          className="absolute w-[150px] h-[150px] bottom-[15%] left-[10%] 
             rounded-full bg-gradient-radial from-[#ffcc00] to-[#ff6600] 
             opacity-70 animate-float-sphere3"
        ></div>

        {/* Glass Card */}
        <div className="relative z-10 w-full max-w-md p-10 m-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9d00ff] to-[#00ffcc] bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-white opacity-80">Sign in to your account</p>
          </div>

          {/* LoginForm importé ici */}
          <LoginForm onLoginSuccess={handleLoginSuccess} />

          {/* Socials */}
          <div className="text-center mt-8">
            <p className="text-white text-sm opacity-80 mb-4">Follow us</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/YourPage"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:shadow-lg transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://accounts.google.com/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:shadow-lg transition"
              >
                <FaGoogle />
              </a>
              <a
                href="https://twitter.com/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:shadow-lg transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://t.me/YourTelegram"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:shadow-lg transition"
              >
                {/* Telegram icon via SVG car react-icons n'a pas de FaTelegram officiel */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 240 240"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M120 0C53.7 0 0 53.7 0 120s53.7 120 120 120 120-53.7 120-120S186.3 0 120 0zm57.7 84.7l-22.3 104.9c-1.7 7.4-6.1 9.3-12.3 5.8l-34.1-25.2-16.5 15.9c-1.8 1.8-3.3 3.3-6.6 3.3l2.4-34.1 61.9-55.9c2.7-2.4-0.6-3.7-4.2-1.3l-76.5 48.2-32.9-10.3c-7.1-2.2-7.2-7.1 1.5-10.5l128.1-49.4c5.9-2.3 11.1 1.5 9.6 10.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bouton close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-cyan-300 text-2xl z-20"
        >
          🔙
        </button>
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
