import { create } from "zustand";
import type { CalendarEvent } from "../types";
import { mockCalendarEvents } from "../mocks/calendar";
import { nextSystemId } from "../lib/id";

type CalendarState = {
  events: CalendarEvent[];
  addEvent: (data: Omit<CalendarEvent, "id">) => void;
  updateEvent: (id: string, data: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  events: mockCalendarEvents,
  addEvent: (data) => set((state) => ({ events: [{ ...data, id: nextSystemId("C", state.events) }, ...state.events] })),
  updateEvent: (id, data) => set((state) => ({ events: state.events.map((e) => e.id === id ? { ...e, ...data } : e) })),
  deleteEvent: (id) => set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
}));
