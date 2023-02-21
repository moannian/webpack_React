const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 9000,
        compress: true,
        watchFiles: ['./public/index.html'],
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: { '/api': '' } // 把/api 替换为空
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            hash: false,
        }),
        new MiniCssExtractPlugin({})
    ],
});