"use client";
import React, { useEffect, useState } from "react";
import { useMenuContext } from "../../../../context/MenuContext";
import { useBusinessContext } from "../../../../context/BusinessContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Lottie from "lottie-react";
import logginAnimation from "@/animations/orderPlaced.json";
import BusinessNotfound from "@/components/Dashboard/components/business/businessNotfound";
import BusinessHeading from "@/components/Dashboard/components/business/businessHeading";
import Order from "@/components/Dashboard/components/business/order";
import Menu from "@/components/Dashboard/components/business/menu";
import Image from "next/image";

export default function page({ params }) {
  const { getMyBusinessMenus, createMenu, getMenuCategories, editMenu } =
    useMenuContext();
  const { getMyBusinessOrders } = useBusinessContext();
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuId, setMenuId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);

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
  }, []);

  const addMenuHandler = async () => {
    console.log("create");
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
      setLoading(false);
    }
  };

  const editMenuHandler = async () => {
    console.log("edit");
    setLoading(true);
    const response = await editMenu({
      businessId: params.id,
      menuId: menuId,
      menuName: menuName,
      description: menuDescription,
      category: menuCategory === "" ? categories[0].name : menuCategory,
    });
    if (response.data?.StatusCode === 200) {
      setMenuName("");
      setMenuDescription("");
      setMenuCategory("");
      setError("");
      let updatedMenusArray = business.menus.filter(
        (menu) => menu._id !== menuId
      );
      updatedMenusArray.push(response.data.Data);

      setBusiness((prevBusiness) => ({
        ...prevBusiness,
        menus: updatedMenusArray,
      }));
      setTimeout(() => {
        setLoading(false);
        setIsCreating(false);
        setIsEditing(false);
      }, 2000);
    } else {
      setError(response.data?.Message);
    }
  };
  const isCreatingHandler = (state, menu) => {
    if (state === "edit") {
      setMenuId(menu._id);
      setMenuName(menu.menuName);
      setMenuDescription(menu.description);
      setMenuCategory(menu.category);
      setIsEditing(!isEditing);
    }
    setIsCreating(!isCreating);
  };

  const addProductToMenu = (response, data) => {
    setLoading(true);
    business.menus.map((menu) => {
      if (menu._id === data.menuId) {
        menu.products.push(response);
      }
    });
    setBusiness(business);
  };

  const deleteProductFromMenu = (data) => {
    setLoading(true);
    business.menus = business.menus.filter((menu) => menu._id !== data);
    setBusiness(business);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <BusinessHeading business={business} />
      {notFound ? (
        <BusinessNotfound />
      ) : !isCreating ? (
        <>
          <div className="flex justify-between w-full">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg">
              <svg
                className="w-12 h-12"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
          </div>
          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
              isSidebarOpen ? "translate-x-0" : " -translate-x-full"
            } bg-white dark:bg-gray-900`}
            aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 mb-4  dark:bg-gray-800">
              <div className="flex w-full justify-between items-center pr-3">
                <span
                  className="ml-auto text-2xl font-bold text-white cursor-pointer"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  x
                </span>
              </div>
              <div className="flex w-full justify-between items-center p-3">
                <Image
                  src="/next.svg"
                  alt="logo"
                  width={200}
                  height={20}
                  className=" m-5 bg-gray-100"
                />
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <span
                    onClick={() => {
                      setCurrentTab("orders");
                      setIsSidebarOpen(!isSidebarOpen);
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Orders
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                     {orders.length}
                    </span>
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      setCurrentTab("menu");
                      setIsSidebarOpen(!isSidebarOpen);
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="flex-1 ml-3 whitespace-nowrap">Menu</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
          <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg ">
              <div className="flex items-center justify-center mb-4 rounded ">
                {currentTab === "orders" && <Order orders={orders} />}
                {currentTab === "menu" && (
                  <Menu
                    business={business}
                    id={params.id}
                    isCreatingHandler={isCreatingHandler}
                    addProductToMenu={addProductToMenu}
                    deleteProductFromMenu={deleteProductFromMenu}
                    editMenuHandler={editMenuHandler}
                    isEditing={isEditing}
                  />
                )}
              </div>
            </div>
          </div>
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
                onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                }}>
                Retour
              </span>
            </center>
          ) : (
            <>
              <div className="w-full flex justify-start p-4">
                <span
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                  }}>
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
                  {isEditing
                    ? "Modifer le titre dans votre menu"
                    : "Créez un nouveau titre dans votre menu"}
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
                      value={menuName}
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
                      value={menuDescription}
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
                      {categories.map((category, index) => (
                        <option
                          key={index}
                          value={category.name}
                          selected={category.name === menuCategory}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={isEditing ? editMenuHandler : addMenuHandler}
                  type="submit"
                  className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isEditing ? "Modifer le rubriques" : "Ajoutez un rubrique"}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
