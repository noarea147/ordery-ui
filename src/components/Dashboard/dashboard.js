import React from "react";
import ProfileData from "./components/profileData";

export default function Dashboard() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Account Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <ProfileData label={"First name"} value={"Alaa"} />
          <ProfileData label={"Last name"} value={"Alaa"} />
          <ProfileData label={"Phone"} value={"Alaa"} />
          <ProfileData label={"Email"} value={"Alaa"} />
        </dl>
      </div>
    </div>
  );
}
