"use client";
import React, { createContext, useContext, useReducer } from "react";

// Initial cart state
const initialCartState = {
  products: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
};

// Cart reducer to handle actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      localStorage.setItem(
        "cartProducts",
        JSON.stringify([...state.products, action.payload])
      );
      return { ...state, products: [...state.products, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        products: JSON.parse(localStorage.getItem("cartProducts")),
      };

    case "CLEAR_CART":
      return { ...state, products: [] };
    default:
      return state;
  }
};

// Create the cart context
const CartContext = createContext();

// Cart context provider component
export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
