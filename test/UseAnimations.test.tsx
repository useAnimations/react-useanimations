import React, { StrictMode, useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import UseAnimations from '../src';
import activity from '../src/lib/activity';
import bluetooth from '../src/lib/bluetooth';
import checkBox from '../src/lib/checkBox';
import download from '../src/lib/download';
import github from '../src/lib/github';
import menu from '../src/lib/menu';
import share from '../src/lib/share';
import star from '../src/lib/star';
import { instances } from './fakePlayer';

vi.mock('../src/player', async () => (await import('./fakePlayer')).fakePlayerModule);

const live = () => instances.filter((instance) => !instance.destroyed);

const loaded = async (count = 1) => {
  await waitFor(() => expect(live()).toHaveLength(count));
  // Let React commit the loaded player and run the effects that depend on it.
  await act(async () => {});
  return live();
};

beforeEach(() => {
  instances.length = 0;
});

describe('lifecycle', () => {
  it('renders a single animation in StrictMode and destroys the discarded one', async () => {
    const { container } = render(
      <StrictMode>
        <UseAnimations animation={menu} />
      </StrictMode>
    );
    await loaded(1);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('destroys the animation on unmount', async () => {
    const { unmount } = render(<UseAnimations animation={menu} />);
    const [animation] = await loaded();
    unmount();
    expect(animation.destroyed).toBe(true);
  });

  it('reloads when the animation prop changes', async () => {
    const { container, rerender } = render(<UseAnimations animation={menu} />);
    const [first] = await loaded();
    rerender(<UseAnimations animation={star} />);
    await waitFor(() => expect(first.destroyed).toBe(true));
    const [second] = await loaded();
    expect(second.config.animationData).toBe(star.animationData);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('applies the speed', async () => {
    const { rerender } = render(<UseAnimations animation={menu} speed={2} />);
    const [animation] = await loaded();
    expect(animation.speed).toBe(2);
    rerender(<UseAnimations animation={menu} speed={0.5} />);
    expect(animation.speed).toBe(0.5);
  });
});

describe('interactions', () => {
  it('loops and autoplays looping icons, unless overridden', async () => {
    render(
      <>
        <UseAnimations animation={activity} />
        <UseAnimations animation={activity} loop={false} autoplay={false} />
      </>
    );
    const [looping, still] = await loaded(2);
    expect(looping.config).toMatchObject({ loop: true, autoplay: true });
    expect(still.config).toMatchObject({ loop: false, autoplay: false });
  });

  it('toggles click-toggle icons back and forth', async () => {
    const { container } = render(<UseAnimations animation={menu} />);
    const [animation] = await loaded();
    fireEvent.click(container.firstChild as Element);
    fireEvent.click(container.firstChild as Element);
    expect(animation.calls).toEqual(['play:1', 'play:-1']);
  });

  it('replays click-replay icons from the start', async () => {
    const { container } = render(<UseAnimations animation={download} />);
    const [animation] = await loaded();
    fireEvent.click(container.firstChild as Element);
    expect(animation.calls).toEqual(['segments:0-60']);
  });

  it('plays hover icons forward on enter and backward on leave', async () => {
    const { container } = render(<UseAnimations animation={share} />);
    const [animation] = await loaded();
    fireEvent.mouseEnter(container.firstChild as Element);
    fireEvent.mouseLeave(container.firstChild as Element);
    expect(animation.calls).toEqual(['play:1', 'play:-1']);
  });

  it('loops hover-loop icons while hovered and finishes the cycle on leave', async () => {
    const { container } = render(<UseAnimations animation={github} />);
    const [animation] = await loaded();
    expect(animation.config).toMatchObject({ loop: true, autoplay: false });
    fireEvent.mouseEnter(container.firstChild as Element);
    fireEvent.mouseLeave(container.firstChild as Element);
    expect(animation.calls).toEqual(['play:1']);
    animation.trigger('loopComplete');
    expect(animation.calls).toEqual(['play:1', 'goto:0']);
  });

  it('replays hover-replay icons on enter without restarting a running replay', async () => {
    const { container } = render(<UseAnimations animation={bluetooth} />);
    const [animation] = await loaded();
    expect(animation.config).toMatchObject({ loop: false, autoplay: false });
    fireEvent.mouseEnter(container.firstChild as Element);
    fireEvent.mouseLeave(container.firstChild as Element);
    fireEvent.mouseEnter(container.firstChild as Element);
    expect(animation.calls).toEqual(['segments:0-60']);
    animation.isPaused = true; // the replay finished
    fireEvent.mouseEnter(container.firstChild as Element);
    expect(animation.calls).toEqual(['segments:0-60', 'segments:0-60']);
  });

  it('lets the interaction prop override the default', async () => {
    const { container } = render(<UseAnimations animation={download} interaction="hover" />);
    const [animation] = await loaded();
    fireEvent.click(container.firstChild as Element);
    fireEvent.mouseEnter(container.firstChild as Element);
    expect(animation.calls).toEqual(['play:1']);
  });

  it('keeps the animation when users pass their own handlers', async () => {
    const onMouseEnter = vi.fn();
    const onClick = vi.fn();
    const { container } = render(
      <UseAnimations animation={share} onMouseEnter={onMouseEnter} onClick={onClick} />
    );
    const [animation] = await loaded();
    fireEvent.mouseEnter(container.firstChild as Element);
    fireEvent.click(container.firstChild as Element);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(animation.calls).toEqual(['play:1']);
  });

  it('skips the animation when a handler calls preventDefault', async () => {
    const { container } = render(
      <UseAnimations animation={menu} onClick={(event) => event.preventDefault()} />
    );
    const [animation] = await loaded();
    fireEvent.click(container.firstChild as Element);
    expect(animation.calls).toEqual([]);
  });
});

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <UseAnimations animation={checkBox} active={checked} onClick={() => setChecked(!checked)} />
  );
};

describe('controlled toggle (active)', () => {
  it('starts in the end state without animating when active is true', async () => {
    render(<UseAnimations animation={checkBox} active />);
    const [animation] = await loaded();
    expect(animation.calls).toEqual(['goto:59']);
  });

  it('animates back when active changes from the outside', async () => {
    const { rerender } = render(<UseAnimations animation={menu} active />);
    const [animation] = await loaded();
    rerender(<UseAnimations animation={menu} active={false} />);
    rerender(<UseAnimations animation={menu} reverse />);
    expect(animation.calls).toEqual(['goto:59', 'play:-1', 'play:1']);
  });

  it('plays once per click when the parent mirrors the state', async () => {
    const { container } = render(<Checkbox />);
    const [animation] = await loaded();
    fireEvent.click(container.firstChild as Element);
    fireEvent.click(container.firstChild as Element);
    expect(animation.calls).toEqual(['play:1', 'play:-1']);
  });
});

describe('styling', () => {
  it('passes colors as CSS variables to one shared stylesheet', async () => {
    const { container } = render(
      <>
        <UseAnimations animation={star} strokeColor="red" fillColor="pink" />
        <UseAnimations animation={star} />
      </>
    );
    await loaded(2);
    const [first, second] = Array.from(container.children) as HTMLElement[];
    expect(first.style.getPropertyValue('--ua-stroke')).toBe('red');
    expect(first.style.getPropertyValue('--ua-fill')).toBe('pink');
    expect(second.style.getPropertyValue('--ua-stroke')).toBe('');
    expect(second.hasAttribute('data-useanimations')).toBe(true);
    expect(document.head.querySelectorAll('#useanimations-styles')).toHaveLength(1);
  });

  it('sizes the wrapper and merges wrapperStyle and style', () => {
    const { container } = render(
      <UseAnimations
        animation={star}
        size={40}
        wrapperStyle={{ padding: 4 }}
        style={{ margin: 2 }}
        aria-label="Favorite"
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style).toMatchObject({
      width: '40px',
      height: '40px',
      padding: '4px',
      margin: '2px',
    });
    expect(wrapper.getAttribute('aria-label')).toBe('Favorite');
  });

  it('supports a custom wrapper through the render prop', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <UseAnimations
        animation={menu}
        onClick={onClick}
        render={(eventProps, animationProps) => (
          <button type="button" {...eventProps}>
            <span {...animationProps} />
          </button>
        )}
      />
    );
    const [animation] = await loaded();
    expect(getByRole('button').querySelector('svg')).not.toBeNull();
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(animation.calls).toEqual(['play:1']);
  });
});
