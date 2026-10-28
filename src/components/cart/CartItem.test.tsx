import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CartItemRow, { type CartItem } from "@/components/cart/CartItem";

const { updateCartItem, removeCartItems } = vi.hoisted(() => ({
  updateCartItem: vi.fn(),
  removeCartItems: vi.fn(),
}));

vi.mock("@/Service/cart.service", () => ({
  default: { updateCartItem, removeCartItems },
}));

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    id,
  }: {
    href: string;
    children: ReactNode;
    id?: string;
  }) => (
    <a href={href} id={id}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/utils", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/utils")>()),
  formatPrice: (n: number) => `Rs. ${n}`,
}));

const item: CartItem = {
  item_uuid: "u1",
  item_type: "product",
  item_name: "Baby Bib",
  item_slug: "baby-bib",
  brand_name: "Pigeon",
  variant_name: "Blue",
  image: "/bib.png",
  variant_id: 1,
  quantity: 2,
  price: 500,
  subtotal: 1000,
};

function renderRow(
  props: Partial<React.ComponentProps<typeof CartItemRow>> = {},
  overrides: Partial<CartItem> = {},
) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <CartItemRow
        item={{ ...item, ...overrides }}
        isSelected={false}
        {...props}
      />
    </QueryClientProvider>,
  );
}

describe("CartItemRow", () => {
  beforeEach(() => {
    updateCartItem.mockReset().mockResolvedValue({});
    removeCartItems.mockReset().mockResolvedValue({});
  });

  it("shows name, brand, variant, price, subtotal and quantity", () => {
    renderRow();
    expect(screen.getByRole("link", { name: "Baby Bib" })).toHaveAttribute(
      "href",
      "/products/baby-bib",
    );
    expect(screen.getByText("Pigeon • Blue")).toBeInTheDocument();
    expect(screen.getByText("Rs. 500")).toBeInTheDocument();
    expect(screen.getByText("Rs. 1000")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("2");
  });

  it("omits the variant when there is none", () => {
    renderRow({}, { variant_name: "" });
    expect(screen.getByText("Pigeon")).toBeInTheDocument();
  });

  it("disables decrease at quantity 1", () => {
    renderRow({}, { quantity: 1 });
    expect(
      screen.getByRole("button", { name: "Decrease quantity" }),
    ).toBeDisabled();
  });

  it("increase calls the update callback with quantity + 1", async () => {
    const onUpdate = vi.fn();
    renderRow({ onUpdateQuantityAction: onUpdate });
    await userEvent.click(
      screen.getByRole("button", { name: "Increase quantity" }),
    );
    expect(onUpdate).toHaveBeenCalledWith("u1", 3);
  });

  it("decrease calls the update callback with quantity - 1", async () => {
    const onUpdate = vi.fn();
    renderRow({ onUpdateQuantityAction: onUpdate });
    await userEvent.click(
      screen.getByRole("button", { name: "Decrease quantity" }),
    );
    expect(onUpdate).toHaveBeenCalledWith("u1", 1);
  });

  it("remove calls the remove callback with the item uuid", async () => {
    const onRemove = vi.fn();
    renderRow({ onRemoveAction: onRemove });
    await userEvent.click(
      screen.getByRole("button", { name: "Remove Baby Bib from cart" }),
    );
    expect(onRemove).toHaveBeenCalledWith("u1");
  });

  it("selecting the checkbox reports the uuid and new state", async () => {
    const onSelect = vi.fn();
    renderRow({ onSelectAction: onSelect });
    await userEvent.click(
      screen.getByRole("checkbox", { name: "Select Baby Bib" }),
    );
    expect(onSelect).toHaveBeenCalledWith("u1", true);
  });

  it("has no checkbox when no select handler is given", () => {
    renderRow();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("falls back to the cart service for quantity changes", async () => {
    renderRow();
    await userEvent.click(
      screen.getByRole("button", { name: "Increase quantity" }),
    );
    await vi.waitFor(() =>
      expect(updateCartItem).toHaveBeenCalledWith("u1", 3),
    );
  });

  it("falls back to the cart service for removal", async () => {
    renderRow();
    await userEvent.click(
      screen.getByRole("button", { name: "Remove Baby Bib from cart" }),
    );
    await vi.waitFor(() =>
      expect(removeCartItems).toHaveBeenCalledWith(["u1"]),
    );
  });
});
