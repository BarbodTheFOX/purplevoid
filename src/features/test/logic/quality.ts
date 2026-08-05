import { AXIS_IDS, DIRECT_ITEM_IDS, REVERSE_ITEM_IDS } from "../data/axes";
import type {
  AxisId,
  AxisResult,
  CompleteAnswers,
  LikertQuestionId,
  QualityFlag,
  QuestionId,
  TradeCountRange,
} from "../types";
import { reverseScore } from "./scoring-utils";

const CONTROL_PAIRS = [
  [1, 16],
  [7, 12],
  [3, 23],
  [9, 19],
  [5, 20],
] as const satisfies readonly (readonly [LikertQuestionId, LikertQuestionId])[];

function maximumIdenticalRun(values: readonly number[]): number {
  let maximum = 0;
  let current = 0;
  let previous: number | undefined;

  for (const value of values) {
    current = value === previous ? current + 1 : 1;
    previous = value;
    maximum = Math.max(maximum, current);
  }

  return maximum;
}

export interface QualityInput {
  answers: CompleteAnswers;
  axes: Record<AxisId, AxisResult>;
  startTime: number;
  endTime: number;
  responseDurationsMs: Record<QuestionId, number>;
  tradeCountRange: TradeCountRange;
}

export function calculateQualityFlags(input: QualityInput): QualityFlag[] {
  const totalSeconds = (input.endTime - input.startTime) / 1000;
  const durations = Object.values(input.responseDurationsMs);
  const fastItemCount = durations.filter((duration) => duration < 2_000).length;
  const fastItemRatio = fastItemCount / 35;

  const likertValues = Array.from(
    { length: 30 },
    (_, index) => input.answers.likert[(index + 1) as LikertQuestionId],
  );
  const longestRun = maximumIdenticalRun(likertValues);
  const optionCounts = new Map<number, number>();
  for (const value of likertValues) {
    optionCounts.set(value, (optionCounts.get(value) ?? 0) + 1);
  }
  const mostUsedCount = Math.max(...optionCounts.values());
  const mostUsedRatio = mostUsedCount / 30;

  const fullyIdeal =
    DIRECT_ITEM_IDS.every((itemId) => input.answers.likert[itemId] === 5) &&
    REVERSE_ITEM_IDS.every((itemId) => input.answers.likert[itemId] === 1);

  const inconsistentPairs = CONTROL_PAIRS.filter(([directId, reverseId]) => {
    const directValue = input.answers.likert[directId];
    const reversedValue = reverseScore(input.answers.likert[reverseId]);
    return Math.abs(directValue - reversedValue) >= 3;
  });

  const divergentAxes = AXIS_IDS.filter((axisId) => {
    const axis = input.axes[axisId];
    return axis.likertIndex >= 19 && axis.scenarioScore <= 1;
  });

  const lowExperience =
    input.tradeCountRange === "zero" ||
    input.tradeCountRange === "one_to_seven";

  return [
    {
      id: "fast_completion",
      active: totalSeconds < 150,
      label: "زمان کل کمتر از ۱۵۰ ثانیه",
      evidence: { totalSeconds },
    },
    {
      id: "fast_items",
      active: fastItemRatio > 0.2,
      label: "بیش از ۲۰٪ پاسخ ها سریع تر از ۲ ثانیه",
      evidence: { fastItemCount, fastItemRatio },
    },
    {
      id: "straight_lining",
      active: longestRun >= 8 || mostUsedRatio >= 0.7,
      label: "الگوی پاسخ رشته ای",
      evidence: { longestRun, mostUsedCount, mostUsedRatio },
    },
    {
      id: "fully_ideal",
      active: fullyIdeal,
      label: "الگوی پاسخ کاملاً ایدئال",
      evidence: { fullyIdeal },
    },
    {
      id: "internal_inconsistency",
      active: inconsistentPairs.length >= 2,
      label: "ناسازگاری درونی",
      evidence: {
        inconsistentPairCount: inconsistentPairs.length,
        pairs: inconsistentPairs.map(([left, right]) => `${left}-${right}`),
      },
    },
    {
      id: "self_report_scenario_divergence",
      active: divergentAxes.length >= 3,
      label: "واگرایی خودگزارش و رفتار",
      evidence: {
        divergentAxisCount: divergentAxes.length,
        axes: divergentAxes,
      },
    },
    {
      id: "low_experience",
      active: lowExperience,
      label: "حجم تجربه کمتر از ۸ معامله",
      evidence: { tradeCountRange: input.tradeCountRange },
    },
  ];
}

export { CONTROL_PAIRS };
