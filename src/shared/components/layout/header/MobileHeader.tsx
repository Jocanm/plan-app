import { useTranslations } from "next-intl";
import { HeaderCtaCalendar } from "./HeaderCtaCalendar";
import { HeaderCtaSidebar } from "./HeaderCtaSidebar";

export const MobileHeader = () => {
  const t = useTranslations("common");

  return (
    <header
      className="xl:hidden sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      role="banner"
    >
      <div className="flex h-14 items-center justify-between px-4">
        <HeaderCtaSidebar />

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-lg font-bold text-foreground">{t("app_name")}</h1>
        </div>

        <HeaderCtaCalendar />
      </div>
    </header>
  );
};
