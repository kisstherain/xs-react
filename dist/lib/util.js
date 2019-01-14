"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
	function Util() {
		_classCallCheck(this, Util);

		this.cssNumber = ["column-count", "fill-opacity", "font-weight", "line-height", "animation-duration", "opacity", "order", "orphans", "widows", "z-index", "zoom"];
	}

	_createClass(Util, [{
		key: "isUndefined",
		value: function isUndefined(v) {
			return typeof v === "undefined";
		}
	}, {
		key: "isFun",
		value: function isFun(v) {
			return v instanceof Function;
		}
	}, {
		key: "isString",
		value: function isString(v) {
			return typeof v === "string";
		}
	}, {
		key: "isNumber",
		value: function isNumber(v) {
			return typeof v === "number";
		}
	}, {
		key: "isArray",
		value: function isArray(v) {
			return v instanceof Array;
		}
		//递归调用

	}, {
		key: "recursive",
		value: function recursive(data, fun) {
			var _this = this;

			if (this.isArray(data)) {
				return data.map(function (v) {
					_this.recursive(v, fun);
				});
			}
			var val = fun(data);
			if (val && this.isArray(val)) {
				return this.recursive(val, fun);
			}
			return val;
		}

		//格式化对象，并返回方法

	}, {
		key: "stringifyObjInfo",
		value: function stringifyObjInfo(obj) {
			var _this2 = this;

			var funs = [];
			var i = 0;
			var str = JSON.stringify(obj, function (k, v) {
				if (_this2.isFun(v)) {
					funs.push(v);
					return '_fun__' + i;
				}
				return v;
			});
			return {
				str: str,
				funs: funs
			};
		}

		//深度对比

	}, {
		key: "isEqual",
		value: function isEqual(a, b) {
			var aInfo = this.stringifyObjInfo(a);
			var bInfo = this.stringifyObjInfo(b);

			if (aInfo.str != bInfo.str || aInfo.funs.length != bInfo.funs.length) {
				return false;
			}

			var eq = true;
			aInfo.funs.forEach(function (v, i) {
				if (v != bInfo.funs[i]) {
					eq = false;
				}
			});

			return eq;
		}

		//className合并

	}, {
		key: "classNames",
		value: function classNames(data) {
			var _this3 = this;

			if (!data) {
				return '';
			}

			if (this.isString(data)) {
				return data;
			}

			if (!this.isArray(data)) {
				data = [data];
			}

			var cls = [];
			this.recursive(data, function (v) {
				if (!v) {
					return;
				}
				if (_this3.isString(v)) {
					cls.push(v);
				}
				if (_this3.isNumber(v)) {
					cls.push(String(v));
				}
				if (v instanceof Object) {
					Object.keys(v).forEach(function (k) {
						if (v[k]) {
							cls.push(k);
						}
					});
				}
			});
			var c = [];
			cls.forEach(function (item) {
				item.split(" ").forEach(function (v) {
					if (v && c.indexOf(v) < 0) {
						c.push(v);
					}
				});
			});
			return c.join(" ");
		}
	}, {
		key: "getStyleStr",
		value: function getStyleStr(style) {
			var _this4 = this;

			if (!style) {
				return '';
			}
			var sty = [];;
			Object.keys(style).forEach(function (v) {
				var name = _this4.upperToLine(v);
				var val = style[v];
				if (typeof val == 'number' && _this4.cssNumber.indexOf(name) < 0) {
					val = val + 'px';
				}
				sty.push(name + ":" + val);
			});
			return sty.join(";");
		}
	}, {
		key: "upperToLine",
		value: function upperToLine(v) {
			return v.replace(/[A-Z]/g, function (w) {
				return '-' + w.toLowerCase();
			});
		}

		//获取节点实例

	}, {
		key: "getNodeInstance",
		value: function getNodeInstance(node) {
			if (!node || !node.__reactInstance) {
				return;
			}
			return node.__reactInstance;
		}

		//获取节点component

	}, {
		key: "getNodeComponent",
		value: function getNodeComponent(node) {
			var inst = this.getNodeInstance(node);
			if (!inst) {
				return;
			}
			return inst.component;
		}
	}]);

	return Util;
}();

exports.default = new Util();