import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBusinessContext } from "@/context/BusinessContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Lottie from "lottie-react";
import logginAnimation from "@/animations/orderPlaced.json";

export default function Business() {
  const { getMyBusiness, createBusiness } = useBusinessContext();

  const [business, setBusiess] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessUsername, setBusinessUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getMyBusinesses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const response = await getMyBusiness({ userId: user._id });
        console.log("use Effect", response);
        if (response.data.StatusCode === 200) {
          setBusiess(response.data.Data);
        }
      } else {
        router.push("/login");
      }
    };
    getMyBusinesses();
  }, []);

  const handleCreateBusiness = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await createBusiness({
      userId: user._id,
      businessName: businessName,
      description: businessDescription,
      location: {
        lng: 0,
        lat: 0,
      },
      address: businessAddress,
      email: businessEmail,
      phone: businessPhone,
      username: businessUsername,
    });
    if (response.data.StatusCode === 201) {
      setBusiess([...business, response.data.Data]);
    } else {
      setError(response.data.Message);
      setLoading(false);
    }
  };

  const handleNavigateToBusiness = (id) => {
    router.push("/account/business/" + id.toString());
  };

  return (
    <div className="flex flex-col justify-center items-center m-4 ">
      {!isCreating ? (
        <ul role="list" className="divide-y divide-gray-100">
          {business.length !== 0 ? (
            <>
              <li>
                <div className="flex flex-col justify-center items-center gap-x-6 py-5 p-6 m-4 ">
                  <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                    Add new business
                  </h2>
                  <button
                    onClick={() => setIsCreating(true)}
                    type="submit"
                    className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Create one now
                  </button>
                </div>
              </li>
              {business.map((business) => (
                <li
                  key={business._id}
                  className="flex justify-between gap-x-6 py-5 shadow-xl p-6 rounded-xl bg-gray-200 hover:bg-gray-100 m-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNavigateToBusiness(business._id)}>
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                      alt={"business image"}
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {business.businessName}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {business.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {business.address}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Orders today :
                      <time dateTime="2023-01-23T13:23Z">
                        {business?.orders?.length}
                      </time>
                    </p>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <li>
              <div className="flex flex-col justify-center items-center gap-x-6 py-5 p-6 m-4 ">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                  You don't have any business yet
                </h2>
                <button
                  onClick={() => setIsCreating(true)}
                  type="submit"
                  className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create one now
                </button>
              </div>
            </li>
          )}
        </ul>
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
                Your business is being created successfully
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
                  Create a new business
                </h2>
                <div className="w-full">
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Business name
                  </label>
                  <div className="mt-2 ">
                    <input
                      onChange={(e) => setBusinessName(e.target.value)}
                      id="businessName"
                      name="businessName"
                      type="text"
                      autoComplete="businessName"
                      required
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
                      onChange={(e) => setBusinessDescription(e.target.value)}
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
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="address"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="Address"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Click to set business location
                  </label>
                  <div className="mt-2">
                    <button className="flex w-[30vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Set location
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    email
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    phone number
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="phone"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Business unique ID
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setBusinessUsername(e.target.value)}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                </div>
                <button
                  onClick={handleCreateBusiness}
                  type="submit"
                  className="flex w-[50vh] m-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create one now
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
