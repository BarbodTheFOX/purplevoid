export type MembershipPaymentConfig = {
  enabled: boolean;
  price: number | null;
  pricePlaceholder: string;
  currency: string;
  network: string;
  walletAddress: string;
  telegramAdminUsername: string;
  paymentGuide: string;
  refundPolicy: string | null;
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
  refundPolicy: null,
};

const PLACEHOLDER_PATTERN = /^\[[A-Z0-9_]+\]$/;

export function isConfigPlaceholder(value: string | null | undefined): boolean {
  return !value || PLACEHOLDER_PATTERN.test(value.trim());
}

function hasConfiguredValue(value: string | null | undefined): value is string {
  return Boolean(value?.trim()) && !isConfigPlaceholder(value);
}

export function isMembershipPaymentReady(
  config: MembershipPaymentConfig,
): boolean {
  return Boolean(
    config.enabled &&
      config.price !== null &&
      Number.isFinite(config.price) &&
      config.price > 0 &&
      hasConfiguredValue(config.currency) &&
      hasConfiguredValue(config.network) &&
      hasConfiguredValue(config.walletAddress) &&
      hasConfiguredValue(config.telegramAdminUsername) &&
      hasConfiguredValue(config.paymentGuide) &&
      hasConfiguredValue(config.refundPolicy),
  );
}

export function membershipPriceLabel(
  config: MembershipPaymentConfig = MEMBERSHIP_CONFIG,
): string {
  return config.price === null
    ? "اعلام می‌شود"
    : new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 8 }).format(config.price);
}
