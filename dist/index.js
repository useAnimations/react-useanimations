"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _lottie_light = _interopRequireDefault(require("lottie-web/build/player/lottie_light"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UseAnimations = /*#__PURE__*/function (_React$Component) {
  _inherits(UseAnimations, _React$Component);

  var _super = _createSuper(UseAnimations);

  function UseAnimations() {
    var _this;

    _classCallCheck(this, UseAnimations);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      animation: null
    });

    _defineProperty(_assertThisInitialized(_this), "element", /*#__PURE__*/_react["default"].createRef());

    _defineProperty(_assertThisInitialized(_this), "setAnimation", function (animation) {
      return _this.setState({
        animation: animation
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getRandomId", function (key) {
      return "".concat(key, "_").concat(Math.floor(Math.random() * 8 + 5));
    });

    return _this;
  }

  _createClass(UseAnimations, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          animation = _this$props.animation,
          animationKey = _this$props.animationKey,
          loop = _this$props.loop,
          autoplay = _this$props.autoplay,
          fillColor = _this$props.fillColor,
          strokeColor = _this$props.strokeColor,
          options = _this$props.options;
      var animEffect = (0, _utils.getEffect)(animationKey);
      var animationId = this.getRandomId(animationKey);

      if (fillColor || strokeColor) {
        var css = "#".concat(animationId, " path { fill: ").concat(fillColor || 'inherit', "; stroke: ").concat(strokeColor || 'inherit', "; }");
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      }

      var defaultOptions = _objectSpread({
        container: this.element.current,
        renderer: 'svg',
        animationData: animation,
        loop: loop || animEffect === _utils.LOOP_PLAY,
        autoplay: autoplay || animEffect === _utils.LOOP_PLAY,
        rendererSettings: {
          id: animationId
        }
      }, options);

      this.setAnimation(_lottie_light["default"].loadAnimation(defaultOptions));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var animation = this.state.animation;

      if (animation) {
        animation.destroy();
      }

      this.setAnimation(null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          animationKey = _this$props2.animationKey,
          size = _this$props2.size,
          wrapperStyle = _this$props2.wrapperStyle,
          other = _objectWithoutProperties(_this$props2, ["animationKey", "size", "wrapperStyle"]);

      var animation = this.state.animation;

      var defaultStyles = _objectSpread({
        overflow: 'hidden',
        outline: 'none',
        width: size
      }, wrapperStyle);

      var animationProps = _objectSpread(_objectSpread({
        ref: this.element
      }, other), {}, {
        style: defaultStyles
      }, (0, _utils.getEvents)({
        animation: animation,
        animEffect: (0, _utils.getEffect)(animationKey)
      }));

      return /*#__PURE__*/_react["default"].createElement("div", animationProps);
    }
  }]);

  return UseAnimations;
}(_react["default"].Component);

exports["default"] = UseAnimations;
UseAnimations.defaultProps = {
  size: 24
};