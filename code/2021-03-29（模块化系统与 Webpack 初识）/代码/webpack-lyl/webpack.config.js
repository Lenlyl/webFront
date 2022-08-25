const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    mode: 'development',

    //一对一
    // entry: './src/index.js',
    //多对一
    // entry: [
    //     './src/index.js',
    //     './src/b.js'
    // ],
    //多对多
    entry: {
        index: './src/index.js',
        // b: './src/b.js'
    },

    output: {
        path: resolve(__dirname, './dist'),
        // filename: 'index.js'
        filename: '[name].js', //多对多
        clean: true, //webpack 5 自带清理打包目录配置
    },

    //配置loader解析路径 
    resolveLoader: {
        //默认只有一个路径 node_modules 
        //可配置自定义loader
        modules: ['node_modules', resolve(__dirname, './loaders')]
    },

    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader', //url-loader 多一个限制打包内存大小，小于则不打包，换算成base64数据直接引用
                    options: {
                        name: '[name]_[contenthash].[ext]',
                        outputPath: './assets/images',
                        publicPath: '../dist/assets/images'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', //替换成下面的
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         url: true, //启用url()
                    //         import: true, //启用@import
                    //         sourceMap: false //启用sourceMap
                    //     }
                    // }
                ]
            },
            {
                test: /\.doc$/,
                use: 'doc-loader'
            }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin() //webpack 5 自带清理打包文件夹配置
        new HTMLWebpackPlugin({
            filename: 'app.html',
            template: './public/index.html',
            title: 'My webpack'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],

    devServer: {
        port: 8088,
        open: true,
        // index: 'app.html'
    }
}