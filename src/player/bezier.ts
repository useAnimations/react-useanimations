// Bezier helpers ported from lottie-web (MIT, Airbnb) so animations match its rendering.
import type { Vector } from './lottie';

const CURVE_SEGMENTS = 150;

// EASING: cubic-bezier(x1, y1, x2, y2) timing functions, like CSS.

const NEWTON_ITERATIONS = 4;
const SAMPLES = 11;
const SAMPLE_STEP = 1 / (SAMPLES - 1);

const coefficients = (p1: number, p2: number) => [1 - 3 * p2 + 3 * p1, 3 * p2 - 6 * p1, 3 * p1];
const calc = (t: number, [a, b, c]: number[]) => ((a * t + b) * t + c) * t;
const slope = (t: number, [a, b, c]: number[]) => 3 * a * t * t + 2 * b * t + c;

const easings = new Map<string, (x: number) => number>();

export const easing = (x1: number, y1: number, x2: number, y2: number): ((x: number) => number) => {
  const key = `${x1},${y1},${x2},${y2}`;
  let fn = easings.get(key);
  if (fn) return fn;
  if (x1 === y1 && x2 === y2) {
    fn = (x) => x;
  } else {
    const cx = coefficients(x1, x2);
    const cy = coefficients(y1, y2);
    const samples = Array.from({ length: SAMPLES }, (_, i) => calc(i * SAMPLE_STEP, cx));
    const tForX = (x: number) => {
      let start = 0;
      let i = 1;
      for (; i !== SAMPLES - 1 && samples[i] <= x; i += 1) start += SAMPLE_STEP;
      i -= 1;
      let t = start + ((x - samples[i]) / (samples[i + 1] - samples[i])) * SAMPLE_STEP;
      const initialSlope = slope(t, cx);
      if (initialSlope >= 0.001) {
        for (let n = 0; n < NEWTON_ITERATIONS; n += 1) {
          const currentSlope = slope(t, cx);
          if (currentSlope === 0) break;
          t -= (calc(t, cx) - x) / currentSlope;
        }
        return t;
      }
      if (initialSlope === 0) return t;
      let a = start;
      let b = start + SAMPLE_STEP;
      for (let n = 0; n < 10; n += 1) {
        t = a + (b - a) / 2;
        const value = calc(t, cx) - x;
        if (Math.abs(value) <= 0.0000001) break;
        if (value > 0) b = t;
        else a = t;
      }
      return t;
    };
    fn = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : calc(tForX(x), cy));
  }
  easings.set(key, fn);
  return fn;
};

// LENGTHS: arc length tables used to trim paths by distance.

export type LengthData = { percents: number[]; lengths: number[]; total: number };

// p1/p2 are the segment's end points, c1/c2 its absolute control points.
export const segmentLength = (p1: Vector, p2: Vector, c1: Vector, c2: Vector): LengthData => {
  const percents: number[] = [];
  const lengths: number[] = [];
  let total = 0;
  let lastX = 0;
  let lastY = 0;
  for (let k = 0; k < CURVE_SEGMENTS; k += 1) {
    const t = k / (CURVE_SEGMENTS - 1);
    const u = 1 - t;
    const x = u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0];
    const y = u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1];
    if (k > 0) total += Math.hypot(x - lastX, y - lastY);
    lastX = x;
    lastY = y;
    percents[k] = t;
    lengths[k] = total;
  }
  return { percents, lengths, total };
};

// Bezier parameter at a fraction of the segment's length.
const distancePercent = (perc: number, { percents, lengths, total }: LengthData) => {
  const len = percents.length;
  let pos = Math.floor((len - 1) * perc);
  const target = perc * total;
  if (pos === len - 1 || pos === 0 || target === lengths[pos]) return percents[pos];
  const dir = lengths[pos] > target ? -1 : 1;
  for (;;) {
    if (lengths[pos] <= target && lengths[pos + 1] > target) {
      const local = (target - lengths[pos]) / (lengths[pos + 1] - lengths[pos]);
      return percents[pos] + (percents[pos + 1] - percents[pos]) * local;
    }
    pos += dir;
    if (pos < 0 || pos >= len - 1) return percents[Math.max(0, Math.min(pos, len - 1))];
  }
};

