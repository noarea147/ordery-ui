import React from "react";

export default function page({ params }) {



  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li
        className="flex justify-between gap-x-6 py-5 shadow-xl p-6 rounded-xl bg-gray-200 hover:bg-gray-100 "
        style={{ cursor: "pointer" }}>
        <div className="flex min-w-0 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
            alt
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              Cafe de coin
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              Gerant : Alaa
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Manouba</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Orders today :<time dateTime="2023-01-23T13:23Z">23</time>
          </p>
        </div>
      </li>
    </ul>
  );
}
