import { create } from "zustand";

export type User = {
  name: string;
  role: "manufacturer" | "distributor" | "admin";
};

type AppState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