const round3 = (value: number) => Math.round(value * 1000) / 1000;

// The part of a segment between two fractions of its length: [p1, c1, c2, p2] as points.
export const splitSegment = (
  p1: Vector,
  p2: Vector,
  c1: Vector,
  c2: Vector,
  startPerc: number,
  endPerc: number,
  data: LengthData
): Vector[] => {
  const t0 = distancePercent(Math.min(Math.max(startPerc, 0), 1), data);
  const t1 = distancePercent(Math.min(endPerc, 1), data);
  const u0 = 1 - t0;
  const u1 = 1 - t1;
  const point = (i: number) => [
    round3(
      u0 * u0 * u0 * p1[i] +
        3 * t0 * u0 * u0 * c1[i] +
        3 * t0 * t0 * u0 * c2[i] +
        t0 * t0 * t0 * p2[i]
    ),
    round3(
      u0 * u0 * u1 * p1[i] +
        (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * c1[i] +
        (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * c2[i] +
        t0 * t0 * t1 * p2[i]
    ),
    round3(
      u0 * u1 * u1 * p1[i] +
        (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * c1[i] +
        (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * c2[i] +
        t0 * t1 * t1 * p2[i]
    ),
    round3(
      u1 * u1 * u1 * p1[i] +
        3 * t1 * u1 * u1 * c1[i] +
        3 * t1 * t1 * u1 * c2[i] +
        t1 * t1 * t1 * p2[i]
    ),
  ];
  const x = point(0);
  const y = point(1);
  return x.map((value, i) => [value, y[i]]);
};

// MOTION PATHS: positions that move along a curve (keyframes with spatial tangents).

export type SpatialData = { total: number; points: { partial: number; point: Vector }[] };

const onLine = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
  const det = x1 * y2 + y1 * x3 + x2 * y3 - x3 * y2 - y3 * x1 - x2 * y1;
  return det > -0.001 && det < 0.001;
};

const spatialCache = new Map<string, SpatialData>();

// `to`/`ti` are the tangents relative to the start and end points.
export const spatialBezier = (start: Vector, end: Vector, to: Vector, ti: Vector): SpatialData => {
  const key = [...start, ...end, ...to, ...ti].join('_');
  let data = spatialCache.get(key);
  if (data) return data;
  const straight =
    (start[0] !== end[0] || start[1] !== end[1]) &&
    onLine(start[0], start[1], end[0], end[1], start[0] + to[0], start[1] + to[1]) &&
    onLine(start[0], start[1], end[0], end[1], end[0] + ti[0], end[1] + ti[1]);
  const segments = straight ? 2 : CURVE_SEGMENTS;
  const points: SpatialData['points'] = [];
  let total = 0;
  let last: Vector | undefined;
  for (let k = 0; k < segments; k += 1) {
    const t = k / (segments - 1);
    const u = 1 - t;
    const point = start.map(
      (s, i) =>
        u * u * u * s +
        3 * u * u * t * (s + (to[i] ?? 0)) +
        3 * u * t * t * (end[i] + (ti[i] ?? 0)) +
        t * t * t * end[i]
    );
    const partial = last ? Math.hypot(...point.map((v, i) => v - (last as Vector)[i])) : 0;
    total += partial;
    points.push({ partial, point });
    last = point;
  }
  data = { total, points };
  spatialCache.set(key, data);
  return data;
};

export const pointAlong = ({ total, points }: SpatialData, perc: number): Vector => {
  const distance = total * perc;
  let added = 0;
  for (let j = 0; j < points.length; j += 1) {
    added += points[j].partial;
    if (distance === 0 || perc === 0 || j === points.length - 1) return points[j].point;
    const next = points[j + 1].partial;
    if (distance >= added && distance < added + next) {
      const local = (distance - added) / next;
      return points[j].point.map((v, i) => v + (points[j + 1].point[i] - v) * local);
    }
  }
  return points[points.length - 1].point;
};
