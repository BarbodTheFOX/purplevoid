import { describe, expect, it } from "vitest";
import { AXIS_IDS } from "../data/axes";
import type {
  AxisId,
  AxisResult,
  CompleteAnswers,
  LikertQuestionId,
  LikertValue,
  QualityFlag,
  QuestionId,
} from "../types";
import { selectConfidenceLevel } from "./confidence";
import { calculateQualityFlags } from "./quality";
import { selectGrowthAxes, selectResultType } from "./result-type";
import { selectShadow } from "./shadow";
import { completeAnswers, durations } from "./test-fixtures";

const ORDER: AxisId[] = ["architect", "oracle", "alchemist", "phantom", "sovereign"];

function indexes(values: readonly number[]): Record<AxisId, number> {
  return Object.fromEntries(AXIS_IDS.map((axisId, index) => [axisId, values[index]])) as Record<AxisId, number>;
}

function axisResults(
  likertIndexes: Partial<Record<AxisId, number>> = {},
  scenarioScores: Partial<Record<AxisId, number>> = {},
): Record<AxisId, AxisResult> {
  return Object.fromEntries(
    AXIS_IDS.map((axisId) => {
      const likertIndex = likertIndexes[axisId] ?? 12;
      const scenarioScore = scenarioScores[axisId] ?? 2;
      const rawIndex = likertIndex + scenarioScore;
      return [axisId, {
        axisId,
        likertSum: likertIndex + 6,
        likertIndex,
        scenarioScore,
        rawAxis: rawIndex + 6,
        rawIndex,
        axisScore: (rawIndex / 28) * 100,
        skillLevel: "unstable",
      } satisfies AxisResult];
    }),
  ) as Record<AxisId, AxisResult>;
}

function patternedAnswers(): CompleteAnswers {
  const answers = completeAnswers();
  for (let id = 1; id <= 30; id += 1) {
    answers.likert[id as LikertQuestionId] = (((id - 1) % 5) + 1) as LikertValue;
  }
  return answers;
}

function quality(overrides: Partial<Parameters<typeof calculateQualityFlags>[0]> = {}) {
  return calculateQualityFlags({
    answers: patternedAnswers(),
    axes: axisResults(),
    startTime: 0,
    endTime: 300_000,
    responseDurationsMs: durations(5_000),
    tradeCountRange: "fifteen_plus",
    ...overrides,
  });
}

function flag(flags: QualityFlag[], id: QualityFlag["id"]): QualityFlag {
  return flags.find((item) => item.id === id)!;
}

describe("result types", () => {
  it("selects BALANCED first", () => {
    expect(selectResultType(indexes([14, 13, 12, 11, 10]), ORDER).resultType).toBe("balanced");
  });

  it("selects BLENDED when the profile is not balanced and the top gap is at most 2", () => {
    expect(selectResultType(indexes([20, 18, 12, 11, 10]), ORDER)).toMatchObject({ resultType: "blended", primaryAxis: "architect", secondAxis: "oracle" });
  });

  it("selects PRIMARY_SUPPORT at an exact gap of 3 or 4", () => {
    expect(selectResultType(indexes([20, 17, 12, 11, 10]), ORDER).resultType).toBe("primary_support");
    expect(selectResultType(indexes([20, 16, 12, 11, 10]), ORDER).resultType).toBe("primary_support");
  });

  it("selects DOMINANT at a top gap of at least 5", () => {
    expect(selectResultType(indexes([20, 15, 12, 11, 10]), ORDER)).toMatchObject({ resultType: "dominant", primaryAxis: "architect", secondAxis: null });
  });
});

describe("growth paths", () => {
  it("selects one growth axis when the bottom gap is more than 2", () => {
    expect(selectGrowthAxes(indexes([20, 18, 16, 10, 6]), ORDER)).toEqual(["sovereign"]);
  });

  it("selects two growth axes when the bottom gap is at most 2", () => {
    expect(selectGrowthAxes(indexes([20, 18, 16, 8, 6]), ORDER)).toEqual(["sovereign", "phantom"]);
  });
});

