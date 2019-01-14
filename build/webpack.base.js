var path = require('path')
var webpack = require('webpack')


module.exports = {
	cache: true,
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
			path.resolve(__dirname, '../src/views'),
			path.resolve(__dirname, '../src/views/pages'),
			path.resolve(__dirname, '../src/style'),
			path.resolve(__dirname,'../src/static')
		],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			//'react': path.resolve('./node_modules/react'),
			//'react-dom': path.resolve('./node_modules/react-dom'),
			'react': path.resolve('./dist'),
			'react-dom': path.resolve('./dist'),
			'classnames': path.resolve('./node_modules/classnames'),
			'autoprefixer': path.resolve('./node_modules/autoprefixer'),
		}
	},
	resolveLoader: {
		modules: ['node_modules',path.resolve(__dirname, './modules')],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
	],
	module: {
		rules: []
	},
};
