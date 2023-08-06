"use client";
import React, { useState } from "react";
import Image from "next/image";
import Menu from "../components/menu";
import FloatingCart from "@/components/floatingCart";
import Modal from "@/components/modal";
import { useMenuContext } from "@/context/MenuContext";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { getBusinessMenu } = useMenuContext();
  const { cartDispatch } = useCart();

  // const getMenus = async () => {
  //   const response = await getBusinessMenu({
  //     menuId: "64cae9bd9647ab96277288d4",
  //   });
  //   console.log(response);
  // };
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
  // getMenus();
  return (
    <div>
      <div className="flex justify-end p-4 w-full">
        <img
          class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <main
        className="flex min-h-screen flex-col items-center justify-start"
        data-aos="fade-up"
        data-aos-duration="500">
        <div class="flex -space-x-2 overflow-hidden"></div>
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
        {data.map((menu, index) =>
          index + 1 === data.length ? (
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
