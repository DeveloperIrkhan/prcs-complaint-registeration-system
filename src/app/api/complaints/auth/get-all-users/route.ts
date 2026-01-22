import ConnectDbAsync from "@/lib/DbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await ConnectDbAsync();
    const Users = await User.find({});
    if (Users) {
      return NextResponse.json(
        {
          users: Users,
          message: "users fetched successfully!",
          success: true
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Users not found"
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong while fetching users!"
      },
      { status: 500 }
    );
  }
};
