import { useState } from "react";
import { X, Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addonData } from "../data/menuData";

export const AddonModal = ({ isOpen, onClose, item, onAddToCart }) => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const toggleAddon = (addon) => {
    if (selectedAddons.find((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAdd = () => {
    onAddToCart(item, selectedAddons, quantity);
    setSelectedAddons([]);
    setQuantity(1);
    onClose();
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = (item.price + addonsTotal) * quantity;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-6 bg-[#0A0A0A]/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="bg-white w-full max-w-md lg:max-w-lg rounded-t-[36px] lg:rounded-[36px] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-56 lg:h-64 w-full bg-gray-900 overflow-hidden">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover opacity-85" 
              />
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                onClick={onClose}
                className="absolute top-5 right-5 bg-white/10 hover:bg-white/30 backdrop-blur-xl border border-white/20 rounded-full p-2.5 transition-all shadow-lg active:scale-90 z-10"
              >
                <X size={20} className="text-white" strokeWidth={3} />
              </motion.button>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/30 to-transparent" />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="absolute bottom-5 left-5 right-5"
              >
                <span className="text-[10px] font-bold text-primary bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-[0.15em] mb-3 inline-block border border-primary/30">
                  {item.category}
                </span>
                <h2 className="text-3xl font-black text-white leading-tight mb-1 tracking-tight">{item.name}</h2>
                <p className="text-primary text-xl font-black font-mono">₹{item.price}</p>
              </motion.div>
            </div>

            {/* Add-ons List */}
            <div className="p-5 lg:p-6 flex-1 overflow-y-auto no-scrollbar bg-white">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center justify-between text-[15px]">
                Customize your order
                <span className="text-[10px] font-bold text-white bg-gray-900 px-3 py-1.5 rounded-full uppercase tracking-[0.15em]">Optional</span>
              </h3>
              <div className="space-y-3">
                {addonData.map((addon, i) => {
                  const isSelected = selectedAddons.find((a) => a.id === addon.id);
                  return (
                    <motion.label
                      key={addon.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex items-center justify-between p-4 rounded-[18px] border-2 transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(255,107,0,0.1)]" 
                          : "border-gray-100 bg-white hover:border-gray-200/80"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div 
                          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                            isSelected ? "bg-primary border-primary shadow-md shadow-primary/30" : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check size={14} className="text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className={`font-bold text-[15px] transition-colors ${isSelected ? "text-gray-900" : "text-gray-600"}`}>{addon.name}</span>
                      </div>
                      <span className="text-sm font-black text-gray-900 tabular-nums">+₹{addon.price}</span>
                      <input type="checkbox" className="hidden" checked={!!isSelected} onChange={() => toggleAddon(addon)} />
                    </motion.label>
                  );
                })}
              </div>
            </div>

            {/* Footer controls */}
            <div className="p-5 lg:p-6 bg-white border-t border-gray-100 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.04)] z-10">
              <div className="flex items-center justify-between mb-5 bg-gray-50 p-2 rounded-full border border-gray-100/50">
                <span className="font-bold text-gray-400 pl-4 text-xs uppercase tracking-[0.15em]">Quantity</span>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-900 font-bold border border-gray-100 active:bg-gray-50"
                  >
                    −
                  </motion.button>
                  <motion.span 
                    key={quantity}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="w-4 text-center font-black text-xl text-gray-900"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-900 shadow-lg shadow-gray-900/20 flex items-center justify-center text-white font-bold"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 min-h-[60px] rounded-[22px] font-bold text-[17px] shadow-[0_10px_30px_-10px_rgba(255,107,0,0.5)] transition-all flex items-center justify-between px-6"
              >
                <span className="font-black tracking-tight flex items-center gap-2">
                  <ShoppingBag size={20} /> Add to Cart
                </span>
                <motion.div 
                  key={total}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-[14px] text-[15px] border border-white/15 font-mono font-black"
                >
                  ₹{total}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
