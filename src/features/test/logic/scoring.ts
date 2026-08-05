import { AXES, AXIS_IDS } from "../data/axes";
import { SCENARIO_SCORES } from "../data/scenarios";
import type {
  AxisId,
  AxisResult,
  CompleteAnswers,
  ScoredResult,
  ScoringInput,
} from "../types";
import { selectConfidenceLevel } from "./confidence";
import { calculateQualityFlags } from "./quality";
import { selectGrowthAxes, selectResultType } from "./result-type";
import { reverseScore, selectSkillLevel } from "./scoring-utils";
import { selectShadow } from "./shadow";
import {
  createTieBreakOrder,
  isValidTieBreakOrder,
} from "./tie-break";
import { validateScoringInput } from "./validation";

export function calculateAxis(
  axisId: AxisId,
  answers: CompleteAnswers,
): AxisResult {
  const configuration = AXES[axisId];
  const directSum = configuration.directItems.reduce(
    (sum, itemId) => sum + answers.likert[itemId],
    0,
  );
  const reverseSum = configuration.reverseItems.reduce(
    (sum, itemId) => sum + reverseScore(answers.likert[itemId]),
    0,
  );
  const likertSum = directSum + reverseSum;
  const optionId = answers.scenarios[configuration.scenarioId];
  const scenarioScore = SCENARIO_SCORES[configuration.scenarioId][optionId];

  if (!Number.isInteger(scenarioScore) || scenarioScore < 0 || scenarioScore > 4) {
    throw new Error(`Invalid scenario score for ${configuration.scenarioId}`);
  }

  const rawAxis = likertSum + scenarioScore;
  const rawIndex = rawAxis - 6;
  const axisScore = (rawIndex / 28) * 100;

  return {
    axisId,
    likertSum,
    likertIndex: likertSum - 6,
    scenarioScore,
    rawAxis,
    rawIndex,
    axisScore,
    skillLevel: selectSkillLevel(rawIndex),
  };
}

export function scoreTest(input: ScoringInput): ScoredResult {
  const validated = validateScoringInput(input);
  const tieBreakOrder = isValidTieBreakOrder(input.tieBreakOrder)
    ? [...input.tieBreakOrder]
    : createTieBreakOrder(input.tieBreakSeed);

  const axes = Object.fromEntries(
    AXIS_IDS.map((axisId) => [axisId, calculateAxis(axisId, validated.answers)]),
  ) as Record<AxisId, AxisResult>;

  const rawIndexes = Object.fromEntries(
    AXIS_IDS.map((axisId) => [axisId, axes[axisId].rawIndex]),
  ) as Record<AxisId, number>;

  const resultSelection = selectResultType(rawIndexes, tieBreakOrder);
  const growthAxes = selectGrowthAxes(rawIndexes, tieBreakOrder);
  const qualityFlags = calculateQualityFlags({
    answers: validated.answers,
    axes,
    startTime: input.startTime,
    endTime: input.endTime,
    responseDurationsMs: validated.responseDurationsMs,
    tradeCountRange: input.tradeCountRange,
  });
  const confidenceLevel = selectConfidenceLevel(
    input.tradeCountRange,
    qualityFlags,
  );
  const shadow = selectShadow(rawIndexes, confidenceLevel);

  return {
    testVersion: "beta-1.1-BPI-PV",
    algorithmVersion: "1.1",
    answers: validated.answers,
    startTime: input.startTime,
    endTime: input.endTime,
    responseDurationsMs: validated.responseDurationsMs,
    tradeCountRange: input.tradeCountRange,
    axes,
    qualityFlags,
    confidenceLevel,
    ...resultSelection,
    growthAxes,
    shadow,
    tieBreakSeed: input.tieBreakSeed,
    tieBreakOrder,
  };
}
