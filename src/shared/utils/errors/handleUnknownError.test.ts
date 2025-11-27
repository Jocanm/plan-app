import { describe, expect, it } from "vitest";
import { handleUnknownError } from "./handleUnknownError";

describe("handleUnknownError", () => {
  it("should return the message of an Error instance", () => {
    const error = new Error("This is an error message");
    const result = handleUnknownError(error);
    expect(result).toBe("This is an error message");
  });

  it("should return the string representation of a string error", () => {
    const error = "This is a string error";
    const result = handleUnknownError(error);
    expect(result).toBe("This is a string error");
  });

  it("should return the string representation of a number error", () => {
    const error = 404;
    const result = handleUnknownError(error);
    expect(result).toBe("404");
  });

  it("should return the string representation of an object error", () => {
    const error = { code: 500, message: "Internal Server Error" };
    const result = handleUnknownError(error);
    expect(result).toBe("[object Object]");
  });

  it("should return 'undefined' for an undefined error", () => {
    const error = undefined;
    const result = handleUnknownError(error);
    expect(result).toBe("undefined");
  });

  it("should return 'null' for a null error", () => {
    const error = null;
    const result = handleUnknownError(error);
    expect(result).toBe("null");
  });
});
