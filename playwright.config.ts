import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.CI ? {} : { channel: "chrome" as const }),
      },
    },
  ],
  webServer: {
    command: `"${process.execPath}" ./node_modules/vinext/dist/cli.js dev --hostname 127.0.0.1 --port 3100`,
    url: "http://127.0.0.1:3100",
    env: {
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TPartialTestWalletMustNotLeak",
      NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE: "راهنمای ناقص آزمایشی نباید نمایش داده شود",
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
