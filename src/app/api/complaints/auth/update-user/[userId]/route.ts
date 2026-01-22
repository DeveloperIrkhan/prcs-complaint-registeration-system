import ConnectDbAsync from "@/lib/DbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) => {
  await ConnectDbAsync();

  try {
    const { userId } = await context.params;
    const body = await request.json();
    const { isActive } = body;
    console.log("response", userId, isActive);
    const userFound = await User.findById(userId);
    if (!userFound) {
      return NextResponse.json(
        {
          success: false,
          message: "Complaint ID doesn't match",
        },
        { status: 404 }
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: isActive },
      { new: true }
    );
    const message = user.isActive
      ? "User activated successfully"
      : "User deactivated successfully";
    return NextResponse.json(
      {
        success: true,
        message: message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while updating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while updating user",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
};
