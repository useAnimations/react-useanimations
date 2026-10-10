import type { AnimationConfigWithData } from 'lottie-web';

// Minimal stand-in for a lottie AnimationItem that records what the component asks it to do.
export class FakeAnimation {
  calls: string[] = [];
  destroyed = false;
  direction = 1;
  speed = 1;
  totalFrames = 60;
  isPaused = true;
  isLoaded = true;
  listeners: Record<string, (() => void)[]> = {};
  svg: SVGSVGElement;

  constructor(
    public player: 'light' | 'full',
    public config: AnimationConfigWithData<'svg'>
  ) {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const id = (config.rendererSettings as { id?: string } | undefined)?.id;
    if (id) this.svg.id = id;
    (config.container as Element).appendChild(this.svg);
  }

  play() {
    this.calls.push(`play:${this.direction}`);
    this.isPaused = false;
  }

  goToAndStop(frame: number) {
    this.calls.push(`goto:${frame}`);
    this.isPaused = true;
  }

  addEventListener(name: string, callback: () => void) {
    (this.listeners[name] ??= []).push(callback);
  }

  trigger(name: string) {
    this.listeners[name]?.forEach((callback) => callback());
  }

  stop() {
    this.calls.push('stop');
    this.isPaused = true;
  }

  setDirection(direction: number) {
    this.direction = direction;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  playSegments(segments: [number, number], force: boolean) {
    this.calls.push(`segments:${segments.join('-')}:${force}`);
    this.isPaused = false;
  }

  destroy() {
    this.destroyed = true;
    this.svg.remove();
  }
}

export const instances: FakeAnimation[] = [];

export const fakePlayer = (player: 'light' | 'full') => ({
  default: {
    loadAnimation: (config: AnimationConfigWithData<'svg'>) => {
      const animation = new FakeAnimation(player, config);
      instances.push(animation);
      return animation;
    },
  },
});
