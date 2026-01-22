import ConnectDbAsync from "@/lib/DbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await ConnectDbAsync();
  try {
    const body = await request.json();
    const { email } = body;
    console.log("email", email);
    await User.findByIdAndUpdate(email, {
      $set: {
        refreshToken: null,
        isVerfied: false
      }
    });

    const response = NextResponse.json({
      success: true,
      status: 200,
      message: "user logout successfully"
    });
    response.cookies.set("accessToken", "");
    response.cookies.set("loggedInUser", "");
    response.cookies.set("refreshToken", "");
    return response;
  } catch {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error"
    });
  }
};
