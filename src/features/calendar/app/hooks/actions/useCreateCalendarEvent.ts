import { logger } from "@/lib/logger";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarEvents } from "../../../domain/events/catalog";
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
  color: string;
  taskTitle: string;
  taskProjectId?: string | null;
};

export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      color: __,
      taskTitle: _,
      taskProjectId: ___,
      ...payload
    }: Payload) => {
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
          color: payload.color,
          title: payload.taskTitle,
          projectId: payload.taskProjectId ?? null,
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

    onError: (error, payload, onMutateResult) => {
      logger.error(
        {
          event: CalendarEvents.createFail,
          userId: payload.userId,
          taskId: payload.taskId,
          date: payload.date,
          startTime: payload.startTime,
          error: error.message || String(error),
        },
        "Calendar event creation mutation failed"
      );

      queryClient.setQueryData(
        clientCalendarEventsTags.byUserAndDate(payload.userId, payload.date),
        onMutateResult?.prevEvents
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
