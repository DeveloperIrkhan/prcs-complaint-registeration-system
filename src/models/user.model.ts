import { userRole } from "@/enums/userRole";
import { IUser } from "@/interfaces/interfaces";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: [true, "name must required"] },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email must required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be at least 8 characters long"],
    },
    phone: {
      type: String,
    },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    refreshToken: { type: String },
    isActive: { type: Boolean, default: false },
    role: {
      type: String,
      enum: Object.values(userRole),
      default: userRole.isTechnician,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
