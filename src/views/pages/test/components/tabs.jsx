import React, { Component } from 'react'
import Pane from './pane';

export default class Tabs extends Component {

	static Pane = Pane;

	static defaultProps = {
		inkBarVisible:true,
		contentVisible:true,
		headerVisible:true,
		headerBorder:true,
		headerType:'default'		//类型  目前只有一种，后期可提供按钮类型的
	}

	state = {};
	setActiveKey(key){
		this.state.activeKey = key;
		this.setState({})
	}

	onTabItemClick(item){
		this.state.activeKey = item.props.tab;
		this.setState({})
		this.onChange(item);
	}

	onChange(item){
		if(this.props.onChange){
			this.props.onChange(item.props.tab)
		}
	}
	getInkBarSty(child,currentKey){
		let currentIndex = 0;
		child.forEach((v,i)=>{
			if(v.props.tab == currentKey){
				currentIndex = i;
			}
		})

		//头部滚动条样式
		return {
			width:(1/child.length*100)+'%',
			transform:'translate('+(currentIndex*100)+'%,0)',
			WebkitTransform:'translate('+(currentIndex*100)+'%,0)'
		}
	}
	visibleTabs = [];
	hasVisible(tab){
		return this.visibleTabs.indexOf(tab) >= 0;
	}

	render() {
		const {
			className,
			children,
			defaultActiveKey,
			activeKey,
			headerType,
			headerVisible,
			headerBorder,
			headerClassName,
			headerHeight,
			contentClassName,
			inkBarVisible,			//显示地步滑动条
			inkBarWidth,
			contentVisible,
			...props } = this.props;

		let child = children

		let currentKey = this.props.activeKey || this.state.activeKey || this.props.defaultActiveKey;

		if(!this.hasVisible(currentKey)){
			this.visibleTabs.push(currentKey)
		}

		//头部滚动条宽度样式
		let inkBarConSty = {}
		if(inkBarWidth){
			inkBarConSty.width = inkBarWidth;
		}

		//头部高度
		let headerSty = {}
		if(headerHeight){
			headerSty.height = headerHeight;
		}

		let headerTab = (
			<For each="item" of={child || []}>
				<div className={["tui-tabs-header-item",{active:item.props.tab == currentKey}]} key={item.props.tab} onClick={this.onTabItemClick.bind(this,item)}>
					<If condition={item.props.headerView}>
						{item.props.headerView}
					</If>
					<If condition={!item.props.headerView}>
						{item.props.tab}
					</If>
				</div>
			</For>
		)

		return (
			<div className={["tui-tabs tui-tabs-full",className]}>
				<If condition={headerVisible}>
					<div
						className={[{
							"tui-tabs-header":headerType == 'default',
							"tui-tabs-btn-header":headerType == 'button',
							"tui-b-b":headerBorder
						},headerClassName]}
						style={headerSty}
						key="header">
						<If condition={headerType == 'button'}>
							<div className={[{
								"tui-tabs-btn-header-wrap":headerType == 'button'
							}]}>
								{headerTab}
							</div>
						</If>
						<If condition={headerType == 'default'}>
							{headerTab}
							<If condition={inkBarVisible}>
								<div className="tui-ink-bar" style={this.getInkBarSty(child,currentKey)} key="bar">
									<span style={inkBarConSty}></span>
								</div>
							</If>
						</If>
					</div>
				</If>
				<If condition={contentVisible}>
					<div className="tui-tabs-content-wrap">
						<div className="tui-tabs-content" key="con">
							<For each="item" of={child || []}>
								<div className={["tui-tabs-content-item",{
									"tui-tabs-content-hide":currentKey != item.props.tab
								}]} key={item.props.tab}>
									<If condition={this.hasVisible(item.props.tab)}>
										{item.props.children}
									</If>
								</div>
							</For>
						</div>
					</div>
				</If>
			</div>
		)
	}
}
