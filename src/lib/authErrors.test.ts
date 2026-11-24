import { describe, expect, it } from "vitest";
import { classifyAuthError, getAuthErrorMessage } from "@/lib/authErrors";

describe("classifyAuthError", () => {
  it("detects 429", () => {
    expect(classifyAuthError({ status: 429 })).toBe("rate_limited");
  });
  it("detects an unverified account by code", () => {
    expect(classifyAuthError({ code: "email_not_verified" })).toBe(
      "unverified",
    );
  });
  it("detects an unverified account by 403 message", () => {
    expect(
      classifyAuthError({ status: 403, message: "Please verify your email" }),
    ).toBe("unverified");
  });
  it("treats other errors as other", () => {
    expect(classifyAuthError({ status: 500 })).toBe("other");
    expect(classifyAuthError(undefined)).toBe("other");
  });
});

describe("getAuthErrorMessage", () => {
  it("shows a friendly message for 429", () => {
    expect(getAuthErrorMessage({ status: 429 }, "x")).toMatch(
      /too many attempts/i,
    );
  });
  it("shows the verify message for unverified", () => {
    expect(getAuthErrorMessage({ code: "email_not_verified" }, "x")).toMatch(
      /verify your email/i,
    );
  });
  it("uses the API message, then the fallback", () => {
    expect(getAuthErrorMessage({ message: "Bad" }, "x")).toBe("Bad");
    expect(getAuthErrorMessage({}, "Login failed")).toBe("Login failed");
  });
  it("detects the real backend unverified message", () => {
    expect(
      classifyAuthError({
        status: false,
        message: "Please verify your email address to continue.",
      }),
    ).toBe("unverified");
  });
});
