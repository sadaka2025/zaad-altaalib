import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./i18n"; // ✅ Configuration i18n
import "./app.css"; // ✅ ou tailwind.css
import "react-responsive-carousel/lib/styles/carousel.min.css"; // ✅ styles du carousel

import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async"; // ✅ gestion du head

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
