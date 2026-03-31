import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { menuData } from "../data/menuData";
import { FoodCard } from "../components/FoodCard";
import { AddonModal } from "../components/AddonModal";
import { ShoppingBag, ChevronRight, Search, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const Menu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTableNumber, cartItems, addToCart, tableNumber } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const table = searchParams.get("table");
    if (table) setTableNumber(table);
  }, [searchParams, setTableNumber]);

  const categories = ["All", ...new Set(menuData.map((item) => item.category))];
  
  const filteredMenu = menuData.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item, selectedAddons, quantity) => {
    addToCart(item, selectedAddons, quantity);
    toast.success(`${quantity}x ${item.name} added!`);
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, curr) => {
    const addonsTotal = curr.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
    return acc + (curr.price + addonsTotal) * curr.quantity;
  }, 0);

  return (
    <motion.div {...pageVariants} className="pb-32 min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <div className="relative pt-6 pb-24 lg:pb-28 px-4 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-[#1A1A1A] text-white rounded-b-[40px] lg:rounded-b-[60px] shadow-xl">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-yellow-500/15 blur-[100px] rounded-full" 
        />
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 pt-2 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400">
              {tableNumber ? `Table ${tableNumber}` : "Specials Menu"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-3">
            Delicious meals, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-400 animate-gradient-x">
              delivered fast
            </span>
          </h2>
          <p className="text-gray-400 text-base lg:text-lg font-medium mt-3 max-w-md">Explore our curated menu tailored just for you</p>
        </motion.div>
      </div>

      {/* Floating Search Bar */}
      <div className="px-4 lg:px-8 -mt-12 relative z-20 max-w-5xl mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl px-5 py-4 rounded-2xl border border-white/60 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.12)] flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all"
        >
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search for pizza, burger, drinks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-[15px] text-gray-800 placeholder:text-gray-400 font-medium" 
          />
          {searchQuery && (
            <motion.button 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              onClick={() => setSearchQuery("")}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={16} />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Categories */}
      <div className="sticky top-16 z-30 pt-5 pb-3 bg-[#FAFAFA]/90 backdrop-blur-lg">
        <div className="flex overflow-x-auto px-4 lg:px-8 gap-3 no-scrollbar pb-1 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-[1.05]"
                  : "bg-white text-gray-500 border border-gray-100 hover:border-gray-200 hover:text-gray-800 hover:shadow-sm"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-4 lg:px-8 mt-8 max-w-5xl mx-auto">
        {filteredMenu.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 font-medium text-lg">No items found matching "{searchQuery}"</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-14">
            {filteredMenu.map((item, i) => (
              <FoodCard key={item.id} item={item} onAddClick={handleAddClick} index={i} />
            ))}
          </div>
        )}
      </div>

      <AddonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Cart */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-40"
          >
            <motion.button
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/cart")}
              className="w-full bg-[#1A1A1A] hover:bg-black text-white py-4 px-6 rounded-[22px] flex items-center justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] group transition-all"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-primary/20 border border-primary/20 p-2.5 rounded-[14px]"
                >
                  <ShoppingBag size={20} className="text-primary" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">{cartCount} Item(s)</p>
                  <p className="font-black text-lg">₹{cartSubtotal}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold text-[15px] group-hover:gap-3 transition-all text-primary">
                View Cart <ChevronRight size={18} strokeWidth={3} />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Menu;
