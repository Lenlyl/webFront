const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    //入口文件
    //一对一
    // entry: './src/index.js',

    //多对一
    // entry: [
    //     './src/index.js',
    //     './src/main.js'
    // ],

    // output: {
    //     //接收绝对路径
    //     path: resolve(__dirname, './build'),
    //     filename: 'index.js'
    // }

    //多对多
    entry: {
        index: './src/index.js',
        main: './src/main.js'
    },
    //多对多  输出目录
    output: {
        //接收绝对路径
        path: resolve(__dirname, './build'),
        //占位符  https://webpack.docschina.org/configuration/output#outputfilename
        filename: '[name][hash].js',
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'app.html',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}