import { afterEach, describe, expect, it, vi } from "vitest";
import type { CompleteAnswers, StoredProgress } from "../types";
import { scoreTest } from "../logic/scoring";
import { PROGRESS_STORAGE_KEY, RESULT_STORAGE_KEY, readProgress, readResult, saveProgress, saveResult } from "./storage";

const incompleteResult = {
  testVersion: "beta-1.1-BPI-PV",
  algorithmVersion: "1.1",
  resultType: "balanced",
  confidenceLevel: "usual",
  tieBreakSeed: "seed",
  tieBreakOrder: ["architect", "oracle", "alchemist", "phantom", "sovereign"],
  axes: {},
  answers: {},
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("browser storage resilience", () => {
  it("rejects and clears structurally incomplete results", () => {
    const removeItem = vi.fn();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: vi.fn(() => JSON.stringify(incompleteResult)),
        removeItem,
      },
    });

    expect(readResult()).toBeNull();
    expect(removeItem).toHaveBeenCalledWith(RESULT_STORAGE_KEY);
  });

  it("returns false instead of throwing when progress cannot be saved", () => {
    vi.stubGlobal("window", {
      localStorage: {
        setItem: vi.fn(() => {
          throw new DOMException("Quota exceeded", "QuotaExceededError");
        }),
      },
    });

    expect(saveProgress({} as StoredProgress)).toBe(false);
  });

  it("rejects progress that jumps ahead with missing preceding answers", () => {
    const removeItem = vi.fn();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => key === PROGRESS_STORAGE_KEY ? JSON.stringify({
          testVersion: "beta-1.1-BPI-PV",
          algorithmVersion: "1.1",
          answers: { likert: {}, scenarios: {} },
          currentQuestionIndex: 34,
          startTime: 1,
          questionShownAt: 1,
          responseTimestamps: {},
          responseDurationsMs: {},
          tradeCountRange: "zero",
          tieBreakSeed: "seed",
          tieBreakOrder: ["architect", "oracle", "alchemist", "phantom", "sovereign"],
        }) : null,
        removeItem,
      },
    });

    expect(readProgress()).toBeNull();
    expect(removeItem).toHaveBeenCalledWith(PROGRESS_STORAGE_KEY);
  });

  it("round-trips a real scored result through the strict storage schema", () => {
    const values = new Map<string, string>();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
        removeItem: (key: string) => values.delete(key),
      },
    });

    const answers = {
      likert: Object.fromEntries(Array.from({ length: 30 }, (_, index) => [index + 1, 3])),
      scenarios: Object.fromEntries(Array.from({ length: 5 }, (_, index) => [index + 31, "C"])),
    } as CompleteAnswers;
    const result = scoreTest({
      answers,
      startTime: 1,
      endTime: 60_001,
      responseDurationsMs: Object.fromEntries(Array.from({ length: 35 }, (_, index) => [index + 1, 1_000])),
      tradeCountRange: "zero",
      tieBreakSeed: "seed",
      tieBreakOrder: ["architect", "oracle", "alchemist", "phantom", "sovereign"],
    });

    expect(saveResult(result)).toBe(true);
    expect(readResult()).toEqual(result);

    const missingAnswer = JSON.parse(values.get(RESULT_STORAGE_KEY) ?? "{}") as {
      answers: { likert: Record<string, number> };
    };
    delete missingAnswer.answers.likert["30"];
    values.set(RESULT_STORAGE_KEY, JSON.stringify(missingAnswer));
    expect(readResult()).toBeNull();
  });

  it("rejects a tie-break order containing a duplicate axis", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => key === PROGRESS_STORAGE_KEY ? JSON.stringify({
          testVersion: "beta-1.1-BPI-PV",
          algorithmVersion: "1.1",
          answers: { likert: {}, scenarios: {} },
          currentQuestionIndex: 0,
          startTime: 1,
          questionShownAt: 1,
          responseTimestamps: {},
          responseDurationsMs: {},
          tradeCountRange: "zero",
          tieBreakSeed: "seed",
          tieBreakOrder: ["architect", "architect", "alchemist", "phantom", "sovereign"],
        }) : null,
        removeItem: vi.fn(),
      },
    });

    expect(readProgress()).toBeNull();
  });
});
