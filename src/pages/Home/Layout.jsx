import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

export default function LayoutConfigurable() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const location = useLocation();

  // ✅ مسارات تُخفي الـNavbar فقط
  const hideNavbarRoutes = [
    "/niveau-debutant/semester1/fiqh",
    // Ajoutez d'autres chemins ici si nécessaire
  ];

  // ✅ مسارات تُخفي الـFooter فقط
  const hideFooterRoutes = [
    "/niveau-debutant/semester1/fiqh",
    // Ajoutez d'autres chemins ici si nécessaire
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.includes(route)
  );

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="flex flex-col min-h-screen bg-white text-gray-800"
    >
      {!shouldHideNavbar && <Navbar />}

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}
