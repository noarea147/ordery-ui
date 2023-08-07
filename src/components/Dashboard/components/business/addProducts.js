import React, { useState } from "react";

export default function AddProducts(props) {
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center py-2 ">
      <button
        onClick={() => setIsEditingProduct(!isEditingProduct)}
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Add / Edit products
      </button>
      {isEditingProduct && props?.products.length === 0 ? (
        <div>
          <h1 className="text-2xl font-bold text-center">No Products</h1>
          <button className="flex m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Product
          </button>
        </div>
      ) : null}
    </div>
  );
}
