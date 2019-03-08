import Base from './base';
import Util from '../util';

export default class ReaceFragment extends Base{
	//节点挂载
	mountNode(){
		this.childNodes = this.getChildNodes(this.childInstances);
		return this.childNodes;
	}

	//node设置instance
	setInstanceToNode(node,instance){
		Util.recursive(this.childNodes,(v)=>{
			if(v && v instanceof Node){
				v.__reactInstance = this;
			}
		});
	}
	attachRef(){
		if(this.element.ref && Util.isFun(this.element.ref)){
			this.element.ref(this.getComponent());
		}
	}


	unmount(){
		//react卸载
		super.unmount();
		Util.recursive(this.childInstances,(v)=>{
			if(v){
				v.unmount();
			}
		})
	}

	//获取子element
	getChildElements(){
		let component = this.getComponent();
		let childElements = component.render();
		if(!Util.isArray(childElements)){
			childElements = [childElements];
		}
		return childElements;
	}

	//获取component节点
	getComponent(){
		if(!this.component){
			const {props,type} = this.element;
			let component =  new type(props);
			component._reactInternalInstance = this;
			this.component = component;
		}
		return this.component;
	}

	//重新挂载子节点
	remountChild(){
		//react节点找父node节点更新子节点
		if(this.parentInstance){
			return this.parentInstance.remountChild();
		}

		//在根节点,重新挂载
		if(this.parentNode){
			this.remount(this.parentNode)
		}
	}

	//更新element
	updateElement(element){
		this.element = element;
		this.component.props = element.props;
	}

	//数据变更
	receiveComponent(callback){
		if(this.hasUnmount){
			return;
		}
		if(this.updateChild()){
			this.remountChild();
		}
		if(callback){
			callback()
		}
	}

	//生命周期方法
	willMount(){
		let component = this.getComponent();
		component.componentWillMount && component.componentWillMount()
	}
	didMount(){
		let component = this.getComponent();
		component.componentDidMount && component.componentDidMount()
	}

	willUnmount(){
		let component = this.getComponent();
		component.componentWillUnmount && component.componentWillUnmount()
	}
}
