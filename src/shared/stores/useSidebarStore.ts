import { create } from "zustand";

type SidebarState = {
  showInlineProjectForm: boolean;
  setShowInlineProjectForm: (val: boolean) => void;
};

export const useSidebarStore = create(
  (set): SidebarState => ({
    showInlineProjectForm: false,
    setShowInlineProjectForm: val => set({ showInlineProjectForm: val }),
  })
);
