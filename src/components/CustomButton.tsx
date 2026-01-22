import { cn } from "@/lib/utils";
import React from "react";

interface IButtonProps {
  onClickFunction?: () => void;
  buttonText: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}
const CustomButton = ({
  onClickFunction,
  buttonText,
  buttonColor,
  icon,
  className,
  buttonHoverColor,
  disabled,
  type = "button"
}: IButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickFunction}
      className={cn(
        `group relative w-1/4 overflow-hidden h-10 px-4 py-1 
        rounded-md text-white text-sm font-medium 
        flex items-center justify-center gap-2 
        ${buttonColor || "bg-main-brand-color"} 
        ${disabled && "bg-primary-color/70 cursor-not-allowed"}`,
        className,
        className
      )}
    >
      <span
        className={`absolute inset-0  transform -translate-x-full
           group-hover:translate-x-0 transition-transform duration-500
            ease-out z-0 ${buttonHoverColor || "bg-black"}`}
      ></span>
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {buttonText}
      </span>
    </button>
  );
};

export default CustomButton;
