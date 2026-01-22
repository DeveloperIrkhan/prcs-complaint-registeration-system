"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import CollapsibleButton from "./CollapsibleButton";
import Link from "next/link";
import { Menu } from "lucide-react";
import { images } from "@/app/Images";
import Icon from "./Icon";
const SideBarComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {/* ==================== MOBILE SIDEBAR ==================== */}
      <div className="block md:hidden">
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: isOpen ? 0 : -260 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed md:static top-0 left-0 h-full w-64 
          bg-gray-100 z-50 shadow-lg md:shadow-none"
        >
          <header
            className="bg-bg-Neutral-color 
          flex justify-around items-center"
          >
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Image
                  src={images.Logo}
                  height={75}
                  className="p-2"
                  width={75}
                  alt="logo"
                />
              </Link>
              <h2 className="flex uppercase text-lg font-bold font-Jost text-main-brand-color tracking-[5px]">
                Menu
              </h2>
            </div>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <IoClose className="w-6 h-6 text-gray-600" />
            </button>
          </header>
          <div className="m-0 p-0">
            <CollapsibleButton title="Manage Complaints">
              <Link
                href="/dashboard/manage-complaints"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-red-300"
              >
                <Icon iconName={images.complainticon} /> Show All Complaints
              </Link>
            </CollapsibleButton>
            <CollapsibleButton title="Manage Team">
              <Link
                href="/dashboard/users/list-all-users"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-red-300"
              >
                <Icon iconName={images.addnewicon} /> List All Members
              </Link>
              <Link
                href="/dashboard/users/edit-users"
                className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-red-300"
              >
                <Icon iconName={images.complainticon} /> Edit Member
              </Link>
            </CollapsibleButton>
          </div>
        </motion.div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <button
          className="md:hidden absolute top-6 left-6 bg-white hover:shadow-xl rounded-full p-2 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu className={`${!isOpen ? "w-6 h-6" : "hidden"}`} />
        </button>
      </div>

      {/* ==================== DESKTOP SIDEBAR ==================== */}
      <div className="hidden md:block min-w-72">
        <header className="bg-white border-b p-1 shadow-md flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Image
                src={images.Logo}
                height={75}
                className="p-2"
                width={75}
                alt="logo"
              />
            </Link>
            <h2
              className="hidden md:flex text-xl 
             text-main-brand-color
             my-2 md:my-3 font-bold font-mona-sans 
             tracking-wider text-red capitalize text-[15px] md:text-2xl
             "
            >
              PRCS
            </h2>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <IoClose className="w-6 h-6" />
          </button>
        </header>

        <div className="">
          <CollapsibleButton title="Manage Complaints">
            <Link
              href="/dashboard/manage-complaints"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-red-300"
            >
              <Icon iconName={images.complainticon} /> Show All Complaints
            </Link>
          </CollapsibleButton>
          <CollapsibleButton title="Manage Team">
            <Link
              href="/dashboard/users/list-all-users"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-red-300"
            >
              <Icon iconName={images.addnewicon} /> List All Members
            </Link>
            <Link
              href="/dashboard/users/edit-users"
              className="flex items-center h-16 gap-3 px-4 py-2 hover:bg-red-300"
            >
              <Icon iconName={images.complainticon} /> Edit Member
            </Link>
          </CollapsibleButton>
        </div>
      </div>
    </>
  );
};

export default SideBarComponent;
