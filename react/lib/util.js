class Util{
	isUndefined(v){
		return typeof(v) === "undefined";
	}
	isFun(v){
		return v instanceof Function;
	}
	isString(v){
		return typeof(v) === "string";
	}
	isNumber(v){
		return typeof(v) === "number";
	}

	isArray(v){
		return v instanceof Array;
	}
	//递归调用
	recursive(data,fun){
		if(this.isArray(data)){
			return data.map((v)=>{
				this.recursive(v,fun)
			})
		}
		let val = fun(data);
		if(val && this.isArray(val)){
			return this.recursive(val,fun);
		}
		return val;
	}

	//格式化对象，并返回方法
	stringifyObjInfo(obj){
		let funs = [];
		let i = 0;
		let str = JSON.stringify(obj,(k,v)=>{
			if(this.isFun(v)){
				funs.push(v);
				return '_fun__'+i;
			}
			return v;
		})
		return {
			str:str,
			funs:funs
		}
	}

	//深度对比
	isEqual(a,b){
		let aInfo = this.stringifyObjInfo(a);
		let bInfo = this.stringifyObjInfo(b);

		if(aInfo.str != bInfo.str || aInfo.funs.length != bInfo.funs.length){
			return false;
		}

		let eq = true;
		aInfo.funs.forEach((v,i)=>{
			if(v != bInfo.funs[i]){
				eq = false;
			}
		})

		return eq;
	}

	//className合并
	classNames(data){
		if(!data){
			return '';
		}

		if(this.isString(data)){
			return data;
		}

		if(!this.isArray(data)){
			data = [data];
		}

		let cls = [];
		this.recursive(data,(v)=>{
			if(!v){
				return
			}
			if(this.isString(v)){
				cls.push(v)
			}
			if(this.isNumber(v)){
				cls.push(String(v))
			}
			if(v instanceof Object){
				Object.keys(v).forEach((k)=>{
					if(v[k]){
						cls.push(k);
					}
				})
			}
		});
		let c = [];
		cls.forEach((item)=>{
			item.split(" ").forEach((v)=>{
				if(v && c.indexOf(v) < 0){
					c.push(v)
				}
			})
		})
		return c.join(" ")
	}

	cssNumber = [
		"column-count",
		"fill-opacity",
		"font-weight",
		"line-height",
		"animation-duration",
		"opacity",
		"order",
		"orphans",
		"widows",
		"z-index",
		"zoom"
	];

	getStyleStr(style){
		if(!style){
			return '';
		}
		let sty = [];;
		Object.keys(style).forEach((v)=>{
			let name = this.upperToLine(v)
			let val = style[v];
			if(typeof(val) == 'number' && this.cssNumber.indexOf(name) < 0){
				val = val+'px'
			}
			sty.push(`${name}:${val}`);
		});
		return sty.join(";")
	}

	upperToLine(v){
		return v.replace(/[A-Z]/g,function(w){return '-'+w.toLowerCase();})
	}

	//获取节点实例
	getNodeInstance(node){
		if(!node || !node.__reactInstance){
			return;
		}
		return node.__reactInstance;
	}

	//获取节点component
	getNodeComponent(node){
		let inst = this.getNodeInstance(node);
		if(!inst){
			return;
		}
		return inst.component;
	}


}
export default new Util;
