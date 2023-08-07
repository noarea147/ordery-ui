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
  const { cartDispatch } = useCart();

  useEffect(() => {
    const getMenus = async () => {
      const response = await getBusinessByUsername({
        username: params.username,
      });
      if (response.data.StatusCode === 200) {
        setBusiness(response.data.Data);
      }
    };
    getMenus();
    console.log(business);
  }, []);

  const data = [
    {
      _id: "64c7bfd29b39e0928005ccfe",
      Menuname: "my 1 menu",
      description: "my 1 menu description",
      products: [
        {
          name: "expresso",
          description: "coffee description",
          prices: [
            {
              size: "standard",
              price: 55.55,
            },
          ],
        },
        {
          name: "cappuccino",
          description: "description",
          prices: [
            {
              size: "standard",
              price: 7,
            },
          ],
        },
        {
          name: "maricana",
          description: "my 1 menu description",
          prices: [
            {
              size: "standard",
              price: 9,
            },
          ],
        },
        {
          name: "latte",
          description: "my 1 menu description",
          prices: [
            {
              size: "standard",
              price: 9,
            },
          ],
        },
        {
          name: "americano",
          description: "my 1 menu description",
          prices: [
            {
              size: "standard",
              price: 9,
            },
          ],
        },
      ],
      category: "coffee",
    },
    {
      _id: "64c7bfd29b39e0928005ccfe",
      Menuname: "my 1 menu",
      description: "my 1 menu description",
      products: [
        {
          name: "cold ice smoothie",
          description: "coffee description",
          prices: [
            {
              size: "standard",
              price: 15,
            },
          ],
        },
        {
          name: "beach smoothie",
          description: "description",
          prices: [
            {
              size: "standard",
              price: 17,
            },
          ],
        },
        {
          name: "red hot smoothie",
          description: "my 1 menu description",
          prices: [
            {
              size: "standard",
              price: 19,
            },
          ],
        },
      ],
      category: "smoothie",
    },
    {
      _id: "64c7bfd29b39e0928005ccfe",
      Menuname: "my 1 menu",
      description: "my 1 menu description",
      products: [
        {
          name: "expresso",
          description: "coffee description",
          prices: [
            {
              size: "standard",
              price: 5,
            },
          ],
        },
        {
          name: "cappuccino",
          description: "description",
          prices: [
            {
              size: "standard",
              price: 7,
            },
          ],
        },
        {
          name: "maricana",
          description: "my 1 menu description",
          prices: [
            {
              size: "standard",
              price: 9,
            },
          ],
        },
      ],
      category: "juice",
    },
  ];
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
      <Modal />
    </div>
  );
}
