import { create } from "zustand";
import type { Product, Role, StatusSetting, User } from "../types";
import { mockProducts } from "../mocks/products";
import { mockRoles } from "../mocks/roles";
import { mockUsers } from "../mocks/users";
import { mockStatusSettings } from "../mocks/statusSettings";
import { nextSystemId } from "../lib/id";

type AdminState = {
  products: Product[];
  roles: Role[];
  users: User[];
  statusSettings: StatusSetting[];
  addProduct: (data: Omit<Product, "id">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  addRole: (data: Omit<Role, "id">) => void;
  updateRole: (id: string, data: Partial<Role>) => void;
  addUser: (data: Omit<User, "id">) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  addStatus: (data: Omit<StatusSetting, "id">) => void;
  updateStatus: (id: string, data: Partial<StatusSetting>) => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  products: mockProducts,
  roles: mockRoles,
  users: mockUsers,
  statusSettings: mockStatusSettings,
  addProduct: (data) => set((s) => ({ products: [...s.products, { ...data, id: nextSystemId("PD", s.products) }] })),
  updateProduct: (id, data) => set((s) => ({ products: s.products.map((x) => x.id === id ? { ...x, ...data } : x) })),
  addRole: (data) => set((s) => ({ roles: [...s.roles, { ...data, id: nextSystemId("R", s.roles) }] })),
  updateRole: (id, data) => set((s) => ({ roles: s.roles.map((x) => x.id === id ? { ...x, ...data } : x) })),
  addUser: (data) => set((s) => ({ users: [...s.users, { ...data, id: nextSystemId("U", s.users) }] })),
  updateUser: (id, data) => set((s) => ({ users: s.users.map((x) => x.id === id ? { ...x, ...data } : x) })),
  addStatus: (data) => set((s) => ({ statusSettings: [...s.statusSettings, { ...data, id: nextSystemId("S", s.statusSettings) }] })),
  updateStatus: (id, data) => set((s) => ({ statusSettings: s.statusSettings.map((x) => x.id === id ? { ...x, ...data } : x) })),
}));
