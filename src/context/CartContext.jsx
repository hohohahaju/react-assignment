import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        localStorage.removeItem("cart"); // wipe corrupted data
      }
    }
  }, []);

  // Always sync localStorage when cart changes — including when it becomes empty.
  // Bug fix: the old code had `if (cart.length > 0)` which meant clearing the cart
  // never removed the old items from localStorage, so they'd reappear on next page load.
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Add item, or increment quantity if it already exists in the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove a single item row from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear all items from cart and localStorage
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Update the quantity of a specific item (minimum 1)
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};