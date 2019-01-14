import Test from 'views/pages/test';

if(module.hot){
	module.hot.accept('views/pages/test2',function(){
		console.log('ddd')
	})

	module.hot.dispose(data => {
		console.log(data)
	});
}
export default {
	index:"home",
	routes:{
		"404":Test,
		"home":Test,
	},
}
