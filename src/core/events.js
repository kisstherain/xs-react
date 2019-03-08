export default class tEvents {
	_tEvents = {}
	emit(name,...data){
		if(!this._tEvents[name]){
			return;
		}
		this._tEvents[name].forEach((v)=>{
			v.fun(...data);
			if(v.count > 0){
				v.count -= 1;
			}
		})
		this._tEvents[name] = this._tEvents[name].filter((v)=>{
			return v.count != 0;
		})
	}
	on(eName,fun,count = -1){
		if(!eName){
			return;
		}
		let nameInfo = eName.split(".")
		let name = nameInfo[0];
		if(!this._tEvents[name]){
			this._tEvents[name] = []
		}
		this._tEvents[name].push({
			fun:fun,
			count:count,
			key:nameInfo[1]
		})
	}
	once(name,fun){
		this.on(name,fun,1);
	}
	off(eName,fun){
		if(!eName){
			return;
		}
		let nameInfo = eName.split(".")
		let name = nameInfo[0];
		let key = nameInfo[1];
		if(!this._tEvents[name]){
			return;
		}
		if(!key){
			if(!fun){
				this._tEvents[name] = undefined;
				return;
			}
			this._tEvents[name] = this._tEvents[name].filter((v)=>{
				return v.fun != fun;
			});
			return;
		}

		if(key){
			if(fun){
				this._tEvents[name] = this._tEvents[name].filter((v)=>{
					return v.key != key && v.fun == fun;
				});
				return;
			}
			this._tEvents[name] = this._tEvents[name].filter((v)=>{
				return v.key != key;
			});
		}
	}
}