describe("quality flags", () => {
  it("detects total completion under 150 seconds", () => {
    expect(flag(quality({ endTime: 149_999 }), "fast_completion").active).toBe(true);
  });

  it("detects more than 20 percent of items under 2 seconds", () => {
    const responseDurationsMs = durations(5_000);
    for (let id = 1; id <= 8; id += 1) responseDurationsMs[id as QuestionId] = 1_999;
    expect(flag(quality({ responseDurationsMs }), "fast_items").active).toBe(true);
  });

  it("does not activate item speed at exactly 20 percent", () => {
    const responseDurationsMs = durations(5_000);
    for (let id = 1; id <= 7; id += 1) responseDurationsMs[id as QuestionId] = 1_999;
    expect(flag(quality({ responseDurationsMs }), "fast_items").active).toBe(false);
  });

  it("detects an identical run of at least 8", () => {
    const answers = patternedAnswers();
    for (let id = 1; id <= 8; id += 1) answers.likert[id as LikertQuestionId] = 2;
    expect(flag(quality({ answers }), "straight_lining").active).toBe(true);
  });

  it("detects the same option on at least 70 percent of Likert items", () => {
    const answers = patternedAnswers();
    for (let id = 1; id <= 21; id += 1) answers.likert[id as LikertQuestionId] = 4;
    expect(flag(quality({ answers }), "straight_lining").active).toBe(true);
  });

  it("detects the fully ideal pattern", () => {
    const answers = completeAnswers(3);
    const direct = [1, 6, 21, 26, 2, 7, 17, 27, 3, 8, 18, 28, 4, 9, 24, 29, 5, 10, 25, 30] as const;
    const reverse = [11, 16, 12, 22, 13, 23, 14, 19, 15, 20] as const;
    direct.forEach((id) => { answers.likert[id] = 5; });
    reverse.forEach((id) => { answers.likert[id] = 1; });
    expect(flag(quality({ answers }), "fully_ideal").active).toBe(true);
  });

  it("detects internal inconsistency in at least two control pairs after reverse scoring", () => {
    const answers = patternedAnswers();
    answers.likert[1] = 5;
    answers.likert[16] = 5;
    answers.likert[7] = 5;
    answers.likert[12] = 5;
    expect(flag(quality({ answers }), "internal_inconsistency").active).toBe(true);
  });

  it("detects divergence in at least three axes", () => {
    const axes = axisResults(
      { architect: 19, oracle: 20, alchemist: 21 },
      { architect: 1, oracle: 0, alchemist: 1 },
    );
    expect(flag(quality({ axes }), "self_report_scenario_divergence").active).toBe(true);
  });

  it("detects fewer than 8 real trades", () => {
    expect(flag(quality({ tradeCountRange: "one_to_seven" }), "low_experience").active).toBe(true);
  });
});

describe("confidence", () => {
  const inactive = quality().map((item) => ({ ...item, active: false }));

  it("is usual for 15+ trades and zero flags", () => {
    expect(selectConfidenceLevel("fifteen_plus", inactive)).toBe("usual");
  });

  it("is medium for 8-14 trades or exactly one flag", () => {
    expect(selectConfidenceLevel("eight_to_fourteen", inactive)).toBe("medium");
    const one = inactive.map((item, index) => ({ ...item, active: index === 0 }));
    expect(selectConfidenceLevel("fifteen_plus", one)).toBe("medium");
  });

  it("is low for fewer than 8 trades or at least two flags", () => {
    expect(selectConfidenceLevel("one_to_seven", inactive)).toBe("low");
    const two = inactive.map((item, index) => ({ ...item, active: index < 2 }));
    expect(selectConfidenceLevel("fifteen_plus", two)).toBe("low");
  });
});

describe("shadow rules", () => {
  it.each([
    [[20, 17, 14, 17, 17], "rigidity"],
    [[18, 20, 17, 17, 14], "analysis_loop"],
    [[14, 17, 20, 17, 17], "strategy_hopping"],
    [[14, 17, 17, 20, 18], "avoidant_distance"],
    [[17, 17, 17, 14, 20], "overcontrol"],
  ] as const)("selects every individual shadow rule", (values, expected) => {
    expect(selectShadow(indexes(values), "usual")?.id).toBe(expected);
  });

  it("selects the active shadow with the largest gap", () => {
    expect(selectShadow(indexes([24, 25, 10, 17, 14]), "usual")?.id).toBe("rigidity");
  });

  it("suppresses tied largest gaps", () => {
    expect(selectShadow(indexes([24, 24, 10, 17, 10]), "usual")).toBeNull();
  });

  it("suppresses all shadows at low confidence", () => {
    expect(selectShadow(indexes([20, 17, 14, 17, 17]), "low")).toBeNull();
  });

  it("returns no shadow when a condition is incomplete", () => {
    expect(selectShadow(indexes([19, 19, 15, 19, 15]), "usual")).toBeNull();
  });
});
