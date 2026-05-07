import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";

// Cafe Pages
import CafeLayout from "../layout/CafeLayout";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import OrderTracking from "../pages/OrderTracking";
import Bill from "../pages/Bill";

// Webapp Pages
import DashboardLayout from "@/layout/DashboardLayout";
import { restaurentRoutes } from "./restaurent/restaurent.routes";
import UsersPage from "../pages/users/UsersPage";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Otp from "../pages/auth/Otp";
import ResetPassword from "../pages/auth/ResetPassword";
import StorePOS from "@/pages/restaurent/pos/StorePOS";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-b-3 border-gray-900"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CafeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <OrderTracking /> },
      { path: "/bill", element: <Bill /> },
    ]
  },
  {
    path: "/store",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardLayout />
      </Suspense>
    ),
    children: restaurentRoutes,
  },
  { path: "/store/pos", element: <StorePOS /> },
  {
    path: "/store/signup",
    element: <SignUp />,
  },
  {
    path: "/store/login",
    element: <SignIn />,
  },
  {
    path: "/store/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/store/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/store/otp",
    element: <Otp />,
  },
]);