import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import addToCard from "../animations/addToCard.json";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useCart } from "../context/CartContext";

export default function AddToCard(props) {
  const { cartDispatch } = useCart();
  const addToCardAnimation = useRef();
  const [animateIcon, setAnimateIcon] = useState(false);
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
      {animateIcon ? (
        <Lottie
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-easing="ease-in-out"
          animationData={addToCard}
          lottieRef={addToCardAnimation}
          loop={false}
          style={{
            width: "27px",
            height: "27px",
            cursor: "pointer",
            color: "white",
          }}
        />
      ) : (
        <AddCircleOutlinedIcon
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-mirror="true"
          data-aos-easing="ease-in-out"
          onClick={() => startAnimation(props.productData)}
          style={{
            color: "white",
            fontSize: "25px",
            zIndex: 20,
            cursor: "pointer", // Add this style to allow click through
          }}
        />
      )}
    </div>
  );
}
