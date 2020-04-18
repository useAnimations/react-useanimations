import { AnimationItem } from 'lottie-web';
declare const getEvents: ({ animation, animEffect }: {
    animation: AnimationItem;
    animEffect: string;
}) => {
    onClick: () => void;
} | {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
export default getEvents;
