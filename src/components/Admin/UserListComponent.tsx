"use client";

import { useUserStore } from "@/features/UserStore";
import { IUser } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CustomToggleButton from "../CustomToggleButton";
import { toast } from "react-toastify";

const UserListComponent = () => {
  const { users } = useUserStore();
  const [userslist, setUserslist] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleToggle = async (userId: string, status: boolean) => {
    // console.log("User ID:", userId, "New Status:", status);
    try {
      setIsLoading(true);
      setUserslist((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isActive: status } : user
        )
      );
      const response = await axios.put(
        `/api/complaints/auth/update-user/${userId}`,
        {
          isActive: status,
        }
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message, { autoClose: 1500 });
      } else {
        toast.error(message, { autoClose: 1500 });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setUserslist(users);
  }, [users]);
  return (
    <div>
      {isLoading && <Spinner />}
      {userslist.length === 0 && <Spinner />}
      <Table className="">
        <TableCaption>All Users List</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {["Name", "Email", "Phone", "Role", "Action"].map((heading) => (
              <TableHead
                key={heading}
                className="w-[100px] text-center font-extrabold text-gray-700"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {userslist.length > 0 ? (
            userslist.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell className="font-medium  text-center max-w-[180px] truncate">
                    {item.name}
                  </TableCell>
                  <TableCell className="max-w-[200px]  text-center truncate">
                    {item.email}
                  </TableCell>

                  <TableCell className="max-w-[150px] text-center truncate">
                    {item.phone}
                  </TableCell>

                  <TableCell className="max-w-[150px] text-center truncate">
                    {item.role}
                  </TableCell>

                  <TableCell className="flex justify-center items-center">
                    <CustomToggleButton
                      isActive={item.isActive || false}
                      setIsActive={(status) =>
                        handleToggle(item._id as string, status)
                      }
                    />
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

export default UserListComponent;
