import type { AxisConfiguration, AxisId } from "../types";

export const AXIS_IDS = [
  "architect",
  "oracle",
  "alchemist",
  "phantom",
  "sovereign",
] as const satisfies readonly AxisId[];

export const AXES: Record<AxisId, AxisConfiguration> = {
  architect: {
    id: "architect",
    englishName: "THE ARCHITECT",
    persianName: "معمار",
    tagline: "قبل از هر تصمیم، سیستم می‌سازد.",
    competency: "انضباط فرایندی",
    directItems: [1, 6, 21, 26],
    reverseItems: [11, 16],
    scenarioId: 31,
  },
  oracle: {
    id: "oracle",
    englishName: "THE VISIONARY",
    persianName: "بینش‌گر",
    tagline: "پشت نشانه‌ها، الگو را می‌بیند.",
    competency: "کالیبراسیون شواهد",
    directItems: [2, 7, 17, 27],
    reverseItems: [12, 22],
    scenarioId: 32,
  },
  alchemist: {
    id: "alchemist",
    englishName: "THE ALCHEMIST",
    persianName: "تبدیل‌گر",
    tagline: "تجربه را به مسیر تازه تبدیل می‌کند.",
    competency: "یادگیری انعطاف پذیر",
    directItems: [3, 8, 18, 28],
    reverseItems: [13, 23],
    scenarioId: 33,
  },
  phantom: {
    id: "phantom",
    englishName: "THE OBSERVER",
    persianName: "ناظر",
    tagline: "قبل از واکنش، فاصله می‌گیرد و نگاه می‌کند.",
    competency: "فاصله گیری شناختی",
    directItems: [4, 9, 24, 29],
    reverseItems: [14, 19],
    scenarioId: 34,
  },
  sovereign: {
    id: "sovereign",
    englishName: "THE SOVEREIGN",
    persianName: "فرمانروا",
    tagline: "حتی زیر فشار، قانونش را تغییر نمی‌دهد.",
    competency: "خودتنظیمی",
    directItems: [5, 10, 25, 30],
    reverseItems: [15, 20],
    scenarioId: 35,
  },
};

export const DIRECT_ITEM_IDS = AXIS_IDS.flatMap(
  (axisId) => AXES[axisId].directItems,
);

export const REVERSE_ITEM_IDS = AXIS_IDS.flatMap(
  (axisId) => AXES[axisId].reverseItems,
);
