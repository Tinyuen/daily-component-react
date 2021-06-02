const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cwd = process.cwd();

// dev环境适用
const hotModuleReplacePlugin = new webpack.HotModuleReplacementPlugin();
const webpackBar = new WebpackBar({ color: '#ffac00'}); // 构建进度条美化
const forkTsCheckPlugin = new ForkTsCheckerWebpackPlugin({
  eslint: {
    files: './src/**/*.{ts,tsx,js,jsx}'
  },
  typescript: {
    configFile: path.resolve(cwd, 'tsconfig.json')
  }
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: `[name].css`,
  chunkFilename: `[id].css`,
});

const watchIgnorePlugin = new webpack.WatchIgnorePlugin([/\.d\.ts$/]);

module.exports = {
  watchIgnorePlugin,
  hotModuleReplacePlugin,
  miniCssExtractPlugin,
  // 开启TS检查单独进程
  forkTsCheckPlugin,
  webpackBar,
};
