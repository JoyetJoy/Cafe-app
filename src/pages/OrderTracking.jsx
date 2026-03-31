import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, ChefHat, Check, Receipt, Package } from "lucide-react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
};

const OrderTracking = () => {
  const { cartItems, orderId, tableNumber, calculateSubtotal } = useCart();
  const [status, setStatus] = useState("Pending");
  const [progress, setProgress] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) { navigate("/menu"); return; }

    const timer1 = setTimeout(() => { setStatus("Preparing"); setProgress(50); }, 4000);
    const timer2 = setTimeout(() => { setStatus("Ready"); setProgress(100); }, 10000);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [orderId, navigate]);

  const subtotal = calculateSubtotal();
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;

  if (!orderId) return null;

  const steps = [
    { name: "Pending", icon: Clock, label: "Order Received", desc: "Your order has been received and is being confirmed." },
    { name: "Preparing", icon: ChefHat, label: "Preparing", desc: "Our chef is preparing your delicious meal." },
    { name: "Ready", icon: CheckCircle2, label: "Ready to Serve", desc: "Your food is ready! It will be served shortly." }
  ];

  const statusIndex = steps.findIndex(s => s.name === status);

  return (
    <motion.div {...pageVariants} className="min-h-screen bg-[#FAFAFA] pb-12">
      <div className="p-4 lg:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left - Status */}
          <div className="flex-1 space-y-6">
            {/* Header Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 lg:p-8 rounded-[28px] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] text-center relative overflow-hidden"
            >
              {/* Success animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, delay: 0.3 }}
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/30"
              >
                <Check size={36} className="text-white" strokeWidth={3} />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-black text-gray-900 tracking-tight mb-1"
              >
                Order Placed!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 font-medium"
              >
                Table {tableNumber || "T-01"}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-5 inline-flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100"
              >
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Order ID</span>
                <span className="font-mono font-bold text-gray-800 text-lg">{orderId}</span>
              </motion.div>
            </motion.div>

            {/* Tracking Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 lg:p-8 rounded-[28px] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden"
            >
              {/* Progress bar at top */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "5%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
                />
              </div>

              <h3 className="font-bold text-gray-900 mb-8 mt-2 flex items-center gap-2.5 text-lg">
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="bg-primary/10 p-1.5 rounded-lg"
                >
                  <Package size={18} className="text-primary" />
                </motion.div>
                Live Tracking
              </h3>
              
              <div className="space-y-1">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isPast = idx <= statusIndex;
                  const isActive = idx === statusIndex;
                  const isLast = idx === steps.length - 1;

                  return (
                    <div key={idx}>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.15 }}
                        className="flex items-start gap-5"
                      >
                        {/* Icon + Line */}
                        <div className="flex flex-col items-center">
                          <motion.div 
                            animate={isActive ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 rgba(255,107,0,0)", "0 0 0 12px rgba(255,107,0,0.15)", "0 0 0 0 rgba(255,107,0,0)"] } : {}}
                            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 flex-shrink-0 ${
                              isPast 
                                ? "bg-gradient-to-br from-primary to-orange-500 border-primary text-white shadow-lg shadow-primary/20" 
                                : "bg-gray-50 border-gray-200 text-gray-300"
                            }`}
                          >
                            <Icon size={22} />
                          </motion.div>
                          {!isLast && (
                            <div className="w-0.5 h-10 bg-gray-100 my-1.5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: isPast && idx < statusIndex ? "100%" : "0%" }}
                                transition={{ duration: 0.8, delay: 0.8 + idx * 0.3 }}
                                className="w-full bg-primary rounded-full"
                              />
                            </div>
                          )}
                        </div>

                        {/* Text */}
                        <div className="pt-2">
                          <h4 className={`font-bold text-lg transition-colors duration-500 ${isPast ? "text-gray-900" : "text-gray-300"}`}>
                            {step.label}
                          </h4>
                          <p className={`text-sm mt-0.5 transition-colors duration-500 ${isActive ? "text-primary font-medium" : isPast ? "text-gray-500" : "text-gray-300"}`}>
                            {isActive ? step.desc : isPast ? "Completed ✓" : "Waiting..."}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:w-[380px] lg:sticky lg:top-24 lg:self-start space-y-6"
          >
            {/* Items summary */}
            <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)]">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                {cartItems.map((item, i) => {
                  const addonsTotal = item.selectedAddons.reduce((s, a) => s + (a.price || 0), 0);
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate">{item.quantity}x {item.name}</p>
                        {item.selectedAddons.length > 0 && (
                          <p className="text-[10px] text-gray-400 truncate">{item.selectedAddons.map(a => a.name).join(", ")}</p>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 text-sm tabular-nums">₹{((item.price + addonsTotal) * item.quantity)}</span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-primary text-2xl tabular-nums">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Bill Button */}
            {status === "Ready" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <Link
                  to="/bill"
                  className="w-full bg-gray-900 text-white hover:bg-black py-4.5 px-6 rounded-[20px] font-bold shadow-xl shadow-gray-900/20 transition-all flex items-center justify-center gap-3 text-lg hover:gap-4"
                >
                  <Receipt size={22} />
                  View Final Bill
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderTracking;
