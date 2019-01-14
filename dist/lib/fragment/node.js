'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _element = require('../element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeFragment = function (_Base) {
	_inherits(NodeFragment, _Base);

	function NodeFragment() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, NodeFragment);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NodeFragment.__proto__ || Object.getPrototypeOf(NodeFragment)).call.apply(_ref, [this].concat(args))), _this), _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	//事件方法绑定


	_createClass(NodeFragment, [{
		key: 'mountNode',


		//节点挂载
		value: function mountNode() {
			var hasNode = !!this.node;
			if (!hasNode) {
				this.node = _element2.default.create(this.element);

				if (_element2.default.isLeafElement(this.element)) {
					return this.node;
				}
			}

			this.childNodes = this.getChildNodes(this.childInstances);

			this.appendChildrenToNode(this.node, this.childNodes);

			//首次挂载，晚点处理属性，因为select要查询子元素
			if (!hasNode) {
				_element2.default.parseNode(this, this.node, this.element.props);
			}
			return this.node;
		}

		//node设置instance

	}, {
		key: 'setInstanceToNode',
		value: function setInstanceToNode(node, instance) {
			if (this.node && this.node instanceof Node) {
				this.node.__reactInstance = this;
			}
		}
	}, {
		key: 'attachRef',
		value: function attachRef() {
			if (_element2.default.isLeafElement(this.element)) {
				return;
			}
			if (this.element.ref && _util2.default.isFun(this.element.ref)) {
				this.element.ref(this.node);
			}
		}
	}, {
		key: 'unmount',
		value: function unmount() {
			//节点卸载
			_get(NodeFragment.prototype.__proto__ || Object.getPrototypeOf(NodeFragment.prototype), 'unmount', this).call(this);
			if (this.node) {
				this.node.remove();
			}
		}

		//更新节点

	}, {
		key: 'updateElement',
		value: function updateElement(element) {
			var oldElement = this.element;
			this.element = element;

			if (_element2.default.isLeafElement(this.element)) {
				return;
			}
			_element2.default.parseNode(this, this.node, this.element.props, oldElement.props, true);
			//更新节点属性
		}

		//获取子element

	}, {
		key: 'getChildElements',
		value: function getChildElements() {
			if (_element2.default.isLeafElement(this.element)) {
				return [];
			}

			var props = this.element.props;

			return props.children;
		}

		//重新挂载子节点

	}, {
		key: 'remountChild',
		value: function remountChild() {
			this.remount(this.node);
		}
	}]);

	return NodeFragment;
}(_base2.default);

exports.default = NodeFragment;