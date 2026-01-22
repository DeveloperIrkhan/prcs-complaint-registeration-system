import ConnectDbAsync from "@/lib/DbConnection";
import Message from "@/models/messages.model";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    request: NextRequest,
    context: { params: Promise<{ complaintId: string }> }
) => {
    await ConnectDbAsync();
    try {
        const { complaintId } = await context.params;
        const { message, sender } = await request.json();
        console.log("complaintId", complaintId)
        console.log("message", message)
        console.log("sender", sender)
        const alreadyCreatedMessages = await Message.findOne({ complaintId })
        if (!alreadyCreatedMessages) {
            const newConversation = await Message.create({
                complaintId: complaintId,
                complaintMessage: {
                    message: message,
                    sender: sender,
                    isRead: false
                }
            })
            return NextResponse.json({
                success: true,
                conversation: newConversation,
                message: "message sent!"
            },
                { status: 201 })
        }

        const updatedConversation = await Message.findOneAndUpdate(
            { complaintId },
            {
                $push: {
                    complaintMessage: { message, sender },
                },
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            message: "messages fetched successfully",
            conversation: updatedConversation
        });
    } catch (error) {
        console.error("Send message error:", error);
        return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
    }
}
