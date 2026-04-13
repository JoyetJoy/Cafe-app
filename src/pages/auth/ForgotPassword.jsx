import React, { useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { darkMode, toggleTheme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Theme system (same pattern as dashboard)
  const theme = {
    layout: darkMode ? "bg-black text-white" : "bg-white text-gray-900",
    card: darkMode
      ? "bg-[#0F0F0F] border-gray-800"
      : "bg-white border-gray-200",
    input: darkMode
      ? "bg-black border-gray-700 text-white placeholder-gray-500"
      : "bg-white border-gray-300 text-gray-900",
    textSecondary: darkMode ? "text-gray-400" : "text-gray-500",
    hero: darkMode ? "text-gray-900" : "text-white",
  };

  return (
    <div className={`flex h-screen ${theme.layout} p-6 gap-4`}>
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center px-36 pt-5">

        {/* Logo */}
        <div className="mb-8 text-2xl font-bold">
          <span className="text-blue-600">Dreams</span> POS
        </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold mb-2">Forgot Password</h2>
        <p className={`${theme.textSecondary} mb-6 text-sm`}>
          Please enter your email address to receive a verification code
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            />
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
            Sent Email
          </button>

          {/* Divider */}
          <p
            className={`${theme.textSecondary}  flex items-center justify-center text-sm`}
          >
            Back to {" "}
            <Link to={'/login'} className="text-blue-600 cursor-pointer ml-1"> Sign In</Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`w-1/2 bg-blue-600 rounded-lg flex flex-col justify-center items-center relative ${theme.hero}`}
      >
        <div className="z-10 text-center px-10">
          <h2 className="text-3xl font-semibold mb-4 leading-snug">
            Complete Control of Your Cafe & Restaurant with Ease
          </h2>
          <p className="text-sm opacity-90 mb-10">
            From billing to inventory access everything you need in a single
            powerful dashboard, Analyze sales, track your best-selling dishes.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user"
            className="w-64 mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
