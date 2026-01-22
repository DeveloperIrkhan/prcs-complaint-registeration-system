import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  className: string;
  children: React.ReactNode;
}
const PageTitle = ({ className, children }: IProps) => {
  return <section className={cn("my-2 md:my-3 font-bold font-mona-sans tracking-wider text-red capitalize text-[15px] md:text-2xl", className)}>{children}</section>;
};

export default PageTitle;
