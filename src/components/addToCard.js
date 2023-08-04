import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import addToCard from "../animations/addToCard.json";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useCart } from "../context/CartContext";

export default function AddToCard(props) {
  const { cartDispatch } = useCart();
  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleRemoveFromCart = () => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  };

  const startAnimation = (product) => {
    handleAddToCart(product);
    setAnimateIcon(!animateIcon);
    setTimeout(() => {
      setAnimateIcon(false);
    }, 2000);
  };

  return (
    <div>
     


    </div>
  );
}
