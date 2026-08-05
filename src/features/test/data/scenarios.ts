import type {
  AxisId,
  ScenarioOptionId,
  ScenarioQuestionId,
} from "../types";

export const SCENARIO_SCORES = {
  31: { A: 0, B: 2, C: 4, D: 3, E: 1 },
  32: { A: 1, B: 2, C: 3, D: 4, E: 0 },
  33: { A: 1, B: 2, C: 0, D: 4, E: 3 },
  34: { A: 1, B: 0, C: 4, D: 3, E: 2 },
  35: { A: 1, B: 2, C: 3, D: 4, E: 0 },
} as const satisfies Record<
  ScenarioQuestionId,
  Record<ScenarioOptionId, number>
>;

export const SCENARIO_AXIS: Record<ScenarioQuestionId, AxisId> = {
  31: "architect",
  32: "oracle",
  33: "alchemist",
  34: "phantom",
  35: "sovereign",
};
