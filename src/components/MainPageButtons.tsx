import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  hrefTo: string;
  ImageSrc: string;
  label?: string;
}

const MainPageButtons = ({
  hrefTo,
  ImageSrc,
  label = "Track Complaint"
}: IProps) => {
  return (
    <Link
      href={hrefTo}
      className="
        flex flex-col justify-center items-center 
        bg-white border border-red-400 hover:border-white rounded-2xl 
        shadow-md hover:shadow-[0_10px_25px_rgba(255,50,50,0.7)] transition-all duration-300 
        hover:-translate-y-2 hover:bg-red-100 
        w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 
        p-3 sm:p-4
      "
    >
      <div className="flex justify-center items-center h-2/3">
        <Image
          src={ImageSrc}
          alt={label}
          width={90}
          height={90}
          className="object-contain max-h-[70%] max-w-[70%]"
        />
      </div>

      <p
        className="
        font-semibold text-gray-700 text-center mt-2 
        text-[10px] sm:text-[12px] md:text-[16px] 
        hover:text-red-500 transition-colors capitalize duration-300
      "
      >
        {label}
      </p>
    </Link>
  );
};

export default MainPageButtons;
