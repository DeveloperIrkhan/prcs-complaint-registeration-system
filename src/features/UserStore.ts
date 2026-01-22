import { IUser } from "@/interfaces/interfaces";
import { create } from "zustand";

interface IUserStore {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users })
}));
