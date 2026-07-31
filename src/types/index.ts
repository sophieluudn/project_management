export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "pm" | "it";
};

export type Comment = {
  id: string;
  requirementId: string;
  userName: string;
  role: string;
  content: string;
  createdAt: string;
};

export type Requirement = {
  id: string;
  projectId: string;
  title: string;
  itMembers: string[];
  progress: string;
  description: string;
  comments: Comment[];
};

export type Project = {
  id: string;
  productType: string;
  productName: string;
  version: string;
  progress: string;
  pm: string;
  itMembers: string[];
  scheduleCalculationMode?: "forward" | "backward";
  devWorkDays?: number;
  internalTestWorkDays?: number;
  publicTestWorkDays?: number;
  devStartDate?: string;
  devCompletedDate?: string;
  internalTestStartDate?: string;
  internalTestCompletedDate?: string;
  publicTestStartDate?: string;
  publicTestCompletedDate?: string;
  expectedReleaseDate?: string;
  actualReleaseDate?: string;
  releaseItems?: string;
  requirements: Requirement[];
};

export type CalendarEvent = {
  id: string;
  userId: string;
  userName: string;
  role: "PM" | "IT";
  status: string;
  startTime: string;
  endTime: string;
  note?: string;
};

export type Product = {
  id: string;
  name: string;
  productType: string;
  status: "enabled" | "disabled";
};

export type Role = {
  id: string;
  name: string;
  status: "enabled" | "disabled";
  permissions: string[];
};

export type User = {
  id: string;
  name: string;
  account: string;
  email: string;
  roleId: string;
  productIds: string[];
  status: "enabled" | "disabled";
};

export type StatusSetting = {
  id: string;
  name: string;
  sort: number;
  enabled: boolean;
  category: "progress" | "leave" | "product";
};
