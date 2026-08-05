export type AxisId =
  | "architect"
  | "oracle"
  | "alchemist"
  | "phantom"
  | "sovereign";

export type ScenarioOptionId = "A" | "B" | "C" | "D" | "E";
export type LikertValue = 1 | 2 | 3 | 4 | 5;
export type LikertQuestionId =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
export type ScenarioQuestionId = 31 | 32 | 33 | 34 | 35;
export type QuestionId = LikertQuestionId | ScenarioQuestionId;

export type ConfidenceLevel = "usual" | "medium" | "low";
export type ResultType =
  | "balanced"
  | "blended"
  | "primary_support"
  | "dominant";

export type SkillLevel =
  | "needs_building"
  | "unstable"
  | "active"
  | "self_report_stable";

export type TradeCountRange =
  | "zero"
  | "one_to_seven"
  | "eight_to_fourteen"
  | "fifteen_plus";

export type ShadowId =
  | "rigidity"
  | "analysis_loop"
  | "strategy_hopping"
  | "avoidant_distance"
  | "overcontrol";

export type QualityFlagId =
  | "fast_completion"
  | "fast_items"
  | "straight_lining"
  | "fully_ideal"
  | "internal_inconsistency"
  | "self_report_scenario_divergence"
  | "low_experience";

export interface LikertQuestion {
  readonly id: LikertQuestionId;
  readonly kind: "likert";
  readonly text: string;
}

export interface ScenarioOption {
  readonly id: ScenarioOptionId;
  readonly text: string;
}

export interface ScenarioQuestion {
  readonly id: ScenarioQuestionId;
  readonly kind: "scenario";
  readonly text: string;
  readonly options: readonly ScenarioOption[];
}

export type TestQuestion = LikertQuestion | ScenarioQuestion;

export interface TestAnswers {
  likert: Partial<Record<LikertQuestionId, LikertValue>>;
  scenarios: Partial<Record<ScenarioQuestionId, ScenarioOptionId>>;
}

export interface CompleteAnswers {
  likert: Record<LikertQuestionId, LikertValue>;
  scenarios: Record<ScenarioQuestionId, ScenarioOptionId>;
}

export interface AxisConfiguration {
  readonly id: AxisId;
  readonly englishName: string;
  readonly persianName: string;
  readonly competency: string;
  readonly directItems: readonly LikertQuestionId[];
  readonly reverseItems: readonly LikertQuestionId[];
  readonly scenarioId: ScenarioQuestionId;
}

export interface AxisResult {
  axisId: AxisId;
  likertSum: number;
  likertIndex: number;
  scenarioScore: number;
  rawAxis: number;
  rawIndex: number;
  axisScore: number;
  skillLevel: SkillLevel;
}

export interface QualityFlag {
  id: QualityFlagId;
  active: boolean;
  label: string;
  evidence: Record<string, number | string | boolean | readonly string[]>;
}

export interface ShadowResult {
  id: ShadowId;
  name: string;
  description: string;
  highAxis: AxisId;
  lowAxis: AxisId;
  gap: number;
}

export interface ScoringInput {
  answers: TestAnswers;
  startTime: number;
  endTime: number;
  responseDurationsMs: Partial<Record<QuestionId, number>>;
  tradeCountRange: TradeCountRange;
  tieBreakSeed: string;
  tieBreakOrder?: readonly AxisId[];
}

export interface ScoredResult {
  testVersion: "beta-1.1-BPI-PV";
  algorithmVersion: "1.1";
  answers: CompleteAnswers;
  startTime: number;
  endTime: number;
  responseDurationsMs: Record<QuestionId, number>;
  tradeCountRange: TradeCountRange;
  axes: Record<AxisId, AxisResult>;
  qualityFlags: QualityFlag[];
  confidenceLevel: ConfidenceLevel;
  resultType: ResultType;
  primaryAxis: AxisId | null;
  secondAxis: AxisId | null;
  growthAxes: AxisId[];
  shadow: ShadowResult | null;
  tieBreakSeed: string;
  tieBreakOrder: AxisId[];
}

export interface StoredProgress {
  testVersion: "beta-1.1-BPI-PV";
  algorithmVersion: "1.1";
  answers: TestAnswers;
  currentQuestionIndex: number;
  startTime: number;
  questionShownAt: number;
  responseTimestamps: Partial<Record<QuestionId, number>>;
  responseDurationsMs: Partial<Record<QuestionId, number>>;
  tradeCountRange: TradeCountRange;
  tieBreakSeed: string;
  tieBreakOrder: AxisId[];
}
