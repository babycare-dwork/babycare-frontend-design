import { chromium, devices } from "@playwright/test";

const BASE = "http://localhost:3000";
const SLUG =
  "alias-rerum-rerum-eum-consequuntur-voluptate-reiciendis-variant-hxjzk";
const CHECKOUT = "/checkout?items=cb42b10b-d2d9-4135-a064-686146628e28";

const PAGES = [
  {
    name: "home",
    url: "/",
    run: async (step, page) => {
      await step("increase quantity", () =>
        page
          .getByRole("button", { name: "Increase quantity" })
          .first()
          .click({ timeout: 3000 }),
      );
      await step("open header menu", () =>
        page.locator("header button").last().click({ timeout: 3000 }),
      );
    },
  },
  {
    name: "products",
    url: "/products",
    run: async (step, page) => {
      await step("type in search", async () => {
        const box = page.getByPlaceholder("Search products...");
        await box.click({ timeout: 3000 });
        await box.pressSequentially("baby", { delay: 120 });
      });
      await step("open filters", () =>
        page.getByRole("button", { name: "Filters" }).click({ timeout: 3000 }),
      );
      await step("tick a category", () =>
        page.getByRole("checkbox").first().click({ timeout: 3000 }),
      );
    },
  },
  {
    name: "product-detail",
    url: `/products/${SLUG}`,
    run: async (step, page) => {
      await step("increase quantity", () =>
        page
          .getByRole("button", { name: "Increase quantity" })
          .first()
          .click({ timeout: 3000 }),
      );
      await step("open header menu", () =>
        page.locator("header button").last().click({ timeout: 3000 }),
      );
    },
  },
  {
    name: "baby-detail",
    url: "/baby/1",
    run: async (step, page) => {
      for (const [id, text] of [
        ["#weight", "8.5"],
        ["#height", "70"],
        ["#head_circumference", "41"],
      ]) {
        await step(`type ${id}`, async () => {
          await page.locator(id).click({ timeout: 3000 });
          await page.locator(id).pressSequentially(text, { delay: 120 });
        });
      }
      await step("click Calculate", () =>
        page
          .getByRole("button", { name: "Calculate" })
          .click({ timeout: 3000 }),
      );
      await page.waitForTimeout(1500);
      await step("tab Height", () =>
        page.getByRole("tab", { name: "Height" }).click({ timeout: 3000 }),
      );
      await step("tab Head Circumference", () =>
        page
          .getByRole("tab", { name: "Head Circumference" })
          .click({ timeout: 3000 }),
      );
    },
  },
  {
    name: "checkout",
    url: CHECKOUT,
    run: async (step, page) => {
      for (const [id, text] of [
        ["#name", "E2E Tester"],
        ["#mobile", "9800000000"],
        ["#email", "e2e@example.com"],
        ["#address", "Test street 1"],
      ]) {
        await step(`type ${id}`, async () => {
          await page.locator(id).click({ timeout: 3000 });
          await page.locator(id).pressSequentially(text, { delay: 120 });
        });
      }
    },
  },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices["Pixel 5"],
  storageState: "e2e/.auth/desktop.json",
});

await context.addInitScript(() => {
  window.__inp = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.interactionId) {
        window.__inp.push({
          id: e.interactionId,
          duration: e.duration,
          name: e.name,
        });
      }
    }
  }).observe({ type: "event", buffered: true, durationThreshold: 16 });
});

const rows = [];
for (const p of PAGES) {
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  let performed = 0;
  const step = async (label, fn) => {
    try {
      await fn();
      performed++;
      await page.waitForTimeout(400);
    } catch {
      console.log(`  skipped on ${p.name}: ${label}`);
    }
  };

  await page.goto(BASE + p.url, { waitUntil: "networkidle" });
  await p.run(step, page);
  await page.waitForTimeout(800);

  const entries = await page.evaluate(() => window.__inp);
  const byId = new Map();
  for (const e of entries) {
    const cur = byId.get(e.id);
    if (!cur || e.duration > cur.duration) byId.set(e.id, e);
  }
  const worst = [...byId.values()].sort((a, b) => b.duration - a.duration)[0];

  rows.push({
    page: p.name,
    performed,
    captured: byId.size,
    "INP (ms)": worst ? Math.round(worst.duration) : "<16",
    "worst event": worst?.name ?? "-",
  });
  await page.close();
}

console.table(rows);
await browser.close();
