import { create } from "zustand";

type SideCalendarState = {
  currentDate: string;
};

type SideCalendarActions = {
  setCurrentDate: (date: string) => void;
};

type SideCalendarStore = SideCalendarState & SideCalendarActions;

export const useSideCalendarStore = create(
  (set): SideCalendarStore => ({
    currentDate: new Date().toISOString(),

    setCurrentDate: (date: string) => set({ currentDate: date }),
  })
);
