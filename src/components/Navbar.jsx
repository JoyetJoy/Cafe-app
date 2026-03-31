import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, UtensilsCrossed, ChevronLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartItems, tableNumber } = useCart();
  const location = useLocation();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isMenu = location.pathname.includes("/menu");
  const isHome = location.pathname === "/";

  if (isHome) return null;

  return (
    <motion.nav 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/80"
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isMenu && (
            <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <Link to="/menu" className="p-2 -ml-2 text-gray-500 hover:text-primary transition-colors rounded-xl hover:bg-primary/5">
                <ChevronLeft size={24} />
              </Link>
            </motion.div>
          )}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-gradient-to-br from-primary to-orange-500 p-2 rounded-xl shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-shadow"
            >
              <UtensilsCrossed size={18} className="text-white" />
            </motion.div>
            <div>
              <h1 className="font-black text-lg leading-tight text-gray-900 tracking-tight">Gourmet QR</h1>
              {tableNumber && (
                <motion.p 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]"
                >
                  Table {tableNumber}
                </motion.p>
              )}
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" className="hidden lg:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors px-3 py-2 rounded-xl hover:bg-primary/5">
            <Home size={16} /> Home
          </Link>

          {isMenu && (
            <Link to="/cart" className="relative p-1.5 group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all"
              >
                <ShoppingCart size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
              </motion.div>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
