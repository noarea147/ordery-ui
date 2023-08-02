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
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";

export default function Home() {
  const [showCoffees, setShowCoffees] = useState(false);
  const [showSmoothies, setShowSmoothies] = useState(false);
  const [showJuices, setShowJuices] = useState(false);
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (pressed) => {
    switch (pressed) {
      case "coffee":
        setShowCoffees(!showCoffees);
        setShowSmoothies(false);
        setShowJuices(false);
        break;
      case "smoothie":
        setShowSmoothies(!showSmoothies);
        setShowCoffees(false);
        setShowJuices(false);
        break;
      case "juice":
        setShowJuices(!showJuices);
        setShowCoffees(false);
        setShowSmoothies(false);
        break;
      default:
        setShowCoffees(false);
        setShowSmoothies(false);
        setShowJuices(false);
        break;
    }
  };

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
          {/* modal start code */}

          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}>
            Open regular modal
          </button>
          {showModal ? (
            <>
              <div
              data-aos="fade-up"
              data-ease-in="ease-in-out"
              data-aos-duration="500"

              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Modal Title</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}>
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        I always felt like I could do anything. That’s the main
                        thing people are controlled by! Thoughts- their
                        perception of themselves! They're slowed down by their
                        perception of themselves. If you're taught you can’t do
                        anything, you won’t do anything. I was taught I could do
                        everything.
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}>
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          {/* modal end code */}
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div
            onClick={() => handleChange("coffee")}
            className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
            style={{ backgroundColor: "#ef9336" }}>
            <h3 className="font-bold text-left text-2xl text-white">
              {showCoffees ? (
                <RemoveCircleOutlineRoundedIcon />
              ) : (
                <AddCircleOutlineRoundedIcon />
              )}{" "}
              Coffee
            </h3>
            <CoffeeOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
          </div>
          {showCoffees && (
            <div
              className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
              style={{
                backgroundColor: "#ef9336",
                marginTop: "-10px",
                zIndex: -1,
              }}
              data-aos="fade-down"
              data-aos-duration="300">
              {data.map((drink) => (
                <div className="flex flex-col items-center  justify-start w-full">
                  <div className="flex flex-row items-center justify-between w-full pr-6 pl-6 pt-3 pb-3">
                    <h4 className="text-xl  text-left text-white">
                      {drink.name}
                    </h4>
                    <p className="text-lg text-right text-white">
                      {drink.price}
                    </p>
                    <ShoppingCartOutlinedIcon
                      style={{ color: "white", fontSize: "30px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div
            onClick={() => handleChange("smoothie")}
            className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
            style={{ backgroundColor: "#ef9336" }}>
            <h3 className="font-bold text-left text-2xl text-white">
              {showSmoothies ? (
                <RemoveCircleOutlineRoundedIcon />
              ) : (
                <AddCircleOutlineRoundedIcon />
              )}{" "}
              {"Smoothies"}
            </h3>
            <LocalBarOutlinedIcon
              style={{ color: "white", fontSize: "42px" }}
            />
          </div>
          {showSmoothies && (
            <div
              className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
              style={{
                backgroundColor: "#ef9336",
                marginTop: "-10px",
                zIndex: -1,
              }}
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
        <div
          className="flex flex-col items-center justify-center w-full p-2"
          style={{ marginBottom: "74px" }}>
          <div
            onClick={() => handleChange("juice")}
            className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
            style={{ backgroundColor: "#ef9336" }}>
            <h3 className="font-bold text-left text-2xl text-white">
              {showJuices ? (
                <RemoveCircleOutlineRoundedIcon />
              ) : (
                <AddCircleOutlineRoundedIcon />
              )}{" "}
              {"Juices"}
            </h3>
            <WineBarOutlinedIcon style={{ color: "white", fontSize: "42px" }} />
          </div>
          {showJuices && (
            <div
              className="flex flex-col items-center justify-start w-full pt-3 rounded-b-xl"
              style={{
                backgroundColor: "#ef9336",
                marginTop: "-10px",
                zIndex: -1,
              }}
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
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}>
            <BottomNavigationAction
              className="shadow-xl"
              style={{
                borderRadius: "60px",
                backgroundColor: "white",
                color: "#ef9336",
              }}
              icon={<LocalMallOutlinedIcon style={{ fontSize: "42px" }} />}
            />
          </BottomNavigation>
        </Box>
      </center>
    </div>
  );
}
