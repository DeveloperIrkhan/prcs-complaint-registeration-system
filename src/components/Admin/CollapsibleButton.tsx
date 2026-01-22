"use client";
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface CollapsibleButtonProps {
  title: string;
  children?: React.ReactNode;
}
const CollapsibleButton = ({ title, children }: CollapsibleButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <div
        className="flex items-center justify-between cursor-pointer px-4 py-2 h-16
         text-white border-b bg-red-600 group-hover:bg-red-800 hoverEffect"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <IoIosArrowUp className="h-5 w-5"/>
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col bg-accent-color/10">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleButton;
