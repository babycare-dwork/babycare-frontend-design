import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { toastError, toastSuccess, register } = vi.hoisted(() => ({
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
  register: vi.fn(),
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
  authService: { register, googleLogin: vi.fn() },
}));

import RegisterPage from "./page";

async function fillAndSubmit() {
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText("John"), "Asha");
  await user.type(screen.getByPlaceholderText("Doe"), "Rai");
  await user.type(screen.getByPlaceholderText("your@email.com"), "asha@b.com");
  await user.type(screen.getByPlaceholderText("1234567890"), "9800000000");
  await user.type(
    screen.getByPlaceholderText("123 Main St, City, State"),
    "Kathmandu 44600",
  );
  const [pw, confirm] = screen.getAllByPlaceholderText("••••••••");
  await user.type(pw, "password1");
  await user.type(confirm, "password1");
  const file = new File(["x"], "a.png", { type: "image/png" });
  await user.upload(screen.getByLabelText(/profile image/i), file);
  await user.click(screen.getByRole("button", { name: /create account/i }));
}

describe("RegisterPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the check-your-email step after a successful registration", async () => {
    register.mockResolvedValue({
      status: true,
      message: "Please check your email to verify your email",
    });
    render(<RegisterPage />);
    await fillAndSubmit();
    await waitFor(() =>
      expect(screen.getByText(/check your email/i)).toBeInTheDocument(),
    );
    expect(screen.getByText("asha@b.com")).toBeInTheDocument();
  });

  it("shows a friendly message on 429", async () => {
    register.mockRejectedValue({ status: 429, message: "Too Many Requests" });
    render(<RegisterPage />);
    await fillAndSubmit();
    await waitFor(() =>
      expect(toastError).toHaveBeenCalledWith(
        expect.stringMatching(/too many attempts/i),
      ),
    );
  });
});
