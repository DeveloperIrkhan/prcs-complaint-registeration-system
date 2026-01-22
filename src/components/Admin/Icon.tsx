import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
interface Iicon {
  iconName: string;
  className?: string;
}
const Icon = ({ iconName, className }: Iicon) => {
  return (
    <Image
    alt={iconName}
      src={iconName}
      height={29}
      width={29}
      className={cn("", className)}
    />
  );
};

export default Icon;
