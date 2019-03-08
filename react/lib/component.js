import Util from './util';
//react 组件对象
export default class ReactComponent{
	constructor(props){
		this.props = props;
	}
	_reactInternalInstanceCbk = [];
	setState(data,callback){
		if(!this.state){
			this.state = {};
		}
		let prevState = Object.assign({},this.state);
		Object.assign(this.state,data);
		//延迟合并setstate
		clearTimeout(this._reactInternalInstanceTimeout)
		//保存回掉
		if(callback){
			this._reactInternalInstanceCbk = this._reactInternalInstanceCbk || [];
			this._reactInternalInstanceCbk.push(callback)
		}
		this._reactInternalInstanceTimeout = setTimeout(()=>{
			this._reactInternalInstance.receiveComponent(()=>{
				this._reactInternalInstanceCbk.forEach((v)=>{
					v();
				})
				this._reactInternalInstanceCbk = [];
			});
		},0)
	}
}
