// Keyframe interpolation ported from lottie-web (MIT, Airbnb) so animations match its rendering.
import { easing, pointAlong, spatialBezier } from './bezier';
import type { EasingHandle, Keyframe, PathData, Property, Vector } from './lottie';

/** A property's value at a frame of its composition. */
export type Animated<T> = { animated: boolean; at: (frame: number) => T };

const constant = <T>(value: T): Animated<T> => ({ animated: false, at: () => value });

const isKeyframed = <T>(k: T | Keyframe<T>[]): k is Keyframe<T>[] =>
  Array.isArray(k) && typeof k[0] === 'object' && k[0] !== null && 't' in k[0];

const component = (value: number | number[], i: number) =>
  Array.isArray(value) ? (value[i] ?? value[0]) : value;

const ease = (out: EasingHandle | undefined, into: EasingHandle | undefined, i = 0) =>
  out && into
    ? easing(component(out.x, i), component(out.y, i), component(into.x, i), component(into.y, i))
    : (x: number) => x;

// The segment [keyframe, next] that contains `frame`, as lottie-web picks it.
const segment = <T>(keyframes: Keyframe<T>[], frame: number) => {
  const last = keyframes.length - 1;
  for (let i = 0; i < last; i += 1) {
    const next = keyframes[i + 1];
    if (i === last - 1 && frame >= next.t) {
      return { key: keyframes[i].h ? next : keyframes[i], next };
    }
    if (next.t > frame) return { key: keyframes[i], next };
  }
  return { key: keyframes[last - 1], next: keyframes[last] };
};

const vectorAt = (keyframes: Keyframe<Vector>[], frame: number): Vector => {
  const { key, next } = segment(keyframes, frame);
  const start = key.s as Vector;
  const end = next.s ?? key.e ?? start;
  if (key.to) {
    const data = spatialBezier(start, end, key.to, key.ti ?? []);
    if (frame >= next.t || frame < key.t) {
      return data.points[frame >= next.t ? data.points.length - 1 : 0].point;
    }
    return pointAlong(data, ease(key.o, key.i)((frame - key.t) / (next.t - key.t)));
  }
  return start.map((s, i) => {
    if (key.h === 1) return s;
    const perc =
      frame >= next.t
        ? 1
        : frame < key.t
          ? 0
          : ease(key.o, key.i, i)((frame - key.t) / (next.t - key.t));
    return s + (end[i] - s) * perc;
  });
};

const toVector = (value: number | Vector | undefined, fallback: Vector): Vector =>
  value === undefined ? fallback : typeof value === 'number' ? [value] : value;

// Supported expressions: `loopOut()` / `loopOut('cycle')` and `wiggle(freq, amp)`.
type Expression = (
  at: (frame: number) => Vector,
  keyframes?: Keyframe<Vector>[]
) => Animated<Vector>;

const random = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const expression = (source: string, frameRate: number): Expression | undefined => {
  if (/loopOut\(\s*(['"]cycle['"])?\s*\)/.test(source)) {
    return (at, keyframes) => ({
      animated: true,
      at: (frame) => {
        if (!keyframes) return at(frame);
        const first = keyframes[0].t;
        const last = keyframes[keyframes.length - 1].t;
        return frame <= last ? at(frame) : at(((frame - first) % (last - first)) + first);
      },
    });
  }
  const wiggle = /wiggle\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/.exec(source);
  if (wiggle) {
    // A seeded random walk like lottie-web's: one random step per 1/5 s (it always uses 5 steps
    // per second), deterministic so every frame renders the same.
    const amp = Number(wiggle[2]);
    return (at) => ({
      animated: true,
      at: (frame) => {
        const base = at(frame);
        const periods = Math.max(frame / frameRate, 0) * 5;
        return base.map((value, i) => {
          const next = random(i + 1);
          let offset = 0;
          for (let n = 0; n < Math.floor(periods); n += 1) offset += -amp + amp * 2 * next();
          return value + offset + (-amp + amp * 2 * next()) * (periods - Math.floor(periods));
        });
      },
    });
  }
  return undefined;
};

export type Warn = (message: string) => void;

export type Context = { frameRate: number; warn: Warn };

export const vector = (
  data: Property<Vector | number> | undefined,
  fallback: Vector,
  ctx: Context
): Animated<Vector> => {
  if (!data) return constant(fallback);
  const keyframes = isKeyframed(data.k)
    ? data.k.map((key) => ({
        ...key,
        s: key.s === undefined ? undefined : toVector(key.s, fallback),
        e: key.e === undefined ? undefined : toVector(key.e, fallback),
      }))
    : undefined;
  const at =
    keyframes && keyframes.length > 1 ? (frame: number) => vectorAt(keyframes, frame) : undefined;
  const value = at
    ? undefined
    : toVector(keyframes ? keyframes[0].s : (data.k as Vector), fallback);
  const base: Animated<Vector> = at ? { animated: true, at } : constant(value as Vector);
  if (!data.x) return base;
  const apply = expression(data.x, ctx.frameRate);
  if (!apply) {
    ctx.warn(`unsupported expression ignored: ${data.x}`);
    return base;
  }
  return apply(base.at, keyframes);
};

export const scalar = (
  data: Property<number> | undefined,
  fallback: number,
  ctx: Context
): Animated<number> => {
  const v = vector(data, [fallback], ctx);
  return v.animated ? { animated: true, at: (frame) => v.at(frame)[0] } : constant(v.at(0)[0]);
};

// PATHS: shapes with absolute tangents (Lottie stores them relative to their vertex).

export const absolute = (path: PathData): PathData => ({
  c: path.c,
  v: path.v,
  i: path.i.map((p, j) => [p[0] + path.v[j][0], p[1] + path.v[j][1]]),
  o: path.o.map((p, j) => [p[0] + path.v[j][0], p[1] + path.v[j][1]]),
});

const firstPath = (value: PathData | PathData[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const path = (data: Property<PathData | PathData[]>): Animated<PathData> => {
  if (!isKeyframed(data.k)) return constant(absolute(firstPath(data.k as PathData) as PathData));
  const keyframes = data.k.map((key) => ({
    ...key,
    s: key.s && absolute(firstPath(key.s) as PathData),
    e: key.e && absolute(firstPath(key.e) as PathData),
  }));
  const last = keyframes[keyframes.length - 1];
  return {
    animated: true,
    at: (frame) => {
      if (frame < keyframes[0].t) return keyframes[0].s as PathData;
      if (frame >= last.t) return (last.s ?? keyframes[keyframes.length - 2].e) as PathData;
      let i = 0;
      while (i < keyframes.length - 2 && keyframes[i + 1].t <= frame) i += 1;
      const key = keyframes[i];
      const next = keyframes[i + 1];
      const start = key.s as PathData;
      if (key.h === 1) return start;
      const end = (next.s ?? key.e) as PathData;
      const perc = ease(key.o, key.i)((frame - key.t) / (next.t - key.t));
      const lerp = (a: Vector[], b: Vector[]) =>
        a.map((p, j) => [p[0] + (b[j][0] - p[0]) * perc, p[1] + (b[j][1] - p[1]) * perc]);
      return {
        c: start.c,
        v: lerp(start.v, end.v),
        i: lerp(start.i, end.i),
        o: lerp(start.o, end.o),
      };
    },
  };
};
