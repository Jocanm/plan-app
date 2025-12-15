"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormatDate } from "../../app/hooks/useFormatDate";
import { useSideCalendarCurrentDate } from "../../app/hooks/useSideCalendarCurrentDate";

export const CalendarHeader = () => {
  const t = useTranslations("calendar.header");
  const { format } = useFormatDate();
  const { currentDate, nextDate, previousDate, goToToday, isToday } =
    useSideCalendarCurrentDate();

  const fullDate = format({ date: currentDate, formatStr: "PPPP" });
  const formattedDate = format({ date: currentDate, formatStr: "EEEE d" });

  return (
    <header
      className="sticky top-0 z-30 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      role="banner"
      aria-label={t("calendarHeader")}
    >
      <div className="flex h-12 items-center justify-between px-3 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("previousDay")}
          className="h-8 w-8"
          onClick={previousDate}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Calendar
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <time
            aria-label={fullDate}
            className="text-sm sm:text-base font-semibold text-foreground"
          >
            {formattedDate}
          </time>

          {!isToday && (
            <Button
              variant="ghost"
              size="icon"
              onClick={goToToday}
              aria-label={t("goToToday")}
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              title={t("goToToday")}
            >
              <Home className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label={t("nextDay")}
          className="h-8 w-8"
          onClick={nextDate}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
