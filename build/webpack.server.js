var path = require('path');
var serverConf = {
	//contentBase: path.resolve(__dirname, '../src'),
	contentBase: './dist',
	host:'127.0.0.1',
	port:'10088',
	progress: false,
	hot: true,
	inline: true,
	proxy: {},
	//historyApiFallback: true,
	stats: {
		colors: true,
	},
};

/*var mockPaths = [*/
	//'api',
//];

//mockPaths.forEach(function ( v ) {
	//serverConf.proxy[ '/' + v ] = {
	//};
//});

module.exports = serverConf;

