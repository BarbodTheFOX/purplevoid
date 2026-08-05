import { describe, expect, it } from "vitest";
import { AXES, AXIS_IDS, DIRECT_ITEM_IDS, REVERSE_ITEM_IDS } from "../data/axes";
import { SCENARIO_SCORES } from "../data/scenarios";
import type {
  AxisId,
  ScenarioOptionId,
  ScenarioQuestionId,
  TestAnswers,
} from "../types";
import { scoreTest } from "./scoring";
import { reverseScore } from "./scoring-utils";
import { completeAnswers, scoringInput } from "./test-fixtures";
import { createTieBreakOrder } from "./tie-break";
import { ScoringValidationError } from "./validation";

const ZERO_SCENARIO_OPTIONS: Record<ScenarioQuestionId, ScenarioOptionId> = {
  31: "A",
  32: "E",
  33: "C",
  34: "B",
  35: "E",
};

const MAX_SCENARIO_OPTIONS: Record<ScenarioQuestionId, ScenarioOptionId> = {
  31: "C",
  32: "D",
  33: "D",
  34: "C",
  35: "D",
};

describe("source mappings", () => {
  it("uses the exact axis item mappings", () => {
    expect(AXES.architect).toMatchObject({ directItems: [1, 6, 21, 26], reverseItems: [11, 16], scenarioId: 31 });
    expect(AXES.oracle).toMatchObject({ directItems: [2, 7, 17, 27], reverseItems: [12, 22], scenarioId: 32 });
    expect(AXES.alchemist).toMatchObject({ directItems: [3, 8, 18, 28], reverseItems: [13, 23], scenarioId: 33 });
    expect(AXES.phantom).toMatchObject({ directItems: [4, 9, 24, 29], reverseItems: [14, 19], scenarioId: 34 });
    expect(AXES.sovereign).toMatchObject({ directItems: [5, 10, 25, 30], reverseItems: [15, 20], scenarioId: 35 });
    expect(new Set([...DIRECT_ITEM_IDS, ...REVERSE_ITEM_IDS]).size).toBe(30);
  });

  it("uses every exact scenario mapping and every mapping is a 0..4 permutation", () => {
    expect(SCENARIO_SCORES).toEqual({
      31: { A: 0, B: 2, C: 4, D: 3, E: 1 },
      32: { A: 1, B: 2, C: 3, D: 4, E: 0 },
      33: { A: 1, B: 2, C: 0, D: 4, E: 3 },
      34: { A: 1, B: 0, C: 4, D: 3, E: 2 },
      35: { A: 1, B: 2, C: 3, D: 4, E: 0 },
    });
    for (const scenarioId of [31, 32, 33, 34, 35] as const) {
      expect(Object.values(SCENARIO_SCORES[scenarioId]).sort()).toEqual([0, 1, 2, 3, 4]);
    }
  });
});

describe("axis scoring", () => {
  it.each([
    [1, 5],
    [2, 4],
    [3, 3],
    [4, 2],
    [5, 1],
  ] as const)("reverse-scores %i as %i", (raw, expected) => {
    expect(reverseScore(raw)).toBe(expected);
  });

  it("produces the exact minimum score on every axis", () => {
    const answers = completeAnswers(1);
    for (const itemId of REVERSE_ITEM_IDS) answers.likert[itemId] = 5;
    answers.scenarios = { ...ZERO_SCENARIO_OPTIONS };

    const result = scoreTest(scoringInput(answers));
    for (const axisId of AXIS_IDS) {
      expect(result.axes[axisId]).toMatchObject({
        likertSum: 6,
        scenarioScore: 0,
        rawAxis: 6,
        rawIndex: 0,
        axisScore: 0,
      });
    }
  });

  it("produces the exact maximum score on every axis", () => {
    const answers = completeAnswers(5);
    for (const itemId of REVERSE_ITEM_IDS) answers.likert[itemId] = 1;
    answers.scenarios = { ...MAX_SCENARIO_OPTIONS };

    const result = scoreTest(scoringInput(answers));
    for (const axisId of AXIS_IDS) {
      expect(result.axes[axisId]).toMatchObject({
        likertSum: 30,
        scenarioScore: 4,
        rawAxis: 34,
        rawIndex: 28,
        axisScore: 100,
      });
    }
  });

  it("keeps AxisScore unrounded until display", () => {
    const answers = completeAnswers(1);
    for (const itemId of REVERSE_ITEM_IDS) answers.likert[itemId] = 5;
    answers.scenarios = { ...ZERO_SCENARIO_OPTIONS, 31: "E" };
    const result = scoreTest(scoringInput(answers));

    expect(result.axes.architect.rawIndex).toBe(1);
    expect(result.axes.architect.axisScore).toBe((1 / 28) * 100);
    expect(result.axes.architect.axisScore).not.toBe(Math.round((1 / 28) * 100));
  });
});

describe("validation and tie persistence", () => {
  it("blocks incomplete answers", () => {
    const input = scoringInput();
    const incomplete: TestAnswers = {
      likert: { ...input.answers.likert },
      scenarios: { ...input.answers.scenarios },
    };
    delete incomplete.likert[17];

    expect(() => scoreTest({ ...input, answers: incomplete })).toThrow(ScoringValidationError);
  });

  it("blocks an unknown scenario ID", () => {
    const input = scoringInput();
    const invalid = {
      ...input.answers,
      scenarios: { ...input.answers.scenarios, 31: "Z" },
    } as unknown as TestAnswers;

    expect(() => scoreTest({ ...input, answers: invalid })).toThrow(ScoringValidationError);
  });

  it("derives the same tie order from the same seed and persists a supplied order", () => {
    const expectedOrder = createTieBreakOrder("same-session");
    expect(createTieBreakOrder("same-session")).toEqual(expectedOrder);

    const supplied = [...expectedOrder].reverse() as AxisId[];
    const result = scoreTest({ ...scoringInput(), tieBreakSeed: "same-session", tieBreakOrder: supplied });
    expect(result.tieBreakOrder).toEqual(supplied);
  });
});
