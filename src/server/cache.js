import BaseServer from 'core/baseServer';

let cacheList = {a:1};
class CacheServer extends BaseServer{
	//页面缓存
	update(name,value,expire){
		let cached = this.get(name);
		let cache = {
			value:value
		}
		//如果设置持久缓存，并且设置过生存时间，清空
		if((!expire || expire <0) && cached && cached.timeout){
			clearTimeout(cached.timeout);
		}
		if(expire>0){
			if(cached && cached.timeout){
				cache.timeout = cached.timeout;
			}else{
				cache.timeout = setTimeout(()=>{
					this.del(name)
				},expire*1000)
			}
		}
		cacheList[name] = cache;
	}
	get(name){
		return cacheList[name];
	}
	getValue(name){
		let cache = this.get(name) || {};
		return cache.value;
	}
	del(name){
		clearTimeout(cacheList[name].timeout)
		delete(cacheList[name])
	}
	clean(){
		Object.keys(cacheList).forEach((i)=>{
			this.del(i)
		})
	}
	setLocal(name,val){
		try{
			localStorage.setItem(name,JSON.stringify(val))
		}catch(e){
		}
	}
	getLocal(name){
		try{
			return JSON.parse(localStorage.getItem(name))
		}catch(e){
		}
	}

}

let cacheServer  = new CacheServer;
export default cacheServer;
