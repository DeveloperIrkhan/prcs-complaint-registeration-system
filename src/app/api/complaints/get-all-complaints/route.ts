import ConnectDbAsync from "@/lib/DbConnection";
import Complaint from "@/models/complaint.model";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  await ConnectDbAsync();

  try {
    const complaints = await Complaint.find({});
    if (!complaints) {
      return NextResponse.json(
        {
          message: "no complaint found",
          success: true
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        complaints,
        message: "complaints fetched successfully!"
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "error while fetching all complainsts",
        success: false
      },
      { status: 400 }
    );
  }
};
