import ReactFragment from './fragment/react';
import NodeFragment from './fragment/node';
import ReactElement from './element';

export default class ReactInstantiate{

	static create(element,parentInstance,key){
		if(ReactElement.isReactElement(element)){
			return new ReactFragment(element,parentInstance,key)
		}else{
			return new NodeFragment(element,parentInstance,key)
		}
	}
}

