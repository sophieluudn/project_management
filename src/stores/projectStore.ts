import { create } from "zustand";
import type { Comment, Project, Requirement } from "../types";
import { mockProjects } from "../mocks/projects";
import { nextSystemId } from "../lib/id";

type ProjectState = {
  projects: Project[];
  addProject: (data: Omit<Project, "id" | "requirements">) => Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addRequirement: (projectId: string, data: Omit<Requirement, "id" | "projectId" | "comments">) => Requirement;
  updateRequirement: (projectId: string, requirementId: string, data: Partial<Requirement>) => void;
  addComment: (projectId: string, requirementId: string, content: string) => void;
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: mockProjects,
  addProject: (data) => {
    const project: Project = { ...data, id: nextSystemId("P", get().projects), requirements: [] };
    set((state) => ({ projects: [project, ...state.projects] }));
    return project;
  },
  updateProject: (id, data) => set((state) => ({ projects: state.projects.map((p) => p.id === id ? { ...p, ...data } : p) })),
  deleteProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  addRequirement: (projectId, data) => {
    const project = get().projects.find((p) => p.id === projectId);
    const requirements = get().projects.flatMap((p) => p.requirements);
    const req: Requirement = { ...data, id: nextSystemId("RQ", requirements), projectId, comments: [] };
    set((state) => ({ projects: state.projects.map((p) => p.id === projectId ? { ...p, requirements: [...p.requirements, req] } : p) }));
    return req;
  },
  updateRequirement: (projectId, requirementId, data) => set((state) => ({ projects: state.projects.map((p) => p.id === projectId ? { ...p, requirements: p.requirements.map((r) => r.id === requirementId ? { ...r, ...data } : r) } : p) })),
  addComment: (projectId, requirementId, content) => {
    const comments = get().projects.flatMap((p) => p.requirements.flatMap((r) => r.comments));
    const comment: Comment = { id: nextSystemId("CM", comments), requirementId, userName: "Sophie Lu", role: "平台管理員", content, createdAt: new Date().toLocaleString("sv-SE", { hour12: false }).slice(0, 16) };
    set((state) => ({ projects: state.projects.map((p) => p.id === projectId ? { ...p, requirements: p.requirements.map((r) => r.id === requirementId ? { ...r, comments: [...r.comments, comment] } : r) } : p) }));
  },
}));
