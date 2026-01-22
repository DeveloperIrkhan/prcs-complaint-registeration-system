// models/message.model.js
import { SenderType } from "@/enums/SenderType";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    message: { type: String, },
    sender: {
        type: String,
        enum: Object.values(SenderType),
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }
)




const messageSchema = new mongoose.Schema(
    {
        complaintId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            required: true,
        },
        complaintMessage: {
            type: [commentSchema], default: []
        },
    },
    { timestamps: true }
);

const Message =
    mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
