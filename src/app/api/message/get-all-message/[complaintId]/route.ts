// import ConnectDbAsync from "@/lib/DbConnection";
// import Message from "@/models/messages.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { complaintId: string } }
// ) {
//   await ConnectDbAsync();

//   try {
//     const { complaintId } = params;
//     console.log("complaintId:", complaintId);

//     const existingMessages = await Message.findOne({ complaintId });

//     if (existingMessages) {
//       return NextResponse.json(
//         {
//           success: true,
//           conversation: existingMessages,
//           message: "Messages fetched successfully.",
//         },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         message: "No messages found for this complaint.",
//       },
//       { status: 404 }
//     );
//   } catch (error) {
//     console.error("Fetch message error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch messages." },
//       { status: 500 }
//     );
//   }
// };



import ConnectDbAsync from "@/lib/DbConnection";
import Message from "@/models/messages.model";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    complaintId: string;
  };
};

export const GET: (
  request: NextRequest,
  context: RouteContext
) => Promise<NextResponse> = async (request, { params }) => {
  await ConnectDbAsync();

  try {
    const { complaintId } = params;
    const existingMessages = await Message.findOne({ complaintId });

    if (existingMessages) {
      return NextResponse.json(
        {
          success: true,
          conversation: existingMessages,
          message: "Messages fetched successfully.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "No messages found for this complaint." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Fetch message error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages." },
      { status: 500 }
    );
  }
};
