var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var autoprefixer = require('autoprefixer');
var node_modules_dir = path.join(__dirname,'node_modules');
var deps = [
    'react/dist/react.min.js',
    'react-dom/dist/react-dom.min.js',
    'react-router/dist/Router.js'];

// alias配置项，可以为常用模块配置改属性，可以节省编译的搜索时间 
//module.resolve.alias:{'react':path.join(node_modules_dir,'react/dist/react.min.js')}
// var info = autoprefixer({ browsers: ['last 1 version'] }).info();
// console.log(info); 这个可以打印出 浏览器的 信息

var devPath = path.join(__dirname + '/dev/js');
var buildPath = path.join(__dirname + '/build');
var stylePath = path.join(__dirname + '/dev/style');

var ENV = process.env.npm_lifecycle_event;
var isBuild = ENV === 'build';
var isDev = ENV === 'dev';
module.exports = function cfg (){
    var cfg = {};
    cfg.entry = {
        app:path.join(devPath,'index.js')
        // ,
        // style:path.join(stylePath,'main.css') // 如果不在index.js 里面引入，就要在这里指定路径
    };
    cfg.output = {
        path: __dirname + '/build',//存放文件的绝对路径
        buildPath: isBuild ? '' : 'http://192.168.18.240:7000/',//网站运行时的访问路径
        filename: isBuild ? 'js/[name].[chunkhash:8].js' : '[name].bundle.js',
        chunkFilename: isBuild ? 'js/[name].[chunkhash:8].js' : '[name].bundle.js'
    };

    if (isBuild) {
        cfg.devtool = 'source-map';
    } else {
        cfg.devtool = 'eval-source-map';
    }
    cfg.resolve={alias: {} };
    cfg.module = {
        noParse:[],
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-2']
                },
                exclude: /node_modules/
            },
            { test: /\.png$/, loader: "url-loader?limit=300000" }
        ]
    };    
    
    cfg.plugins = [
        new webpack.DefinePlugin({
           __DEV__: isDev //就可以在js代码中用if(__DEV__){...}判断了
        }),
        new webpack.BannerPlugin("Copyright qiaoxm")
    ];

    if (!isBuild) {
        cfg.plugins.push(
            new HtmlWebpackPlugin({
                template: 'dev/index.html',
                inject: 'body'
            })
        );
        cfg.module.loaders = cfg.module.loaders.concat({
            test: /\.css$/,
            loaders: ['style', 'css','postcss']
        });
    }

    if(isBuild){
        cfg.module.loaders = cfg.module.loaders.concat({
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        });

        cfg.plugins.push(
            new HtmlWebpackPlugin({
                template: 'dev/index.html',
                inject: 'body',
                minify: {
                    removeComments: true,
                    minifyJS: true,
                    collapseWhitespace: true
                }
            }),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new ExtractTextPlugin('css/[name].[contenthash:8].css')
            // ,
            // new CopyWebpackPlugin([
            //     {
            //         from: __dirname + 'dev'
            //     }
            // ])            
        );
    }
    cfg.postcss = [ autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) ];
    cfg.devServer = {
        contentBase: 'dev',
        stats: 'minimal'
    };
    deps.forEach(function (dep) { //当引入更多的库时，这样写可以减少冗余
        var depPath = path.resolve(node_modules_dir, dep);
        cfg.resolve.alias[dep.split(path.sep)[0]]= depPath;
        //path.sep 特定平台的文件分隔工具. '\\' 或者 '/'.
        cfg.module.noParse.push(depPath); //告诉当webpack尝试去解析压缩文件时，这种行为是不允许的
    });

    return cfg;

}();

// rm -rf 要安装rimraf 