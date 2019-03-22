const path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode:'development',
	entry: {
		app: ['./src/app.jsx'],
	},
	output: {
		publicPath: '/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules:[
			path.resolve(__dirname, '../node_modules'),
			path.resolve(__dirname, '../src'),
			path.resolve(__dirname, '../src/components'),
			path.resolve(__dirname, '../src/views/pages'),
			path.resolve(__dirname, '../src/style')
		],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			//'react': path.resolve('./node_modules/react'),
			//'react-dom': path.resolve('./node_modules/react-dom'),
			'react': path.resolve('./react'),
			'react-dom': path.resolve('./react'),
		}
	},
	resolveLoader: {
		modules: ['node_modules',path.resolve(__dirname, './modules')],
	},
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader",'postcss-loader', "less-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		})
	],
	devServer:{
		contentBase: './dist',
		host:'127.0.0.1',
		port:'10088',
		progress: false,
		open:true,
		hot: true,
		inline: true,
		proxy: {},
		//historyApiFallback: true,
		stats: {
			colors: true,
		},
	}
};
