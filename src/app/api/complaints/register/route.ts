import { ComplaintType } from "@/enums/ComplaintType/ComplaintType";
import ConnectDbAsync from "@/lib/DbConnection";
import Complaint from "@/models/complaint.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await ConnectDbAsync();

  try {
    const requestbody = await request.formData();
    const name = requestbody.get("name") as string;
    const email = requestbody.get("email") as string;
    const phone = requestbody.get("phone") as string;
    const complaintType = requestbody.get("complaintType") as ComplaintType;
    const designation = requestbody.get("designation") as string;
    const department = requestbody.get("department") as string;
    const complaint = requestbody.get("complaint") as string;
    console.log("recieving data", name, email, phone, complaintType, designation,
      department, complaint
    )
    const newComplaint = await Complaint.create({
      name: name,
      email: email,
      phone: phone,
      designation: designation,
      department: department,
      complaint: complaint,
      complaintType: complaintType
    });
    if (!newComplaint) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "error while registering compalint"
      });
    }

    const newRegisteredComplaint = await Complaint.findById(newComplaint._id)
    // const newRegisteredComplaint = await Complaint.findById(newComplaint._id).select({
    //   name: 0,
    //   email: 0,
    //   phone: 0,
    //   designation: 0,
    //   department: 0,
    //   complaint: 0,
    //   complaintType: 0,
    //   assignedTo: 0,
    //   priority: 0,
    //   complaintStatus: 0,
    //   registrationTime: 0,
    //   completionTime: 0,
    // });

    // const complaintId = await Complaint.findById(newComplaint._id).select(
    //   "-name -email -phone -designation -department -complaint 
    // -assignedTo -priority -complaintStatus 
    // -registrationTime -complaintType -completionTime"
    // );
    return NextResponse.json({
      status: 201,
      success: true,
      message: "complaint registered",
      complaint: newRegisteredComplaint
    });
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
