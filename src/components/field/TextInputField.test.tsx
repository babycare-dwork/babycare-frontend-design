import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TextInputField from "@/components/field/TextInputField";

describe("TextInputField", () => {
  it("links the label to the input and marks it required", () => {
    render(<TextInputField name="email" label="Email" required />);
    expect(screen.getByLabelText(/email/i)).toBeRequired();
  });

  it("shows the error and wires it up for accessibility", () => {
    render(<TextInputField name="email" label="Email" error="Invalid email" />);
    const input = screen.getByLabelText(/email/i);
    expect(screen.getByText("Invalid email")).toHaveAttribute(
      "id",
      "email-error",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("has no error markup when there is no error", () => {
    render(<TextInputField name="email" label="Email" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    render(<TextInputField name="name" label="Name" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText(/name/i), "Asha");
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("renders a textarea when textarea is set", () => {
    render(<TextInputField name="note" label="Note" textarea />);
    expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA");
  });

  it("can be disabled", () => {
    render(<TextInputField name="name" label="Name" disabled />);
    expect(screen.getByLabelText(/name/i)).toBeDisabled();
  });
});
