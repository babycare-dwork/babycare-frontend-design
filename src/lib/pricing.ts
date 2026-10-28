export const FREE_SHIPPING_THRESHOLD = 5000;

export function cartSubtotal(
  items: { price?: number; quantity?: number }[],
): number {
  return items.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0,
  );
}

export function amountUntilFreeShipping(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}

export function hasStrikethroughPrice(price: number, previousPrice: number) {
  return previousPrice > price;
}
