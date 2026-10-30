import { defineConfig, devices } from "@playwright/test";

try {
  process.loadEnvFile(".env.e2e");
} catch {
  // optional file
}

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const apiUrl = process.env.E2E_API_URL;

if (!apiUrl) {
  throw new Error(
    "Set E2E_API_URL to the test backend, e.g. http://192.168.1.67:8000/api/v1",
  );
}
if (apiUrl.includes("thebabycareapp.com")) {
  throw new Error("E2E must not run against the production API");
}

const isLocal = baseURL.startsWith("http://localhost");

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: isLocal
    ? {
        command: "npm run build && npm run start",
        url: baseURL,
        reuseExistingServer: false,
        timeout: 300_000,
        env: {
          NEXT_PUBLIC_BASE_URL: apiUrl,
          API_URL: apiUrl,
          COOKIE_SECURE: "false",
        },
      }
    : undefined,
  projects: [
    {
      name: "setup-desktop",
      testMatch: /auth\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "setup-mobile",
      testMatch: /auth\.setup\.ts/,
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "desktop-chromium",
      testIgnore: /auth\.setup\.ts/,
      dependencies: ["setup-desktop"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/desktop.json",
      },
    },
    {
      name: "mobile-safari",
      testIgnore: /auth\.setup\.ts/,
      dependencies: ["setup-mobile"],
      use: { ...devices["iPhone 13"], storageState: "e2e/.auth/mobile.json" },
    },
  ],
});
