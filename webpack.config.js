var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devPath = path.join(__dirname + '/dev/js');
var buildPath = path.join(__dirname + '/build');
var stylePath = path.join(__dirname + '/dev/style');

var ENV = process.env.npm_lifecycle_event;
var isBuild = ENV === 'build';
var isDev = ENV === 'dev';
module.exports = function cfg (){
    var cfg = {};
    cfg.entry = {
        app:path.join(devPath,'index.js'),
        style:path.join(stylePath,'main.css')
    }
    cfg.out = {
        path: buildPath,//存放文件的绝对路径
        buildPath: isBuild ? '' : 'http://192.168.18.240:7000/',//网站运行时的访问路径
        filename: isBuild ? 'js/[name].[chunkhash:8].js' : '[name].bundle.js'
    }
    cfg.module = {
        loaders:[
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('style', 'css'),
                include:cfg.entry.style
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" }
        ]
    };    

    cfg.plugins = [
        new HtmlWebpackPlugin({
            template:'dev/index.html',
            inject:'body'
        }) 
    ]
    
    return cfg;
}();