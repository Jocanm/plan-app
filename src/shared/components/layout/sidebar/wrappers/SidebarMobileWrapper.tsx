"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { useUiStore } from "../../../../stores/useUiStore";

interface SidebarMobileWrapperProps {
  children: React.ReactNode;
}

export const SidebarMobileWrapper = ({
  children,
}: SidebarMobileWrapperProps) => {
  const t = useTranslations("sidebar.mobile");
  const isOpen = useUiStore(state => state.showSidebar);
  const setShowSidebar = useUiStore(state => state.setShowSidebar);

  return (
    <Sheet open={isOpen} onOpenChange={setShowSidebar}>
      <SheetContent side="left">
        <SheetHeader className="sr-only">
          <SheetTitle>{t("a11y_title")}</SheetTitle>
          <SheetDescription>{t("a11y_description")}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
