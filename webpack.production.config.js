const path = require('path');
const PlayCanvasWebpackPlugin = require('playcanvas-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const configuration = require('./config.json');

configuration.browsers = configuration.browsers || "> 1%";

module.exports = {
    entry: {
        main: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].build.js'
    },
    plugins: [
        new PlayCanvasWebpackPlugin({
            skipUpload: process.env.UPLOAD === "no" || !configuration.bearer || configuration.bearer.length != 32,
            bearer: configuration.bearer,
            project: configuration.projectId,
            files: configuration.files || {
                "main.build.js": {path: "main.build.js", assetId: configuration.assetId}
            }
        }),
        new UglifyJsPlugin({sourceMap: true})
    ],
    devtool: 'source-map',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};

