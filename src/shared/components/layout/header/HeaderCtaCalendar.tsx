"use client";
import { Button } from "@/components/ui";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export const HeaderCtaCalendar = () => {
  const t = useTranslations("mobile_header");

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-10 w-10 md:hidden"
      aria-label={t("open_calendar")}
      aria-expanded="false"
    >
      <Calendar size={20} aria-hidden="true" />
    </Button>
  );
};
