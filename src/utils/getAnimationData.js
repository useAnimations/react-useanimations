import activity from '../../animations/activity.json';
import airplay from '../../animations/airplay.json';
import alertCircle from '../../animations/alertCircle.json';
import alertOctagon from '../../animations/alertOctagon.json';
import alertTriangle from '../../animations/alertTriangle.json';
import archive from '../../animations/archive.json';
import arrowDown from '../../animations/arrowDown.json';
import arrowUp from '../../animations/arrowUp.json';
import bookmark from '../../animations/bookmark.json';
import calendar from '../../animations/calendar.json';
import codepen from '../../animations/codepen.json';
import copy from '../../animations/copy.json';
import download from '../../animations/download.json';
import edit from '../../animations/edit.json';
import facebook from '../../animations/facebook.json';
import github from '../../animations/github.json';
import heart from '../../animations/heart.json';
import checkbox from '../../animations/checkbox.json';
import infinity from '../../animations/infinity.json';
import instagram from '../../animations/instagram.json';
import linkedin from '../../animations/linkedin.json';
import loading from '../../animations/loading.json';
import loading2 from '../../animations/loading2.json';
import lock from '../../animations/lock.json';
import mail from '../../animations/mail.json';
import maximizeMinimize from '../../animations/maximizeMinimize.json';
import maximizeMinimize2 from '../../animations/maximizeMinimize2.json';
import menu from '../../animations/menu.json';
import menu2 from '../../animations/menu2.json';
import menu3 from '../../animations/menu3.json';
import menu4 from '../../animations/menu4.json';
import microphone from '../../animations/microphone.json';
import microphone2 from '../../animations/microphone2.json';
import notification from '../../animations/notification.json';
import notification2 from '../../animations/notification2.json';
import playPause from '../../animations/playPause.json';
import playPauseCircle from '../../animations/playPauseCircle.json';
import plusToX from '../../animations/plusToX.json';
import pocket from '../../animations/pocket.json';
import radioButton from '../../animations/radioButton.json';
import scrollDown from '../../animations/scrollDown.json';
import searchToX from '../../animations/searchToX.json';
import settings from '../../animations/settings.json';
import settings2 from '../../animations/settings2.json';
import skipBack from '../../animations/skipBack.json';
import skipForward from '../../animations/skipForward.json';
import star from '../../animations/star.json';
import toggle from '../../animations/toggle.json';
import trash from '../../animations/trash.json';
import trash2 from '../../animations/trash2.json';
import twitter from '../../animations/twitter.json';
import userMinus from '../../animations/userMinus.json';
import userPlus from '../../animations/userPlus.json';
import userX from '../../animations/userX.json';
import video from '../../animations/video.json';
import video2 from '../../animations/video2.json';
import visibility from '../../animations/visibility.json';
import visibility2 from '../../animations/visibility2.json';
import volume from '../../animations/volume.json';

const keys = {
  activity,
  airplay,
  alertCircle,
  alertOctagon,
  alertTriangle,
  archive,
  arrowDown,
  arrowUp,
  bookmark,
  calendar,
  codepen,
  copy,
  download,
  edit,
  facebook,
  github,
  heart,
  checkbox,
  infinity,
  instagram,
  linkedin,
  loading,
  loading2,
  lock,
  mail,
  maximizeMinimize,
  maximizeMinimize2,
  menu,
  menu2,
  menu3,
  menu4,
  microphone,
  microphone2,
  notification,
  notification2,
  playPause,
  playPauseCircle,
  plusToX,
  pocket,
  radioButton,
  scrollDown,
  searchToX,
  settings,
  settings2,
  skipBack,
  skipForward,
  star,
  toggle,
  trash,
  trash2,
  twitter,
  userMinus,
  userPlus,
  userX,
  video,
  video2,
  visibility,
  visibility2,
  volume,
};

const getAnimationData = animationKey => keys[animationKey] || '';

export default getAnimationData;
