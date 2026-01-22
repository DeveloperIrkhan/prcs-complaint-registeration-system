import { IComplaint, IUser } from "@/interfaces/interfaces";
import { create } from "zustand";

export interface IComplaintStore {
  complaints: IComplaint[];
  setComplaints: (complaints: IComplaint[]) => void;
  getComplaintsById: (complaintId: string) => void;
}
export const useComplaintStore = create<IComplaintStore>((set, get) => ({
  complaints: [],
  setComplaints: (complaints) => set({ complaints }),
  getComplaintsById(complaintId) {
    const complaint = get().complaints;
    const singleComplaint = complaint.find((item) => item._id === complaintId);
    return singleComplaint ? singleComplaint : null;
  }
}));
