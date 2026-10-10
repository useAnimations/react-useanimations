// A small Lottie player for the features useAnimations icons use: shape layers, precompositions,
// parenting, paths, strokes, fills, trim paths, masks and keyframes (including motion paths, holds
// and the `loopOut` and `wiggle` expressions). Playback mirrors lottie-web's AnimationItem.
import type { AnimationData } from './lottie';
import { createRenderer, type Renderer } from './render';

export type PlayerEvent = 'complete' | 'loopComplete';

export type PlayerOptions = {
  container: Element;
  animationData: object;
  loop?: boolean | number;
  autoplay?: boolean;
};

// One requestAnimationFrame loop drives every playing animation.
const playing = new Set<Player>();
let frameRequest = 0;
let lastTime = 0;

const tick = (now: number) => {
  const elapsed = now - lastTime;
  lastTime = now;
  // A copy: advancing can start or stop other animations.
  for (const player of Array.from(playing)) player.advance(elapsed);
  frameRequest = playing.size ? requestAnimationFrame(tick) : 0;
};

const warned = new WeakMap<object, Set<string>>();
const warner = (data: object) => (message: string) => {
  let messages = warned.get(data);
  if (!messages) warned.set(data, (messages = new Set()));
  if (messages.has(message)) return;
  messages.add(message);
  console.warn(`react-useanimations: ${message}`);
};

export class Player {
  /** Number of frames in the current segment. */
  totalFrames: number;
  isPaused = true;
  private frame = 0;
  private firstFrame: number;
  private readonly frameRate: number;
  private readonly loop: boolean | number;
  private direction = 1;
  private speed = 1;
  private playCount = 0;
  private completedLoop = false;
  private readonly renderer: Renderer;
  private readonly listeners: Record<string, Set<() => void>> = {};

  constructor({ container, animationData, loop = false, autoplay = false }: PlayerOptions) {
    const data = animationData as AnimationData;
    if (!data || !Array.isArray(data.layers)) {
      throw new Error('react-useanimations: `animationData` is not a Lottie animation.');
    }
    this.renderer = createRenderer(data, { frameRate: data.fr, warn: warner(data) });
    container.appendChild(this.renderer.svg);
    this.frameRate = data.fr;
    this.firstFrame = data.ip;
    this.totalFrames = data.op - data.ip;
    this.loop = loop;
    this.setFrame(0);
    if (autoplay) this.play();
  }

  play(): void {
    if (!this.isPaused) return;
    this.isPaused = false;
    playing.add(this);
    if (!frameRequest) {
      lastTime = performance.now();
      frameRequest = requestAnimationFrame(tick);
    }
  }

  pause(): void {
    this.isPaused = true;
    playing.delete(this);
  }

  /** Shows a frame of the current segment and pauses. */
  goToAndStop(frame: number): void {
    this.setFrame(frame);
    this.pause();
  }

  setDirection(direction: number): void {
    this.direction = direction < 0 ? -1 : 1;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  /** Plays absolute frames `from` to `to`, backwards when `to` is smaller. */
  playSegments([from, to]: [number, number]): void {
    this.playCount = 0;
    if (to < from) {
      this.direction = -1;
      this.firstFrame = to;
      this.totalFrames = from - to;
      this.setFrame(this.totalFrames - 0.001);
    } else {
      this.direction = 1;
      this.firstFrame = from;
      this.totalFrames = to - from;
      this.setFrame(0.001);
    }
    this.play();
  }

  addEventListener(name: PlayerEvent, callback: () => void): () => void {
    (this.listeners[name] ??= new Set()).add(callback);
    return () => {
      this.listeners[name].delete(callback);
    };
  }

  destroy(): void {
    this.pause();
    this.renderer.svg.remove();
    for (const name of Object.keys(this.listeners)) this.listeners[name].clear();
  }

  /** Moves the animation forward by `elapsed` milliseconds, like lottie-web's advanceTime. */
  advance(elapsed: number): void {
    if (this.isPaused) return;
    const modifier = (this.frameRate / 1000) * this.speed * this.direction;
    let next = this.frame + elapsed * modifier;
    if (next >= this.totalFrames - 1 && modifier > 0) {
      if (this.loop && this.playCount !== this.loop) {
        if (next >= this.totalFrames) {
          this.playCount += 1;
          this.setFrame(next % this.totalFrames);
          this.completedLoop = true;
          this.trigger('loopComplete');
        } else {
          this.setFrame(next);
        }
        return;
      }
      next = this.totalFrames - 1;
    } else if (next < 0) {
      if (this.loop && !(this.playCount-- <= 0 && this.loop !== true)) {
        this.setFrame(this.totalFrames + (next % this.totalFrames));
        if (this.completedLoop) this.trigger('loopComplete');
        else this.completedLoop = true;
        return;
      }
      next = 0;
    } else {
      this.setFrame(next);
      return;
    }
    this.setFrame(next);
    this.pause();
    this.trigger('complete');
  }

  private setFrame(frame: number) {
    this.frame = frame;
    this.renderer.render(this.firstFrame + frame);
  }

  private trigger(name: PlayerEvent) {
    for (const callback of Array.from(this.listeners[name] ?? [])) callback();
  }
}

export const loadAnimation = (options: PlayerOptions): Player => new Player(options);
