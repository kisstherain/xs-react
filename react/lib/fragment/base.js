import ReactInstantiate from '../instantiate';
import Util from '../util';
import ReactElement from '../element';

export default class BaseFragment{
	//抽象类实现
	constructor(element,parent,key = -1){
		this.element = element;
		this.parentInstance = parent;
		this.key = key;
	}

	//挂载节点
	mount(parentNode){
		this.parentNode = parentNode;
		this.willMount();

		//mount子节点,保存当前信息
		this.childElements = this.getChildElements();
		this.childInstances = this.createChildInstances(this.childElements);
		let node = this.mountNode();

		//节点挂载instance信息,节点反向挂载，因此节点上instance为最外层instance
		this.setInstanceToNode();
		//设置refs
		this.attachRef();

		//如果有父节点，则挂载到父节点
		if(parentNode){
			this.appendChildrenToNode(parentNode,node)
			//挂载完成
			this.mountComplete();
		}
		return node;
	}

	//重新挂载
	remount(node){
		if(!node){
			node = this.node;
		}
		this.childNodes = this.getChildNodes(this.childInstances);
		this.appendChildrenToNode(node,this.childNodes)
		this.mountComplete();
	}

	//挂载完成
	mountComplete(){
		Util.recursive(this,(v)=>{
			if(!v.hasMount){
				v.didMount();
				v.hasMount = true;
			}
			return v.childInstances;
		})
	}

	//卸载instance节点
	unmount(){
		this.hasUnmount = true;
		Util.recursive(this,(v)=>{
			v.willMount();
			return v.childInstances;
		})
	}

	//获取子实例
	createChildInstances(childElements){
		if(!childElements){
			childElements = this.getChildElements();
		}
		let childInstance = childElements.map((v,index)=>{
			if(Util.isArray(v)){
				return this.createChildInstances(v)
			}else{
				return ReactInstantiate.create(v,this,(v && v.key) || index);
			}
		});
		return childInstance;
	}

	//更新elements,返回节点是否变更,节点变更会触发父节点重排子节点
	update(element){
		//对比
		if(Util.isEqual(element,this.element)){
			return;
		}
		//更新当前节点信息
		this.updateElement(element);
		this.updateChild();
	}

	//子实例对比
	updateChild(){
		let oldElements = this.childElements;
		let newElements = this.getChildElements();

		//无变更
		if(Util.isEqual(oldElements,newElements)){
			return;
		}

		let oldInstances = this.childInstances;
		let newInstances = this.createChildInstances(newElements);

		//子节点变更
		this.childInstances = this.updateInstances(oldInstances,newInstances)
		this.childElements = newElements;
		return true;
	}

	//更新子instance
	updateInstances(oldInstances,newInstances){

		let length = oldInstances.length > newInstances.length?oldInstances.length:newInstances.length;
		let childInsts = [];

		let oldKeys = oldInstances.map((v,i)=>{
			return v.key || i;
		});

		let newKeys = newInstances.map((v,i)=>{
			return v.key || i;
		});

		//卸载,不存在节点
		oldInstances.forEach((inst,i)=>{
			let key = inst.key || i;
			//key对比
			if(newKeys.indexOf(key) <= 0){
				Util.recursive(inst,(v)=>{
					v.unmount();
				})
			}
		})

		//新节点对比
		return newInstances.map((v,i)=>{
			let key = v.key || i;
			if(oldKeys.indexOf(key) >= 0){
				return this.compareInstance(oldInstances[oldKeys.indexOf(key)],v);
			}
			return v;
		});
	}

	//instance对比
	compareInstance(oldInst,newInst){
		//卸载
		if(!newInst){
			Util.recursive(oldInst,(v)=>{
				v.unmount();
			})
			return;
		}

		//挂载
		if(!oldInst){
			return ReactInstantiate.create(newInst.element,this,(newInst.element && newIns.element.key) || i);
		}

		//数组节点对比
		if(Util.isArray(newInst) && Util.isArray(oldInst)){
			return this.updateInstances(oldInst,newInst);
		}

		//数组与非数组节点变化
		if(Util.isArray(newInst) || Util.isArray(oldInst)){
			Util.recursive(oldInst,(v)=>{
				v.unmount();
			})

			return newInst;
		}

		//类型对比
		let newType = newInst.element;
		if(newInst.element && newInst.element.type){
			newType = newInst.element.type;
		}

		let oldType = oldInst.element;
		if(oldInst.element && oldInst.element.type){
			oldType = oldInst.element.type;
		}

		if(newType != oldType){
			Util.recursive(oldInst,(v)=>{
				v.unmount();
			})
			return newInst;
		}
		oldInst.update(newInst.element)
		return oldInst;
	}

	/******* node 节点操作 *******/
	//获取子节点
	getChildNodes(childInstances){
		if(!childInstances){
			childInstances = this.childInstances || [];
		}
		//获取子节点
		let childNodes = childInstances.map((v)=>{
			if(Util.isArray(v)){
				return this.getChildNodes(v);
			}
			if(!v.hasMount){
				return v.mount()
			}else{
				return v.mountNode();
			}
		})
		return childNodes;
	}

	//子节点变一维数组
	getNodesArr(childNodes){
		let arr = [];
		Util.recursive(childNodes,(v)=>{
			if(v instanceof Node){
				arr.push(v);
			}
		})
		return arr;
	}

	//对比并挂载子节点
	appendChildrenToNode(node,children){
		if(!children){
			return;
		}
		let nodes = Array.from(node.childNodes)
		let newNodes = this.getNodesArr(children);

		newNodes.forEach((v,i)=>{

			if(i == 0 && v == node.firstChild){
				return;
			}
			if(i == 0 && node.firstChild){
				return ReactElement.nodeInsertBefore(v,node.firstChild);
			}
			if(i == 0){
				return node.appendChild(v);
			}

			let hasNode = nodes.indexOf(v) >= 0;
			if(hasNode && v.compareDocumentPosition(newNodes[i-1]) == 2){
				return;
			}
			return ReactElement.nodeInsertAfter(v,newNodes[i-1])
		})
	}

	//生命周期方法
	willMount(){}
	didMount(){}
	willUnMount(){}
}
