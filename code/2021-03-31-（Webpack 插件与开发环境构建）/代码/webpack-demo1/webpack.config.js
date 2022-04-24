const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * webpack
 *  - 模块打包
 *  - 开发环境构建
 */
// let distDir = {
//     '/js/index.js': 'console.log(....)'
// };

// router.get('/js/index.js', () {
//     ctx.body = distDir['/js/index.js'];
// });


module.exports = {

    // 设置模式
    mode: 'development',

    // 配置 sourcemap
    // [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    // eval-cheap-module-source-map
    devtool: 'cheap-source-map',

    // 设置入口
    entry: {
        index: './src/index.js'
    },

    // 输出
    output: {
        // 必须是绝对路径
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        // clean: true
    },

    // 模块解析规则
    module: {
        rules: [

            // css 模块解析
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },

            // 文件资源解析
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash].png',
                        // 资源存放的物理路径
                        outputPath: './images',
                        // 资源的url路径
                        publicPath: '/images',
                        limit: 3000
                    }
                }
            }

        ]
    },

    plugins: [
        // 把插件添加到 plugins 数组（并没有注册）
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '开课吧',
            template: './public/index.html',
            // 生成到 webpack.options.output.path
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],

    // 配置 webpack-dev-server
    devServer: {
        // open: true,
        port: 8081,

        // 跨域请求代理配置
        proxy: {
            // http://localhost:8081/api/info
            '/api': {
                // http://localhost:8787/api/info
                target: 'http://localhost:8787',
                pathRewrite: {
                    // http://localhost:8787/info
                    '^/api': ''
                }
            }
        },

        // 启用 HMR
        hot: true,

        // 关闭 live reload
        hotOnly: true
    }
}