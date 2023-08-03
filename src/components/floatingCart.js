import React, { useEffect, useState } from "react";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/CartContext";

export default function FloatingCart() {
  const { cartState } = useCart();
  const { products } = cartState;
  const [items, setItems] = useState(0);
  useEffect(() => {
    setItems(products.length);
  }, [products]);
  return (
    <center
      style={{
        borderRadius: "60px",
        position: "fixed", // Use 'fixed' instead of 'absolut'
        bottom: 0, // Stick it to the bottom of the screen
        width: "100%", // Full width
        backgroundColor: "transparent",
      }}>
      <IconButton
        aria-label="cart"
        style={{
          margin: "10px",
          width: "60px",
          backgroundColor: "white",
        }}>
        <Badge
          badgeContent={items}
          // style={{ color: "#fff", }}
          color="secondary">
          <LocalMallOutlinedIcon
            style={{ fontSize: "42px", color: "#ef9336" }}
          />
        </Badge>
      </IconButton>
    </center>
  );
}
