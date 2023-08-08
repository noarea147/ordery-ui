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
  const { getMyBusinessMenus, createMenu, addProduct, getMenuProducts } =
    useMenuContext();
  const { getMyBusinessOrders } = useBusinessContext();
  const [showOrderProducts, setShowOrderProducts] = useState(false);
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
        console.log("orders response", response);
        if (response.data.StatusCode === 200) {
          setOrders(response.data.Data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBusinessOrders();
    getBusinessMenus();
  }, []);
  console.log("orders", orders);

  const addMenuHandler = async () => {
    setLoading(true);
    const response = await createMenu({
      businessId: params.id,
      menuName: menuName,
      description: menuDescription,
      category: menuCategory,
    });
    console.log("response", response);
    if (response.data?.StatusCode === 201) {
      // setIsCreating(false);
      setMenuName("");
      setMenuDescription("");
      setMenuCategory("");
      setError("");
      business.menus.push(response.data?.Data);
      setBusiness(business);
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
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      setError(response.data?.Message);
    }
  };
  const getProductsHandler = async (menuId) => {
    const response = await getMenuProducts({ menuId: menuId });
    return response;
  };

  const Success = (val) => {
    setIsSuccess(val);
  };
  return (
    <>
      <BusinessHeading business={business} />
      {notFound ? (
        <BusinessNotfound />
      ) : !isCreating ? (
        <>
          <ul role="list" className="divide-y divide-gray-100">
            {business?.menus?.length !== 0 ? (
              <>
                <li>
                  <div className="flex flex-col justify-center items-center gap-x-6 py-5 p-6 m-4 ">
                    <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                      Add headings to your menu
                    </h2>
                    <button
                      onClick={() => setIsCreating(true)}
                      type="submit"
                      className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Create one now
                    </button>
                  </div>
                </li>
                <li>
                  <center>
                    <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                      Your menu
                    </h2>
                  </center>
                </li>
                {business?.menus?.map((menu) => (
                  <div className="py-5 shadow-xl p-6 rounded-xl bg-gray-200 m-4">
                    <li
                      key={menu._id}
                      className="flex justify-between items-center"
                      style={{ cursor: "pointer" }}>
                      <div className="flex min-w-0 ">
                        <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                          alt={"business image"}
                        />
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
                          Products in this menu : {menu.products?.length}
                        </p>
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
                  <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                    You don't have any headings in your menu yet
                  </h2>
                  <button
                    onClick={() => setIsCreating(true)}
                    type="submit"
                    className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    start create your headers now
                  </button>
                </div>
              </li>
            )}
          </ul>
          <ul className="divide-y divide-gray-200">
            <li>
              <center>
                <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                  Your orders
                </h2>
              </center>
            </li>
            <li>
              {orders?.map((order, index) => (
                <div
                  className="py-5 shadow-xl p-6 rounded-xl bg-gray-200 m-4"
                  style={
                    index + 1 === orders.length ? { marginBottom: "100px" } : {}
                  }>
                  <li
                    key={order._id}
                    className="flex justify-between items-center gap-x-6 bg-gray-200
                     p-4 rounded-xl
                    "
                    style={{ cursor: "pointer" }}>
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-green-00">
                          {"new order"}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {("table number", order.tableNumber)}
                        </p>
                      </div>
                    </div>
                    <div className="sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {order.total + " dt"}
                      </p>
                    </div>
                    <div className="sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Products in this order : {order.products?.length}
                      </p>
                      <span
                        className="text-sm leading-6 text-indigo-900"
                        onClick={() =>
                          setShowOrderProducts(!showOrderProducts)
                        }>
                        show order products
                      </span>
                      {showOrderProducts &&
                        order.products.map((product) => (
                          <>
                            <p className="text-sm leading-6 text-gray-900">
                              {("product name : ", product.name)}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {("price :", product.prices[0].price)}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {("variant :", product.prices[0].variant)}
                            </p>
                          </>
                        ))}
                    </div>
                  </li>
                </div>
              ))}
            </li>
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
                Your heading has being created successfully
              </h3>
              <span
                className="m-3 text-sm "
                style={{ cursor: "pointer" }}
                onClick={() => setIsCreating(false)}>
                Go back
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
                  Create a new heading in you menu
                </h2>
                <div className="w-full">
                  <label
                    htmlFor="menuName"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2 ">
                    <input
                      onChange={(e) => setMenuName(e.target.value)}
                      id="menuName"
                      name="menuName"
                      type="text"
                      autoComplete="menuName"
                      required
                      placeholder="ex: Coffee"
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
                    Category
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
                      <option value={"coffee"}>Coffee</option>
                      <option value={"smoothie"}>smoothie</option>
                      <option value={"juice"}>juice</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={addMenuHandler}
                  type="submit"
                  className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create new heading
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
