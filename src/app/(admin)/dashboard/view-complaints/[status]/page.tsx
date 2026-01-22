"use client";
import { complaintStatus } from "@/enums/complaintStatus";
import { useComplaintStore } from "@/features/store";
import { IComplaint } from "@/interfaces/interfaces";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useUserStore } from "@/features/UserStore";
import { complaintPriority } from "@/enums/complaintPriority";
import Link from "next/link";
import { EyeClosedIcon } from "lucide-react";
const Page = () => {
  const params = useParams();
  const status = params?.status;
  const { complaints } = useComplaintStore();
  const { users } = useUserStore();
  const [allComplaints, setAllComplaints] = useState<IComplaint[] | null>(null);
  useEffect(() => {
    if (complaints.length === 0 || !status) return;

    let filteredComplaints: IComplaint[] = [];

    switch (status) {
      case complaintStatus.closed:
      case complaintStatus.resolved:
        filteredComplaints = complaints.filter(
          (item) =>
            item.complaintStatus === complaintStatus.closed ||
            item.complaintStatus === complaintStatus.resolved
        );
        break;

      case complaintStatus.pending:
      case complaintStatus.incomplete:
        filteredComplaints = complaints.filter(
          (item) =>
            item.complaintStatus === complaintStatus.pending ||
            item.complaintStatus === complaintStatus.incomplete
        );
        break;

      case complaintStatus.in_progress:
        filteredComplaints = complaints.filter(
          (item) => item.complaintStatus === complaintStatus.in_progress
        );
        break;

      case "all":
        filteredComplaints = complaints;
        break;

      default:
        filteredComplaints = [];
    }

    setAllComplaints(filteredComplaints);
  }, [complaints, status]);

  return (
    <div>
      <Table className="">
        <TableCaption>All Complaint register up to date</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {[
              "Username",
              "Type",
              "Assigned To",
              "Status",
              "Priority",
              "Registered",
              "Action"
            ].map((heading) => (
              <TableHead
                key={heading}
                className="w-[100px] text-center font-semibold text-gray-700"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {allComplaints && allComplaints.length > 0 ? (
            allComplaints.map((item, index) => {
              const date = new Date(item.registrationTime).toDateString();
              const assignedUser = users.find((x) => x._id === item.assignedTo);
              return (
                <TableRow key={item._id}>
                  <TableCell className="font-medium  text-center max-w-[180px] truncate">
                    {item.name}
                  </TableCell>
                  <TableCell className="max-w-[200px]  text-center truncate">
                    {item.complaintType}
                  </TableCell>
                  <TableCell className="max-w-[150px] text-center truncate">
                    {assignedUser?.name ? (
                      <p className="border rounded-md">{assignedUser?.name}</p>
                    ) : (
                      "_"
                    )}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex w-full justify-center items-center px-2 py-1 rounded text-xs font-medium ${
                        item.complaintStatus === complaintStatus.pending
                          ? "bg-blue-100 text-blue-700"
                          : item.complaintStatus === complaintStatus.closed ||
                            item.complaintStatus === complaintStatus.resolved
                          ? "bg-green-100 text-green-700"
                          : item.complaintStatus === complaintStatus.in_progress
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.complaintStatus}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={` w-full flex justify-center items-center px-2 py-1 text-xs font-semibold rounded ${
                        item.priority === complaintPriority.high
                          ? "bg-amber-200 text-amber-700"
                          : item.priority === complaintPriority.critical
                          ? "bg-red-200 text-red-800"
                          : item.priority === complaintPriority.medium
                          ? "bg-pink-200 text-pink-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </TableCell>

                  <TableCell className=" text-center">{date}</TableCell>
                  <TableCell className="flex justify-center items-center">
                    <Link href={`/dashboard/view-complaint/${item._id}`}>
                      <span className="flex justify-center items-center p-1 rounded-full bg-blue-50 border border-blue-400 hover:bg-blue-600 text-blue-400 hover:text-white w-6 h-6 transition">
                        <EyeClosedIcon size={20} />
                      </span>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No complaints found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
