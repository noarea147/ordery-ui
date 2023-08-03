import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

export default function Cart() {
  return (
    <center>
      <Box
        sx={{
          position: "fixed", // Use 'fixed' instead of 'absolut'
          bottom: 0, // Stick it to the bottom of the screen
          width: "100%", // Full width
        }}>
        <BottomNavigation
          style={{
            // backgroundColor: "transparent",
            margin: "10px",
            width: "60px",
            backgroundColor: "transparent", // Transparent background
          }}>
          <BottomNavigationAction
            className="shadow-xl"
            style={{
              borderRadius: "60px",
              backgroundColor: "white",
              color: "#ef9336",
            }}
            icon={
              <IconButton aria-label="cart">
                <Badge badgeContent={1} color="secondary">
                  <LocalMallOutlinedIcon
                    style={{ fontSize: "42px", color: "#ef9336" }}
                  />
                </Badge>
              </IconButton>
            }
          />
        </BottomNavigation>
      </Box>
    </center>
  );
}
