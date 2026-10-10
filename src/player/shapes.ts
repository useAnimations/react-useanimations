// Path geometry ported from lottie-web (MIT, Airbnb) so animations match its rendering.
import { type LengthData, segmentLength, splitSegment } from './bezier';
import type { PathData, Vector } from './lottie';
import { applyToPoint, type Matrix } from './matrix';

export const pathString = (path: PathData, m: Matrix): string => {
  const { v, i, o } = path;
  if (!v.length) return '';
  let d = ` M${applyToPoint(m, v[0][0], v[0][1])}`;
  for (let j = 1; j < v.length; j += 1) {
    d += ` C${applyToPoint(m, o[j - 1][0], o[j - 1][1])} ${applyToPoint(m, i[j][0], i[j][1])} ${applyToPoint(m, v[j][0], v[j][1])}`;
  }
  if (path.c) {
    const last = v.length - 1;
    d += ` C${applyToPoint(m, o[last][0], o[last][1])} ${applyToPoint(m, i[0][0], i[0][1])} ${applyToPoint(m, v[0][0], v[0][1])}z`;
  }
  return d;
};

// TRIM PATHS ("simultaneously": every path is trimmed on its own).

type Range = { s: number; e: number };
type Lengths = { segments: LengthData[]; total: number };

// Static paths are the same object every frame, so their lengths are measured once.
const measured = new WeakMap<PathData, Lengths>();

const lengthsOf = (path: PathData): Lengths => {
  const cached = measured.get(path);
  if (cached) return cached;
  const { v, i, o } = path;
  const segments: LengthData[] = [];
  let total = 0;
  for (let j = 0; j < v.length - 1; j += 1) {
    segments.push(segmentLength(v[j], v[j + 1], o[j], i[j + 1]));
    total += segments[j].total;
  }
  if (path.c && v.length) {
    const last = v.length - 1;
    segments.push(segmentLength(v[last], v[0], o[last], i[0]));
    total += segments[last].total;
  }
  const lengths = { segments, total };
  measured.set(path, lengths);
  return lengths;
};

const emptyPath = (): PathData => ({ c: false, v: [], i: [], o: [] });

const addSegment = (target: PathData, pos: number, points: Vector[], newShape: boolean) => {
  target.o[pos] = points[1];
  target.i[pos + 1] = points[2];
  if (newShape) target.v[pos] = points[0];
  target.v[pos + 1] = points[3];
};

const addShapes = (
  paths: PathData[],
  lengths: Lengths[],
  range: Range,
  continued?: PathData
): PathData[] => {
  let target = continued ?? emptyPath();
  let count = target.v.length;
  let initPos = count;
  const shapes = [target];
  let added = 0;
  let newShape = true;
  for (let p = 0; p < paths.length; p += 1) {
    const { v, i, o, c } = paths[p];
    const segments = lengths[p].segments;
    target.c = c;
    const end = c ? segments.length : segments.length + 1;
    let j = 1;
    for (; j < end; j += 1) {
      const data = segments[j - 1];
      if (added + data.total < range.s) {
        added += data.total;
        target.c = false;
      } else if (added > range.e) {
        target.c = false;
        break;
      } else {
        if (range.s <= added && range.e >= added + data.total) {
          addSegment(target, count, [v[j - 1], o[j - 1], i[j], v[j]], newShape);
        } else {
          const part = splitSegment(
            v[j - 1],
            v[j],
            o[j - 1],
            i[j],
            (range.s - added) / data.total,
            (range.e - added) / data.total,
            data
          );
          addSegment(target, count, part, newShape);
          target.c = false;
        }
        newShape = false;
        added += data.total;
        count += 1;
      }
    }
    if (c && segments.length) {
      const data = segments[j - 1];
      if (added <= range.e) {
        if (range.s <= added && range.e >= added + data.total) {
          addSegment(target, count, [v[j - 1], o[j - 1], i[0], v[0]], newShape);
        } else {
          const part = splitSegment(
            v[j - 1],
            v[0],
            o[j - 1],
            i[0],
            (range.s - added) / data.total,
            (range.e - added) / data.total,
            data
          );
          addSegment(target, count, part, newShape);
          target.c = false;
        }
        newShape = false;
      } else {
        target.c = false;
      }
      added += data.total;
      count += 1;
    }
    if (target.v.length > initPos) {
      target.i[initPos] = [...target.v[initPos]];
      target.o[target.v.length - 1] = [...target.v[target.v.length - 1]];
    }
    if (added > range.e) break;
    if (p < paths.length - 1) {
      target = emptyPath();
      newShape = true;
      shapes.push(target);
      count = 0;
      initPos = 0;
    }
  }
  return shapes;
};

