var path = require('path');

var config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'js/app.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
        }]
    }
};

module.exports = config;
