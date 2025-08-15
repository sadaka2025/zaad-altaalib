import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "5px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px" }}
      />
      <br />
      <button onClick={login} style={{ margin: "5px" }}>
        Se connecter
      </button>
      <button onClick={logout} style={{ margin: "5px" }}>
        Se déconnecter
      </button>
    </div>
  );
}
