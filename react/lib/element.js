//创建react 节点
import Util from './util';
import ReactConstant from './constant';

class ReactElement{

	//创建react 节点对象
	createElement(type, config, children){
		const { key,ref, ...eleProps } = config || {};

		//属性合并
		let props = eleProps;
		props.children = Array.from(arguments).slice(2)
		if (type && type.defaultProps) {
			props = Object.assign({},type.defaultProps,props);
		}

		//key设置
		let _key = null;
		if(['object','undefined'].indexOf(typeof(key)) < 0){
			_key = key.toString();
		}

		return {
			$$typeof: ReactConstant.REACT_ELEMENT_TYPE,
			type: type,
			key: _key,
			ref: ref || null,
			props: props,
		};
	}

	//节点复制
	cloneElement(element,props){
		return Object.assign({},element,{
			props:Object.assign({},element.props,props)
		});
	}

	//叶子节点
	isLeafElement(element){
		return this.isTextElement(element) || this.isEmptyElement(element)
	}

	isNodeElement(element){
		return typeof element === 'object' && typeof element.type === 'string';
	}
	isTextElement(element){
		return typeof element === 'string' || typeof element === 'number';
	}
	isEmptyElement(element){
		return element === null || element === false || Util.isUndefined(element);
	}
	isReactElement(element){
		return element && typeof element === 'object' && typeof element.type === 'function';
	}

	create(element){
		if(this.isEmptyElement(element)){
			return this.createEmptyNode(element);
		}
		//文本节点
		if(this.isTextElement(element)){
			return this.createTextNode(element);
		}
		//浏览器节点
		if(this.isNodeElement(element)){
			return this.createNode(element);
		}
	}

	createEmptyNode(){
		return null;
	}
	//文本节点
	createTextNode(element){
		let node = document.createTextNode(element)
		return node;
	}

	domType = {};
	//原生节点
	createNode(element){
		let type = element.type.toLowerCase();
		if(this.domType[type]){
			return this.domType[type].cloneNode(false);
		}
		this.domType[type] = document.createElement(type);
		return this.domType[type].cloneNode(false);
	}

	//节点插入节点前
	nodeInsertBefore(newEl, targetEl){
		let parentEl = targetEl.parentNode;
		parentEl.insertBefore(newEl,targetEl);
	}

	//在节点后插入
	nodeInsertAfter(newEl, targetEl){
		let parentEl = targetEl.parentNode;
		if(parentEl.lastChild == targetEl){
			parentEl.appendChild(newEl);
		}else{
			parentEl.insertBefore(newEl,targetEl.nextSibling);
		}
	}

	normalPropsKeys = [
		'className',
		'style',
		'dangerouslySetInnerHTML',
		'defaultValue',
		'defaultChecked',
		'children'
	];

	propsKeyMap = {
		htmlFor:'for'
	}

	//设置默认值
	setDefaultValue(node,value){
		if(node.nodeName == 'SELECT'){
			let opt = node.querySelector("option[value='"+value+"']")
			if(opt){
				opt.setAttribute("selected",'selected');
			}
		}else if (node.nodeName == 'TEXTAREA') {
			node.innerHTML = value;
		}else{
			node.setAttribute("value",value);
		}
	}

	//设置默认选中
	setDefaultChecked(node,value){
		if(value){
			node.setAttribute("checked","checked");
		}
	}

	//更新class
	updateClass(node,className,preClassName){
		let cls = Util.classNames(className);
		let preCls = Util.classNames(preClassName)
		if(cls != preCls){
			node.className = cls;
		}
	}

	//更新innerHtml
	updateInnerHtml(node,html,preHtml){
		html = html || {};
		preHtml = html || {};
		if(html.__html === preHtml.__html){
			return;
		}
		node.innerHTML = html.__html;
	}

	//更新style
	updateStyle(node,style){
		let sty = Util.getStyleStr(style);
		let preSty = node.getAttribute("style") || '';
		if(sty != preSty){
			node.setAttribute("style",sty)
		}
	}

	//更新attr
	updateAttr(node,attrName,attr,preAttr){
		if(attr === preAttr){
			return;
		}
		if(attr === false){
			return node.removeAttribute(attrName)
		}
		if(attr === true){
			return node.setAttribute(attrName,'true');
		}
		node.setAttribute(attrName,attr);
	}

	//更新事件
	updateEvents(inst,node,eventName,fun,preFun){
		if(fun === preFun){
			return;
		}
		//未注册过,绑定一次
		if(!inst.events.hasOwnProperty(eventName)){

			//绑定方法,未来可使用事件代理,以减少事件绑定,统计得出10000个事件绑定约50ms
			node.addEventListener(eventName,(ev)=>{
				if(Util.isFun(inst.events[eventName])){
					inst.events[eventName](ev);
				}
			})
		}
		inst.events[eventName] = fun;
	}

	//节点属性处理
	parseNode(inst,node,props,preProps = {},isUpdate){
		//class
		this.updateClass(node,props.className,preProps.className);

		//innerHTML
		this.updateInnerHtml(node,props.dangerouslySetInnerHTML,preProps.dangerouslySetInnerHTML);

		//style
		this.updateStyle(node,props.style,preProps.style);

		//defaultValue
		if(!isUpdate && props.defaultValue){
			this.setDefaultValue(node,props.defaultValue)
		}

		//defaultChecked
		if(!isUpdate && props.defaultChecked){
			this.setDefaultChecked(node,props.defaultChecked)
		}

		//获取其他props属性
		let keys = Object.keys(props);
		keys = keys.concat(Object.keys(preProps).filter((v)=>{
			return keys.indexOf(v < 0);
		})).filter((v)=>{
			return this.normalPropsKeys.indexOf(v) < 0;
		});

		keys.forEach((k)=>{
			//正则判断是否是事件,测试1w次使用1ms，比较快
			if(/^on[A-Z]/.test(k)){
				return this.updateEvents(inst,node,k.substring(2).toLowerCase(),props[k],preProps[k])
			}

			//data-*
			if(/^data-.+/.test(k) || /^aria-.+/.test(k)){
				return this.updateAttr(node,v,props[k],preProps[k]);
			}

			//attr更新
			this.updateAttr(node,this.propsKeyMap[k] || k.toLowerCase(),props[k],preProps[k]);
		})
	}

}
export default new ReactElement;
