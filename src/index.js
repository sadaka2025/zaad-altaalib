import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n"; // On charge la config i18n AVANT tout le reste

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
