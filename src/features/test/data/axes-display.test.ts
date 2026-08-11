import { describe, expect, it } from "vitest";
import { AXES, AXIS_IDS } from "./axes";

const EXPECTED_DISPLAY_COPY = {
  architect: {
    persianName: "معمار",
    englishName: "THE ARCHITECT",
    tagline: "قبل از هر تصمیم، سیستم می‌سازد.",
  },
  oracle: {
    persianName: "بینش‌گر",
    englishName: "THE VISIONARY",
    tagline: "پشت نشانه‌ها، الگو را می‌بیند.",
  },
  alchemist: {
    persianName: "تبدیل‌گر",
    englishName: "THE ALCHEMIST",
    tagline: "تجربه را به مسیر تازه تبدیل می‌کند.",
  },
  phantom: {
    persianName: "ناظر",
    englishName: "THE OBSERVER",
    tagline: "قبل از واکنش، فاصله می‌گیرد و نگاه می‌کند.",
  },
  sovereign: {
    persianName: "فرمانروا",
    englishName: "THE SOVEREIGN",
    tagline: "حتی زیر فشار، قانونش را تغییر نمی‌دهد.",
  },
} as const;

describe("archetype display copy", () => {
  it("keeps the five internal axis IDs unchanged", () => {
    expect(AXIS_IDS).toEqual(["architect", "oracle", "alchemist", "phantom", "sovereign"]);
  });

  it("uses the approved Persian title, English subtitle, and tagline for every axis", () => {
    for (const axisId of AXIS_IDS) {
      expect({
        persianName: AXES[axisId].persianName,
        englishName: AXES[axisId].englishName,
        tagline: AXES[axisId].tagline,
      }).toEqual(EXPECTED_DISPLAY_COPY[axisId]);
    }
  });
});
