// src/pages/LoginForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export default function LoginForm({ onLoginSuccess }) {
  const facebookIcon = "/images/facebook-icon.png";
  const googleIcon = "/images/google-icon.png";
  const appleIcon = "/images/apple-icon.png";

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pastEmails, setPastEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("email");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [profil, setProfil] = useState("student");
  const [error, setError] = useState("");
  const [canSignUp, setCanSignUp] = useState(true);
  const [canSignIn, setCanSignIn] = useState(true);
  const [blockedList, setBlockedList] = useState([]);
  const [allowedList, setAllowedList] = useState([]);
  const [user, setUser] = useState(null);
  const debounceTimer = useRef(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);
      saveEmailToHistory(loggedUser.email.toLowerCase());
      login();
      if (onLoginSuccess) onLoginSuccess(loggedUser.email.toLowerCase());
      window.location.href = "/ar/";
    } catch (err) {
      console.error("Erreur connexion Google:", err);
      setError("Impossible de se connecter avec Google.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Erreur déconnexion:", err);
    }
  };

  const saveEmailToHistory = (newEmail) => {
    if (!newEmail) return;
    const saved = JSON.parse(localStorage.getItem("pastEmails") || "[]");
    if (!saved.includes(newEmail)) {
      const updated = [...saved, newEmail];
      localStorage.setItem("pastEmails", JSON.stringify(updated));
      setPastEmails(updated);
    }
  };

  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem("pastEmails") || "[]");
    setPastEmails(savedEmails);

    const loadLists = async () => {
      try {
        const blocked = await fetch("/dataemail/blockedEmails.json").then(
          (res) => res.json()
        );
        setBlockedList(blocked.map((e) => e.toLowerCase()));

        const allowed = await fetch("/dataemail/allowedEmails.json").then(
          (res) => res.json()
        );
        setAllowedList(allowed.map((e) => e.toLowerCase()));
      } catch (err) {
        console.error("Erreur chargement listes emails:", err);
      }
    };
    loadLists();
  }, []);

  const verifyEmailFormat = async (inputEmail) => {
    if (!inputEmail) return;
    const lowerEmail = inputEmail.toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(lowerEmail)) {
      setCanSignIn(false);
      setCanSignUp(false);
      setMessage("❌ Format email invalide");
      return;
    }

    if (blockedList.includes(lowerEmail)) {
      setCanSignIn(false);
      setCanSignUp(false);
      setMessage("⛔ Accès interdit");
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, lowerEmail);

      if (methods.length > 0 || allowedList.includes(lowerEmail)) {
        // ✅ Sign In si Firebase Auth ou allowedList
        setCanSignIn(true);
        setCanSignUp(false);
        setMessage("✅ Email autorisé — connexion possible");
      } else {
        // ✨ Sign Up si inconnu et non autorisé
        setCanSignIn(false);
        setCanSignUp(true);
        setMessage("✨ Email inconnu — création possible");
      }
    } catch (err) {
      console.error("Erreur vérification email Firebase:", err);
      setCanSignIn(false);
      setCanSignUp(false);
      setMessage("⚠️ Erreur vérification email");
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setMessage("");
    setError("");

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      verifyEmailFormat(value);
    }, 500);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (canSignIn) {
      saveEmailToHistory(email.toLowerCase());
      login();
      if (onLoginSuccess) onLoginSuccess(email.toLowerCase());
      window.location.href = "/ar/";
    } else if (canSignUp) {
      setStep("signup");
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!nom || !prenom) {
      setError("Merci de remplir tous les champs.");
      return;
    }
    saveEmailToHistory(email.toLowerCase());
    login();
    if (onLoginSuccess) onLoginSuccess(email.toLowerCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        {/* En-tête */}
        <div className="bg-blue-800/80 backdrop-blur-md p-4 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-white mb-1">
            مرحبا بكم بيننا 🌸
          </h1>
          <p className="text-white mb-1">
            بسم الله الرحمن الرحيم عليه توكلت و إليه أنيب
          </p>
          <p className="text-white mb-2">صلوا على رسول الله ﷺ</p>
        </div>

        {user ? (
          <div className="text-center mt-6">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h2 className="text-lg font-bold">{user.displayName}</h2>
            <p className="text-gray-500">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mt-4 mb-4">
              {error && <p className="text-red-600 mb-2">{error}</p>}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 mb-3"
              >
                <img src={googleIcon} alt="Google" className="h-5" />
                Connexion avec Google
              </button>
            </div>

            {step === "email" && (
              <form
                onSubmit={handleSubmitEmail}
                className="flex flex-col items-center w-full px-4"
              >
                <input
                  type="email"
                  list="pastEmails"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  required
                  className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-2 text-black"
                />
                <datalist id="pastEmails">
                  {pastEmails.map((mail, i) => (
                    <option key={i} value={mail} />
                  ))}
                </datalist>

                {message && (
                  <p className="text-sm text-gray-600 mb-2">{message}</p>
                )}

                <div className="flex w-full gap-2 mt-2">
                  <button
                    type="submit"
                    disabled={!canSignIn && !canSignUp}
                    className="flex-1 py-3 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                  >
                    🔑 Sign In
                  </button>
                  <button
                    type="submit"
                    disabled={!canSignIn && !canSignUp}
                    className="flex-1 py-3 rounded-full bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
                    onClick={() => setStep("signup")}
                  >
                    ✨ Sign Up
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    className="flex-1 border p-2 rounded"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/sharer.php?u=https://www.flaticon.com/free-icons/facebook",
                        "facebook-share-dialog",
                        "width=600,height=400"
                      )
                    }
                  >
                    <img
                      src="/images/facebook-icon.png"
                      alt="Facebook"
                      className="mx-auto h-5"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-1 border p-2 rounded"
                    onClick={() =>
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&su=Partage&body=https://www.flaticon.com/free-icons/facebook",
                        "gmail-share-dialog",
                        "width=800,height=600"
                      )
                    }
                  >
                    <img
                      src="/images/google-icon.png"
                      alt="Google"
                      className="mx-auto h-5"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-1 border p-2 rounded"
                    onClick={() =>
                      window.open(
                        "https://www.icloud.com/mail",
                        "apple-share-dialog",
                        "width=800,height=600"
                      )
                    }
                  >
                    <img
                      src="/images/apple-icon.png"
                      alt="Apple"
                      className="mx-auto h-5"
                    />
                  </button>
                </div>
              </form>
            )}

            {step === "signup" && (
              <form
                onSubmit={handleSignupSubmit}
                className="flex flex-col items-center w-full px-4 mt-4"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-2 text-black"
                />
                <input
                  type="text"
                  placeholder="First name"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                  className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-2 text-black"
                />
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-2 text-black"
                />
                <select
                  value={profil}
                  onChange={(e) => setProfil(e.target.value)}
                  className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-2 text-black"
                >
                  <option value="student">Student</option>
                  <option value="enseignant">Teacher</option>
                  <option value="autre">Other</option>
                </select>

                {error && <p className="text-red-600 mb-2">{error}</p>}

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
                >
                  ✨ Sign Up
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
