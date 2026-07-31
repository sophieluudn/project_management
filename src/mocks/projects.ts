import type { Project, Requirement } from "../types";

const names = ["智慧客服系統", "行動銀行 App", "內部流程管理系統", "品牌官網改版", "會員中心 App", "數據分析平台", "電商平台", "人資管理系統", "預約服務 App", "知識庫網站"];
const types = ["平台", "iOS", "後台", "Android", "模組", "平台", "Android", "後台", "iOS", "平台"];
const progress = ["開發中", "內測中", "規劃中", "待開發", "公測中", "開發中", "已上線", "已上線", "待上線", "暫停"];
const pms = ["Sophie Lu", "陳怡君", "黃國倫", "吳佳穎"];
const its = [["王大明", "張家豪"], ["李明哲"], ["王大明", "林怡臻"], ["張家豪"], ["李明哲", "林怡臻"]];

function requirements(projectId: string, index: number): Requirement[] {
  return ["登入與權限流程", "核心功能與資料驗證"].map((title, i) => {
    const id = `RQ${String(index * 2 + i + 1).padStart(5, "0")}`;
    return {
      id,
      projectId,
      title,
      itMembers: its[(index + i) % its.length],
      progress: i === 0 ? progress[index] : "待開發",
      description: i === 0 ? "完成登入驗證、角色判斷與必要的例外處理。" : "依規格完成核心流程，並補齊表單驗證與操作回饋。",
      comments: [{ id: `CM${String(index * 2 + i + 1).padStart(5, "0")}`, requirementId: id, userName: pms[index % pms.length], role: "PM", content: "請依排定時程進行，若有阻礙請在此留言同步。", createdAt: `2026-06-${String(10 + index).padStart(2, "0")} 10:30` }],
    };
  });
}

export const mockProjects: Project[] = names.map((productName, i) => {
  const id = `P${String(i + 1).padStart(5, "0")}`;
  return {
    id,
    productType: types[i],
    productName,
    version: `v${1 + Math.floor(i / 3)}.${i % 4}.${i % 3}`,
    progress: progress[i],
    pm: pms[i % pms.length],
    itMembers: its[i % its.length],
    devStartDate: `2026-${String(1 + (i % 5)).padStart(2, "0")}-${String(5 + i).padStart(2, "0")}`,
    internalTestStartDate: `2026-${String(4 + (i % 4)).padStart(2, "0")}-10`,
    publicTestStartDate: i > 1 ? `2026-${String(5 + (i % 3)).padStart(2, "0")}-20` : undefined,
    expectedReleaseDate: `2026-${String(7 + (i % 4)).padStart(2, "0")}-01`,
    actualReleaseDate: progress[i] === "已上線" ? `2026-06-${String(12 + i).padStart(2, "0")}` : undefined,
    releaseItems: "改善操作流程、提升系統穩定性，並完成本版需求項目。",
    requirements: requirements(id, i),
  };
});
