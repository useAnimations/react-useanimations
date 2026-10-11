// The subset of the Lottie (bodymovin) JSON format that the player reads.

export type Vector = number[];

export type EasingHandle = { x: number | number[]; y: number | number[] };

export type Keyframe<T> = {
  t: number;
  s?: T;
  e?: T;
  i?: EasingHandle;
  o?: EasingHandle;
  h?: number;
  to?: Vector;
  ti?: Vector;
};

export type Property<T> = { a?: number; k: T | Keyframe<T>[]; x?: string };

export type PathData = { c: boolean; i: Vector[]; o: Vector[]; v: Vector[] };

export type TransformData = {
  a?: Property<Vector>;
  p?: Property<Vector> & { s?: boolean; x?: Property<number>; y?: Property<number> };
  s?: Property<Vector>;
  r?: Property<number>;
  o?: Property<number>;
  sk?: Property<number>;
  sa?: Property<number>;
};

export type ShapeItem = TransformData & {
  ty: string;
  hd?: boolean;
  // group
  it?: ShapeItem[];
  // path
  ks?: Property<PathData | PathData[]>;
  // rectangle / ellipse (size in `s`, direction in `d`)
  d?: number;
  // stroke / fill
  c?: Property<Vector>;
  w?: Property<number>;
  lc?: number;
  lj?: number;
  ml?: number;
  r?: number | Property<number>;
  // trim paths
  e?: Property<number>;
  m?: number;
};

export type MaskData = {
  mode: string;
  inv?: boolean;
  pt: Property<PathData | PathData[]>;
  o?: Property<number>;
};

export type LayerData = {
  ty: number;
  ind?: number;
  parent?: number;
  ip: number;
  op: number;
  st?: number;
  sr?: number;
  hd?: boolean;
  ks: TransformData;
  shapes?: ShapeItem[];
  masksProperties?: MaskData[];
  refId?: string;
  tm?: Property<number>;
  w?: number;
  h?: number;
};

export type AnimationData = {
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  layers: LayerData[];
  assets?: { id: string; layers?: LayerData[] }[];
};
