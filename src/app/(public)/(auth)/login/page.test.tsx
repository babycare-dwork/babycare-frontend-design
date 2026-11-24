import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { toastError, toastSuccess, login } = vi.hoisted(() => ({
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
  login: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { error: toastError, success: toastSuccess },
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@react-oauth/google", () => ({ useGoogleLogin: () => vi.fn() }));
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));
vi.mock("@/Service/auth.service", () => ({
  authService: { login, googleLogin: vi.fn() },
}));

import LoginPage from "./page";

async function submit() {
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText("your@email.com"), "a@b.com");
  await user.type(screen.getByPlaceholderText("••••••••"), "password1");
  await user.click(screen.getByRole("button", { name: /^sign in$/i }));
}

describe("LoginPage errors", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the verify-email message for an unverified account", async () => {
    login.mockRejectedValue({
      status: false,
      message: "Please verify your email address to continue.",
    });
    render(<LoginPage />);
    await submit();
    expect(toastError).toHaveBeenCalledWith(
      expect.stringMatching(/verify your email/i),
    );
  });

  it("shows a friendly message on 429", async () => {
    login.mockRejectedValue({ status: 429, message: "Too Many Requests" });
    render(<LoginPage />);
    await submit();
    expect(toastError).toHaveBeenCalledWith(
      expect.stringMatching(/too many attempts/i),
    );
  });
});
