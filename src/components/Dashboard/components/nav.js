import React from "react";
import { DASHBOARD, BUSINESS } from "@/app/account/page";

export default function Nav(props) {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="vercel.svg" alt="ordery" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <span
                  onClick={() => props.handleNav(DASHBOARD)}
                  style={{ cursor: "pointer" }}
                  className={
                    props.currentTab === DASHBOARD
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                  aria-current="page">
                  Dashboard
                </span>
                <span
                  onClick={() => props.handleNav(BUSINESS)}
                  style={{ cursor: "pointer" }}
                  className={
                    props.currentTab === BUSINESS
                      ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }>
                  businesses
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex justify-center items-center">
          <span
            onClick={() => props.handleNav(DASHBOARD)}
            style={{ cursor: "pointer" }}
            className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page">
            Dashboard
          </span>
          <span
            onClick={() => props.handleNav(BUSINESS)}
            style={{ cursor: "pointer" }}
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
            businesses
          </span>
        </div>
      </div>
    </nav>
  );
}
