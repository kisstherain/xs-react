'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _instantiate = require('../instantiate');

var _instantiate2 = _interopRequireDefault(_instantiate);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _element = require('../element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseFragment = function () {
	//抽象类实现
	function BaseFragment(element, parent) {
		var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

		_classCallCheck(this, BaseFragment);

		this.element = element;
		this.parentInstance = parent;
		this.key = key;
	}

	//挂载节点


	_createClass(BaseFragment, [{
		key: 'mount',
		value: function mount(parentNode) {
			this.parentNode = parentNode;
			this.willMount();

			//mount子节点,保存当前信息
			this.childElements = this.getChildElements();
			this.childInstances = this.createChildInstances(this.childElements);
			var node = this.mountNode();

			//节点挂载instance信息,节点反向挂载，因此节点上instance为最外层instance
			this.setInstanceToNode();
			//设置refs
			this.attachRef();

			//如果有父节点，则挂载到父节点
			if (parentNode) {
				this.appendChildrenToNode(parentNode, node);
				//挂载完成
				this.mountComplete();
			}
			return node;
		}

		//重新挂载

	}, {
		key: 'remount',
		value: function remount(node) {
			if (!node) {
				node = this.node;
			}
			this.childNodes = this.getChildNodes(this.childInstances);
			this.appendChildrenToNode(node, this.childNodes);
			this.mountComplete();
		}

		//挂载完成

	}, {
		key: 'mountComplete',
		value: function mountComplete() {
			_util2.default.recursive(this, function (v) {
				if (!v.hasMount) {
					v.didMount();
					v.hasMount = true;
				}
				return v.childInstances;
			});
		}

		//卸载instance节点

	}, {
		key: 'unmount',
		value: function unmount() {
			this.hasUnmount = true;
			_util2.default.recursive(this, function (v) {
				v.willMount();
				return v.childInstances;
			});
		}

		//获取子实例

	}, {
		key: 'createChildInstances',
		value: function createChildInstances(childElements) {
			var _this = this;

			if (!childElements) {
				childElements = this.getChildElements();
			}
			var childInstance = childElements.map(function (v, index) {
				if (_util2.default.isArray(v)) {
					return _this.createChildInstances(v);
				} else {
					return _instantiate2.default.create(v, _this, v && v.key || index);
				}
			});
			return childInstance;
		}

		//更新elements,返回节点是否变更,节点变更会触发父节点重排子节点

	}, {
		key: 'update',
		value: function update(element) {
			//对比
			if (_util2.default.isEqual(element, this.element)) {
				return;
			}
			//更新当前节点信息
			this.updateElement(element);
			this.updateChild();
		}

		//子实例对比

	}, {
		key: 'updateChild',
		value: function updateChild() {
			var oldElements = this.childElements;
			var newElements = this.getChildElements();

			//无变更
			if (_util2.default.isEqual(oldElements, newElements)) {
				return;
			}

			var oldInstances = this.childInstances;
			var newInstances = this.createChildInstances(newElements);

			//子节点变更
			this.childInstances = this.updateInstances(oldInstances, newInstances);
			this.childElements = newElements;
			return true;
		}

		//更新子instance

	}, {
		key: 'updateInstances',
		value: function updateInstances(oldInstances, newInstances) {
			var _this2 = this;

			var length = oldInstances.length > newInstances.length ? oldInstances.length : newInstances.length;
			var childInsts = [];

			var oldKeys = oldInstances.map(function (v, i) {
				return v.key || i;
			});

			var newKeys = newInstances.map(function (v, i) {
				return v.key || i;
			});

			//卸载,不存在节点
			oldInstances.forEach(function (inst, i) {
				var key = inst.key || i;
				//key对比
				if (newKeys.indexOf(key) <= 0) {
					_util2.default.recursive(inst, function (v) {
						v.unmount();
					});
				}
			});

			//新节点对比
			return newInstances.map(function (v, i) {
				var key = v.key || i;
				if (oldKeys.indexOf(key) >= 0) {
					return _this2.compareInstance(oldInstances[oldKeys.indexOf(key)], v);
				}
				return v;
			});
		}

		//instance对比

	}, {
		key: 'compareInstance',
		value: function compareInstance(oldInst, newInst) {
			//卸载
			if (!newInst) {
				_util2.default.recursive(oldInst, function (v) {
					v.unmount();
				});
				return;
			}

			//挂载
			if (!oldInst) {
				return _instantiate2.default.create(newInst.element, this, newInst.element && newIns.element.key || i);
			}

			//数组节点对比
			if (_util2.default.isArray(newInst) && _util2.default.isArray(oldInst)) {
				return this.updateInstances(oldInst, newInst);
			}

			//数组与非数组节点变化
			if (_util2.default.isArray(newInst) || _util2.default.isArray(oldInst)) {
				_util2.default.recursive(oldInst, function (v) {
					v.unmount();
				});

				return newInst;
			}

			//类型对比
			var newType = newInst.element;
			if (newInst.element && newInst.element.type) {
				newType = newInst.element.type;
			}

			var oldType = oldInst.element;
			if (oldInst.element && oldInst.element.type) {
				oldType = oldInst.element.type;
			}

			if (newType != oldType) {
				_util2.default.recursive(oldInst, function (v) {
					v.unmount();
				});
				return newInst;
			}
			oldInst.update(newInst.element);
			return oldInst;
		}

		/******* node 节点操作 *******/
		//获取子节点

	}, {
		key: 'getChildNodes',
		value: function getChildNodes(childInstances) {
			var _this3 = this;

			if (!childInstances) {
				childInstances = this.childInstances || [];
			}
			//获取子节点
			var childNodes = childInstances.map(function (v) {
				if (_util2.default.isArray(v)) {
					return _this3.getChildNodes(v);
				}
				if (!v.hasMount) {
					return v.mount();
				} else {
					return v.mountNode();
				}
			});
			return childNodes;
		}

		//子节点变一维数组

	}, {
		key: 'getNodesArr',
		value: function getNodesArr(childNodes) {
			var arr = [];
			_util2.default.recursive(childNodes, function (v) {
				if (v instanceof Node) {
					arr.push(v);
				}
			});
			return arr;
		}

		//对比并挂载子节点

	}, {
		key: 'appendChildrenToNode',
		value: function appendChildrenToNode(node, children) {
			if (!children) {
				return;
			}
			var nodes = Array.from(node.childNodes);
			var newNodes = this.getNodesArr(children);

			newNodes.forEach(function (v, i) {

				if (i == 0 && v == node.firstChild) {
					return;
				}
				if (i == 0 && node.firstChild) {
					return _element2.default.nodeInsertBefore(v, node.firstChild);
				}
				if (i == 0) {
					return node.appendChild(v);
				}

				var hasNode = nodes.indexOf(v) >= 0;
				if (hasNode && v.compareDocumentPosition(newNodes[i - 1]) == 2) {
					return;
				}
				return _element2.default.nodeInsertAfter(v, newNodes[i - 1]);
			});
		}

		//生命周期方法

	}, {
		key: 'willMount',
		value: function willMount() {}
	}, {
		key: 'didMount',
		value: function didMount() {}
	}, {
		key: 'willUnMount',
		value: function willUnMount() {}
	}]);

	return BaseFragment;
}();

exports.default = BaseFragment;