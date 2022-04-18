const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin"); //用于压缩js文件
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({

        })
    ],
    output: {
        filename: 'js/[name]-bundle-[hash:6].js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            exclude: /node_modules/,
            parallel: 4,
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false,
            compress: {
                drop_console: true, // 屏蔽log
            }
        })],
    },
    devtool: "source-map"
});