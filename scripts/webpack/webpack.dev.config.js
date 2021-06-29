const webpack = require('webpack');
const path = require('path');
const moduleRules = require('./loaders');
const plugins = require('./plugins');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const cwd = process.cwd();

module.exports = () => {
  return {
    devtool: 'cheap-module-eval-source-map',
    mode: "development",
    entry: {
      app: path.resolve(cwd, 'examples/Popup/index')
    },
    output: {
      path: path.resolve(cwd, 'dist'),
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss'],
      alias: {},
    },
    performance: {
      hints: false,
    },
    devServer: {
      stats: {
        colors: true,
        hash: true,
        version: true,
        timings: true,
        assets: true,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: true,
      },
      disableHostCheck: true,
      hot: true,
      port: 3334,
      host: 'localhost',
      // 是否自动在浏览器窗口打开页面
      open: false,
    },
    module: {
      rules: moduleRules(true)
    },
    plugins: [
      plugins.watchIgnorePlugin,
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: path.resolve(cwd, 'public/index.html'),
        inject: true,
      }),
      // 定制全局变量
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
      plugins.webpackBar,
      plugins.hotModuleReplacePlugin,
      plugins.forkTsCheckPlugin,
    ]
  }
};
