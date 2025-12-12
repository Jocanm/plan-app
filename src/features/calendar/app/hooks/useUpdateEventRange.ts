import { useTranslations } from "next-intl";
import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { toast } from "sonner";
import { CalendarEventData } from "../../domain/types/calendar-event";
import { toCalendarDateISO } from "../../domain/utils";
import { useUpdateCalendarEvent } from "./actions/useUpdateCalendarEvent";

export const useUpdateEventRange = () => {
  const t = useTranslations("calendar.errors");
  const updateMutation = useUpdateCalendarEvent();

  const handleEventRangeUpdate = async (
    data: EventInteractionArgs<CalendarEventData>,
    userId: string
  ) => {
    const newDate = toCalendarDateISO(new Date(data.start));

    try {
      await updateMutation.mutateAsync({
        userId,
        date: newDate,
        id: data.event.id,
        endTime: new Date(data.end).toISOString(),
        startTime: new Date(data.start).toISOString(),
      });
    } catch {
      toast.error(t("update_event_failed"), {
        description: t("update_event_failed_description"),
      });
    }
  };

  return {
    handleEventRangeUpdate,
    ...updateMutation,
  };
};
