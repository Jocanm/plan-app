import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildCalendarEndTime } from "../../../domain/factories";
import {
  CalendarEvent,
  CalendarEventWithTask,
} from "../../../domain/types/calendar-event";
import {
  createCalendarEvent,
  CreateCalendarEventActionPayload,
} from "../../actions/calendar-events.actions";
import { clientCalendarEventsTags } from "../../cache/tags";

type Payload = CreateCalendarEventActionPayload & {
  taskTitle: string;
};

export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ taskTitle: _, ...payload }: Payload) => {
      const response = await createCalendarEvent(payload);
      if (response.error) {
        throw response.error;
      }
      return response.result;
    },

    onMutate: async payload => {
      const prevEvents = queryClient.getQueryData<CalendarEvent[]>(
        clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date)
      );

      const optimisticEvent: CalendarEventWithTask = {
        ...payload,
        date: new Date(payload.date),
        endTime: payload.endTime
          ? new Date(payload.endTime)
          : buildCalendarEndTime(payload.startTime),
        startTime: new Date(payload.startTime),
        createdAt: new Date(),
        updatedAt: new Date(),
        task: {
          id: payload.taskId,
          title: payload.taskTitle,
        },
      };

      queryClient.setQueryData<CalendarEvent[]>(
        clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date),
        prev => {
          return prev ? [...prev, optimisticEvent] : [optimisticEvent];
        }
      );

      return { prevEvents };
    },

    onError: (_, payload, onMutateResult) => {
      queryClient.setQueryData(
        clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date),
        onMutateResult?.prevEvents
      );
    },

    onSettled: async data => {
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: clientCalendarEventsTags.byUserAndDate(
            data.userId,
            data.date.toISOString()
          ),
        });
      }
    },
  });

  return mutation;
};
