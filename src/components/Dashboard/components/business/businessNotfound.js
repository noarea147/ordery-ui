import React from "react";
import Lottie from "lottie-react";
import walking_man_loading from "@/animations/walking_man_loading.json";

export default function BusinessNotfound() {
  return (
    <center>
      <Lottie
        animationData={walking_man_loading}
        loop={true}
        style={{ width: "250px", height: "250px" }}
        className="m-4"
      />
      <h1 className="text-3xl text-center py-3">404 NOT FOUND</h1>
      <h2 className="text-2xl font-semibold leading-6 text-gray-900">
        Crazy i can't find your business !
      </h2>
    </center>
  );
}
