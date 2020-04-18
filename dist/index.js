"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _lottieWeb = _interopRequireDefault(require("lottie-web"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  path {\n    stroke: ", ";\n    fill: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ColoredIcon = _styled["default"].div(_templateObject(), function (_ref) {
  var strokeColor = _ref.strokeColor;
  return strokeColor || 'currentColor';
}, function (_ref2) {
  var fillColor = _ref2.fillColor;
  return fillColor || 'currentColor';
});

var UseAnimations = function UseAnimations(_ref3) {
  var animationKey = _ref3.animationKey,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 24 : _ref3$size,
      loop = _ref3.loop,
      autoplay = _ref3.autoplay,
      style = _ref3.style,
      options = _ref3.options,
      _onClick = _ref3.onClick,
      other = _objectWithoutProperties(_ref3, ["animationKey", "size", "loop", "autoplay", "style", "options", "onClick"]);

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];

  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var animEffect = (0, _utils.getEffect)(animationKey);

    var defaultOptions = _objectSpread({
      container: ref.current,
      renderer: 'svg',
      animationData: (0, _utils.getAnimationData)(animationKey),
      loop: loop || animEffect === _utils.LOOP_PLAY,
      autoplay: autoplay || animEffect === _utils.LOOP_PLAY
    }, options);

    setAnimation(_lottieWeb["default"].loadAnimation(defaultOptions));
    return function () {
      animation === null || animation === void 0 ? void 0 : animation.destroy();
      setAnimation(undefined);
    };
  }, []);

  var defaultStyles = _objectSpread({
    overflow: 'hidden',
    outline: 'none',
    width: size
  }, style);

  var eventProps = animation ? (0, _utils.getEvents)({
    animation: animation,
    animEffect: (0, _utils.getEffect)(animationKey)
  }) : undefined;

  var animationProps = _objectSpread({
    ref: ref
  }, other, {
    style: defaultStyles
  }, eventProps, {
    onClick: function onClick(e) {
      if (_onClick) _onClick(e);
      if (eventProps && 'onClick' in eventProps) eventProps.onClick();
    }
  });

  return /*#__PURE__*/_react["default"].createElement(ColoredIcon, animationProps);
};

var _default = UseAnimations;
exports["default"] = _default;