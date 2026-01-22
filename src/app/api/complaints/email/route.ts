import { NextResponse } from "next/server";
import { sendEmailAsync } from "@/helpers/EmailSend";

export async function POST(req: Request) {
    try {
        const { userEmail, emailType, trackingId } = await req.json();

        const result = await sendEmailAsync({
            userEmail,
            emailType,
            trackingId,
        });

        return NextResponse.json({
            success: true,
            message: "Email sent successfully!",
            result,
        });
    } catch (error: any) {
        console.error("Email send error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to send email",
            error: error.message,
        });
    }
}
