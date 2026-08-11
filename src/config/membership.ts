export type MembershipPaymentConfig = {
  enabled: boolean;
  price: string | null;
  currency: string;
  network: string;
  walletAddress: string;
  telegramAdminUsername: string;
  paymentGuide: string;
};

type MembershipPublicEnvironment = Partial<Record<
  | "NEXT_PUBLIC_MEMBERSHIP_ENABLED"
  | "NEXT_PUBLIC_MEMBERSHIP_PRICE"
  | "NEXT_PUBLIC_MEMBERSHIP_CURRENCY"
  | "NEXT_PUBLIC_MEMBERSHIP_NETWORK"
  | "NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS"
  | "NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN"
  | "NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE",
  string
>>;

const DEFAULT_PAYMENT_GUIDE =
  "مبلغ دقیق را فقط با ارز و شبکه‌ای که در همین صفحه نوشته شده ارسال کن و TxID را نگه دار.";
const MEMBERSHIP_PRICE_PATTERN = /^(\d+)(?:\.(\d{1,8}))?$/;
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function parseMembershipPrice(rawPrice: string): string | null {
  const match = MEMBERSHIP_PRICE_PATTERN.exec(rawPrice);
  if (!match) return null;

  const wholePart = BigInt(match[1]).toString();
  const fractionalPart = (match[2] ?? "").replace(/0+$/, "");
  if (wholePart === "0" && !fractionalPart) return null;

  return fractionalPart ? `${wholePart}.${fractionalPart}` : wholePart;
}

export function createMembershipConfig(
  environment: MembershipPublicEnvironment,
): MembershipPaymentConfig {
  const rawPrice = environment.NEXT_PUBLIC_MEMBERSHIP_PRICE?.trim() ?? "";
  const parsedPrice = parseMembershipPrice(rawPrice);

  return {
    enabled: environment.NEXT_PUBLIC_MEMBERSHIP_ENABLED === "true",
    price: parsedPrice,
    currency: environment.NEXT_PUBLIC_MEMBERSHIP_CURRENCY?.trim() || "[PAYMENT_CURRENCY]",
    network: environment.NEXT_PUBLIC_MEMBERSHIP_NETWORK?.trim() || "[PAYMENT_NETWORK]",
    walletAddress: environment.NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS?.trim() || "[WALLET_ADDRESS]",
    telegramAdminUsername:
      environment.NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN?.trim() || "[TELEGRAM_ADMIN_USERNAME]",
    paymentGuide:
      environment.NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE?.trim() || DEFAULT_PAYMENT_GUIDE,
  };
}

export const MEMBERSHIP_CONFIG = createMembershipConfig({
  NEXT_PUBLIC_MEMBERSHIP_ENABLED: process.env.NEXT_PUBLIC_MEMBERSHIP_ENABLED,
  NEXT_PUBLIC_MEMBERSHIP_PRICE: process.env.NEXT_PUBLIC_MEMBERSHIP_PRICE,
  NEXT_PUBLIC_MEMBERSHIP_CURRENCY: process.env.NEXT_PUBLIC_MEMBERSHIP_CURRENCY,
  NEXT_PUBLIC_MEMBERSHIP_NETWORK: process.env.NEXT_PUBLIC_MEMBERSHIP_NETWORK,
  NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS: process.env.NEXT_PUBLIC_MEMBERSHIP_WALLET_ADDRESS,
  NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN: process.env.NEXT_PUBLIC_MEMBERSHIP_TELEGRAM_ADMIN,
  NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE: process.env.NEXT_PUBLIC_MEMBERSHIP_PAYMENT_GUIDE,
});

const PLACEHOLDER_PATTERN = /^\[[A-Z0-9_]+\]$/;
const TELEGRAM_USERNAME_PATTERN = /^[A-Za-z0-9_]{5,32}$/;

export function isConfigPlaceholder(value: string | null | undefined): boolean {
  return !value || PLACEHOLDER_PATTERN.test(value.trim());
}

export function isValidTelegramAdminUsername(value: string): boolean {
  if (isConfigPlaceholder(value)) return false;
  return TELEGRAM_USERNAME_PATTERN.test(value.trim().replace(/^@/, ""));
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
      parseMembershipPrice(config.price) !== null &&
      hasConfiguredValue(config.currency) &&
      hasConfiguredValue(config.network) &&
      hasConfiguredValue(config.walletAddress) &&
      isValidTelegramAdminUsername(config.telegramAdminUsername),
  );
}

export function membershipPriceLabel(
  config: MembershipPaymentConfig = MEMBERSHIP_CONFIG,
): string {
  const normalizedPrice = config.price ? parseMembershipPrice(config.price) : null;
  if (!normalizedPrice) return "اعلام می‌شود";

  const [wholePart, fractionalPart] = normalizedPrice.split(".");
  const formattedWholePart = new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
  }).format(BigInt(wholePart));
  if (!fractionalPart) return formattedWholePart;

  const formattedFraction = [...fractionalPart]
    .map((digit) => PERSIAN_DIGITS[Number(digit)])
    .join("");
  return `${formattedWholePart}٫${formattedFraction}`;
}
