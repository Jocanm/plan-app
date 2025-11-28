import { InlineError } from "@/shared/components/errors/inline/InlineError";
import { updateTag } from "next/cache";
import { calendarEventsTags } from "../../app/cache/tags";

interface SideCalendarRequestErrorProps {
  date: string;
  userId: string;
}

export const SideCalendarRequestError = ({
  userId,
  date,
}: SideCalendarRequestErrorProps) => {
  const onRetry = async () => {
    "use server";
    updateTag(calendarEventsTags.byUserAndDate(userId, date));
  };

  return (
    <InlineError
      showDescription
      retryAction={onRetry}
      className="bg-card h-full"
    />
  );
};
