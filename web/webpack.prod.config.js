const webpack = require('webpack');
const fs = require('fs');
const {merge} = require('webpack-merge');
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const {EsbuildPlugin} = require('esbuild-loader');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap((env) => merge(baseConfig, {
    mode: 'production',
    target: ['web', 'es5'],
    devtool: 'source-map',
    //devtool: false,
    //devtool: 'inline-source-map',
    //externalsPresets: { node: true },
    cache: {
        name: 'productionCache',
        type: 'filesystem',
        allowCollectingMemory: true,
        // changing the cacheDirectory is optional,
        // by default it will be in `node_modules/.cache`
        cacheDirectory: path.resolve(__dirname, ".cache"),
        buildDependencies: {
            // This makes all dependencies of this file - build dependencies
            config: [__filename],
            // By default webpack and loaders are build dependencies
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            new EsbuildPlugin({
                target: 'es2015'  // Syntax to compile to (see options below for possible values)
            })
        ]
    },
    plugins: [
        //new CleanWebpackPlugin(),
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new webpack.BannerPlugin("===COMMIT_HASH===" + env.COMMIT_HASH + "===COMMIT_HASH==="),
        new webpack.DefinePlugin({
            'COMMIT_HASH': JSON.stringify(env.COMMIT_HASH),
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.WEBPACK_HOST': JSON.stringify(null)
        }),
        new webpack.ProgressPlugin(),
        /*new webpack.ids.HashedModuleIdsPlugin({
            //hashFunction: PackageJsonHash,
        })*/
        /*new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.join(__dirname, 'build', 'vendor-manifest.json')
        }),*/
        /*new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            //analyzerPort: 8890
        }),*/
    ]
}));