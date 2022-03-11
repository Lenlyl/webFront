const path = require('path');
// 导出一个webpack 编译配置对象
// 因为webpack是node.js编写的，运行node环境中，所以我们可以在这个文件中使用任何node相关的代码
module.exports = {

    // 模式
    mode: 'development',

    // 入口文件设置（项目第一个要加载的文件）
    // entry: './src/index.js',

    entry: {
        // chunk 块 index.js => a.js,   list.js => a.js
        index: './src/index.js',
        list: './src/list.js'
    },

    // 设置打包输出相关信息
    output: {
        // 设置打包输出后的bundle相关文件的目录
        // 必须是绝对路径
        path: path.resolve(__dirname, 'dist'),
        // 通过entry以及后续webpack解析处理过后生成的bundle文件
        filename: '[name].js',
        // 清除构建目录
        clean: true
    },

    // 配置webpack的模块解析
    module: {

        // 针对不同类型的模块设置的解析规则
        rules: [

            // 每一个模块类型的解析规则是一个对象
            {
                // 设置当前加载的模块的匹配规则
                test: /\.md$/,
                // 如果有多个，先写后执行
                use: [
                    'html-loader',
                    'markdown-loader'
                ]
            },

            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // outputPath 是相对 全局输出目录的 output
                            outputPath: './images',
                            limit: 8192,
                        }
                    }
                ],
            },
        ]

    }
}