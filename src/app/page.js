"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Image from "next/image";
import Head from "next/head";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import WineBarOutlinedIcon from "@mui/icons-material/WineBarOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

export default function Home() {
  const [showCoffees, setShowCoffees] = useState(false);
  const [showSmoothies, setShowSmoothies] = useState(false);
  const [showJuices, setShowJuices] = useState(false);
  const [value, setValue] = React.useState(0);

  const data = [
    { name: "Espresso", price: 2.0 },
    { name: "Americano", price: 2.5 },
    { name: "Cappuccino", price: 3.0 },
    { name: "Latte", price: 3.0 },
    { name: "Mocha", price: 3.5 },
  ];
  return (
    <div>
      <main
        className="flex min-h-screen flex-col items-center justify-start"
        data-aos="fade-up"
        data-aos-duration="500">
        <Head>
          <title>Coffee name</title>
          <meta charset="UTF-8"></meta>
          <meta name="description" content="Coffee description" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <div className="flex flex-col items-center justify-center w-full mt-10 mb-10">
          <Image
            src="/next.svg"
            alt="Coffee Logo"
            className="dark:invert mb-4"
            width={100}
            height={100}
            priority
          />
          <h1
            className="text-3xl font-bold text-center"
            data-aos="fade-down"
            data-aos-duration="1000">
            Welcome to {"Coffee name"}
          </h1>
        </div>
        <div className="flex flex-col justify-start w-full">
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">
            {"Menu"}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div
            onClick={() => setShowCoffees(!showCoffees)}
            className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
            style={{ backgroundColor: "#ef9336" }}>
            <h3 className="font-bold text-left text-2xl text-white">
              {"Coffee"}
            </h3>
            <CoffeeOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
          </div>
          {showCoffees && (
            <div
              className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
              style={{ backgroundColor: "#ef9336", marginTop: "-10px" }}
              data-aos="fade-down"
              data-aos-duration="300">
              {data.map((drink) => (
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-row items-center justify-between w-full pr-6 pl-6 pt-3 pb-3">
                    <h4 className="text-lg  text-center text-white">
                      {drink.name}
                    </h4>
                    <p className="text-lg text-center text-white">
                      {drink.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div
            onClick={() => setShowSmoothies(!showSmoothies)}
            className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
            style={{ backgroundColor: "#ef9336" }}>
            <h3 className="font-bold text-left text-2xl text-white">
              {"Smoothies"}
            </h3>
            <LocalBarOutlinedIcon
              style={{ color: "white", fontSize: "42px" }}
            />
          </div>
          {showSmoothies && (
            <div
              className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
              style={{ backgroundColor: "#ef9336", marginTop: "-10px" }}
              data-aos="fade-down"
              data-aos-duration="300">
              {data.map((drink) => (
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-row items-center justify-between w-full pr-6 pl-6 pt-3 pb-3">
                    <h4 className="text-lg  text-center text-white">
                      {drink.name}
                    </h4>
                    <p className="text-lg text-center text-white">
                      {drink.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div
            onClick={() => setShowJuices(!showJuices)}
            className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
            style={{ backgroundColor: "#ef9336" }}>
            <h3 className="font-bold text-left text-2xl text-white">
              {"Juices"}
            </h3>
            <WineBarOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
          </div>
          {showJuices && (
            <div
              className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
              style={{ backgroundColor: "#ef9336", marginTop: "-10px" }}
              data-aos="fade-down"
              data-aos-duration="300">
              {data.map((drink) => (
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex flex-row items-center justify-between w-full pr-6 pl-6 pt-3 pb-3">
                    <h4 className="text-lg  text-center text-white">
                      {drink.name}
                    </h4>
                    <p className="text-lg text-center text-white">
                      {drink.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Box
        sx={{
          width: "100%",
          position: "fixed", // Use 'fixed' instead of 'absolut'
          bottom: 0, // Stick it to the bottom of the screen
        }}>
        <BottomNavigation
          style={{
            backgroundColor: "transparent",
            margin: "10px",

          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction
          className="shadow-xl"
            style={{
              width: "calc(100% - 10px)",
              borderRadius: "60px",
              backgroundColor: "white",
              color: "#ef9336",
            }}
            icon={<LocalMallOutlinedIcon style={{ fontSize: "42px" }} />}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}
