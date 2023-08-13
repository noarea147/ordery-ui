import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import logginAnimation from "@/animations/orderPlaced.json";
import { useMenuContext } from "../../../../context/MenuContext";

export default function AddProducts(props) {
  const { getMenuProducts } = useMenuContext();
  const [products, setProducts] = useState([]);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productName, setProductName] = useState();
  const [productPrices, setProductPrices] = useState([]);
  const [productDescription, setProductDescription] = useState();

  useEffect(() => {
    const handleGetProducts = async () => {
      const response = await getMenuProducts({ menuId: props.menuId });
      if (response.data.StatusCode === 200) {
        setProducts(response.data.Data.products);
      }
    };
    handleGetProducts();
  }, [props.updated]);

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...productPrices];
    updatedPrices[index] = { ...updatedPrices[index], price: value };
    setProductPrices(updatedPrices);
  };

  const handleVariantChange = (index, value) => {
    const updatedPrices = [...productPrices];
    updatedPrices[index] = { ...updatedPrices[index], variant: value };
    setProductPrices(updatedPrices);
  };
  const handleAddProduct = () => {
    props.handleAddProduct({
      menuId: props.menuId,
      name: productName,
      prices: productPrices,
      description: productDescription,
    });
    setProductName("");
    setProductPrices([]);
    setProductDescription("");
    setIsEditingProduct(false);
  };
  

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white w-[80%] max-w-3xl p-6 rounded-md shadow-lg overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsEditingProduct(!isEditingProduct)}
            className={
              isEditingProduct
                ? "flex justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-red-500 mb-2"
                : "flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }>
            {isEditingProduct ? "Cancel Editing" : "Add product"}
          </button>
          <button
            onClick={() => props.AddProductsModalHandler(false)}
            className={
              "flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }>
            {"Back"}
          </button>
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          {isEditingProduct ? (
            <div className="w-full">
              <div className="flex flex-col justify-center items-center w-full">
                <label className="text-lg font-bold mx-2">Product Name</label>
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  className="border-2 border-gray-300 rounded-md p-2 m-2 w-full"
                  type="text"
                  placeholder="Product Name"
                />
                <label className="text-lg font-bold mx-2">Product Prices</label>
                <div className="flex flex-col justify-center items-center w-full">
                  {productPrices.map((priceItem, index) => (
                    <div key={index} className="flex gap-2  w-full my-2">
                      <input
                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                        type="text"
                        placeholder="Product Price"
                        value={priceItem.price || ""}
                        onChange={(e) =>
                          handlePriceChange(index, e.target.value)
                        }
                      />
                      <input
                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                        type="text"
                        placeholder="Variant ex: pizza mini"
                        value={priceItem.variant || ""}
                        onChange={(e) =>
                          handleVariantChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setProductPrices([
                        ...productPrices,
                        { price: "", variant: "" },
                      ])
                    }
                    className="flex justify-center rounded-md bg-cyan-400 px-3 py-1.5 my-2 text-sm leading-6 text-white shadow-sm ">
                    {productPrices.length >= 1
                      ? "Add More Prices"
                      : "Add Price"}
                  </button>
                </div>
                <label className="text-lg font-bold mx-2">
                  Product Description
                </label>
                <textarea
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="border-2 border-gray-300 rounded-md p-2 m-2 w-full"
                  type="text"
                  placeholder="Product Description"
                />
                <button
                  onClick={() => handleAddProduct()}
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Add Product
                </button>
              </div>
            </div>
          ) : (
            props.isSuccess === props.menuId && (
              <center>
                <Lottie
                  animationData={logginAnimation}
                  loop={false}
                  style={{ width: "150px", height: "150px" }}
                />
                <h3 className="text-md text-center">
                  Your heading has being created successfully
                </h3>
                <span
                  className="m-3 text-sm "
                  style={{ cursor: "pointer" }}
                  onClick={() => props.Success(false)}>
                  Done
                </span>
              </center>
            )
          )}
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <div className="flex flex-col justify-center items-center py-2 w-full">
            <h1 className="text-2xl font-semibold">Vos Produits</h1>
          </div>

          <div className="flex flex-col justify-center items-center py-2 w-full">
            {products?.map((product, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-md my-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">
                    Product Name :{product.name}
                  </h2>
                </div>
                <div className="mb-2">
                  <h3 className="text-md font-semibold">Product Prices:</h3>
                  <ul>
                    {product.prices.map((priceItem, priceIndex) => (
                      <li key={priceIndex} className="flex gap-2 mt-1">
                        <p>Price: {priceItem.price} dt </p>
                        <p>Variant: {priceItem.variant}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-md font-semibold">
                    Product Description: {product.description}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
