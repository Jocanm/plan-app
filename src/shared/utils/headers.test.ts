import { describe, expect, it } from "vitest";
import { parseHeadersList } from "./headers";

describe("Headers - utility functions", () => {
  describe("Parse headers list", () => {
    it("Should return empty array for invalid values", () => {
      const nullValue = null;
      const stringSpaceValue = " ";
      const undefinedValue = undefined;

      const result1 = parseHeadersList(nullValue);
      const result2 = parseHeadersList(stringSpaceValue);
      const result3 = parseHeadersList(undefinedValue);

      expect(result1).toEqual([]);
      expect(result2).toEqual([]);
      expect(result3).toEqual([]);
    });

    it("Should parse single header", () => {
      const HEADER = "es";

      const result = parseHeadersList(HEADER);

      expect(result).toEqual(["es"]);
    });

    it("Should parse multiple headers", () => {
      const HEADER = "en,es";

      const result = parseHeadersList(HEADER);

      expect(result).toEqual(["en", "es"]);
    });

    it("Should parse headers with parameters", () => {
      const HEADER = "es-CO,es;q=0.9,en";

      const headersList = parseHeadersList(HEADER);

      expect(headersList).toEqual(["es-CO", "es", "en"]);
    });

    it("Should parse headers with spaces", () => {
      const HEADERS_1 = " en, es ";
      const HEADERS_2 = "es; q=0.9, en; q=0.8";

      const result1 = parseHeadersList(HEADERS_1);
      const result2 = parseHeadersList(HEADERS_2);

      expect(result1).toEqual(["en", "es"]);
      expect(result2).toEqual(["es", "en"]);
    });
  });
});
