// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Ensure item.price is a number
    const price = Number(item.price);
    if (!isNaN(price)) {
      setCart((prevCart) => {
        // Check if the item already exists in the cart
        const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          // If item exists, increase its quantity
          return prevCart.map(cartItem =>
            cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
          );
        } else {
          // If item doesn't exist, add it to the cart with quantity 1
          return [...prevCart, { ...item, price, quantity: 1 }];
        }
      });
    } else {
      console.error("Invalid price:", item.price);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            // If quantity > 1, decrease the quantity
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          }
          // If quantity is 1, don't add it to the updatedCart (effectively removing it)
          return acc;
        }
        return [...acc, item];
      }, []);

      return updatedCart;
    });
  };

  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
