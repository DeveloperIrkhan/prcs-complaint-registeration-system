import { SenderType } from "@/enums/SenderType";
import { IMessages } from "@/interfaces/interfaces";
import React, { useEffect } from "react";

interface IMessagesProps {
  messages: IMessages | null;
}

const Conversation = ({ messages }: IMessagesProps) => {
  useEffect(() => {}, [messages]);

  return (
    <div className="flex flex-col gap-3 py-3 shadow-md overflow-y-auto max-h-80 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {messages &&
      messages.complaintMessage &&
      messages.complaintMessage.length > 0 ? (
        messages.complaintMessage.map((messageBlock, blockIndex) => {
          const time =
            messageBlock.createdAt &&
            new Date(messageBlock.createdAt).toLocaleString();

          return messageBlock.sender === SenderType.isAdmin ? (
            // Admin Message (left side)
            <div key={blockIndex} className="flex justify-start items-start">
              <div className="bg-red-500 text-white px-4 py-2 rounded-tr-2xl rounded-bl-2xl shadow-sm max-w-[70%]">
                <p className="text-sm font-medium">{messageBlock.message}</p>
                <span className="text-xs text-gray-200 block mt-1 text-right">
                  {time}
                </span>
              </div>
            </div>
          ) : (
            // Technician Message (right side)
            <div key={blockIndex} className="flex justify-end items-start">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-tl-2xl rounded-br-2xl shadow-sm max-w-[70%]">
                <p className="text-sm font-medium">{messageBlock.message}</p>
                <span className="text-xs text-gray-200 block mt-1 text-right">
                  {time}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center py-6 italic">
          No messages yet. Start the conversation!
        </p>
      )}
    </div>
  );
};

export default Conversation;
