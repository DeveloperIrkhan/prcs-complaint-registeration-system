"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import SectionHeading from "../ui/SectionHeading";
import Image from "next/image";
import { images } from "@/app/Images";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/UserAPI";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import { setWithExpiry } from "@/helpers/storageHelper";
import { IUser } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setisActive] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [currentState, setCurrentState] = useState("login");
  const [againPassword, setAgainPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginUser] = useLoginUserMutation();
  const [signupUser] = useRegisterUserMutation();
  const router = useRouter();
  useEffect(() => {
    if (currentState === "signup") {
      if (password && againPassword && password !== againPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  }, [password, againPassword, currentState]);

  const submitAsync = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (currentState === "signup" && password !== againPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      if (currentState === "login") {
        const signInUser = { email, password };
        var response = await loginUser(signInUser).unwrap();
        console.log("response", response);
        if (response?.success === true) {
          toast.success(response?.message, { autoClose: 2000 });
          setWithExpiry<IUser>({
            key: "userLogin",
            value: response?.loggedInUser,
            timeInHours: 12,
          });

          const redirectUrl =
            response?.loggedInUser.role === "admin"
              ? "/dashboard"
              : "/user-dashboard";
          setTimeout(() => {
            router.push(redirectUrl);
          }, 1500);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      } else {
        const name = `${firstName}+${lastName}`;
        const newUser = { name, email, phoneNo, password, isActive };
        var response = await signupUser(newUser).unwrap();
        if (response?.success === true) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      }
    } catch (error) {
      console.log("errors", error);
      const err = error as {
        status?: number;
        data?: { success?: boolean; message?: string };
      };

      if (err?.data?.message) {
        toast.error(err.data.message, { autoClose: 2000 });
      } else {
        toast.error("Something went wrong. Please try again.", {
          autoClose: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {loading && <Spinner />}
      <div
        className="flex-1 flex items-center justify-center 
      bg-custom-linear md:bg-white px-6 md:px-12"
      >
        <div className="w-full max-w-sm">
          <SectionHeading
            title={`Admin ${currentState === "signup" ? "Signup" : "Login"}`}
            subtitle="admin auth section"
            lineColor="bg-black"
            textColor="text-gary-500"
            subtitleColor="text-gray-900"
          />
          <form onSubmit={submitAsync} className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-4 justify-center items-center">
              {currentState === "signup" && (
                <>
                  <div className="flex gap-3 justify-around w-full">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter Your First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full bg-white custom-input"
                    />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter Your Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full custom-input  bg-white"
                    />
                  </div>
                  <input
                    id="phoneNo"
                    name="phoneNo"
                    type="text"
                    placeholder="Enter Your phoneNo Address"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                    className="w-full custom-input  bg-white"
                  />
                </>
              )}
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full custom-input  bg-white"
              />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full custom-input  bg-white"
              />

              {currentState === "signup" && (
                <input
                  id="againPassword"
                  name="againPassword"
                  type="password"
                  placeholder="Enter Your Password Again"
                  value={againPassword}
                  onChange={(e) => setAgainPassword(e.target.value)}
                  required
                  className="w-full custom-input  bg-white"
                />
              )}
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            <CustomButton
              type="submit"
              buttonColor="bg-red-500"
              buttonHoverColor="bg-white"
              className="w-full text-white hover:text-red-500 border-2 border-red-500 rounded-lg font-semibold transition"
              buttonText={currentState === "signup" ? "Sign up" : "Login"}
            />
          </form>
          {/* button section */}
          <div className="flex items-center my-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {/* text section */}
          <div className="w-full flex justify-between text-gray-600">
            {currentState === "Log in" && (
              <p className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300">
                Forgot password?
              </p>
            )}
            {currentState === "signup" ? (
              <p
                onClick={() => setCurrentState("login")}
                className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
              >
                I have account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("signup")}
                className="text-sm pb-1 cursor-pointer transition-colors duration-200 hover:text-gray-300"
              >
                can't have account
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className="hidden flex-1 bg-custom-radial
      md:flex items-center justify-center p-6 relative"
      >
        <div className="z-10 text-center h-full flex items-center">
          <Image
            src={currentState === "login" ? images.login : images.auth}
            alt="Auth illustrations"
            width={350}
            height={350}
            className="mx-auto h-9/12 shadow-2xs rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
