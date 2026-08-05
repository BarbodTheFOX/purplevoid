import type { LikertValue, SkillLevel } from "../types";

export function reverseScore(rawAnswer: LikertValue): LikertValue {
  return (6 - rawAnswer) as LikertValue;
}

export function selectSkillLevel(rawIndex: number): SkillLevel {
  if (rawIndex <= 11) return "needs_building";
  if (rawIndex <= 16) return "unstable";
  if (rawIndex <= 22) return "active";
  return "self_report_stable";
}

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  needs_building: "نیازمند ساختن",
  unstable: "ناپایدار",
  active: "فعال",
  self_report_stable: "تثبیت شده در خودگزارش دهی",
};
