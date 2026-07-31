import { mockCompanyCalendar, nationalHolidays, type CompanyCalendar } from "../mocks/companyCalendar";

function toDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function isBusinessDay(date: Date, calendar: CompanyCalendar = mockCompanyCalendar) {
  const value = formatDate(date);
  if (calendar.workingDays.includes(value)) return true;
  if (nationalHolidays.includes(value) || calendar.holidays.includes(value)) return false;
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

export function addBusinessDays(startDate: string, workDays: number, calendar: CompanyCalendar = mockCompanyCalendar) {
  const date = toDate(startDate);
  if (!date || !Number.isInteger(workDays) || workDays < 1) return "";
  let remaining = workDays;
  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() + 1);
    if (isBusinessDay(date, calendar)) remaining -= 1;
  }
  return formatDate(date);
}

export function subtractBusinessDays(endDate: string, workDays: number, calendar: CompanyCalendar = mockCompanyCalendar) {
  const date = toDate(endDate);
  if (!date || !Number.isInteger(workDays) || workDays < 1) return "";
  let remaining = workDays;
  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() - 1);
    if (isBusinessDay(date, calendar)) remaining -= 1;
  }
  return formatDate(date);
}
