import { AXES, AXIS_IDS } from "../data/axes";
import type { AxisId, AxisResult } from "../types";
import { formatPersianNumber } from "@/lib/format";

const SIZE = 360;
const CENTER = SIZE / 2;
const RADIUS = 125;

function point(index: number, value: number, radius = RADIUS) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / AXIS_IDS.length;
  const distance = radius * (value / 100);
  return {
    x: CENTER + Math.cos(angle) * distance,
    y: CENTER + Math.sin(angle) * distance,
  };
}

function polygon(values: readonly number[], radius = RADIUS): string {
  return values
    .map((value, index) => {
      const { x, y } = point(index, value, radius);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function AxisRadar({ axes }: { axes: Record<AxisId, AxisResult> }) {
  const scores = AXIS_IDS.map((axisId) => axes[axisId].axisScore);
  const lower = scores.map((value) => Math.max(0, value - 10));
  const upper = scores.map((value) => Math.min(100, value + 10));
  const summary = AXIS_IDS.map(
    (axisId) => `${AXES[axisId].persianName}: ${formatPersianNumber(Math.round(axes[axisId].axisScore))}`,
  ).join("، ");

  return (
    <figure className="radar-figure">
      <svg
        className="radar-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`نمودار پنج محور. ${summary}. عدم قطعیت نمایشی تقریبی مثبت و منفی ۱۰ امتیاز.`}
      >
        {[25, 50, 75, 100].map((level) => (
          <polygon className="radar-grid" points={polygon(AXIS_IDS.map(() => level))} key={level} />
        ))}
        {AXIS_IDS.map((_, index) => {
          const target = point(index, 100);
          return <line className="radar-axis-line" x1={CENTER} y1={CENTER} x2={target.x} y2={target.y} key={index} />;
        })}
        <polygon className="radar-uncertainty radar-uncertainty-outer" points={polygon(upper)} />
        <polygon className="radar-uncertainty radar-uncertainty-inner" points={polygon(lower)} />
        <polygon className="radar-score" points={polygon(scores)} />
        {scores.map((value, index) => {
          const target = point(index, value);
          return <circle className="radar-point" cx={target.x} cy={target.y} r="4.5" key={index} />;
        })}
        {AXIS_IDS.map((axisId, index) => {
          const target = point(index, 100, 151);
          const anchor = target.x < CENTER - 20 ? "end" : target.x > CENTER + 20 ? "start" : "middle";
          const labelX = anchor === "end"
            ? Math.max(target.x, 82)
            : anchor === "start"
              ? Math.min(target.x, 278)
              : target.x;
          return (
            <text className="radar-label" x={labelX} y={target.y} textAnchor={anchor} dominantBaseline="middle" key={axisId}>
              {AXES[axisId].englishName}
            </text>
          );
        })}
      </svg>
      <figcaption className="radar-legend">
        <span><i className="legend-score" />نمره نمایشی</span>
        <span><i className="legend-uncertainty" />عدم قطعیت تقریبی ±۱۰</span>
      </figcaption>
    </figure>
  );
}
