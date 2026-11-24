import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { toastError, toastSuccess, forgotPassword } = vi.hoisted(() => ({
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
  forgotPassword: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { error: toastError, success: toastSuccess },
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/Service/auth.service", () => ({
  authService: { forgotPassword, verifyOtp: vi.fn(), resetPassword: vi.fn() },
}));

import ForgotPasswordPage from "./page";

async function sendEmail() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Email"), "a@b.com");
  await user.click(screen.getByRole("button", { name: /send otp/i }));
}

describe("ForgotPasswordPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("moves to the code step with a message that does not confirm the email exists", async () => {
    forgotPassword.mockResolvedValue({ message: "whatever" });
    render(<ForgotPasswordPage />);
    await sendEmail();
    await waitFor(() =>
      expect(screen.getByLabelText(/otp code/i)).toBeInTheDocument(),
    );
    expect(toastSuccess).toHaveBeenCalledWith(
      expect.stringMatching(/if that email is registered/i),
    );
  });

  it("shows a friendly message on 429", async () => {
    forgotPassword.mockRejectedValue({ status: 429, message: "Too Many" });
    render(<ForgotPasswordPage />);
    await sendEmail();
    await waitFor(() =>
      expect(toastError).toHaveBeenCalledWith(
        expect.stringMatching(/too many attempts/i),
      ),
    );
  });

  it("keeps only digits in the code input", async () => {
    forgotPassword.mockResolvedValue({});
    render(<ForgotPasswordPage />);
    await sendEmail();
    const user = userEvent.setup();
    const input = await screen.findByLabelText(/otp code/i);
    await user.type(input, "12ab34cd56");
    expect(input).toHaveValue("123456");
  });
});
