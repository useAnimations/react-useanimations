// Builds the same SVG structure as lottie-web's SVG renderer, so the output (and the CSS that recolors
// it) matches: one <g> per layer and group, and one <path> per stroke or fill.
import type {
  AnimationData,
  LayerData,
  MaskData,
  PathData,
  ShapeItem,
  TransformData,
} from './lottie';
import {
  identity,
  invert,
  type Matrix,
  multiply,
  rotate,
  scale,
  skewFromAxis,
  toCss,
  translate,
} from './matrix';
import { type Animated, type Context, path, scalar, vector } from './properties';
import { ellipse, pathString, rectangle, trim } from './shapes';

const SVG = 'http://www.w3.org/2000/svg';

let uid = 0;
const newId = () => `__ua_${(uid += 1)}`;

const create = <K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Record<string, string> = {}
) => {
  const element = document.createElementNS(SVG, name);
  for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
  return element;
};

// Writes an attribute only when its value changes.
const written = new WeakMap<Element, Record<string, string>>();
const attr = (element: Element, name: string, value: string) => {
  let values = written.get(element);
  if (!values) written.set(element, (values = {}));
  if (values[name] === value) return;
  values[name] = value;
  element.setAttribute(name, value);
};

const DEG = Math.PI / 180;

type Transform = { matrix: (frame: number) => Matrix; opacity: (frame: number) => number };

const transform = (data: TransformData, ctx: Context): Transform => {
  const anchor = vector(data.a, [0, 0, 0], ctx);
  const separated = data.p?.s;
  const position = separated ? undefined : vector(data.p, [0, 0, 0], ctx);
  const x = separated ? scalar(data.p?.x, 0, ctx) : undefined;
  const y = separated ? scalar(data.p?.y, 0, ctx) : undefined;
  const size = vector(data.s, [100, 100, 100], ctx);
  const rotation = scalar(data.r, 0, ctx);
  const skew = data.sk ? scalar(data.sk, 0, ctx) : undefined;
  const skewAxis = scalar(data.sa, 0, ctx);
  const opacity = scalar(data.o, 100, ctx);
  return {
    matrix: (frame) => {
      const [ax, ay] = anchor.at(frame);
      const [sx, sy] = size.at(frame);
      let m = scale(translate(identity(), -ax, -ay), sx / 100, sy / 100);
      if (skew) m = skewFromAxis(m, -skew.at(frame) * DEG, skewAxis.at(frame) * DEG);
      m = rotate(m, rotation.at(frame) * DEG);
      const [px, py] = position ? position.at(frame) : [x!.at(frame), y!.at(frame)];
      return translate(m, px, py);
    },
    opacity: (frame) => opacity.at(frame) / 100,
  };
};

// SHAPES

const LINE_CAPS = ['', 'butt', 'round', 'square'];
const LINE_JOINS = ['', 'miter', 'round', 'bevel'];

const rgb = ([r, g, b]: number[]) =>
  `rgb(${Math.floor(r * 255)},${Math.floor(g * 255)},${Math.floor(b * 255)})`;

type Style = {
  element: SVGPathElement;
  level: number;
  closed: boolean;
  d: string;
  render: (frame: number) => void;
};

const createStyle = (item: ShapeItem, level: number, ctx: Context): Style => {
  const element = create('path');
  const color = vector(item.c, [0, 0, 0, 1], ctx);
  const opacity = scalar(item.o, 100, ctx);
  const stroke = item.ty === 'st';
  const width = stroke ? scalar(item.w, 0, ctx) : undefined;
  if (stroke) {
    attr(element, 'stroke-linecap', LINE_CAPS[item.lc ?? 2]);
    attr(element, 'stroke-linejoin', LINE_JOINS[item.lj ?? 2]);
    attr(element, 'fill-opacity', '0');
    if (item.lj === 1) attr(element, 'stroke-miterlimit', String(item.ml ?? 4));
  } else if (item.r === 2) {
    attr(element, 'fill-rule', 'evenodd');
  }
  const kind = stroke ? 'stroke' : 'fill';
  return {
    element,
    level,
    closed: false,
    d: '',
    render: (frame) => {
      attr(element, kind, rgb(color.at(frame)));
      attr(element, `${kind}-opacity`, String(opacity.at(frame) / 100));
      if (width) attr(element, 'stroke-width', String(width.at(frame)));
    },
  };
};

