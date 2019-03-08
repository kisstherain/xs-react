import React, { Component } from 'react'
import A from './components/a';
import Tabs from './components/tabs';
const TabPane = Tabs.Pane;
import './index.less';

export default class Test extends Component{
	state = {
		msg:1
	}
	componentDidMount(){
		this.setState({
			msg:2
		},()=>{
			console.log(2)
		})
		this.setState({
			msg:3
		},()=>{
			console.log(3)
		})
		this.setState({
			msg:4
		})
		this.setState({
			msg:5
		},()=>{
			console.log(5)
		})
		this.setState({
			msg:6
		},()=>{
			console.log(6)
		})
	}
	render(){
		return (
			<div>
				{this.state.msg}
				<A>ddd</A>
				<Tabs defaultActiveKey="tab2" inkBarWidth={26} headerBorder={false} headerClassName="bg-white">
					<TabPane tab="tab1">测试1</TabPane>
					<TabPane tab="tab2">测试2</TabPane>
					<TabPane tab="tab3">测试3</TabPane>
				</Tabs>

			</div>
		)
	}
}
