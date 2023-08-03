import React, { useEffect, useState } from "react";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

export default function Cart() {
  const [items, setItems] = useState(0);
  const Cart = localStorage.getItem("cartProducts");

  useEffect(() => {
    // Get the cart products from localStorage
    const currentCart = localStorage.getItem("cartProducts");
    // Parse the cart products and calculate the length
    const cartItemsCount = currentCart ? JSON.parse(currentCart).length : 0;
    // Update the state with the cart items count
    setItems(cartItemsCount);

    // Listen for changes in localStorage using the storage event
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === "cartProducts") {
        const updatedCart = event.newValue;
        const updatedItemsCount = updatedCart
          ? JSON.parse(updatedCart).length
          : 0;
        setItems(updatedItemsCount);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
        <Badge badgeContent={items} color="secondary">
          <LocalMallOutlinedIcon
            style={{ fontSize: "42px", color: "#ef9336" }}
          />
        </Badge>
      </IconButton>
    </center>
  );
}
