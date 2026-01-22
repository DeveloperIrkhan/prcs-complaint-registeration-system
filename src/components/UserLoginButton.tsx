"use client";
import { images } from "@/app/Images";
import { getWithExpirys } from "@/helpers/storageHelper";
import axios from "axios";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "./Spinner/Spinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IUserLoginProps {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}
const UserLoginButton = () => {
  const [user, setUser] = useState<IUserLoginProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const storedUser = getWithExpirys<IUserLoginProps>("userLogin");
    setUser(storedUser);
  }, []);

  const signOutasync = async () => {
    try {
      setIsLoading(true);
      const storedUser = getWithExpirys<IUserLoginProps>("userLogin");
      const Id = storedUser?._id;
      console.log(Id);
      const response = await axios.post("/api/complaints/auth/sign-out", {
        Id
      });
      console.log(response);
      response.data.success == true
        ? toast.success(response.data.message, { autoClose: 2000 })
        : toast.error(response.data.message);
      router.push("/auth");
      console.log(response.data);
      Cookies.remove("accessToken");
      Cookies.remove("loggedInUser");
      Cookies.remove("refreshToken");
      localStorage.removeItem("userLogin");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="group">
      {isLoading && <Spinner />}
      <div
        className="relative p-2 w-10 h-10 flex justify-center items-center 
        rounded-full bg-white border 
        border-main-brand-color 
        text-main-brand-color
       hover:text-white 
       hover:bg-main-brand-color
        hover:shadow-xl duration-300
        hover:translate-y-0.5"
      >
        {user ? (
          <p className="font-bold">
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </p>
        ) : (
          <>
            <User />
          </>
        )}
      </div>
      <div
        className="bg-gray-100 text-gray-600 font-medium hidden shadow-2xl rounded-md  
          group-hover:block absolute hoverEffect z-50 w-60 p-4 right-3 border-2"
      >
        {user ? (
          <>
            <div className="flex justify-between items-center">
              <img className="w-10" src={images.Logo} />
              <p
                onClick={signOutasync}
                className="p-1 text-blue-500 hoverEffect hover:border-b hover:cursor-pointer"
              >
                Sign Out
              </p>
            </div>
            <hr className="my-2" />

            <div className="">
              <div
                className="flex justify-start gap-5 items-center '
                  flex-row gap-y-2"
              >
                <div className="flex flex-col justify-end">
                  <p className="py-2 flex items-center gap-2">
                    <span className="font-bold">Welcome!</span>
                    <span className="text-md">
                      Mr. {user?.name ? `${user.name}` : ""}
                    </span>
                  </p>
                  <p className="text-sm mb-2">
                    {user?.email ? `${user.email}` : ""}
                  </p>
                  <hr />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-y-2">
              <Link
                className="p-1 hoverEffect hover:bg-gray-200"
                href={"/auth"}
              >
                sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default UserLoginButton;
