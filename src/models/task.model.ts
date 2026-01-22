import { complaintStatus } from "@/enums/complaintStatus";
import { ITask } from "@/interfaces/interfaces";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Technician
      required: true
    },
    notes: {
      type: String
    },
    status: {
      type: String,
      enum: Object.values(complaintStatus),
      default: complaintStatus.in_progress
    },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Tasks", TaskSchema);

export default Task;
