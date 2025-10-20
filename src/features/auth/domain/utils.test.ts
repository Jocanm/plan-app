import { describe, expect, it } from "vitest";
import { getLoginError } from "./utils";

describe("Auth - Utils", () => {
  describe("getLoginError", () => {
    it("Should return oauth_account_not_linked keys for OAuthAccountNotLinked", () => {
      const result = getLoginError("OAuthAccountNotLinked");

      expect(result).toEqual({
        titleKey: "oauth_account_not_linked.title",
        messageKey: "oauth_account_not_linked.message",
      });
    });

    it("Should return default keys for any other error", () => {
      const result = getLoginError("SomeOtherError");

      expect(result).toEqual({
        titleKey: "default.title",
        messageKey: "default.message",
      });
    });

    it("Should return default keys for undefined error", () => {
      const result = getLoginError(undefined);

      expect(result).toEqual({
        titleKey: "default.title",
        messageKey: "default.message",
      });
    });

    it("Should return default keys for array of errors", () => {
      const result = getLoginError(["Error1", "Error2"]);

      expect(result).toEqual({
        titleKey: "default.title",
        messageKey: "default.message",
      });
    });
  });
});
