import { expect, test } from "@playwright/test";
import { fillAll } from "./helpers";

test("add a baby, then run the growth calculator", async ({ page }) => {
  const babyName = `E2E Baby ${Date.now()}`;

  await test.step("add a baby", async () => {
    await page.goto("/baby");
    await page.waitForLoadState("networkidle");

    await page
      .getByRole("button", { name: /^Add (Your First )?Baby$/ })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByText("Add New Baby")).toBeVisible();

    const dob = dialog
      .locator("div.space-y-1")
      .filter({ hasText: "Date of Birth (BS)" })
      .locator("input");

    await fillAll([
      [dialog.locator("#name"), babyName],
      [dialog.locator("#weight"), "9.5"],
      [dialog.locator("#height"), "72"],
      [dialog.locator("#head_circumference"), "44"],
    ]);

    await dob.click();
    await dialog
      .locator("td.month-day.current")
      .filter({ hasText: /^2$/ })
      .click();
    await expect(dob).toHaveValue(/^\d{4}-\d{2}-\d{2}$/);

    await dialog.getByText("Add New Baby").click();

    await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().endsWith("/infant") &&
          r.request().method() === "POST" &&
          r.ok(),
      ),
      dialog.getByRole("button", { name: "Create Baby" }).click(),
    ]);

    await expect(dialog).toBeHidden();
  });

  await test.step("open the growth monitor and calculate", async () => {
    const card = page
      .locator("div.cursor-pointer")
      .filter({ has: page.getByRole("heading", { level: 3, name: babyName }) });
    await expect(card).toBeVisible();
    await card.getByRole("button", { name: "Growth Monitor" }).click();

    await expect(page).toHaveURL(/\/baby\/\d+/);
    await page.waitForLoadState("networkidle");

    const form = page
      .locator("form")
      .filter({ has: page.locator("#head_circumference") });

    await fillAll([
      [form.locator("#weight"), "9.5"],
      [form.locator("#height"), "72"],
      [form.locator("#head_circumference"), "44"],
    ]);

    await form.getByRole("button", { name: "Calculate" }).click();

    await expect(page.getByText("Results", { exact: true })).toBeVisible();
    await expect(
      page.locator("span", { hasText: "Weight for Age" }),
    ).toBeVisible();
    await expect(
      page.locator("span", { hasText: "Height for Age" }),
    ).toBeVisible();
    await expect(
      page.locator("span", { hasText: "Head Circumference" }),
    ).toBeVisible();
  });
});
