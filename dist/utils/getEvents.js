"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var getClickAndPlaySegmentsEvents = function getClickAndPlaySegmentsEvents(animation) {
  return {
    onClick: function onClick() {
      return animation.playSegments([0, 60], true);
    }
  };
};

var getClickPlayEvents = function getClickPlayEvents(animation) {
  return {
    onClick: function onClick() {
      animation.stop();
      animation.play();
    }
  };
};

var getHoverPlayAndStop = function getHoverPlayAndStop(animation) {
  return {
    onMouseEnter: function onMouseEnter() {
      return animation.play();
    },
    onMouseLeave: function onMouseLeave() {
      return animation.stop();
    }
  };
};

var getHoverPlayBackwardsEvents = function getHoverPlayBackwardsEvents(animation) {
  return {
    onMouseEnter: function onMouseEnter() {
      animation.setDirection(1);
      animation.play();
    },
    onMouseLeave: function onMouseLeave() {
      animation.setDirection(-1);
      animation.play();
    }
  };
};

var getClickAndPlayBackwardsEvents = function getClickAndPlayBackwardsEvents(animation) {
  var directionMenu = 1;
  return {
    onClick: function onClick() {
      animation.setDirection(directionMenu);
      animation.play();
      directionMenu = -directionMenu;
    }
  };
};

var getEvents = function getEvents(_ref) {
  var animation = _ref.animation,
      animEffect = _ref.animEffect;

  if (animEffect === _constants.CLICK_PLAY_AND_SEGMENTS) {
    return getClickAndPlaySegmentsEvents(animation);
  }

  if (animEffect === _constants.CLICK_PLAY) {
    return getClickPlayEvents(animation);
  }

  if (animEffect === _constants.HOVER_PLAY_AND_STOP) {
    return getHoverPlayAndStop(animation);
  }

  if (animEffect === _constants.HOVER_PLAY_AND_BACKWARDS) {
    return getHoverPlayBackwardsEvents(animation);
  }

  if (animEffect === _constants.CLICK_PLAY_AND_BACKWARDS) {
    return getClickAndPlayBackwardsEvents(animation);
  }

  return getClickPlayEvents(animation);
};

var _default = getEvents;
exports["default"] = _default;