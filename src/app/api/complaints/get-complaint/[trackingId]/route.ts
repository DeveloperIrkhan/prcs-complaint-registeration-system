import ConnectDbAsync from "@/lib/DbConnection";
import Complaint from "@/models/complaint.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ trackingId: string }> }
) => {
  await ConnectDbAsync();

  try {
    const { trackingId } = await context.params;
    const cleanId = trackingId.trim();
    console.log(cleanId);
    const registeredComplaint = await Complaint.findById(cleanId);
    console.log(registeredComplaint);
    if (!registeredComplaint) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Complaint id dosen't matched"
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Complaint found successfully!",
      registeredComplaint
    });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Error while fetching complaint",
      error: (error as Error).message
    });
  }
};
