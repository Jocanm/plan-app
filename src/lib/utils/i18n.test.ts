import { describe, expect, it } from "vitest";
import { getPrimaryLanguage, normalizeLocale } from "./i18n";

describe("I18n - Utils", () => {
  describe("Get primary language", () => {
    it("Should return the same language when there is only one", () => {
      const header = "en";
      const supportedLocales = ["en"];

      const result = getPrimaryLanguage(header, supportedLocales);

      expect(result).toBe(header);
    });

    it("Should return the first language that match when multiple are provided", () => {
      const header = "en,es,fr";
      const supportedLocales = ["fr", "es"];

      const result = getPrimaryLanguage(header, supportedLocales);

      expect(result).toBe("es");
    });

    it("Should return undefined for empty or invalid headers", () => {
      const empty = "";
      const nullValue = null;
      const undefinedValue = undefined;
      const supportedLocales = ["en"];

      const result1 = getPrimaryLanguage(empty, supportedLocales);
      const result2 = getPrimaryLanguage(nullValue, supportedLocales);
      const result3 = getPrimaryLanguage(undefinedValue, supportedLocales);

      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
      expect(result3).toBeUndefined();
    });

    it("Should return undefined for invalid locale", () => {
      const header = "fr,es";
      const supportedLocales = ["en"];

      const result = getPrimaryLanguage(header, supportedLocales);

      expect(result).toBeUndefined();
    });

    it("Should handle uppercase language codes", () => {
      const supportedLocales = ["es"];

      const header = "ES,ES-MX;q=0.9";
      const result = getPrimaryLanguage(header, supportedLocales);
      expect(result).toBe("es");
    });

    it("Should correctly handle regional language tags (e.g., es-MX)", () => {
      const supportedLocales = ["es"];

      const header = "eS-MX,es;q=0.9,en;q=0.8";
      const result = getPrimaryLanguage(header, supportedLocales);
      expect(result).toBe("es");
    });
  });

  describe("Normalize locale", () => {
    it("extracts base locale from regional tag", () => {
      expect(normalizeLocale("es-MX")).toBe("es");
    });

    it("lowercases the locale", () => {
      expect(normalizeLocale("ES")).toBe("es");
    });

    it("handles already normalized locale", () => {
      expect(normalizeLocale("en")).toBe("en");
    });

    it("handles empty string", () => {
      expect(normalizeLocale("")).toBe("");
    });
  });
});
