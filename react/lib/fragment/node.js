import Base from './base';
import Util from '../util';
import ReactElement from '../element';

export default class NodeFragment extends Base{
	//事件方法绑定
	events = {};

	//节点挂载
	mountNode(){
		let hasNode = !!this.node
		if(!hasNode){
			this.node = ReactElement.create(this.element);

			if(ReactElement.isLeafElement(this.element)){
				return this.node;
			}
		}

		this.childNodes = this.getChildNodes(this.childInstances);

		this.appendChildrenToNode(this.node,this.childNodes);

		//首次挂载，晚点处理属性，因为select要查询子元素
		if(!hasNode){
			ReactElement.parseNode(this,this.node,this.element.props)
		}
		return this.node;
	}

	//node设置instance
	setInstanceToNode(node,instance){
		if(this.node && this.node instanceof Node){
			this.node.__reactInstance = this;
		}
	}

	attachRef(){
		if(ReactElement.isLeafElement(this.element)){
			return;
		}
		if(this.element.ref && Util.isFun(this.element.ref)){
			this.element.ref(this.node);
		}
	}

	unmount(){
		//节点卸载
		super.unmount();
		if(this.node){
			this.node.remove();
		}
	}

	//更新节点
	updateElement(element){
		let oldElement = this.element;
		this.element = element;

		if(ReactElement.isLeafElement(this.element)){
			return;
		}
		ReactElement.parseNode(this,this.node,this.element.props,oldElement.props,true);
		//更新节点属性
	}

	//获取子element
	getChildElements(){
		if(ReactElement.isLeafElement(this.element)){
			return [];
		}

		const {props} = this.element;
		return props.children;
	}

	//重新挂载子节点
	remountChild(){
		this.remount(this.node)
	}

}
