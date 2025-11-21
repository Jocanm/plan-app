"use client";
import { Button } from "@/components/ui";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUiStore } from "../../../stores/useUiStore";

export const HeaderCtaCalendar = () => {
  const t = useTranslations("mobile_header");
  const setShowCalendar = useUiStore(state => state.setShowCalendar);

  return (
    <Button
      size="icon"
      variant="outline"
      aria-expanded="false"
      aria-label={t("open_calendar")}
      className="h-10 w-10 md:hidden"
      onClick={() => setShowCalendar(true)}
    >
      <Calendar size={20} aria-hidden="true" />
    </Button>
  );
};
