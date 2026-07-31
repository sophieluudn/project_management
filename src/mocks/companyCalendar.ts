export type CompanyCalendar = {
  holidays: string[];
  workingDays: string[];
};

// MVP mock：日後可直接替換為公司行事曆 API 回傳資料。
export const nationalHolidays = [
  "2026-01-01",
  "2026-02-16", "2026-02-17", "2026-02-18", "2026-02-19", "2026-02-20",
  "2026-02-27",
  "2026-04-03", "2026-04-06",
  "2026-05-01",
  "2026-06-19",
  "2026-09-25",
  "2026-10-09", "2026-10-26",
  "2026-12-25",
];

export const mockCompanyCalendar: CompanyCalendar = {
  holidays: ["2026-08-14", "2026-12-31"],
  workingDays: ["2026-09-19"],
};
