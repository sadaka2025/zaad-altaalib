import React from "react";
import LoginPage from "../pages/LoginPage";

export default function LoginModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "80vw",
          maxWidth: "600px",
          height: "80vh",
          padding: "20px",
          borderRadius: "8px",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Bouton fermer (optionnel, désactivé tant que pas connecté) */}
        {/* <button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          X
        </button> */}

        <LoginPage />
      </div>
    </div>
  );
}
