"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { images } from "../Images";
import MainPageButtons from "@/components/MainPageButtons";
import Link from "next/link";

const page = () => {
  useEffect(() => {
    toast.success("Welcome to PRCS User!", {
      autoClose: 5000,
    });
  }, []);
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row  bg-custom-linear md:p-0">
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm">
          <div className="text-center my-10">
            <div className="flex items-center group justify-center gap-4">
              <div className="h-0.5 w-10 bg-red-500"></div>
              <h2
                className={
                  "text-red-500 text-[14px] md:text-xl font-semibold uppercase tracking-normal md:tracking-wide"
                }
              >
                Welcome! Valued User
              </h2>
              <div className="h-0.5 w-10 bg-red-500"></div>
            </div>

            {/* Subtitle */}
            <p className={`italic text-[11px] md:text-lg text-red-500 mt-1`}>
              Register Your Online Complaint.
            </p>
          </div>
          <div className="cursor-pointer flex justify-center items-center gap-3">
            <MainPageButtons
              label="register complaint"
              hrefTo="/register-complaint"
              ImageSrc={images.registeringComplaint}
            />
            <MainPageButtons
              label="complaint tracking"
              hrefTo="/complaint-tracking"
              ImageSrc={images.trackingComplaint}
            />
          </div>
        </div>
      </div>

      <div className="hidden flex-1 bg-custom-radial md:flex items-center justify-center p-6 relative">
        <div className="z-10 text-center h-full flex items-center">
          <Image
            src={images.MainPicture}
            alt="Auth illustrations"
            width={550}
            height={350}
            className="mx-auto h-9/12 shadow-2xl rounded-xl"
          />
        </div>
      </div>
      <div
        className="absolute bottom-2 right-10 z-30 w-full bg-transparent 
      border-transparent flex justify-end items-center border-t"
      >
        <span className="text-sm text-white/30">
          <Link target="_blank" href={"https://developerirkhan.github.io/irfankhan-portfolio"}>
            © {new Date().getFullYear()} Irfan Designs.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default page;
