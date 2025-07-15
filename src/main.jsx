import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./i18n"; // ✅ Import i18n ici
import "./app.css"; // ✅ ou tailwind.css
import "react-responsive-carousel/lib/styles/carousel.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
