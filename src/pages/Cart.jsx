import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../components/CartItem";
import { ArrowRight, ShoppingBag, Receipt, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } }
};

const Cart = () => {
  const { cartItems, calculateSubtotal, placeOrder, tableNumber } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("/order");
  };

  const subtotal = calculateSubtotal();
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;

  if (cartItems.length === 0) {
    return (
      <motion.div {...pageVariants} className="flex flex-col items-center justify-center min-h-[85vh] bg-[#FAFAFA] px-4">
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-gray-100 mb-8"
        >
          <ShoppingBag size={64} className="text-gray-200" strokeWidth={1.5} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your cart is empty</h2>
          <p className="text-gray-500 max-w-xs mx-auto font-medium">Looks like you haven't added anything yet. Browse the menu to get started!</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link
            to="/menu"
            className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-[20px] font-bold shadow-xl shadow-gray-900/20 transition-all flex items-center gap-3 text-lg hover:gap-4"
          >
            Browse Menu <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div {...pageVariants} className="pb-40 min-h-screen bg-[#FAFAFA]">
      {/* Desktop: Side-by-side layout */}
      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">Your Order</h2>
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="bg-primary/10 text-primary px-4 py-1.5 rounded-[14px] font-bold text-sm border border-primary/15"
          >
            Table {tableNumber || "01"}
          </motion.div>
        </motion.div>
        
        <div className="flex flex-col  gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, i) => (
                <CartItem key={item.cartItemId} item={item} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Bill Summary - Sticky on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:sticky lg:top-24 lg:self-start"
          >
            <div className="bg-white p-6 lg:p-7 rounded-[28px] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)]">
              <h3 className="font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100 flex items-center gap-2.5 text-lg">
                <div className="bg-primary/10 p-1.5 rounded-lg"><Receipt size={18} className="text-primary" /></div>
                Bill Summary
              </h3>
              <div className="space-y-4 text-[15px]">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Item Total</span>
                  <span className="font-bold text-gray-800 tabular-nums">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>GST (5%)</span>
                  <span className="font-bold text-gray-800 tabular-nums">₹{gst.toFixed(2)}</span>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-50 border border-green-100 p-3.5 rounded-[16px] flex items-center gap-3"
                >
                  <div className="bg-green-100 p-1.5 rounded-full flex-shrink-0"><Sparkles size={16} className="text-green-600" /></div>
                  <div>
                    <p className="text-xs font-bold text-green-800">Free delivery applied</p>
                    <p className="text-[10px] text-green-600 font-medium">You saved ₹40 on this order!</p>
                  </div>
                </motion.div>

                <div className="border-t border-dashed border-gray-200 pt-5 flex justify-between items-end mt-4">
                  <div>
                    <span className="font-black text-gray-900 text-lg block">Grand Total</span>
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide">(Incl. of all taxes)</span>
                  </div>
                  <motion.span 
                    key={grandTotal}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="font-black text-primary text-3xl tabular-nums"
                  >
                    ₹{grandTotal.toFixed(2)}
                  </motion.span>
                </div>
              </div>

              {/* Desktop Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                className="hidden lg:flex w-full mt-6 bg-primary hover:bg-primary-hover text-white py-4 min-h-[60px] rounded-[20px] font-bold shadow-[0_10px_30px_-10px_rgba(255,107,0,0.5)] transition-all items-center justify-between px-6 text-[16px]"
              >
                <span className="font-black tracking-tight">Confirm Order</span>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-[14px] text-[14px] border border-white/20 font-mono">
                  ₹{grandTotal.toFixed(2)}
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-only checkout footer */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] z-40"
      >
        <div className="max-w-lg mx-auto">
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary hover:bg-primary-hover text-white py-4 min-h-[60px] rounded-[20px] font-bold shadow-[0_10px_30px_-10px_rgba(255,107,0,0.5)] transition-all flex items-center justify-between px-6 text-[17px]"
          >
            <span className="font-black tracking-tight">Confirm Order</span>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-[14px] text-[14px] border border-white/20 font-mono">
              ₹{grandTotal.toFixed(2)}
            </div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
