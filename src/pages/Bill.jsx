import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Download, LogOut, Star } from "lucide-react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const Bill = () => {
  const { cartItems, calculateSubtotal, tableNumber, orderId, clearCart, setOrderId } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId || cartItems.length === 0) navigate("/menu");
  }, [orderId, cartItems, navigate]);

  const subtotal = calculateSubtotal();
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;
  const dateStr = new Date().toLocaleString("en-US", {
    weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"
  });

  const handleDone = () => {
    clearCart();
    setOrderId(null);
    navigate("/");
  };

  if (!orderId || cartItems.length === 0) return null;

  return (
    <motion.div {...pageVariants} className="min-h-screen bg-[#FAFAFA] flex flex-col items-start justify-center py-8 lg:py-12 px-4 lg:px-8 gap-8 max-w-5xl mx-auto">
      {/* Invoice Card */}
      <motion.div
        initial={{ y: 40, opacity: 0, rotateX: 5 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md lg:max-w-lg bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] border border-gray-100 mx-auto lg:mx-0"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-orange-500 to-orange-400 p-8 text-center text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute bottom-[-30px] left-[-20px] w-40 h-40 bg-white/5 rounded-full" />
          
          <motion.div 
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, delay: 0.3 }}
            className="bg-white/20 w-18 h-18 p-4 rounded-3xl mx-auto flex items-center justify-center backdrop-blur-md mb-5 shadow-inner border border-white/20"
          >
            <UtensilsCrossed size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black tracking-tight mb-1"
          >
            Gourmet QR
          </motion.h1>
          <p className="text-white/70 font-medium text-sm mb-6">Premium Dining Experience</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center text-left bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md"
          >
            <div>
              <p className="text-[10px] uppercase font-bold text-white/60 tracking-[0.15em]">Table No.</p>
              <p className="font-mono text-2xl font-black">{tableNumber || "01"}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-white/60 tracking-[0.15em]">Order ID</p>
              <p className="font-mono text-sm font-bold">{orderId}</p>
            </div>
          </motion.div>
        </div>

        {/* Date */}
        <div className="px-6 py-3 text-center border-b border-dashed border-gray-200 bg-gray-50/50">
          <p className="text-xs text-gray-400 font-medium tracking-wide">{dateStr}</p>
        </div>

        {/* Items */}
        <div className="p-6 lg:p-7 space-y-4 max-h-[45vh] overflow-y-auto no-scrollbar">
          {cartItems.map((item, index) => {
            const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
            const itemTotal = (item.price + addonsTotal) * item.quantity;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                className="flex justify-between items-start border-b border-gray-50 pb-3.5 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="font-bold text-gray-800 flex items-start gap-2.5">
                    <span className="text-xs mt-0.5 font-bold text-white bg-gray-900 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">{item.quantity}</span>
                    <span className="leading-tight">{item.name}</span>
                  </p>
                  {item.selectedAddons.length > 0 && (
                    <div className="ml-8 mt-1.5 flex flex-wrap gap-1">
                      {item.selectedAddons.map(a => (
                        <span key={a.id} className="text-[10px] text-primary/70 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full font-medium">+{a.name}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-bold text-gray-800 pl-4 whitespace-nowrap tabular-nums">₹{itemTotal.toFixed(2)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Totals */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 lg:p-7 bg-gray-50/70 border-t border-dashed border-gray-200 space-y-3"
        >
          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-700 tabular-nums">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>GST (5%)</span>
            <span className="text-gray-700 tabular-nums">₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-5 border-t border-gray-200 mt-2">
            <span className="text-xl font-black text-gray-900">Total Paid</span>
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, delay: 1 }}
              className="text-4xl font-black text-primary tabular-nums"
            >
              ₹{grandTotal.toFixed(2)}
            </motion.span>
          </div>
        </motion.div>

        {/* Thanks */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="p-6 text-center space-y-1"
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 + i * 0.1 }}>
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>
          <p className="font-black text-gray-800 text-lg">Thank you for dining with us!</p>
          <p className="text-xs text-gray-400 font-medium">We hope you enjoyed your meal. Please visit again.</p>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full  gap-4 flex flex-col mx-auto lg:mx-0 lg:sticky lg:top-24"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDone}
          className="w-full py-4.5 bg-gray-900 text-white rounded-[20px] font-bold flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-xl shadow-gray-900/20 text-lg"
        >
          <LogOut size={20} /> Checkout & Leave
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-[20px] font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Download size={20} /> Download Invoice
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Bill;
