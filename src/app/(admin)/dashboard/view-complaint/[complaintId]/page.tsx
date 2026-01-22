"use client";

import { useComplaintStore } from "@/features/store";
import { IComplaint, IMessages } from "@/interfaces/interfaces";
import { complaintPriority } from "@/enums/complaintPriority";
import { complaintStatus } from "@/enums/complaintStatus";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useUserStore } from "@/features/UserStore";
import Spinner from "@/components/Spinner/Spinner";
import {
  useGetAllMessagesQuery,
  useSendMessageMutation,
  useUpdateComplaintMutation
} from "@/features/ComplaijntAPI";
import { SenderType } from "@/enums/SenderType";
import { Send } from "lucide-react";
import axios from "axios";
import Conversation from "@/components/Admin/Conversation";

const Page = () => {
  const params = useParams();
  const Id = params?.complaintId as string;
  const { complaints } = useComplaintStore();
  const { users } = useUserStore();
  const [singleComplaint, setSingleComplaint] = useState<IComplaint | null>(
    null
  );
  const [status, setStatus] = useState<complaintStatus | "">("");
  const [priority, setPriority] = useState<complaintPriority | "">("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [inputComment, setInputComment] = useState<string>("");
  const [messages, setMessages] = useState<IMessages | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [complaintId, setCompalintId] = useState("");
  const [updateComplaint] = useUpdateComplaintMutation();
  const [sendMessage] = useSendMessageMutation();
  const { data, isFetching } = useGetAllMessagesQuery({
    complaintId: Id
  });
  useEffect(() => {
    if (complaints.length > 0 && Id) {
      const found = complaints.find((item) => item._id === Id);
      // const foundMessages = messages.find((item)=? Item._id === Id)
      if (found) {
        setCompalintId(found._id);
        setSingleComplaint(found);
        setStatus(found.complaintStatus ?? "");
        setPriority(found.priority ?? "");
        setAssignedTo(found.assignedTo ?? "");
        // setMessages(found.foundMessages ?? []);
      }
    }
  }, [complaints, Id]);
  useEffect(() => {
    if (data?.conversation) {
      setMessages(data?.conversation);
    }
  }, [data]);
  const handleSend = async (complaintId: string) => {
    setIsLoading(true);
    if (!inputComment.trim()) return;
    try {
      const response = await sendMessage({
        complaintId,
        message: inputComment,
        sender: SenderType.isAdmin
      }).unwrap();
      console.log(response);
      setMessages(response?.conversation ?? null);
      toast.success(response.message);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
      setInputComment("");
    }
  };

  useEffect(() => {
    // console.log("users from store updated:", users);
  }, [users]);

  const handleUpdate = async () => {
    if (!singleComplaint) return;
    setIsLoading(true);

    try {
      console.log("sending data", complaintId, priority, assignedTo);
      var response = await updateComplaint({
        complaintId,
        priority,
        assignedTo
      }).unwrap();

      if (response?.success) {
        toast.success(response.message, { autoClose: 2000 });
        const upatedComplaint: IComplaint = response.complaint;
        setPriority(upatedComplaint.priority ?? complaintPriority.low);
        setAssignedTo(upatedComplaint.assignedTo ?? "");
      } else {
        toast.error(response.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong while updating");
    } finally {
      setIsLoading(false);
    }
  };

  if (!singleComplaint) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No complaint found with ID: {Id}
      </p>
    );
  }
  const dateTime = new Date(singleComplaint.registrationTime).toDateString();
  const time = new Date(singleComplaint.registrationTime).toTimeString();
  return (
    <div className="max-w-3xl mx-auto mt-10">
      {isLoading && <Spinner />}
      <Card className="shadow-md border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Complaint Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-100 rounded-md shadow-lg p-2 w-full">
            <p className="text-gray-600 font-medium text-lg">
              User Information
            </p>
            <div className="flex flex-col md:flex-row gap-3 justify-around w-full mt-3">
              <div>
                <Label className="text-gray-600">Name of Applicant</Label>
                <p className="font-medium">
                  {singleComplaint.name || "No Name provided"}
                </p>
              </div>

              <div>
                <Label className="text-gray-600">Department</Label>
                <p className="text-gray-700">
                  {singleComplaint.department || "No Department available"}
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Designation</Label>
                <p className="text-gray-700">
                  {singleComplaint.designation || "No Designation available"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-md shadow-lg p-2 w-full">
            <p className="text-gray-600 font-medium text-lg">
              Complaint Information
            </p>
            <div className="flex md:flex-row flex-col gap-3 justify-around w-full mt-3">
              <div className="w-1/3">
                <Label className="text-gray-600">Complaint ID</Label>
                <p className="font-medium">{singleComplaint._id}</p>
              </div>

              <div className="w-2/3">
                <Label className="text-gray-600">Description</Label>
                <p className="text-gray-700">
                  {singleComplaint.complaint || "No description available"}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 mt-4 gap-4">
              <div>
                <Label className="my-2">Status</Label>
                <Select
                  value={status}
                  disabled
                  onValueChange={(value: complaintStatus) => setStatus(value)}
                >
                  <SelectTrigger className="w-full bg-white mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(complaintStatus).map((statusOption) => (
                      <SelectItem key={statusOption} value={statusOption}>
                        {statusOption.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="my-2">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value: complaintPriority) =>
                    setPriority(value)
                  }
                >
                  <SelectTrigger className="w-full bg-white border mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(complaintPriority).map((priorityOption) => (
                      <SelectItem key={priorityOption} value={priorityOption}>
                        {priorityOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="my-2">Task Assign To</Label>
                <Select
                  value={assignedTo}
                  onValueChange={(value) => setAssignedTo(value)}
                >
                  <SelectTrigger className="w-full bg-white border mt-1">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((item) => (
                      <SelectItem
                        key={item._id ?? item.name}
                        value={item._id ?? ""}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto p-4 flex flex-col">
            {/* Header */}
            <div className="pb-2 mb-3">
              <p className="text-xl font-semibold text-gray-800">Messages</p>
            </div>

            {/* Messages container */}
            {messages && (
              <Conversation messages={(messages as IMessages) || null} />
            )}

            {/* Input section */}
            <div className="mt-4 flex items-center gap-3 pt-3">
              <input
                value={inputComment}
                type="text"
                onChange={(e) => setInputComment(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSend(singleComplaint._id)
                }
                className="flex-1 border border-gray-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Type your message..."
              />
              <button
                disabled={!inputComment.trim() || isLoading}
                onClick={() => handleSend(singleComplaint._id)}
                className={`p-3 rounded-full text-white transition-all duration-200 ${
                  inputComment.trim()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-4 text-gray-400">
            <Label className="font-bold uppercase">Registeration Time</Label>
            <p className="font-normal">{dateTime}</p>
            <p className="font-normal">{time}</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              className="px-6 py-2 rounded-lg  text-white  hoverEffect bg-red-400 hover:bg-red-600 transition"
            >
              {isLoading ? "Updating..." : "Update Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
