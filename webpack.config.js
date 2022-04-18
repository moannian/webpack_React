const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    mode: "development",
    entry: "./app.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'webpack_add.js',

    },
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
            },
        })
    ],

}