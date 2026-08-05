import { AXIS_IDS } from "../data/axes";
import type { AxisId } from "../types";

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function nextRandom(state: { value: number }): number {
  let value = state.value || 0x6d2b79f5;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  state.value = value >>> 0;
  return state.value / 0x1_0000_0000;
}

export function createTieBreakSeed(): string {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const values = new Uint32Array(4);
    crypto.getRandomValues(values);
    return Array.from(values, (value) => value.toString(36)).join("-");
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function createTieBreakOrder(seed: string): AxisId[] {
  const state = { value: hashSeed(seed) };
  const order = [...AXIS_IDS];

  for (let index = order.length - 1; index > 0; index -= 1) {
    const target = Math.floor(nextRandom(state) * (index + 1));
    [order[index], order[target]] = [order[target], order[index]];
  }

  return order;
}

export function isValidTieBreakOrder(
  value: readonly AxisId[] | undefined,
): value is readonly AxisId[] {
  return Boolean(
    value &&
      value.length === AXIS_IDS.length &&
      new Set(value).size === AXIS_IDS.length &&
      AXIS_IDS.every((axisId) => value.includes(axisId)),
  );
}

export function sortAxesByRawIndex(
  rawIndexes: Record<AxisId, number>,
  tieBreakOrder: readonly AxisId[],
  direction: "descending" | "ascending" = "descending",
): AxisId[] {
  const tieRank = new Map(tieBreakOrder.map((axisId, index) => [axisId, index]));
  const factor = direction === "descending" ? -1 : 1;

  return [...AXIS_IDS].sort((left, right) => {
    const scoreDifference = rawIndexes[left] - rawIndexes[right];
    if (scoreDifference !== 0) {
      return scoreDifference * factor;
    }
    return (tieRank.get(left) ?? 0) - (tieRank.get(right) ?? 0);
  });
}
