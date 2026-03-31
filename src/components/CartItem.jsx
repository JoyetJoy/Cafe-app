import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export const CartItem = ({ item, index = 0 }) => {
  const { updateQuantity } = useCart();

  const handleDecrease = () => updateQuantity(item.cartItemId, -1);
  const handleIncrease = () => updateQuantity(item.cartItemId, 1);
  
  const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
  const itemTotal = (item.price + addonsTotal) * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, scale: 0.9 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white p-4 lg:p-5 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.04)] flex items-center gap-4 hover:border-primary/15 hover:shadow-[0_8px_30px_-10px_rgba(255,107,0,0.08)] transition-all duration-300 relative overflow-hidden group"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[50px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        whileHover={{ scale: 1.08, rotate: 3 }}
        className="w-20 h-20 lg:w-24 lg:h-24 rounded-[18px] overflow-hidden flex-shrink-0 border-[3px] border-white shadow-lg shadow-black/5"
      >
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </motion.div>
      
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h4 className="font-bold text-gray-900 text-[15px] lg:text-base leading-tight line-clamp-2">{item.name}</h4>
          <motion.span 
            key={itemTotal}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="font-black text-gray-900 bg-gray-50 px-2.5 py-1 rounded-xl text-sm border border-gray-100 tabular-nums flex-shrink-0"
          >
            ₹{itemTotal}
          </motion.span>
        </div>
        
        {item.selectedAddons.length > 0 && (
          <div className="flex flex-wrap gap-1. mb-2">
            {item.selectedAddons.map((addon) => (
              <span key={addon.id} className="text-[10px] text-primary/80 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full font-semibold">
                +{addon.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center mt-auto">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-1 rounded-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleDecrease}
              className="w-8 h-8 rounded-full bg-white text-gray-600 flex items-center justify-center border border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
            >
              {item.quantity > 1 ? <Minus size={14} strokeWidth={3} /> : <Trash2 size={14} />}
            </motion.button>
            <motion.span 
              key={item.quantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-sm font-black w-5 text-center text-gray-900"
            >
              {item.quantity}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleIncrease}
              className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-md shadow-gray-900/20 hover:bg-primary transition-colors"
            >
              <Plus size={14} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
