"use client";
import React, { useEffect, useState } from "react";
import { useMenuContext } from "../../../../context/MenuContext";
import { useBusinessContext } from "../../../../context/BusinessContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Lottie from "lottie-react";
import logginAnimation from "@/animations/orderPlaced.json";
import BusinessNotfound from "@/components/Dashboard/components/business/businessNotfound";
import BusinessHeading from "@/components/Dashboard/components/business/businessHeading";
import AddProducts from "@/components/Dashboard/components/business/addProducts";

export default function page({ params }) {
  const {
    getMyBusinessMenus,
    createMenu,
    addProduct,
    getMenuProducts,
    getMenuCategories,
    deleteMenu,
  } = useMenuContext();
  const { getMyBusinessOrders } = useBusinessContext();
  const [showOrderProducts, setShowOrderProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState();
  useEffect(() => {
    const getBusinessMenus = async () => {
      const response = await getMyBusinessMenus({ businessId: params.id });
      setBusiness(response.data?.Data);
      if (response.data?.StatusCode === 404) {
        setNotFound(true);
      }
    };
    const getBusinessOrders = async () => {
      try {
        const response = await getMyBusinessOrders({
          businessId: params.id,
        });

        if (response.data.StatusCode === 200) {
          setOrders(response.data.Data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      const response = await getMenuCategories();
      setCategories(response.data?.Data);
    };
    getBusinessOrders();
    getBusinessMenus();
    getCategories();
  }, [business]);

  const deleteMenuHandler = async (menuId) => {
    const response = await deleteMenu({
      menuId: menuId,
      businessId: params.id,
    });
    if (response.data?.StatusCode === 200) {
      business.menus = business.menus.filter((menu) => menu._id !== menuId);
      setBusiness(business);
    }
  };

  const addMenuHandler = async () => {
    setLoading(true);
    const response = await createMenu({
      businessId: params.id,
      menuName: menuName,
      description: menuDescription,
      category: menuCategory === "" ? categories[0].name : menuCategory,
    });
    if (response.data?.StatusCode === 201) {
      setMenuName("");
      setMenuDescription("");
      setMenuCategory("");
      setError("");
      business.menus.push(response.data?.Data);
      setBusiness(business);
      setTimeout(() => {
        setLoading(false);
        setIsCreating(false);
      }, 2000);
    } else {
      setError(response.data?.Message);
    }
  };
  const handleAddProduct = async (data) => {
    const response = await addProduct(data);
    if (response.data?.StatusCode === 201) {
      business.menus.map((menu) => {
        if (menu._id === data.menuId) {
          menu.products.push(response.data?.Data);
        }
      });
      setBusiness(business);
      setIsSuccess(data.menuId);
    } else {
      setIsSuccess("");
      setError(response.data?.Message);
    }
  };
  const getProductsHandler = async (menuId) => {
    const response = await getMenuProducts({ menuId: menuId });
    return response;
  };

  const Success = (menuId) => {
    setIsSuccess(menuId);
  };

  const showOrderProductsHandler = (orderId) => {
    if (showOrderProducts === orderId) {
      setShowOrderProducts("");
      return;
    }
    setShowOrderProducts(orderId);
  };
  return (
    <>
      <BusinessHeading business={business} />
      {notFound ? (
        <BusinessNotfound />
      ) : !isCreating ? (
        <>
          <ul className="mb-10">
            <li>
              <center>
                <h2 className="text-2xl font-semibold leading-6 text-gray-900 p-6">
                  Vos commandes
                </h2>
              </center>
            </li>
            {orders.length === 0 && (
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
                {orders?.map((order, index) => (
                  <li
                    key={order._id}
                    className={`py-5 shadow-xl p-6 rounded-xl bg-gray-200 m-4 ${
                      index + 1 === orders.length ? "mb-16" : ""
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
                        {showOrderProducts === order._id
                          ? "Masquer"
                          : "Afficher"}{" "}
                        la commande
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
          <ul role="list" className="divide-y divide-gray-100">
            <li>
              <center>
                <h2 className="text-2xl font-semibold leading-6 text-gray-900 p-6">
                  Votre menu
                </h2>
              </center>
            </li>
            {business?.menus?.length !== 0 ? (
              <>
                <li>
                  <div className="flex flex-col justify-center items-center gap-x-6 py-5 p-6 m-4 ">
                    <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                      Ajoutez des titres à votre menu
                    </h2>
                    <button
                      onClick={() => setIsCreating(true)}
                      type="submit"
                      className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Créez-en un maintenant
                    </button>
                  </div>
                </li>
                {business?.menus?.map((menu) => (
                  <div className="py-5 shadow-xl p-6 rounded-xl bg-gray-200 m-4">
                    <li
                      key={menu._id}
                      className="flex justify-between items-center"
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
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {menu.category}
                        </p>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Produits dans ce menu : {menu.products?.length}
                        </p>
                        <span
                          className="text-sm leading-6 text-indigo-900"
                          onClick={() => deleteMenuHandler(menu._id)}>
                          supprimer ce titre
                        </span>
                      </div>
                    </li>
                    <AddProducts
                      isSuccess={isSuccess}
                      handleGetProducts={getProductsHandler}
                      Success={Success}
                      products={menu.products}
                      menuId={menu._id}
                      handleAddProduct={handleAddProduct}
                    />
                  </div>
                ))}
              </>
            ) : (
              <li>
                <div className="flex flex-col justify-center items-center gap-x-6 py-5 p-6 m-4 ">
                  <center>
                    <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                      Vous n'avez encore aucun titre dans votre menu
                    </h2>
                  </center>
                  <button
                    onClick={() => setIsCreating(true)}
                    type="submit"
                    className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    commencez à créer vos titres maintenant
                  </button>
                </div>
              </li>
            )}
          </ul>
        </>
      ) : (
        <div className="w-full">
          {loading ? (
            <center>
              <Lottie
                animationData={logginAnimation}
                loop={false}
                style={{ width: "250px", height: "250px" }}
              />
              <h3 className="text-3xl text-center">
                Votre titre a été créé avec succès
              </h3>
              <span
                className="m-3 text-sm "
                style={{ cursor: "pointer" }}
                onClick={() => setIsCreating(false)}>
                Retour
              </span>
            </center>
          ) : (
            <>
              <div className="w-full flex justify-start p-4">
                <span onClick={() => setIsCreating(false)}>
                  <ArrowBackIosIcon />
                </span>
              </div>
              <center>
                <p>{error}</p>
              </center>
              <form
                className="flex flex-col justify-center items-center m-4 "
                data-aos="fade-in"
                data-aos-duration="1000">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900 mb-4">
                  Créez un nouveau titre dans votre menu
                </h2>
                <div className="w-full">
                  <label
                    htmlFor="menuName"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Nom
                  </label>
                  <div className="mt-2 ">
                    <input
                      onChange={(e) => setMenuName(e.target.value)}
                      id="menuName"
                      name="menuName"
                      type="text"
                      autoComplete="menuName"
                      required
                      placeholder="ex: Café"
                      className="block w-full rounded-md border-0 
              py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
              ring-gray-300 placeholder:text-gray-400 focus:ring-2 
              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setMenuDescription(e.target.value)}
                      id="description"
                      name="description"
                      type="text"
                      autoComplete="description"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="Address"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Catégorie
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={(e) => setMenuCategory(e.target.value)}
                      className="block w-full rounded-md border-0 
                     py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                     focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                      id="category"
                      name="category"
                      autoComplete="category"
                      required>
                      {categories.map((category) => (
                        <option value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={addMenuHandler}
                  type="submit"
                  className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Créer un nouveau titre
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
