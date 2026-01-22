"use client";
import { ComplaintType } from "@/enums/ComplaintType/ComplaintType";
import {
  useRegisterComplaintMutation,
  useSendComplaintEmailMutation
} from "@/features/ComplaijntAPI";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { Lightbulb } from "lucide-react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import Image from "next/image";
import { images } from "@/app/Images";
import { motion } from "framer-motion";

const ComplaintRegisteration = () => {
  const [name, setName] = useState<string>("");
  const [complaintId, setComplaintId] = useState<string>("");
  const [complaintType, setComplaintType] = useState<ComplaintType | "">("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [designation, setDesgination] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [complaint, setComplaint] = useState<string>("");
  const [registerComplaint, { isLoading: registeringLoading }] =
    useRegisterComplaintMutation();
  const [sendComplaintEmail, { isLoading: emailSendingLoading }] =
    useSendComplaintEmailMutation();

  const handleSubmitChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerFormData = new FormData();
    try {
      registerFormData.append("name", name);
      registerFormData.append("email", email);
      registerFormData.append("phone", phone);
      registerFormData.append("designation", designation);
      registerFormData.append("department", department);
      registerFormData.append("complaintType", complaintType);
      registerFormData.append("complaint", complaint);
      const response = await registerComplaint(registerFormData).unwrap();
      console.log("response", response);
      if (response.success === true) {
        toast.success(
          response.message || "complaint registered successfully! ✅"
        );

        const complaintId = response.complaint?._id;
        if (complaintId) {
          const emailResp = await sendComplaintEmail({
            userEmail: email,
            emailType: "Tracking",
            trackingId: complaintId
          }).unwrap();

          emailResp.success
            ? toast.success(emailResp.message || "Email sent successfully! 📧")
            : toast.error(emailResp.message || "Error sending email ❌");
          setComplaintId(complaintId);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error!");
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setDesgination("");
      setComplaint("");
    }
  };
  function changeTheme() {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  }

  return (
    <div className="h-screen relative">
      {(registeringLoading || emailSendingLoading) && <Spinner />}
      <button
        onClick={changeTheme}
        className="fixed top-3 right-3 z-50 rounded-full flex items-center justify-center 
               w-7 h-7 bg-gray-800 dark:bg-yellow-200  hover:bg-gray-700
               text-white shadow-lg transition-transform hover:scale-110 "
      >
        <Lightbulb className="w-4 h-4" />
      </button>
      <div className="w-full flex h-full">
        <div className="md:w-1/2 w-full bg-white dark:bg-black flex justify-center items-center">
          <div className="p-3 max-w-sm  space-y-3 rounded-md bg-white dark:bg-black">
            {complaintId === "" || complaint === undefined ? (
              <>
                <form onSubmit={handleSubmitChanges}>
                  <div className="space-y-3">
                    <div className="flex gap-3 justify-around">
                      <div className="flex gap-y-2 text-black dark:text-white flex-col">
                        <Label>Enter Your Name</Label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="eg. irfan shah"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="flex gap-y-2 flex-col">
                        <Label>Enter Your Phone</Label>
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="eg. 033312345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-y-2 flex-col">
                      <Label>Enter Your Correct Email</Label>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="eg. abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-3 justify-around">
                      <div className="flex gap-y-2 flex-col">
                        <Label>Enter Your Designation</Label>
                        <input
                          id="designation"
                          name="designation"
                          type="text"
                          placeholder="eg. IT Officer"
                          value={designation}
                          onChange={(e) => setDesgination(e.target.value)}
                          required
                          className="custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="flex gap-y-2 flex-col">
                        <Label>Enter Your Department</Label>
                        <input
                          id="department"
                          name="department"
                          type="text"
                          placeholder="eg. Accounts"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                          className="custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-y-2 flex-col">
                      <Label>Please Select Your Compalint Type</Label>
                      <Select
                        value={complaintType}
                        onValueChange={(value: ComplaintType) =>
                          setComplaintType(value)
                        }
                      >
                        <SelectTrigger className="w-full border-gray-400 custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                          <SelectValue placeholder="please select complaint type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ComplaintType).map(
                            (complaintTypeOption) => (
                              <SelectItem
                                key={complaintTypeOption}
                                value={complaintTypeOption}
                              >
                                {complaintTypeOption}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex w-full">
                      <div className="flex gap-y-1 flex-col w-full">
                        <Label>Enter Your Complaint</Label>
                        <textarea
                          name="complaint"
                          placeholder="Please provide your issue in details"
                          value={complaint}
                          rows={5}
                          required
                          className="custom-input bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          onChange={(e) => setComplaint(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden h-10 px-4 py-1 
                      rounded-md text-white hover:text-red-500 text-sm font-medium 
                      flex items-center justify-center gap-2 
                      bg-red-500 border-2 border-red-500"
                    >
                      <span
                        className="absolute inset-0  transform -translate-x-full
                         group-hover:translate-x-0 transition-transform duration-500
                          ease-out z-0 bg-white"
                      ></span>
                      <span className="relative z-10 flex items-center gap-2">
                        Register Complaint
                      </span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="px-4 py-5">
                <p className="font-semibold text-lg">
                  your complaint Id is{" "}
                  <span className="font-bold">{complaintId.toString()}</span>
                </p>
                <p className="font-semibold italic text-[14px]">
                  Please remember this Tracking Id for Tracking Your Complaint
                </p>
                <p className="font-semibold italic text-[14px]">
                  We have also send you a link in Email to track your complaint
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={`md:w-1/2 w-full md:block hidden overflow-hidden`}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 1, -2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut"
            }}
            className="relative z-0 w-full h-full bg-cover bg-center mx-auto"
          >
            <p
              className="z-20 absolute left-0 top-10 uppercase
               right-0 text-center text-xl font-mona-sans font-bold mt-2 mb-3 tracking-wider
               text-white text-shadow-black text-shadow-md"
            >
              Complaint Registeration Form
            </p>
            <div className="flex justify-center items-center bg-custom-radial">

            <Image
              src={images.ComplaintPicture}
              alt="shopping-cart"
              width={400}
              height={600}
              className="mx-auto h-9/12 shadow-2xl rounded-xl"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintRegisteration;
