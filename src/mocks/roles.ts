import type { Role } from "../types";

export const projectPermissions = ["查看專案", "新增專案", "編輯專案", "查看需求", "新增需求", "編輯需求", "需求留言", "團隊行事曆"];
export const adminPermissions = ["產品管理", "狀態設定", "角色管理", "使用者管理"];

export const mockRoles: Role[] = [
  { id: "R00001", name: "平台管理員", status: "enabled", permissions: [...projectPermissions, ...adminPermissions] },
  { id: "R00002", name: "PM", status: "enabled", permissions: projectPermissions },
  { id: "R00003", name: "IT", status: "enabled", permissions: ["查看專案", "查看需求", "編輯需求", "需求留言", "團隊行事曆"] },
];
