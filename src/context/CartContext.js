"use client";
import React, { createContext, useContext, useReducer } from "react";

// Initial cart state
const initialCartState = {
  products:
    typeof window !== "undefined" && localStorage.getItem("cartProducts")
      ? JSON.parse(localStorage.getItem("cartProducts"))
      : [],
  cart: false,
  pricesModal: false,
  targetProduct: {},
};

// Cart reducer to handle actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      localStorage.setItem(
        "cartProducts",
        JSON.stringify([...state.products, action.payload])
      );
      return {
        ...state,
        products: [...state.products, action.payload],
        pricesModal: false,
      };

    case "REMOVE_FROM_CART":
      return {
        products: JSON.parse(localStorage.getItem("cartProducts")),
        cart: true,
      };

    case "TOGGLE_CART":
      return { ...state, cart: !state.cart };

    case "TOGGLE_PRICES_MODAL":
      return {
        ...state,
        pricesModal: !state.pricesModal,
        targetProduct: action.payload,
      };

    case "CLEAR_CART":
      return { ...state, products: [], cart: false };

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
