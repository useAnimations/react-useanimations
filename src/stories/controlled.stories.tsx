import React, { useState } from 'react';
import { withInfo } from '@storybook/addon-info';
import radioButton from '../lib/radioButton';
import star from '../lib/star';
import UseAnimation from '..';

// ANIMATIONS WITH CLICK PLAY & BACKWARDS WILL HAVE REVERSE FUNCITONALITY FOR STATE MNG
export default {
  title: 'Controlled State',
  component: UseAnimation,
  decorators: [withInfo],
};

export const RadioButton = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ padding: '20px' }}>
        <span>radioButton</span>
        <UseAnimation
          reverse={checked}
          onClick={() => {
            setChecked(!checked);
          }}
          size={40}
          wrapperStyle={{ marginTop: '5px' }}
          animation={radioButton}
        />
      </div>
    </div>
  );
};

RadioButton.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const RadioButton = () => {
        const [checked, setChecked] = useState(true);
      
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ padding: '20px' }}>
              <span>radioButton</span>
              <UseAnimation
                reverse={checked}
                onClick={() => {
                  setChecked(!checked);
                }}
                size={40}
                wrapperStyle={{ marginTop: '5px' }}
                animation={radioButton}
              />
            </div>
          </div>
        );
      };
      ~~~
    `,
    },
  },
};

export const ChangingStrokeColor = () => {
  const [strokeColor, setStrokeColor] = useState('black');

  const handleButtonOnClick = () =>
    strokeColor === 'black' ? setStrokeColor('red') : setStrokeColor('black');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <button type="button" onClick={handleButtonOnClick} style={{ width: 100, height: 50 }}>
        Change Stroke Color
      </button>
      <div style={{ padding: '20px' }}>
        <span>star</span>
        <UseAnimation
          pathCss="fill: pink"
          strokeColor={strokeColor}
          size={40}
          wrapperStyle={{ marginTop: '5px' }}
          animation={star}
        />
      </div>
    </div>
  );
};

ChangingStrokeColor.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const ChangingStrokeColor = () => {
        const [strokeColor, setStrokeColor] = useState('black');
      
        const handleButtonOnClick = () =>
          strokeColor === 'black' ? setStrokeColor('red') : setStrokeColor('black');
      
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <button type="button" onClick={handleButtonOnClick} style={{ width: 100, height: 50 }}>
              Change Stroke Color
            </button>
            <div style={{ padding: '20px' }}>
              <span>star</span>
              <UseAnimation
                strokeColor={strokeColor}
                size={40}
                wrapperStyle={{ marginTop: '5px' }}
                animation={star}
              />
            </div>
          </div>
        );
      };
      ~~~
    `,
    },
  },
};

export const ChangingFillColor = () => {
  const [fillColor, setFillColor] = useState('black');

  const handleButtonOnClick = () =>
    fillColor === 'black' ? setFillColor('red') : setFillColor('black');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <button type="button" onClick={handleButtonOnClick} style={{ width: 100, height: 50 }}>
        Change Fill Color
      </button>
      <div style={{ padding: '20px' }}>
        <span>star</span>
        <UseAnimation
          fillColor={fillColor}
          size={40}
          wrapperStyle={{ marginTop: '5px' }}
          animation={star}
        />
      </div>
    </div>
  );
};

ChangingFillColor.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const ChangingFillColor = () => {
        const [fillColor, setFillColor] = useState('black');
      
        const handleButtonOnClick = () =>
          fillColor === 'black' ? setFillColor('red') : setFillColor('black');
      
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <button type="button" onClick={handleButtonOnClick} style={{ width: 100, height: 50 }}>
              Change Fill Color
            </button>
            <div style={{ padding: '20px' }}>
              <span>star</span>
              <UseAnimation
                fillColor={fillColor}
                size={40}
                wrapperStyle={{ marginTop: '5px' }}
                animation={star}
              />
            </div>
          </div>
        );
      };
      ~~~
    `,
    },
  },
};

export const ChangingPathCss = () => {
  const defaultCssPath = 'fill: red; stroke: blue;';
  const [pathCss, setPathCss] = useState(defaultCssPath);

  const handleButtonOnClick = () =>
    pathCss === defaultCssPath
      ? setPathCss('fill: blue; stroke: red;')
      : setPathCss(defaultCssPath);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button type="button" onClick={handleButtonOnClick} style={{ width: 100, height: 50 }}>
          Change Path Css
        </button>
        <span style={{ marginLeft: '20px' }}>
          After changing, click the star back & forth to see the fill & stroke change taking an
          effect
        </span>
      </div>
      <div style={{ padding: '20px' }}>
        <span>star</span>
        <UseAnimation
          pathCss={pathCss}
          size={40}
          wrapperStyle={{ marginTop: '5px' }}
          animation={star}
        />
      </div>
    </div>
  );
};

ChangingPathCss.story = {
  parameters: {
    info: {
      text: `
      ~~~js
      export const ChangingPathCss = () => {
        const defaultCssPath = 'fill: red; stroke: blue;';
        const [pathCss, setPathCss] = useState(defaultCssPath);
      
        const handleButtonOnClick = () =>
          pathCss === defaultCssPath
            ? setPathCss('fill: blue; stroke: red;')
            : setPathCss(defaultCssPath);
      
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button type="button" onClick={handleButtonOnClick} style={{ width: 100, height: 50 }}>
                Change Path Css
              </button>
              <span style={{ marginLeft: '20px' }}>
                After changing, click the star back & forth to see the fill & stroke change taking an
                effect
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              <span>star</span>
              <UseAnimation
                pathCss={pathCss}
                size={40}
                wrapperStyle={{ marginTop: '5px' }}
                animation={star}
              />
            </div>
          </div>
        );
      };
      ~~~
    `,
    },
  },
};
