import { describe, expect, it } from "vitest";
import { isLocaleValid } from "./i18n";

describe("i18n test", () => {
  it("Should validate if single locale is valid", () => {
    const validLocale = "en";
    const invalidLocale = "test";

    const isValid1 = isLocaleValid(validLocale);
    const isValid2 = isLocaleValid(invalidLocale);

    expect(isValid1).toBe(true);
    expect(isValid2).toBe(false);
  });

  it("Should validate if array of locales is valid", () => {
    const validLocales = ["en", "es"];
    const invalidLocales = ["test2", "test1"];

    const isValid1 = isLocaleValid(validLocales);
    const isValid2 = isLocaleValid(invalidLocales);

    expect(isValid1).toBe(true);
    expect(isValid2).toBe(false);
  });
});
