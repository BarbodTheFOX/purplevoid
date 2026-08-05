import type { AxisId, ResultType } from "../types";
import { sortAxesByRawIndex } from "./tie-break";

export interface ResultTypeSelection {
  resultType: ResultType;
  primaryAxis: AxisId | null;
  secondAxis: AxisId | null;
}

export function selectResultType(
  rawIndexes: Record<AxisId, number>,
  tieBreakOrder: readonly AxisId[],
): ResultTypeSelection {
  const ordered = sortAxesByRawIndex(rawIndexes, tieBreakOrder);
  const values = ordered.map((axisId) => rawIndexes[axisId]);
  const range = values[0] - values.at(-1)!;

  if (range <= 4) {
    return {
      resultType: "balanced",
      primaryAxis: null,
      secondAxis: null,
    };
  }

  const gap = values[0] - values[1];
  if (gap <= 2) {
    return {
      resultType: "blended",
      primaryAxis: ordered[0],
      secondAxis: ordered[1],
    };
  }

  if (gap === 3 || gap === 4) {
    return {
      resultType: "primary_support",
      primaryAxis: ordered[0],
      secondAxis: ordered[1],
    };
  }

  return {
    resultType: "dominant",
    primaryAxis: ordered[0],
    secondAxis: null,
  };
}

export function selectGrowthAxes(
  rawIndexes: Record<AxisId, number>,
  tieBreakOrder: readonly AxisId[],
): AxisId[] {
  const ordered = sortAxesByRawIndex(rawIndexes, tieBreakOrder, "ascending");
  const lowest = ordered[0];
  const secondLowest = ordered[1];

  if (rawIndexes[secondLowest] - rawIndexes[lowest] <= 2) {
    return [lowest, secondLowest];
  }

  return [lowest];
}
