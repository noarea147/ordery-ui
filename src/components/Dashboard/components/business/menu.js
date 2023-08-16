import React, { useState } from "react";
import AddProducts from "./addProducts";
import { useMenuContext } from "../../../../context/MenuContext";

export default function Menu(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { addProduct, deleteMenu } = useMenuContext();
  const [addProductsModal, setAddProductsModal] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleAddProduct = async (data) => {
    const response = await addProduct(data);
    if (response.data?.StatusCode === 201) {
      props.addProductToMenu(response.data.Data, data);
      setIsSuccess(data.menuId);
    } else {
      setIsSuccess("");
      setError(response.data?.Message);
    }
    setUpdated(!updated);
  };
  const deleteMenuHandler = async (menuId) => {
    const response = await deleteMenu({
      menuId: menuId,
      businessId: props.id,
    });
    if (response.data?.StatusCode === 200) {
      props.deleteProductFromMenu(menuId);
    }
  };

  const Success = (menuId) => {
    setIsSuccess(menuId);
  };
  const AddProductsModalHandler = () => {
    setAddProductsModal(!addProductsModal);
  };
  return (
    <ul role="list">
      <li>
        <center>
          <h2 className="text-2xl font-semibold leading-6 text-gray-900 p-6">
            Votre menu
          </h2>
        </center>
      </li>
      {props.business?.menus?.length !== 0 ? (
        <>
          {props.business?.menus?.map((menu) => (
            <div
              key={menu._id}
              className="shadow-xl p-6 rounded-xl bg-gray-200 m-3 w-full">
              <li
                className="flex justify-between items-center flex-col sm:flex-row sm:items-end"
                style={{ cursor: "pointer" }}>
                <div className="flex min-w-0 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {menu.menuName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {menu.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {menu.category}
                  </p>
                </div>
                <div className="flex flex-col sm:flex sm:flex-col sm:items-end items-center">
                  <p className="text-sm leading-6 text-gray-900">
                    Produits dans ce menu : {menu.products?.length}
                  </p>
                  <span
                    className="text-sm leading-6 text-indigo-900"
                    onClick={() => AddProductsModalHandler()}>
                    Ajouter des produits
                  </span>
                  <span
                    className="text-sm leading-6 text-indigo-900"
                    onClick={() => props.isCreatingHandler("edit", menu)}>
                    Modifer ce rubrique
                  </span>
                  <span
                    className="text-sm leading-6 text-indigo-900"
                    onClick={() => deleteMenuHandler(menu._id)}>
                    supprimer ce rubrique
                  </span>
                </div>
              </li>

              {addProductsModal && (
                <AddProducts
                  isSuccess={isSuccess}
                  Success={Success}
                  products={menu.products}
                  menuId={menu._id}
                  handleAddProduct={handleAddProduct}
                  AddProductsModalHandler={AddProductsModalHandler}
                  updated={updated}
                />
              )}
            </div>
          ))}
          <li>
            <div className="flex flex-col justify-center items-center py-5 p-6 m-4 ">
              <button
                onClick={() => props.isCreatingHandler()}
                type="submit"
                className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Ajoutez des rubriques à votre menu
              </button>
            </div>
          </li>
        </>
      ) : (
        <li>
          <div className="flex flex-col justify-center items-center py-5 p-6 m-4 ">
            <center>
              <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                Vous n'avez encore aucun rubrique dans votre menu
              </h2>
            </center>
            <button
              onClick={() => props.isCreatingHandler()}
              type="submit"
              className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Ajoutez un rubrique
            </button>
          </div>
        </li>
      )}
    </ul>
  );
}
