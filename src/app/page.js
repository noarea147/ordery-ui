"use client";
import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Menu from "../components/menu";
import Cart from "@/components/cart";


export default function Home() {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      _id: "64c7bfd29b39e0928005ccfe",
      MenuName: "my 1 menu",
      description: "my 1 menu description",
      products: [
        {
          Name: "expresso",
          description: "coffee description",
          prices: [
            {
              size: "standard",
              price: 5,
            },
          ],
        },
        {
          Name: "cappuccino",
          description: "description",
          prices: [
            {
              size: "standard",
              price: 7,
            },
          ],
        },
        {
          Name: "maricana",
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
      MenuName: "my 1 menu",
      description: "my 1 menu description",
      products: [
        {
          Name: "expresso",
          description: "coffee description",
          prices: [
            {
              size: "standard",
              price: 5,
            },
          ],
        },
        {
          Name: "cappuccino",
          description: "description",
          prices: [
            {
              size: "standard",
              price: 7,
            },
          ],
        },
        {
          Name: "maricana",
          description: "my 1 menu description",
          prices: [
            {
              size: "standard",
              price: 9,
            },
          ],
        },
      ],
      category: "smoothie",
    },
    {
      _id: "64c7bfd29b39e0928005ccfe",
      MenuName: "my 1 menu",
      description: "my 1 menu description",
      products: [
        {
          Name: "expresso",
          description: "coffee description",
          prices: [
            {
              size: "standard",
              price: 5,
            },
          ],
        },
        {
          Name: "cappuccino",
          description: "description",
          prices: [
            {
              size: "standard",
              price: 7,
            },
          ],
        },
        {
          Name: "maricana",
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
      <Cart />
    </div>
  );
}
