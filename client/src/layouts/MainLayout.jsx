import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import ScrollToTop from "../component/ScrollTop.jsx";
import useGlobalGsapEffects from "../hooks/useGlobalGsapEffects";

function MainLayout() {
  useGlobalGsapEffects();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default MainLayout;
