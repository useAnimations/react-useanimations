"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var getEvents = function getEvents(_ref) {
  var animation = _ref.animation,
      animEffect = _ref.animEffect;

  if (animEffect === _constants.CLICK_PLAY_AND_SEGMENTS) {
    return {
      onClick: function onClick() {
        return animation.playSegments([0, 60], true);
      }
    };
  }

  if (animEffect === _constants.CLICK_PLAY) {
    return {
      onClick: function onClick() {
        animation.stop();
        animation.play();
      }
    };
  }

  if (animEffect === _constants.HOVER_PLAY_AND_STOP) {
    return {
      onMouseEnter: function onMouseEnter() {
        return animation.play();
      },
      onMouseLeave: function onMouseLeave() {
        return animation.stop();
      }
    };
  }

  if (animEffect === _constants.HOVER_PLAY_AND_BACKWARDS) {
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
  }

  if (animEffect === _constants.CLICK_PLAY_AND_BACKWARDS) {
    var directionMenu = 1;
    return {
      onClick: function onClick() {
        animation.setDirection(directionMenu);
        animation.play();
        directionMenu = -directionMenu;
      }
    };
  }

  return null;
};

var _default = getEvents;
exports["default"] = _default;