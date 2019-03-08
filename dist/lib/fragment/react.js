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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReaceFragment = function (_Base) {
	_inherits(ReaceFragment, _Base);

	function ReaceFragment() {
		_classCallCheck(this, ReaceFragment);

		return _possibleConstructorReturn(this, (ReaceFragment.__proto__ || Object.getPrototypeOf(ReaceFragment)).apply(this, arguments));
	}

	_createClass(ReaceFragment, [{
		key: 'mountNode',

		//节点挂载
		value: function mountNode() {
			this.childNodes = this.getChildNodes(this.childInstances);
			return this.childNodes;
		}

		//node设置instance

	}, {
		key: 'setInstanceToNode',
		value: function setInstanceToNode(node, instance) {
			var _this2 = this;

			_util2.default.recursive(this.childNodes, function (v) {
				if (v && v instanceof Node) {
					v.__reactInstance = _this2;
				}
			});
		}
	}, {
		key: 'attachRef',
		value: function attachRef() {
			if (this.element.ref && _util2.default.isFun(this.element.ref)) {
				this.element.ref(this.getComponent());
			}
		}
	}, {
		key: 'unmount',
		value: function unmount() {
			//react卸载
			_get(ReaceFragment.prototype.__proto__ || Object.getPrototypeOf(ReaceFragment.prototype), 'unmount', this).call(this);
			_util2.default.recursive(this.childInstances, function (v) {
				if (v) {
					v.unmount();
				}
			});
		}

		//获取子element

	}, {
		key: 'getChildElements',
		value: function getChildElements() {
			var component = this.getComponent();
			var childElements = component.render();
			if (!_util2.default.isArray(childElements)) {
				childElements = [childElements];
			}
			return childElements;
		}

		//获取component节点

	}, {
		key: 'getComponent',
		value: function getComponent() {
			if (!this.component) {
				var _element = this.element,
				    props = _element.props,
				    type = _element.type;

				var component = new type(props);
				component._reactInternalInstance = this;
				this.component = component;
			}
			return this.component;
		}

		//重新挂载子节点

	}, {
		key: 'remountChild',
		value: function remountChild() {
			//react节点找父node节点更新子节点
			if (this.parentInstance) {
				return this.parentInstance.remountChild();
			}

			//在根节点,重新挂载
			if (this.parentNode) {
				this.remount(this.parentNode);
			}
		}

		//更新element

	}, {
		key: 'updateElement',
		value: function updateElement(element) {
			this.element = element;
			this.component.props = element.props;
		}

		//数据变更

	}, {
		key: 'receiveComponent',
		value: function receiveComponent(callback) {
			if (this.hasUnmount) {
				return;
			}
			if (this.updateChild()) {
				this.remountChild();
			}
			if (callback) {
				callback();
			}
		}

		//生命周期方法

	}, {
		key: 'willMount',
		value: function willMount() {
			var component = this.getComponent();
			component.componentWillMount && component.componentWillMount();
		}
	}, {
		key: 'didMount',
		value: function didMount() {
			var component = this.getComponent();
			component.componentDidMount && component.componentDidMount();
		}
	}, {
		key: 'willUnmount',
		value: function willUnmount() {
			var component = this.getComponent();
			component.componentWillUnmount && component.componentWillUnmount();
		}
	}]);

	return ReaceFragment;
}(_base2.default);

exports.default = ReaceFragment;