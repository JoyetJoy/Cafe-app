import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderTracking from "./pages/OrderTracking";
import Bill from "./pages/Bill";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderTracking />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppShell />
      </Router>
    </CartProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`font-sans antialiased mx-auto min-h-screen relative ${
      isHome 
        ? "max-w-full" 
        : "max-w-lg lg:max-w-xl bg-white shadow-2xl shadow-black/10"
    }`}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '16px',
            background: '#1A1A1A',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
          },
          iconTheme: {
            primary: '#FF6B00',
            secondary: '#fff',
          },
        }}
      />
      {!isHome && <Navbar />}
      <AnimatedRoutes />
    </div>
  );
}

export default App;
