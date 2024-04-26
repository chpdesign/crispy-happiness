const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = (env) => merge(baseConfig, {
    mode: 'development',
    target: 'web',
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true,
        hot: true,
        proxy: [
            {
                context: () => true,
                router: () => "http://localhost:81/",
                bypass: function (req, res, proxyOptions) {
                    //console.log(req.url);
                    if (req.url.indexOf("/web/") === 0) {
                        return req.url.slice(4);
                    }
                },
                changeOrigin: true,
                secure: false,
                autoRewrite: true,
                cookieDomainRewrite: "",
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.WEBPACK_HOST': webpack.DefinePlugin.runtimeValue(
                function () { return JSON.stringify(url.scheme + '://' + url.host + '' + url.path) }, []
            )
        }),
    ]
});
