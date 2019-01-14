import React, { Component } from 'react'
import { render,findDOMNode } from 'react-dom'
import './test.less';

class A extends Component{
	render(){
		return (
			<div>a</div>
		)
	}
}
export default class Test extends Component{
	componentDidMount(){
		setTimeout(()=>{
			this.visible = true;
			this.setState({})
		},3000)
	}
	state = {
		list:[1,2,3,4,5,6]
	};
	click(){
		this.visible = !this.visible;
		this.setState({
		})
	}
	render(){
		return (
			<div key="dddd" className="a">
				<textarea defaultValue="dddd" ref={(node)=>{this.noder = node;}}/>
				<A ref={(node)=>{this.af = node;}}/>
				aa
				<select defaultValue="2">
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
				<label>
					<input name="a" value="1" type="radio"/>r1
				</label>
				<label>
					<input name="a" value="2" type="radio" defaultChecked />r1
				</label>
				<If condition={!this.visible}>
					<div style={{color:'#0ff'}} width="100px">
						<div>2</div>
					</div>

					<div style={{color:'#0ff'}} width="100px">
						<div>2</div>
					</div>
				</If>
			</div>
		)
	}
}