/** Trims paths to [start, end] (fractions of their length) shifted by `offset` degrees. */
export const trim = (paths: PathData[], start: number, end: number, offset: number): PathData[] => {
  let o = (offset % 360) / 360;
  if (o < 0) o += 1;
  let s = (start > 1 ? 1 : start < 0 ? 0 : start) + o;
  let e = (end > 1 ? 1 : end < 0 ? 0 : end) + o;
  if (s > e) [s, e] = [e, s];
  s = Math.round(s * 10000) * 0.0001;
  e = Math.round(e * 10000) * 0.0001;
  if (s === e) return [];
  if ((e === 1 && s === 0) || (e === 0 && s === 1)) return paths;
  const lengths = paths.map(lengthsOf);
  const total = lengths.reduce((sum, l) => sum + l.total, 0);
  const ranges: Range[] =
    e <= 1
      ? [{ s: total * s, e: total * e }]
      : s >= 1
        ? [{ s: total * (s - 1), e: total * (e - 1) }]
        : [
            { s: total * s, e: total },
            { s: 0, e: total * (e - 1) },
          ];
  if (ranges[0].s === ranges[0].e) return [];
  const result: PathData[] = [];
  let shapes = addShapes(paths, lengths, ranges[0]);
  if (ranges.length > 1) {
    // A closed path continues across its start point into the second range.
    const continued = paths[paths.length - 1].c ? shapes.pop() : undefined;
    result.push(...shapes);
    shapes = addShapes(paths, lengths, ranges[1], continued);
  }
  result.push(...shapes);
  return result;
};

// PRIMITIVES for your own animations (useAnimations icons only use paths).

const ROUND = 0.5519;

export const ellipse = ([px, py]: Vector, [sx, sy]: Vector, reversed: boolean): PathData => {
  const w = sx / 2;
  const h = sy / 2;
  const cw = reversed ? -1 : 1;
  return {
    c: true,
    v: [
      [px, py - h],
      [px + w * cw, py],
      [px, py + h],
      [px - w * cw, py],
    ],
    i: [
      [px - w * ROUND * cw, py - h],
      [px + w * cw, py - h * ROUND],
      [px + w * ROUND * cw, py + h],
      [px - w * cw, py + h * ROUND],
    ],
    o: [
      [px + w * ROUND * cw, py - h],
      [px + w * cw, py + h * ROUND],
      [px - w * ROUND * cw, py + h],
      [px - w * cw, py - h * ROUND],
    ],
  };
};

export const rectangle = (
  [px, py]: Vector,
  [sx, sy]: Vector,
  roundness: number,
  reversed: boolean
): PathData => {
  const w = sx / 2;
  const h = sy / 2;
  const r = Math.min(w, h, roundness);
  const k = r * (1 - ROUND);
  // [vertex, out tangent, in tangent], clockwise from the top of the right edge.
  const points: [Vector, Vector, Vector][] = r
    ? [
        [
          [px + w, py - h + r],
          [px + w, py - h + r],
          [px + w, py - h + k],
        ],
        [
          [px + w, py + h - r],
          [px + w, py + h - k],
          [px + w, py + h - r],
        ],
        [
          [px + w - r, py + h],
          [px + w - r, py + h],
          [px + w - k, py + h],
        ],
        [
          [px - w + r, py + h],
          [px - w + k, py + h],
          [px - w + r, py + h],
        ],
        [
          [px - w, py + h - r],
          [px - w, py + h - r],
          [px - w, py + h - k],
        ],
        [
          [px - w, py - h + r],
          [px - w, py - h + k],
          [px - w, py - h + r],
        ],
        [
          [px - w + r, py - h],
          [px - w + r, py - h],
          [px - w + k, py - h],
        ],
        [
          [px + w - r, py - h],
          [px + w - k, py - h],
          [px + w - r, py - h],
        ],
      ]
    : [
        [
          [px + w, py - h],
          [px + w, py - h],
          [px + w, py - h],
        ],
        [
          [px + w, py + h],
          [px + w, py + h],
          [px + w, py + h],
        ],
        [
          [px - w, py + h],
          [px - w, py + h],
          [px - w, py + h],
        ],
        [
          [px - w, py - h],
          [px - w, py - h],
          [px - w, py - h],
        ],
      ];
  if (reversed) {
    points.reverse();
    for (const point of points) [point[1], point[2]] = [point[2], point[1]];
  }
  return {
    c: true,
    v: points.map((point) => point[0]),
    o: points.map((point) => point[1]),
    i: points.map((point) => point[2]),
  };
};
