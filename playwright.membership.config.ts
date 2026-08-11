import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e-membership",
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3102",
    trace: "on-first-retry",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  projects: [
    {
      name: "chromium-membership",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.CI ? {} : { channel: "chrome" as const }),
      },
    },
  ],
  webServer: {
    command: `"${process.execPath}" ./node_modules/vinext/dist/cli.js dev --hostname 127.0.0.1 --port 3102`,
    url: "http://127.0.0.1:3102",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      NEXT_PUBLIC_MEMBERSHIP_ENABLED: "true",
      NEXT_PUBLIC_MEMBERSHIP_PRICE: "120.5",
      NEXT_PUBLIC_MEMBERSHIP_CURRENCY: "USDT",
      NEXT_PUBLIC_MEMBERSHIP_NETWORK: "TRC20",
      NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: "TTestOnlyPublicWalletAddress123456",
      NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: "purple_void_test_admin",
      NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE: "مبلغ دقیق را فقط روی شبکه اعلام‌شده ارسال کن.",
    },
  },
});
