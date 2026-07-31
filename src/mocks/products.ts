import type { Product } from "../types";

export const mockProducts: Product[] = [
  { id: "PD00001", name: "智慧客服系統", productType: "平台", status: "enabled" },
  { id: "PD00002", name: "行動銀行 App", productType: "iOS", status: "enabled" },
  { id: "PD00003", name: "數據分析平台", productType: "平台", status: "enabled" },
  { id: "PD00004", name: "會員中心", productType: "模組", status: "enabled" },
  { id: "PD00005", name: "營運管理後台", productType: "後台", status: "enabled" },
  { id: "PD00006", name: "帳務服務 API", productType: "API", status: "disabled" },
];
