import Test from 'views/pages/test';

export default {
	index:"home",
	//history:'browserHistory',
	routeList:[
		{
			routes:{
				"404":Test,
				"home":Test,
			},
		}
	]
}
