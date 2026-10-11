// 2D affine matrix in lottie-web's convention: points are row vectors, so `a.multiply(b)` applies `a`
// first. `[a, b, c, d, e, f]` maps (x, y) to (a·x + c·y + e, b·x + d·y + f), like SVG's matrix().
export type Matrix = [number, number, number, number, number, number];

export const identity = (): Matrix => [1, 0, 0, 1, 0, 0];

export const isIdentity = (m: Matrix): boolean =>
  m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;

export const multiply = (m: Matrix, n: Matrix): Matrix => [
  m[0] * n[0] + m[1] * n[2],
  m[0] * n[1] + m[1] * n[3],
  m[2] * n[0] + m[3] * n[2],
  m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4],
  m[4] * n[1] + m[5] * n[3] + n[5],
];

export const translate = (m: Matrix, x: number, y: number): Matrix =>
  x === 0 && y === 0 ? m : [m[0], m[1], m[2], m[3], m[4] + x, m[5] + y];

export const scale = (m: Matrix, x: number, y: number): Matrix =>
  x === 1 && y === 1 ? m : multiply(m, [x, 0, 0, y, 0, 0]);

// Rotates clockwise on screen by `angle` radians.
export const rotate = (m: Matrix, angle: number): Matrix => {
  if (angle === 0) return m;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return multiply(m, [cos, sin, -sin, cos, 0, 0]);
};

// After Effects skew: `skew` radians along the axis at `axis` radians.
export const skewFromAxis = (m: Matrix, skew: number, axis: number): Matrix => {
  if (skew === 0) return m;
  const cos = Math.cos(axis);
  const sin = Math.sin(axis);
  const rotated = multiply(m, [cos, sin, -sin, cos, 0, 0]);
  return multiply(multiply(rotated, [1, 0, Math.tan(skew), 1, 0, 0]), [cos, -sin, sin, cos, 0, 0]);
};

export const invert = (m: Matrix): Matrix => {
  const det = m[0] * m[3] - m[1] * m[2];
  return [
    m[3] / det,
    -m[1] / det,
    -m[2] / det,
    m[0] / det,
    (m[2] * m[5] - m[3] * m[4]) / det,
    -(m[0] * m[5] - m[1] * m[4]) / det,
  ];
};

const round = (value: number) => Math.round(value * 100) / 100;

export const applyToPoint = (m: Matrix, x: number, y: number): string =>
  isIdentity(m)
    ? `${x},${y}`
    : `${round(x * m[0] + y * m[2] + m[4])},${round(x * m[1] + y * m[3] + m[5])}`;

const round4 = (value: number) => Math.round(value * 10000) / 10000;

export const toCss = (m: Matrix) => `matrix(${m.map(round4).join(',')})`;
