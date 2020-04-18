import React from 'react';
import { AnimationConfig } from 'lottie-web';
import { AnimationKey } from './utils';
declare type Props = {
    animationKey: AnimationKey;
    options?: Partial<AnimationConfig>;
    size?: number;
    loop?: AnimationConfig['loop'];
    autoplay?: AnimationConfig['autoplay'];
    style?: React.CSSProperties;
} & React.HTMLProps<HTMLDivElement>;
declare const UseAnimations: React.FC<Props>;
export default UseAnimations;
