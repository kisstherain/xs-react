import Constant from './constant';
import ReactInstantiate from './instantiate';
import Util from './util';

export default class ReactMount{
	//渲染节点
	static render(nextElement, container, callback){
		//获取element数组
		let elements = nextElement;
		if(!Util.isArray(nextElement)){
			elements = [nextElement];
		}

		//挂载节点
		let components = [];
		elements.forEach((v)=>{
			let instance = ReactInstantiate.create(v);
			container.innerHTML = '';
			instance.mount(container);
			components.push(instance);
		})

		//触发回调
		if(callback){
			callback(components);
		}
	}

	//卸载节点
	//如果在包含instance节点下，会卸载不干净，childInstances，childElements未清除
	static unmountComponentAtNode(node){
		if(!(node instanceof Node)){
			return;
		}
		Array.from(node.children).forEach((v)=>{
			let ins = Util.getNodeInstance(v);
			if(ins){
				ins.unmount();
			}
		})
	}

	//查询节点,返回节点数组
  static findDOMNode(componentOrElement){
		if(!componentOrElement){
			return;
		}
		if(componentOrElement instanceof Node){
			return [componentOrElement];
		}
		let ins = componentOrElement._reactInternalInstance;
		if(ins && ins.childNodes){
			return ins.getNodesArr(ins.childNodes);
		}
	};

	//节点外渲染
	static createPortal(){
	}
}
