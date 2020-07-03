import React from 'react';

import activityAnimation from './lib/activity';
import UseAnimation from '.';

export default {
  title: 'Animations',
  component: UseAnimation,
};

export const activity = () => <UseAnimation animation={activityAnimation} />;
