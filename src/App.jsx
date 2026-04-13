import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Providers
import { CartProvider } from "./context/CartContext";
import QueryProvider from "./providers/QueryProvider";

// Router
import { router } from "./routes/AppRoutes";

import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      {/* Global Toaster that serves both sides */}
      <Toaster 
        position="top-center"
        toastOptions={{
          className: "z-50",
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
      <CartProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </CartProvider>
    </>
  );
}

export default App;
