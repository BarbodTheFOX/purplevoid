import { z } from "zod";
import { QUESTIONS } from "../data/questions";
import type {
  CompleteAnswers,
  LikertQuestionId,
  LikertValue,
  QuestionId,
  ScenarioOptionId,
  ScenarioQuestionId,
  ScoringInput,
} from "../types";

const likertSchema = z.number().int().min(1).max(5);
const scenarioSchema = z.enum(["A", "B", "C", "D", "E"]);

export class ScoringValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Scoring input is incomplete or invalid: ${issues.join(", ")}`);
    this.name = "ScoringValidationError";
  }
}

export interface ValidatedScoringInput {
  answers: CompleteAnswers;
  responseDurationsMs: Record<QuestionId, number>;
}

export function validateScoringInput(
  input: ScoringInput,
): ValidatedScoringInput {
  const issues: string[] = [];
  const likert: Partial<Record<LikertQuestionId, LikertValue>> = {};
  const scenarios: Partial<Record<ScenarioQuestionId, ScenarioOptionId>> = {};
  const responseDurationsMs: Partial<Record<QuestionId, number>> = {};

  for (const question of QUESTIONS) {
    if (question.kind === "likert") {
      const parsed = likertSchema.safeParse(input.answers.likert[question.id]);
      if (!parsed.success) {
        issues.push(`likert:${question.id}`);
      } else {
        likert[question.id] = parsed.data as LikertValue;
      }
    } else {
      const parsed = scenarioSchema.safeParse(input.answers.scenarios[question.id]);
      if (!parsed.success) {
        issues.push(`scenario:${question.id}`);
      } else {
        scenarios[question.id] = parsed.data;
      }
    }

    const duration = input.responseDurationsMs[question.id];
    if (typeof duration !== "number" || !Number.isFinite(duration) || duration < 0) {
      issues.push(`duration:${question.id}`);
    } else {
      responseDurationsMs[question.id] = duration;
    }
  }

  if (!Number.isFinite(input.startTime) || !Number.isFinite(input.endTime)) {
    issues.push("timestamps");
  } else if (input.endTime < input.startTime) {
    issues.push("timestamp-order");
  }

  if (!input.tieBreakSeed.trim()) {
    issues.push("tie-break-seed");
  }

  if (issues.length > 0) {
    throw new ScoringValidationError(issues);
  }

  return {
    answers: {
      likert: likert as Record<LikertQuestionId, LikertValue>,
      scenarios: scenarios as Record<ScenarioQuestionId, ScenarioOptionId>,
    },
    responseDurationsMs: responseDurationsMs as Record<QuestionId, number>,
  };
}
