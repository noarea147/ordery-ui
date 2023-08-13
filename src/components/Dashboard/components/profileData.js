import React from "react";

export default function ProfileData(props) {
  return (
    <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {props.label} : {props.value}
      </dt>
    </div>
  );
}
