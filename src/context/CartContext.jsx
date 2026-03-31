import { createContext, useContext, useState, useEffect } from "react";
import { addonData, menuData } from "../data/menuData";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // Initialize from sessionStorage to persist state minimally
  useEffect(() => {
    const savedTable = sessionStorage.getItem("tableNumber");
    if (savedTable) {
      setTableNumber(savedTable);
    }
    const savedCart = sessionStorage.getItem("cartItems");
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch(e) {}
    }
    const savedOrder = sessionStorage.getItem("orderId");
    if (savedOrder) {
      setOrderId(savedOrder);
    }
  }, []);

  // Update session storage whenever state changes
  useEffect(() => {
    if (tableNumber) sessionStorage.setItem("tableNumber", tableNumber);
  }, [tableNumber]);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (orderId) sessionStorage.setItem("orderId", orderId);
  }, [orderId]);

  const addToCart = (item, selectedAddons, quantity = 1) => {
    const addonIds = selectedAddons.map((a) => a.id).sort().join(',');
    const cartItemId = `${item.id}-${addonIds}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, selectedAddons, quantity, cartItemId }];
    });
  };

  const updateQuantity = (cartItemId, change) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.cartItemId === cartItemId) {
          const newQ = i.quantity + change;
          return { ...i, quantity: newQ > 0 ? newQ : 0 };
        }
        return i;
      }).filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = () => {
    const newOrderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    // Don't clear cart yet so the order page can show it if needed, or clear it and pass data.
    // For local state simulation, we let the cart exist until Bill is "Done"
    return newOrderId;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0) * item.quantity;
      return total + itemTotal + addonsTotal;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        tableNumber,
        setTableNumber,
        calculateSubtotal,
        orderId,
        placeOrder,
        setOrderId
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
