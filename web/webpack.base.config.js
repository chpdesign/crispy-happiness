const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:	[__dirname + "/src/main.tsx"],
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        /*modules: [path.resolve(__dirname, './'), 'node_modules'],*/
        alias: {
            "src": path.resolve(__dirname, './src'),
            react: path.resolve('./node_modules/react'),
            "react-dom": path.resolve('./node_modules/react-dom')
        },
        fallback: {
            "fs": false,
            //"tls": require.resolve('tls-browserify'),
            "net": require.resolve('net-browserify'),
            "path": require.resolve('path-browserify'),
            "zlib": require.resolve('zlib-browserify'),
            "http": require.resolve('http-browserify'),
            "https": require.resolve('https-browserify'),
            "stream": require.resolve('stream-browserify'),
            "crypto": require.resolve('crypto-browserify'),
            "buffer": require.resolve('buffer/'),
        }
    },
    optimization: {
        chunkIds: 'named',
        moduleIds: 'named'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [{
                    loader: "html-loader",
                }]
            },
            /*{
                test: /\.(tsx|ts)$/i,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },*/
            {
                test: /\.(js|jsx|tsx|ts)$/i,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,	 //to support eg. background-image property
                use: [{
                    loader: 'file-loader',
                    options: {
                        name:'[name].[ext]',
                        outputPath:'images/',
                        publicPath: 'images/',
                        //the images will be emmited to public/assets/images/ folder
                        //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
                    }
                }]
            },
            {
                test: /\.(mp3)$/i,	 //to support eg. background-image property
                use: ['url-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,		//to support @font-face rule
                use: ['url-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    /*experiments: {
        topLevelAwait: true
    },*/
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        /*new webpack.DefinePlugin({
            PROJECT_ENTRY: webpack.DefinePlugin.runtimeValue(function () {
                console.log(arguments);
                console.log(arguments[0].module.version);
                return JSON.stringify("ok");
            }, true),
        }),*/
    ]
}