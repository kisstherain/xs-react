import React, { Component } from 'react'

export default class A extends Component{
	list = [1,2,3,4,5]
	componentDidMount(){
		setTimeout(()=>{
			this.list = [2,5,7,1,20,'sss']
			this.setState({})
		},11)
	}
	render(){
		const {children} = this.props;
		return (
			<div>
				<For each="item" of={this.list} index="index">
					<div key={index}>{item}</div>
				</For>
				{children}
			</div>
		)
	}
}
