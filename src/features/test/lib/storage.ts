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

const tradeCountRangeSchema = z.enum([
  "zero",
  "one_to_seven",
  "eight_to_fourteen",
  "fifteen_plus",
]);

const LIKERT_IDS = Array.from({ length: 30 }, (_, index) => String(index + 1));
const SCENARIO_IDS = Array.from({ length: 5 }, (_, index) => String(index + 31));
const likertValueSchema = z.number().int().min(1).max(5);
const scenarioValueSchema = z.enum(["A", "B", "C", "D", "E"]);

function keyedShape(ids: readonly string[], value: z.ZodTypeAny, optional: boolean): Record<string, z.ZodTypeAny> {
  return Object.fromEntries(ids.map((id) => [id, optional ? value.optional() : value]));
}

const partialAnswersSchema = z.object({
  likert: z.object(keyedShape(LIKERT_IDS, likertValueSchema, true)).strict(),
  scenarios: z.object(keyedShape(SCENARIO_IDS, scenarioValueSchema, true)).strict(),
});

const completeAnswersSchema = z.object({
  likert: z.object(keyedShape(LIKERT_IDS, likertValueSchema, false)).strict(),
  scenarios: z.object(keyedShape(SCENARIO_IDS, scenarioValueSchema, false)).strict(),
});

const tieBreakOrderSchema = z.array(axisIdSchema).length(5).refine(
  (order) => new Set(order).size === 5,
  "Tie-break order must contain every axis exactly once.",
);

const progressSchema = z.object({
  testVersion: z.literal("beta-1.1-BPI-PV"),
  algorithmVersion: z.literal("1.1"),
  answers: partialAnswersSchema,
  currentQuestionIndex: z.number().int().min(0).max(34),
  startTime: z.number().finite(),
  questionShownAt: z.number().finite(),
  responseTimestamps: z.record(z.string(), z.number().finite()),
  responseDurationsMs: z.record(z.string(), z.number().finite().nonnegative()),
  tradeCountRange: tradeCountRangeSchema,
  tieBreakSeed: z.string().min(1),
  tieBreakOrder: tieBreakOrderSchema,
}).superRefine((progress, context) => {
  const answers = progress.answers as {
    likert: Record<string, unknown>;
    scenarios: Record<string, unknown>;
  };
  for (let questionId = 1; questionId <= progress.currentQuestionIndex; questionId += 1) {
    const answer = questionId <= 30
      ? answers.likert[String(questionId)]
      : answers.scenarios[String(questionId)];
    if (answer === undefined) {
      context.addIssue({
        code: "custom",
        path: ["answers", questionId <= 30 ? "likert" : "scenarios", String(questionId)],
        message: "Previous answers must be complete before resuming this question.",
      });
      break;
    }
  }
});

const axisResultBaseSchema = z.object({
  likertSum: z.number().finite(),
  likertIndex: z.number().finite(),
  scenarioScore: z.number().finite(),
  rawAxis: z.number().finite(),
  rawIndex: z.number().finite(),
  axisScore: z.number().finite(),
  skillLevel: z.enum(["needs_building", "unstable", "active", "self_report_stable"]),
});

const axesSchema = z.object({
  architect: axisResultBaseSchema.extend({ axisId: z.literal("architect") }),
  oracle: axisResultBaseSchema.extend({ axisId: z.literal("oracle") }),
  alchemist: axisResultBaseSchema.extend({ axisId: z.literal("alchemist") }),
  phantom: axisResultBaseSchema.extend({ axisId: z.literal("phantom") }),
  sovereign: axisResultBaseSchema.extend({ axisId: z.literal("sovereign") }),
});

const qualityFlagSchema = z.object({
  id: z.enum([
    "fast_completion",
    "fast_items",
    "straight_lining",
    "fully_ideal",
    "internal_inconsistency",
    "self_report_scenario_divergence",
    "low_experience",
  ]),
  active: z.boolean(),
  label: z.string(),
  evidence: z.record(
    z.string(),
    z.union([z.number(), z.string(), z.boolean(), z.array(z.string())]),
  ),
});

const shadowSchema = z.object({
  id: z.enum(["rigidity", "analysis_loop", "strategy_hopping", "avoidant_distance", "overcontrol"]),
  name: z.string(),
  description: z.string(),
  highAxis: axisIdSchema,
  lowAxis: axisIdSchema,
  gap: z.number().finite(),
});

const resultSchema = z.object({
  testVersion: z.literal("beta-1.1-BPI-PV"),
  algorithmVersion: z.literal("1.1"),
  answers: completeAnswersSchema,
  startTime: z.number().finite(),
  endTime: z.number().finite(),
  responseDurationsMs: z.record(z.string(), z.number().finite().nonnegative()),
  tradeCountRange: tradeCountRangeSchema,
  axes: axesSchema,
  qualityFlags: z.array(qualityFlagSchema),
  confidenceLevel: z.enum(["usual", "medium", "low"]),
  resultType: z.enum(["balanced", "blended", "primary_support", "dominant"]),
  primaryAxis: axisIdSchema.nullable(),
  secondAxis: axisIdSchema.nullable(),
  growthAxes: z.array(axisIdSchema),
  shadow: shadowSchema.nullable(),
  tieBreakSeed: z.string().min(1),
  tieBreakOrder: tieBreakOrderSchema,
});

function removeStoredValue(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage may be blocked entirely; recovery still continues in memory.
  }
}

function readJson(key: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    removeStoredValue(key);
    return null;
  }
}

function writeJson(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readProgress(): StoredProgress | null {
  const value = readJson(PROGRESS_STORAGE_KEY);
  const parsed = progressSchema.safeParse(value);
  if (!parsed.success && value !== null) removeStoredValue(PROGRESS_STORAGE_KEY);
  return parsed.success ? (parsed.data as StoredProgress) : null;
}

export function saveProgress(progress: StoredProgress): boolean {
  return writeJson(PROGRESS_STORAGE_KEY, progress);
}

export function readResult(): ScoredResult | null {
  const value = readJson(RESULT_STORAGE_KEY);
  const parsed = resultSchema.safeParse(value);
  if (!parsed.success && value !== null) removeStoredValue(RESULT_STORAGE_KEY);
  return parsed.success ? (parsed.data as ScoredResult) : null;
}

export function saveResult(result: ScoredResult): boolean {
  return writeJson(RESULT_STORAGE_KEY, result);
}

export function eraseTestData(): void {
  if (typeof window === "undefined") return;
  removeStoredValue(PROGRESS_STORAGE_KEY);
  removeStoredValue(RESULT_STORAGE_KEY);
}
