"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var animations = {
  activity: _constants.LOOP_PLAY,
  airplay: _constants.LOOP_PLAY,
  alertCircle: _constants.LOOP_PLAY,
  alertOctagon: _constants.LOOP_PLAY,
  alertTriangle: _constants.LOOP_PLAY,
  archive: _constants.HOVER_PLAY_AND_BACKWARDS,
  arrowDown: _constants.LOOP_PLAY,
  arrowUp: _constants.LOOP_PLAY,
  bookmark: _constants.CLICK_PLAY_AND_BACKWARDS,
  checkbox: _constants.CLICK_PLAY_AND_BACKWARDS,
  codepen: _constants.HOVER_PLAY_AND_STOP,
  download: _constants.CLICK_PLAY_AND_SEGMENTS,
  facebook: _constants.HOVER_PLAY_AND_STOP,
  github: _constants.HOVER_PLAY_AND_STOP,
  heart: _constants.CLICK_PLAY_AND_BACKWARDS,
  infinity: _constants.LOOP_PLAY,
  instagram: _constants.HOVER_PLAY_AND_STOP,
  linkedin: _constants.HOVER_PLAY_AND_STOP,
  loading: _constants.LOOP_PLAY,
  loading2: _constants.LOOP_PLAY,
  lock: _constants.CLICK_PLAY_AND_BACKWARDS,
  maximizeMinimize: _constants.CLICK_PLAY_AND_BACKWARDS,
  maximizeMinimize2: _constants.CLICK_PLAY_AND_BACKWARDS,
  menu: _constants.CLICK_PLAY_AND_BACKWARDS,
  menu2: _constants.CLICK_PLAY_AND_BACKWARDS,
  menu3: _constants.CLICK_PLAY_AND_BACKWARDS,
  menu4: _constants.CLICK_PLAY_AND_BACKWARDS,
  microphone: _constants.CLICK_PLAY_AND_BACKWARDS,
  microphone2: _constants.CLICK_PLAY_AND_BACKWARDS,
  notification: _constants.CLICK_PLAY_AND_BACKWARDS,
  notification2: _constants.CLICK_PLAY_AND_BACKWARDS,
  playPause: _constants.CLICK_PLAY_AND_BACKWARDS,
  playPauseCircle: _constants.CLICK_PLAY_AND_BACKWARDS,
  plusToX: _constants.CLICK_PLAY_AND_BACKWARDS,
  pocket: _constants.HOVER_PLAY_AND_STOP,
  radioButton: _constants.CLICK_PLAY_AND_BACKWARDS,
  searchToX: _constants.CLICK_PLAY_AND_BACKWARDS,
  settings: _constants.HOVER_PLAY_AND_BACKWARDS,
  settings2: _constants.CLICK_PLAY_AND_BACKWARDS,
  skipForward: _constants.CLICK_PLAY_AND_SEGMENTS,
  skipBack: _constants.CLICK_PLAY_AND_SEGMENTS,
  star: _constants.CLICK_PLAY_AND_BACKWARDS,
  toggle: _constants.CLICK_PLAY_AND_BACKWARDS,
  trash: _constants.HOVER_PLAY_AND_BACKWARDS,
  trash2: _constants.HOVER_PLAY_AND_BACKWARDS,
  twitter: _constants.HOVER_PLAY_AND_STOP,
  video: _constants.CLICK_PLAY_AND_BACKWARDS,
  video2: _constants.CLICK_PLAY_AND_BACKWARDS,
  visibility: _constants.CLICK_PLAY_AND_BACKWARDS,
  visibility2: _constants.CLICK_PLAY_AND_BACKWARDS,
  volume: _constants.CLICK_PLAY_AND_BACKWARDS
};

var getEffect = function getEffect(animationKey) {
  return animations[animationKey] || '';
};

var _default = getEffect;
exports["default"] = _default;