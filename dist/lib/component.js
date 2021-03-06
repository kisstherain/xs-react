'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//react 组件对象
var ReactComponent = function () {
	function ReactComponent(props) {
		_classCallCheck(this, ReactComponent);

		this._reactInternalInstanceCbk = [];

		this.props = props;
	}

	_createClass(ReactComponent, [{
		key: 'setState',
		value: function setState(data, callback) {
			var _this = this;

			if (!this.state) {
				this.state = {};
			}
			var prevState = _extends({}, this.state);
			_extends(this.state, data);
			//延迟合并setstate
			clearTimeout(this._reactInternalInstanceTimeout);
			//保存回掉
			if (callback) {
				this._reactInternalInstanceCbk = this._reactInternalInstanceCbk || [];
				this._reactInternalInstanceCbk.push(callback);
			}
			this._reactInternalInstanceTimeout = setTimeout(function () {
				_this._reactInternalInstance.receiveComponent(function () {
					_this._reactInternalInstanceCbk.forEach(function (v) {
						v();
					});
					_this._reactInternalInstanceCbk = [];
				});
			}, 0);
		}
	}]);

	return ReactComponent;
}();

exports.default = ReactComponent;