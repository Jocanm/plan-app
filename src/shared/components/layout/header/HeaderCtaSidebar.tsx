"use client";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export const HeaderCtaSidebar = () => {
  const t = useTranslations("mobile_header");

  return (
    <Button
      variant="outline"
      size="icon"
      className="group h-10 w-10"
      aria-label={t("open_menu")}
      aria-expanded="false"
    >
      <div className="relative h-5 w-5">
        <span className="absolute left-0 top-1 h-0.5 w-5 bg-current transition-all duration-300 group-hover:top-0.5" />
        <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-all duration-300 group-hover:w-4" />
        <span className="absolute bottom-1 left-0 h-0.5 w-5 bg-current transition-all duration-300 group-hover:bottom-0.5 group-hover:w-3" />
      </div>
    </Button>
  );
};
