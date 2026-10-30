import { expect, test } from "@playwright/test";
import { addSeededProductToCart, credentials, fillBilling } from "./helpers";

test("cart → checkout with Cash on Delivery → order success", async ({
  page,
}) => {
  const { email } = credentials();
  const name = await addSeededProductToCart(page);

  await page.goto("/cart");
  await page.waitForLoadState("networkidle");
  await page
    .getByRole("checkbox", { name: `Select ${name}`, exact: true })
    .click();
  await page.getByRole("button", { name: /Proceed to checkout/ }).click();

  await expect(page).toHaveURL(/\/checkout\?items=/);
  await expect(
    page.getByRole("heading", { name: "Checkout", exact: true }),
  ).toBeVisible();
  await page.waitForLoadState("networkidle");

  await fillBilling(page, {
    name: "E2E Tester",
    mobile: "9800000000",
    email,
    address: "E2E test street, Kathmandu",
  });

  // Cash on Delivery is the form's default, so the payment selector is untouched.
  // ASSUMPTION: the button text. Check SummaryCard.tsx and adjust if this fails.
  await page.getByRole("button", { name: /place order/i }).click();

  await expect(page).toHaveURL(/\/order\/order-success/, { timeout: 20_000 });
});
