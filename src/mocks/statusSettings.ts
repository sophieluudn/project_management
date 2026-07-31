import type { StatusSetting } from "../types";

export const mockStatusSettings: StatusSetting[] = [
  ...["規劃中", "待開發", "開發中", "內測中", "公測中", "待上線", "已上線", "暫停", "取消"].map((name, i) => ({ id: `S${String(i + 1).padStart(5, "0")}`, name, sort: i + 1, enabled: true, category: "progress" as const })),
  ...["休假", "遠距"].map((name, i) => ({ id: `S${String(i + 10).padStart(5, "0")}`, name, sort: i + 1, enabled: true, category: "leave" as const })),
  ...["Android", "iOS", "平台", "模組", "後台", "API"].map((name, i) => ({ id: `S${String(i + 12).padStart(5, "0")}`, name, sort: i + 1, enabled: true, category: "product" as const })),
];
