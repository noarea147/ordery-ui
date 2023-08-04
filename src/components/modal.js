import React, { useEffect, useState, useRef } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCart } from "../context/CartContext";
import Lottie from "lottie-react";
import emptyCart from "../animations/emptyCart.json";
import orderPlaced from "../animations/orderPlaced.json";

export default function Modal(props) {
  // const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(false);
  const [orderStatus, setOrderStatus] = useState("shopping");
  const [cartProducts, setcartProducts] = useState([]);
  const { cartDispatch, cartState } = useCart();
  const { products, cart } = cartState;

  useEffect(() => {
    let cartProducts = localStorage.getItem("cartProducts");
    cartProducts = JSON.parse(cartProducts);
    const orderTotal = () => {
      let total = 0;
      cartProducts?.map((product) => {
        total += product.prices[0].price;
      });
      setTotal(total);
    };
    function removeDuplicatesAndGetCounts(arr) {
      const counts = arr?.reduce((acc, curr) => {
        const name = curr.name;
        const price = curr.prices[0].price;
        acc[name] = acc[name] || { name, count: 0, price };
        acc[name].count++;
        return acc;
      }, {});

      const uniqueElements = Object.keys(counts);
      const countPerElement = uniqueElements.map((element) => ({
        product: counts[element],
      }));
      setcartProducts(countPerElement);
      return countPerElement;
    }
    orderTotal();
    cartProducts && removeDuplicatesAndGetCounts(cartProducts);
    // setShowModal(cart);
  }, [cart, update]);
  const handleRemoveFromCart = (name) => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const indexToRemove = cartProducts.findIndex(
      (product) => product.name === name
    );
    if (indexToRemove !== -1) {
      cartProducts.splice(indexToRemove, 1); // Remove the element at the index
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      setUpdate(!update);
      cartDispatch({ type: "REMOVE_FROM_CART" });
    }
  };

  return (
    <>
      {cart ? (
        <>
          <div
            data-aos="fade-up"
            data-ease-in="ease-in-out"
            data-aos-duration="500"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4 rounded-xl">
            <div className="relative w-full my-6 mx-auto max-w-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {orderStatus === "placed" ? (
                  <div className="justify-center items-center flex-row">
                    <div className="relative p-6 flex-auto">
                      <div className="flex-col items-center justify-center pt-5 rounded-t w-full">
                        <div className="flex items-center justify-center">
                          <Lottie
                            animationData={orderPlaced}
                            loop={false}
                            style={{ width: "200px", height: "200px" }}
                          />
                          <br />
                        </div>
                        <div className="flex items-center justify-center">
                          <h3 className="text-3xl font-semibold">
                            your order has been placed
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : orderPlaced === "error" ? (
                  <div className="justify-center items-center flex-row">
                    <div className="relative p-6 flex-auto">
                      <div className="flex-col items-center justify-center pt-5 rounded-t w-full">
                        <div className="flex items-center justify-center">
                          <Lottie
                            animationData={orderPlaced}
                            loop={false}
                            style={{ width: "200px", height: "200px" }}
                          />
                          <br />
                        </div>
                        <div className="flex items-center justify-center">
                          <h3 className="text-3xl font-semibold">
                            error while placing your order
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {products.length === 0 ? (
                  <div className="justify-center items-center flex-row">
                    <div className="relative p-6 flex-auto">
                      <div className="flex-col items-center justify-center pt-5 rounded-t w-full">
                        <div className="flex items-center justify-center">
                          <Lottie
                            style={{ width: "150px", height: "150px" }}
                            animationData={emptyCart}
                            loop={false}
                          />
                          <br />
                        </div>
                        <div className="flex items-center justify-center">
                          <h3 className="text-3xl font-semibold">
                            your cart is empty
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-6 flex-auto">
                    <div className="flex items-start justify-between pt-5  rounded-t ">
                      <h3 className="text-3xl font-semibold">order summary</h3>
                    </div>
                    <div className="my-4 text-slate-500 text-lg leading-relaxed ">
                      <div className="flex flex-row justify-between items-center">
                        <p>product</p>
                        <p>Qte</p>
                        <p>price</p>
                        <p>-</p>
                      </div>
                      {cartProducts?.map((product, index) => (
                        <div
                          key={index}
                          className="aos-all
                      
                      flex flex-row justify-between items-center
                      
                      ">
                          <p className="flex flex-col">
                            {product.product.name}{" "}
                            <small style={{ marginTop: "0px" }}>standard</small>
                          </p>
                          <p>{product.product.count}</p>
                          <p>
                            {product.product.price * product.product.count} dt
                          </p>
                          <p
                            onClick={() =>
                              handleRemoveFromCart(product.product.name)
                            }>
                            <RemoveCircleIcon />
                          </p>
                        </div>
                      ))}
                      <div className="flex flex-row justify-between items-center mt-5">
                        <p>total : {total} dt</p>
                        <p></p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => cartDispatch({ type: "TOGGLE_CART" })}>
                    Go Back
                  </button>
                  {products.length !== 0 && (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button">
                      place order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
