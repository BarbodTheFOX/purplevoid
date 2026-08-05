import type {
  ConfidenceLevel,
  QualityFlag,
  TradeCountRange,
} from "../types";

export const LOW_CONFIDENCE_MESSAGE =
  "این نتیجه بیشتر یک فرضیه برای شروع مشاهده است. تعداد معاملات یا الگوی پاسخ ها برای نتیجه مطمئن کافی نبوده؛ بعد از ثبت حداقل ۱۵ معامله دوباره آزمون را انجام بده.";

export function selectConfidenceLevel(
  tradeCountRange: TradeCountRange,
  qualityFlags: readonly QualityFlag[],
): ConfidenceLevel {
  const activeFlagCount = qualityFlags.filter((flag) => flag.active).length;

  if (
    tradeCountRange === "zero" ||
    tradeCountRange === "one_to_seven" ||
    activeFlagCount >= 2
  ) {
    return "low";
  }

  if (tradeCountRange === "fifteen_plus" && activeFlagCount === 0) {
    return "usual";
  }

  return "medium";
}
