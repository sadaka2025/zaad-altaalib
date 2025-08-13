import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./i18n"; // ✅ Import i18n ici
import "./app.css"; // ✅ ou tailwind.css
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async"; // ✅

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    {" "}
    {/* ✅ Fournit le contexte Helmet */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </HelmetProvider>
);
