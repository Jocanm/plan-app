export const CalendarEvents = {
  created: "calendar.create.success",
  createFail: "calendar.create.fail",
  validationFail: "calendar.validation.fail",
  missingUserSession: "calendar.validation.no_user",
  missingSlotValue: "calendar.validation.no_slot",
  invalidDragData: "calendar.validation.invalid_drag",
} as const;
