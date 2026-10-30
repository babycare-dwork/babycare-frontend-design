import { describe, expect, it } from "vitest";
import {
  amountUntilFreeShipping,
  cartSubtotal,
  hasStrikethroughPrice,
} from "./pricing";

describe("cartSubtotal", () => {
  it("is 0 for an empty cart", () => {
    expect(cartSubtotal([])).toBe(0);
  });
  it("multiplies price by quantity", () => {
    expect(
      cartSubtotal([
        { price: 100, quantity: 3 },
        { price: 50, quantity: 2 },
      ]),
    ).toBe(400);
  });
  it("defaults a missing quantity to 1 and a missing price to 0", () => {
    expect(cartSubtotal([{ price: 100 }, { quantity: 5 }])).toBe(100);
  });
});

describe("amountUntilFreeShipping", () => {
  it("returns the gap below the threshold", () => {
    expect(amountUntilFreeShipping(4000)).toBe(1000);
  });
  it("is 0 at and above the threshold", () => {
    expect(amountUntilFreeShipping(5000)).toBe(0);
    expect(amountUntilFreeShipping(7000)).toBe(0);
  });
});

describe("hasStrikethroughPrice", () => {
  it("is true only when the previous price is higher", () => {
    expect(hasStrikethroughPrice(80, 100)).toBe(true);
    expect(hasStrikethroughPrice(100, 100)).toBe(false);
    expect(hasStrikethroughPrice(120, 100)).toBe(false);
  });
});
