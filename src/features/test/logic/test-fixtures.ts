import type {
  CompleteAnswers,
  LikertQuestionId,
  LikertValue,
  QuestionId,
  ScenarioOptionId,
  ScenarioQuestionId,
  ScoringInput,
} from "../types";

export function completeAnswers(
  likertValue: LikertValue = 3,
  scenarioOption: ScenarioOptionId = "A",
): CompleteAnswers {
  return {
    likert: Object.fromEntries(
      Array.from({ length: 30 }, (_, index) => [index + 1, likertValue]),
    ) as Record<LikertQuestionId, LikertValue>,
    scenarios: Object.fromEntries(
      Array.from({ length: 5 }, (_, index) => [index + 31, scenarioOption]),
    ) as Record<ScenarioQuestionId, ScenarioOptionId>,
  };
}

export function durations(value = 5_000): Record<QuestionId, number> {
  return Object.fromEntries(
    Array.from({ length: 35 }, (_, index) => [index + 1, value]),
  ) as Record<QuestionId, number>;
}

export function scoringInput(answers = completeAnswers()): ScoringInput {
  return {
    answers,
    startTime: 1_000_000,
    endTime: 1_300_000,
    responseDurationsMs: durations(),
    tradeCountRange: "fifteen_plus",
    tieBreakSeed: "persisted-seed",
  };
}
