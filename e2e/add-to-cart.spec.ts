import { expect, test } from "@playwright/test";
import { emptyCart, gotoProducts, product, searchProducts } from "./helpers";

test("add the seeded product to the cart", async ({ page }) => {
  const { name, search } = product();

  await emptyCart(page);
  await gotoProducts(page);
  await searchProducts(page, search);

  await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().includes("add-to-cart") &&
        r.request().method() === "POST" &&
        r.ok(),
    ),
    page
      .getByRole("button", { name: `Add ${name} to cart` })
      .first()
      .click(),
  ]);

  await page.goto("/cart");
  await expect(page.getByRole("link", { name })).toBeVisible();
});
