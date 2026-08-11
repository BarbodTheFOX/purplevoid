import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e-production",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3300",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-production",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.CI ? {} : { channel: "chrome" as const }),
      },
    },
  ],
  webServer: {
    command: `"${process.execPath}" ./node_modules/vinext/dist/cli.js start --hostname 127.0.0.1 --port 3300`,
    url: "http://127.0.0.1:3300",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
