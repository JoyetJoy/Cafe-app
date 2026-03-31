import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export const FoodCard = ({ item, onAddClick, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60 flex flex-col group cursor-pointer relative mt-10 pb-3 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-shadow duration-300"
      onClick={() => onAddClick(item)}
    >
      {/* Floating circular image */}
      <div className="relative w-full px-4 transform -translate-y-10 flex justify-center">
        <motion.div 
          whileHover={{ rotate: 3, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-[0_12px_30px_-8px_rgba(0,0,0,0.25)] border-[4px] border-white z-10 bg-gray-100"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        </motion.div>
      </div>
      
      <div className="px-4 -mt-6 flex-1 flex flex-col items-center text-center">
        <motion.span 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-[10px] font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-[0.15em] mb-2.5 inline-block border border-primary/10"
        >
          {item.category}
        </motion.span>
        <h3 className="font-bold text-gray-900 leading-tight mb-1.5 text-[15px] lg:text-base group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-[11px] lg:text-xs text-gray-400 mb-4 line-clamp-2 px-1 font-medium">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between px-4 mt-auto pt-3 border-t border-gray-50">
        <span className="text-base font-black text-gray-900 tabular-nums">₹{item.price}</span>
        
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddClick(item);
          }}
          className="flex items-center justify-center bg-gray-900 group-hover:bg-primary text-white transition-all duration-300 rounded-full h-10 w-10 shadow-lg shadow-gray-900/15 group-hover:shadow-primary/30"
        >
          <Plus size={18} strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
};
