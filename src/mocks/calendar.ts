import type { CalendarEvent } from "../types";

export const mockCalendarEvents: CalendarEvent[] = [
  { id: "C00001", userId: "U00003", userName: "陳怡君", role: "PM", status: "休假", startTime: "2026-06-22 09:00", endTime: "2026-06-22 18:00", note: "特休" },
  { id: "C00002", userId: "U00002", userName: "王大明", role: "IT", status: "遠距", startTime: "2026-06-23 09:00", endTime: "2026-06-23 18:00", note: "居家辦公" },
  { id: "C00003", userId: "U00005", userName: "黃國倫", role: "PM", status: "休假", startTime: "2026-06-24 13:00", endTime: "2026-06-24 18:00", note: "家庭事務" },
  { id: "C00004", userId: "U00004", userName: "張家豪", role: "IT", status: "遠距", startTime: "2026-06-25 09:00", endTime: "2026-06-25 18:00" },
  { id: "C00005", userId: "U00007", userName: "吳佳穎", role: "PM", status: "休假", startTime: "2026-06-26 09:00", endTime: "2026-06-26 18:00", note: "特休" },
  { id: "C00006", userId: "U00006", userName: "李明哲", role: "IT", status: "遠距", startTime: "2026-06-29 09:00", endTime: "2026-06-29 18:00", note: "居家辦公" },
  { id: "C00007", userId: "U00003", userName: "陳怡君", role: "PM", status: "遠距", startTime: "2026-07-01 09:00", endTime: "2026-07-01 18:00" },
  { id: "C00008", userId: "U00008", userName: "林怡臻", role: "IT", status: "休假", startTime: "2026-07-03 09:00", endTime: "2026-07-03 18:00", note: "補休" },
];
