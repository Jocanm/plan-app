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

interface SideCalendarMobileWrapperProps {
  children: React.ReactNode;
}

export const SideCalendarMobileWrapper = ({
  children,
}: SideCalendarMobileWrapperProps) => {
  const t = useTranslations("side_calendar.mobile");
  const isOpen = useUiStore(state => state.showCalendar);
  const setShowCalendar = useUiStore(state => state.setShowCalendar);

  return (
    <Sheet open={isOpen} onOpenChange={setShowCalendar}>
      <SheetContent side="right" className="w-4/5">
        <SheetHeader className="sr-only">
          <SheetTitle>{t("a11y_title")}</SheetTitle>
          <SheetDescription>{t("a11y_description")}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
