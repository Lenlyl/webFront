const { resolve } = require('path');

module.exports = {

    mode: 'production',

    entry: {
        index: {
            import: './index.js',
            dependOn: ['axios', 'a']
        },
        main: {
            import: './main.js',
            dependOn: ['axios', 'a']
        },
        axios: 'axios',
        a: './js/a.js'
    },

    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },

    optimization: {
        runtimeChunk: 'single'
    }
}