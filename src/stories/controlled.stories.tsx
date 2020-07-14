import React, { useState } from 'react';
import radioButton from '../lib/radioButton';
import UseAnimation from '..';

// ANIMATIONS WITH CLICK PLAY & BACKWARDS WILL HAVE REVERSE FUNCITONALITY FOR STATE MNG
export default {
  title: 'Controlled State',
  component: UseAnimation,
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
