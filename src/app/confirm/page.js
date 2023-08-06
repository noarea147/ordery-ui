"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import logginAnimation from "@/animations/walking_man_loading.json";

export default function page() {
  const router = useRouter();
  const { verifyAccount } = useAuthContext();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verificationHandler = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (!user) {
        return router.push("/login");
      }

      setLoading(true);
      console.log({
        VerificationKey: code,
        email: user.email,
      });
      const response = await verifyAccount({
        VerificationKey: code,
        email: user.email,
      });
      console.log(response);
      if (response.data?.StatusCode === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.Data?.user));
        localStorage.setItem(
          "jwtAccessToken",
          response.data.Data?.tokens.accessToken
        );
        router.push("/account");
      } else {
        setError("Code is not valid");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
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
          Verify to your account
        </h2>
        <center>
          {" "}
          <p>{error}</p>
        </center>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loading ? (
          <>
            <Lottie
              animationData={logginAnimation}
              loop={true}
              style={{ width: "250px", height: "250px" }}
            />
            <h3 className="text-3xl font-semibold text-center">
              BRB ! I go check ...
            </h3>
          </>
        ) : (
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Account verification code
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setCode(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={verificationHandler}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Verify
              </button>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
          do you have an account ? {"  "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            return to login
          </a>
        </p>
          </form>
        )}
      </div>
    </div>
  );
}
