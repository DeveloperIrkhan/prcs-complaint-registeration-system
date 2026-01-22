"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface IDashboardCardProps {
  heading: string;
  text: string;
  totalNumber: number;
  className?: string;
  status?: string;
  Icon: string | StaticImageData;
}
const DashboardCard = ({
  heading,
  text,
  totalNumber,
  className,
  Icon,
  status
}: IDashboardCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    const controls = animate(count, totalNumber, {
      duration: 1,
      ease: "easeOut"
    });

    const unsubscribe = rounded.on("change", (v) => {
      setDisplayNumber(v);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [totalNumber]);

  return (
    <Link
      href={`dashboard/view-complaints/${status}`}
      className={cn(
        "bg-gray-400 group cursor-pointer flex shadow-md flex-col justify-center items-center rounded-xl px-2 py-4",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {/* Left Side - Icon */}
        <div className="flex">
          <Image src={Icon} width={60} height={60} alt="icon" />
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col text-start gap-2">
          <motion.h2 className="text-xl md:text-3xl font-bold group-hover:text-white">
            {displayNumber}
          </motion.h2>
          <h2 className="md:text-xl font-medium group-hover:text-white">
            {heading}
          </h2>
          <p className="text-[15px] tracking-wide group-hover:text-white">
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
