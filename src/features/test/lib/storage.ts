import { z } from "zod";
import type { ScoredResult, StoredProgress } from "../types";

export const PROGRESS_STORAGE_KEY = "purple-void:pv-bpi:progress:beta-1.1";
export const RESULT_STORAGE_KEY = "purple-void:pv-bpi:result:beta-1.1";

const axisIdSchema = z.enum([
  "architect",
  "oracle",
  "alchemist",
  "phantom",
  "sovereign",
]);

const progressSchema = z.object({
  testVersion: z.literal("beta-1.1-BPI-PV"),
  algorithmVersion: z.literal("1.1"),
  answers: z.object({
    likert: z.record(z.string(), z.number().int().min(1).max(5)),
    scenarios: z.record(z.string(), z.enum(["A", "B", "C", "D", "E"])),
  }),
  currentQuestionIndex: z.number().int().min(0).max(34),
  startTime: z.number().finite(),
  questionShownAt: z.number().finite(),
  responseTimestamps: z.record(z.string(), z.number().finite()),
  responseDurationsMs: z.record(z.string(), z.number().finite().nonnegative()),
  tradeCountRange: z.enum([
    "zero",
    "one_to_seven",
    "eight_to_fourteen",
    "fifteen_plus",
  ]),
  tieBreakSeed: z.string().min(1),
  tieBreakOrder: z.array(axisIdSchema).length(5),
});

const resultSchema = z.object({
  testVersion: z.literal("beta-1.1-BPI-PV"),
  algorithmVersion: z.literal("1.1"),
  resultType: z.enum(["balanced", "blended", "primary_support", "dominant"]),
  confidenceLevel: z.enum(["usual", "medium", "low"]),
  tieBreakSeed: z.string().min(1),
  tieBreakOrder: z.array(axisIdSchema).length(5),
  axes: z.record(z.string(), z.unknown()),
  answers: z.record(z.string(), z.unknown()).or(z.object({ likert: z.unknown(), scenarios: z.unknown() })),
}).passthrough();

function readJson(key: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function readProgress(): StoredProgress | null {
  const parsed = progressSchema.safeParse(readJson(PROGRESS_STORAGE_KEY));
  return parsed.success ? (parsed.data as unknown as StoredProgress) : null;
}

export function saveProgress(progress: StoredProgress): void {
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function readResult(): ScoredResult | null {
  const parsed = resultSchema.safeParse(readJson(RESULT_STORAGE_KEY));
  return parsed.success ? (parsed.data as unknown as ScoredResult) : null;
}

export function saveResult(result: ScoredResult): void {
  window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
}

export function eraseTestData(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
  window.localStorage.removeItem(RESULT_STORAGE_KEY);
}
