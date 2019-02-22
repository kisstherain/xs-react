import {ReactComponent,ReactElement,ReactMount,ReactConstant,Util} from './lib';

class React{
	version = ReactConstant.VERSION;
	Component = ReactComponent;
	createElement = ReactElement.createElement;
	cloneElement=ReactElement.cloneElement;
	render = ReactMount.render;
	unmountComponentAtNode = ReactMount.unmountComponentAtNode;
	findDOMNode = ReactMount.findDOMNode;
	getNodeComponent = Util.getNodeComponent.bind(Util);
}

module.exports = new React;
