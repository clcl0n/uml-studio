const base = require('./webpack.config.base');

module.exports = {
    ...base,
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: false,
            warnings: false,
            publicPath: false
        }
    }
};