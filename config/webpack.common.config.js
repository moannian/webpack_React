const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: {
        index: './src/index.jsx',
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    }

                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            },

            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: 'ts-loader' },
            },

            {
                test: /\.(jpg|png|gif)$/,
                type: "asset",
                //解析
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
                generator: {
                    //打包后对资源的引入，文件命名已经有/img了
                    publicPath: './'
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }

        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', ".png", ".jpg", "gif", ".css", ".less"],
        alias: {
            "@": path.resolve(__dirname, "../src")
        }
    }
};