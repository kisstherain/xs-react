# 轻量版react

	这是一个非常非常非常轻量的react
	但是很强大
	就800行不到，炒鸡简单，可以定制，也可以兼容处理以兼容低端浏览器


	webpack添加alias
	resolve: {
		alias: {
			'react': 'mreact',
			'react-dom': 'mreact',
		}
	}

### 注意

	1.refs使用方法回调，即  ref={(node)=>{ this.node = node;}}

	2.自带classNames功能
	className={[{a:1,b:false},'c',['d']]}
	className="abc"
	className={{a:true,b:false}}

	3.提供节点反查react component功能
	import {getNodeComponent} from 'react';

### 其他

	该项目不是为了轻量化react而创建，而是借鉴react生命周期及模块化思想，提供一套简单高效的前端生命周期环境。
	希望能够定制化框架，为实现配置化、可视化中台建设奠定基础。


### TODO

	在保证生命周期当前功能不变的基础上实现以下功能。

	可控制生命周期：mount、unmount延期实现，方便动画介入。
	自定义作用域与生命周期(控制器)：可逻辑划分作用域范围，实现多模块逻辑和数据管理。
	root进行render时实现节点对比

	节点自由移动与生命周期保持：移动节点到其他位置，并保持生命周期。
		注：感觉直接移动有点难，但是实例带生命周期移动应该可以，可以抽象占位节点，并在挂载时使用已存在的实例。或者使用dom render的方式，创建多个root，并使用原生html节点移动来实现。

