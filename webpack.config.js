/**
 * Created by appian on 2016/12/6.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'Public');

module.exports = {
	entry: {
		index: path.resolve(SRC_PATH, 'index/index.js'),
	},
	output: {
		path: PUBLIC_PATH,
		filename: '[name].bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react'],
			}
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(png|jpg|jpeg|svg)$/,
			loader: 'url',
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}]
	},
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		port: 8200
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'My first react-webpack'
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8200'
		})
	],
	babel: { //配置babel
		"presets": ["es2015",'stage-0', 'react'],
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};