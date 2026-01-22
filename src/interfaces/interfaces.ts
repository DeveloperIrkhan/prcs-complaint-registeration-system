import { complaintPriority } from "@/enums/complaintPriority";
import { complaintStatus } from "@/enums/complaintStatus";
import { ComplaintType } from "@/enums/ComplaintType/ComplaintType";
import { SenderType } from "@/enums/SenderType";
import { userRole } from "@/enums/userRole";
import { Types } from "mongoose";

//complaint registration interface
export interface IComplaintModels {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  designation?: string;
  department: string;
  complaint: string;
  complaintType: ComplaintType;
  assignedTo?: Types.ObjectId | null;
  priority?: complaintPriority;
  complaintStatus?: complaintStatus;
  registrationTime: Date;
  completionTime?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  message: string;
  sender: SenderType;
  isRead: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IMessages {
  complaintId: string;
  complaintMessage?: IMessage[];
  updatedAt: Date;
  createdAt: Date;
}

export interface IComplaint {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  designation?: string;
  department: string;
  complaint: string;
  complaintType: ComplaintType;
  assignedTo?: string | null;
  priority?: complaintPriority;
  complaintStatus?: complaintStatus;
  registrationTime: string;
  completionTime?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface IUserModel {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: userRole;
  isActive?: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string;
  verifyToken?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  phone?: string;
  role?: userRole;
}

export interface ITask {
  complaint: Types.ObjectId;
  assignedBy: Types.ObjectId;
  assignedTo: Types.ObjectId;
  status: complaintStatus;
  notes?: string;
  completedAt?: Date;
}
