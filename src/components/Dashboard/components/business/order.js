import React, { useState } from "react";

export default function Order(props) {
  const [showOrderProducts, setShowOrderProducts] = useState(false);

  const showOrderProductsHandler = (orderId) => {
    if (showOrderProducts === orderId) {
      setShowOrderProducts("");
      return;
    }
    setShowOrderProducts(orderId);
  };
  return (
    <ul className="mb-10">
      <li>
        <center>
          <h2 className="text-2xl font-semibold leading-6 text-gray-900 p-6">
            Vos commandes
          </h2>
        </center>
      </li>
      {props.orders?.length === 0 && (
        <li>
          <center>
            <h2 className="text-2xl font-semibold leading-6 text-gray-900">
              You don't have any orders yet
            </h2>
          </center>
        </li>
      )}
      <ul>
        <ul>
          {props.orders?.map((order, index) => (
            <li
              key={order._id}
              className={`py-5 shadow-xl p-6 rounded-xl bg-gray-200 m-4 ${
                index + 1 === props.orders.length ? "mb-16" : ""
              }`}>
              <div
                className="flex flex-row justify-around items-center"
                style={{ cursor: "pointer" }}>
                <p className="text-sm leading-6 text-gray-900">
                  {`numéro de table : ${order.tableNumber}`}
                </p>

                <p className="text-sm leading-6 text-gray-900">
                  Somme : {`${order.total} dt`}
                </p>
                <span
                  className="text-sm leading-6 text-indigo-900 cursor-pointer"
                  onClick={() => showOrderProductsHandler(order._id)}>
                  {showOrderProducts === order._id ? "Masquer" : "Afficher"} la
                  commande
                </span>
                <button
                  type="submit"
                  className="flex w-auto m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Confirmer la commande
                </button>
              </div>
              {showOrderProducts === order._id && (
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between items-center gap-x-6 bg-gray-200 p-4 rounded-xl">
                    <p className="text-sm font-semibold leading-6 text-green-600">
                      Nom du produit
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Prix
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Variant
                    </p>
                  </div>
                  {order.products?.map((product) => (
                    <div
                      key={product._id}
                      className="flex justify-between items-center gap-x-6 bg-gray-200 p-4 rounded-xl">
                      <p className="text-sm font-semibold leading-6 text-green-600">
                        {product.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {product.prices[0].price + " dt"}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {product.prices[0].variant}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </ul>
    </ul>
  );
}
