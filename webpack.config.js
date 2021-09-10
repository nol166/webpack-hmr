const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Import workbox-webpack-plugin
const { GenerateSW } = require('workbox-webpack-plugin');

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
    // Add workbox-webpack-plugin to the plugins array and pass in the options `clientsClaim: true` so that the browser will take control of the service worker.
    // `skipWaiting: true` will make the browser wait for the service worker to become ready before activating it.

    new GenerateSW({
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
};
