var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.base');
var webpackServerConf = require('./webpack.server.js');
var webpackServer = require('webpack-dev-server');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

Object.assign(config.output,{
	filename : '[name].js',
	chunkFilename : '[id].js',
	publicPath : '/'
})

config.devtool = 'eval-source-map';

config.module.rules = config.module.rules.concat([
	{
		test: /\.(less|css)$/,
		use: ["style-loader", "css-loader",'postcss-loader', "less-loader"]
	},
	{
		test: /\.(js|jsx)$/,
		use: ['babel-loader'],
		exclude: /node_modules/
	}
])

var appWebPath = "http://" + webpackServerConf.host+ ":" + webpackServerConf.port;

config.plugins = (config.plugins || []).concat([
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new ExtractTextPlugin({
		fallback: "style-loader",
		filename:'[name].css'
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html'
	}),
 /* new CopyWebpackPlugin([{*/
		//from: 'src/static',
		//to: 'goods',
	//}]),

	new webpack.DefinePlugin({
		DEBUG:true
	}),
	new OpenBrowserPlugin({ url: appWebPath})
])


webpackServer.addDevServerEntrypoints(config, webpackServerConf);
var compiler = webpack(config)
var ws = new webpackServer(compiler, webpackServerConf)
ws.listen(webpackServerConf.port,webpackServerConf.host);

