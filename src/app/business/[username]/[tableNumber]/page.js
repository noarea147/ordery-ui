"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "@/components/menu";
import FloatingCart from "@/components/floatingCart";
import Modal from "@/components/modal";
import { useBusinessContext } from "@/context/BusinessContext";
import { useCart } from "@/context/CartContext";

export default function Home({ params }) {
  const { getBusinessByUsername } = useBusinessContext();
  const [business, setBusiness] = useState([]);
  const [businessId, setBusinessId] = useState(); // params.username = [username
  const [tableNumber, setTableNumber] = useState();
  const { cartDispatch } = useCart();

  useEffect(() => {
    const getMenus = async () => {
      const response = await getBusinessByUsername({
        username: params.username,
      });
      if (response.data.StatusCode === 200) {
        setBusiness(response.data.Data);
        setBusinessId(response.data.Data._id);
        setTableNumber(params.tableNumber);
      }
    };
    getMenus();
  }, []);

  return (
    <div>
      <main
        className="flex min-h-screen flex-col items-center justify-start"
        data-aos="fade-up"
        data-aos-duration="500">
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
            Welcome to {business.businessName}
          </h1>
        </div>
        <div className="flex flex-col justify-start w-full">
          <h2 className="text-2xl font-bold text-center mt-10 mb-5">
            {"Menu"}
          </h2>
        </div>
        {business.menus?.map((menu, index) =>
          index + 1 === business.length ? (
            <Menu
              key={index}
              name={menu.category}
              data={menu.products}
              margin={"75px"}
            />
          ) : (
            <Menu
              key={index}
              name={menu.category}
              data={menu.products}
              margin={"0px"}
            />
          )
        )}
      </main>
      <footer
        className="flex flex-col items-center justify-center w-full h-24 border-t"
        onClick={() => cartDispatch({ type: "TOGGLE_CART" })}>
        <FloatingCart />
      </footer>
      <Modal tableNumber={tableNumber} businessId={businessId} />
    </div>
  );
}
