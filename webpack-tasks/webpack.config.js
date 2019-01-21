
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        //publicPath: "dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node-modules/"
            },          
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        })
    ]
}