"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import logginAnimation from "@/animations/walking_man_loading.json";

export default function page() {
  const router = useRouter();
  const { register } = useAuthContext();
  const [firname, setFirname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await register({
        firstName: firname,
        lastName: lastname,
        phone: phone,
        email: email,
        password: password,
      });

      if (response.data === "User already exists") {
        setError("Email is used try to login");
        setLoading(false);
      } else if (response.data?.StatusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.Data?.user));
        localStorage.setItem(
          "jwtAccessToken",
          response.data.Data?.tokens.accessToken
        );
        router.push("/confirm");
      } else {
        setError("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Signup to Ordry
        </h2>
        <center>
          <p>{error}</p>
        </center>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loading ? (
          <Lottie
            animationData={logginAnimation}
            style={{ width: "200", height: "200" }}
          />
        ) : (
          <form className="space-y-6" onSubmit={registerHandler}>
            <div>
              <label
                htmlFor="First-name"
                className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setFirname(e.target.value)}
                  id="First-name"
                  name="First-name"
                  type="text"
                  autoComplete="First-name"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Last-name"
                className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  id="Last-name"
                  name="Last-name"
                  type="text"
                  autoComplete="Last-name"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPass(e.target.value)}
                  id="Confirmpassword"
                  name="Confirmpassword"
                  type="password"
                  autoComplete="Confirm-password"
                  required={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Signup
              </button>
            </div>
          </form>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          do you have an account ? {"  "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            login here
          </a>
        </p>
      </div>
    </div>
  );
}
