import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types";
import { mockAuthUser } from "../mocks/auth";

type AuthState = {
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null,
  login: () => set({ user: mockAuthUser }),
  logout: () => set({ user: null }),
}), { name: "pmp-auth" }));
