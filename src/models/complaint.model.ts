import mongoose from "mongoose";
import { complaintStatus } from "../enums/complaintStatus";
import { IComplaintModels } from "@/interfaces/interfaces";
import { complaintPriority } from "@/enums/complaintPriority";
import { ComplaintType } from "@/enums/ComplaintType/ComplaintType";

const complaintSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: [true, "name must required!"] },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required!"]
    },
    phone: { type: String },
    designation: { type: String },
    department: { type: String, required: [true, "department is required!"] },
    complaintType: {
      type: String,
      enum: Object.values(ComplaintType),
      required: true
    },
    complaint: { type: String, required: [true, "complaint is requied must"] },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Technician
      default: null
    },
    priority: {
      type: String,
      enum: Object.values(complaintPriority),
      default: complaintPriority.low
    },
    complaintStatus: {
      type: String,
      enum: Object.values(complaintStatus),
      default: complaintStatus.incomplete
    },
   
    registrationTime: { type: Date, default: Date.now },
    completionTime: { type: Date, default: null }
  },
  { timestamps: true }
);

const Complaint =
  mongoose.models.Complaint ||
  mongoose.model<IComplaintModels>("Complaint", complaintSchema);

export default Complaint;

