import React, { useState } from "react";

import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useCart } from "../context/CartContext";

export default function Menu(props) {
  const [show, setShow] = useState(false);
  const { cartDispatch } = useCart();

  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleRemoveFromCart = () => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  };

  const iconComponent = (name) => {
    switch (name) {
      case "coffee":
        return (
          <CoffeeOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
        );
      case "smoothie":
        return (
          <LocalBarOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
        );
      case "juice":
        return (
          <WineBarOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
        );
      default:
        return <></>;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full p-2"
      style={{ marginBottom: !show && props.margin }}>
      <div
        onClick={() => setShow(!show)}
        className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
        style={{ backgroundColor: "#ef9336" }}>
        <h3 className="font-bold text-left text-2xl text-white">
          {show ? (
            <RemoveCircleOutlineRoundedIcon />
          ) : (
            <AddCircleOutlineRoundedIcon />
          )}{" "}
          {props.name}
        </h3>
        {iconComponent(props?.name)}
      </div>
      {show && (
        <div
          className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
          style={{
            backgroundColor: "#ef9336",
            marginTop: "-10px",
            marginBottom: props.margin,
          }}
          data-aos="fade-down"
          data-aos-duration="300">
          {props.data.map((drink, index) => (
            <div
              className="flex flex-col items-center  justify-start w-full"
              key={index}>
              <div className="flex flex-row items-center justify-between w-full pr-6 pl-6 pt-3 pb-3">
                <h4 className="text-xl  text-left text-white">{drink.name}</h4>
                {drink.prices?.length >= 1 &&
                  drink.prices.map((variable, index) => (
                    <p key={index} className="text-lg text-right text-white">
                      {variable.price} dt
                    </p>
                  ))}

                <AddCircleOutlinedIcon
                  data-aos="fade-in"
                  data-aos-duration="1000"
                  data-aos-mirror="true"
                  data-aos-easing="ease-in-out"
                  onClick={() => handleAddToCart(drink)}
                  style={{
                    color: "white",
                    fontSize: "25px",
                    zIndex: 20,
                    cursor: "pointer", // Add this style to allow click through
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
