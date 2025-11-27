import { describe, expect, it } from "vitest";
import { handleCatchError } from "./handleCatchError";

describe("handleCatchError", () => {
  it("should return an error result with UNKNOWN_ERROR code for a generic Error", () => {
    const error = new Error("Test error message");
    const result = handleCatchError(error, "An unknown error occurred");

    expect(result.error).toBeDefined();
    expect(result.error.code).toBe("UNKNOWN_ERROR");
    expect(result.error.message).toBe("An unknown error occurred");
  });

  it("should return an error result with UNKNOWN_ERROR code for a string error", () => {
    const error = "String error message";
    const result = handleCatchError(error, "An unknown error occurred");

    expect(result.error).toBeDefined();
    expect(result.error.code).toBe("UNKNOWN_ERROR");
    expect(result.error.message).toBe("An unknown error occurred");
  });

  it("should return an error result with UNKNOWN_ERROR code for a number error", () => {
    const error = 404;
    const result = handleCatchError(error, "An unknown error occurred");

    expect(result.error).toBeDefined();
    expect(result.error.code).toBe("UNKNOWN_ERROR");
    expect(result.error.message).toBe("An unknown error occurred");
  });

  it("should return an error result with UNKNOWN_ERROR code for an object error", () => {
    const error = { detail: "Some error detail" };
    const result = handleCatchError(error, "Custom Error occurred");

    expect(result.error).toBeDefined();
    expect(result.error.code).toBe("UNKNOWN_ERROR");
    expect(result.error.message).toBe("Custom Error occurred");
  });
});
