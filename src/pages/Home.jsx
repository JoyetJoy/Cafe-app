import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Camera, ScanLine, ArrowRight, Smartphone, Wifi, Zap, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

const Home = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [tableInput, setTableInput] = useState("");

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const table = tableInput || Math.floor(Math.random() * 20 + 1);
      navigate("/menu?table=" + table);
    }, 2000);
  };

  const features = [
    { icon: Smartphone, title: "Scan & Order", desc: "Point your camera at the QR code" },
    { icon: Zap, title: "Instant Menu", desc: "Browse the full menu in seconds" },
    { icon: Wifi, title: "Live Tracking", desc: "Track your order in real-time" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div 
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[100px]" 
      />

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 py-12 lg:py-0 relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Left Section - Text & Features */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
            <div className="bg-primary/15 border border-primary/20 backdrop-blur-md p-2.5 rounded-2xl">
              <UtensilsCrossed size={24} className="text-primary" />
            </div>
            <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Gourmet QR</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-5">
            Order food{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-400 animate-gradient-x">
              seamlessly
            </span>
          </motion.h1>
          
          <motion.p {...fadeUp(0.2)} className="text-gray-400 text-lg lg:text-xl font-medium mb-10 max-w-md leading-relaxed">
            Scan the QR code on your table. Browse the menu, customize your order, and track it live.
          </motion.p>

          {/* Features */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start w-full">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 flex-1 min-w-[180px]"
              >
                <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
                  <f.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{f.title}</p>
                  <p className="text-gray-500 text-xs font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Table Input */}
          <motion.div {...fadeUp(0.4)} className="w-full max-w-sm">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 focus-within:border-primary/40 transition-colors backdrop-blur-md">
                <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-0.5">Table Number</label>
                <input
                  type="number"
                  placeholder="Auto-assign"
                  value={tableInput}
                  onChange={(e) => setTableInput(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-white text-lg font-bold placeholder:text-gray-600"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSimulateScan}
              disabled={isScanning}
              className={`w-full py-4.5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg transition-all relative overflow-hidden ${
                isScanning 
                  ? "bg-primary/60 text-white cursor-not-allowed" 
                  : "bg-primary text-white hover:bg-primary-hover shadow-[0_10px_40px_-10px_rgba(255,107,0,0.5)]"
              }`}
            >
              {isScanning && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              {isScanning ? (
                <><ScanLine className="animate-pulse" size={24} /> Scanning Table...</>
              ) : (
                <>Simulate QR Scan <ArrowRight size={20} /></>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Right Section - Interactive QR Scanner */}
        <motion.div {...fadeUp(0.3)} className="flex-shrink-0">
          <div className="relative">
            {/* Outer glow ring */}
            <div className={`absolute -inset-6 rounded-[40px] ${isScanning ? 'animate-pulse-glow' : ''}`} />

            {/* Scanner Frame */}
            <motion.div 
              animate={isScanning ? { rotate: [0, 1, -1, 0] } : {}}
              transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Animated Corner Brackets */}
              {[
                "top-0 left-0 border-t-4 border-l-4 rounded-tl-3xl",
                "top-0 right-0 border-t-4 border-r-4 rounded-tr-3xl",
                "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-3xl",
                "bottom-0 right-0 border-b-4 border-r-4 rounded-br-3xl"
              ].map((cls, i) => (
                <motion.div
                  key={i}
                  animate={isScanning 
                    ? { borderColor: ["#FF6B00", "#FFA94D", "#FF6B00"] }
                    : { borderColor: "#FF6B00" }
                  }
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className={`absolute w-16 h-16 ${cls} border-primary`}
                />
              ))}

              {/* Scanner Content */}
              <div className="absolute inset-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden group">
                {/* QR Code display */}
                <motion.div 
                  animate={{ scale: isScanning ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 1.5, repeat: isScanning ? Infinity : 0 }}
                  className="relative"
                >
                  <QrCode size={80} className="text-white/20" strokeWidth={1} />
                  {!isScanning && (
                    <motion.div 
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Camera size={32} className="text-white/40" />
                    </motion.div>
                  )}
                </motion.div>

                <p className="text-white/30 text-xs font-medium mt-4 uppercase tracking-widest">
                  {isScanning ? "Reading QR..." : "Point camera here"}
                </p>

                {/* Animated Scan Line */}
                {isScanning && (
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "90%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-4 right-4 h-[3px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_30px_10px_rgba(255,107,0,0.4)]"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.p {...fadeUp(0.5)} className="text-gray-600 text-xs text-center pb-8 px-4 relative z-10">
        This is a prototype demo. In production, your device camera would scan a physical QR code on the table.
      </motion.p>
    </div>
  );
};

export default Home;
