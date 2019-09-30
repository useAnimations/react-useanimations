"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _lottieWeb = _interopRequireDefault(require("lottie-web"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputStory =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputStory, _React$Component);

  function InputStory() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InputStory);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InputStory)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      animation: null
    });

    _defineProperty(_assertThisInitialized(_this), "element", _react["default"].createRef());

    _defineProperty(_assertThisInitialized(_this), "setAnimation", function (animation) {
      return _this.setState({
        animation: animation
      });
    });

    return _this;
  }

  _createClass(InputStory, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          animationKey = _this$props.animationKey,
          loop = _this$props.loop,
          autoplay = _this$props.autoplay,
          options = _this$props.options;
      var animEffect = (0, _utils.getEffect)(animationKey);

      var defaultOptions = _objectSpread({
        container: this.element.current,
        renderer: 'svg',
        animationData: (0, _utils.getAnimationData)(animationKey),
        loop: loop || animEffect === _utils.LOOP_PLAY,
        autoplay: autoplay || animEffect === _utils.LOOP_PLAY
      }, options);

      this.setAnimation(_lottieWeb["default"].loadAnimation(defaultOptions));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var animation = this.state.animation;
      animation.destroy();
      this.setAnimation(null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          animationKey = _this$props2.animationKey,
          ariaLabel = _this$props2.ariaLabel,
          className = _this$props2.className;
      var animation = this.state.animation;
      var defaultStyles = {
        overflow: 'hidden',
        outline: 'none'
      };
      return _react["default"].createElement("div", _extends({
        ref: this.element,
        "aria-label": ariaLabel,
        style: defaultStyles,
        className: className
      }, (0, _utils.getEvents)({
        animation: animation,
        animEffect: (0, _utils.getEffect)(animationKey)
      })));
    }
  }]);

  return InputStory;
}(_react["default"].Component);

exports["default"] = InputStory;