'use strict';

var _lib = require('./lib');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var React = function React() {
	_classCallCheck(this, React);

	this.version = _lib.ReactConstant.VERSION;
	this.Component = _lib.ReactComponent;
	this.createElement = _lib.ReactElement.createElement;
	this.cloneElement = _lib.ReactElement.cloneElement;
	this.render = _lib.ReactMount.render;
	this.unmountComponentAtNode = _lib.ReactMount.unmountComponentAtNode;
	this.findDOMNode = _lib.ReactMount.findDOMNode;
};

module.exports = new React();