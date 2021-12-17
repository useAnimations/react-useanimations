import React from 'react';
import { withInfo } from '@storybook/addon-info';
import activity from '../lib/activity';
import youtube from '../lib/youtube';
import star from '../lib/star';
import heart from '../lib/heart';
import UseAnimation from '..';

export default {
  title: 'Variants',
  component: UseAnimation,
  decorators: [withInfo],
};

export const Stroke = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ padding: '20px' }}>
      <span>activity</span>
      <UseAnimation
        strokeColor="green"
        size={40}
        wrapperStyle={{ marginTop: '5px' }}
        animation={activity}
      />
    </div>
    <div style={{ padding: '20px' }}>
      <span>activity</span>
      <UseAnimation
        strokeColor="red"
        size={40}
        wrapperStyle={{ marginTop: '5px' }}
        animation={youtube}
      />
    </div>
  </div>
);

Stroke.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const Stroke = () => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ padding: '20px' }}>
            <span>activity</span>
            <UseAnimation
              strokeColor="green"
              size={40}
              wrapperStyle={{ marginTop: '5px' }}
              animation={activity}
            />
          </div>
          <div style={{ padding: '20px' }}>
            <span>activity</span>
            <UseAnimation
              strokeColor="red"
              size={40}
              wrapperStyle={{ marginTop: '5px' }}
              animation={youtube}
            />
          </div>
        </div>
      );
      ~~~
    `,
    },
  },
};

export const Fill = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ padding: '20px' }}>
      <span>star</span>
      <UseAnimation
        fillColor="green"
        size={40}
        wrapperStyle={{ marginTop: '5px' }}
        animation={star}
      />
    </div>
    <div style={{ padding: '20px' }}>
      <span>heart</span>
      <UseAnimation
        fillColor="red"
        size={40}
        wrapperStyle={{ marginTop: '5px' }}
        animation={heart}
      />
    </div>
  </div>
);

Fill.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const Fill = () => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ padding: '20px' }}>
            <span>star</span>
            <UseAnimation
              fillColor="green"
              size={40}
              wrapperStyle={{ marginTop: '5px' }}
              animation={star}
            />
          </div>
          <div style={{ padding: '20px' }}>
            <span>heart</span>
            <UseAnimation
              fillColor="red"
              size={40}
              wrapperStyle={{ marginTop: '5px' }}
              animation={heart}
            />
          </div>
        </div>
      );
      ~~~
    `,
    },
  },
};

export const CustomCSS = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ padding: '20px' }}>
      <span>activity</span>
      <UseAnimation
        size={40}
        pathCss="stroke: purple; stroke-width: 2%;"
        wrapperStyle={{ marginTop: '5px' }}
        animation={activity}
      />
    </div>
  </div>
);

CustomCSS.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const CustomCSS = () => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ padding: '20px' }}>
            <span>activity</span>
            <UseAnimation
              size={40}
              pathCss="stroke: purple; stroke-width: 2%;"
              wrapperStyle={{ marginTop: '5px' }}
              animation={activity}
            />
          </div>
        </div>
      );
      ~~~
    `,
    },
  },
};

export const Size = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ padding: '20px' }}>
      <span>activity</span>
      <UseAnimation size={60} wrapperStyle={{ marginTop: '5px' }} animation={activity} />
    </div>
  </div>
);

Size.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const Size = () => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ padding: '20px' }}>
            <span>activity</span>
            <UseAnimation size={60} wrapperStyle={{ marginTop: '5px' }} animation={activity} />
          </div>
        </div>
      );
      ~~~
    `,
    },
  },
};

export const WrapperElement = () => {
  return (
    <UseAnimation
      animation={heart}
      size={60}
      onClick={() => {
        // eslint-disable-next-line
        console.log('additional onClick cb is working');
      }}
      render={(eventProps, animationProps) => (
        <button style={{ padding: '20px' }} type="button" {...eventProps}>
          <div {...animationProps} />
        </button>
      )}
    />
  );
};

WrapperElement.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const WrapperElement = () => {
        return (
          <UseAnimation
            animation={heart}
            size={60}
            onClick={() => {
              // eslint-disable-next-line
              console.log('additional onClick cb is working');
            }}
            render={(eventProps, animationProps) => (
              <button style={{ padding: '20px' }} type="button" {...eventProps}>
                <div {...animationProps} />
              </button>
            )}
          />
        );
      };
      ~~~
    `,
    },
  },
};
