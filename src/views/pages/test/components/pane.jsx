import React, { Component } from 'react'

export default class Pane extends Component {
	render() {
		const {
			className,
			children,
			...props } = this.props;

		return (
			<div>
				{children}
			</div>
		)
	}
}
