import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import addToCard from "../animations/addToCard.json";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export default function AddToCard(props) {
  const addToCardAnimation = useRef();
  const [animateIcon, setAnimateIcon] = useState(false);

  const startAnimation = () => {
    let cartProducts = localStorage.getItem("cartProducts");
    if (cartProducts) {
      cartProducts = JSON.parse(cartProducts);
      if (Array.isArray(cartProducts)) {
        cartProducts = [...cartProducts, props.productData];
      } else {
        cartProducts = [cartProducts, props.productData];
      }
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
      localStorage.setItem("cartProducts", JSON.stringify([props.productData]));
    }
    
    console.log(cartProducts);
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
          onClick={() => startAnimation()}
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
