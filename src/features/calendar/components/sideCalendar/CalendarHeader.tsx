"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useFormatDate } from "../../app/hooks/useFormatDate";

interface CalendarHeaderProps {
  date: string;
}

export const CalendarHeader = ({ date }: CalendarHeaderProps) => {
  const { format } = useFormatDate();
  const parsedDate = new Date(date);

  const fullDate = format({ date: parsedDate, formatStr: "PPPP" });
  const formattedDate = format({ date: parsedDate, formatStr: "EEEE d" });

  return (
    <header
      className="sticky top-0 z-30 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      role="banner"
      aria-label="Calendar header"
    >
      <div className="flex h-12 items-center justify-between px-3 sm:px-4">
        <Button
          disabled
          variant="ghost"
          size="icon"
          aria-label="Previous day"
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Calendar
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <time
            dateTime={date}
            aria-label={fullDate}
            className="text-sm sm:text-base font-semibold text-foreground"
          >
            {formattedDate}
          </time>
        </div>

        <Button
          disabled
          variant="ghost"
          size="icon"
          aria-label="Next day"
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
