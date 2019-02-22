//import {Notification} from 'tui';
import valueData from 'data/values';
let delayFuns = {};
let singleReqList = {};

//基础工具
class Util{
	clearDelayFun(id){
		clearTimeout(delayFuns[id]);
	}
	delayFun(id,fun,time){
		clearTimeout(delayFuns[id]);
			delayFuns[id] = setTimeout(()=>{
				fun();
		},time || 500);
	}
	//延迟下次
	delayNextFun(id,fun,time){
		if(delayFuns[id]){
			return;
		}
		fun();
		delayFuns[id] = setTimeout(()=>{
			delayFuns[id] = undefined;
		},time || 500);
	}

	singleReq(id,req){
		if(singleReqList[id]){
			return singleReqList[id];
		}
		let p = req();
		singleReqList[id] = p;

		p.then(()=>{
			delete(singleReqList[id])
		}).catch(()=>{
			delete(singleReqList[id])
		})
		return p;
	}

	//输入框数据改变  需要bind(this,[name,ctx])
	//参数可以是字符串 name 或者数组 [name,ctx]
	//ctx 是要修改的对象
	valueChange(info,e){
		let _value = '';
		if(typeof(e) === 'string'){
			_value = e;
		}else{
			_value = e.target.value;
		}
		if(info instanceof Array){
			if(info.length >1){
				info[1][info[0]] = _value;
			}else{
				this.state[info[0]] = _value;
			}
		}else{
			this.state[info] = _value;
		}
		this.setState(this.state);
	}

	//数据改变  需要bind(this,[name,ctx])
	//参数可以是字符串 name 或者数组 [name,ctx]
	//ctx 是要修改的对象
	dataChange(info,val){
		if(info instanceof Array){
			if(info.length >1){
				info[1][info[0]] = val;
			}else{
				this.state[info[0]] = val;
			}
		}else{
			this.state[info] = val;
		}
		this.setState(this.state);
	}

	toggleBool(info){
		if(info instanceof Array){
			if(info.length >1){
				info[1][info[0]] = !info[1][info[0]];
			}else{
				this.state[info[0]] = !this.state[info[0]];
			}
		}else{
			this.state[info] = !this.state[info];
		}
		this.setState(this.state);

	}
	//时间改变  需要bind(this,[name,ctx])
	//参数可以是字符串 name 或者数组 [name,ctx]
	//ctx 是要修改的对象
	timeChange(info,date){
		let _date = date?date.getTime():undefined;
		if(info instanceof Array){
			if(info.length >1){
				info[1][info[0]] = _date;
			}else{
				this.state[info[0]] = _date;
			}
		}else{
			this.state[info] = _date;
		}
		this.setState(this.state);
	}
	humanTime(time){
		if(!time)return;
		let _date = new Date(time*1000);

		const nowTime = Date.now()/1000;
		const d = nowTime - time;
		const diff = {
			days:parseInt(d/86400),
			hours:parseInt(d/3600),
			minutes:parseInt(d/60),
		}
		if(diff.days >= 25){
			return (_date.getMonth()+1)+"月"+_date.getDate()+"日";
		}
		if(diff.days >0){
			return diff.days+"天前";
		}
		if(diff.hours > 0){
			return diff.hours+"小时前";
		}
		if(diff.minutes> 0){
			return diff.minutes+"分钟前";
		}
		return parseInt(d)+"秒前";
	}
	newArray(start, end) {
	  const result = [];
	  for (let i = start; i < end; i++) {
		    result.push(i);
		  }
	  return result;
	}
	//数字填充,返回字符串，如将9填充为09
	pad(num,n){
		let l = (''+num).length;
		return Array(n>l?(n-l+1):0).join(0)+num;
	}
	error(msg){
		Notification.config({
			message:msg,
			duration: 2000
		})
	}
	success(msg){
		Notification.config({
			type:'success',
			message:msg,
			duration: 2000
		})
	}

	when(data,time = 100){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(data)
			},time)
		})
	}


	//时间戳转换
	getTimes(nS){
		return this.moment(parseInt(nS) * 1000).format("YYYY-MM-DD HH:mm");
	}
	moment(date){
		return moment(date);
		//console.log(moment.utc(date).utcOffset(8).format("YYYY-MM-DD HH:mm"))
		//return moment(date).utcOffset(8);
	}
	//去除字符串空格
	trimStr(str){
		return str.replace(/(^\s*)|(\s*$)/g,"");
	}
	//数组过滤
	arrayUnique(arr,fn){
		if(arr.length < 2){
			return arr;
		}
		if(typeof fn != 'function') {
			fn = (a)=>{
				return a;
			}
		}
		let tmp = [];
		return arr.filter((v)=>{
			let a = fn(v)
			if(tmp.indexOf(a) >= 0){
				return false;
			}
			tmp.push(a);
			return true;
		})
	}
	//将一维数组分割为二维数组
	arrShort(arr,length){
		return arr.map((v,i)=>{
			let l = i/length;
			if(l == parseInt(l)){
				return arr.slice(i,i+length)
			}
			return false;
		}).filter((v)=>{
			return v;
		})
	}

	isIphone(){
		return navigator.userAgent.match(/iphone os/i);
	}

}
export default new Util;

