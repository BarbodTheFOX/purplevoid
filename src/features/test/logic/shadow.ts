import type {
  AxisId,
  ConfidenceLevel,
  ShadowId,
  ShadowResult,
} from "../types";

type ShadowCandidate = ShadowResult;

const SHADOW_COPY: Record<
  ShadowId,
  Pick<ShadowResult, "name" | "description">
> = {
  rigidity: {
    name: "RIGIDITY",
    description: "ساختار ممکن است در شرایط تازه به خشکی تبدیل شود",
  },
  analysis_loop: {
    name: "ANALYSIS LOOP",
    description:
      "تحلیل ممکن است بدون قانون اقدام به تعلل یا بازتحلیل مداوم تبدیل شود.",
  },
  strategy_hopping: {
    name: "STRATEGY HOPPING",
    description: "میل به تغییر ممکن است سریع تر از فرایند آزمون حرکت کند",
  },
  avoidant_distance: {
    name: "AVOIDANT DISTANCE",
    description:
      "فاصله گیری ممکن است به قطع ارتباط با تصمیم و بازبینی تبدیل شود.",
  },
  overcontrol: {
    name: "OVERCONTROL",
    description:
      "کنترل رفتاری ممکن است بدون مشاهده هیجان به فشار و سرکوب تبدیل شود.",
  },
};

function candidate(
  id: ShadowId,
  highAxis: AxisId,
  lowAxis: AxisId,
  rawIndexes: Record<AxisId, number>,
): ShadowCandidate {
  return {
    id,
    ...SHADOW_COPY[id],
    highAxis,
    lowAxis,
    gap: rawIndexes[highAxis] - rawIndexes[lowAxis],
  };
}

function lowerAxis(
  left: AxisId,
  right: AxisId,
  rawIndexes: Record<AxisId, number>,
): AxisId {
  return rawIndexes[left] <= rawIndexes[right] ? left : right;
}

export function selectShadow(
  rawIndexes: Record<AxisId, number>,
  confidence: ConfidenceLevel,
): ShadowResult | null {
  if (confidence === "low") {
    return null;
  }

  const candidates: ShadowCandidate[] = [];

  if (rawIndexes.architect >= 20 && rawIndexes.alchemist <= 14) {
    candidates.push(candidate("rigidity", "architect", "alchemist", rawIndexes));
  }

  const analysisLow = lowerAxis("sovereign", "architect", rawIndexes);
  if (rawIndexes.oracle >= 20 && rawIndexes[analysisLow] <= 14) {
    candidates.push(candidate("analysis_loop", "oracle", analysisLow, rawIndexes));
  }

  if (rawIndexes.alchemist >= 20 && rawIndexes.architect <= 14) {
    candidates.push(
      candidate("strategy_hopping", "alchemist", "architect", rawIndexes),
    );
  }

  const avoidantLow = lowerAxis("architect", "sovereign", rawIndexes);
  if (rawIndexes.phantom >= 20 && rawIndexes[avoidantLow] <= 14) {
    candidates.push(
      candidate("avoidant_distance", "phantom", avoidantLow, rawIndexes),
    );
  }

  if (rawIndexes.sovereign >= 20 && rawIndexes.phantom <= 14) {
    candidates.push(candidate("overcontrol", "sovereign", "phantom", rawIndexes));
  }

  if (candidates.length === 0) {
    return null;
  }

  const largestGap = Math.max(...candidates.map((item) => item.gap));
  const largest = candidates.filter((item) => item.gap === largestGap);
  return largest.length === 1 ? largest[0] : null;
}
