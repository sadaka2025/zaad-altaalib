// src/pages/Auth/LoginForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { FaEnvelope, FaUser } from 'react-icons/fa';

export default function LoginForm({ onLoginSuccess }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [biographie, setBiographie] = useState('');
  const [profil, setProfil] = useState('student');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('email'); // 'email' ou 'signup'
  const [canSignUp, setCanSignUp] = useState(false);
  const [canSignIn, setCanSignIn] = useState(false);
  const [allowedList, setAllowedList] = useState([]);
  const [blockedList, setBlockedList] = useState([]);
  const debounceTimer = useRef(null);

  // Chargement des emails autorisés et bloqués
  useEffect(() => {
    const loadEmailLists = async () => {
      try {
        const allowed = await fetch('/dataemail/allowedEmails.json').then(
          (res) => res.json()
        );
        const blocked = await fetch('/dataemail/blockedEmails.json').then(
          (res) => res.json()
        );
        setAllowedList(allowed.map((e) => e.toLowerCase()));
        setBlockedList(blocked.map((e) => e.toLowerCase()));
      } catch (err) {
        console.error('Erreur chargement listes emails:', err);
      }
    };
    loadEmailLists();
  }, []);

  const verifyEmailFormat = (inputEmail) => {
    if (!inputEmail) return;
    const lowerEmail = inputEmail.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(lowerEmail)) {
      setCanSignIn(false);
      setCanSignUp(false);
      setMessage('❌ Format email invalide');
      return;
    }

    if (blockedList.includes(lowerEmail)) {
      setCanSignIn(false);
      setCanSignUp(false);
      setMessage('⛔ Accès interdit');
    } else if (allowedList.includes(lowerEmail)) {
      setCanSignIn(true);
      setCanSignUp(false);
      setMessage('✅ Email autorisé — connexion possible');
    } else {
      setCanSignIn(false);
      setCanSignUp(true);
      setMessage('ℹ️ Email inconnu — inscription possible');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setMessage('');
    setCanSignIn(false);
    setCanSignUp(false);
    setError('');
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      verifyEmailFormat(value);
    }, 500);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    const lowerEmail = email.toLowerCase();

    if (canSignIn) {
      login({
        id: uuidv4(),
        email: lowerEmail,
        name: username || 'Utilisateur',
        role: 'student',
        avatar_url: null,
      });
      onLoginSuccess?.(lowerEmail);
    } else if (canSignUp) {
      setStep('signup');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('Merci de remplir le nom d’utilisateur.');
      return;
    }

    const lowerEmail = email.toLowerCase();

    login({
      id: uuidv4(),
      email: lowerEmail,
      name: username,
      role: profil,
      biographie,
      avatar_url: null,
    });

    onLoginSuccess?.(lowerEmail);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {step === 'email' && (
        <form onSubmit={handleSubmitEmail} className="space-y-6 w-full">
          <div className="relative">
            <div className="flex items-center mb-1 text-white opacity-80">
              <FaEnvelope className="mr-2" />
              <label htmlFor="email" className="text-sm">
                Email Address
              </label>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <div className="flex items-center mb-1 text-white opacity-80">
              <FaUser className="mr-2" />
              <label htmlFor="username" className="text-sm">
                Username
              </label>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 outline-none transition-all"
            />
          </div>

          {message && (
            <p className="text-white text-sm opacity-80">{message}</p>
          )}
          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={!canSignIn && !canSignUp}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#9d00ff] to-[#ff00ff] text-white font-semibold tracking-wider hover:translate-y-[-2px] hover:shadow-lg transition-all"
          >
            {canSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      )}

      {step === 'signup' && (
        <form onSubmit={handleSignupSubmit} className="space-y-6 w-full mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled
              className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 outline-none transition-all opacity-60 cursor-not-allowed"
            />
          </div>

          <div className="relative">
            <textarea
              placeholder="Biographie"
              value={biographie}
              onChange={(e) => setBiographie(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 outline-none transition-all resize-none h-24"
            />
          </div>

          <div className="relative">
            <select
              value={profil}
              onChange={(e) => setProfil(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-gray-500/20 border border-white/20 text-white placeholder-white/50 focus:bg-sky-200/40 focus:border-white/40 outline-none transition-all"
            >
              <option value="student">Student</option>
              <option value="enseignant">Teacher</option>
              <option value="admin">Administrative Agent</option>
              <option value="autre">Other</option>
            </select>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#9d00ff] to-[#ff00ff] text-white font-semibold tracking-wider hover:translate-y-[-2px] hover:shadow-lg transition-all"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
