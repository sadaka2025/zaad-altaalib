// src/pages/Auth/LoginForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function LoginForm({ onLoginSuccess }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [pastEmails, setPastEmails] = useState([]);
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('email');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [profil, setProfil] = useState('student');
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState('');
  const [canSignUp, setCanSignUp] = useState(false);
  const [canSignIn, setCanSignIn] = useState(false);
  const [allowedList, setAllowedList] = useState([]);
  const [blockedList, setBlockedList] = useState([]);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem('pastEmails') || '[]');
    setPastEmails(savedEmails);

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

  const saveEmailToHistory = (newEmail) => {
    if (!newEmail) return;
    const saved = JSON.parse(localStorage.getItem('pastEmails') || '[]');
    if (!saved.includes(newEmail)) {
      const updated = [...saved, newEmail];
      localStorage.setItem('pastEmails', JSON.stringify(updated));
      setPastEmails(updated);
    }
  };

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
      saveEmailToHistory(lowerEmail);

      login({
        id: uuidv4(),
        email: lowerEmail,
        name: 'Utilisateur',
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
    if (!nom || !prenom) {
      setError('Merci de remplir tous les champs.');
      return;
    }

    const lowerEmail = email.toLowerCase();
    saveEmailToHistory(lowerEmail);

    let avatarPath = null;
    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      avatarPath = `${uuidv4()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(avatarPath, avatarFile);
      if (uploadError)
        console.error('Erreur upload avatar:', uploadError.message);
    }

    login({
      id: uuidv4(),
      email: lowerEmail,
      name: `${nom} ${prenom}`,
      role: profil,
      avatar_url: avatarPath,
    });

    onLoginSuccess?.(lowerEmail);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {step === 'email' && (
        <form
          onSubmit={handleSubmitEmail}
          className="flex flex-col w-full gap-3"
        >
          <input
            type="email"
            list="pastEmails"
            placeholder="Email address"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            className="w-full p-3 rounded-md border bg-blue-50"
          />
          <datalist id="pastEmails">
            {pastEmails.map((mail, i) => (
              <option key={i} value={mail} />
            ))}
          </datalist>
          {message && <p className="text-sm text-gray-500">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={!canSignIn && !canSignUp}
            className="w-full py-3 bg-blue-600 text-white rounded-md"
          >
            {canSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      )}

      {step === 'signup' && (
        <form
          onSubmit={handleSignupSubmit}
          className="flex flex-col w-full gap-3 mt-4 bg-gray-50"
        >
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <select
            value={profil}
            onChange={(e) => setProfil(e.target.value)}
            className="w-full p-3 rounded-md border border-gray-300"
          >
            <option value="student">Student</option>
            <option value="enseignant">Teacher</option>
            <option value="autre">Other</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
