import { expect, test as setup } from "@playwright/test";
import { credentials, fillLogin, gotoLogin } from "./helpers";

setup("log in and save the session", async ({ page }, testInfo) => {
  const { email, password } = credentials();
  const name = testInfo.project.name.replace("setup-", "");

  await gotoLogin(page);
  await fillLogin(page, email, password);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();

  await expect(page).toHaveURL(/\/products/);
  await page.context().storageState({ path: `e2e/.auth/${name}.json` });
});
