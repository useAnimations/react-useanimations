import React from 'react';
import activity from '../lib/activity';
import youtube from '../lib/youtube';
import UseAnimation from '..';

export default {
  title: 'Variants',
  component: UseAnimation,
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

export const Size = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ padding: '20px' }}>
      <span>activity</span>
      <UseAnimation size={60} wrapperStyle={{ marginTop: '5px' }} animation={activity} />
    </div>
  </div>
);
