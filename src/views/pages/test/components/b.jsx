import React, { Component } from 'react'

export default class B extends Component{
	render(){
		const {children} = this.props;
		return children
	}
}
