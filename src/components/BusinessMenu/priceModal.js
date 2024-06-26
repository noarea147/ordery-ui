"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function PriceModal() {
  const { cartDispatch, cartState } = useCart();
  const { pricesModal, targetProduct } = cartState;

  const handleProductPrice = (price) => {
    const currentProduct = targetProduct;
    currentProduct.prices = price;
    cartDispatch({
      type: "ADD_TO_CART",
      payload: currentProduct,
    });
  };
  const dissmissModal = () => {
    cartDispatch({
      type: "TOGGLE_PRICES_MODAL",
    });
  };

  // useEffect(() => {
  //   const getProducts = () => {
  //     let products = [];
  //     for (let key in props.data) {
  //       products = [...products, ...props.data[key].products];
  //     }
  //     products;
  //     products = products.filter(
  //       (product) => product._id === targetProduct._id
  //     );
  //     setCurrentProduct(products);
  //   };
  //   targetProduct && getProducts();
  // }, []);

  return !pricesModal ? null : (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-[#ef9336]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ef9336"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div> */}

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-base font-semibold leading-6 text-gray-900 text-center"
                  id="modal-title">
                  Choose a variant {targetProduct?.name}
                </h3>
                <div className="mt-2 flex flex-col">
                  {targetProduct?.prices?.map((price, key) => (
                    <button
                      key={key}
                      onClick={() =>
                        handleProductPrice([
                          {
                            variant: price.variant,
                            price: price.price,
                          },
                        ])
                      }
                      className=" m-4 justify-center rounded-md bg-[#2f4a77] px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      {price.variant} : {price.price} dt
                    </button>
                  ))}
                  <div className="flex justify-center">
                    <span
                      onClick={() => dissmissModal()}
                      className="text-sm text-gray-500 cursor-pointer">
                      Back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
