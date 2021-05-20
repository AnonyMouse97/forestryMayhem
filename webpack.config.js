/* becodeorg/mwenbwa
 *
 * /webpack.config.js - Webpack configuration
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

/* eslint-disable */

const webpack = require("webpack");
const { resolve } = require("path");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: 'development',
        context: resolve(__dirname, "./src"),
        entry: ["./client/index.js"],
        output: {
            path: path.join(__dirname, '/bin/client'),
            filename: 'index_bundle.js'
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[path][name].[ext]",
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/preset-env",
                                    "@babel/preset-react",
                                ],
                                plugins: [
                                    [
                                        "@babel/plugin-proposal-decorators",
                                        {
                                            legacy: true,
                                        },
                                    ],
                                    "@babel/plugin-syntax-import-meta",
                                    "@babel/plugin-proposal-object-rest-spread",
                                    [
                                        "@babel/plugin-proposal-class-properties",
                                        {
                                            loose: true,
                                        },
                                    ],
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                template: './index.html',
                favicon: './public/img/favicon/lumberjack.png'
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
    };
};

// module.exports = env => {
//     const plugins = [
//         new webpack.EnvironmentPlugin({
//             NODE_ENV: env === "dev" ? "development" : "production",
//             VERSION: require("./package.json").version,
//             BUILD_TIME: Date.now(),
//         }),
//         new HtmlWebpackPlugin({
//             template: resolve(__dirname, "./src/index.html"),
//             path: "../",
//         }),
//     ];

//     if (env !== "dev") {
//         optimization = {
//             runtimeChunk: "single",
//             splitChunks: {
//                 chunks: "all",
//                 maxInitialRequests: Infinity,
//                 minSize: 0,
//                 maxSize: 20000,
//                 cacheGroups: {
//                     vendor: {
//                         test: /[\\/]node_modules[\\/]/,
//                         name(module) {
//                             const packageName = module.context.match(
//                                 /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
//                             )[1];

//                             return `npm.${packageName.replace("@", "")}`;
//                         },
//                     },
//                 },
//             },
//         };
//     }

//     return {
//         mode: env === "dev" ? "development" : "production",
//         devtool:
//             env === "dev"
//                 ? "cheap-module-eval-source-map"
//                 : "hidden-source-map",
//         context: resolve(__dirname, "./src/client"),
//         entry: ["./index.js"],
//         module: {
//             rules: [
//                 {
//                     test: /\.(png|jpg|gif)$/,
//                     use: [
//                         {
//                             loader: "file-loader",
//                             options: {
//                                 name: "[path][name].[ext]",
//                             },
//                         },
//                     ],
//                 },
//                 {
//                     test: /\.css$/i,
//                     use: ["style-loader", "css-loader"],
//                 },
//                 {
//                     test: /\.js$/,
//                     exclude: [/node_modules/],
//                     use: [
//                         {
//                             loader: "babel-loader",
//                             options: {
//                                 cacheDirectory: env === "development",
//                                 presets: [
//                                     "@babel/preset-env",
//                                     "@babel/preset-react",
//                                 ],
//                                 plugins: [
//                                     [
//                                         "@babel/plugin-proposal-decorators",
//                                         {
//                                             legacy: true,
//                                         },
//                                     ],
//                                     "@babel/plugin-syntax-import-meta",
//                                     "@babel/plugin-proposal-object-rest-spread",
//                                     [
//                                         "@babel/plugin-proposal-class-properties",
//                                         {
//                                             loose: true,
//                                         },
//                                     ],
//                                 ],
//                             },
//                         },
//                     ],
//                 },
//             ],
//         },
//         plugins: [
//             new webpack.DefinePlugin(envKeys)
//         ],
//         optimization: {
//             // minimize: true,
//             // minimizer: [new TerserPlugin()],
//         },
//         performance: { hints: false },
//         output: {
//             path: resolve(__dirname, "./bin/client"),
//             filename: env === "dev" ? "js/bundle.js" : "js/[chunkhash].js",
//         },
//         watch: env === "dev",
//     };
// };