type Group = { element: SVGGElement; transform: Transform; matrix: Matrix };
type Trim = {
  start: Animated<number>;
  end: Animated<number>;
  offset: Animated<number>;
  closed: boolean;
};
type Shape = {
  geometry: Animated<PathData>;
  level: number;
  groups: Group[];
  styles: Style[];
  trims: Trim[];
};

const geometry = (item: ShapeItem, ctx: Context): Animated<PathData> | undefined => {
  if (item.ty === 'sh' && item.ks) return path(item.ks);
  const position = vector(item.p, [0, 0], ctx);
  const size = vector(item.s, [0, 0], ctx);
  const reversed = item.d === 3;
  if (item.ty === 'el') {
    return {
      animated: position.animated || size.animated,
      at: (frame) => ellipse(position.at(frame), size.at(frame), reversed),
    };
  }
  if (item.ty === 'rc') {
    const roundness = scalar(item.r, 0, ctx);
    return {
      animated: position.animated || size.animated || roundness.animated,
      at: (frame) => rectangle(position.at(frame), size.at(frame), roundness.at(frame), reversed),
    };
  }
  return undefined;
};

const buildShapes = (items: ShapeItem[], root: SVGGElement, ctx: Context) => {
  const styles: Style[] = [];
  const groups: Group[] = [];
  const shapes: Shape[] = [];
  const trims: Trim[] = [];

  // Like lottie-web, walks the items backwards: a stroke or fill applies to the paths above it in its
  // group and in nested groups, and later items are painted below earlier ones.
  const search = (list: ShapeItem[], container: SVGGElement, level: number, parents: Group[]) => {
    const own = [...parents];
    const ownStyles: Style[] = [];
    const ownTrims: Trim[] = [];
    for (let i = list.length - 1; i >= 0; i -= 1) {
      const item = list[i];
      if (item.hd) continue;
      if (item.ty === 'st' || item.ty === 'fl') {
        const style = createStyle(item, level, ctx);
        container.appendChild(style.element);
        styles.push(style);
        ownStyles.push(style);
      } else if (item.ty === 'gr') {
        const element = create('g');
        search(item.it ?? [], element, level + 1, own);
        container.appendChild(element);
      } else if (item.ty === 'tr') {
        const group = { element: container, transform: transform(item, ctx), matrix: identity() };
        groups.push(group);
        own.push(group);
      } else if (item.ty === 'tm') {
        if (item.m === 2) ctx.warn('trim paths "individually" is drawn as "simultaneously"');
        const t: Trim = {
          start: scalar(item.s as ShapeItem['o'], 0, ctx),
          end: scalar(item.e, 100, ctx),
          offset: scalar(item.o, 0, ctx),
          closed: false,
        };
        trims.push(t);
        ownTrims.push(t);
      } else if (item.ty === 'mm') {
        // Merge paths: lottie-web's SVG renderer ignores them as well.
      } else {
        const shape = geometry(item, ctx);
        if (!shape) {
          ctx.warn(`unsupported shape "${item.ty}" ignored`);
          continue;
        }
        shapes.push({
          geometry: shape,
          level,
          groups: [...own],
          styles: styles.filter((style) => !style.closed),
          trims: trims.filter((t) => !t.closed),
        });
      }
    }
    for (const style of ownStyles) style.closed = true;
    for (const t of ownTrims) t.closed = true;
  };
  search(items, root, 0, []);

  return (frame: number) => {
    for (const group of groups) {
      group.matrix = group.transform.matrix(frame);
      attr(group.element, 'transform', toCss(group.matrix));
      attr(group.element, 'opacity', String(group.transform.opacity(frame)));
    }
    for (const style of styles) style.d = '';
    for (const shape of shapes) {
      let paths = [shape.geometry.at(frame)];
      // Inner trims first, then the trims of enclosing groups.
      for (let k = shape.trims.length - 1; k >= 0; k -= 1) {
        const t = shape.trims[k];
        paths = trim(paths, t.start.at(frame) / 100, t.end.at(frame) / 100, t.offset.at(frame));
      }
      for (const style of shape.styles) {
        // Transforms of groups nested below the style's group move the path itself.
        let m = identity();
        for (
          let k = shape.groups.length - 1, n = shape.level - style.level;
          n > 0;
          k -= 1, n -= 1
        ) {
          m = multiply(m, shape.groups[k].matrix);
        }
        for (const p of paths) style.d += pathString(p, m);
      }
    }
    for (const style of styles) {
      attr(style.element, 'd', style.d || 'M0 0');
      style.render(frame);
    }
  };
};

