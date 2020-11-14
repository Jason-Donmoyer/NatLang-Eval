const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'var',
        library: 'Client',
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin({}), new TerserPlugin({})],
    },
    module: {
        rules: [{
                test: '/.js$/',
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css"
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        new WorkboxPlugin.GenerateSW(),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
    ],
};