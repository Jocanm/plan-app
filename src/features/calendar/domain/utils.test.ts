import { describe, expect, it } from "vitest";
import {
  formatEventTime,
  getEventDurationMinutes,
  isShortEvent,
  toCalendarDateISO,
} from "./utils";

describe("Calendar Utils", () => {
  describe("Date Utils - toCalendarDateISO", () => {
    describe("Standard usage", () => {
      it("should correctly format a mid-day date", () => {
        // October 25, 2023, 10:00 AM Local Time
        const localDate = new Date(2023, 9, 25, 10, 0, 0);

        const result = toCalendarDateISO(localDate);

        expect(result).toBe("2023-10-25T00:00:00.000Z");
      });
    });

    describe("Edge cases (Timezone safety)", () => {
      it("should maintain the same day even late at night (e.g., 11:00 PM)", () => {
        // October 25, 2023, 11:00 PM Local Time
        // This ensures we don't accidentally jump to the next day in UTC
        const localLateNight = new Date(2023, 9, 25, 23, 0, 0);

        const result = toCalendarDateISO(localLateNight);

        expect(result).toBe("2023-10-25T00:00:00.000Z");
      });

      it("should maintain the same day early in the morning (e.g., 00:01 AM)", () => {
        // October 25, 2023, 00:01 AM Local Time
        const localEarlyMorning = new Date(2023, 9, 25, 0, 1, 0);

        const result = toCalendarDateISO(localEarlyMorning);

        expect(result).toBe("2023-10-25T00:00:00.000Z");
      });
    });

    describe("Calendar Rollovers", () => {
      it("should handle month rollover correctly (e.g., Oct 31st)", () => {
        // October 31, 2023, 11:59 PM Local Time
        const endOfMonth = new Date(2023, 9, 31, 23, 59, 59);

        const result = toCalendarDateISO(endOfMonth);

        expect(result).toBe("2023-10-31T00:00:00.000Z");
      });

      it("should handle year rollover correctly (e.g., Dec 31st)", () => {
        // December 31, 2023, 11:59 PM Local Time
        const endOfYear = new Date(2023, 11, 31, 23, 59, 59);

        const result = toCalendarDateISO(endOfYear);

        expect(result).toBe("2023-12-31T00:00:00.000Z");
      });
    });
  });

  describe("Time Formatting - formatEventTime", () => {
    describe("Short format (start time only)", () => {
      it("should format morning time in short mode (English)", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 0, 0);

        const result = formatEventTime({
          start,
          end,
          locale: "en",
          short: true,
        });

        expect(result).toBe("9:00 AM");
      });

      it("should format afternoon time in short mode (English)", () => {
        const start = new Date(2023, 9, 25, 14, 30, 0);
        const end = new Date(2023, 9, 25, 15, 30, 0);

        const result = formatEventTime({
          start,
          end,
          locale: "en",
          short: true,
        });

        expect(result).toBe("2:30 PM");
      });

      it("should format midnight in short mode (English)", () => {
        const start = new Date(2023, 9, 25, 0, 0, 0);
        const end = new Date(2023, 9, 25, 1, 0, 0);

        const result = formatEventTime({
          start,
          end,
          locale: "en",
          short: true,
        });

        expect(result).toBe("12:00 AM");
      });
    });

    describe("Long format (time range)", () => {
      it("should format morning to mid-day range (English)", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 12, 0, 0);

        const result = formatEventTime({
          start,
          end,
          locale: "en",
          short: false,
        });

        expect(result).toBe("9:00 AM - 12:00 PM");
      });

      it("should format afternoon range (English)", () => {
        const start = new Date(2023, 9, 25, 14, 0, 0);
        const end = new Date(2023, 9, 25, 16, 30, 0);

        const result = formatEventTime({
          start,
          end,
          locale: "en",
          short: false,
        });

        expect(result).toBe("2:00 PM - 4:30 PM");
      });

      it("should format range with minutes (English)", () => {
        const start = new Date(2023, 9, 25, 9, 15, 0);
        const end = new Date(2023, 9, 25, 10, 45, 0);

        const result = formatEventTime({
          start,
          end,
          locale: "en",
          short: false,
        });

        expect(result).toBe("9:15 AM - 10:45 AM");
      });
    });

    describe("Locale support", () => {
      it("should format time in Spanish locale", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 0, 0);

        const result = formatEventTime({ start, end, locale: "es" });

        expect(result).toBe("9:00 a. m. - 10:00 a. m.");
      });

      it("should default to English for unknown locale", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 0, 0);

        const result = formatEventTime({ start, end, locale: "unknown" });

        expect(result).toBe("9:00 AM - 10:00 AM");
      });

      it("should handle missing locale parameter (defaults to English)", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 0, 0);

        const result = formatEventTime({ start, end });

        expect(result).toBe("9:00 AM - 10:00 AM");
      });
    });
  });

  describe("Duration Calculation - getEventDurationMinutes", () => {
    describe("Standard durations", () => {
      it("should calculate 60-minute duration", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 0, 0);

        const result = getEventDurationMinutes(start, end);

        expect(result).toBe(60);
      });

      it("should calculate 30-minute duration", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 9, 30, 0);

        const result = getEventDurationMinutes(start, end);

        expect(result).toBe(30);
      });

      it("should calculate 120-minute duration", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 11, 0, 0);

        const result = getEventDurationMinutes(start, end);

        expect(result).toBe(120);
      });

      it("should calculate 15-minute duration", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 9, 15, 0);

        const result = getEventDurationMinutes(start, end);

        expect(result).toBe(15);
      });
    });

    describe("Edge cases", () => {
      it("should return 0 for same start and end time", () => {
        const time = new Date(2023, 9, 25, 9, 0, 0);

        const result = getEventDurationMinutes(time, time);

        expect(result).toBe(0);
      });

      it("should handle duration crossing midnight", () => {
        const start = new Date(2023, 9, 25, 23, 30, 0);
        const end = new Date(2023, 9, 26, 0, 30, 0);

        const result = getEventDurationMinutes(start, end);

        expect(result).toBe(60);
      });

      it("should round fractional minutes", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 9, 0, 33); // 33 seconds

        const result = getEventDurationMinutes(start, end);

        expect(result).toBe(1);
      });
    });
  });

  describe("Event Classification - isShortEvent", () => {
    describe("Short events (< 60 minutes)", () => {
      it("should return true for 30-minute event", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 9, 30, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(true);
      });

      it("should return true for 15-minute event", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 9, 15, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(true);
      });

      it("should return true for 45-minute event", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 9, 45, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(true);
      });
    });

    describe("Long events (≥ 60 minutes)", () => {
      it("should return false for exactly 60-minute event (boundary)", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 0, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(false);
      });

      it("should return false for 90-minute event", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 10, 30, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(false);
      });

      it("should return false for 120-minute event", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 11, 0, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(false);
      });

      it("should return false for multi-hour event", () => {
        const start = new Date(2023, 9, 25, 9, 0, 0);
        const end = new Date(2023, 9, 25, 14, 0, 0);

        const result = isShortEvent(start, end);

        expect(result).toBe(false);
      });
    });
  });
});
