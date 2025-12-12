import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarEvent } from "../../../domain/types/calendar-event";
import {
  updateCalendarEvent,
  UpdateCalendarEventActionPayload,
} from "../../actions/calendar-events.actions";
import { clientCalendarEventsTags } from "../../cache/tags";

type Payload = UpdateCalendarEventActionPayload & {
  userId: string;
};

export const useUpdateCalendarEvent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await updateCalendarEvent(payload);
      if (response.error) {
        throw response.error;
      }
      return response.result;
    },

    onMutate: async payload => {
      const prevEvents = queryClient.getQueryData<CalendarEvent[]>(
        clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date)
      );

      const currentEvent = prevEvents?.find(event => event.id === payload.id);
      const { date, startTime, endTime } = payload;

      if (currentEvent) {
        const updatedEvent: CalendarEvent = {
          ...currentEvent,
          isOptimistic: true,
          date: new Date(date),
          endTime: endTime ? new Date(endTime) : currentEvent.endTime,
          startTime: startTime ? new Date(startTime) : currentEvent.startTime,
        };

        queryClient.setQueryData<CalendarEvent[]>(
          clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date),
          prev => {
            return prev
              ? prev.map(event =>
                  event.id === payload.id ? updatedEvent : event
                )
              : [];
          }
        );
      }

      return { prevEvents };
    },

    onError: async (_, payload, context) => {
      const { prevEvents } = context ?? {};
      queryClient.setQueryData<CalendarEvent[]>(
        clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date),
        prevEvents
      );
    },

    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({
        queryKey: clientCalendarEventsTags.byUserAndDate(
          variables.userId,
          variables.date
        ),
      });
    },
  });

  return mutation;
};
