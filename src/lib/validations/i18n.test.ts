import { describe, expect, it } from "vitest";
import { isLocaleValid } from "./i18n";

const SUPPORTED_LOCALES = ["en", "es"];

describe("i18n test", () => {
  it("Should validate if single locale is valid", () => {
    const validLocale = "en";
    const invalidLocale = "test";

    const isValid1 = isLocaleValid(validLocale, SUPPORTED_LOCALES);
    const isValid2 = isLocaleValid(invalidLocale, SUPPORTED_LOCALES);

    expect(isValid1).toBe(true);
    expect(isValid2).toBe(false);
  });

  it("Should validate if array of locales is valid", () => {
    const validLocales = ["en", "es"];
    const invalidLocales = ["test2", "test1"];

    const isValid1 = isLocaleValid(validLocales, SUPPORTED_LOCALES);
    const isValid2 = isLocaleValid(invalidLocales, SUPPORTED_LOCALES);

    expect(isValid1).toBe(true);
    expect(isValid2).toBe(false);
  });

  it("Should validate mixed locales", () => {
    const locales = ["en", "invalidLocale"];

    const isValid = isLocaleValid(locales);

    expect(isValid).toBe(false);
  });
});
