import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../context/AuthContext";

export default function LoginForm({ onLoginSuccess }) {
  const { login } = useAuth();

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

  const debounceTimer = useRef(null);
  const DEBUG_MODE = true;

  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem("pastEmails") || "[]");
    setPastEmails(savedEmails);
  }, []);

  const saveEmailToHistory = (newEmail) => {
    if (!newEmail) return;
    const saved = JSON.parse(localStorage.getItem("pastEmails") || "[]");
    if (!saved.includes(newEmail)) {
      const updated = [...saved, newEmail];
      localStorage.setItem("pastEmails", JSON.stringify(updated));
      setPastEmails(updated);
    }
  };

  const verifyEmailFormat = async (inputEmail) => {
    if (!inputEmail) return;
    const lowerEmail = inputEmail.toLowerCase();

    try {
      // MOCK local
      if (import.meta.env.MODE === "development") {
        console.log("Mock API en dev");
        const mockData = {
          allowed: lowerEmail.endsWith("@test.com"),
          blocked: false,
        };
        if (mockData.blocked) {
          setCanSignIn(false);
          setCanSignUp(false);
          setMessage("⛔ Accès interdit");
        } else if (mockData.allowed) {
          setCanSignIn(true);
          setCanSignUp(false);
          setMessage("✅ Email autorisé — connexion possible");
        } else {
          setCanSignIn(false);
          setCanSignUp(true);
          setMessage("ℹ️ Email inconnu — inscription possible");
        }
        return;
      }

      // Production API (Vercel)
      const res = await fetch("/api/check-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lowerEmail }),
      });
      const data = await res.json();

      if (data.blocked) {
        setCanSignIn(false);
        setCanSignUp(false);
        setMessage("⛔ Accès interdit");
      } else if (data.allowed) {
        setCanSignIn(true);
        setCanSignUp(false);
        setMessage("✅ Email autorisé — connexion possible");
      } else {
        setCanSignIn(false);
        setCanSignUp(true);
        setMessage("ℹ️ Email inconnu — inscription possible");
      }
    } catch (err) {
      console.error("Erreur vérification visiteur:", err);
      setMessage("Erreur serveur");
    }
  };

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

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (canSignIn) {
      saveEmailToHistory(email.toLowerCase());
      login();
      if (onLoginSuccess) onLoginSuccess(email.toLowerCase());
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
    <div className="w-full">
      {step === "email" && (
        <form
          onSubmit={handleSubmitEmail}
          className="flex flex-col items-center w-full"
        >
          <div className="flex gap-6 mb-6">
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center border rounded-full hover:bg-gray-100"
            >
              <img src={facebookIcon} alt="Facebook" className="h-5" />
            </button>
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center border rounded-full hover:bg-gray-100"
            >
              <img src={googleIcon} alt="Google" className="h-5" />
            </button>
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center border rounded-full hover:bg-gray-100"
            >
              <img src={appleIcon} alt="Apple" className="h-5" />
            </button>
          </div>

          <div className="w-full border-t mb-6"></div>

          <input
            type="email"
            list="pastEmails"
            placeholder="Your email address"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3"
          />
          <datalist id="pastEmails">
            {pastEmails.map((mail, i) => (
              <option key={i} value={mail} />
            ))}
          </datalist>

          {message && <p className="text-sm text-gray-600 mb-3">{message}</p>}

          <button
            type="submit"
            disabled={!canSignIn && !canSignUp}
            className={`w-full py-3 rounded-full font-medium ${
              canSignIn || canSignUp
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {canSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
      )}

      {step === "signup" && (
        <form
          onSubmit={handleSignupSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            placeholder="Your name"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3"
          />
          <input
            type="text"
            placeholder="First name"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3"
          />
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3"
          />
          <select
            value={profil}
            onChange={(e) => setProfil(e.target.value)}
            className="w-full p-3 rounded-full bg-gray-100 border border-gray-200 mb-3"
          >
            <option value="student">Student</option>
            <option value="enseignant">Teacher</option>
            <option value="autre">Other</option>
          </select>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
