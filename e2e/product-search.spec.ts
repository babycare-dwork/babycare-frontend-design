import { expect, test } from "@playwright/test";
import { gotoProducts, product, searchProducts } from "./helpers";

test("finds the seeded product by name", async ({ page }) => {
  const { name, search } = product();

  await gotoProducts(page);
  await searchProducts(page, search);

  await expect(
    page.getByRole("heading", { level: 3, name }).first(),
  ).toBeVisible();
});
