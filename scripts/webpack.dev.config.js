const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: true,
    template: path.resolve(__dirname, '../examples/src/index.html'),
    minify: {
      collapseWhitespace: false,
      removeComments: false,
      removeRedundantAttributes: false,
    },
  }),
];

const devConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '../examples/src/app.js'),
  output: {
    path: path.resolve(__dirname, '../examples/src/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../examples/src'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
    alias: {
      'react-html5video': path.resolve(__dirname, '../src/index'),
    },
  },
  plugins,
};
module.exports = merge(devConfig, baseConfig);
