import Image from "next/image";
import React from "react";
import { images } from "./Images";

const NotFound = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full w-full flex justify-center items-center">
        <Image
          src={images.NotFound}
          alt="not-found img"
          width={900}
          height={700}
          className="mx-auto w-1/2 h-1/2"
        />
      </div>
    </div>
  );
};

export default NotFound;
