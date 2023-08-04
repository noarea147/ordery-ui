import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCart } from "../context/CartContext";

export default function Modal(props) {
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(false);

  const [products, setProducts] = useState([]);
  const { cartDispatch } = useCart();

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
        const name = curr.Name;
        const price = curr.prices[0].price;
        acc[name] = acc[name] || { name, count: 0, price }; // Initialize the object if not exists
        acc[name].count++; // Increment count
        return acc;
      }, {});

      const uniqueElements = Object.keys(counts);
      const countPerElement = uniqueElements.map((element) => ({
        product: counts[element],
      }));
      setProducts(countPerElement);
      return countPerElement;
    }
    orderTotal();
    setShowModal(props.show);
    cartProducts && removeDuplicatesAndGetCounts(cartProducts);
  }, [props.show, update]);
  console.log(products);
  const handleRemoveFromCart = (name) => {
    console.log("clicked");
    setUpdate(!update);
    cartDispatch({ type: "REMOVE_FROM_CART", payload: name });
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            data-aos="fade-up"
            data-ease-in="ease-in-out"
            data-aos-duration="500"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4 rounded-xl">
            <div className="relative w-full my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex items-start justify-between pt-5 border-b border-solid border-slate-200 rounded-t ">
                    <h3 className="text-3xl font-semibold">order summary</h3>
                  </div>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed ">
                    <div className="flex flex-row justify-between items-center">
                      <p>product</p>
                      <p>Qte</p>
                      <p>price</p>
                      <p>-</p>
                    </div>
                    {products?.map((product, index) => (
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
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    place order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
