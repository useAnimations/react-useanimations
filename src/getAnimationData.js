import activity from '../animations/activity.json';
import airplay from '../animations/airplay.json';
import alert from '../animations/alert.json';
import alert2 from '../animations/alert2.json';
import alert3 from '../animations/alert3.json';
import archive from '../animations/archive.json';
import arrowDown from '../animations/arrowDown.json';
import arrowUp from '../animations/arrowUp.json';
import bookmark from '../animations/bookmark.json';
import checkBox from '../animations/checkBox.json';
import codepen from '../animations/codepen.json';
import download from '../animations/download.json';
import downloadCircle from '../animations/downloadCircle.json';
import facebook from '../animations/facebook.json';
import github from '../animations/github.json';

import heart from '../animations/heart.json';
import skipForward from '../animations/skip-forward.json';
import trash from '../animations/trash.json';
import menu from '../animations/menu.json';

const keys = {
    activity: activity,
    airplay: airplay,
    alert2: alert2,
    alert3: alert3,
    archive: archive,
    arrowDown: arrowDown,
    arrowUp: arrowUp,
    downloadCircle: downloadCircle,
    facebook: facebook,
    github: github,
    checkBox: checkBox,
    bookmark: bookmark,
    codepen: codepen,
    download: download,
    heart: heart,
    skipForward: skipForward,
    alert: alert,
    trash: trash,
    menu: menu,
};

const getAnimationData = animationKey => keys[animationKey];

export default getAnimationData;
