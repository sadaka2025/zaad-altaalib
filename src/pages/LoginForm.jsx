// src/pages/LoginForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm({ onLoginSuccess }) {
  // Icônes
  const facebookIcon = "/images/facebook-icon.png";
  const googleIcon = "/images/google-icon.png";
  const appleIcon = "/images/apple-icon.png";

  const { login } = useAuth();

  // États
  const [email, setEmail] = useState("");
  const [pastEmails, setPastEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("email");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [profil, setProfil] = useState("student");
  const [error, setError] = useState("");
  const [canSignUp, setCanSignUp] = useState(false);
  const [canSignIn, setCanSignIn] = useState(false);
  const [allowedList, setAllowedList] = useState([]);
  const [blockedList, setBlockedList] = useState([]);
  const debounceTimer = useRef(null);

  // Charger historique + listes emails
  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem("pastEmails") || "[]");
    setPastEmails(savedEmails);

    const loadEmailLists = async () => {
      try {
        const allowed = await fetch("/dataemail/allowedEmails.json").then(
          (res) => res.json()
        );
        const blocked = await fetch("/dataemail/blockedEmails.json").then(
          (res) => res.json()
        );

        setAllowedList(allowed.map((e) => e.toLowerCase()));
        setBlockedList(blocked.map((e) => e.toLowerCase()));
      } catch (err) {
        console.error("Erreur chargement listes emails:", err);
      }
    };

    loadEmailLists();
  }, []);

  // Sauvegarder email dans l’historique
  const saveEmailToHistory = (newEmail) => {
    if (!newEmail) return;
    const saved = JSON.parse(localStorage.getItem("pastEmails") || "[]");
    if (!saved.includes(newEmail)) {
      const updated = [...saved, newEmail];
      localStorage.setItem("pastEmails", JSON.stringify(updated));
      setPastEmails(updated);
    }
  };

  // Vérification du format email et autorisation
  const verifyEmailFormat = (inputEmail) => {
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
    } else if (allowedList.includes(lowerEmail)) {
      setCanSignIn(true);
      setCanSignUp(false);
      setMessage("✅ Email autorisé — connexion possible");
    } else {
      setCanSignIn(false);
      setCanSignUp(true);
      setMessage("ℹ️ Email inconnu — inscription possible");
    }
  };

  // Gestion saisie email avec debounce
  const handleEmailChange = (value) => {
    setEmail(value);
    setMessage("");
    setCanSignIn(false);
    setCanSignUp(false);
    setError("");

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      verifyEmailFormat(value);
    }, 500);
  };

  // Soumission email
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

  // Soumission inscription
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
    <div className="flex flex-col min-h-screen">
      {/* Effet bouton */}
      <style>{`
        .buttonEffect {
          position: relative;
          display: inline-block;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 5px;
          overflow: hidden;
          background: radial-gradient(ellipse farthest-corner at right bottom, #4f83cc 0%, #3b6db1 8%, #2f5990 30%, #274a78 40%, transparent 80%),
                      radial-gradient(ellipse farthest-corner at left top, #d0e4ff 0%, #a4c7ff 8%, #6b96d6 25%, #274a78 62.5%, #274a78 100%);
          color: #fff;
          font-family: Arial, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
        }
        .buttonEffect::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          display: inline-block;
          width: 10%;
          height: 120%;
          transform: skewX(30deg);
          background-color: #fff;
          box-shadow: 10px 0px 10px rgba(255,255,255,0.5);
          transition: left 1s ease;
        }
        .buttonEffect:hover::before {
          left: 150%;
        }
        .buttonEffect:disabled {
          background: #ccc;
          color: #777;
          cursor: not-allowed;
        }
      `}</style>

      {/* En-tête */}
      <div className="w-full bg-cover bg-center flex justify-center items-center h-64">
        <div className="bg-blue-800/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center animate-fadeIn">
          <h1
            className="text-3xl font-bold text-white mb-3 animate-pulse"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            مرحبا بكم بيننا 🌸
          </h1>
          <p className="text-lg text-white mb-1">
            بسم الله الرحمن الرحيم عليه توكلت و إليه أنيب
          </p>
          <p className="text-lg text-white mb-4">صلوا على رسول الله ﷺ</p>
        </div>
      </div>

      {/* Étape Email */}
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
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3 text-black"
          />
          <datalist id="pastEmails">
            {pastEmails.map((mail, i) => (
              <option key={i} value={mail} />
            ))}
          </datalist>

          {message && <p className="text-sm text-gray-600 mb-3">{message}</p>}
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={!canSignIn && !canSignUp}
            className="w-full py-3 rounded-full font-medium buttonEffect"
          >
            {canSignIn ? "Sign In" : "Sign Up"}
          </button>

          {/* Boutons sociaux */}
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
              <img src={facebookIcon} alt="Facebook" className="mx-auto h-5" />
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
              <img src={googleIcon} alt="Google" className="mx-auto h-5" />
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
              <img src={appleIcon} alt="Apple" className="mx-auto h-5" />
            </button>
          </div>
        </form>
      )}

      {/* Étape Signup */}
      {step === "signup" && (
        <form
          onSubmit={handleSignupSubmit}
          className="flex flex-col items-center w-full px-4"
        >
          <input
            type="text"
            placeholder="Your name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3 text-black"
          />
          <input
            type="text"
            placeholder="First name"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3 text-black"
          />
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3 text-black"
          />
          <select
            value={profil}
            onChange={(e) => setProfil(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3 text-black"
          >
            <option value="student">Student</option>
            <option value="enseignant">Teacher</option>
            <option value="autre">Other</option>
          </select>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-full buttonEffect"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
