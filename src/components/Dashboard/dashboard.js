import React from "react";
import ProfileData from "./components/profileData";

export default function Dashboard() {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <ProfileData label={"First name"} value={user.firstName} />
          <ProfileData label={"Last name"} value={user.lastName} />
          <ProfileData label={"Phone"} value={user.phone} />
          <ProfileData label={"Email"} value={user.email} />
        </dl>
      </div>
    </div>
  );
}
