import { complaintPriority } from "@/enums/complaintPriority";
import { SenderType } from "@/enums/SenderType";
import { IComplaint, IMessages } from "@/interfaces/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IComplainstResponse {
  complaints: IComplaint[];
  success?: boolean;
  message?: string;
}
interface IUpdateComplaintResponse {
  complaint: IComplaint;
  success?: boolean;
  message?: string;
}
interface IComplaintResponse {
  message: string;
  success?: boolean;
  registeredComplaint?: IComplaint;
}

interface IUpdateStatus {
  success: boolean;
  conversation: IMessages;
  message: string;
}



export const createComplaintsAPI = createApi({
  reducerPath: "complaintsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  tagTypes: ["complaints"],
  endpoints: (_builder) => ({
    getAllComplaints: _builder.query<IComplainstResponse, void>({
      query: () => ({
        url: "/complaints/get-all-complaints",
        method: "GET"
      }),
      providesTags: ["complaints"]
    }),

    registerComplaint: _builder.mutation<
      {
        success: boolean,
        message: string
        complaint: IComplaint
      },
      FormData>
      ({
        query: (formData) => ({
          url: "/complaints/register",
          method: "POST",
          body: formData
        }),
        invalidatesTags: ["complaints"]
      }
      ),

    sendComplaintEmail: _builder.mutation<
      { success: boolean; message: string },
      { userEmail: string; emailType: string; trackingId: string }
    >({
      query: ({ userEmail, emailType, trackingId }) => ({
        url: "/complaints/email",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, emailType, trackingId })
      })
    }),
    getComplaintById: _builder.query<
      IComplaintResponse,
      { trackingId: string }>({
        query: ({ trackingId }) => ({
          url: `/complaints/get-complaint/${trackingId}`,
          method: "GET"
        }),
        providesTags: ["complaints"]
      }),
    updateComplaint: _builder.mutation<
      IUpdateComplaintResponse,
      { complaintId: string; priority: string; assignedTo: string }
    >({
      query: ({ complaintId, priority, assignedTo }) => ({
        url: `/complaints/update-complaint/${complaintId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority, assignedTo })
      }),
      invalidatesTags: ["complaints"]
    }),

    updateComplaintStatus: _builder.mutation<IUpdateComplaintResponse,
      { complaintId: string, complaintStatus: string }>({
        query: ({ complaintId, complaintStatus }) => ({
          url: `/complaints/update-complaint-status/${complaintId}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complaintStatus })
        }),
        invalidatesTags: ["complaints"]
      }),

    sendMessage: _builder.mutation<IUpdateStatus,
      {
        message: string,
        sender: SenderType,
        complaintId: string
      }>({
        query: ({ complaintId, message, sender }) => ({
          url: `/message/send-recieve/${complaintId}`,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complaintId, message, sender })
        }),
        invalidatesTags: ["complaints"]
      }),
    getAllMessages: _builder.query<IUpdateStatus,
      { complaintId: string }>({
        query: ({ complaintId }) => ({
          url: `/message/get-all-message/${complaintId}`,
          method: "GET",
        }),
        providesTags: ["complaints"],
      }),
  })
});

export const {
  useGetAllComplaintsQuery,
  useRegisterComplaintMutation,
  useGetComplaintByIdQuery,
  useUpdateComplaintMutation,
  useSendComplaintEmailMutation,
  useUpdateComplaintStatusMutation,
  useSendMessageMutation,
  useGetAllMessagesQuery
} = createComplaintsAPI;
