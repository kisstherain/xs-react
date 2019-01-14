'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //创建react 节点


var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactElement = function () {
	function ReactElement() {
		_classCallCheck(this, ReactElement);

		this.domType = {};
		this.normalPropsKeys = ['className', 'style', 'dangerouslySetInnerHTML', 'defaultValue', 'defaultChecked', 'children'];
		this.propsKeyMap = {
			htmlFor: 'for'

			//设置默认值
		};
	}

	_createClass(ReactElement, [{
		key: 'createElement',


		//创建react 节点对象
		value: function createElement(type, config, children) {
			var _ref = config || {},
			    key = _ref.key,
			    ref = _ref.ref,
			    eleProps = _objectWithoutProperties(_ref, ['key', 'ref']);

			//属性合并


			var props = eleProps;
			props.children = Array.from(arguments).slice(2);
			if (type && type.defaultProps) {
				props = _extends({}, type.defaultProps, props);
			}

			//key设置
			var _key = null;
			if (['object', 'undefined'].indexOf(typeof key === 'undefined' ? 'undefined' : _typeof(key)) < 0) {
				_key = key.toString();
			}

			return {
				$$typeof: _constant2.default.REACT_ELEMENT_TYPE,
				type: type,
				key: _key,
				ref: ref || null,
				props: props
			};
		}

		//节点复制

	}, {
		key: 'cloneElement',
		value: function cloneElement(element, props) {
			return _extends({}, element, {
				props: _extends({}, element.props, props)
			});
		}

		//叶子节点

	}, {
		key: 'isLeafElement',
		value: function isLeafElement(element) {
			return this.isTextElement(element) || this.isEmptyElement(element);
		}
	}, {
		key: 'isNodeElement',
		value: function isNodeElement(element) {
			return (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && typeof element.type === 'string';
		}
	}, {
		key: 'isTextElement',
		value: function isTextElement(element) {
			return typeof element === 'string' || typeof element === 'number';
		}
	}, {
		key: 'isEmptyElement',
		value: function isEmptyElement(element) {
			return element === null || element === false || _util2.default.isUndefined(element);
		}
	}, {
		key: 'isReactElement',
		value: function isReactElement(element) {
			return element && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && typeof element.type === 'function';
		}
	}, {
		key: 'create',
		value: function create(element) {
			if (this.isEmptyElement(element)) {
				return this.createEmptyNode(element);
			}
			//文本节点
			if (this.isTextElement(element)) {
				return this.createTextNode(element);
			}
			//浏览器节点
			if (this.isNodeElement(element)) {
				return this.createNode(element);
			}
		}
	}, {
		key: 'createEmptyNode',
		value: function createEmptyNode() {
			return null;
		}
		//文本节点

	}, {
		key: 'createTextNode',
		value: function createTextNode(element) {
			var node = document.createTextNode(element);
			return node;
		}
	}, {
		key: 'createNode',

		//原生节点
		value: function createNode(element) {
			var type = element.type.toLowerCase();
			if (this.domType[type]) {
				return this.domType[type].cloneNode(false);
			}
			this.domType[type] = document.createElement(type);
			return this.domType[type].cloneNode(false);
		}

		//节点插入节点前

	}, {
		key: 'nodeInsertBefore',
		value: function nodeInsertBefore(newEl, targetEl) {
			var parentEl = targetEl.parentNode;
			parentEl.insertBefore(newEl, targetEl);
		}

		//在节点后插入

	}, {
		key: 'nodeInsertAfter',
		value: function nodeInsertAfter(newEl, targetEl) {
			var parentEl = targetEl.parentNode;
			if (parentEl.lastChild == targetEl) {
				parentEl.appendChild(newEl);
			} else {
				parentEl.insertBefore(newEl, targetEl.nextSibling);
			}
		}
	}, {
		key: 'setDefaultValue',
		value: function setDefaultValue(node, value) {
			if (node.nodeName == 'SELECT') {
				var opt = node.querySelector("option[value='" + value + "']");
				if (opt) {
					opt.setAttribute("selected", 'selected');
				}
			} else if (node.nodeName == 'TEXTAREA') {
				node.innerHTML = value;
			} else {
				node.setAttribute("value", value);
			}
		}

		//设置默认选中

	}, {
		key: 'setDefaultChecked',
		value: function setDefaultChecked(node, value) {
			if (value) {
				node.setAttribute("checked", "checked");
			}
		}

		//更新class

	}, {
		key: 'updateClass',
		value: function updateClass(node, className, preClassName) {
			var cls = _util2.default.classNames(className);
			var preCls = _util2.default.classNames(preClassName);
			if (cls != preCls) {
				node.className = cls;
			}
		}

		//更新innerHtml

	}, {
		key: 'updateInnerHtml',
		value: function updateInnerHtml(node, html, preHtml) {
			html = html || {};
			preHtml = html || {};
			if (html.__html === preHtml.__html) {
				return;
			}
			node.innerHTML = html.__html;
		}

		//更新style

	}, {
		key: 'updateStyle',
		value: function updateStyle(node, style) {
			var sty = _util2.default.getStyleStr(style);
			var preSty = node.getAttribute("style") || '';
			if (sty != preSty) {
				node.setAttribute("style", sty);
			}
		}

		//更新attr

	}, {
		key: 'updateAttr',
		value: function updateAttr(node, attrName, attr, preAttr) {
			if (attr === preAttr) {
				return;
			}
			if (attr === false) {
				return node.removeAttribute(attrName);
			}
			if (attr === true) {
				return node.setAttribute(attrName, 'true');
			}
			node.setAttribute(attrName, attr);
		}

		//更新事件

	}, {
		key: 'updateEvents',
		value: function updateEvents(inst, node, eventName, fun, preFun) {
			if (fun === preFun) {
				return;
			}
			//未注册过,绑定一次
			if (!inst.events.hasOwnProperty(eventName)) {

				//绑定方法,未来可使用事件代理,以减少事件绑定,统计得出10000个事件绑定约50ms
				node.addEventListener(eventName, function (ev) {
					if (_util2.default.isFun(inst.events[eventName])) {
						inst.events[eventName](ev);
					}
				});
			}
			inst.events[eventName] = fun;
		}

		//节点属性处理

	}, {
		key: 'parseNode',
		value: function parseNode(inst, node, props) {
			var _this = this;

			var preProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
			var isUpdate = arguments[4];

			//class
			this.updateClass(node, props.className, preProps.className);

			//innerHTML
			this.updateInnerHtml(node, props.dangerouslySetInnerHTML, preProps.dangerouslySetInnerHTML);

			//style
			this.updateStyle(node, props.style, preProps.style);

			//defaultValue
			if (!isUpdate && props.defaultValue) {
				this.setDefaultValue(node, props.defaultValue);
			}

			//defaultChecked
			if (!isUpdate && props.defaultChecked) {
				this.setDefaultChecked(node, props.defaultChecked);
			}

			//获取其他props属性
			var keys = Object.keys(props);
			keys = keys.concat(Object.keys(preProps).filter(function (v) {
				return keys.indexOf(v < 0);
			})).filter(function (v) {
				return _this.normalPropsKeys.indexOf(v) < 0;
			});

			keys.forEach(function (k) {
				//正则判断是否是事件,测试1w次使用1ms，比较快
				if (/^on[A-Z]/.test(k)) {
					return _this.updateEvents(inst, node, k.substring(2).toLowerCase(), props[k], preProps[k]);
				}

				//data-*
				if (/^data-.+/.test(k) || /^aria-.+/.test(k)) {
					return _this.updateAttr(node, v, props[k], preProps[k]);
				}

				//attr更新
				_this.updateAttr(node, _this.propsKeyMap[k] || k.toLowerCase(), props[k], preProps[k]);
			});
		}
	}]);

	return ReactElement;
}();

exports.default = new ReactElement();