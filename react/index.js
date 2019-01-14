import {ReactComponent,ReactElement,ReactMount,ReactConstant} from './lib';

class React{
	version = ReactConstant.VERSION;
	Component = ReactComponent;
	createElement = ReactElement.createElement;
	cloneElement=ReactElement.cloneElement;
	render = ReactMount.render;
	unmountComponentAtNode = ReactMount.unmountComponentAtNode;
	findDOMNode = ReactMount.findDOMNode;
}

module.exports = new React;
