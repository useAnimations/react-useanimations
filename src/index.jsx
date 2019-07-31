import React from 'react';
import Lottie from 'lottie-react-web';

import activity from '../animations/activity.json';
import archive from '../animations/archive.json';

const keys = {
  activity: activity,
  archive: archive,
};

export default ({ options, animationKey, ...other }) => {
  if (!keys[animationKey]) {
    throw 'animationKey not found';
  }
  return (
    <Lottie
      options={{
        animationData: keys[animationKey],
        ...options,
      }}
      {...other}
    />
  );
};
