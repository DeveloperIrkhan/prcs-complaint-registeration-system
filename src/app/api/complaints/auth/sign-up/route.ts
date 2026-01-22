import { hashingPassword } from "@/helpers/authHelper";
import ConnectDbAsync from "@/lib/DbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await ConnectDbAsync();

  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNo, password } = body;
    console.log("body", body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "this user already existed"
      });
    }

    const hashedPassword = await hashingPassword(password);
    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
      phone: phoneNo
    });

    if (!newUser) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Error while creating new user"
      });
    }
    const createdUser = await User.findById(newUser._id).select(
      "-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
    );
    return NextResponse.json(
      {
        success: true,
        user: createdUser,
        message: "User created successfully!"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "error while posting data",
      error
    });
  }
};
