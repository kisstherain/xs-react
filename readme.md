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

