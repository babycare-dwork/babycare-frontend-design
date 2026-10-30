import { expect, Locator, type Page } from "@playwright/test";

export function credentials() {
  const email = process.env.E2E_USER_EMAIL;
  const password = process.env.E2E_USER_PASSWORD;
  if (!email || !password) {
    throw new Error("Set E2E_USER_EMAIL and E2E_USER_PASSWORD in .env.e2e");
  }
  return { email, password };
}

export async function gotoLogin(page: Page) {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");
}

export async function fillLogin(page: Page, email: string, password: string) {
  const emailInput = page.locator("#email");
  const passwordInput = page.locator("#password");

  // retry until the values stick, in case hydration clears them
  await expect(async () => {
    await emailInput.fill(email);
    await passwordInput.fill(password);
    await expect(emailInput).toHaveValue(email);
    await expect(passwordInput).toHaveValue(password);
  }).toPass({ timeout: 15_000 });
}

export function product() {
  const name = process.env.E2E_PRODUCT_NAME;
  const search = process.env.E2E_PRODUCT_SEARCH ?? name;
  if (!name || !search) {
    throw new Error(
      "Set E2E_PRODUCT_NAME (and optionally E2E_PRODUCT_SEARCH) in .env.e2e",
    );
  }
  return { name, search };
}

export async function gotoProducts(page: Page) {
  await page.goto("/products");
  await page.waitForLoadState("networkidle");
}

export async function searchProducts(page: Page, term: string) {
  const box = page.getByPlaceholder("Search products...");
  // retry until the value sticks, in case hydration clears it
  await expect(async () => {
    await box.fill(term);
    await expect(box).toHaveValue(term);
  }).toPass({ timeout: 15_000 });
}

export async function emptyCart(page: Page) {
  await page.goto("/cart");
  await page.waitForLoadState("networkidle");
  // wait until the cart has finished loading (either state)
  await expect(
    page.getByRole("heading", { name: /Shopping Cart|Your cart is empty/ }),
  ).toBeVisible();

  const remove = page.getByRole("button", { name: /^Remove .* from cart$/ });
  while ((await remove.count()) > 0) {
    const before = await remove.count();
    await remove.first().click();
    await expect(remove).toHaveCount(before - 1);
  }
}

export async function addProductToCart(page: Page, name: string) {
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
}

// retry until the value sticks, in case hydration clears it
export async function fillField(
  page: Page,
  placeholder: string,
  value: string,
) {
  const input = page.getByPlaceholder(placeholder, { exact: true });
  await expect(async () => {
    await input.fill(value);
    await expect(input).toHaveValue(value);
  }).toPass({ timeout: 15_000 });
}

export async function addSeededProductToCart(page: Page) {
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

  return name;
}

export async function fillBilling(
  page: Page,
  v: { name: string; mobile: string; email: string; address: string },
) {
  const fields: [string, string][] = [
    ["#name", v.name],
    ["#mobile", v.mobile],
    ["#email", v.email],
    ["#address", v.address],
  ];

  // retry until every value sticks, in case hydration clears them
  await expect(async () => {
    for (const [selector, value] of fields) {
      await page.locator(selector).fill(value);
    }
    for (const [selector, value] of fields) {
      await expect(page.locator(selector)).toHaveValue(value);
    }
  }).toPass({ timeout: 15_000 });
}

export async function fillAll(fields: [Locator, string][]) {
  // retry until every value sticks, in case hydration clears them
  await expect(async () => {
    for (const [locator, value] of fields) {
      await locator.fill(value);
    }
    for (const [locator, value] of fields) {
      await expect(
        locator,
        `field did not keep the value "${value}"`,
      ).toHaveValue(value);
    }
  }).toPass({ timeout: 15_000 });
}
