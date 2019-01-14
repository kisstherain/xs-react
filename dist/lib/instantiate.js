'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('./fragment/react');

var _react2 = _interopRequireDefault(_react);

var _node = require('./fragment/node');

var _node2 = _interopRequireDefault(_node);

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactInstantiate = function () {
	function ReactInstantiate() {
		_classCallCheck(this, ReactInstantiate);
	}

	_createClass(ReactInstantiate, null, [{
		key: 'create',
		value: function create(element, parentInstance, key) {
			if (_element2.default.isReactElement(element)) {
				return new _react2.default(element, parentInstance, key);
			} else {
				return new _node2.default(element, parentInstance, key);
			}
		}
	}]);

	return ReactInstantiate;
}();

exports.default = ReactInstantiate;