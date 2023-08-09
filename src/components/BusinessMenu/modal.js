import React, { useEffect, useState, useRef } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCart } from "../../context/CartContext";
import Lottie from "lottie-react";
import emptyCart from "@/animations/emptyCart.json";
import orderPlaced from "@/animations/orderPlaced.json";
import { useBusinessContext } from "@/context/BusinessContext";

export default function Modal(props) {
  const { placeOrder } = useBusinessContext();
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
        total += parseFloat(product.prices[0].price);
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

  const handlePlaceOrder = async () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const order = {
      products: cartProducts,
      total: total,
      tableNumber: props.tableNumber,
      businessId: props.businessId,
    };
    const response = await placeOrder(order);
    if (response.data.StatusCode === 201) {
      setOrderStatus("placed");
      setTimeout(() => {
        localStorage.removeItem("cartProducts");
        cartDispatch({ type: "CLEAR_CART" });
        setOrderStatus("shopping");
      }, 3000);
    } else {
      setOrderStatus("error");
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
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none m-4">
            <div className="relative w-full max-w-full mx-auto my-6 bg-white shadow-lg rounded-xl p-6 h-[56vh] overflow-y-auto">
              {/* <div className="border-0   relative flex flex-col w-full bg-white outline-none focus:outline-none "> */}
              {orderStatus === "placed" ? (
                <div className="justify-center items-center flex-row">
                  <div className="relative p-6 flex-auto">
                    <div className="flex-col items-center justify-center pt-5 rounded-t w-full">
                      <div className="flex flex-col items-center justify-center">
                        <Lottie
                          animationData={orderPlaced}
                          loop={false}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <center>
                          <h3 className="text-3xl font-semibold">
                            your order has been placed
                          </h3>
                        </center>
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
                orderStatus === "placed" ? null : (
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
                )
              ) : orderStatus === "placed" ? null : (
                <div className="relative p-6 flex-auto ">
                  <div className="flex items-start justify-between pt-5 rounded-t">
                    <h3 className="text-3xl font-semibold text-[#e2974b]">
                      Order Summary
                    </h3>
                  </div>
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
                          <th className="py-2">Product</th>
                          <th className="py-2">Qty</th>
                          <th className="py-2">Price</th>
                          <th className="py-2">-</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts?.map((product, index) => (
                          <tr key={index} className="aos-all">
                            <td
                              className="flex flex-col py-2 "
                              style={{ wordBreak: "break-word" }}>
                              {product.product.name}{" "}
                              <small style={{ marginTop: "0px" }}>
                                standard
                              </small>
                            </td>
                            <td className="py-2">{product.product.count}</td>
                            <td className="py-2">
                              {product.product.price * product.product.count} dt
                            </td>
                            <td
                              className="py-2"
                              onClick={() =>
                                handleRemoveFromCart(product.product.name)
                              }>
                              <RemoveCircleIcon />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2" className="py-2">
                            Total:
                          </td>
                          <td colSpan="2" className="py-2">
                            {total} dt
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-end p-3 rounded-b">
                <button
                  className="text-gray-400 background-transparent px-6 py-2 t outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => cartDispatch({ type: "TOGGLE_CART" })}>
                  Go Back
                </button>
                {products.length !== 0 ? (
                  orderStatus === "placed" ? null : (
                    <button
                      onClick={handlePlaceOrder}
                      className="text-white bg-[#2f4a77]	 font-bold  px-6 py-3 rounded-xl shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button">
                      place order
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
