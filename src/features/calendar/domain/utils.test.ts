import { describe, expect, it } from "vitest";
import { toCalendarDateISO } from "./utils";

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
});
