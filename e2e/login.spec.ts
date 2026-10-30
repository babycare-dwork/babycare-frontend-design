import { expect, test } from "@playwright/test";
import { credentials, fillLogin, gotoLogin } from "./helpers";

test.use({ storageState: { cookies: [], origins: [] } });

test("valid credentials go to the products page", async ({ page }) => {
  const { email, password } = credentials();

  await gotoLogin(page);
  await fillLogin(page, email, password);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();

  await expect(page).toHaveURL(/\/products/);
});
