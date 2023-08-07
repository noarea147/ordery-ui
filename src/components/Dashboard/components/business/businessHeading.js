import React from "react";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function BusinessHeading(props) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <div className="flex justify-start items-center divide-gray-100 pl-6">
        <span className="cursor-pointer" onClick={() => handleBack()}>
          <ArrowBackIosIcon />
        </span>
        <header>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {props.business?.businessName}
            </h1>
          </div>
        </header>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        <li
          className="flex justify-between gap-x-6 py-5 p-6"
          style={{ cursor: "pointer" }}>
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
              alt={"business image"}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {props?.business?.businessName}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {props?.business?.description}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              {props?.business?.address}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Orders today :
              <time dateTime="2023-01-23T13:23Z">
                {props?.business?.orders?.length}
              </time>
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}
