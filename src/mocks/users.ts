import type { User } from "../types";

export const mockUsers: User[] = [
  { id: "U00001", name: "Sophie Lu", account: "sophie.lu", email: "sophie@example.com", roleId: "R00001", productIds: ["PD00001", "PD00003"], status: "enabled" },
  { id: "U00002", name: "王大明", account: "daming.wang", email: "daming@example.com", roleId: "R00003", productIds: ["PD00001"], status: "enabled" },
  { id: "U00003", name: "陳怡君", account: "yijun.chen", email: "yijun@example.com", roleId: "R00002", productIds: ["PD00002"], status: "enabled" },
  { id: "U00004", name: "張家豪", account: "jiahao.zhang", email: "jiahao@example.com", roleId: "R00003", productIds: ["PD00002", "PD00004"], status: "enabled" },
  { id: "U00005", name: "黃國倫", account: "guolun.huang", email: "guolun@example.com", roleId: "R00002", productIds: ["PD00003"], status: "enabled" },
  { id: "U00006", name: "李明哲", account: "mingzhe.li", email: "mingzhe@example.com", roleId: "R00003", productIds: ["PD00003", "PD00005"], status: "enabled" },
  { id: "U00007", name: "吳佳穎", account: "jiaying.wu", email: "jiaying@example.com", roleId: "R00002", productIds: ["PD00004"], status: "enabled" },
  { id: "U00008", name: "林怡臻", account: "yizhen.lin", email: "yizhen@example.com", roleId: "R00003", productIds: ["PD00005", "PD00006"], status: "disabled" },
];
