import { create } from "zustand";

type UiState = {
  showSidebar: boolean;
  showCalendar: boolean;
};

type UiActions = {
  setShowSidebar: (val: boolean) => void;
  setShowCalendar: (val: boolean) => void;
};

type UiStore = UiState & UiActions;

export const useUiStore = create(
  (set): UiStore => ({
    showSidebar: false,
    showCalendar: false,
    setShowSidebar: val => set({ showSidebar: val }),
    setShowCalendar: val => set({ showCalendar: val }),
  })
);
