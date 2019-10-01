"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _activity = _interopRequireDefault(require("../../animations/activity.json"));

var _airplay = _interopRequireDefault(require("../../animations/airplay.json"));

var _alertCircle = _interopRequireDefault(require("../../animations/alertCircle.json"));

var _alertOctagon = _interopRequireDefault(require("../../animations/alertOctagon.json"));

var _alertTriangle = _interopRequireDefault(require("../../animations/alertTriangle.json"));

var _archive = _interopRequireDefault(require("../../animations/archive.json"));

var _arrowDown = _interopRequireDefault(require("../../animations/arrowDown.json"));

var _arrowUp = _interopRequireDefault(require("../../animations/arrowUp.json"));

var _bookmark = _interopRequireDefault(require("../../animations/bookmark.json"));

var _calendar = _interopRequireDefault(require("../../animations/calendar.json"));

var _codepen = _interopRequireDefault(require("../../animations/codepen.json"));

var _copy = _interopRequireDefault(require("../../animations/copy.json"));

var _download = _interopRequireDefault(require("../../animations/download.json"));

var _edit = _interopRequireDefault(require("../../animations/edit.json"));

var _facebook = _interopRequireDefault(require("../../animations/facebook.json"));

var _github = _interopRequireDefault(require("../../animations/github.json"));

var _heart = _interopRequireDefault(require("../../animations/heart.json"));

var _checkbox = _interopRequireDefault(require("../../animations/checkbox.json"));

var _infinity = _interopRequireDefault(require("../../animations/infinity.json"));

var _instagram = _interopRequireDefault(require("../../animations/instagram.json"));

var _linkedin = _interopRequireDefault(require("../../animations/linkedin.json"));

var _loading = _interopRequireDefault(require("../../animations/loading.json"));

var _loading2 = _interopRequireDefault(require("../../animations/loading2.json"));

var _lock = _interopRequireDefault(require("../../animations/lock.json"));

var _mail = _interopRequireDefault(require("../../animations/mail.json"));

var _maximizeMinimize = _interopRequireDefault(require("../../animations/maximizeMinimize.json"));

var _maximizeMinimize2 = _interopRequireDefault(require("../../animations/maximizeMinimize2.json"));

var _menu = _interopRequireDefault(require("../../animations/menu.json"));

var _menu2 = _interopRequireDefault(require("../../animations/menu2.json"));

var _menu3 = _interopRequireDefault(require("../../animations/menu3.json"));

var _menu4 = _interopRequireDefault(require("../../animations/menu4.json"));

var _microphone = _interopRequireDefault(require("../../animations/microphone.json"));

var _microphone2 = _interopRequireDefault(require("../../animations/microphone2.json"));

var _notification = _interopRequireDefault(require("../../animations/notification.json"));

var _notification2 = _interopRequireDefault(require("../../animations/notification2.json"));

var _playPause = _interopRequireDefault(require("../../animations/playPause.json"));

var _playPauseCircle = _interopRequireDefault(require("../../animations/playPauseCircle.json"));

var _plusToX = _interopRequireDefault(require("../../animations/plusToX.json"));

var _pocket = _interopRequireDefault(require("../../animations/pocket.json"));

var _radioButton = _interopRequireDefault(require("../../animations/radioButton.json"));

var _scrollDown = _interopRequireDefault(require("../../animations/scrollDown.json"));

var _searchToX = _interopRequireDefault(require("../../animations/searchToX.json"));

var _settings = _interopRequireDefault(require("../../animations/settings.json"));

var _settings2 = _interopRequireDefault(require("../../animations/settings2.json"));

var _skipBack = _interopRequireDefault(require("../../animations/skipBack.json"));

var _skipForward = _interopRequireDefault(require("../../animations/skipForward.json"));

var _star = _interopRequireDefault(require("../../animations/star.json"));

var _toggle = _interopRequireDefault(require("../../animations/toggle.json"));

var _trash = _interopRequireDefault(require("../../animations/trash.json"));

var _trash2 = _interopRequireDefault(require("../../animations/trash2.json"));

var _twitter = _interopRequireDefault(require("../../animations/twitter.json"));

var _userMinus = _interopRequireDefault(require("../../animations/userMinus.json"));

var _userPlus = _interopRequireDefault(require("../../animations/userPlus.json"));

var _userX = _interopRequireDefault(require("../../animations/userX.json"));

var _video = _interopRequireDefault(require("../../animations/video.json"));

var _video2 = _interopRequireDefault(require("../../animations/video2.json"));

var _visibility = _interopRequireDefault(require("../../animations/visibility.json"));

var _visibility2 = _interopRequireDefault(require("../../animations/visibility2.json"));

var _volume = _interopRequireDefault(require("../../animations/volume.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var keys = {
  activity: _activity["default"],
  airplay: _airplay["default"],
  alertCircle: _alertCircle["default"],
  alertOctagon: _alertOctagon["default"],
  alertTriangle: _alertTriangle["default"],
  archive: _archive["default"],
  arrowDown: _arrowDown["default"],
  arrowUp: _arrowUp["default"],
  bookmark: _bookmark["default"],
  calendar: _calendar["default"],
  codepen: _codepen["default"],
  copy: _copy["default"],
  download: _download["default"],
  edit: _edit["default"],
  facebook: _facebook["default"],
  github: _github["default"],
  heart: _heart["default"],
  checkbox: _checkbox["default"],
  infinity: _infinity["default"],
  instagram: _instagram["default"],
  linkedin: _linkedin["default"],
  loading: _loading["default"],
  loading2: _loading2["default"],
  lock: _lock["default"],
  mail: _mail["default"],
  maximizeMinimize: _maximizeMinimize["default"],
  maximizeMinimize2: _maximizeMinimize2["default"],
  menu: _menu["default"],
  menu2: _menu2["default"],
  menu3: _menu3["default"],
  menu4: _menu4["default"],
  microphone: _microphone["default"],
  microphone2: _microphone2["default"],
  notification: _notification["default"],
  notification2: _notification2["default"],
  playPause: _playPause["default"],
  playPauseCircle: _playPauseCircle["default"],
  plusToX: _plusToX["default"],
  pocket: _pocket["default"],
  radioButton: _radioButton["default"],
  scrollDown: _scrollDown["default"],
  searchToX: _searchToX["default"],
  settings: _settings["default"],
  settings2: _settings2["default"],
  skipBack: _skipBack["default"],
  skipForward: _skipForward["default"],
  star: _star["default"],
  toggle: _toggle["default"],
  trash: _trash["default"],
  trash2: _trash2["default"],
  twitter: _twitter["default"],
  userMinus: _userMinus["default"],
  userPlus: _userPlus["default"],
  userX: _userX["default"],
  video: _video["default"],
  video2: _video2["default"],
  visibility: _visibility["default"],
  visibility2: _visibility2["default"],
  volume: _volume["default"]
};

var getAnimationData = function getAnimationData(animationKey) {
  return keys[animationKey] || '';
};

var _default = getAnimationData;
exports["default"] = _default;