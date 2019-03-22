var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var config = require('./webpack.base');
var webpackServerConf = require('./webpack.server.js');
var webpackServer = require('webpack-dev-server');

Object.assign(config.output,{
	filename : '[name].js',
	chunkFilename : '[id].js',
	publicPath : '/'
})

config.mode = 'development';
config.devtool = 'eval-source-map';

config.module.rules = config.module.rules.concat([
	{
		test: /\.(less|css)$/,
		use: [MiniCssExtractPlugin.loader, "css-loader",'postcss-loader', "less-loader"]
	},
	{
		test: /\.(js|jsx)$/,
		use: ['babel-loader'],
		exclude: /node_modules/
	}
])

var appWebPath = "http://" + webpackServerConf.host+ ":" + webpackServerConf.port;

config.plugins = (config.plugins || []).concat([
	new MiniCssExtractPlugin({
		filename: "[name].css",
		chunkFilename: "[id].css"
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html'
	}),
])


webpackServer.addDevServerEntrypoints(config, webpackServerConf);
var compiler = webpack(config)
var ws = new webpackServer(compiler, webpackServerConf)
ws.listen(webpackServerConf.port,webpackServerConf.host);

