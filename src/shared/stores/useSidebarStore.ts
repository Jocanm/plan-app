import { create } from "zustand";

type SidebarState = {
  showInlineProjectForm: boolean;
};

type SidebarActions = {
  setShowInlineProjectForm: (val: boolean) => void;
};

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create(
  (set): SidebarStore => ({
    showInlineProjectForm: false,
    setShowInlineProjectForm: val => set({ showInlineProjectForm: val }),
  })
);
