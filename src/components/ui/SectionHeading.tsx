import React from "react";

interface props {
  title: string;
  subtitle?: string;
  lineColor?: string;
  textColor?: string;
  subtitleColor?: string;
}
const SectionHeading = ({
  title,
  subtitle,
  lineColor,
  textColor,
  subtitleColor
}: props) => {
  return (
    <div className="text-center my-10">
      {/* Title with horizontal lines */}
      <div className="flex items-center group justify-center gap-4">
        <div className={`h-[2px] w-10 ${lineColor || "bg-black"} `}></div>
        <h2
          className={`${
            textColor || "text-black"
          } text-xl md:text-2xl font-semibold uppercase tracking-wide`}
        >
          {title}
        </h2>
        <div className={`h-[2px] w-10 ${lineColor || "bg-black"} `}></div>
      </div>

      {/* Subtitle */}
      <p className={`text-sm italic ${subtitleColor || "text-gray-500"} mt-2`}>
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeading;
