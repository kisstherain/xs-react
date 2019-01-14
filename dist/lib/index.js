'use strict';

var _mount = require('./mount');

var _mount2 = _interopRequireDefault(_mount);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//输出所有类，用于外部继承替换
module.exports = {
	ReactMount: _mount2.default,
	ReactConstant: _constant2.default,
	ReactElement: _element2.default,
	ReactComponent: _component2.default
};