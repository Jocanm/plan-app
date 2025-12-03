export const calendarEventsTags = {
  byUserAndDate: (userId: string, date: string) =>
    `calendar-events-user-${userId}-date-${date}`,
};

export const clientCalendarEventsTags = {
  byUserAndDate: (userId: string, date: string) =>
    ["calendar-events", userId, date] as const,
};