// MASKS

const buildMasks = (masks: MaskData[], target: SVGGElement, ctx: RenderContext) => {
  let type: 'clipPath' | 'mask' = 'clipPath';
  let current: SVGElement[] = [];
  const views: {
    element: SVGPathElement;
    shape: Animated<PathData>;
    opacity: Animated<number>;
    inverted: boolean;
    rect?: SVGRectElement;
  }[] = [];
  const solid = `M0,0 h${ctx.width} v${ctx.height} h-${ctx.width} v-${ctx.height} `;
  for (const mask of masks) {
    const opacity = scalar(mask.o, 100, ctx);
    if (
      (mask.mode !== 'a' && mask.mode !== 'n') ||
      mask.inv ||
      opacity.animated ||
      opacity.at(0) !== 100
    ) {
      type = 'mask';
    }
    if (mask.mode === 'n') continue;
    let rect: SVGRectElement | undefined;
    if ((mask.mode === 's' || mask.mode === 'i') && !views.length) {
      rect = create('rect', {
        fill: '#ffffff',
        width: String(ctx.width),
        height: String(ctx.height),
      });
      current.push(rect);
    }
    const element = create('path', {
      fill: mask.mode === 's' ? '#000000' : '#ffffff',
      'clip-rule': 'nonzero',
    });
    if (mask.mode === 'i') {
      const group = create('g');
      for (const child of current) group.appendChild(child);
      const id = newId();
      const intersect = create('mask', { id, 'mask-type': 'alpha' });
      intersect.appendChild(element);
      ctx.defs.appendChild(intersect);
      group.setAttribute('mask', `url(#${id})`);
      current = [group];
    } else {
      current.push(element);
    }
    views.push({ element, shape: path(mask.pt), opacity, inverted: Boolean(mask.inv), rect });
  }
  if (!views.length) return undefined;
  const id = newId();
  const container = create(type, { id });
  for (const child of current) container.appendChild(child);
  ctx.defs.appendChild(container);
  target.setAttribute(type === 'clipPath' ? 'clip-path' : 'mask', `url(#${id})`);

  return (frame: number, layerMatrix: Matrix) => {
    for (const view of views) {
      const shape = view.shape.at(frame);
      const d = pathString(shape, identity()).replace(/z$/, '');
      attr(view.element, 'd', shape.c ? (view.inverted ? solid + d : d) : '');
      attr(view.element, 'fill-opacity', String(view.opacity.at(frame) / 100));
      // Keeps the rect that subtract and intersect masks start from covering the whole animation.
      if (view.rect) attr(view.rect, 'transform', toCss(invert(layerMatrix)));
    }
  };
};

// LAYERS

type RenderContext = Context & {
  defs: SVGDefsElement;
  width: number;
  height: number;
  assets: Map<string, LayerData[]>;
};

