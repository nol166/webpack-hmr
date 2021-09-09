const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Import workbox-webpack-plugin
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devServer: {
        hot: true,
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html',
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
}
