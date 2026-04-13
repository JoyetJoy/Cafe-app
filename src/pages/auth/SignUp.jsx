import React, { useState } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { basicRequest, USER_REGISTER } from "@/api";
import ErrorPopup from "@/components/popups/common/ErrorPopup";
import toast from "react-hot-toast";

// ✅ Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Password must be 8+ chars, include uppercase, lowercase, number & special character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

export default function SignupPage() {
  const { darkMode } = useThemeStore();
  const [loader, setLoader] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = {
      name: data?.username,
      email: data?.email,
      code: data?.code,
      password: data?.password,
      c_password:data?.confirmPassword
    };

    console.log("--------------------------");
    try {
      setLoader(true);
      const res = await basicRequest.post(USER_REGISTER, formData);
      if (res?.data?.success) {
        setLoader(false);
        toast.success(res?.data?.message);
        reset();
        navigate("/otp");
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      setErrormsg(error?.response?.data?.data || "Something went wrong");
      setErrorPopup(true);
    }
  };

  // 🔥 Theme system (unchanged)
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
    <div className={`flex h-screen ${theme.layout} p-4 xl:p-6 gap-4`}>
      <ErrorPopup
        popupOpen={errorPopup}
        setPopupOpen={setErrorPopup}
        setError={setErrormsg}
        error={errormsg}
      />
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-5 sm:px-26 lg:px:30 xl:px-36 pt-5">
        <div className="mb-8 text-2xl font-bold">
          <span className="text-blue-600">Dreams</span> POS
        </div>

        <h2 className="text-3xl font-semibold mb-2">Sign Up</h2>
        <p className={`${theme.textSecondary} mb-6 text-sm`}>
          And lets get started with your free trial
        </p>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-semibold">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username")}
              className={`w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              className={`w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-semibold">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-black hover:text-gray-700"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500 ${theme.input}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>
            <span className="text-blue-600 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Sign Up
          </button>

          <p
            className={`${theme.textSecondary} flex items-center justify-center text-sm`}
          >
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1">
              Sign In
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE (unchanged) */}
      <div
        className={`w-1/2 bg-blue-600 rounded-lg hidden lg:flex flex-col justify-center items-center relative ${theme.hero}`}
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
