import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CafeLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`cafe-theme font-sans antialiased mx-auto min-h-screen relative ${
      isHome 
        ? "max-w-full" 
        : "max-w-lg lg:max-w-xl bg-white shadow-2xl shadow-black/10"
    }`}>
      {!isHome && <Navbar />}
      <Outlet />
    </div>
  );
}
