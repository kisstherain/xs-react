'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _instantiate = require('./instantiate');

var _instantiate2 = _interopRequireDefault(_instantiate);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactMount = function () {
	function ReactMount() {
		_classCallCheck(this, ReactMount);
	}

	_createClass(ReactMount, null, [{
		key: 'render',

		//渲染节点
		value: function render(nextElement, container, callback) {
			//获取element数组
			var elements = nextElement;
			if (!_util2.default.isArray(nextElement)) {
				elements = [nextElement];
			}

			//挂载节点
			var components = [];
			elements.forEach(function (v) {
				var instance = _instantiate2.default.create(v);
				container.innerHTML = '';
				instance.mount(container);
				components.push(instance.componentObj);
			});

			//触发回调
			if (callback) {
				callback(components);
			}
		}

		//卸载节点
		//如果在包含instance节点下，会卸载不干净，childInstances，childElements未清除

	}, {
		key: 'unmountComponentAtNode',
		value: function unmountComponentAtNode(node) {
			if (!(node instanceof Node)) {
				return;
			}
			Array.from(node.children).forEach(function (v) {
				var ins = _util2.default.getNodeInstance(v);
				if (ins) {
					ins.unmount();
				}
			});
		}

		//查询节点,返回节点数组

	}, {
		key: 'findDOMNode',
		value: function findDOMNode(componentOrElement) {
			if (!componentOrElement) {
				return;
			}
			if (componentOrElement instanceof Node) {
				return [componentOrElement];
			}
			var ins = componentOrElement._reactInternalInstance;
			if (ins && ins.childNodes) {
				return ins.getNodesArr(ins.childNodes);
			}
		}
	}]);

	return ReactMount;
}();

exports.default = ReactMount;