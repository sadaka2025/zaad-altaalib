import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  // Liste des chemins où la Navbar doit être masquée (optionnel)
  const hideNavbar = ["/fr", "/ar"];

  const shouldHideNavbar = hideNavbar.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
