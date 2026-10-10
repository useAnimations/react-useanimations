import type { PlayerOptions } from '../src/player';

// Minimal stand-in for the player that records what the component asks it to do.
export class FakeAnimation {
  calls: string[] = [];
  destroyed = false;
  direction = 1;
  speed = 1;
  totalFrames = 60;
  isPaused = true;
  listeners: Record<string, (() => void)[]> = {};
  svg: SVGSVGElement;
  config: PlayerOptions;

  constructor(config: PlayerOptions) {
    this.config = config;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    config.container.appendChild(this.svg);
  }

  play() {
    this.calls.push(`play:${this.direction}`);
    this.isPaused = false;
  }

  pause() {
    this.isPaused = true;
  }

  goToAndStop(frame: number) {
    this.calls.push(`goto:${frame}`);
    this.isPaused = true;
  }

  setDirection(direction: number) {
    this.direction = direction;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  playSegments(segments: [number, number]) {
    this.calls.push(`segments:${segments.join('-')}`);
    this.isPaused = false;
  }

  addEventListener(name: string, callback: () => void) {
    (this.listeners[name] ??= []).push(callback);
    return () => undefined;
  }

  trigger(name: string) {
    this.listeners[name]?.forEach((callback) => callback());
  }

  destroy() {
    this.destroyed = true;
    this.svg.remove();
  }
}

export const instances: FakeAnimation[] = [];

export const fakePlayerModule = {
  loadAnimation: (options: PlayerOptions) => {
    const animation = new FakeAnimation(options);
    instances.push(animation);
    return animation;
  },
};
