export type MembershipPaymentConfig = {
  enabled: boolean;
  price: number | null;
  pricePlaceholder: string;
  currency: string;
  network: string;
  walletAddress: string;
  telegramAdminUsername: string;
  paymentGuide: string;
  refundPolicy: string;
};

export const MEMBERSHIP_CONFIG: MembershipPaymentConfig = {
  enabled: false,
  price: null,
  pricePlaceholder: "[MEMBERSHIP_PRICE]",
  currency: "[PAYMENT_CURRENCY]",
  network: "[PAYMENT_NETWORK]",
  walletAddress: "[WALLET_ADDRESS]",
  telegramAdminUsername: "[TELEGRAM_ADMIN_USERNAME]",
  paymentGuide:
    "پس از نهایی‌شدن اطلاعات پرداخت، مبلغ دقیق را فقط با ارز و شبکه‌ای که در همین صفحه نوشته شده ارسال کن و TxID را نگه دار.",
  refundPolicy: "[REFUND_POLICY_PENDING]",
};

const PLACEHOLDER_PATTERN = /^\[[A-Z0-9_]+\]$/;

export function isConfigPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERN.test(value.trim());
}

export function isMembershipPaymentReady(
  config: MembershipPaymentConfig,
): boolean {
  return Boolean(
    config.enabled &&
      config.price !== null &&
      Number.isFinite(config.price) &&
      config.price > 0 &&
      !isConfigPlaceholder(config.currency) &&
      !isConfigPlaceholder(config.network) &&
      !isConfigPlaceholder(config.walletAddress) &&
      !isConfigPlaceholder(config.telegramAdminUsername),
  );
}

export function membershipPriceLabel(
  config: MembershipPaymentConfig = MEMBERSHIP_CONFIG,
): string {
  return config.price === null
    ? config.pricePlaceholder
    : new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 8 }).format(config.price);
}
