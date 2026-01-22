import { comparePassword } from "@/helpers/ComparePassword";
import { generateTokens } from "@/helpers/genterateTokens";
import ConnectDbAsync from "@/lib/DbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await ConnectDbAsync();
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "please enter both email and password",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 401,
        }
      );
    }
    const isPasswordMatched = await comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "password doesn't matched",
        },
        {
          status: 401,
        }
      );
    }
    if (existingUser.isActive === false) {
      return NextResponse.json(
        {
          success: false,
          message: "access denied, your account is not active yet",
        },
        {
          status: 401,
        }
      );
    }

    const { accessToken, refreshToken } = await generateTokens(
      existingUser._id
    );
    await User.findByIdAndUpdate(
      existingUser._id,
      { $set: { refreshToken } },
      { new: true }
    );
    // const loggedInUser = await User.findById(existingUser._id).select(
    //   "-createdAt -updatedAt -__v, -_id,-password,-refreshToken"
    // );
    const loggedInUser = await User.findById(existingUser._id).select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      password: 0,
      refreshToken: 0,
    });
    const response = NextResponse.json(
      { success: true, message: "login successfully", loggedInUser },
      { status: 200 }
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 7,
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3,
    });
    response.cookies.set("loggedInUser", loggedInUser, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error while posting data",
      error,
    });
  }
};