type LayerNode = {
  data: LayerData;
  transform: Transform;
  matrix: Matrix;
  element?: SVGGElement;
  content?: (frame: number) => void;
  masks?: (frame: number, layerMatrix: Matrix) => void;
};

const buildComposition = (layers: LayerData[], container: SVGGElement, ctx: RenderContext) => {
  const nodes = layers.map((data): LayerNode => {
    const node = { data, transform: transform(data.ks, ctx), matrix: identity() };
    if (data.ty === 3) return node; // null layers only parent other layers
    // `element` gets the transform; `inner` the masks and the content.
    const element = create('g');
    let inner = element;
    if (data.ty === 0 && data.w && data.h) {
      // Precompositions are clipped to their size.
      const id = newId();
      const clip = create('clipPath', { id });
      clip.appendChild(
        create('path', { d: `M0,0 L${data.w},0 L${data.w},${data.h} L0,${data.h}z` })
      );
      ctx.defs.appendChild(clip);
      element.setAttribute('clip-path', `url(#${id})`);
      if (data.masksProperties?.length) {
        inner = create('g');
        element.appendChild(inner);
      }
    }
    let content: ((frame: number) => void) | undefined;
    if (data.ty === 4) {
      content = buildShapes(data.shapes ?? [], inner, ctx);
    } else if (data.ty === 0 && data.refId && ctx.assets.has(data.refId)) {
      const render = buildComposition(ctx.assets.get(data.refId)!, inner, ctx);
      const remap = data.tm ? scalar(data.tm, 0, ctx) : undefined;
      content = (frame) => {
        let local = remap
          ? remap.at(frame) * ctx.frameRate
          : (frame - (data.st ?? 0)) / (data.sr ?? 1);
        if (remap && local === data.op) local = data.op - 1;
        render(local);
      };
    } else {
      ctx.warn(`unsupported layer type ${data.ty} ignored`);
    }
    const masks = data.masksProperties?.length
      ? buildMasks(data.masksProperties, inner, ctx)
      : undefined;
    return { ...node, element, content, masks };
  });
  const byIndex = new Map(nodes.map((node) => [node.data.ind, node]));
  // The first layer is drawn on top.
  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    const element = nodes[i].element;
    if (element) container.appendChild(element);
  }

  return (frame: number) => {
    for (const node of nodes) node.matrix = node.transform.matrix(frame);
    for (const node of nodes) {
      const { data, element } = node;
      if (!element) continue;
      const visible = !data.hd && data.ip <= frame && frame < data.op;
      attr(element, 'display', visible ? 'inline' : 'none');
      if (!visible) continue;
      let m = node.matrix;
      for (
        let parent = byIndex.get(data.parent);
        parent;
        parent = byIndex.get(parent.data.parent)
      ) {
        m = multiply(m, parent.matrix);
      }
      attr(element, 'transform', toCss(m));
      attr(element, 'opacity', String(node.transform.opacity(frame)));
      node.masks?.(frame, m);
      node.content?.(frame);
    }
  };
};

export type Renderer = { svg: SVGSVGElement; render: (frame: number) => void };

export const createRenderer = (data: AnimationData, ctx: Context): Renderer => {
  const svg = create('svg', {
    viewBox: `0 0 ${data.w} ${data.h}`,
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMidYMid meet',
  });
  svg.style.display = 'block';
  const defs = create('defs');
  const clipId = newId();
  const clip = create('clipPath', { id: clipId });
  clip.appendChild(
    create('rect', { width: String(data.w), height: String(data.h), x: '0', y: '0' })
  );
  defs.appendChild(clip);
  const root = create('g', { 'clip-path': `url(#${clipId})` });
  svg.append(defs, root);
  const assets = new Map(
    (data.assets ?? []).filter((asset) => asset.layers).map((asset) => [asset.id, asset.layers!])
  );
  const render = buildComposition(data.layers, root, {
    ...ctx,
    defs,
    width: data.w,
    height: data.h,
    assets,
  });
  return { svg, render };
};
