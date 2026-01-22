"use client";
import Spinner from "@/components/Spinner/Spinner";
import { complaintStatus } from "@/enums/complaintStatus";
import { useGetComplaintByIdQuery } from "@/features/ComplaijntAPI";
import { useGetAllUserQuery } from "@/features/UserAPI";
import { useUserStore } from "@/features/UserStore";
import { IComplaint } from "@/interfaces/interfaces";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const params = useParams();
  const trackingId = params?.trackingId as string;
  const [complaint, setComplaint] = useState<IComplaint | null>(null);
  const [username, setUsername] = useState<string>("");
  const { data, isLoading, isFetching } = useGetComplaintByIdQuery({
    trackingId
  });
  const { users, setUsers } = useUserStore();
  const { data: userData } = useGetAllUserQuery(undefined, {
    skip: users.length > 0
  });
  useEffect(() => {
    if (userData?.users) {
      setUsers(userData.users);
    }
  }, [userData]);

  useEffect(() => {
    if (!trackingId || !data?.success) return;
    if (isLoading || isFetching) return;
    data.registeredComplaint !== null &&
      toast.success(data.message || "complaint Status");

    setComplaint(data.registeredComplaint ?? null);
    const assignedUser = users.find(
      (x) => x._id === data.registeredComplaint?.assignedTo
    );
    setUsername(assignedUser?.name || "Technician");
  }, [trackingId, data, isLoading, isFetching, users]);

  useEffect(() => {
    console.log(username);
  }, [username]);

  const statuses = [
    complaintStatus.incomplete,
    complaintStatus.pending,
    complaintStatus.in_progress,
    complaintStatus.resolved,
    complaintStatus.closed
  ];
  const currentStatusIndex = complaint?.complaintStatus
    ? statuses.findIndex(
        (s) => s.toLowerCase() === complaint.complaintStatus?.toLowerCase()
      )
    : -1;
  useEffect(() => {}, [complaint]);
  return (
    <div className="min-h-screen flex justify-center items-center bg-custom-radial px-2 sm:px-4">
      {(isLoading || isFetching) && <Spinner />}
      <div className="w-full max-w-md sm:max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-red-500 mb-4">
          Complaint Tracking
        </h1>

        {complaint != null ? (
          <div className="mt-4 sm:mt-8">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700 text-center sm:text-left">
              Status:{" "}
              <span className="text-red-600 capitalize">
                {complaint.complaintStatus?.replace("_", " ")}
              </span>
            </h2>

            {/* Progress Tracker */}
            <div className="relative flex justify-between items-center mb-6 sm:mb-8 px-1 sm:px-2 overflow-x-auto">
              {/* Base Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] sm:h-[3px] bg-gray-300 -translate-y-1/2 z-0 rounded-full"></div>

              {/* Filled Line */}
              <div
                className="absolute top-1/2 left-0 h-[2px] sm:h-[3px] bg-red-600 -translate-y-1/2 z-10 rounded-full transition-all duration-700"
                style={{
                  width: `${
                    ((currentStatusIndex + 1) / statuses.length) * 100
                  }%`
                }}
              ></div>

              {statuses.map((status, index) => {
                const isActive = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                return (
                  <div
                    key={status}
                    className="flex flex-col items-center text-center min-w-[60px] sm:min-w-[80px]"
                  >
                    {/* Bullet */}
                    <div
                      className={`z-20 flex justify-center mt-0 md:mt-3 items-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[2px] sm:border-[3px] transition-all duration-500
                    ${
                      isActive
                        ? "bg-red-600 border-red-600"
                        : "bg-white border-gray-300"
                    }
                    ${isCurrent ? "scale-110 ring-4 ring-red-200" : ""}
                  `}
                      style={{ transform: "translateY(14px)" }}
                    ></div>

                    {/* Label */}
                    <p
                      className={`text-[10px] sm:text-xs mt-4 sm:mt-6 capitalize ${
                        isActive
                          ? "text-red-600 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {status.replace("_", " ")}
                    </p>
                  </div>
                );
              })}
            </div>

            <hr className="my-3 border-gray-300" />
            <p className="text-base sm:text-lg font-semibold mb-2">
              Complaint details
            </p>
            <div className="mt-3 sm:mt-6 bg-red-100 p-3 sm:p-4 rounded-lg border border-blue-100 space-y-1 sm:space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Name:</strong> {complaint.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {complaint.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {complaint.complaint}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Priority set:</strong> {complaint.priority}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Assign to:</strong>{" "}
                {complaint.assignedTo ? username : "not yet assigned to"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong>{" "}
                {complaint.updatedAt
                  ? new Date(complaint.updatedAt).toLocaleString()
                  : "Not available"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-red-600 bg-red-300 rounded-lg w-full p-3 text-center">
            No record found
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
