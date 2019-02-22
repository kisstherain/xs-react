# 轻量版react

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

