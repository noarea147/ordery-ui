import React, { useEffect, useState } from "react";

export default function Modal(props) {
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);
  let cartProducts = localStorage.getItem("cartProducts");
  cartProducts = JSON.parse(cartProducts);
  useEffect(() => {
    const orderTotal = () => {
      let total = 0;
      cartProducts?.map((product) => {
        total += product.prices[0].price;
      });
      console.log(total);
      setTotal(total);
    };
    orderTotal();
    setShowModal(props.show);
  }, [props.show]);

  return (
    <>
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
                  <h3 className="text-3xl font-semibold">order summary</h3>
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
                  <p className="my-4 text-slate-500 text-lg leading-relaxed ">
                    <div className="flex flex-row justify-between items-center">
                      <p>product</p>
                      <p>size</p>
                      <p>price</p>
                    </div>
                    {cartProducts?.map((product, index) => (
                      <div
                        key={index}
                        className="aos-all
                      
                      flex flex-row justify-between items-center
                      
                      ">
                        <p>{product.Name}</p>
                        <p>{product.prices[0].size}</p>
                        <p>{product.prices[0].price} dt</p>
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
